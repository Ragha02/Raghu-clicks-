"use client";
import { useEffect, useState, Suspense } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import dynamic from 'next/dynamic';

// ── Always-on (above the fold, no dynamic) ─────────────
import Nav  from './components/Nav';
import Hero from './components/Hero';

// ── Load once per session ───────────────────────────────
const Loader = dynamic(() => import('./components/Loader'), { ssr: false });

// ── Cursor — desktop only ───────────────────────────────
const Cursor = dynamic(() => import('./components/Cursor'), { ssr: false });

// ── Below-fold: chunk-loaded + Intersection-Observer mounted ──
const LazySection = dynamic(() => import('./components/LazySection'), { ssr: false });

const Stats      = dynamic(() => import('./components/Stats'),      { ssr: false });
const Gallery    = dynamic(() => import('./components/Gallery'),    { ssr: false });
const Projects   = dynamic(() => import('./components/Projects'),   { ssr: false });
const Experience = dynamic(() => import('./components/Experience'), { ssr: false });
const Vibes      = dynamic(() => import('./components/Vibes'),      { ssr: false });
const About      = dynamic(() => import('./components/About'),      { ssr: false });
const Contact    = dynamic(() => import('./components/Contact'),    { ssr: false });
const Footer     = dynamic(() => import('./components/Footer'),     { ssr: false });

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function App() {
  const [loaderDone, setLoaderDone] = useState(false);

  // Check session immediately to avoid flash
  const skipLoader = typeof window !== 'undefined'
    && sessionStorage.getItem('loader-seen') === '1';

  useEffect(() => {
    if (skipLoader) setLoaderDone(true);
  }, []);

  // Lenis smooth scroll — only desktop, only after loader
  useEffect(() => {
    if (!loaderDone) return;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [loaderDone]);

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />

      {/* Cinematic intro loader */}
      {!loaderDone && (
        <Loader onDone={() => setLoaderDone(true)} />
      )}

      {/* Main site — renders behind loader, becomes visible on done */}
      <div className={`site-wrap${loaderDone ? ' site-visible' : ''}`}>
        <Cursor />
        <Nav />

        {/* ① Hero — immediate, no lazy wrapper */}
        <Hero />

        {/* ② Stats — light, loads right after hero */}
        <Stats />

        {/* ③–⑨ Heavy sections — each mounts only when near viewport */}
        <LazySection id="gallery" minHeight="100vh" label="Photography">
          <Gallery />
        </LazySection>

        <LazySection id="projects" minHeight="100vh" label="Projects">
          <Projects />
        </LazySection>

        <LazySection id="experience" minHeight="100vh" label="Experience">
          <Experience />
        </LazySection>

        <LazySection id="vibes" minHeight="100vh" label="Vibes">
          <Vibes />
        </LazySection>

        <LazySection id="about" minHeight="100vh" label="About">
          <About />
        </LazySection>

        <LazySection id="contact" minHeight="40vh" label="Contact">
          <Contact />
        </LazySection>

        <LazySection id="footer-wrap" minHeight="20vh" label="Footer">
          <Footer />
        </LazySection>
      </div>
    </>
  );
}
