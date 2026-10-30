---
name: writing-style
description: Writing style guide for Nutgraf documentation. Use whenever creating, editing, or reviewing any MDX page in this docs project. Covers product identity, tone, page anatomy, section headings, sentence construction, and length calibration — modelled on manus.im/docs. Always activate this skill before writing any documentation page.
---

# Nutgraf Documentation Writing Style

Nutgraf's documentation follows the writing conventions established by [manus.im/docs](https://manus.im/docs). The goal is prose that is direct and informative — not too sparse, not over-explained. Every sentence earns its place.

## Tone and voice

- Second person throughout: "you", "your brand", "your team".
- Active voice. Avoid passive constructions ("the video is generated" → "Nutgraf generates the video").
- Present tense. State what things do, not what they "will" do.
- Confident but not promotional. State facts about the product; let the feature speak for itself.
- No filler phrases: "easily", "seamlessly", "powerful", "robust", "cutting-edge", "leverage".

## Terminology rules

These are hard constraints — never deviate.

| Avoid | Use instead |
| :- | :- |
| sandbox | computer |
| "running in a sandbox" | "using a computer" |
| multi-agents in a sandbox | multi-agents using a computer |
| channel-builders, video-builders, code-builders | the high-level customer-facing name (e.g. Creative Studio, Product Development) |
| internal builder names | customer-facing capability names only |
| channel (as workspace) | Brand |
| channels (plural workspace) | Brands |
| A2A, Agent-to-Agent protocol, JSON-RPC, REST APIs | background agent collaboration, autonomous coordination |
| technical plumbing, schemas, wire protocols | brand guidelines, verified assets, structured brand rules |

### No internal technical or protocol details

Customer documentation must never expose internal architecture, engineering specs, or wire protocols.
- **Never mention protocols like A2A (Agent-to-Agent protocol)**, JSON-RPC, LangGraph, DAGs, or internal endpoints.
- Focus strictly on the **customer experience and outcomes**: what the agents do for the brand, how they coordinate autonomously in the background, and how brand context propagates without manual effort.
- Frame collaboration around capabilities: *"agents coordinate autonomously in the background"* rather than *"agents communicate over the A2A protocol"*.

## Page anatomy

Every feature page follows this structure — in this order. Do not invent new sections or reorder them.

```
# Page Title

> One or two sentences. What the feature does and why it matters. Plain statement — no marketing copy.

## What it is

3–5 sentences. Explain the concept. What problem it solves and how it fits into the broader product.
A table is appropriate here when comparing modes, types, or options.

## How to use it   (or: Getting Started: [Outcome] in [Time])

Numbered walkthrough with ### sub-steps. Imperative phrasing ("Click...", "Select...", "Review...").
Each sub-step: 3–6 sentences. Enough to be actionable; not a full tutorial.

### 1. Sub-step title
### 2. Sub-step title
...

## What You Need to Know

Operating semantics: inheritance rules, what propagates and when, credit behaviour, limits, isolation boundaries.
Use ### sub-headings for distinct concerns.

## Tips

4–6 bullet points. Bold the key action or principle, then one sentence of explanation.

## Frequently Asked Questions

Blockquote format. Real questions a user would actually ask. 4–6 questions. 2–4 sentence answers. Grounded and specific — no deflection.
```

## Section heading conventions

Follow the exact casing and phrasing from manus.im/docs.

| Section | Exact heading text |
| :- | :- |
| Concept | `## What it is` |
| Walkthrough | `## How to use it` OR `## Getting Started: [Outcome] in [Time]` |
| Semantics | `## What You Need to Know` |
| Best practices | `## Tips` |
| Q&A | `## Frequently Asked Questions` |

Sub-steps under How/Getting Started use `### 1.`, `### 2.`, etc.

## Length calibration

| Section | Target length |
| :- | :- |
| Lead blockquote | 1–2 sentences |
| What it is | 3–5 sentences, optionally 1 table |
| Each ### sub-step | 3–6 sentences |
| What You Need to Know (each sub-section) | 3–6 sentences |
| Tips | 4–6 bullets |
| Each FAQ answer | 2–4 sentences |

Do not pad to fill space. Do not truncate to save space. Match the calibration above.

## Sentence construction

- One idea per sentence.
- Short sentences for key facts. Slightly longer sentences to explain relationships or sequence.
- Start sentences with the subject, not a clause: "Nutgraf generates..." not "Once the topic is approved, Nutgraf generates..."
- When describing a sequence of events, prefer numbered lists or `### N.` sub-steps over long compound sentences.

## What to avoid

- Bullet-dumping where prose would read better.
- Nested bullets more than one level deep.
- Bold text used decoratively. Bold only key terms or actions the reader needs to find quickly.
- Phrases that inflate without adding information: "It is important to note that...", "In order to...", "Please be aware that..."
- Ellipsis or em-dash overuse in body copy.
- Describing the UI in minute detail (exact button coordinates, pixel sizes). Refer to UI elements by their visible label in **bold**.

## Product identity — read this before writing anything

This is the most important section. Get this wrong and all the writing will be wrong.

**What Nutgraf is:**
Nutgraf is an agentic multi-brand building platform. It builds the agentic capabilities a brand needs — and those capabilities grow over time as the platform evolves.

**What Nutgraf is NOT:**
- Not a "media studio" — that is too narrow and defines the platform by its current outputs
- Not a "content production tool" — same problem
- Not a task runner or operations tool — building comes before running

**The correct mental model:**
- The **Brand** is the constant — the persistent unit a customer owns and grows
- **Agentic capabilities** are what Nutgraf builds for that Brand
- Today those capabilities include video production and app development — but these are the first two, not the definition of the platform
- The platform grows: as Nutgraf adds more capabilities, every Brand gains access to them

**Core vocabulary:**
- Use **"build"** as the primary verb — Nutgraf builds agentic capabilities for brands
- Use **"capabilities"** — not "features", not "tools", not "modules"
- Use **"Brand"** — the top-level unit. Not "project", not "workspace" as the primary label, not "channel"
- Avoid framing the product around any specific Computer (video, code) — these are capabilities, not the product identity

---

## Nutgraf-specific concepts to use accurately

Use these explanations as reference when writing about each concept.

**Brand**
A persistent workspace for one brand business. Holds the master brand brief, creative direction, target audience, and digital presenter configurations. A customer can run multiple Brands under a single account — each Brand is fully isolated. The Brand is the core unit of Nutgraf: agentic capabilities are built for it and scoped to it.

**Stories**
The daily session bar inside a Brand. Shows all active and completed computer runs for the day, grouped by date. Each story tab corresponds to a conversation with the Brand agent or with a specific Computer (Video, Code, etc.).

**Computer**
A specialized multi-agent system that uses a computer to complete a defined, priced outcome. Multi-agents using a computer handle the work end to end. The customer directs the outcome; the Computer executes it. Many Computers can run under a single Brand, all drawing from the same credit pool.

**Credits**
The unit of payment for outcome runs. Each Computer run has a fixed credit price shown before execution begins. The full price is reserved upfront — runs never start without sufficient balance and never charge unpredictably mid-run. Monthly included credits reset each period; purchased add-on credits carry over.

**Creative Studio / Video**
The Computer that produces broadcast-ready video from a topic or brief. Multi-agents using a computer handle scripting, voice synthesis, digital presenter animation, scene assembly, and rendering. First draft delivered in approximately 15 minutes.

**Product Development / Code**
The Computer that builds interactive web and mobile applications from a natural-language description. An orchestrator and a coder agent collaborate using a computer, with the result rendered live on the interactive preview canvas.

**Conversational editing**
The director-mode experience inside the video player drawer. After a first draft is delivered, the customer reviews individual scenes and requests changes in natural language within the same session.

**Digital presenters**
AI-generated on-screen personas created from a single uploaded photograph. Each presenter is styled and calibrated with a voiceprint for a specific show format or audience.

## References

Read these only when your task requires them:

- [manus.im/docs/introduction/welcome.md](https://manus.im/docs/introduction/welcome.md) — reference for the Welcome page tone and length
- [manus.im/docs/features/projects.md](https://manus.im/docs/features/projects.md) — reference for a full feature page using the standard anatomy
- [manus.im/docs/website-builder/getting-started.md](https://manus.im/docs/website-builder/getting-started.md) — reference for the "Getting Started: X in Y Minutes" walkthrough pattern
- [manus.im/docs/introduction/plans.md](https://manus.im/docs/introduction/plans.md) — reference for the Plans and Pricing page
- [manus.im/docs/automations.md](https://manus.im/docs/automations.md) — reference for a longer feature page with tables, tips, and FAQ
