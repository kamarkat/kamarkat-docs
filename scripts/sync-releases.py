#!/usr/bin/env python3
"""Generate the release pages from the component inventory of each bundle version.

    sync-releases.py [--fetch <version>...] [--owner soloz-io]

Every published bundle chart carries `components.json`, its component inventory.
`--fetch` pulls it for each named version into data/releases/. The pages are then
generated from whatever data/releases/ holds:

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
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data/releases"
PAGES = ROOT / "versions/releases"
LINES = ROOT / "versions/lines"
SNIPPETS = ROOT / "snippets/releases"


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


def fetch(versions: list[str], owner: str) -> None:
    DATA.mkdir(parents=True, exist_ok=True)
    for v in versions:
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
            shutil.copy(src, DATA / f"{v}.json")
            print(f"fetched {v}")


def jsx(name: str, value) -> str:
    return f"export const {name} = {json.dumps(value, indent=2)};\n"


def release_page(r: dict, line: str) -> str:
    v = r["version"]
    lead = f"Every component {'prerelease' if '-' in v else 'bundle version'} `{v}` installs, on which nodes, at what version."
    since = f" since `{r['previous']}`" if r.get("previous") else ""
    return f"""---
title: "{v}"
description: "Components in bundle version {v}."
---

import {{ ReleaseComponents, ReleaseChanges, BootstrapTools }} from "/snippets/release-components.jsx";
import {{ release }} from "/snippets/releases/{slug(v)}.jsx";

> {lead}

[All {line} versions](/versions/lines/{slug(line)})

## What changed{since}

<ReleaseChanges release={{release}} />

## What's included

Your box has one management cluster and the managed clusters it provisions. Each has control plane nodes and worker nodes. Choose a cluster, then a node role, to see what runs there. A version marked **unpinned** is installed at whatever version its source serves when a node is created.

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
    a = ap.parse_args()
    if a.fetch:
        fetch(a.fetch, a.owner)

    releases = [json.loads(p.read_text()) for p in sorted(DATA.glob("*.json"))] if DATA.exists() else []
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
            "href": f"/versions/releases/{slug(r['version'])}",
            "latest": r["version"] == latest,
            "prerelease": "-" in r["version"],
            "components": len(r["components"]),
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
