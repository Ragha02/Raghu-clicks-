/**
 * Raghu's Clicks — Justified Mosaic Gallery
 * Builds a full-width justified row layout from native aspect ratios,
 * identical to Flickr / Google Photos justified grid.
 */

(function () {
  'use strict';

  /* ─── Config ─── */
  const ROW_TARGET_HEIGHT = 420;   // ideal row height in px
  const ROW_MIN_HEIGHT    = 220;   // min allowed row height
  const ROW_MAX_HEIGHT    = 640;   // max allowed row height
  const GAP               = 3;     // px gap between tiles (tiny seam)

  /* ─── Grab elements ─── */
  const mosaic = document.getElementById('mosaic');
  const tiles  = Array.from(mosaic.querySelectorAll('.tile'));

  /* ─── Build image data list ─── */
  const items = tiles.map((fig, i) => ({
    el:    fig,
    src:   fig.dataset.src   || '',
    label: fig.dataset.label || '',
    date:  fig.dataset.date  || '',
    ratio: parseFloat(fig.dataset.ratio) || 1.333,
    index: i,
  }));

  /* ─── Inject img into each tile ─── */
  items.forEach(item => {
    const img = document.createElement('img');
    img.src      = item.src;
    img.alt      = item.label;
    img.loading  = 'lazy';
    img.decoding = 'async';
    item.el.appendChild(img);
  });

  /* ─── Smooth Scroll for anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      smoothScrollTo(target.getBoundingClientRect().top + window.scrollY, 900);
    });
  });

  function smoothScrollTo (targetY, duration) {
    const startY = window.scrollY;
    const diff   = targetY - startY;
    let start    = null;

    function easeInOutQuart (t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    }

    function step (timestamp) {
      if (!start) start = timestamp;
      const elapsed  = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + diff * easeInOutQuart(progress));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  /* ─── Justified Layout Engine ─── */
  function layout () {
    const W = mosaic.clientWidth;
    if (W === 0) return;

    let rows   = [];
    let row    = [];
    let rowRatioSum = 0;

    items.forEach((item, i) => {
      row.push(item);
      rowRatioSum += item.ratio;

      const rowH   = (W - (row.length - 1) * GAP) / rowRatioSum;
      const isLast = i === items.length - 1;
      const isFull = rowH <= ROW_TARGET_HEIGHT;

      if (isFull || isLast) {
        const h = Math.min(ROW_MAX_HEIGHT, Math.max(ROW_MIN_HEIGHT, rowH));
        rows.push({ items: [...row], height: h });
        row = [];
        rowRatioSum = 0;
      }
    });

    let y = 0;
    rows.forEach(r => {
      let x = 0;
      r.items.forEach(item => {
        const w = item.ratio * r.height;
        item.el.style.left   = x + 'px';
        item.el.style.top    = y + 'px';
        item.el.style.width  = w + 'px';
        item.el.style.height = r.height + 'px';
        x += w + GAP;
      });
      y += r.height + GAP;
    });

    mosaic.style.height = y + 'px';
  }

  /* ─── Run layout on load + resize ─── */
  layout();
  window.addEventListener('resize', debounce(layout, 180));

  /* ─── Nav scroll style ─── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 60
      ? 'rgba(13,4,4,0.92)' : 'rgba(13,4,4,0.72)';
  }, { passive: true });

  /* ─── Hero parallax ─── */
  const hero = document.getElementById('hero');
  if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        hero.style.transform = `translateY(${y * 0.3}px)`;
        hero.style.opacity   = `${1 - y / window.innerHeight * 0.8}`;
      }
    }, { passive: true });
  }

  /* ─── Lightbox ─── */
  const lb      = document.getElementById('lb');
  const lbImg   = document.getElementById('lbImg');
  const lbDate  = document.getElementById('lbDate');
  const lbLabel = document.getElementById('lbLabel');
  const lbIndex = document.getElementById('lbIndex');
  const lbClose = document.getElementById('lbClose');
  const lbPrev  = document.getElementById('lbPrev');
  const lbNext  = document.getElementById('lbNext');

  let current = 0;

  function openLb (i) {
    current = i;
    setLbImage();
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLb () {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function setLbImage () {
    const item = items[current];
    lbImg.style.opacity = '0';
    lbImg.style.transform = 'scale(0.97)';

    lbImg.onload = () => {
      lbImg.style.transition = 'opacity 0.32s ease, transform 0.36s cubic-bezier(0.16,1,0.3,1)';
      lbImg.style.opacity = '1';
      lbImg.style.transform = 'scale(1)';
    };

    lbImg.src = item.src;
    lbImg.alt = item.label;
    lbDate.textContent  = item.date;
    lbLabel.textContent = item.label;
    lbIndex.textContent = `${current + 1} / ${items.length}`;
  }

  function prev () { current = (current - 1 + items.length) % items.length; setLbImage(); }
  function next () { current = (current + 1) % items.length; setLbImage(); }

  // Attach click to all tiles
  items.forEach((item, i) => {
    item.el.addEventListener('click', () => openLb(i));
    item.el.setAttribute('role', 'button');
    item.el.setAttribute('tabindex', '0');
    item.el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(i); }
    });
  });

  lbClose.addEventListener('click', closeLb);
  lbPrev.addEventListener('click', prev);
  lbNext.addEventListener('click', next);
  lb.addEventListener('click', e => { if (e.target === lb || e.target === lbImg.parentElement) closeLb(); });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLb();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  });

  // Touch swipe
  let tx = 0;
  lb.addEventListener('touchstart', e => { tx = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
  }, { passive: true });

  /* ─── Tile scroll-reveal ─── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity  = '1';
        entry.target.style.transform = 'none';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  items.forEach(item => {
    item.el.style.opacity   = '0';
    item.el.style.transform = 'scale(0.98)';
    item.el.style.transition = 'opacity 0.55s ease, transform 0.55s cubic-bezier(0.16,1,0.3,1)';
    io.observe(item.el);
  });

  /* ─── Utilities ─── */
  function debounce (fn, ms) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), ms);
    };
  }

}());
