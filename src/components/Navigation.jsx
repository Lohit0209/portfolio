'use client'
import { useEffect, useState } from 'react'

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#education' },
  { label: 'Research', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Publications', href: '#publications' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation({ activeSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-nav transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(5,5,7,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('#hero')}
          className="flex items-center gap-3 group"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <div className="relative w-7 h-7">
            <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="14" cy="14" r="12" stroke="rgba(0,229,255,0.4)" strokeWidth="0.75"/>
              <circle cx="14" cy="14" r="2.5" fill="var(--cyan)"/>
              <line x1="14" y1="2" x2="14" y2="7" stroke="var(--cyan)" strokeWidth="0.75"/>
              <line x1="14" y1="21" x2="14" y2="26" stroke="var(--cyan)" strokeWidth="0.75"/>
              <line x1="2" y1="14" x2="7" y2="14" stroke="var(--cyan)" strokeWidth="0.75"/>
              <line x1="21" y1="14" x2="26" y2="14" stroke="var(--cyan)" strokeWidth="0.75"/>
            </svg>
          </div>
          <span className="text-mono text-xs font-medium" style={{ color: 'var(--white)', letterSpacing: '0.08em' }}>
            LD
          </span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className={`nav-link ${activeSection === item.href.slice(1) ? 'active' : ''}`}
              style={{ background: 'none', border: 'none' }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/lalitaditya"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-xs py-2 px-4"
            style={{ textDecoration: 'none' }}
          >
            GitHub ↗
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          aria-label="Toggle menu"
        >
          {[0,1,2].map(i => (
            <span key={i} className="block w-6 h-px transition-all duration-300" style={{ background: menuOpen ? (i===1 ? 'transparent' : 'var(--cyan)') : 'var(--white)' }} />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className="md:hidden transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: menuOpen ? '400px' : '0',
          background: 'rgba(5,5,7,0.97)',
          borderBottom: menuOpen ? '1px solid var(--border)' : 'none',
        }}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {navItems.map(item => (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className="nav-link text-left"
              style={{ background: 'none', border: 'none', fontSize: '0.9rem' }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
