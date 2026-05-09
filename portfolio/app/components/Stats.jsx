"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const STATS = [
  { value: 172, suffix: '+', label: 'Frames Shot' },
  { value: 6,   suffix: '',  label: 'AI Projects' },
  { value: 9.3, suffix: '',  label: 'GPA · KL University', decimal: true },
  { value: 4,   suffix: '+', label: 'Years Clicking' },
];

export default function Stats() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const counters = sectionRef.current.querySelectorAll('.stat-number');

    counters.forEach((el, i) => {
      const target = STATS[i].value;
      const isDecimal = STATS[i].decimal;
      const proxy = { val: 0 };

      gsap.to(proxy, {
        val: target,
        duration: 1.8,
        ease: 'power3.out',
        onUpdate: () => {
          el.textContent = isDecimal
            ? proxy.val.toFixed(1)
            : Math.floor(proxy.val).toString();
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    });
  }, []);

  return (
    <section className="stats-strip" ref={sectionRef} aria-label="Key metrics">
      <div className="stats-inner">
        {STATS.map((stat, i) => (
          <div className="stat-item" key={i}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '.1em' }}>
              <span className="stat-number">
                {stat.decimal ? stat.value.toFixed(1) : stat.value}
              </span>
              {stat.suffix && (
                <span className="stat-suffix">{stat.suffix}</span>
              )}
            </div>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
