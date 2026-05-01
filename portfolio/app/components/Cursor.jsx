"use client";
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  // Don't render or run on touch/mobile devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  useGSAP(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    window.addEventListener('mousemove', e => {
      // Dot snaps instantly
      gsap.set(dot, { x: e.clientX, y: e.clientY })
      // Ring lags with inertia
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.4, ease: 'power2.out' })
    }, { passive: true })

    // Grow on interactive elements
    const onEnter = () => gsap.to(ring, { scale: 2.2, opacity: 0.5, duration: 0.3 })
    const onLeave = () => gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3 })

    document.querySelectorAll('a, button, .tile, .proj-card, .vibe-chip').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
