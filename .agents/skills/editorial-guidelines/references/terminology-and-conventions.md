# Terminology Rules and Language Constraints

These are hard constraints for Kamarkat documentation — never deviate.

---

## 1. Hard Constraints Replacement Table

| Avoid | Use instead | Rationale |
| :--- | :--- | :--- |
| **hub** | **management cluster** | The management cluster is the active controller hosting platform services. |
| **spoke** | **managed cluster** | Managed clusters are where tenant workloads run. |
| **control plane** (for platform services) | **management cluster** (the actor) or **platform services** (what it runs) | "Control plane" strictly means a cluster's Kubernetes control plane nodes, which every cluster has. |
| **fleet** | **application** (or **app**) | Applications are the unit of workload declaration and isolation. |
| **organization** (for platform assets) | **tenant** | The tenant is the business ownership boundary of a box. |
| **tenant repository** | **GitOps repository** | The GitOps repository is the single source of desired state. |
| **organization provisioning** | **tenant provisioning** | Provisioning creates tenant environments and boundaries. |
| **platform tools** (alone) | **capabilities** | Introduced as "the platform capabilities your applications need". |
| **catalog, register an app** | *none* | Every capability ships in the bundle; an app exists because its declaration is committed. |
| **catalogue, catalog** (of components) | **capability**, **platform distribution** | The platform is an integrated OS, not an itemized a-la-carte catalog. |
| **Kamarkat deploys / applies / pushes to your cluster** | **Kamarkat publishes a version; your management cluster applies it** | The management cluster reconciles state; Kamarkat does not push into customer clusters. |
| **Kamarkat manages / operates your box** | **Kamarkat delivers the platform into your box** | The customer operates their box; Kamarkat provides the software distribution. |
| **upgrade** (as something Kamarkat does) | **upgrade proposal you accept** | Upgrades are declared proposals reconciled upon customer approval. |
| **SaaS, hosted platform** | **delivered into your box** | The platform runs entirely within the customer's cloud infrastructure. |
| **internal component names** (`hub-operator`, `kube-sbt`, `mcp-server`) | **the capability they provide** | E.g., platform operator, tenant provisioning, control-plane API. |

---

## 2. Tenant, Not Organization

- **Tenant** is the platform's primary word for the business entity that owns a box: its clusters, applications, costs, and isolation boundary. Use it in prose, not only in code identifiers.
- **Organization** means one thing and nothing else: the external identity provider's container for users, projects, and clients. A tenant is bound to one.
- **"git organization"** is the one other legitimate use, naming the reader's entity in their git provider where repositories, runners, and registries live. Always qualify it with "git".
- **A bare "your organization" is forbidden** because it creates confusion between the tenant and the git organization.
- For plain English about companies, write "teams" or name them directly: "built for teams without a platform team".

---

## 3. Capabilities over Vendor Names

Name the platform capability, never the third-party open-source project behind it:
- Write **"the GitOps engine"**, not the vendor project name.
- Write **"the identity provider"**, not the vendor project name.
- Write **"the secret store"**, not the vendor project name.
- Write **"the database"**, not the vendor project name.
- Write **"observability"**, not the vendor project name.

### Exceptions
1. **Literal configuration values**: Where a literal value the reader must type or set (a secret name, a URL parameter, or an external CLI tool) includes the vendor name.
2. **Capability attribution sections**: When specifically listing the open-source projects a capability is built on.
3. **Release inventories**: Release metadata documents every component by name as an inventory.

---

## 4. No Internal References

Customer documentation never cites internal platform architecture decision records (ADRs), internal file paths of the platform repository, internal ticket IDs, or design history. Describe only the current, supported design, never what it replaced.

---

## 5. Interface Contract: Only the CLI, Never a Platform Script

Every documented procedure must be a supported CLI command.
- **Never document platform scripts**: Never instruct readers to run scripts that ship in the GitOps repository (`./scripts/anything.sh` must not appear in documentation).
- **Why this rule exists**: Two interfaces mean two contracts. A script in a tenant repository is an unversioned copy that ages independently, while the CLI carries the platform version. Documenting scripts creates conflicting operational contracts.
- **Permitted external CLIs**: `git`, `gh`, and `kubectl` are allowed as standard prerequisites installed by the reader.
- **Handling gaps**: If a procedure can only be accomplished via an unversioned script, that is a gap in the CLI. Report the gap; do not document around it.
