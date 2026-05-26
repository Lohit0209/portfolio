'use client'
import { useEffect, useRef, useState } from 'react'

export default function Preloader({ onComplete }) {
  const [lines, setLines] = useState([])
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  const bootLines = [
    '> Initializing Autonomous Research Environment...',
    '> Loading spatial navigation modules...',
    '> Calibrating LiDAR sensor array...',
    '> Establishing digital twin sync protocol...',
    '> Booting ROS2 middleware stack...',
    '> Connecting to 5G/NextG network layer...',
    '> Loading XR simulation core...',
    '> Autonomous agent ready.',
    '',
    '> Welcome, Lalitaditya Divakarla.',
  ]

  useEffect(() => {
    let i = 0
    let prog = 0
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setLines(prev => [...prev, bootLines[i]])
        i++
        prog = Math.min(100, Math.round((i / bootLines.length) * 100))
        setProgress(prog)
      } else {
        clearInterval(interval)
        setTimeout(() => {
          setDone(true)
          setTimeout(onComplete, 600)
        }, 400)
      }
    }, 180)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-700 ${done ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{ background: 'var(--black)' }}
    >
      <div className="scanlines" />
      <div className="w-full max-w-xl px-8">
        {/* Logo mark */}
        <div className="mb-10 flex items-center gap-3">
          <div className="relative w-10 h-10">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <circle cx="20" cy="20" r="18" stroke="rgba(0,229,255,0.3)" strokeWidth="1"/>
              <circle cx="20" cy="20" r="3" fill="var(--cyan)"/>
              <line x1="20" y1="2" x2="20" y2="10" stroke="var(--cyan)" strokeWidth="1"/>
              <line x1="20" y1="30" x2="20" y2="38" stroke="var(--cyan)" strokeWidth="1"/>
              <line x1="2" y1="20" x2="10" y2="20" stroke="var(--cyan)" strokeWidth="1"/>
              <line x1="30" y1="20" x2="38" y2="20" stroke="var(--cyan)" strokeWidth="1"/>
              <circle cx="20" cy="20" r="10" stroke="rgba(0,229,255,0.15)" strokeWidth="0.5" strokeDasharray="2 4"/>
            </svg>
            <div className="absolute inset-0 rounded-full animate-pulse-cyan" style={{ background: 'transparent' }} />
          </div>
          <span className="text-mono text-xs" style={{ color: 'var(--muted)' }}>AUTONOMOUS RESEARCH ENVIRONMENT v2.1.0</span>
        </div>

        {/* Terminal lines */}
        <div className="font-mono text-xs space-y-1 mb-8" style={{ fontFamily: 'var(--font-mono)', color: 'var(--muted)', lineHeight: '1.8' }}>
          {lines.map((line, i) => (
            <div key={i} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              {line ? (
                <span style={{ color: line.startsWith('> Welcome') ? 'var(--cyan)' : line.startsWith('>') ? 'rgba(232,232,240,0.6)' : 'var(--muted)' }}>
                  {line}
                </span>
              ) : <br />}
            </div>
          ))}
          <span className="animate-blink" style={{ color: 'var(--cyan)' }}>█</span>
        </div>

        {/* Progress bar */}
        <div className="relative h-px w-full" style={{ background: 'var(--border)' }}>
          <div
            className="absolute top-0 left-0 h-full transition-all duration-300"
            style={{ width: `${progress}%`, background: 'var(--cyan)', boxShadow: '0 0 10px var(--cyan)' }}
          />
          <div
            className="absolute top-0 transition-all duration-300"
            style={{ left: `${progress}%`, width: 4, height: 4, background: 'var(--cyan)', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 0 6px var(--cyan)' }}
          />
        </div>
        <div className="mt-2 flex justify-between">
          <span className="text-label">SYSTEM BOOT</span>
          <span className="text-mono text-xs" style={{ color: 'var(--cyan)' }}>{progress}%</span>
        </div>
      </div>
    </div>
  )
}
