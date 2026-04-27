import { useEffect, useRef } from 'react'

/**
 * For every [data-sw] child inside the returned ref container,
 * the hook calculates scroll progress and sets CSS var --sw-clip-top / --sw-clip-bottom
 * which drives the fill reveal on .sw-fill spans.
 */
export function useScrollFill() {
  const ref = useRef(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    let raf = null

    const update = () => {
      const vh = window.innerHeight
      const words = container.querySelectorAll('[data-sw]')
      words.forEach(el => {
        const fill = el.querySelector('.sw-fill')
        if (!fill) return
        const rect = el.getBoundingClientRect()

        // Fill from top as element enters (bottom crosses 90% of vh → 40% of vh)
        const entry = 1 - Math.max(0, Math.min(1, (rect.bottom - vh * 0.4) / (vh * 0.55)))
        // Unfill from top as element exits (top crosses 50% → 0)
        const exit  = Math.max(0, Math.min(1, 1 - rect.top / (vh * 0.45)))

        const cTop    = (exit  * 100).toFixed(1)
        const cBottom = ((1 - entry) * 100).toFixed(1)
        fill.style.clipPath = `inset(${cTop}% 0 ${cBottom}% 0)`
      })
      raf = null
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return ref
}
