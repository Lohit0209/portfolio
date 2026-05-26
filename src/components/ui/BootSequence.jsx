'use client'
import { useState, useEffect } from 'react'

const BOOT_LINES = [
  { t: '> Autonomous Research Environment v2.1.0', d: 0 },
  { t: '> LiDAR array initialization ........... OK', d: 220 },
  { t: '> Computer vision pipeline ............. OK', d: 400 },
  { t: '> ROS2 middleware ...................... ACTIVE', d: 570 },
  { t: '> Digital twin protocol ............... LINKED', d: 740 },
  { t: '> Robot companion online .............. READY', d: 900 },
  { t: '', d: 1060 },
  { t: '> LALITADITYA DIVAKARLA', d: 1160 },
  { t: '> Autonomous Systems · Robotics · AI', d: 1320 },
]

export default function BootSequence({ onComplete }) {
  const [lines, setLines] = useState([])
  const [pct, setPct] = useState(0)
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    const timers = []
    BOOT_LINES.forEach((l, i) => {
      timers.push(setTimeout(() => {
        setLines(p => [...p, l.t])
        setPct(Math.round(((i + 1) / BOOT_LINES.length) * 100))
      }, l.d + 600))
    })
    timers.push(setTimeout(() => setPhase('fading'), 3200))
    timers.push(setTimeout(() => onComplete?.(), 3900))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'linear-gradient(160deg, #F3F6FA 0%, #DCE6F2 50%, #C8D8E8 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      opacity: phase === 'fading' ? 0 : 1,
      transition: phase === 'fading' ? 'opacity 0.7s ease' : 'none',
    }}>
      <div style={{ width: '100%', maxWidth: 480, padding: '0 2rem' }}>
        {/* Logo mark */}
        <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(110,216,245,0.15)', border: '1.5px solid rgba(110,216,245,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#6ED8F5' }} />
          </div>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(96,116,136,0.7)' }}>SYSTEM BOOT SEQUENCE</span>
        </div>

        {/* Terminal output */}
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem', lineHeight: 1.9, minHeight: 200 }}>
          {lines.map((l, i) => (
            <div key={i} style={{
              color: l.startsWith('> LALITADITYA') ? '#1E2B36'
                : l.startsWith('> Autonomous Systems') ? '#607488'
                : l === '' ? undefined
                : l.includes('OK') || l.includes('ACTIVE') || l.includes('READY') || l.includes('LINKED') ? '#1E2B36' : '#8AAFD6',
              animation: 'fadeIn 0.3s ease',
            }}>{l || '\u00A0'}</div>
          ))}
          {phase === 'typing' && <span style={{ color: '#6ED8F5', animation: 'blink 1s step-end infinite' }}>█</span>}
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 28 }}>
          <div style={{ height: 2, background: 'rgba(30,43,54,0.08)', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg, #8AAFD6, #6ED8F5)', borderRadius: 99, transition: 'width 0.25s ease' }} />
          </div>
          <div style={{ marginTop: 6, display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.2em', color: '#8AAFD6' }}>BOOT</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.55rem', color: '#6ED8F5' }}>{pct}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
