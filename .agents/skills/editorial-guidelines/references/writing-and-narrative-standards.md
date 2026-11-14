# Writing and Narrative Standards

This reference defines the narrative hierarchy, audience calibration rules, prose mechanics, anti-patterns, and architectural diagram standards for Kamarkat documentation.

---

## 1. Narrative Hierarchy

When explaining platform concepts, capabilities, or workflows, follow this order of reasoning:

$$\text{Business Problem} \longrightarrow \text{Integrated Platform Value} \longrightarrow \text{Operating Model} \longrightarrow \text{Customer Ownership} \longrightarrow \text{Technical Mechanism}$$

### Applying the Hierarchy by Document Type
- **Not every document requires all five elements**: Adapt the depth and starting point to the document's specific purpose.
- **Conceptual and adoption topics**: Establish the business problem and integrated platform value before introducing technical mechanisms.
- **Technical procedures and guides**: Provide direct, precise technical instruction without re-litigating the high-level product pitch.
- **Architectural explanations**: Emphasize contracts, boundaries, and responsibilities rather than reciting component inventories.

---

## 2. Audience-Calibrated Writing

### For Adoption and Conceptual Writing
- **Lead with the problem**: Clearly articulate the business friction or engineering overhead being resolved.
- **Value before mechanics**: Explain what the integrated platform achieves before naming underlying open-source technologies.
- **Connect architecture to operational outcomes**: Tie design principles directly to reliability, security, engineering velocity, and cloud cost control.
- **Accessible to CEOs, credible to CTOs**: Ensure the business logic is immediately transparent to non-technical founders while the architectural integrity satisfies technical scrutiny.
- **Avoid component inventories**: Do not turn conceptual overviews into laundry lists of bundled open-source tools. Focus on the integrated capabilities delivered.

### For Technical and Operational Writing
- **Actionable and precise**: Focus on exact responsibilities, operational boundaries, prerequisites, commands, and consequences.
- **Use accurate terminology**: Employ precise industry and platform terms where they eliminate ambiguity; do not invent conversational substitutes.
- **No marketing spin**: Never mask technical limitations, manual steps, or prerequisites behind promotional phrasing.
- **Context without repetition**: Do not repeat the high-level sales pitch inside technical procedures.

---

## 3. Tone, Voice, and Sentence Construction

- **Second person throughout**: Address the reader directly: "you", "your box", "your team".
- **Active voice**: Avoid passive constructions ("the cluster is provisioned" $\to$ "your management cluster provisions the cluster").
- **Present tense**: State what things do, not what they "will" do.
- **Confident, not promotional**: State facts about the platform with quiet confidence; let the capability speak for itself.
- **No filler phrases**: Eliminate empty marketing adjectives: "easily", "seamlessly", "powerful", "robust", "cutting-edge", "leverage".
- **One idea per sentence**: If a sentence has multiple clauses joined by conjunctions, split it. Use short sentences for core facts; slightly longer sentences to explain sequence or relationships.
- **Start with the subject**: Place the actor first, not an introductory dependent clause (write "Your management cluster reconciles the deployment", not "Once the proposal is merged, your management cluster reconciles the deployment").
- **Structured steps over compound narrative**: When describing sequences or procedures, prefer numbered lists or structured steps over long compound sentences.
- **Structure follows reader intent**: Do not enforce arbitrary paragraph lengths, bullet counts, or rigid section templates. Organize content around what the reader needs to understand or execute.

---

## 4. What to Avoid

- **Bullet-dumping**: Do not write lists of bullets where continuous prose reads better.
- **Deep nesting**: Never nest bullets more than one level deep.
- **Decorative bolding**: Bold only key terms or critical actions the reader needs to spot quickly. Never bold entire sentences for emphasis.
- **Inflated or empty phrases**: Remove phrases that pad copy without adding information:
  - "It is important to note that..."
  - "In order to..."
  - "Please be aware that..."
- **Punctuation mannerisms**: Avoid overuse of ellipses (`...`) or em-dashes (`—`) in body copy.
- **Unbuilt claims**: If a design is decided but not yet built, state that explicitly rather than describing it as currently available.

---

## 5. Architectural Diagrams

- **Diagram CSS classes**: Use the custom `arch-*` classes declared in `style.css`, written as JSX directly within the MDX page.
- **Interactive layer stacks**: Use the `BoundaryStack` component located in `snippets/`.
- **Factual grounding**: Every element, boundary, or connection in a diagram must trace directly to the platform's architectural decisions or its active running configuration — never draw a component or flow that is assumed or speculative.
