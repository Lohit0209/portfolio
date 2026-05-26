'use client'
import { useEffect, useRef, useState } from 'react'

const skillTree = {
  core: { label: 'ROBOTICS\nSYSTEMS', x: 0.5, y: 0.5 },
  nodes: [
    // Layer 1 - Main domains
    { id: 'ros2', label: 'ROS2', x: 0.22, y: 0.25, group: 'framework', connects: ['core'] },
    { id: 'slam', label: 'SLAM', x: 0.5, y: 0.15, group: 'algorithm', connects: ['core'] },
    { id: 'pytorch', label: 'PyTorch', x: 0.78, y: 0.25, group: 'ml', connects: ['core'] },
    { id: 'carla', label: 'CARLA', x: 0.82, y: 0.5, group: 'sim', connects: ['core'] },
    { id: 'ue', label: 'Unreal\nEngine', x: 0.78, y: 0.75, group: 'sim', connects: ['core'] },
    { id: 'cv2x', label: 'C-V2X', x: 0.5, y: 0.85, group: 'network', connects: ['core'] },
    { id: 'cuda', label: 'CUDA', x: 0.22, y: 0.75, group: 'ml', connects: ['core'] },
    { id: 'openxr', label: 'OpenXR', x: 0.18, y: 0.5, group: 'xr', connects: ['core'] },
    // Layer 2 - Supporting
    { id: 'tf', label: 'TensorFlow', x: 0.68, y: 0.12, group: 'ml', connects: ['pytorch'] },
    { id: 'ocv', label: 'OpenCV', x: 0.88, y: 0.38, group: 'vision', connects: ['carla', 'slam'] },
    { id: 'path', label: 'Path\nPlanning', x: 0.35, y: 0.12, group: 'algorithm', connects: ['slam', 'ros2'] },
    { id: '5g', label: '5G / NextG', x: 0.5, y: 0.97, group: 'network', connects: ['cv2x'] },
    { id: 'gazebo', label: 'Gazebo', x: 0.12, y: 0.65, group: 'sim', connects: ['ros2', 'openxr'] },
    { id: 'unity', label: 'Unity', x: 0.88, y: 0.65, group: 'sim', connects: ['ue'] },
    { id: 'cpp', label: 'C++', x: 0.1, y: 0.35, group: 'lang', connects: ['ros2'] },
    { id: 'sumo', label: 'SUMO', x: 0.62, y: 0.9, group: 'sim', connects: ['cv2x', 'carla'] },
  ],
}

const groupColors = {
  framework: '#00e5ff',
  algorithm: '#00bcd4',
  ml: '#0288d1',
  sim: '#0097a7',
  network: '#00acc1',
  vision: '#00b0ff',
  xr: '#40c4ff',
  lang: '#80d8ff',
}

function SkillCanvas() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: -999, y: -999 })

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

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', () => { mouse.current = { x: -999, y: -999 } })

    const getPos = (node) => ({
      x: node.x * canvas.width,
      y: node.y * canvas.height,
    })

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      t += 0.015

      const corePos = getPos(skillTree.core)

      // Draw connections
      skillTree.nodes.forEach(node => {
        const nPos = getPos(node)
        node.connects.forEach(connId => {
          let connPos
          if (connId === 'core') connPos = corePos
          else {
            const conn = skillTree.nodes.find(n => n.id === connId)
            if (conn) connPos = getPos(conn)
          }
          if (!connPos) return

          const grad = ctx.createLinearGradient(nPos.x, nPos.y, connPos.x, connPos.y)
          const col = groupColors[node.group] || '#00e5ff'
          grad.addColorStop(0, col + '30')
          grad.addColorStop(1, 'rgba(0,229,255,0.06)')
          ctx.strokeStyle = grad
          ctx.lineWidth = 0.8
          ctx.beginPath()
          ctx.moveTo(nPos.x, nPos.y)
          ctx.lineTo(connPos.x, connPos.y)
          ctx.stroke()

          // Animated packet along line
          const prog = ((t * 0.4 + node.x + node.y) % 1)
          const px = nPos.x + (connPos.x - nPos.x) * prog
          const py = nPos.y + (connPos.y - nPos.y) * prog
          ctx.fillStyle = col + 'cc'
          ctx.shadowColor = col; ctx.shadowBlur = 5
          ctx.beginPath(); ctx.arc(px, py, 1.5, 0, Math.PI * 2); ctx.fill()
          ctx.shadowBlur = 0
        })
      })

      // Draw outer nodes
      skillTree.nodes.forEach(node => {
        const pos = getPos(node)
        const col = groupColors[node.group] || '#00e5ff'
        const dx = pos.x - mouse.current.x, dy = pos.y - mouse.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const proximity = Math.max(0, 1 - dist / 100)
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.5 + node.x * 5)
        const glowAmt = pulse * 0.3 + proximity * 0.7
        const radius = 16 + proximity * 8

        // Outer ring
        ctx.strokeStyle = col + Math.round((0.15 + glowAmt * 0.5) * 255).toString(16).padStart(2, '0')
        ctx.lineWidth = 1
        ctx.shadowColor = col; ctx.shadowBlur = glowAmt * 20
        ctx.beginPath(); ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2); ctx.stroke()

        // Fill
        ctx.fillStyle = col + Math.round((0.05 + glowAmt * 0.15) * 255).toString(16).padStart(2, '0')
        ctx.beginPath(); ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2); ctx.fill()
        ctx.shadowBlur = 0

        // Label
        const lines = node.label.split('\n')
        ctx.fillStyle = `rgba(232,232,240,${0.6 + proximity * 0.4})`
        ctx.font = `${Math.max(8, 9 + proximity * 3)}px 'JetBrains Mono', monospace`
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
        lines.forEach((line, li) => {
          ctx.fillText(line, pos.x, pos.y + (li - (lines.length - 1) / 2) * 11)
        })
      })

      // Core node
      const coreRadius = 38 + 4 * Math.sin(t * 0.8)
      ctx.strokeStyle = 'rgba(0,229,255,0.5)'; ctx.lineWidth = 1.5
      ctx.shadowColor = '#00e5ff'; ctx.shadowBlur = 25
      ctx.beginPath(); ctx.arc(corePos.x, corePos.y, coreRadius, 0, Math.PI * 2); ctx.stroke()
      ctx.fillStyle = 'rgba(0,229,255,0.07)'
      ctx.beginPath(); ctx.arc(corePos.x, corePos.y, coreRadius, 0, Math.PI * 2); ctx.fill()

      // Rotating outer ring
      ctx.save()
      ctx.translate(corePos.x, corePos.y)
      ctx.rotate(t * 0.3)
      ctx.strokeStyle = 'rgba(0,229,255,0.12)'; ctx.lineWidth = 0.5
      ctx.setLineDash([4, 8])
      ctx.beginPath(); ctx.arc(0, 0, coreRadius + 12, 0, Math.PI * 2); ctx.stroke()
      ctx.setLineDash([])
      ctx.restore()
      ctx.shadowBlur = 0

      const coreLines = skillTree.core.label.split('\n')
      ctx.fillStyle = 'rgba(232,232,240,0.95)'
      ctx.font = `bold 9px 'JetBrains Mono', monospace`
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
      coreLines.forEach((line, li) => {
        ctx.fillText(line, corePos.x, corePos.y + (li - (coreLines.length - 1) / 2) * 12)
      })

      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
}

const skillCategories = [
  { label: 'Robotics & Navigation', items: ['ROS2', 'SLAM', 'Path Planning', 'Sensor Fusion', 'Localization', 'PX4', 'Gazebo'] },
  { label: 'AI & Machine Learning', items: ['PyTorch', 'TensorFlow', 'CUDA', 'OpenCV', 'Reinforcement Learning', 'Deep Learning', 'Computer Vision'] },
  { label: 'Simulation & XR', items: ['CARLA', 'Unreal Engine', 'Unity', 'Gazebo', 'SUMO', 'OpenXR', 'Procedural Generation'] },
  { label: 'Networks & Systems', items: ['C-V2X', '5G / NextG', 'MANET', 'ROS2 DDS', 'gRPC', 'REST APIs', 'Edge Computing'] },
  { label: 'Languages & Tools', items: ['Python', 'C++', 'C#', 'MATLAB', 'Bash', 'Git', 'Docker'] },
]

export default function SkillsSection() {
  const [activeGroup, setActiveGroup] = useState(0)

  return (
    <section id="skills" className="section" style={{ background: 'var(--surface-1)' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="text-label mb-3">// ZONE_05 · CAPABILITIES MATRIX</p>
          <h2 className="text-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--white)' }}>
            System <span style={{ color: 'var(--cyan)' }}>Modules</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-start">
          {/* Network Graph */}
          <div>
            <p className="text-label mb-4">INTERCONNECTED SKILL NETWORK · Hover to activate nodes</p>
            <div
              className="glass"
              style={{ width: '100%', aspectRatio: '4/3', position: 'relative', overflow: 'hidden' }}
            >
              <SkillCanvas />
            </div>
          </div>

          {/* Skill Categories */}
          <div>
            <p className="text-label mb-4">CAPABILITY MODULES</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {skillCategories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveGroup(i)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 4,
                    border: `1px solid ${activeGroup === i ? 'var(--border-active)' : 'var(--border)'}`,
                    background: activeGroup === i ? 'var(--cyan-dim)' : 'transparent',
                    color: activeGroup === i ? 'var(--cyan)' : 'var(--muted)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="glass-strong p-6 animate-fade-in" key={activeGroup}>
              <p className="text-label mb-4" style={{ color: 'var(--cyan)' }}>{skillCategories[activeGroup].label.toUpperCase()}</p>
              <div className="flex flex-wrap gap-2">
                {skillCategories[activeGroup].items.map((skill, i) => (
                  <div
                    key={skill}
                    className="skill-node animate-fade-in-up"
                    style={{
                      padding: '8px 16px',
                      border: '1px solid var(--border)',
                      borderRadius: 6,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'rgba(232,232,240,0.7)',
                      background: 'var(--surface-3)',
                      animationDelay: `${i * 0.05}s`,
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-active)'
                      e.currentTarget.style.color = 'var(--cyan)'
                      e.currentTarget.style.background = 'var(--cyan-dim)'
                      e.currentTarget.style.boxShadow = '0 0 15px var(--cyan-dim)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.color = 'rgba(232,232,240,0.7)'
                      e.currentTarget.style.background = 'var(--surface-3)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
