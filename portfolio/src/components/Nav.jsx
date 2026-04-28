import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openGallery = (e) => {
    e.preventDefault()
    window.dispatchEvent(new CustomEvent('open-gallery', { detail: { startIdx: 0 } }))
  }

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="nav-logo">Raghu<span>.</span></div>
      <div className="nav-links">
        <a href="#" onClick={openGallery} className="nav-link">Frames</a>
        <a href="#projects" className="nav-link">Build</a>
        <a href="#vibes" className="nav-link">Vibes</a>
        <a href="#about" className="nav-link">Me</a>
      </div>
      <a href="https://github.com/Ragha02" target="_blank" rel="noreferrer" className="nav-cta">GitHub</a>
    </nav>
  )
}
