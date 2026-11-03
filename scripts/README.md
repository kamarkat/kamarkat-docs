# Release pages

Each bundle version publishes its component inventory (`components.json`) inside the
`environment-manager` chart. `sync-releases.py` turns those inventories into the
**Versions › Releases** pages.

## Add a released version

Run from the repository root, after the version is published:

```bash
python3 scripts/sync-releases.py --fetch <version>    # e.g. 0.1.16-rc.184
mint validate && mint broken-links
git add -A && git commit -m "docs(releases): <version>" && git push
```

`--fetch` pulls the chart with `helm` (logged in to `ghcr.io`) and writes its
inventory to `data/releases/<version>.json` with, read through `gh` as of the day
the version was published to the registry:

- the release date;
- each component's repository link, from zero-ops' component catalog (a zero-ops
  checkout beside this one, or `--catalog <path>`);
- the newest release that repository had published, and whether the version
  shipped is it. The pages show it green when it is, red when it is not.

These are recorded once, so a page keeps showing what was latest on its release
date. The script then regenerates every page from `data/releases/`.

## Regenerate without fetching

```bash
python3 scripts/sync-releases.py
```

## What it writes

| Path | Content |
| :- | :- |
| `data/releases/<version>.json` | The inventory from the chart, with release date, links and latest versions |
| `versions/releases/<version>.mdx` | One page per version |
| `versions/lines/<major>-<minor>.mdx` | Every version on a minor line |
| `snippets/releases/*.jsx` | The data each page renders |
| `docs.json` | The **Releases** group in the Versions tab |

Generated files are overwritten on every run; edit `scripts/sync-releases.py` or
`snippets/release-*.jsx` instead.

## Errors

- `carries no inventory`: the version was published before inventories existed.
  Only versions from `0.1.16-rc.183` onward carry one.
