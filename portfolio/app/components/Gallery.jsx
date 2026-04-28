"use client";
import gsap from 'gsap'
import { useRef, useState, useEffect, useCallback } from 'react'

const IMAGES = [
  { src:'IMG_20220808_053707.webp', label:'First Light', ratio:1.333 },
  { src:'IMG_20220811_181618.webp', label:'Evening Blush', ratio:1.333 },
  { src:'IMG_20220811_182113.webp', label:'The Vast Canvas', ratio:1.777 },
  { src:'IMG_20220811_190005.webp', label:'Golden Veil', ratio:1.333 },
  { src:'IMG_20220818_183609.webp', label:'Dusk Dreaming', ratio:1.333 },
  { src:'IMG_20220901_104202.webp', label:'Standing Tall', ratio:0.75 },
  { src:'IMG_20220901_153757.webp', label:'Expansive Horizon', ratio:2.5 },
  { src:'IMG_20220901_171439.webp', label:'Crimson Hour', ratio:1.333 },
  { src:'IMG_20220901_180603.webp', label:'Pastel Dreams', ratio:1.333 },
  { src:'IMG_20220902_183701.webp', label:'Burning Horizon', ratio:1.777 },
  { src:'IMG_20220903_123841.webp', label:'Cloud Pillar', ratio:0.75 },
  { src:'IMG_20220903_124047.webp', label:'Dramatic Build', ratio:0.75 },
  { src:'IMG_20220914_181455.webp', label:'Scarlet Canvas', ratio:1.333 },
  { src:'IMG_20220915_173606.webp', label:'Wide Awakening', ratio:1.777 },
  { src:'IMG_20220916_055418.webp', label:'Before Sunrise', ratio:0.75 },
  { src:'IMG_20220917_175611.webp', label:'Spreading Wings', ratio:1.777 },
  { src:'IMG_20220917_175624.webp', label:'Red Drama', ratio:1.777 },
  { src:'IMG_20220918_181147.webp', label:'Grand Panorama', ratio:2.0 },
  { src:'IMG_20220920_175511.webp', label:'Amber Sky', ratio:1.333 },
  { src:'IMG_20221009_163640.webp', label:'October Glow', ratio:1.333 },
  { src:'IMG_20221011_171837.webp', label:'Mid-Autumn', ratio:1.333 },
  { src:'IMG_20221013_112143.webp', label:'Towering', ratio:0.75 },
  { src:'IMG_20221016_073412.webp', label:'Gold Before Dawn', ratio:1.333 },
  { src:'PANO_20221016_073501.webp', label:'Panorama I', ratio:3.0 },
  { src:'PANO_20221016_073612.webp', label:'Panorama III', ratio:3.0 },
  { src:'IMG_20221017_053627.webp', label:'Break of Dawn', ratio:0.75 },
  { src:'IMG_20230627_175824.webp', label:'Monsoon Prelude', ratio:1.777 },
  { src:'dji_mimo_20241010_095146_0_1728562887117_photo.webp', label:'From Above I', ratio:1.5 },
  { src:'dji_mimo_20241010_095152_0_1728562882894_photo.webp', label:'From Above II', ratio:1.5 },
  { src:'dji_mimo_20241010_095156_0_1728562877490_photo.webp', label:'From Above III', ratio:1.5 },
  { src:'IMG_20241009_173336.webp', label:'Mature Skies', ratio:1.777 },
  { src:'IMG_20241017_175248.webp', label:'Grand Finale', ratio:1.777 },
  { src:'IMG_20241018_175623.webp', label:'Thunderhead', ratio:1.777 },
  { src:'IMG_20241019_090156.webp', label:'Storm & Calm', ratio:1.777 },
  { src:'IMG_20241022_062845.webp', label:'Golden Expanse', ratio:1.777 },
  { src:'IMG_20241216_175956.webp', label:'December Flame', ratio:1.777 },
  { src:'IMG_20241216_180334.webp', label:'Winter Wide', ratio:1.777 },
  { src:'IMG_20250103_152810.webp', label:'New Year Sky', ratio:1.777 },
  { src:'IMG_20250205_173326.webp', label:'Valentine Skies', ratio:1.777 },
  { src:'IMG_20250320_173912.webp', label:'Equinox Wide', ratio:1.777 },
  { src:'image.webp', label:'Home', ratio:1.333 },
]


const CDN_URL = 'https://di4nbe8gl5nhl.cloudfront.net/'

// ── Lightbox ─────────────────────────────────────────────
function Lightbox({ images, index, onClose, onChange }) {
  const img = images[index]
  useEffect(() => {
    const fn = e => {
      if (e.key === 'Escape')      onClose()
      if (e.key === 'ArrowLeft')   onChange((index - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight')  onChange((index + 1) % images.length)
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [index, onClose, onChange, images.length])

  return (
    <div className="lb open" onClick={e => e.target === e.currentTarget && onClose()}>
      <button className="lb-close" onClick={onClose} aria-label="Close">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <button className="lb-nav lb-prev" onClick={() => onChange((index-1+images.length)%images.length)} aria-label="Prev">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="15,18 9,12 15,6"/></svg>
      </button>
      <button className="lb-nav lb-next" onClick={() => onChange((index+1)%images.length)} aria-label="Next">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="9,6 15,12 9,18"/></svg>
      </button>
      <div className="lb-stage">
        <img key={img.src} src={`${CDN_URL}${img.src}`} alt={img.label} decoding="async" fetchpriority="high" />
      </div>
      <div className="lb-bar">
        <span className="lb-label">{img.label}</span>
        <span className="lb-index">{index + 1} / {images.length}</span>
      </div>
    </div>
  )
}

// ── Fullscreen Overlay ───────────────────────────────────
function FullscreenOverlay({ isOpen, startIdx, onClose }) {
  const ref = useRef(null)
  const [lbIdx, setLbIdx] = useState(null)

  useEffect(() => {
    if (!isOpen || !ref.current) return
    document.body.style.overflow = 'hidden'
    gsap.fromTo(ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' })
    // eslint-disable-next-line
    if (startIdx !== null) setLbIdx(startIdx)
    return () => { document.body.style.overflow = '' }
  }, [isOpen, startIdx])

  const close = useCallback(() => {
    gsap.to(ref.current, { opacity: 0, y: 20, duration: 0.28, ease: 'power2.in', onComplete: onClose })
  }, [onClose])

  if (!isOpen) return null
  return (
    <div className="gallery-overlay" ref={ref}>
      <div className="gallery-ov-header">
        <span className="gallery-ov-title">All Frames</span>
        <span className="gallery-ov-count">{IMAGES.length} photos · Raghu</span>
        <button className="gallery-ov-close" onClick={close}>✕ Close</button>
      </div>
      <div className="gallery-ov-grid">
        {IMAGES.map((img, i) => (
          <div key={img.src} className="gallery-ov-item" onClick={() => setLbIdx(i)}>
            <img src={`${CDN_URL}${img.src}`} alt={img.label} loading="lazy" decoding="async" />
            <div className="gallery-ov-item-label"><span>{img.label}</span></div>
          </div>
        ))}
      </div>
      {lbIdx !== null && (
        <Lightbox images={IMAGES} index={lbIdx} onClose={() => setLbIdx(null)} onChange={setLbIdx} />
      )}
    </div>
  )
}

// ── Main Gallery ─────────────────────────────────────────
export default function Gallery() {
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [startIdx,    setStartIdx]    = useState(null)

  useEffect(() => {
    const handleOpen = (e) => {
      setStartIdx(e.detail?.startIdx || 0)
      setOverlayOpen(true)
    }
    window.addEventListener('open-gallery', handleOpen)
    return () => window.removeEventListener('open-gallery', handleOpen)
  }, [])

  return (
    <>
      <FullscreenOverlay
        isOpen={overlayOpen}
        startIdx={startIdx}
        onClose={() => { setOverlayOpen(false); setStartIdx(null) }}
      />
    </>
  )
}
