'use client'
import { useEffect, useRef } from 'react'

const education = [
  {
    degree: 'PhD in Computer Science',
    school: 'University of Minnesota',
    location: 'Twin Cities, MN, USA',
    period: '2023 — Present',
    focus: 'Autonomous Vehicles, Digital Twins, C-V2X, NextG Networks, Teleoperation, Swarm Robotics',
    color: '#00e5ff',
  },
  {
    degree: 'M.S. in Robotics',
    school: 'University of Minnesota',
    location: 'Twin Cities, MN, USA',
    period: '2021 — 2023',
    focus: 'Autonomous Systems, SLAM, Path Planning, Sensor Fusion, ROS2',
    color: '#00e5ff',
  },
  {
    degree: 'B.Tech in Electronics & Communication Engineering',
    school: 'PES University',
    location: 'Bengaluru, India',
    period: '2017 — 2021',
    focus: 'Embedded Systems, Signal Processing, Control Theory, IoT',
    color: 'rgba(0,229,255,0.5)',
  },
]

const researchInterests = [
  'Autonomous Vehicles', 'Digital Twins', 'C-V2X Systems', '5G / NextG Networks',
  'Teleoperation', 'Swarm Robotics', 'SLAM', 'Path Planning',
  'XR Simulation', 'Sensor Fusion', 'AI Infrastructure', 'Edge Computing',
]

function NetworkGraph() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, t = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const cx = canvas.width / 2
    const cy = canvas.height / 2
    const nodeCount = researchInterests.length
    const r = Math.min(cx, cy) * 0.78

    const nodes = researchInterests.map((label, i) => {
      const angle = (i / nodeCount) * Math.PI * 2 - Math.PI / 2
      return {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        label,
        pulse: Math.random() * Math.PI * 2,
      }
    })

    // Center node
    const center = { x: cx, y: cy, label: 'Lalitaditya\nDivakarla' }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.012

      // Draw connections from center to all
      nodes.forEach((n, i) => {
        const alpha = 0.08 + 0.06 * Math.sin(t + n.pulse)
        const grad = ctx.createLinearGradient(center.x, center.y, n.x, n.y)
        grad.addColorStop(0, `rgba(0,229,255,${alpha * 2})`)
        grad.addColorStop(1, `rgba(0,229,255,${alpha * 0.3})`)
        ctx.strokeStyle = grad
        ctx.lineWidth = 0.7
        ctx.beginPath(); ctx.moveTo(center.x, center.y); ctx.lineTo(n.x, n.y); ctx.stroke()

        // Animated data packet
        const prog = ((t * 0.5 + i * 0.4) % (Math.PI * 2)) / (Math.PI * 2)
        const px = center.x + (n.x - center.x) * prog
        const py = center.y + (n.y - center.y) * prog
        ctx.fillStyle = `rgba(0,229,255,0.7)`
        ctx.shadowColor = '#00e5ff'; ctx.shadowBlur = 6
        ctx.beginPath(); ctx.arc(px, py, 1.5, 0, Math.PI * 2); ctx.fill()
        ctx.shadowBlur = 0
      })

      // Draw outer nodes
      nodes.forEach(n => {
        const glow = 0.5 + 0.3 * Math.sin(t * 1.2 + n.pulse)
        ctx.fillStyle = `rgba(0,229,255,${0.08 + 0.04 * glow})`
        ctx.strokeStyle = `rgba(0,229,255,${0.25 + 0.2 * glow})`
        ctx.lineWidth = 0.75
        ctx.shadowColor = '#00e5ff'; ctx.shadowBlur = glow * 12
        ctx.beginPath(); ctx.arc(n.x, n.y, 5, 0, Math.PI * 2)
        ctx.fill(); ctx.stroke()
        ctx.shadowBlur = 0

        // Label
        ctx.fillStyle = `rgba(232,232,240,${0.5 + 0.2 * glow})`
        ctx.font = `${Math.min(9, canvas.width * 0.012)}px 'JetBrains Mono', monospace`
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        const dx = n.x - cx, dy = n.y - cy
        const len = Math.sqrt(dx * dx + dy * dy)
        const ox = (dx / len) * 22, oy = (dy / len) * 16
        ctx.fillText(n.label, n.x + ox, n.y + oy)
      })

      // Center node
      ctx.fillStyle = 'rgba(0,229,255,0.12)'
      ctx.strokeStyle = 'rgba(0,229,255,0.6)'
      ctx.lineWidth = 1
      ctx.shadowColor = '#00e5ff'; ctx.shadowBlur = 20
      ctx.beginPath(); ctx.arc(center.x, center.y, 28, 0, Math.PI * 2)
      ctx.fill(); ctx.stroke()
      ctx.shadowBlur = 0

      ctx.fillStyle = 'rgba(232,232,240,0.9)'
      ctx.font = `bold 9px 'JetBrains Mono', monospace`
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      ctx.fillText('CORE', center.x, center.y - 5)
      ctx.fillStyle = 'rgba(0,229,255,0.8)'
      ctx.fillText('RESEARCH', center.x, center.y + 6)

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
  )
}

export default function EducationSection() {
  return (
    <section id="education" className="section" style={{ background: 'var(--surface-1)' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="text-label mb-3">// ZONE_01 · EDUCATION &amp; RESEARCH FOUNDATION</p>
          <h2 className="text-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--white)' }}>
            Academic <span style={{ color: 'var(--cyan)' }}>Journey</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Education Timeline */}
          <div className="space-y-6">
            {education.map((edu, i) => (
              <div
                key={i}
                className="glass-strong p-6 relative overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {/* Left accent */}
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: edu.color, borderRadius: '2px 0 0 2px' }} />

                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--white)', marginBottom: 4 }}>{edu.degree}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--cyan)', fontWeight: 500 }}>{edu.school}</p>
                  </div>
                  <span className="text-label whitespace-nowrap">{edu.period}</span>
                </div>

                <p className="text-label mb-1" style={{ color: 'var(--muted)' }}>{edu.location}</p>
                <p style={{ fontSize: '0.78rem', color: 'rgba(232,232,240,0.5)', fontFamily: 'var(--font-mono)', lineHeight: 1.7 }}>
                  Focus: {edu.focus}
                </p>
              </div>
            ))}
          </div>

          {/* Neural Network Graph */}
          <div>
            <p className="text-label mb-4">RESEARCH INTEREST NETWORK</p>
            <div
              className="glass"
              style={{ width: '100%', aspectRatio: '1 / 1', maxHeight: 440, position: 'relative', overflow: 'hidden' }}
            >
              <NetworkGraph />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
