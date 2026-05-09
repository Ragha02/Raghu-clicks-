"use client";
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

export default function About() {
  const containerRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.from('.about-left > *', { x: -40, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' })
      .from('.scrapbook-folder', { x: 50, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.6')
      .from('.polaroid-stack .polaroid', {
        y: 40, rotation: gsap.utils.random(-10, 10, true), opacity: 0,
        duration: 0.8, stagger: 0.15, ease: 'back.out(1.5)'
      }, '-=0.5')
  }, { scope: containerRef })

  return (
    <section className="about-section" ref={containerRef}>
      <div className="chapter-header">
        <div className="chapter-ghost" aria-hidden="true">ME</div>
        <p className="chapter-num">05 / ME</p>
        <h2 className="chapter-title">The <em>Engineer</em> Behind</h2>
        <div className="chapter-divider" />
      </div>

      <div className="about-inner scrapbook-layout">
        <div className="about-left">
          <p className="about-bio">
            23 years old. CS engineer by training, photographer at heart. I build at the intersection of agentic AI and full-stack systems, creating autonomous workflows while exploring data engineering and cloud infrastructure.
          </p>
          <p className="about-bio">
            My work revolves around designing ML pipelines, orchestrating data flows, and deploying scalable, cloud-native solutions that actually hold up in real-world use.
          </p>
          <p className="about-bio">
            Behind the lens, I'm a storyteller. I prefer observing over directing, capturing moments as they unfold naturally, each frame a question I'm still trying to answer.
          </p>
          <p className="about-bio">
            I'm equally drawn to clean system design and imperfect human moments, balancing logic with instinct, structure with creativity, code with composition.
          </p>

          <div className="about-grid">
            <div className="about-col">
              <h3 className="about-red-head">Education</h3>
              <p className="about-list">
                KL UNIVERSITY<br />
                BACHELOR OF TECHNOLOGY, 2022 - 2026<br />
                <span style={{color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem'}}>9.3 GPA</span>
              </p>
            </div>
            <div className="about-col"></div>
            <div className="about-col">
              <h3 className="about-red-head">Creative Skills</h3>
              <ul className="about-list">
                <li>PHOTOGRAPHY</li>
                <li>WEB DESIGN</li>
                <li>SYSTEMS ARCHITECTURE</li>
                <li>AI INTEGRATION</li>
              </ul>
            </div>
            <div className="about-col">
              <h3 className="about-red-head">Software Tools</h3>
              <ul className="about-list">
                <li>AWS CLOUD & ARCHITECTURE</li>
                <li>DATA ENGINEERING (ETL)</li>
                <li>REACT & NEXT.JS</li>
                <li>PYTHON & ML PLATFORMS</li>
              </ul>
            </div>
          </div>

          <div className="about-socials" style={{ marginTop: '3rem' }}>
            <a href="mailto:anarajularaghu@gmail.com" className="social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Mail
            </a>
            <a href="https://www.instagram.com/anarajula.raghu" target="_blank" rel="noreferrer" className="social-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="14" height="14">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
              </svg>
              anarajula.raghu
            </a>
            <a href="https://www.linkedin.com/in/anarajula-rsn/" target="_blank" rel="noreferrer" className="social-link">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        <div className="about-right">
          <div className="scrapbook-folder">
            <div className="folder-tab">Personal Information</div>
            <div className="folder-body">
              
              <div className="marker-title">
                CREATIVE ENGINEER
                <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="0" y1="12" x2="24" y2="12"/><polyline points="18,6 24,12 18,18"/></svg>
              </div>

              <div className="polaroid-stack">
                <div className="polaroid p-bg">
                  <div className="p-photo bg-dark">
                    <img src="/ragh 2 .jpg" alt="Raghu Background" />
                  </div>
                </div>
                <div className="polaroid p-bg2">
                  <div className="p-photo bg-red"></div>
                </div>
                
                <div className="polaroid p-main">
                  <div className="paperclip">
                    <div className="clip-part1"></div>
                    <div className="clip-part2"></div>
                  </div>
                  <div className="p-photo">
                    <img src="/ragh 1.jpg" alt="Raghu" />
                  </div>
                  <div className="p-caption">RAGHU</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
