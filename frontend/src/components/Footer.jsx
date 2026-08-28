export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div>
          <p className="footer__wordmark">MISALA</p>
          <p className="footer__tagline">
            AI-powered career growth, opportunity discovery, and professional identity.
          </p>
        </div>

        <div className="footer__links">
          <a href="#how">How it works</a>
          <a href="#opportunities">Opportunities</a>
          <a href="#employers">Employers</a>
          <a href="#mission">Our Mission</a>
        </div>
      </div>

      <p className="footer__bottom">
        &copy; {new Date().getFullYear()} MISALA — a Kamate Group Ltd product.
      </p>
    </footer>
  )
}