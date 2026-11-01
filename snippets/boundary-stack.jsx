export const BoundaryStack = () => {
  const stacks = {
    management: {
      title: "Management cluster",
      layers: [
        {
          tag: "Boundaries 05–07",
          name: "Cluster and workload provisioning",
          color: "#a855f7",
          desc: "Rendered from your GitOps repository for each managed cluster and each application. The management cluster deploys these; they run on the managed clusters.",
          items: [
            { name: "Platform services for managed clusters" },
            { name: "Shared gateway per managed cluster" },
            { name: "Application provisioning" },
            { name: "Application workloads" },
            { name: "Public TLS routes" },
          ],
        },
        {
          tag: "Boundary 04",
          name: "Organization services",
          color: "#f59e0b",
          desc: "The services your applications and people sign in through, and the API that manages organizations and applications.",
          items: [
            { name: "Identity provider" },
            { name: "Identity credentials" },
            { name: "Auth proxy" },
            { name: "Control-plane API" },
            { name: "Cluster identity" },
          ],
        },
        {
          tag: "Boundary 03",
          name: "Platform services",
          color: "#10b981",
          desc: "The services that make the box work: certificates, DNS, the gateway, the secret store, the operators that provision organizations and clusters, and observability.",
          items: [
            { name: "Certificate issuance" },
            { name: "DNS" },
            { name: "Network policy" },
            { name: "Secret store" },
            { name: "Platform operator" },
            { name: "Organization provisioning" },
            { name: "Cluster registration" },
            { name: "Managed-cluster bootstrap templates" },
            { name: "Infrastructure provider" },
            { name: "Cluster autoscaler" },
            { name: "Gateway" },
            { name: "Cluster console" },
            { name: "Telemetry collection" },
            { name: "Observability backend", optional: true },
          ],
        },
        {
          tag: "Boundary 02",
          name: "Platform data",
          color: "#06b6d4",
          desc: "The database and cache that hold the platform's own state.",
          items: [
            { name: "Platform database", optional: true },
            { name: "Platform cache" },
          ],
        },
        {
          tag: "Boundary 01",
          name: "Platform infrastructure",
          color: "#3b82f6",
          desc: "The engines everything above depends on: GitOps, composition, cluster lifecycle, secret delivery, admission policy and the database operator.",
          items: [
            { name: "GitOps engine" },
            { name: "Composition" },
            { name: "Cluster lifecycle resources" },
            { name: "Database operator" },
            { name: "Secret delivery" },
            { name: "Admission policy" },
            { name: "Security infrastructure" },
            { name: "Platform namespaces" },
            { name: "Configuration reloader" },
            { name: "On-premises storage", optional: true },
          ],
        },
        {
          tag: "Day-0",
          name: "Foundation",
          color: "#8b5cf6",
          desc: "Created once, from your CI, before anything is reconciled. Each phase completes before the next starts, and the GitOps engine then takes over every boundary above.",
          items: [
            { name: "Kubernetes and node image" },
            { name: "Secret store" },
            { name: "PKI" },
            { name: "Bootstrap secrets" },
            { name: "GitOps seed" },
          ],
        },
      ],
    },
    workload: {
      title: "Managed cluster",
      layers: [
        {
          tag: "Per application",
          name: "Applications",
          color: "#a855f7",
          desc: "One set per application declared in your GitOps repository, in its own namespace.",
          items: [
            { name: "Namespace and identity" },
            { name: "Database and role" },
            { name: "Your workloads" },
            { name: "Public TLS routes" },
          ],
        },
        {
          tag: "Per cluster",
          name: "Shared gateway",
          color: "#f59e0b",
          desc: "One gateway for the cluster, with a listener for each public hostname. Public traffic for your applications terminates here.",
          items: [
            { name: "Shared TLS gateway" },
            { name: "Listener per public host" },
            { name: "Preview domain" },
          ],
        },
        {
          tag: "Per cluster",
          name: "Platform services",
          color: "#10b981",
          desc: "Everything the platform runs on a managed cluster, delivered as one unit from the management cluster.",
          items: [
            { name: "Composition and database roles" },
            { name: "Secret delivery" },
            { name: "Certificate issuance" },
            { name: "Cluster DNS and node-local cache" },
            { name: "DNS records" },
            { name: "Admission policy" },
            { name: "Database cluster and backups" },
            { name: "Progressive delivery" },
            { name: "Sandboxed runtime" },
            { name: "Telemetry collection" },
            { name: "Observability stores and alerts" },
            { name: "Configuration reloader" },
          ],
        },
        {
          tag: "At creation",
          name: "Foundation",
          color: "#8b5cf6",
          desc: "Installed as the cluster is created, so it can join the box and be reconciled from then on.",
          items: [
            { name: "Kubernetes and node image" },
            { name: "Network" },
            { name: "GitOps agent" },
            { name: "Core resource definitions" },
          ],
        },
      ],
    },
  };

  const [view, setView] = useState("management");
  const [active, setActive] = useState(0);
  const layers = stacks[view].layers;
  const gap = 34;

  return (
    <div className="bstack not-prose">
      <div className="bstack-tabs" role="tablist">
        {Object.entries(stacks).map(([key, stack]) => (
          <button
            key={key}
            role="tab"
            aria-selected={view === key}
            className={"bstack-tab" + (view === key ? " is-active" : "")}
            onClick={() => {
              setView(key);
              setActive(0);
            }}
          >
            {stack.title}
          </button>
        ))}
      </div>
      <div className="bstack-body">
        <ul className="bstack-list">
          {layers.map((layer, i) => (
            <li key={layer.name}>
              <article
                className={"bstack-layer" + (i === active ? " is-active" : "")}
                style={{ "--layer": layer.color }}
              >
                <button className="bstack-head" onClick={() => setActive(i)}>
                  <span className="bstack-tag">{layer.tag}</span>
                  <span className="bstack-name">{layer.name}</span>
                </button>
                <div className="bstack-detail">
                  <div>
                    <p className="bstack-desc">{layer.desc}</p>
                    <div className="bstack-chips">
                      {layer.items.map((item) => (
                        <span
                          key={item.name}
                          className={"bstack-chip" + (item.optional ? " is-optional" : "")}
                        >
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <div
          className="bstack-visual"
          style={{ height: 200 + (layers.length - 1) * gap + 16 + "px" }}
          aria-hidden="true"
        >
          {layers.map((layer, i) => (
            <div
              key={layer.name}
              className={"bstack-plate" + (i === active ? " is-active" : "")}
              style={{
                "--layer": layer.color,
                bottom: (layers.length - 1 - i) * gap + (i === active ? 16 : 0) + "px",
                zIndex: layers.length - i,
              }}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
      <p className="bstack-legend">
        <span className="bstack-chip is-optional">Dashed</span> selectable capability
      </p>
    </div>
  );
};
