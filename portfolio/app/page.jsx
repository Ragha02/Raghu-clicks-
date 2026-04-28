"use client";
import { useEffect } from 'react'
import Lenis from 'lenis'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Projects from './components/Projects'
import Vibes from './components/Vibes'
import About from './components/About'
import Footer from './components/Footer'
import Cursor from './components/Cursor'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard ease
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
      <div className="noise-overlay"></div>
      <Cursor />
      <Nav />
      <Hero />
      <Gallery />
      <Projects />
      <Vibes />
      <About />
      <Footer />
    </>
  )
}
