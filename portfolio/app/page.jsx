"use client";
import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import dynamic from 'next/dynamic'
import Nav from './components/Nav'
import Hero from './components/Hero'

// Cursor only on desktop — hidden on mobile via CSS
const Cursor = dynamic(() => import('./components/Cursor'), { ssr: false })

// Chunk-load sections progressively
const Stats      = dynamic(() => import('./components/Stats'),      { ssr: false })
const Gallery    = dynamic(() => import('./components/Gallery'),    { ssr: false })
const Projects   = dynamic(() => import('./components/Projects'),   { ssr: false })
const Experience = dynamic(() => import('./components/Experience'), { ssr: false })
const Vibes      = dynamic(() => import('./components/Vibes'),      { ssr: false })
const About      = dynamic(() => import('./components/About'),      { ssr: false })
const Contact    = dynamic(() => import('./components/Contact'),    { ssr: false })
const Footer     = dynamic(() => import('./components/Footer'),     { ssr: false })

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

export default function App() {
  useEffect(() => {
    // Skip smooth scroll on touch/mobile — native momentum is better
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <Cursor />
      <Nav />
      <Hero />
      <Stats />
      <Gallery />
      <Projects />
      <Experience />
      <Vibes />
      <About />
      <Contact />
      <Footer />
    </>
  )
}

