export const ReleaseLine = ({ line }) => {
  return (
    <div className="rel-line not-prose">
      {line.releases.map((r) => (
        <a key={r.version} className="rel-item rel-item-head" href={r.href}>
          <span className="rel-name">{r.version}</span>
          {r.latest && <span className="vlc-pill is-latest">Latest</span>}
          {r.prerelease && <span className="vlc-pill">Prerelease</span>}
          <span className="rel-muted rel-item-meta">
            {r.released} · {r.components} components · {r.behind} behind latest
            {r.changed !== null ? ` · ${r.changed} changed since ${r.previous}` : ""}
          </span>
        </a>
      ))}
    </div>
  );
};
