"use client";
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

const WORDS = ['CLOUDS', 'CODE', 'CURIOSITY', 'CHAOS', 'COLOUR', 'CRAFT']


export default function Vibes() {
  const containerRef = useRef(null)

  useGSAP(() => {
    // Each word: fill layer driven by scrub via clip-path
    // We animate a CSS variable approach: use a proxy object
    const words = gsap.utils.toArray('.sw-wrapper', containerRef.current)

    words.forEach((wrapper) => {
      const fill = wrapper.querySelector('.sw-fill')

      // Animate clip-path top from 100% → 0% as enters, then 0% → 100% as exits
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 90%',
          end: 'bottom 10%',
          scrub: 0.6,
        },
      })

      // Phase 1: fill sweeps in (clipTop stays 0, clipBottom goes 100→0)
      tl.fromTo(fill,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', duration: 0.5 }
      )
      // Phase 2: fill sweeps out top (clipTop goes 0→100, clipBottom stays 0)
      .to(fill,
        { clipPath: 'inset(100% 0% 0% 0%)', ease: 'none', duration: 0.5 }
      )
    })

    // Chapter header
    gsap.from('.chapter-header', {
      y: 50, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    // Chips stagger
    ScrollTrigger.batch('.vibe-chip', {
      onEnter: els => gsap.fromTo(els,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.4)', stagger: 0.05 }
      ),
      start: 'top 90%',
      once: true,
    })

    // Statement fade
    gsap.from('.vibes-statement', {
      y: 30, opacity: 0, duration: 1, ease: 'power2.out',
      scrollTrigger: {
        trigger: '.vibes-statement',
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    })
  }, { scope: containerRef })

  return (
    <section className="vibes-section" id="vibes" ref={containerRef}>
      <div className="chapter-header">
        <div className="chapter-ghost" aria-hidden="true">VIBES</div>
        <p className="chapter-num">04 / VIBES</p>
        <h2 className="chapter-title">What <em>Stirs</em> Me</h2>
        <div className="chapter-divider" />
      </div>

      <div className="vibes-inner">
        {/* Left — scroll-fill word stack */}
        <div className="sw-stack">
          {WORDS.map(word => (
            <div key={word} className="sw-wrapper" data-sw>
              <span className="sw-outline" aria-hidden="true">{word}</span>
              <span className="sw-fill" aria-hidden="true">{word}</span>
            </div>
          ))}
          <p className="vibes-statement">
            "I find beauty in the overlooked — a cloud formation at dusk,
            the elegance of a well-tuned agent pipeline, the quiet chaos
            of a monsoon afternoon."
          </p>
        </div>

        {/* Right — AI Terminal */}
        <div className="terminal-wrapper">
          <div className="terminal-header">
            <div className="term-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="term-title">raghu@core ~ /identity.json</div>
          </div>
          <div className="terminal-body">
            <pre className="term-code">
              <code>
<span className="tc-punc">&#123;</span>
  <span className="tc-key">"id"</span><span className="tc-punc">:</span> <span className="tc-str">"raghu_clicks"</span><span className="tc-punc">,</span>
  <span className="tc-key">"role"</span><span className="tc-punc">:</span> <span className="tc-str">"Creative Engineer"</span><span className="tc-punc">,</span>
  <span className="tc-key">"age"</span><span className="tc-punc">:</span> <span className="tc-num">23</span><span className="tc-punc">,</span>
  <span className="tc-key">"core_passions"</span><span className="tc-punc">:</span> <span className="tc-punc">[</span>
    <span className="tc-str">"Agentic AI"</span><span className="tc-punc">,</span>
    <span className="tc-str">"Data Engineering"</span><span className="tc-punc">,</span>
    <span className="tc-str">"Cloud Architecture"</span><span className="tc-punc">,</span>
    <span className="tc-str">"Photography"</span><span className="tc-punc">,</span>
    <span className="tc-str">"Monsoon Chasing"</span>
  <span className="tc-punc">]</span><span className="tc-punc">,</span>
  <span className="tc-key">"metrics"</span><span className="tc-punc">:</span> <span className="tc-punc">&#123;</span>
    <span className="tc-key">"frames_shot"</span><span className="tc-punc">:</span> <span className="tc-num">172</span><span className="tc-punc">,</span>
    <span className="tc-key">"ai_projects"</span><span className="tc-punc">:</span> <span className="tc-num">6</span><span className="tc-punc">,</span>
    <span className="tc-key">"years_clicking"</span><span className="tc-punc">:</span> <span className="tc-num">4</span>
  <span className="tc-punc">&#125;</span><span className="tc-punc">,</span>
  <span className="tc-key">"status"</span><span className="tc-punc">:</span> <span className="tc-str">"Building something beautiful..."</span>
<span className="tc-punc">&#125;</span><span className="term-cursor"></span>
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
