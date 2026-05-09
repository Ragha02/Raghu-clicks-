"use client";
import { useEffect, useRef, useState } from 'react';

/**
 * Cinematic intro loader.
 * Plays once per session (sessionStorage flag).
 * Animates: logo reveal → progress line → fade-out dissolve.
 */
export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [hiding, setHiding] = useState(false);
  const barRef = useRef(null);
  const elRef = useRef(null);
  const alreadySeen = typeof window !== 'undefined'
    && sessionStorage.getItem('loader-seen') === '1';

  useEffect(() => {
    // Skip loader if already seen this session
    if (alreadySeen) { onDone(); return; }

    let frame;
    let start = null;
    const DURATION = 1600; // ms total

    const tick = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(100, Math.round((elapsed / DURATION) * 100));
      setProgress(pct);
      if (pct < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        // Brief pause then dissolve
        setTimeout(() => {
          setHiding(true);
          setTimeout(() => {
            sessionStorage.setItem('loader-seen', '1');
            onDone();
          }, 700);
        }, 200);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  if (alreadySeen) return null;

  return (
    <div ref={elRef} className={`loader-screen${hiding ? ' loader-hide' : ''}`} aria-hidden="true">
      {/* Film grain overlay */}
      <div className="noise-overlay" style={{ opacity: 0.06 }} />

      <div className="loader-inner">
        {/* Logo */}
        <div className="loader-logo">
          Raghu<span>.</span>
        </div>

        {/* Tagline */}
        <p className="loader-tagline">Creative Engineer · Photographer</p>

        {/* Progress bar */}
        <div className="loader-track">
          <div
            ref={barRef}
            className="loader-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Counter */}
        <span className="loader-count">{String(progress).padStart(3, '0')}</span>
      </div>
    </div>
  );
}
