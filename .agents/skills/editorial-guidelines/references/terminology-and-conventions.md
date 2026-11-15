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

## 5. Interface Contract: the CLI Performs Every Platform Operation

Every platform operation in documentation is a `kakt` command. No `gh`, `kubectl`, `helm`, `curl`, or script performs or inspects platform state on a documented page.

- **The test — who owns the outcome?** If the platform owns it, it is a `kakt` command. If no such command exists, that is a gap in the CLI, not a licence to reach for another tool.
- **There is no permitted-tool list.** A tool being commonly installed does not make it a vehicle for a platform step. This is precisely how the rule has been bypassed before: the stable release procedure was performed with `gh release create`, which no rule forbade because `gh` was listed as permitted, and the step was therefore left undocumented rather than built.
- **Never document scripts.** No script path appears on any page — `./scripts/anything.sh` — whether it ships in a tenant's repository or in the platform's own. Two interfaces mean two contracts: a script is unversioned relative to the bundle, while the CLI carries the platform version.
- **Why this rule exists**: the CLI is the platform's supported surface. Every operation documented through another tool is an operation the platform does not own, cannot version, and cannot change without breaking a reader who followed the page.

### Three exceptions, and no others

- **Obtaining the CLI**, which cannot be done with the CLI. The published install methods only — the package manager, the release asset and its checksum, and the published installer, whose URL is a script path and is the one that may appear despite the clause above. It is a release artefact rather than a script shipped in a repository, and there is no CLI to install the CLI with.
- **`git` against the reader's own repository.** Committing and pushing a declaration is the tenant's act and the platform's contract — the push is what builds. `kakt` renders declarations; it does not commit them.
- **What the reader owns, acted on with whatever tool fits.** Their repository, their CI, their cluster, their container registry, their application's own build. Starting a workflow in their repository, following a run, reading their own pods, packaging and pushing their own application chart.

  **Named as a category, not a tool list.** A list is what this rule removed: `gh` was "permitted", so `gh release create` performed a platform operation that nothing forbade. The exception is the *ownership*, so it covers `helm push` of the reader's chart for the same reason it covers `git push` of their declaration, and covers neither when the artefact is the platform's.

  The test decides every case. `gh run watch` on their repository is theirs; `gh release create` on the platform's is a platform operation and a CLI gap. `kubectl get pods` in their cluster is theirs; `kubectl apply` of a platform resource is not. `helm push` of their application chart is theirs; `helm push` of a platform chart is not. What makes the difference is who owns the outcome, never which binary is invoked.

### Handling a gap

When a procedure needs a step that has no `kakt` command:
1. Say on the page that the step exists and is not yet a command.
2. Record the gap against the platform repository.

Do not document the external command, and **do not omit the step**. An omitted step makes the whole procedure silently not work, which is the failure this rule exists to prevent — and omission is what the previous wording encouraged, because "do not document around it" was the only instruction it gave.
