const CANDIDATES = [
  { name: 'James', score: 95 },
  { name: 'John', score: 89 },
  { name: 'Anna', score: 40 },
]

export default function TwoSides() {
  return (
    <section className="section two-sides" id="employers">
      <div className="two-sides__col">
        <p className="eyebrow">For students &amp; professionals</p>
        <h2>Built for every career path.</h2>
        <p>
          Whether you're a student, graduate, researcher,
          engineer, healthcare professional, entrepreneur,
          or creative, MISALA adapts to your unique journey
          and recommends opportunities that align with your goals.
        </p>
        <ul className="check-list">
          <li>AI portfolio review flags what's missing before you apply</li>
          <li>CV, resume, and cover letters generated straight from your page</li>
          <li>A career coach that answers using your actual profile</li>
        </ul>
      </div>

      <div className="two-sides__col two-sides__col--panel">
        <p className="eyebrow">For employers</p>
        <h2>Post once. Stop reading 2,000 CVs.</h2>
        <p className="two-sides__prompt">
          &ldquo;Looking for a React developer with 1+ years experience.&rdquo;
        </p>
        <div className="rank-table">
          <div className="rank-table__head">
            <span>Candidate</span>
            <span>Match</span>
          </div>
          {CANDIDATES.map((c) => (
            <div className="rank-table__row" key={c.name}>
              <span>{c.name}</span>
              <span className="rank-table__bar">
                <span
                  className="rank-table__fill"
                  style={{ width: `${c.score}%` }}
                />
                <span className="rank-table__value">{c.score}%</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
