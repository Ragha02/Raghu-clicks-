export default function Footer() {
  return (
    <footer className="footer">
      <span className="footer-copy">
        © {new Date().getFullYear()} Raghu — Creative Adobe. All rights reserved.
      </span>
      <span
        className="footer-back"
        role="button"
        tabIndex={0}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onKeyDown={e => { if (e.key === 'Enter') window.scrollTo({ top: 0, behavior: 'smooth' }) }}
      >
        Back to top ↑
      </span>
    </footer>
  )
}
