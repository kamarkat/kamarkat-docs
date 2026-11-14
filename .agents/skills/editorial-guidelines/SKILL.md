---
name: editorial-guidelines
description: Durable writing guidelines, audience calibration, and product mental model for Kamarkat documentation. Use whenever authoring, editing, or reviewing documentation to ensure consistent product positioning as an agentic cloud-native platform OS for businesses, preserving customer ownership, architectural boundaries, and technical credibility.
---

# Kamarkat Editorial Guidelines

These guidelines define how to communicate, position, and document Kamarkat. This skill is a durable editorial contract governing future writing, independent of specific navigation layouts, commands, or release inventories.

---

## Product North Star and Category

- **North Star**: *Kamarkat provides a single executable that establishes an enterprise-grade cloud platform in the customer's own infrastructure, without the usual enterprise platform engineering hassles.*
- **Category & Positioning**: *Agentic Cloud-Native Platform OS for Businesses*.

The product unites three conceptual layers into one coherent offering:
1. **Business-Owned Cloud Infrastructure**: Compute, storage, and networking provisioned directly inside the customer's cloud account under credentials only the customer holds.
2. **Integrated Cloud-Native Platform OS**: Standardized, production-grade infrastructure, application runtime, and operational capabilities operating through consistent contracts.
3. **Agentic Operations**: Engineering and authorized software agent workflows interacting through the same native platform contracts (including platform agents, the MCP registry, and the skills registry).

---

## Reference Index

The complete editorial guidelines are structured into modular reference documents. Consult the relevant reference based on your task:

| Reference Document | When to Consult |
| :--- | :--- |
| [Audience & Product Positioning](./references/audience-and-positioning.md) | **Before planning or writing any document.** Covers primary adoption audiences (Startup CEOs and CTOs), technical engineering audiences, the unified audience principle, the single-executable delivery model, and writing from the finalized-product perspective. |
| [Product Mental Model & Concepts](./references/product-mental-model.md) | **When explaining platform architecture or behavior.** Covers foundational invariants (integration is the product, declarative desired state, business ownership), precise concept definitions (`Box`, `Tenant`, `Managed Cluster`, `Cell`, `GitOps repository`, `Bundle`, `Capability`, `Day-0`, `Support Agent`, `Escrow`), and protected architectural distinctions. |
| [Terminology Rules & Constraints](./references/terminology-and-conventions.md) | **When drafting or reviewing terminology.** Covers the hard constraints replacement table (Avoid vs. Use Instead), the "Tenant, not organization" rule, capability naming over vendor names, prohibition of internal references (ADRs, internal paths), and the CLI-only interface contract. |
| [Writing & Narrative Standards](./references/writing-and-narrative-standards.md) | **When drafting and polishing prose.** Covers the 5-step narrative hierarchy ($\text{Problem} \to \text{Platform Value} \to \text{Operating Model} \to \text{Ownership} \to \text{Mechanism}$), tone and voice (second person, active voice, present tense), sentence construction, what to avoid (no filler, no bullet-dumping, no em-dash overuse), and architectural diagram standards. |
| [Evidence & Review Criteria](./references/evidence-and-review-criteria.md) | **Before finalizing or publishing documentation.** Covers the technical accuracy and evidence verification rules, what this skill must not become (anti-patterns), and the 10-point semantic review checklist. |

---

## Pre-Publication Checklist

Before completing any documentation change, ensure:
1. **Audience Alignment**: The practical business value is clear to a startup CEO, and the architectural foundation is credible to a CTO.
2. **Product Identity**: Kamarkat is presented as an integrated platform OS delivered via a single executable, not a collection of open-source tools.
3. **Agentic Integration**: Agents are bounded participants within the platform operating model, never an independent control system.
4. **Ownership Boundaries**: Customer ownership of infrastructure, credentials, applications, and data is explicitly maintained.
5. **Verified Evidence**: Operational and architectural claims are backed by current authoritative implementations, not aspirational roadmaps.
