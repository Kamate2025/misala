const STEPS = [
  {
    n: '01',
    title: 'Create your professional profile',
    body: 'Build a rich digital profile showcasing your education, experience, projects, achievements, certifications, skills, and career goals.',
  },
  {
    n: '02',
    title: 'Get personalized opportunity matches',
    body: 'Our AI analyzes your profile and recommends jobs, internships, scholarships, fellowships, grants, trainings, and competitions that fit your background.',
  },
  {
    n: '03',
    title: 'Grow throughout your career',
    body: 'Track achievements, earn certifications, build your portfolio, discover new opportunities, and keep advancing your professional journey.',
  },
]

export default function HowItWorks() {
  return (
    <section className="section" id="how">
      <p className="eyebrow">How it works</p>
      <h2>Your career journey in three simple steps.</h2>

      <div className="steps">
        {STEPS.map((s) => (
          <div className="step" key={s.n}>
            <span className="step__n">{s.n}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}