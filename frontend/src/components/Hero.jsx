import MatchWidget from './MatchWidget.jsx'

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__copy">
        <p className="eyebrow">AI-Powered Career Growth Platform</p>

        <h1>
          Discover opportunities.
          <br />
          <span className="hero__accent">Build your future.</span>
        </h1>

        <p className="hero__lede">
          MISALA helps students, graduates, and professionals find jobs,
          scholarships, internships, fellowships, grants, trainings, and
          career opportunities matched to their skills, experience, and goals.
        </p>

        <div className="hero__actions">
          <a href="#how" className="btn btn--gold">
            Get Started
          </a>

          <a href="#employers" className="btn btn--outline">
            For Employers
          </a>
        </div>

        <p className="hero__hint">
          One profile. Thousands of opportunities. Personalized by AI.
        </p>
      </div>

      <MatchWidget />
    </section>
  )
}