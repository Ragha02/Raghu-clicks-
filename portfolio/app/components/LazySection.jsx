"use client";
import { useEffect, useRef, useState } from 'react';

/**
 * Wraps a section and only mounts its children when the
 * placeholder div enters the viewport (+ rootMargin buffer).
 * Shows a shimmer skeleton while waiting.
 */
export default function LazySection({ children, id, minHeight = '60vh', label = '' }) {
  const [mounted, setMounted] = useState(false);
  const placeholderRef = useRef(null);

  useEffect(() => {
    const el = placeholderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' } // start loading 300px before entering view
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (mounted) {
    return <div id={id}>{children}</div>;
  }

  return (
    <div
      ref={placeholderRef}
      id={id}
      className="lazy-skeleton"
      style={{ minHeight }}
      aria-label={label ? `Loading ${label}` : 'Loading section'}
    >
      <div className="lazy-shimmer" />
    </div>
  );
}
