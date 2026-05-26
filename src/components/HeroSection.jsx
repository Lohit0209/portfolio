'use client'
import { useEffect, useRef, useState } from 'react'

const descriptors = [
  'Autonomous Vehicles',
  'Digital Twins',
  'C-V2X Systems',
  '5G / NextG Networks',
  'Teleoperation',
  'Swarm Robotics',
  'XR Simulation',
  'AI-driven Infrastructure',
]

function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let t = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Particle system
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.5 + 0.1,
    }))

    // Grid lines for occupancy-grid feel
    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(0,229,255,0.025)'
      ctx.lineWidth = 0.5
      const spacing = 60
      for (let x = 0; x < canvas.width; x += spacing) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += spacing) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke()
      }
    }

    // Draw a LiDAR-style radial pulse
    const drawLidar = () => {
      const cx = canvas.width * 0.5
      const cy = canvas.height * 0.52
      const maxR = Math.min(canvas.width, canvas.height) * 0.38
      const pulse = (t * 0.008) % 1
      const r = pulse * maxR

      // Sweep line
      const angle = (t * 0.02) % (Math.PI * 2)
      ctx.save()
      const grad = ctx.createConicalGradient?.(cx, cy, 0, angle - 0.8, angle)
      if (!grad) {
        ctx.strokeStyle = `rgba(0,229,255,${0.12 * (1 - pulse)})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR)
        ctx.stroke()
      }
      ctx.restore()

      // Expanding ring
      ctx.strokeStyle = `rgba(0,229,255,${0.25 * (1 - pulse)})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.stroke()

      // Static rings
      ;[0.2, 0.4, 0.6, 0.8].forEach(frac => {
        ctx.strokeStyle = 'rgba(0,229,255,0.04)'
        ctx.lineWidth = 0.5
        ctx.beginPath()
        ctx.arc(cx, cy, frac * maxR, 0, Math.PI * 2)
        ctx.stroke()
      })

      // Center dot
      ctx.fillStyle = 'rgba(0,229,255,0.8)'
      ctx.beginPath()
      ctx.arc(cx, cy, 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowColor = 'var(--cyan)'
      ctx.shadowBlur = 12
      ctx.fill()
      ctx.shadowBlur = 0

      // Cross-hairs
      ctx.strokeStyle = 'rgba(0,229,255,0.15)'
      ctx.lineWidth = 0.5
      ctx.setLineDash([4, 8])
      ctx.beginPath(); ctx.moveTo(cx - maxR, cy); ctx.lineTo(cx + maxR, cy); ctx.stroke()
      ctx.beginPath(); ctx.moveTo(cx, cy - maxR); ctx.lineTo(cx, cy + maxR); ctx.stroke()
      ctx.setLineDash([])
    }

    // Draw path spline (simulated navigation path)
    const drawPath = () => {
      const cx = canvas.width * 0.5
      const cy = canvas.height * 0.52
      const pts = [
        [cx - 120, cy + 60],
        [cx - 80, cy + 20],
        [cx - 40, cy - 10],
        [cx, cy],
        [cx + 40, cy - 20],
        [cx + 90, cy + 10],
        [cx + 130, cy + 50],
      ]
      const progress = (Math.sin(t * 0.005) + 1) / 2
      ctx.strokeStyle = 'rgba(0,229,255,0.2)'
      ctx.lineWidth = 1
      ctx.setLineDash([4, 6])
      ctx.beginPath()
      ctx.moveTo(pts[0][0], pts[0][1])
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i][0], pts[i][1])
      }
      ctx.stroke()
      ctx.setLineDash([])

      // Moving robot indicator
      const idx = Math.floor(progress * (pts.length - 1))
      const frac = (progress * (pts.length - 1)) - idx
      const p1 = pts[Math.min(idx, pts.length - 1)]
      const p2 = pts[Math.min(idx + 1, pts.length - 1)]
      const rx = p1[0] + (p2[0] - p1[0]) * frac
      const ry = p1[1] + (p2[1] - p1[1]) * frac

      ctx.fillStyle = 'rgba(0,229,255,0.9)'
      ctx.shadowColor = '#00e5ff'
      ctx.shadowBlur = 15
      ctx.beginPath()
      ctx.arc(rx, ry, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawGrid()
      drawLidar()
      drawPath()

      // Particles
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.fillStyle = `rgba(0,229,255,${p.opacity * 0.4})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      t++
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="hero-canvas"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  )
}

export default function HeroSection() {
  const [descriptor, setDescriptor] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setDescriptor(d => (d + 1) % descriptors.length)
        setVisible(true)
      }, 400)
    }, 2200)
    return () => clearInterval(cycle)
  }, [])

  return (
    <section
      id="hero"
      className="section relative overflow-hidden flex items-center"
      style={{ minHeight: '100vh', background: 'var(--black)' }}
    >
      <HeroCanvas />
      <div className="grid-overlay" />

      {/* Radial vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(5,5,7,0.85) 100%)'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-4xl">
          {/* Status badge */}
          <div className="animate-fade-in-up flex items-center gap-3 mb-10">
            <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full animate-pulse-cyan" style={{ background: 'var(--cyan)', display: 'inline-block' }} />
              <span className="text-label">PhD Researcher · University of Minnesota</span>
            </div>
          </div>

          {/* Main title */}
          <h1
            className="text-display animate-fade-in-up delay-100"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', color: 'var(--white)', marginBottom: '0.2em' }}
          >
            Lalitaditya
          </h1>
          <h1
            className="text-display animate-fade-in-up delay-200"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)', color: 'var(--cyan)', marginBottom: '0.6em', filter: 'drop-shadow(0 0 30px rgba(0,229,255,0.3))' }}
          >
            Divakarla
          </h1>

          {/* Subtitle */}
          <p
            className="animate-fade-in-up delay-300"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'rgba(232,232,240,0.6)', fontWeight: 300, marginBottom: '2rem', maxWidth: 560 }}
          >
            PhD Researcher in Robotics, Autonomous Systems &amp; AI — building the future of intelligent infrastructure.
          </p>

          {/* Rotating descriptor */}
          <div
            className="animate-fade-in-up delay-400 flex items-center gap-3 mb-10"
            style={{ height: 36 }}
          >
            <span className="text-label">EXPERTISE IN</span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--cyan)',
                letterSpacing: '0.05em',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(8px)',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
                display: 'inline-block',
              }}
            >
              {descriptors[descriptor]}
            </span>
          </div>

          {/* CTAs */}
          <div className="animate-fade-in-up delay-500 flex flex-wrap gap-4">
            <button
              className="btn-primary"
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>View Research</span>
              <span style={{ position: 'relative', zIndex: 1 }}>→</span>
            </button>
            <a
              href="https://www.linkedin.com/in/lalitaditya-divakarla"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ textDecoration: 'none', borderColor: 'var(--border)' }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>LinkedIn ↗</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 animate-fade-in delay-800 flex flex-col items-center gap-2"
        style={{ transform: 'translateX(-50%)', zIndex: 10 }}
      >
        <span className="text-label">Scroll to Navigate</span>
        <div className="w-px h-12 relative overflow-hidden" style={{ background: 'var(--border)' }}>
          <div
            className="absolute top-0 left-0 w-full"
            style={{
              height: '40%',
              background: 'linear-gradient(to bottom, var(--cyan), transparent)',
              animation: 'scan 1.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  )
}
