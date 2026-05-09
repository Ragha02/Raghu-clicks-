"use client";
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Contact() {
  const containerRef = useRef(null);
  const [toastVisible, setToastVisible] = useState(false);

  useGSAP(() => {
    gsap.from('.contact-eyebrow, .contact-heading, .contact-sub, .contact-actions', {
      y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });
  }, { scope: containerRef });

  const copyEmail = () => {
    navigator.clipboard.writeText('anarajularaghu@gmail.com').then(() => {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2500);
    });
  };

  return (
    <section className="contact-section" id="contact" ref={containerRef}>
      <div className="contact-inner">
        <p className="contact-eyebrow">06 / Let's Connect</p>

        <h2 className="contact-heading">
          Let's Build<br />
          <em>Something.</em>
        </h2>

        <p className="contact-sub">
          Whether it's a project, a collab, or just a conversation —
          I'm always open. Drop a line.
        </p>

        <div className="contact-actions">
          <button className="contact-btn primary" onClick={copyEmail}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Copy Email
          </button>

          <a
            href="https://www.linkedin.com/in/anarajula-rsn/"
            target="_blank"
            rel="noreferrer"
            className="contact-btn ghost"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
            LinkedIn
          </a>

          <a
            href="https://github.com/Ragha02"
            target="_blank"
            rel="noreferrer"
            className="contact-btn ghost"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>

      <div className={`contact-toast${toastVisible ? ' show' : ''}`} role="status" aria-live="polite">
        ✓ Email copied to clipboard
      </div>
    </section>
  );
}
