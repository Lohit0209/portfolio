'use client'
import { useState, useEffect, useRef } from 'react'
import { useJourneyStore } from '@/store/journeyStore'

// ── TESLA/MERCEDES-INSPIRED MODE SELECTION ─────────────────────────────────
export default function ModeSelect({ onSelect }) {
  const [selected, setSelected] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => { setTimeout(() => setVisible(true), 100) }, [])

  const choose = (mode) => {
    setSelected(mode)
    setTimeout(() => onSelect(mode), 600)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9998,
      background: 'linear-gradient(160deg, #F3F6FA 0%, #DCE6F2 50%, #C8D8E8 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease',
    }}>
      {/* Subtle grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'linear-gradient(#1E2B36 1px, transparent 1px), linear-gradient(90deg, #1E2B36 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 600, padding: '0 2rem' }}>
        {/* Sub-label */}
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#8AAFD6', marginBottom: 18 }}>
          SELECT NAVIGATION MODE
        </p>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 200, fontSize: 'clamp(2.4rem, 5vw, 4rem)', letterSpacing: '-0.04em', color: '#1E2B36', lineHeight: 1.05, marginBottom: 8 }}>
          LALITADITYA
        </h1>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 200, fontSize: 'clamp(2.4rem, 5vw, 4rem)', letterSpacing: '-0.04em', color: '#6ED8F5', lineHeight: 1.05, marginBottom: 14 }}>
          DIVAKARLA
        </h1>
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.15em', color: '#8AAFD6', marginBottom: 52 }}>
          AUTONOMOUS SYSTEMS · ROBOTICS · DIGITAL TWINS
        </p>

        {/* Mode cards */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
          {/* AUTONOMOUS */}
          <button
            className={`btn-mode${selected === 'auto' ? ' selected' : ''}`}
            onClick={() => choose('auto')}
            style={{ opacity: selected && selected !== 'auto' ? 0.4 : 1, transition: 'all 0.4s ease' }}
          >
            <div className="mode-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="17" stroke="#6ED8F5" strokeWidth="1.5" strokeDasharray="4 2" />
                <circle cx="20" cy="20" r="6" fill="#6ED8F5" opacity="0.3"/>
                <circle cx="20" cy="20" r="3" fill="#6ED8F5"/>
                <path d="M20 8v5M20 27v5M8 20h5M27 20h5" stroke="#6ED8F5" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="mode-title">Autonomous</div>
            <div className="mode-sub">Self-guided cinematic tour</div>
          </button>

          {/* MANUAL */}
          <button
            className={`btn-mode${selected === 'manual' ? ' selected' : ''}`}
            onClick={() => choose('manual')}
            style={{ opacity: selected && selected !== 'manual' ? 0.4 : 1, transition: 'all 0.4s ease' }}
          >
            <div className="mode-icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect x="15" y="5" width="10" height="18" rx="5" stroke="#8AAFD6" strokeWidth="1.5" fill="none"/>
                <path d="M12 30c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#8AAFD6" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="20" cy="14" r="2" fill="#8AAFD6"/>
              </svg>
            </div>
            <div className="mode-title">Manual</div>
            <div className="mode-sub">Scroll to navigate</div>
          </button>
        </div>

        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.72rem', color: '#8AAFD6' }}>
          Your robot companion is ready to guide you
        </p>
      </div>
    </div>
  )
}
