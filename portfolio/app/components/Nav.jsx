"use client";
import { useEffect, useState, useCallback } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const openGallery = useCallback((e) => {
    e.preventDefault()
    setMenuOpen(false)
    window.dispatchEvent(new CustomEvent('open-gallery', { detail: { startIdx: 0 } }))
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
        <div className="nav-logo">Raghu<span>.</span></div>

        {/* Desktop links */}
        <div className="nav-links nav-links--desktop">
          <a href="#" onClick={openGallery} className="nav-link">Frames</a>
          <a href="#projects" className="nav-link">Build</a>
          <a href="#experience" className="nav-link">Work</a>
          <a href="#vibes" className="nav-link">Vibes</a>
          <a href="#about" className="nav-link">Me</a>
        </div>

        <div className="nav-right">
          <a href="https://github.com/Ragha02" target="_blank" rel="noreferrer" className="nav-cta nav-cta--desktop">GitHub</a>
          {/* Hamburger */}
          <button
            className={`nav-burger${menuOpen ? ' open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-drawer${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <nav className="mobile-nav">
          <a href="#" onClick={openGallery} className="mobile-nav-link">Frames</a>
          <a href="#projects" onClick={close} className="mobile-nav-link">Build</a>
          <a href="#experience" onClick={close} className="mobile-nav-link">Work</a>
          <a href="#vibes" onClick={close} className="mobile-nav-link">Vibes</a>
          <a href="#about" onClick={close} className="mobile-nav-link">Me</a>
          <a href="https://github.com/Ragha02" target="_blank" rel="noreferrer" className="mobile-nav-link mobile-nav-cta">GitHub ↗</a>
        </nav>
      </div>
      {/* Backdrop */}
      {menuOpen && <div className="mobile-backdrop" onClick={close} aria-hidden="true" />}
    </>
  )
}
