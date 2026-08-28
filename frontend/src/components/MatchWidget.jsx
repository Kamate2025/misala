import { useEffect, useRef, useState } from 'react'

const TARGETS = [
  {
    id: 'a',
    label: 'Software Engineering Internship',
    kind: 'Internship',
    score: 96,
    color: 'var(--gold)',
  },
  {
    id: 'b',
    label: 'Mastercard Foundation Scholarship',
    kind: 'Scholarship',
    score: 87,
    color: 'var(--teal)',
  },
  {
    id: 'c',
    label: 'Google Career Certificate',
    kind: 'Training',
    score: 72,
    color: 'var(--clay)',
  },
]

function useCountUp(target, start) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf
    const duration = 1100
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, target])
  return value
}

export default function MatchWidget() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      className={`match-widget${visible ? ' is-visible' : ''}`}
      ref={ref}
      role="img"
      aria-label="Diagram: MISALA profile matched to an internship, a scholarship, and a training, with match scores of 96, 87, and 72 percent"
    >
      <svg
        className="match-widget__lines"
        viewBox="0 0 420 300"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          className="match-line"
          x1="120"
          y1="150"
          x2="330"
          y2="55"
          style={{ stroke: 'var(--gold)' }}
        />
        <line
          className="match-line"
          x1="120"
          y1="150"
          x2="330"
          y2="150"
          style={{ stroke: 'var(--teal)' }}
        />
        <line
          className="match-line"
          x1="120"
          y1="150"
          x2="330"
          y2="245"
          style={{ stroke: 'var(--clay)' }}
        />
      </svg>

      <div className="match-widget__profile">
        <div className="match-widget__avatar">M</div>
        <div>
          <p className="match-widget__name">MISALA Profile</p>
          <p className="match-widget__role">Skills • Experience • Goals</p>
          <div className="match-widget__tags">
            <span>AI</span>
            <span>Technology</span>
            <span>Leadership</span>
          </div>
        </div>
      </div>

      <div className="match-widget__targets">
        {TARGETS.map((t) => (
          <MatchRow key={t.id} target={t} start={visible} />
        ))}
      </div>
    </div>
  )
}

function MatchRow({ target, start }) {
  const value = useCountUp(target.score, start)
  return (
    <div className="match-row">
      <div className="match-row__meta">
        <span className="match-row__kind">{target.kind}</span>
        <span className="match-row__label">{target.label}</span>
      </div>
      <div className="match-row__score" style={{ color: target.color }}>
        {value}
        <span>%</span>
      </div>
    </div>
  )
}
