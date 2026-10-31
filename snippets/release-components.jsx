export const ReleaseComponents = ({ release }) => {
  const clusters = release.groups.filter(
    (g) => g.id !== "bootstrap" && release.components.some((r) => r.cluster === g.id)
  );
  const [cluster, setCluster] = useState(clusters[0] ? clusters[0].id : "");
  const [node, setNode] = useState(release.nodes[0].id);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [page, setPage] = useState(0);
  const perPage = 15;

  const changed = {};
  (release.changes || []).forEach((c) => {
    changed[c.cluster + "/" + c.type + "/" + c.name] = c;
  });

  const inView = release.components.filter((r) => r.cluster === cluster && r.nodes.includes(node));
  const types = ["all"].concat(Array.from(new Set(inView.map((r) => r.type))).sort());
  const q = query.trim().toLowerCase();
  const rows = inView.filter(
    (r) =>
      (type === "all" || r.type === type) &&
      (!q ||
        r.name.toLowerCase().includes(q) ||
        r.component.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q))
  );
  const pages = Math.max(1, Math.ceil(rows.length / perPage));
  const current = Math.min(page, pages - 1);
  const shown = rows.slice(current * perPage, current * perPage + perPage);

  const reset = () => {
    setType("all");
    setPage(0);
  };
  const count = (c, n) => release.components.filter((r) => r.cluster === c && r.nodes.includes(n)).length;

  return (
    <div className="rel not-prose">
      <div className="rel-groups">
        {clusters.map((g) => (
          <button
            key={g.id}
            className={"rel-group" + (g.id === cluster ? " is-active" : "")}
            onClick={() => {
              setCluster(g.id);
              reset();
            }}
          >
            {g.title}
          </button>
        ))}
      </div>

      <div className="rel-tabs" role="tablist">
        {release.nodes.map((n) => (
          <button
            key={n.id}
            role="tab"
            aria-selected={n.id === node}
            className={"rel-tab" + (n.id === node ? " is-active" : "")}
            onClick={() => {
              setNode(n.id);
              reset();
            }}
          >
            {n.title}
            <span className="rel-count">{count(cluster, n.id)}</span>
          </button>
        ))}
      </div>

      <div className="rel-tools">
        <input
          className="rel-search"
          type="search"
          placeholder="Search components"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(0);
          }}
        />
        <select
          className="rel-select"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setPage(0);
          }}
        >
          {types.map((t) => (
            <option key={t} value={t}>
              {t === "all" ? "All types" : t}
            </option>
          ))}
        </select>
      </div>

      <ComponentRows rows={shown} changed={changed} />

      <div className="rel-pager">
        <span className="rel-muted">
          Showing {rows.length ? current * perPage + 1 : 0}–{Math.min(rows.length, current * perPage + perPage)} of{" "}
          {rows.length}
        </span>
        <span className="rel-pages">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              className={"rel-page" + (i === current ? " is-active" : "")}
              onClick={() => setPage(i)}
            >
              {i + 1}
            </button>
          ))}
        </span>
      </div>
    </div>
  );
};

export const BootstrapTools = ({ release }) => {
  const changed = {};
  (release.changes || []).forEach((c) => {
    changed[c.cluster + "/" + c.type + "/" + c.name] = c;
  });
  const rows = release.components.filter((r) => r.cluster === "bootstrap");
  return (
    <div className="rel not-prose">
      <ComponentRows rows={rows} changed={changed} />
    </div>
  );
};

export const ComponentRows = ({ rows, changed }) => (
  <div className="rel-table-wrap">
    <table className="rel-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Version</th>
          <th>Type</th>
          <th>License</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => {
          const c = changed[r.cluster + "/" + r.type + "/" + r.name];
          const from = r.via.length ? r.via.join(", ") : r.boundaries.length ? "Boundary " + r.boundaries.join(", ") : "";
          return (
            <tr key={r.cluster + r.type + r.name}>
              <td>
                <span className="rel-name">{r.name}</span>
                <span className="rel-desc">
                  {r.component}. {r.description}
                </span>
                {from && <span className="rel-desc">{from}</span>}
              </td>
              <td>
                <span
                  className={"rel-version" + (r.version === "unpinned" ? " is-unpinned" : "")}
                  title={r.digests.join("\n")}
                >
                  {r.version}
                </span>
                {c && c.kind === "changed" && <span className="rel-from">from {c.from}</span>}
                {c && c.kind === "added" && <span className="rel-from">new</span>}
              </td>
              <td>
                <span className="rel-type">{r.type}</span>
              </td>
              <td className="rel-muted">{r.license || "Not recorded"}</td>
            </tr>
          );
        })}
        {rows.length === 0 && (
          <tr>
            <td colSpan={4} className="rel-muted">
              No components match.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export const ReleaseChanges = ({ release }) => {
  const changes = release.changes;
  if (!changes) {
    return (
      <p className="rel-muted not-prose">
        {release.previous
          ? `${release.previous} was published before inventories, so there is nothing to compare against.`
          : "This is the first inventoried version."}
      </p>
    );
  }
  if (changes.length === 0) {
    return <p className="rel-muted not-prose">No component changed since {release.previous}.</p>;
  }
  const title = {};
  release.groups.forEach((g) => {
    title[g.id] = g.title;
  });
  const nodeTitle = {};
  release.nodes.forEach((n) => {
    nodeTitle[n.id] = n.title;
  });
  return (
    <div className="rel-table-wrap not-prose">
      <table className="rel-table">
        <thead>
          <tr>
            <th>Component</th>
            <th>Where</th>
            <th>Change</th>
            <th>New version</th>
            <th>Previous version</th>
          </tr>
        </thead>
        <tbody>
          {changes.map((c) => (
            <tr key={c.cluster + c.type + c.name}>
              <td>
                <span className="rel-name">{c.name}</span>
              </td>
              <td className="rel-muted">
                {title[c.cluster]}
                {c.nodes.length > 0 && <span className="rel-from">{c.nodes.map((n) => nodeTitle[n]).join(", ")}</span>}
              </td>
              <td>
                <span className={"rel-kind is-" + c.kind}>{c.kind}</span>
              </td>
              <td>{c.to || "—"}</td>
              <td className="rel-muted">{c.from || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
