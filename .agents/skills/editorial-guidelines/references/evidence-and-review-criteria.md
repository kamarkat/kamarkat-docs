# Evidence, Accuracy, and Review Criteria

This reference defines the evidence verification standards, anti-patterns, and semantic review criteria for Kamarkat documentation.

---

## 1. Technical Accuracy and Evidence Rule

This skill governs **how to describe the product**, not what is currently implemented in code.

- **Authoritative verification**: Before making an operational, architectural, or availability claim, verify it against the current authoritative implementation, supported platform contracts, or published release inventories.
- **No aspirational claims**: Never convert an approved design proposal, roadmap initiative, or aspirational vision into a claim of current availability. If a capability is in design or partial implementation, document only what is currently operational and supported.
- **Surface discrepancies**: If documentation or user requests contradict the established product mental model, surface the contradiction directly rather than silently inventing an ad-hoc reconciliation.
- **Not a replacement for technical review**: Editorial clarity never substitutes for technical verification against working systems.

---

## 2. What This Skill Must Not Become

This skill is an editorial and conceptual contract. It must never become:
- A copy or summary of the documentation.
- A repository architecture reference or code walkthrough.
- A CLI command flag reference.
- A software release inventory or version catalog.
- An installation script or deployment specification.
- An engineering roadmap or backlog list.
- A promotional marketing page.
- A rigid, one-size-fits-all document template.
- A substitute for verifying technical behavior.

---

## 3. Review Criteria for Future Writing

Before publishing or finalizing any documentation change, verify the work against these ten questions:

1. **CEO clarity**: Would a startup CEO immediately understand the business problem removed and the practical reason to adopt Kamarkat?
2. **CTO credibility**: Would a startup CTO recognize an enterprise-grade, technically sound operating architecture?
3. **Product north star**: Does the narrative reinforce the single-executable delivery and installed-not-assembled outcome?
4. **Integrated platform OS**: Is Kamarkat presented as a coherent platform operating system rather than an assortment of infrastructure tools?
5. **Integrated agentic model**: Are software agents described as operating within standard platform contracts rather than as an independent control system?
6. **Customer ownership**: Are customer authority, infrastructure ownership, and credential boundaries explicitly preserved?
7. **No platform team required**: Is the explanation clear to generalist engineering teams without assuming Kubernetes specialists?
8. **Technical precision**: Are technical descriptions, boundaries, and operational mechanisms accurate and clearly articulated?
9. **Vision without backlog**: Is the product vision presented as a coherent whole without reading like an internal engineering roadmap?
10. **Intentional structure**: Does the document directly serve its specific purpose rather than repeating generic product boilerplate?
