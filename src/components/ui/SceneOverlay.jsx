'use client'
import React, { useState } from 'react'
import { useJourneyStore, ZONES } from '@/store/journeyStore'

// Zone visibility — how visible is this zone at current scroll
function useVis(zoneId) {
  const sp = useJourneyStore(s => s.scrollProgress)
  const z = ZONES[zoneId.toUpperCase()]
  if (!z) return 0
  const start = zoneId === 'hero' ? 0 : z.start
  const mid = (start + z.end) / 2, half = (z.end - start) / 2
  return Math.pow(Math.max(0, 1 - Math.abs(sp - mid) / half), 1.5)
}

const F = { head: "'Outfit', sans-serif", body: "'Space Grotesk', sans-serif", mono: 'JetBrains Mono, monospace' }

// Shared card style
const card = (extra = {}) => ({
  background: 'rgba(255,255,255,0.88)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(110,216,245,0.2)',
  borderRadius: 14,
  padding: '16px 18px',
  boxShadow: '0 4px 20px rgba(30,43,54,0.07)',
  marginBottom: 10,
  ...extra,
})

// ── HERO ──────────────────────────────────────────────────────────────────
const FOCUS_LIST = ['Autonomous Vehicles','Digital Twins','C-V2X Systems','Swarm Robotics','XR Simulation','Teleoperation']
function HeroOverlay() {
  const v = useVis('hero')
  const [fi, setFi] = useState(0)
  const [fv, setFv] = useState(true)
  React.useEffect(() => {
    const t = setInterval(() => { setFv(false); setTimeout(() => { setFi(i => (i+1)%FOCUS_LIST.length); setFv(true) }, 350) }, 2600)
    return () => clearInterval(t)
  }, [])
  if (v < 0.01) return null
  return (
    <div style={{ opacity: v, position: 'absolute', left: 210, top: '50%', transform: 'translateY(-50%)', maxWidth: 480, pointerEvents: v > 0.4 ? 'auto' : 'none' }}>
      <p style={{ fontFamily: F.mono, fontSize: '0.55rem', letterSpacing: '0.22em', color: '#8AAFD6', marginBottom: 12 }}>Hello, I'm</p>
      <h1 style={{ fontFamily: F.head, fontWeight: 200, fontSize: 'clamp(2.8rem,5vw,4.5rem)', letterSpacing: '-0.04em', lineHeight: 1.0, color: '#1E2B36' }}>LALITADITYA</h1>
      <h1 style={{ fontFamily: F.head, fontWeight: 200, fontSize: 'clamp(2.8rem,5vw,4.5rem)', letterSpacing: '-0.04em', lineHeight: 1.0, color: '#6ED8F5', marginBottom: 14, filter: 'drop-shadow(0 0 12px rgba(110,216,245,0.3))' }}>DIVAKARLA</h1>
      <p style={{ fontFamily: F.mono, fontSize: '0.62rem', letterSpacing: '0.14em', color: '#8AAFD6', marginBottom: 16 }}>AUTONOMOUS SYSTEMS · ROBOTICS · DIGITAL TWINS</p>
      <p style={{ fontFamily: F.body, fontSize: '0.9rem', color: '#607488', lineHeight: 1.75, marginBottom: 16, maxWidth: 400 }}>
        I design intelligent robotic systems that perceive, plan, and act in the real world — exploring autonomy, perception, and decentralized intelligence.
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, height: 24 }}>
        <span style={{ fontFamily: F.mono, fontSize: '0.5rem', letterSpacing: '0.18em', color: '#B7C5D6' }}>FOCUS</span>
        <span style={{ fontFamily: F.mono, fontSize: '0.75rem', color: '#1E2B36', fontWeight: 500, opacity: fv ? 1 : 0, transform: fv ? 'none' : 'translateY(4px)', transition: 'all 0.3s ease' }}>{FOCUS_LIST[fi]}</span>
      </div>
      <button className="btn-primary" onClick={() => { const m = document.documentElement.scrollHeight - window.innerHeight; window.scrollTo({ top: m * 0.35, behavior: 'smooth' }) }}>
        Begin Journey →
      </button>
    </div>
  )
}

// ── EDUCATION ─────────────────────────────────────────────────────────────
const EDU = [
  { deg: 'PhD in Computer Science', school: 'University of Minnesota', period: '2023 – Present', focus: 'Autonomous Systems · Digital Twins · C-V2X · Swarm Robotics' },
  { deg: 'M.S. in Computer Science', school: 'University of Minnesota', period: '2021 – 2023', focus: 'SLAM · Path Planning · Sensor Fusion · ROS2' },
  { deg: 'B.Tech in Electronics & Communication', school: 'PES University', period: '2017 – 2021', focus: 'Embedded Systems · Signal Processing · IoT' },
]
function EducationOverlay() {
  const v = useVis('education')
  if (v < 0.01) return null
  return (
    <div style={{ opacity: v, position: 'absolute', left: 210, top: '50%', transform: 'translateY(-50%)', width: 360 }}>
      <p style={{ fontFamily: F.mono, fontSize: '0.52rem', letterSpacing: '0.22em', color: '#6ED8F5', marginBottom: 10 }}>ZONE 02 · ACADEMIC ARCHIVE</p>
      <h2 style={{ fontFamily: F.head, fontWeight: 200, fontSize: '2.2rem', letterSpacing: '-0.03em', color: '#1E2B36', marginBottom: 18 }}>Education</h2>
      {EDU.map((e, i) => (
        <div key={i} style={card({ borderLeft: '3px solid #6ED8F5' })}>
          <p style={{ fontFamily: F.body, fontWeight: 600, fontSize: '0.85rem', color: '#1E2B36', marginBottom: 3 }}>{e.deg}</p>
          <p style={{ fontFamily: F.body, fontSize: '0.75rem', color: '#6ED8F5', marginBottom: 2 }}>{e.school}</p>
          <p style={{ fontFamily: F.mono, fontSize: '0.55rem', color: '#8AAFD6', marginBottom: 5 }}>{e.period}</p>
          <p style={{ fontFamily: F.mono, fontSize: '0.56rem', color: '#607488', lineHeight: 1.6 }}>{e.focus}</p>
        </div>
      ))}
    </div>
  )
}

// ── RESEARCH ──────────────────────────────────────────────────────────────
const RES = [
  { tag: 'CHAMBER 01', title: 'C-V2X Autonomous Vehicle Platoons', desc: 'Digital twin sync for AV platoons on 5G. Sub-10ms teleoperation latency. 67% collision risk reduction.', tech: ['ROS2','CARLA','C-V2X','5G NR'] },
  { tag: 'CHAMBER 02', title: 'Swarm UAV Coordination', desc: 'Decentralized consensus algorithm for 20+ UAV smoke detection formation. 94% accuracy achieved.', tech: ['PX4','MANET','Gazebo','ROS2'] },
  { tag: 'CHAMBER 03', title: 'XR Teleoperation System', desc: 'Photorealistic XR simulation with haptic feedback for remote autonomous vehicle operation.', tech: ['Unreal Engine','OpenXR','CUDA'] },
]
function ResearchOverlay() {
  const v = useVis('research')
  const [a, setA] = useState(0)
  if (v < 0.01) return null
  const c = RES[a]
  return (
    <div style={{ opacity: v, position: 'absolute', left: 210, top: '50%', transform: 'translateY(-50%)', width: 380, pointerEvents: v > 0.4 ? 'auto' : 'none' }}>
      <p style={{ fontFamily: F.mono, fontSize: '0.52rem', letterSpacing: '0.22em', color: '#6ED8F5', marginBottom: 10 }}>ZONE 03 · RESEARCH CHAMBERS</p>
      <h2 style={{ fontFamily: F.head, fontWeight: 200, fontSize: '2.2rem', letterSpacing: '-0.03em', color: '#1E2B36', marginBottom: 14 }}>Research</h2>
      <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
        {RES.map((_, i) => (
          <button key={i} onClick={() => setA(i)} style={{ padding: '5px 14px', borderRadius: 99, border: `1.5px solid ${a===i ? 'rgba(110,216,245,0.5)' : 'rgba(183,197,214,0.4)'}`, background: a===i ? 'rgba(110,216,245,0.12)' : 'rgba(255,255,255,0.6)', color: a===i ? '#1E2B36' : '#8AAFD6', fontFamily: F.mono, fontSize: '0.55rem', cursor: 'pointer', transition: 'all 0.2s' }}>0{i+1}</button>
        ))}
      </div>
      <div key={a} style={card({ animation: 'fadeIn 0.3s ease' })}>
        <p style={{ fontFamily: F.mono, fontSize: '0.5rem', letterSpacing: '0.18em', color: '#6ED8F5', marginBottom: 6 }}>{c.tag}</p>
        <h3 style={{ fontFamily: F.body, fontWeight: 600, fontSize: '0.95rem', color: '#1E2B36', marginBottom: 8 }}>{c.title}</h3>
        <p style={{ fontFamily: F.body, fontSize: '0.78rem', color: '#607488', lineHeight: 1.75, marginBottom: 12 }}>{c.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {c.tech.map(t => <span key={t} className="chip">{t}</span>)}
        </div>
      </div>
    </div>
  )
}

// ── PROJECTS ──────────────────────────────────────────────────────────────
const PROJS = [
  { title: 'C-V2X Digital Twin Framework', cat: 'AV · NextG', impact: '67% collision risk reduction', status: 'Active' },
  { title: 'Autonomous Swarm Navigation', cat: 'Swarm · UAV', impact: '94% detection accuracy', status: 'Complete' },
  { title: 'NextG Teleoperation System', cat: 'Teleop · 5G', impact: 'Safe at 150ms latency', status: 'Active' },
  { title: 'Multi-Modal SLAM', cat: 'Navigation · Fusion', impact: '<5cm localization error', status: 'Complete' },
]
function ProjectsOverlay() {
  const v = useVis('projects')
  if (v < 0.01) return null
  return (
    <div style={{ opacity: v, position: 'absolute', left: 210, top: '50%', transform: 'translateY(-50%)', width: 360 }}>
      <p style={{ fontFamily: F.mono, fontSize: '0.52rem', letterSpacing: '0.22em', color: '#6ED8F5', marginBottom: 10 }}>ZONE 04 · ENGINEERING TERMINALS</p>
      <h2 style={{ fontFamily: F.head, fontWeight: 200, fontSize: '2.2rem', letterSpacing: '-0.03em', color: '#1E2B36', marginBottom: 14 }}>Projects</h2>
      {PROJS.map((p, i) => (
        <div key={i} style={card({ borderLeft: `3px solid ${p.status === 'Active' ? '#6ED8F5' : '#B7C5D6'}` })}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <p style={{ fontFamily: F.body, fontWeight: 600, fontSize: '0.85rem', color: '#1E2B36', lineHeight: 1.3 }}>{p.title}</p>
            <span style={{ fontFamily: F.mono, fontSize: '0.48rem', letterSpacing: '0.08em', color: p.status === 'Active' ? '#6ED8F5' : '#8AAFD6', padding: '3px 9px', border: `1px solid ${p.status === 'Active' ? 'rgba(110,216,245,0.4)' : 'rgba(183,197,214,0.4)'}`, borderRadius: 99, flexShrink: 0, background: p.status === 'Active' ? 'rgba(110,216,245,0.1)' : 'transparent' }}>{p.status}</span>
          </div>
          <p style={{ fontFamily: F.mono, fontSize: '0.56rem', color: '#8AAFD6', marginTop: 3 }}>{p.cat}</p>
          <p style={{ fontFamily: F.body, fontSize: '0.7rem', color: '#607488', marginTop: 5 }}>{p.impact}</p>
        </div>
      ))}
    </div>
  )
}

// ── PUBLICATIONS ───────────────────────────────────────────────────────────
const PUBS = [
  { venue: 'IEEE ITSC 2024', title: 'Real-Time Digital Twin Synchronization for C-V2X AV Platoons', cited: 12 },
  { venue: 'IEEE Trans. Robotics', title: 'Decentralized Swarm Coordination for Multi-UAV Detection', cited: 8 },
  { venue: 'ACM MobiCom 2023', title: 'Latency-Tolerant Teleoperation over NextG Networks', cited: 15 },
  { venue: 'IEEE VR Workshop', title: 'XR Simulation Environments for Autonomous Agent Training', cited: 5 },
]
function PublicationsOverlay() {
  const v = useVis('publications')
  if (v < 0.01) return null
  return (
    <div style={{ opacity: v, position: 'absolute', left: 210, top: '50%', transform: 'translateY(-50%)', width: 390 }}>
      <p style={{ fontFamily: F.mono, fontSize: '0.52rem', letterSpacing: '0.22em', color: '#6ED8F5', marginBottom: 10 }}>ZONE 05 · RESEARCH VAULT</p>
      <h2 style={{ fontFamily: F.head, fontWeight: 200, fontSize: '2.2rem', letterSpacing: '-0.03em', color: '#1E2B36', marginBottom: 14 }}>Publications</h2>
      {PUBS.map((p, i) => (
        <div key={i} style={card()}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
            <span style={{ fontFamily: F.mono, fontSize: '0.52rem', letterSpacing: '0.08em', color: '#6ED8F5' }}>{p.venue}</span>
            <span style={{ fontFamily: F.mono, fontSize: '0.58rem', color: '#8AAFD6' }}>↗ {p.cited} citations</span>
          </div>
          <p style={{ fontFamily: F.body, fontSize: '0.8rem', fontWeight: 500, color: '#1E2B36', lineHeight: 1.4 }}>{p.title}</p>
        </div>
      ))}
    </div>
  )
}

// ── SKILLS ─────────────────────────────────────────────────────────────────
const SKILLS = [
  { label: 'Robotics', items: ['ROS2','SLAM','Path Planning','Sensor Fusion','PX4','Control Systems'] },
  { label: 'AI / ML', items: ['PyTorch','TensorFlow','CUDA','OpenCV','Deep Learning','YOLOv8'] },
  { label: 'Simulation', items: ['CARLA','Unreal Engine','Unity','Gazebo','SUMO','Blender'] },
  { label: 'Networks', items: ['C-V2X','5G/NextG','MANET','Edge Computing','ROS2 DDS'] },
]
function SkillsOverlay() {
  const v = useVis('skills')
  if (v < 0.01) return null
  return (
    <div style={{ opacity: v, position: 'absolute', left: 210, top: '50%', transform: 'translateY(-50%)', width: 340 }}>
      <p style={{ fontFamily: F.mono, fontSize: '0.52rem', letterSpacing: '0.22em', color: '#6ED8F5', marginBottom: 10 }}>ZONE 06 · CAPABILITY MATRIX</p>
      <h2 style={{ fontFamily: F.head, fontWeight: 200, fontSize: '2.2rem', letterSpacing: '-0.03em', color: '#1E2B36', marginBottom: 14 }}>Skills</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {SKILLS.map((g, i) => (
          <div key={i} style={card({ padding: '12px 14px' })}>
            <p style={{ fontFamily: F.mono, fontSize: '0.5rem', letterSpacing: '0.14em', color: '#6ED8F5', marginBottom: 8 }}>{g.label.toUpperCase()}</p>
            {g.items.map(s => <p key={s} style={{ fontFamily: F.body, fontSize: '0.68rem', color: '#607488', marginBottom: 3 }}>{s}</p>)}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── CONTACT ────────────────────────────────────────────────────────────────
function ContactOverlay() {
  const v = useVis('contact')
  if (v < 0.01) return null
  return (
    <div style={{ opacity: v, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', maxWidth: 500, width: '90%', pointerEvents: v > 0.4 ? 'auto' : 'none' }}>
      <p style={{ fontFamily: F.mono, fontSize: '0.52rem', letterSpacing: '0.22em', color: '#6ED8F5', marginBottom: 10 }}>ZONE 07 · FUTURE LAB</p>
      <h2 style={{ fontFamily: F.head, fontWeight: 200, fontSize: 'clamp(2rem,4vw,3.2rem)', letterSpacing: '-0.04em', color: '#1E2B36', marginBottom: 10 }}>Let's Build the Future</h2>
      <p style={{ fontFamily: F.body, fontSize: '0.88rem', color: '#607488', lineHeight: 1.75, marginBottom: 28 }}>Open to research collaborations, industry partnerships, and opportunities in autonomous systems, robotics, and AI.</p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
        {[{ l: 'LinkedIn ↗', h: 'https://linkedin.com/in/lalitaditya-divakarla' }, { l: 'GitHub ↗', h: 'https://github.com/lalitaditya' }, { l: 'Email ↗', h: 'mailto:divar012@umn.edu' }].map(x => (
          <a key={x.l} href={x.h} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none', fontSize: '0.8rem' }}>{x.l}</a>
        ))}
      </div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(16px)', border: '1px solid rgba(110,216,245,0.25)', borderRadius: 99, padding: '8px 18px', boxShadow: '0 2px 12px rgba(30,43,54,0.06)' }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#6ED8F5', boxShadow: '0 0 0 0 rgba(110,216,245,0.4)', animation: 'pulse-soft 2s ease-in-out infinite', display: 'inline-block' }} />
        <span style={{ fontFamily: F.mono, fontSize: '0.58rem', letterSpacing: '0.12em', color: '#607488' }}>AVAILABLE FOR COLLABORATION</span>
      </div>
    </div>
  )
}

export default function SceneOverlay() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 40, pointerEvents: 'none' }}>
      <HeroOverlay />
      <EducationOverlay />
      <ResearchOverlay />
      <ProjectsOverlay />
      <PublicationsOverlay />
      <SkillsOverlay />
      <ContactOverlay />
    </div>
  )
}
