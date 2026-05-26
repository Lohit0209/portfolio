'use client'
import { useJourneyStore, ZONES } from '@/store/journeyStore'

const NAV_ZONES = [
  { id: 'hero',         label: 'Home',         scrollFrac: 0.05 },
  { id: 'education',    label: 'Education',    scrollFrac: 0.20 },
  { id: 'research',     label: 'Research',     scrollFrac: 0.38 },
  { id: 'projects',     label: 'Projects',     scrollFrac: 0.55 },
  { id: 'publications', label: 'Publications', scrollFrac: 0.68 },
  { id: 'skills',       label: 'Skills',       scrollFrac: 0.82 },
  { id: 'contact',      label: 'Contact',      scrollFrac: 0.94 },
]

function scrollToFraction(frac) {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  window.scrollTo({ top: frac * maxScroll, behavior: 'smooth' })
}

export default function FloatingNav() {
  const activeZone = useJourneyStore(s => s.activeZone)
  const scrollProgress = useJourneyStore(s => s.scrollProgress)

  const visible = scrollProgress > 0.05

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 2rem',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: visible ? 'rgba(5,5,7,0.7)' : 'transparent',
        backdropFilter: visible ? 'blur(16px)' : 'none',
        borderBottom: visible ? '1px solid rgba(0,229,255,0.08)' : '1px solid transparent',
        transition: 'all 0.5s ease',
        pointerEvents: 'auto',
      }}
    >
      {/* Logo */}
      <button
        onClick={() => scrollToFraction(0)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="9.5" stroke="rgba(0,229,255,0.45)" strokeWidth="0.75"/>
          <circle cx="11" cy="11" r="2" fill="#00e5ff"/>
          <line x1="11" y1="1.5" x2="11" y2="5.5" stroke="#00e5ff" strokeWidth="0.75"/>
          <line x1="11" y1="16.5" x2="11" y2="20.5" stroke="#00e5ff" strokeWidth="0.75"/>
          <line x1="1.5" y1="11" x2="5.5" y2="11" stroke="#00e5ff" strokeWidth="0.75"/>
          <line x1="16.5" y1="11" x2="20.5" y2="11" stroke="#00e5ff" strokeWidth="0.75"/>
        </svg>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.12em', color: 'rgba(232,232,240,0.8)' }}>LD</span>
      </button>

      {/* Zone navigation pills */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {NAV_ZONES.map(zone => {
          const isActive = activeZone === zone.id
          return (
            <button
              key={zone.id}
              onClick={() => scrollToFraction(zone.scrollFrac)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.62rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: isActive ? '#00e5ff' : 'rgba(90,90,114,0.9)',
                padding: '4px 10px',
                borderBottom: `1px solid ${isActive ? '#00e5ff' : 'transparent'}`,
                transition: 'all 0.3s ease',
              }}
            >
              {zone.label}
            </button>
          )
        })}
      </div>

      {/* Progress indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.15em', color: 'rgba(0,229,255,0.5)' }}>
          {Math.round(scrollProgress * 100)}%
        </span>
        <div style={{ width: 48, height: 1, background: 'rgba(255,255,255,0.06)', position: 'relative' }}>
          <div style={{
            position: 'absolute', top: 0, left: 0,
            height: '100%',
            width: `${scrollProgress * 100}%`,
            background: '#00e5ff',
            boxShadow: '0 0 4px #00e5ff',
          }} />
        </div>
      </div>
    </nav>
  )
}
