const ITEMS = [
  'Jobs',
  'Internships',
  'Scholarships',
  'Fellowships',
  'Grants',
  'Trainings',
  'Volunteering',
  'Competitions',
  'Admissions',
  'Research Grants',
  'Professional Certifications',
]

export default function Ticker() {
  const loop = [...ITEMS, ...ITEMS]
  return (
    <div className="ticker" aria-label={`Opportunity types: ${ITEMS.join(', ')}`}>
      <div className="ticker__track">
        {loop.map((item, i) => (
          <span className="ticker__item" key={`${item}-${i}`}>
            {item}
            <span className="ticker__dot" aria-hidden="true">
              &bull;
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
