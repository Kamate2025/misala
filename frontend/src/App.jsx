import { useEffect, useState } from 'react'
import './App.css'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Ticker from './components/Ticker.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import TwoSides from './components/TwoSides.jsx'
import WhyItLasts from './components/WhyItLasts.jsx'
import Opportunities from './components/Opportunities.jsx'
import Footer from './components/Footer.jsx'

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

function App() {
  const [tagline, setTagline] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch(`${API_BASE}/homepage/`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => {
        if (!cancelled && data?.tagline) setTagline(data.tagline)
      })
      .catch(() => {
        // Backend not reachable yet (e.g. during static preview) — the
        // hero already has sensible default copy, so this fails silently.
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div id="top">
      <Nav />
      <main>
        <Hero tagline={tagline} />
        <Ticker />
        <HowItWorks />
        <TwoSides />
        <WhyItLasts />
        <Opportunities />
      </main>
      <Footer />
    </div>
  )
}

export default App
