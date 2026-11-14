# Product Mental Model and Architectural Principles

This reference defines Kamarkat's core mental model, operational invariants, essential architectural distinctions, and precise concept definitions.

---

## 1. Established Mental Model (Writing Invariants)

These foundational invariants must be preserved across all explanations:

- **Integration is the product**: Packaging open-source components is not the product. The value is engineered integration—unifying disparate infrastructure, security, and runtime capabilities into a tested, standardized operating system.
- **One operating foundation**: Infrastructure, applications, and operations share a unified contract rather than requiring teams to integrate independent systems themselves.
- **One coordinated platform distribution**: Platform releases deliver tested, compatible capabilities together as a cohesive release, eliminating fragmented, component-by-component upgrade matrices.
- **Declarative desired state**: Version-controlled declarations in Git represent intended state. Platform controllers continuously reconcile observed state toward declared state. Runtime observations and imperative diagnostics are never confused with desired-state declarations.
- **Standardized application delivery**: Workloads declare the infrastructure and services they need through standard platform conventions, removing repetitive, bespoke per-application plumbing.
- **Unified agentic operations**: Agents and engineers share identical operational boundaries, credentials, auditability, and contracts.
- **Business ownership**: The customer retains absolute ownership of their cloud accounts, infrastructure, credentials, applications, data, and decisions. Kamarkat delivers and integrates the platform; it does not take control of customer infrastructure.

---

## 2. Concepts to Use Accurately

Use these foundational concepts with exact semantic precision:

### Box (Platform Instance)
A management cluster running the platform's services, plus the managed clusters it provisions. It runs in the customer's cloud account under credentials only the customer holds, belongs to one tenant, and continues running whether or not Kamarkat is reachable.

### Tenant and Application
The **tenant** owns the box, and is bound to one organization in the identity provider. An **application** is a customer product running on it, and the fundamental unit of isolation: its own namespace, database, identity project, secret path, and network policy. Being in the same tenant never grants access; only an explicit declaration does.

### Managed Cluster
A cluster the box provisions and runs applications on. Its name is chosen by the customer, written once, and fixed for life: applications name the cluster they run on, and the cluster's secret path and backup prefix are named for it. Several managed clusters may serve one environment.

### Cell
A policy group, **not** a cluster. It holds no compute, pins no version, and owns nothing; a cluster may belong to several cells and receives the union of their policy. A residency policy on a cell is checked against the region of every cluster in it. Never use "cell" for a cluster's name. The three facts a cluster declares (its name, the environment it serves, and the cells it belongs to) are independent.

### GitOps Repository
The version-controlled repository in the customer's git organization. For each cluster, it holds the platform bundle version and customer values; for each application, its declaration and workload chart versions. It is the single source of desired state for the entire box.

### Bundle (Platform Distribution)
The complete platform at one immutable version, published as one coordinated artifact and mirrored into infrastructure the customer controls. Upgrades change one version field per cluster.

### Capability
What the platform integrates and provides. Machinery capabilities run on every box; selectable capabilities (database, observability, on-premises capacity) are chosen in the cluster's values. Selecting a capability never makes it the customer's burden to maintain.

### Day-0
The one-time creation of the management cluster, run from the customer's own CI environment. After Day-0, the GitOps repository is the sole operating authority.

### Support Agent
An open-source agent on every cluster that does nothing until the customer explicitly enrols. When enrolled, it sends an allowlisted set of control-plane facts outward; the customer can preview the exact payload before transmission.

### Escrow
A secret manager the customer controls outside the box, holding the box's master keys and each cluster's break-glass administrator kubeconfig.

---

## 3. Protected Architectural Distinctions

Maintain clear, precise boundaries between platform concepts without hardcoding temporary implementation details:

| Concept A | Concept B | Distinction to Maintain |
| :--- | :--- | :--- |
| **Platform OS** | **Installer** | The platform OS is the enduring product and runtime operating experience; the installer is its unified delivery mechanism. |
| **Box / Platform Instance** | **Management Cluster** | The box is the customer's complete platform estate; the management cluster is the specific compute cluster hosting platform services and controllers. |
| **Tenant** | **Identity / Git Organization** | A tenant is the platform's business ownership and isolation boundary; an organization is an external identity provider container or git provider entity. |
| **Environment** | **Physical Cluster** | An environment (e.g., staging, prod) is an operational stage; a cluster is an infrastructure compute boundary. Environments can span or share clusters based on policy. |
| **Application** | **Platform Capability** | Applications are customer-owned business workloads; capabilities are platform-provided shared services (database, identity, secret store, ingress, observability). |
| **Distribution / Bundle** | **Individual Component** | A platform distribution is a coordinated, tested release of the entire system; individual components are internal upstream pieces. |
| **Desired State** | **Runtime / Observed State** | Desired state is declared in version control; runtime state is what is currently running and actively reconciled. |
| **Platform Authority** | **Agent Authorization** | The platform enforces system contracts and security; agents act strictly within delegated, scoped authorizations. |
| **Customer Ownership** | **Platform Responsibility** | The customer owns infrastructure, data, and decisions; Kamarkat is responsible for the tested integration and platform distribution. |

---

## 4. Implementation Independence

- **Verify operational terms against current contracts**: Use established platform contracts to determine exact terms rather than guessing.
- **Do not hardcode ephemeral implementation details**: Avoid embedding temporary repository naming conventions, workflow filenames, specific command flags, or release version numbers in writing guidelines.
- **Avoid procedural sequences in definitions**: Concepts define relationships, authority, and boundaries; they do not dictate temporary execution order.
