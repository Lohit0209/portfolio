'use client'
import { useState, useEffect, useRef } from 'react'
import { useJourneyStore, ZONES } from '@/store/journeyStore'

const NAV_ITEMS = [
  { id: 'boot',         num: '00', label: 'Boot Sequence',    sub: 'System Initialization' },
  { id: 'hero',         num: '01', label: 'The Journey',      sub: 'Autonomous Exploration' },
  { id: 'education',    num: '02', label: 'Education',        sub: 'Academic Foundations' },
  { id: 'research',     num: '03', label: 'Research Labs',    sub: 'Systems & Simulations' },
  { id: 'projects',     num: '04', label: 'Projects',         sub: 'Engineering Solutions' },
  { id: 'publications', num: '05', label: 'Publications',     sub: 'Research Contributions' },
  { id: 'skills',       num: '06', label: 'Skills Network',   sub: 'Technical Expertise' },
  { id: 'contact',      num: '07', label: 'Future Lab',       sub: "Let's Build Tomorrow" },
]

function scrollTo(f) {
  const max = document.documentElement.scrollHeight - window.innerHeight
  window.scrollTo({ top: f * max, behavior: 'smooth' })
}

// ── TOP BAR ────────────────────────────────────────────────────────────────
function TopBar({ navMode }) {
  const activeZone = useJourneyStore(s => s.activeZone)
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 52,
      background: 'rgba(243,246,250,0.82)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(110,216,245,0.15)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', zIndex: 200, pointerEvents: 'auto',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(110,216,245,0.15)', border: '1.5px solid rgba(110,216,245,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6ED8F5' }} />
        </div>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '0.82rem', letterSpacing: '0.04em', color: '#1E2B36' }}>LALITADITYA DIVAKARLA</span>
      </div>
      {/* Mode indicator + links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.18em', color: '#8AAFD6', textTransform: 'uppercase', padding: '3px 10px', background: 'rgba(110,216,245,0.1)', borderRadius: 99, border: '1px solid rgba(110,216,245,0.2)' }}>
          {navMode === 'auto' ? '⟳ AUTO' : '↕ SCROLL'}
        </span>
        {[
          { l: 'GitHub', h: 'https://github.com/lalitaditya' },
          { l: 'LinkedIn', h: 'https://linkedin.com/in/lalitaditya-divakarla' },
        ].map(x => (
          <a key={x.l} href={x.h} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.78rem', fontWeight: 500, color: '#607488', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = '#1E2B36'} onMouseLeave={e => e.target.style.color = '#607488'}>
            {x.l}
          </a>
        ))}
      </div>
    </div>
  )
}

// ── LEFT NAV ───────────────────────────────────────────────────────────────
function LeftNav() {
  const activeZone = useJourneyStore(s => s.activeZone)
  return (
    <div style={{
      position: 'fixed', left: 0, top: 0, bottom: 0, width: 196,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '0 18px', zIndex: 100, pointerEvents: 'auto',
    }}>
      {NAV_ITEMS.map(item => {
        const z = Object.values(ZONES).find(z => z.id === item.id)
        const active = activeZone === item.id
        return (
          <button key={item.id}
            onClick={() => z && scrollTo((z.start + z.end) / 2)}
            style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: 'none', border: 'none', padding: '7px 0', cursor: 'pointer', textAlign: 'left' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', color: active ? '#6ED8F5' : '#B7C5D6', minWidth: 18, marginTop: 1 }}>{item.num}</span>
            <div>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.74rem', fontWeight: active ? 600 : 400, color: active ? '#1E2B36' : '#8AAFD6', marginBottom: 1, transition: 'all 0.3s' }}>{item.label}</p>
              <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: active ? 'rgba(110,216,245,0.7)' : 'rgba(183,197,214,0.6)', letterSpacing: '0.05em' }}>{item.sub}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}

// ── RIGHT MISSION PANEL — clean, no debug ──────────────────────────────────
function RightPanel() {
  const activeZone = useJourneyStore(s => s.activeZone)
  const mission = useJourneyStore(s => s.currentMission)
  const robotState = useJourneyStore(s => s.robotState)
  const z = Object.values(ZONES).find(z => z.id === activeZone)
  const statusColor = robotState === 'standby' ? '#8AAFD6' : robotState === 'navigating' ? '#6ED8F5' : robotState === 'docking' ? '#8AD86E' : '#6ED8F5'
  return (
    <div style={{ position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)', width: 210, zIndex: 100, pointerEvents: 'none' }}>
      <div style={{ background: 'rgba(243,246,250,0.88)', backdropFilter: 'blur(24px)', border: '1px solid rgba(110,216,245,0.2)', borderRadius: 14, padding: '18px 16px', boxShadow: '0 4px 24px rgba(30,43,54,0.08)' }}>
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.52rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8AAFD6', marginBottom: 8 }}>CURRENT MISSION</p>
        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 600, color: '#1E2B36', lineHeight: 1.25, marginBottom: 10 }}>{z?.label || 'Initializing'}</h3>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.72rem', color: '#607488', lineHeight: 1.6, marginBottom: 14 }}>{mission}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: statusColor, boxShadow: `0 0 6px ${statusColor}` }} />
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.12em', color: statusColor, textTransform: 'uppercase', fontWeight: 600 }}>{robotState}</span>
        </div>
      </div>
    </div>
  )
}

// ── BOTTOM BAR — minimal, no debug coords ──────────────────────────────────
function BottomBar({ navMode }) {
  const sp = useJourneyStore(s => s.scrollProgress)
  const [autoProgress, setAutoProgress] = useState(0)
  const autoRef = useRef(null)

  // Autonomous mode playback
  useEffect(() => {
    if (navMode !== 'auto') return
    const setScroll = useJourneyStore.getState().setScrollProgress
    const total = 30000 // 30 second journey
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const p = Math.min(elapsed / total, 1)
      setAutoProgress(p)
      const max = document.documentElement.scrollHeight - window.innerHeight
      window.scrollTo(0, p * max)
      if (p < 1) autoRef.current = requestAnimationFrame(tick)
    }
    autoRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(autoRef.current)
  }, [navMode])

  const progressVal = navMode === 'auto' ? autoProgress : sp

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100, padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'none', background: 'linear-gradient(0deg, rgba(220,230,242,0.5), transparent)' }}>
      {/* Progress bar */}
      <div style={{ flex: 1, maxWidth: 260, background: 'rgba(30,43,54,0.08)', height: 3, borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${progressVal * 100}%`, background: 'linear-gradient(90deg, #8AAFD6, #6ED8F5)', borderRadius: 99, transition: 'width 0.1s ease' }} />
      </div>

      {/* Scroll hint */}
      {sp < 0.04 && (
        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, paddingBottom: 6 }}>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
            <rect x="1" y="1" width="12" height="18" rx="6" stroke="#8AAFD6" strokeWidth="1.5" fill="none"/>
            <rect x="6" y="4" width="2" height="5" rx="1" fill="#6ED8F5"/>
          </svg>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8AAFD6' }}>
            {navMode === 'auto' ? 'AUTO NAVIGATING' : 'SCROLL TO NAVIGATE'}
          </span>
        </div>
      )}

      {/* System status — minimal */}
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        {[['LiDAR', true], ['Vision', true], ['IMU', true]].map(([k, ok]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: ok ? '#6ED8F5' : '#FF5C7A' }} />
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.5rem', color: '#8AAFD6' }}>{k}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DashboardHUD({ navMode = 'manual' }) {
  const booted = useJourneyStore(s => s.bootComplete)
  if (!booted) return null
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, pointerEvents: 'none' }}>
      <TopBar navMode={navMode} />
      <LeftNav />
      <RightPanel />
      <BottomBar navMode={navMode} />
    </div>
  )
}
