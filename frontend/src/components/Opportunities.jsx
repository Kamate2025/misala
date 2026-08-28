const ITEMS = [
  'Jobs',
  'Internships',
  'Scholarships',
  'Fellowships',
  'Grants',
  'Trainings',
  'Competitions',
  'Research Opportunities',
]

export default function Opportunities() {
  return (
    <section className="section" id="opportunities">
      <p className="eyebrow">Opportunity Ecosystem</p>

      <h2>Everything that can move your career forward.</h2>

      <div className="opportunity-grid">
        {ITEMS.map((item) => (
          <div key={item} className="opportunity-card">
            {item}
          </div>
        ))}
      </div>
    </section>
  )
}