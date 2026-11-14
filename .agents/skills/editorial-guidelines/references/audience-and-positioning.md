# Audience and Product Positioning

This reference defines who Kamarkat documentation speaks to, the product north star, and its category positioning.

---

## 1. Audience — The First Principle

Kamarkat documentation must speak directly to the people the product is built to serve, maintaining a unified product promise throughout.

### Primary Adoption Audience: Startup CEOs and CTOs
Business and technical leaders evaluating whether Kamarkat is the right infrastructure foundation for their business. The documentation must clearly answer:
- **What business and engineering problem Kamarkat removes**: Eliminating the friction, risk, and distraction of building custom platform infrastructure.
- **Why install an integrated platform instead of assembling one**: Acquiring a tested operating foundation on Day-1 rather than spending months stitching open-source tools together.
- **What they receive and what they remain responsible for**: Clear boundaries between platform-provided capabilities and customer-owned code, data, and configurations.
- **Enterprise-grade foundations without a platform team**: How Kamarkat establishes enterprise resilience, security, and governance without requiring them to hire and staff a dedicated internal platform engineering team.
- **Architectural credibility**: Why the operating model, contracts, and security boundaries are credible enough to adopt for a serious, mission-critical business.

### Technical Audience: Startup Engineering Teams
Engineers, tech leads, and operators who install, integrate, and run workloads on the platform. They need precise, actionable explanations of:
- The operating model and declarative reconciliation mechanics.
- Ownership, credentials, network isolation, and security boundaries.
- Standardized application delivery and service consumption.
- System behavior, observability, and diagnostic workflows.

### The Unified Audience Rule
- **Do not assume specialist expertise**: Do not assume readers are Kubernetes internals specialists or dedicated platform engineers.
- **Do not dumb down technical material**: Explain technical concepts clearly when they matter, with sufficient depth and precision for a CTO or staff engineer to evaluate them rigorously.
- **One coherent story**: The audience is not a collection of disconnected personas requiring separate product stories. The product promise must remain accessible to business decision-makers while remaining technically credible to engineering leads.

---

## 2. Product North Star

> **Kamarkat provides a single executable that establishes an enterprise-grade cloud platform in the customer's own infrastructure, without the usual enterprise platform engineering hassles.**

When applying this north star:
- The **single executable** is the unified installation entry point that delivers the platform into customer infrastructure. Do not imply the entire installation or ongoing operation necessarily consists of a single shell command.
- The **integrated platform OS** is the product. Do not reduce Kamarkat to a CLI tool, a Kubernetes installer, a deployment automation script, or a collection of open-source utilities.
- The business outcome is providing a production-capable, standardized operating foundation so startups avoid the time, cost, and fragility of assembling infrastructure independently. Every product explanation should reinforce this outcome.

---

## 3. Finalized Product Category and Positioning

### Category: Agentic Cloud-Native Platform OS for Businesses

Kamarkat integrates three conceptual layers into a single coherent product:

1. **Business-Owned Cloud Infrastructure**: Compute, storage, and networking provisioned directly inside the customer's cloud account under credentials only the customer holds.
2. **Integrated Cloud-Native Platform OS**: Standardized, production-grade infrastructure, application runtime, and operational capabilities operating through consistent contracts.
3. **Agentic Operations**: Engineering and authorized software agent workflows interacting through the same native platform contracts, including platform agents, the MCP registry, and the skills registry.

*These are conceptual layers of one unified product, not three separately installed, purchased, or configured products.*

### The Agentic Boundary
- Engineers and authorized agents operate against the **same platform concepts, capabilities, permissions, and authoritative sources of truth**.
- Agentic functionality must **never** be presented as an independent control plane or an autonomous authority over infrastructure. Agents are authorized participants operating within explicit platform contracts and guardrails.
- Never rebrand Kamarkat as merely an infrastructure provisioner, a generic Kubernetes distribution, an internal developer portal (IDP), a conversational chatbot, or a collection of AI wrappers.

---

## 4. Writing from the Finalized-Product Perspective

- **Communicate the coherent vision**: Write from the perspective of the finalized, integrated platform OS. Do not fragment conceptual positioning into "today's features" versus "tomorrow's backlog". The conceptual product story must not read like an internal engineering roadmap or backlog.
- **Maintain operational accuracy**: When writing technical procedures, commands, configurations, and operational references, document only supported, verified platform behavior.
- **The rule of distinction**:
  - *Product Positioning*: Describe the intended complete platform, its architecture, and its business value.
  - *Operational Documentation*: Describe supported behavior, boundaries, and prerequisites with absolute fidelity to working code. Never invent unbuilt procedures or flags to make a narrative appear complete.
