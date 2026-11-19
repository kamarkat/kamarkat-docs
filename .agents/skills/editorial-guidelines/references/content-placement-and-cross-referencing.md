# Content Placement and Cross-Referencing

This reference decides **where a piece of content belongs** and **how pages refer to each other**. It exists because the site has one home for every fact, and because the most common editorial failure is not bad prose: it is the same fact written in three places, where two of them will be wrong within a release.

---

## 1. The Sections, and What Each One Is For

| Section | Answers | Contains | Never contains |
| :--- | :--- | :--- | :--- |
| `introduction/` | why this product exists | positioning, the problem, the architecture, responsibility boundaries | procedures, commands |
| `quickstart/` | how do I get one working | the single happy path, in order, with commands | alternatives, edge cases, reference tables |
| `documentation/<subject>/` | how does this subject work | concepts, vocabulary, contracts, states, limits | command blocks, flag tables, exit codes |
| `guides/<area>/` | how do I do one thing | one task, start to finish, with the commands it takes | concept teaching, full flag enumerations |
| `features/<area>/` | what does the platform give me | the capability and its value, what the customer owns | procedures, syntax |
| `cli/` | what does this command do | every command, its flags, its exit statuses, its syntax | task narrative, concept teaching |
| `versions/` | what shipped | release inventories and version lines | anything evergreen |

### The Documentation Subject Pattern

A subject in `documentation/` is a small set of pages in a fixed order, because a reader arriving at a subject needs the same four things every time:

```
overview                  the problem, the value, who does what, cards to the rest
core-concepts             the vocabulary every other page in the subject relies on
<topic pages>             one page per idea that needs its own explanation
operational-limitations   what this does not do, stated plainly
```

Add a topic page when an idea needs more than a section and is referred to from elsewhere. Do not add one for a procedure; that is a guide.

---

## 2. One Home Per Fact

Every fact has exactly one authoritative page. Every other page that needs it **links**.

| The fact | Its only home |
| :--- | :--- |
| A command's flags, defaults, exit statuses, syntax | `cli/` |
| How to accomplish a task, step by step | `guides/` |
| What a term means, and the model behind it | `documentation/<subject>/core-concepts` |
| The states a thing moves through, and what each means | a `documentation/` topic page |
| What the platform does not do | `documentation/<subject>/operational-limitations` |
| A capability's value and ownership boundary | `features/` |
| A closed set too large for a table cell (names a flag accepts, profiles, categories) | a `documentation/` reference page, linked from the flag's row in `cli/` |
| What a version contains | `versions/` |

### The Test

Before writing a table or a command block, ask: **does this fact already have a home?**

- If yes, link to it. One sentence of context plus a link beats a copied table every time.
- If no, decide its home from the table above, write it there once, and link from everywhere else.

### What Duplication Looks Like When It Goes Wrong

A verification subject was written with a usage page that carried the full `kakt verify` flag table and its exit statuses, while the CLI reference carried the same two tables. One contract, two homes, and nothing to keep them in agreement. Worse, deleting the duplicate removed the only link between a flag and the list of values it accepts, so the reference told readers to "name the checks" with no way to discover a name.

Both failures have the same cause: content placed where it was convenient to write rather than where it belongs.

---

## 3. How to Cross-Reference

### Name a command inline, linked to its entry

```markdown
The cluster must be declared first, with [`kakt tenant add-management`](/cli/boxes-and-clusters#kakt-tenant-add-management).
```

Anchors are derived from the `###` heading in the CLI page: `### kakt escrow clean` becomes `#kakt-escrow-clean`. A documentation page names a command this way instead of showing a bash block.

### Close a concept page by pointing at the commands

```markdown
- [Escrow and encryption CLI reference](/cli/escrow-and-encryption) — the commands these concepts describe
```

### Point a flag at its value list

When a flag accepts a set too large to spell out in its row:

```markdown
| `--only` | The checks to run, comma separated. [What is checked](/documentation/verification/checks) lists every accepted name |
```

The documentation page lists what the platform ships. Where the command itself can print what applies to a particular box, say so, because the box is the authority and the page is the reference.

### Send a reader to the task

A concept page that explains a model ends by naming the guide that performs it. A guide that needs a model links to `core-concepts` rather than re-teaching it in three sentences.

### Use cards for a subject's entry page

An overview links its subject's pages with `<CardGroup>` and one line each. A topic page uses prose links.

---

## 4. Which Section Does This Belong To?

Decide by what the reader is doing, not by what the content is about.

| The reader is | Write it in |
| :--- | :--- |
| deciding whether to adopt | `introduction/`, `features/` |
| doing this for the first time | `quickstart/` |
| trying to understand how something works | `documentation/` |
| trying to get a specific thing done | `guides/` |
| looking up what a flag does | `cli/` |
| checking what a version shipped | `versions/` |

Two signals that content is in the wrong place:

- **A documentation page that is mostly commands** is a guide. Move the task; keep the model.
- **A guide that explains a model before its first command** is leaning on a missing concept page. Write the concept page and link to it.

---

## 5. Reader-Facing Identifiers Are Governed Content

A value a reader types is documentation, and the terminology rules apply to it exactly as they apply to prose: flag values, check and profile names, state names, directory names in a customer repository, and anything printed in output a page reproduces.

Writing out a list of such identifiers is the cheapest way to find the ones that violate the rules. Documenting a set of check names surfaced three that could not appear on a customer page at all, because they carried words the terminology reference forbids. The names were renamed in the platform; the documentation was not written around them.

When an identifier cannot be documented in the product's own vocabulary, the identifier is wrong, not the page. See [Terminology Rules & Constraints](./terminology-and-conventions.md) §1 and §4.

---

## 6. Placement Does Not Excuse an Unbuilt Claim

A page for behaviour that does not exist yet has no correct home. Deciding where it would go is not permission to publish it.

Write the pages when the behaviour is implemented, and verify them against the working implementation. Where a design is settled and the documentation is written ahead of it, hold the change until the behaviour ships rather than describing it as available. See [Evidence & Review Criteria](./evidence-and-review-criteria.md) §1.

---

## 7. Checklist for a Multi-Page Change

Before finishing a change that touches more than one page:

1. **One home each.** No table, flag list or exit status appears on two pages.
2. **Every link resolves.** Every internal link points at a file that exists, and every command anchor matches a heading.
3. **Navigation is complete.** Every new page is in `docs.json`, in reading order, and no entry points at a deleted page.
4. **Deletions leave no orphans.** Removing a page means re-pointing everything that linked to it, including the link that was the only path to a list.
5. **Commands live in `cli/` and `guides/`.** A documentation page naming a command does it inline, linked, without a bash block.
6. **The reference is complete.** A command a reader can run has an entry with its flags; a flag with a closed set of values says where that set is listed.
7. **Identifiers obey the terminology rules**, including values a reader types and output a page reproduces.
