export const ReleaseLine = ({ line }) => {
  const [open, setOpen] = useState(line.releases.length ? line.releases[0].version : "");
  return (
    <div className="rel-line not-prose">
      {line.releases.map((r) => {
        const isOpen = r.version === open;
        const changes = r.changes || [];
        return (
          <div key={r.version} className={"rel-item" + (isOpen ? " is-open" : "")}>
            <button className="rel-item-head" onClick={() => setOpen(isOpen ? "" : r.version)}>
              <span className="rel-name">{r.version}</span>
              {r.latest && <span className="vlc-pill is-latest">Latest</span>}
              {r.prerelease && <span className="vlc-pill">Prerelease</span>}
              <span className="rel-muted rel-item-meta">
                {r.components} components
                {r.changes ? ` · ${changes.length} changed since ${r.previous}` : ""}
              </span>
            </button>
            {isOpen && (
              <div className="rel-item-body">
                {r.changes && changes.length > 0 && (
                  <div className="rel-table-wrap">
                    <table className="rel-table">
                      <thead>
                        <tr>
                          <th>Component</th>
                          <th>Change</th>
                          <th>New version</th>
                          <th>Previous version</th>
                        </tr>
                      </thead>
                      <tbody>
                        {changes.map((c) => (
                          <tr key={c.category + c.type + c.name}>
                            <td>
                              <span className="rel-name">{c.name}</span>
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
                )}
                {!r.changes && (
                  <p className="rel-muted">
                    {r.previous ? `${r.previous} has no inventory to compare against.` : "First inventoried version."}
                  </p>
                )}
                {r.changes && changes.length === 0 && <p className="rel-muted">No component changed.</p>}
                <a className="rel-link" href={r.href}>
                  All components in {r.version} →
                </a>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
