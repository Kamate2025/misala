export default function Nav() {
  return (
    <header className="nav">
      <a href="#top" className="nav__brand">
        <span className="nav__mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22">
            <circle cx="7" cy="12" r="2.4" fill="var(--paper)" />
            <circle cx="17" cy="6.5" r="1.7" fill="var(--gold)" />
            <circle cx="17.5" cy="17" r="1.7" fill="var(--teal)" />
            <line
              x1="7"
              y1="12"
              x2="17"
              y2="6.5"
              stroke="var(--gold)"
              strokeWidth="1.4"
            />
            <line
              x1="7"
              y1="12"
              x2="17.5"
              y2="17"
              stroke="var(--teal)"
              strokeWidth="1.4"
            />
          </svg>
        </span>
        MISALA
      </a>

      <nav className="nav__links">
        <a href="#how">How it works</a>
        <a href="#opportunities">Opportunities</a>
        <a href="#employers">Employers</a>
        <a href="#mission">Mission</a>
      </nav>

      <div className="nav__cta">
        <a href="#" className="btn btn--ghost">
          Log in
        </a>
        <a href="#hero" className="btn btn--gold">
          Join MISALA
        </a>
      </div>
    </header>
  )
}
