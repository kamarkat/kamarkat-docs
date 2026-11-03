#!/usr/bin/env python3
"""Generate the release pages from the component inventory of each bundle version.

    sync-releases.py [--fetch <version>...] [--owner soloz-io] [--catalog <component-catalog.yaml>]
    sync-releases.py --check <components.json> [--catalog <component-catalog.yaml>]

Every published bundle chart carries `components.json`, its component inventory.
`--fetch` pulls it for each named version into data/releases/ and records, as of
the day the version was published to the registry:

    released            that day
    url                 where each component's title links (the catalog's repo)
    latest              the newest release its upstream repository had published
    current             whether the version shipped is that release
    behind              for one that is not, the catalog's reasons for the versions
                        it ships; a version with none fails the fetch

`--check` runs the same lookups on an inventory not yet published (a rehearsal's
components.json), as of today, and names every version behind its latest release
that the catalog does not explain. It writes nothing.

The catalog is zero-ops' manifests/architecture/component-catalog.yaml, read from
the checkout beside this one. The pages are then generated from whatever
data/releases/ holds:

    versions/lines/<minor>.mdx        every release on a minor line, with what changed
    versions/releases/<version>.mdx   one release: what changed, and every component
    snippets/releases/<version>.jsx   the data each page renders

and the line pages are listed in the Versions tab of docs.json. Release pages
are reached from their line page, not listed one by one in the navigation.

Nothing is fetched while the docs build: the inventory is copied here, so a page
never depends on the registry being reachable.
"""
from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
import tempfile
import urllib.request
from datetime import datetime, timedelta
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/releases"
PAGES = ROOT / "versions/releases"
LINES = ROOT / "versions/lines"
SNIPPETS = ROOT / "snippets/releases"
CATALOG = ROOT.parent / "zero-ops/manifests/architecture/component-catalog.yaml"
# A release tag that names a version, unless the catalog gives the repo its own pattern.
RELEASE_TAG = r"^v?(\d+)\.(\d+)\.(\d+)$"


def semver_key(v: str):
    m = re.match(r"(\d+)\.(\d+)\.(\d+)(?:-(.+))?$", v)
    if not m:
        sys.exit(f"sync-releases: {v} is not a semantic version")
    major, minor, patch, pre = m.groups()
    # A release sorts after every prerelease of itself; rc.10 after rc.9.
    pre_key = (1,) if pre is None else (0,) + tuple(int(p) if p.isdigit() else p for p in re.split(r"[.-]", pre))
    return (int(major), int(minor), int(patch), pre_key)


def slug(v: str) -> str:
    return v.replace(".", "-")


def gh(path: str, paginate: bool = True) -> list[dict]:
    out = subprocess.run(["gh", "api", *(["--paginate"] if paginate else []), path, "--jq", ".[] | @json"],
                         check=True, capture_output=True, text=True).stdout
    return [json.loads(line) for line in out.splitlines()]


def published(owner: str) -> dict[str, str]:
    """The day each bundle version was published to the registry."""
    days = {}
    for pv in gh(f"/orgs/{owner}/packages/container/charts%2Fenvironment-manager/versions?per_page=100"):
        for tag in pv["metadata"]["container"]["tags"]:
            days[tag] = pv["created_at"]
    return days


class Upstream:
    """The newest version of each tracked component, as of a given moment.

    A component's catalog entry says where its versions are published (`track`):

      releases   GitHub releases of `repo` (the default for an owner/name repo)
      tags       Git tags of `repo`, for a project that tags but publishes no releases
      dockerhub  the artefact's own Docker Hub tags. Docker Hub records no publish
                 date per tag, so this is as of the fetch, not the release date
      ghcr       the artefact's own GHCR package: the newest image built, compared
                 by digest, for images the platform builds itself
      ubuntu     Ubuntu's LTS releases, from Launchpad
      file       a version written in `file` of repository `from`, read at that
                 repository's newest release

    GitHub releases are listed newest first. Reading stops at the first page that
    reaches WINDOW before the moment with a matching release already found: the
    newest version is among the releases of the half-year before it, and a
    long-lived project has more releases than the API will page through."""

    WINDOW = timedelta(days=183)

    def __init__(self):
        # repo -> (pages read, every release on them, whether the last page was read)
        self.read: dict[str, tuple[int, list[tuple[str, str]], bool]] = {}
        self.cache: dict[tuple, list] = {}

    @staticmethod
    def newest(items, pattern: str, before: str | None) -> tuple[str, str]:
        """(version, tag) of the highest version among (tag, published) items."""
        found = []
        for tag, at in items:
            m = re.match(pattern, tag)
            if m and (before is None or (at and at <= before)):
                found.append((tuple(int(g) for g in m.groups() if g is not None), tag))
        if not found:
            return "", ""
        version, tag = max(found)
        return ".".join(map(str, version)), tag

    def releases(self, repo: str, pattern: str, before: str) -> tuple[str, str]:
        oldest = (datetime.fromisoformat(before.replace("Z", "+00:00")) - self.WINDOW).strftime("%Y-%m-%dT%H:%M:%SZ")
        pages, seen, end = self.read.get(repo, (0, [], False))
        while True:
            found = self.newest(seen, pattern, before)
            if end or (found[0] and seen[-1][1] < oldest):
                break
            batch = gh(f"repos/{repo}/releases?per_page=100&page={pages + 1}", paginate=False)
            pages += 1
            seen = seen + [(r["tag_name"], r["published_at"] or "") for r in batch
                           if not r["draft"] and not r["prerelease"]]
            end = len(batch) < 100
        self.read[repo] = (pages, seen, end)
        return found

    def tags(self, repo: str, pattern: str, before: str) -> tuple[str, str]:
        if ("tags", repo) not in self.cache:
            owner, name = repo.split("/")
            query = ('query($o:String!,$n:String!){repository(owner:$o,name:$n){refs(refPrefix:"refs/tags/",'
                     'first:100,orderBy:{field:TAG_COMMIT_DATE,direction:DESC}){nodes{name target{'
                     '... on Commit{committedDate} ... on Tag{target{... on Commit{committedDate}}}}}}}}')
            out = subprocess.run(["gh", "api", "graphql", "-f", f"query={query}", "-F", f"o={owner}", "-F", f"n={name}"],
                                 check=True, capture_output=True, text=True).stdout
            nodes = json.loads(out)["data"]["repository"]["refs"]["nodes"]
            self.cache[("tags", repo)] = [
                (n["name"], n["target"].get("committedDate") or (n["target"].get("target") or {}).get("committedDate") or "")
                for n in nodes]
        return self.newest(self.cache[("tags", repo)], pattern, before)

    def dockerhub(self, image: str, pattern: str) -> tuple[str, str]:
        if ("dockerhub", image) not in self.cache:
            tags, url = [], f"https://hub.docker.com/v2/repositories/{image}/tags?page_size=100&ordering=last_updated"
            for _ in range(3):
                page = http_json(url)
                tags += [(t["name"], "") for t in page["results"]]
                url = page.get("next")
                if not url:
                    break
            self.cache[("dockerhub", image)] = tags
        return self.newest(self.cache[("dockerhub", image)], pattern, None)

    def ghcr(self, package: str, before: str) -> tuple[str, str]:
        """(short commit tag, digest) of the newest image built before the moment."""
        owner, name = package.split("/", 1)
        path = f"/orgs/{owner}/packages/container/{name.replace('/', '%2F')}/versions?per_page=100"
        if ("ghcr", package) not in self.cache:
            self.cache[("ghcr", package)] = gh(path)
        built = [v for v in self.cache[("ghcr", package)] if v["created_at"] <= before]
        if not built:
            return "", ""
        v = max(built, key=lambda v: v["created_at"])
        tags = [t for t in v["metadata"]["container"]["tags"] if t != "latest"]
        return (tags[0][:8] if tags else v["name"][7:19]), v["name"]

    def ubuntu(self, before: str) -> tuple[str, str]:
        if ("ubuntu",) not in self.cache:
            self.cache[("ubuntu",)] = http_json("https://api.launchpad.net/devel/ubuntu/series")["entries"]
        lts = [(e["version"], e["datereleased"].replace("+00:00", "Z")) for e in self.cache[("ubuntu",)]
               if e.get("datereleased") and re.match(r"^\d*[02468]\.04$", e["version"])]
        # Ubuntu's version is a date, YY.MM: shown as written, not as numbers.
        _, version = self.newest([(v, at) for v, at in lts], r"^(\d+)\.(\d+)$", before)
        return version, version

    def file(self, repo: str, path: str, pattern: str, before: str) -> tuple[str, str]:
        _, ref = self.releases(repo, RELEASE_TAG, before)
        if not ref:
            return "", ""
        key = ("file", repo, path, ref)
        if key not in self.cache:
            self.cache[key] = subprocess.run(
                ["gh", "api", f"repos/{repo}/contents/{path}?ref={ref}", "-H", "Accept: application/vnd.github.raw"],
                check=True, capture_output=True, text=True).stdout
        m = re.search(pattern, self.cache[key], re.M)
        return (".".join(g for g in m.groups() if g is not None), ref) if m else ("", "")


def http_json(url: str) -> dict:
    with urllib.request.urlopen(url, timeout=30) as r:
        return json.load(r)


def current(version: str, latest: str) -> bool:
    """Whether every version shipped is the latest release. A shipped version names
    as many parts as it pins: 1.27-alpine is current while 1.27 is the newest line."""
    want = tuple(int(p) for p in latest.split("."))
    for token in version.split(","):
        m = re.search(r"\d+(?:\.\d+)*", token)
        if not m:
            return False
        have = tuple(int(p) for p in m.group().split("."))
        if want[:len(have)] != have:
            return False
    return True


def tracking(catalog: list[dict], key: str) -> dict:
    """How an artefact is linked and tracked: its catalog entry's repo, track, tag,
    file and from, or the `repos` override for it, which replaces them whole. Matched
    as the inventory matches: an exact key, or the longest prefix ending in *."""
    def best(patterns):
        hits = [p for p in patterns if key == p or (p.endswith("*") and key.startswith(p[:-1]))]
        return max(hits, key=len) if hits else None
    scored = [(best(e["match"]), e) for e in catalog]
    scored = [(p, e) for p, e in scored if p]
    if not scored:
        sys.exit(f"sync-releases: {key} has no entry in {CATALOG.name}")
    entry = max(scored, key=lambda pe: len(pe[0]))[1]
    override = best(entry.get("repos", {}))
    spec = entry["repos"][override] if override else entry
    spec = {"repo": spec} if isinstance(spec, str) else spec
    if "repo" not in spec:
        sys.exit(f"sync-releases: catalog entry {entry['name']} has no repo for {key}")
    github = "://" not in spec["repo"]
    return {
        "url": f"https://github.com/{spec['repo']}" if github else spec["repo"],
        "repo": spec["repo"],
        "track": spec.get("track", "releases" if github else ""),
        "tag": spec.get("tag", RELEASE_TAG),
        "file": spec.get("file", ""),
        "from": spec.get("from", ""),
    }


def latest(t: dict, c: dict, released: str, upstream: Upstream) -> tuple[str, bool | None]:
    """The newest version of a component as of `released`, and whether it shipped."""
    image = c["source"].split("/", 1)[1] if c["source"].startswith(("docker.io/", "ghcr.io/")) else ""
    match t["track"]:
        case "":
            return "", None
        case "releases":
            version, _ = upstream.releases(t["repo"], t["tag"], released)
        case "tags":
            version, _ = upstream.tags(t["repo"], t["tag"], released)
        case "dockerhub":
            version, _ = upstream.dockerhub(image, t["tag"])
        case "ubuntu":
            version, _ = upstream.ubuntu(released)
        case "file":
            version, _ = upstream.file(t["from"], t["file"], t["tag"], released)
        case "ghcr":
            version, digest = upstream.ghcr(image, released)
            return version, (digest in c["digests"]) if version else None
        case other:
            sys.exit(f"sync-releases: {c['source']} has unknown track '{other}'")
    if not version:
        sys.exit(f"sync-releases: no {t['track']} version found for {c['source']} ({t['repo']}) "
                 f"before {released}; check its catalog entry")
    return version, current(c["version"], version)


def annotate(doc: dict, released: str, catalog: list[dict], upstream: Upstream) -> None:
    doc["released"] = released
    for c in doc["components"]:
        t = tracking(catalog, c["source"])
        c["url"] = t["url"]
        c["latest"], c["current"] = latest(t, c, released, upstream)


STATUSES = ("held", "scheduled", "not assessed", "declined")


def unexplained(doc: dict, catalog: list[dict]) -> list[str]:
    """Copy onto each component behind its latest the catalog's `behind` items for
    the versions it ships, and name every version no item explains. A reason is for
    the version it names, so a changed pin needs a new one."""
    entries = {e["name"]: e for e in catalog}
    missing = []
    for c in doc["components"]:
        c.pop("behind", None)
        if c["current"] is not False:
            continue
        items = [i for i in entries[c["component"]].get("behind") or []
                 if i.get("reason") and i.get("status") in STATUSES]
        found = []
        for v in (t.strip() for t in c["version"].split(",")):
            item = next((i for i in items if v in i.get("versions", [])), None)
            if not item:
                missing.append(f"{c['component']} [{v}]")
            elif item not in found:
                found.append(item)
        c["behind"] = [{k: i[k] for k in ("status", "reason", "blocked_by", "target", "ref") if i.get(k)}
                       for i in found]
    return sorted(set(missing))


def explain(doc: dict, catalog: list[dict]) -> None:
    missing = unexplained(doc, catalog)
    if missing:
        sys.exit(f"sync-releases: {doc['version']} ships versions behind their latest release that the "
                 f"catalog does not explain. Add a `behind` item for each to its entry in {CATALOG.name}:\n  "
                 + "\n  ".join(missing))


def fetch(versions: list[str], owner: str, catalog: list[dict]) -> None:
    DATA.mkdir(parents=True, exist_ok=True)
    days = published(owner)
    upstream = Upstream()
    for v in versions:
        if v not in days:
            sys.exit(f"sync-releases: {v} is not published in the registry")
        with tempfile.TemporaryDirectory() as tmp:
            subprocess.run(
                ["helm", "pull", f"oci://ghcr.io/{owner}/charts/environment-manager", "--version", v,
                 "--untar", "-d", tmp],
                check=True, stdout=subprocess.DEVNULL,
            )
            src = Path(tmp) / "environment-manager/components.json"
            if not src.exists():
                sys.exit(f"sync-releases: {v} carries no inventory. Build one with "
                         f"zero-ops scripts/package/backfill-inventory.sh and copy it into {DATA}.")
            doc = json.loads(src.read_text())
        annotate(doc, days[v], catalog, upstream)
        explain(doc, catalog)
        (DATA / f"{v}.json").write_text(json.dumps(doc, indent=2) + "\n")
        behind = sum(1 for c in doc["components"] if c["current"] is False)
        print(f"fetched {v}: {behind} of {len(doc['components'])} components behind their latest release")


def check(inventory: str, catalog: list[dict]) -> None:
    """Before a version is published: which of its components are behind their latest
    release today with no reason in the catalog. Writes nothing."""
    doc = json.loads(Path(inventory).read_text())
    annotate(doc, datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ"), catalog, Upstream())
    missing = unexplained(doc, catalog)
    behind = sum(1 for c in doc["components"] if c["current"] is False)
    print(f"check: {behind} of {len(doc['components'])} components behind their latest release, "
          f"{len(missing)} without a reason")
    if missing:
        sys.exit("  " + "\n  ".join(missing))


def day(at: str) -> str:
    return datetime.fromisoformat(at.replace("Z", "+00:00")).strftime("%-d %b %Y")


def jsx(name: str, value) -> str:
    return f"export const {name} = {json.dumps(value, indent=2)};\n"


def release_page(r: dict, line: str) -> str:
    v = r["version"]
    lead = (f"Every component {'prerelease' if '-' in v else 'bundle version'} `{v}` installs, on which nodes, "
            f"at what version. Released {day(r['released'])}.")
    since = f" since `{r['previous']}`" if r.get("previous") else ""
    return f"""---
title: "{v}"
description: "Components in bundle version {v}."
keywords: ["{v}", "components", "inventory", "management cluster", "managed clusters"]
---

import {{ ReleaseComponents, ReleaseChanges, BootstrapTools }} from "/snippets/release-components.jsx";
import {{ release }} from "/snippets/releases/{slug(v)}.jsx";

> {lead}

[All {line} versions](/versions/lines/{slug(line)})

## What changed{since}

<ReleaseChanges release={{release}} />

## What's included

Your box has one management cluster and the managed clusters it provisions. Each has control plane nodes and worker nodes. Choose a cluster, then a node role, to see what runs there. A version marked **unpinned** is installed at whatever version its source serves when a node is created.

**Latest (as of release date)** is the newest release the component's project had published on {day(r['released'])}. A version in green is that release; a version in red is behind it, or cannot be shown to match it. For an image the platform builds, latest is the newest build, and green means the version shipped it. Hover or focus the ⓘ beside a red version for why it is behind.

<ReleaseComponents release={{release}} />

## Bootstrap tools

Run by the `soloz` CLI on your machine or in your CI during Day-0. Not installed in any cluster.

<BootstrapTools release={{release}} />

These components are for the `{r.get("provider", "hetzner")}` provider. Your applications, deployed from your GitOps repository, are yours and are not listed.
"""


def line_page(line: str, rows: list[dict]) -> str:
    return f"""---
title: "{line}"
description: "Every bundle version on the {line} line, and what each one changed."
keywords: ["{line}", "releases", "versions", "component changes"]
---

import {{ ReleaseLine }} from "/snippets/release-line.jsx";
import {{ line }} from "/snippets/releases/line-{slug(line)}.jsx";

> {len(rows)} versions on the {line} line, newest first. Open a version to see what changed, or follow its link for every component it installs.

<ReleaseLine line={{line}} />
"""


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--fetch", nargs="*", default=[])
    ap.add_argument("--owner", default="soloz-io")
    ap.add_argument("--catalog", default=str(CATALOG))
    ap.add_argument("--check", metavar="COMPONENTS_JSON")
    a = ap.parse_args()
    if a.fetch or a.check:
        catalog_file = Path(a.catalog)
        if not catalog_file.exists():
            sys.exit(f"sync-releases: no component catalog at {catalog_file}. Check out zero-ops beside "
                     f"this repository, or pass --catalog.")
        catalog = yaml.safe_load(catalog_file.read_text())["components"]
        if a.check:
            check(a.check, catalog)
            return
        fetch(a.fetch, a.owner, catalog)

    releases = [json.loads(p.read_text()) for p in sorted(DATA.glob("*.json"))] if DATA.exists() else []
    for r in releases:
        if ("released" not in r or any("url" not in c for c in r["components"])
                or any(c["current"] is False and not c.get("behind") for c in r["components"])):
            sys.exit(f"sync-releases: {r['version']} was fetched without its release date, upstream "
                     f"versions or the reasons components are behind. Fetch it again: --fetch {r['version']}")
    releases.sort(key=lambda r: semver_key(r["version"]), reverse=True)

    for d in (PAGES, LINES, SNIPPETS):
        if d.exists():
            shutil.rmtree(d)
        d.mkdir(parents=True)

    stable = [r["version"] for r in releases if "-" not in r["version"]]
    latest = stable[0] if stable else None
    lines: dict[str, list[dict]] = {}
    for r in releases:
        major, minor = r["version"].split(".")[:2]
        line = f"{major}.{minor}"
        (SNIPPETS / f"{slug(r['version'])}.jsx").write_text(jsx("release", r))
        (PAGES / f"{slug(r['version'])}.mdx").write_text(release_page(r, line))
        lines.setdefault(line, []).append({
            "version": r["version"],
            "released": day(r["released"]),
            "href": f"/versions/releases/{slug(r['version'])}",
            "latest": r["version"] == latest,
            "prerelease": "-" in r["version"],
            "components": len(r["components"]),
            "behind": sum(1 for c in r["components"] if c["current"] is False),
            "previous": r.get("previous", ""),
            "changes": r.get("changes"),
        })

    for line, rows in lines.items():
        (SNIPPETS / f"line-{slug(line)}.jsx").write_text(jsx("line", {"line": line, "releases": rows}))
        (LINES / f"{slug(line)}.mdx").write_text(line_page(line, rows))

    docs = json.loads((ROOT / "docs.json").read_text())
    tab = next(t for t in docs["navigation"]["tabs"] if t.get("tab") == "Versions")
    tab["groups"] = [g for g in tab["groups"] if g["group"] != "Releases"]
    if lines:
        tab["groups"].append({
            "group": "Releases",
            "pages": [f"versions/lines/{slug(l)}" for l in sorted(lines, key=lambda l: tuple(map(int, l.split("."))), reverse=True)],
        })
    (ROOT / "docs.json").write_text(json.dumps(docs, indent=2) + "\n")
    print(f"sync-releases: {len(releases)} versions on {len(lines)} lines")


if __name__ == "__main__":
    main()
