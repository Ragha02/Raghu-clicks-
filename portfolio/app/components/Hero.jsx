"use client";
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

const TICKER_ITEMS = [
  'Photography', 'Engineering', 'Curiosity', 'Machine Learning',
  'Agentic AI', 'Cloud Chasing', 'MCP', 'Design', 'Code', 'Clicks',
]

function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="hero-ticker">
      <div className="marquee-wrap">
        <div className="marquee-inner">
          {doubled.map((t, i) => (
            <span key={i} className="ticker-text">
              {t}<span className="ticker-sep">·</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const containerRef = useRef(null)

  useGSAP(() => {
    // Parallax on the giant bg text
    gsap.to('.hero-bg-text', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    })
  }, { scope: containerRef })

  return (
    <section className="hero" id="hero" ref={containerRef}>
      <div className="hero-bg-text" aria-hidden="true">ADOBE</div>

      <p className="hero-eyebrow">Creative Engineer · Artistic Mind</p>

      <h1 className="hero-title">
        <span className="line1">the world through</span>
        <span className="line2">RAGHU</span>
      </h1>

      <p className="hero-sub">
        I build things that work. I photograph things that feel.
        A CS engineer with a camera and a love for capturing every moment.
      </p>

      <div className="hero-btns">
        <a href="#gallery" className="hero-btn primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
            <circle cx="12" cy="13" r="4"/>
          </svg>
          View Clicks
        </a>
        <a href="#projects" className="hero-btn ghost">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
          </svg>
          See Projects
        </a>
      </div>

      <Ticker />
      <div className="hero-scroll-line" />
    </section>
  )
}
