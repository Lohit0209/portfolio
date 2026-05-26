'use client'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--surface-1)', borderTop: '1px solid var(--border)', padding: '48px 0 32px' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-8" style={{ borderBottom: '1px solid var(--border)' }}>
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="14" cy="14" r="12" stroke="rgba(0,229,255,0.4)" strokeWidth="0.75"/>
                <circle cx="14" cy="14" r="2.5" fill="var(--cyan)"/>
                <line x1="14" y1="2" x2="14" y2="7" stroke="var(--cyan)" strokeWidth="0.75"/>
                <line x1="14" y1="21" x2="14" y2="26" stroke="var(--cyan)" strokeWidth="0.75"/>
                <line x1="2" y1="14" x2="7" y2="14" stroke="var(--cyan)" strokeWidth="0.75"/>
                <line x1="21" y1="14" x2="26" y2="14" stroke="var(--cyan)" strokeWidth="0.75"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--white)' }}>Lalitaditya Divakarla</p>
              <p className="text-label">PhD Researcher · Autonomous Systems</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {[
              { label: 'GitHub', href: 'https://github.com/lalitaditya' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lalitaditya-divakarla' },
              { label: 'Email', href: 'mailto:divar012@umn.edu' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-link"
                style={{ textDecoration: 'none' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-label">
            © 2024 Lalitaditya Divakarla · University of Minnesota, Twin Cities
          </p>
          <p className="text-label flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse-cyan" style={{ background: 'var(--cyan)', display: 'inline-block' }} />
            Built with Next.js · React Three Fiber · Three.js · GSAP
          </p>
        </div>
      </div>
    </footer>
  )
}
