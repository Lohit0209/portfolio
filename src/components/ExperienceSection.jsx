'use client'
import { useState } from 'react'

const experiences = [
  {
    id: 'av',
    tag: 'SIMULATION CHAMBER · 01',
    role: 'Graduate Research Assistant',
    org: 'University of Minnesota — AV & C-V2X Lab',
    period: 'Aug 2023 — Present',
    color: '#00e5ff',
    description: 'Leading research on autonomous vehicle digital twins and C-V2X (Cellular Vehicle-to-Everything) communication systems for NextG networks. Developing real-time synchronization between physical AV platforms and their digital counterparts.',
    tech: ['ROS2', 'CARLA', 'Unreal Engine', 'C-V2X', 'SUMO', 'Python', 'MATLAB', '5G NR', 'Digital Twins', 'TensorFlow'],
    highlights: [
      'Designed multi-modal C-V2X architecture for 5G-enabled AV platoons',
      'Developed real-time digital twin synchronization reducing latency by 40ms',
      'Built CARLA-based simulation environment for autonomous navigation testing',
      'Published research on teleoperation frameworks for remote driving scenarios',
    ],
  },
  {
    id: 'swarm',
    tag: 'SIMULATION CHAMBER · 02',
    role: 'Research Engineer — Swarm Systems',
    org: 'University of Minnesota — Swarm Intelligence Lab',
    period: 'Jan 2023 — Jul 2023',
    color: 'rgba(0,229,255,0.7)',
    description: 'Designed and implemented distributed multi-agent coordination algorithms for UAV swarms deployed in hazardous environments. Developed communication protocols for smoke and gas detection scenarios.',
    tech: ['ROS2', 'PX4', 'Python', 'Gazebo', 'MANET', 'OpenCV', 'TensorFlow', 'C++'],
    highlights: [
      'Developed distributed consensus algorithm for 20+ UAV coordination',
      'Built mesh network protocol for swarm communication in GPS-denied environments',
      'Designed gas/smoke detection pipeline with 94% accuracy in field tests',
      'Implemented fault-tolerant swarm recovery protocols',
    ],
  },
  {
    id: 'xr',
    tag: 'SIMULATION CHAMBER · 03',
    role: 'XR Simulation Engineer',
    org: 'PES University — Immersive Systems Research',
    period: 'Aug 2020 — May 2021',
    color: 'rgba(0,229,255,0.5)',
    description: 'Built immersive XR simulation environments for robotics training and teleoperation. Created procedurally generated worlds for autonomous agent evaluation and human-robot interaction studies.',
    tech: ['Unity', 'Unreal Engine', 'C#', 'OpenXR', 'ROS', 'Python', 'CUDA'],
    highlights: [
      'Developed photorealistic simulation environments for AV testing',
      'Built XR teleoperation interface with haptic feedback integration',
      'Created procedural environment generator for ML training datasets',
      'Integrated ROS middleware with Unreal Engine for real-time robot simulation',
    ],
  },
]

export default function ExperienceSection() {
  const [active, setActive] = useState(0)
  const exp = experiences[active]

  return (
    <section id="experience" className="section" style={{ background: 'var(--black)' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="text-label mb-3">// ZONE_02 · RESEARCH EXPERIENCE</p>
          <h2 className="text-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--white)' }}>
            Simulation <span style={{ color: 'var(--cyan)' }}>Chambers</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chamber selector */}
          <div className="space-y-3 lg:col-span-1">
            {experiences.map((e, i) => (
              <button
                key={e.id}
                onClick={() => setActive(i)}
                style={{
                  width: '100%',
                  background: active === i ? 'var(--surface-3)' : 'var(--surface-2)',
                  border: `1px solid ${active === i ? 'var(--border-active)' : 'var(--border)'}`,
                  borderRadius: 8,
                  padding: '16px 20px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: active === i ? '0 0 20px rgba(0,229,255,0.1)' : 'none',
                }}
              >
                <p className="text-label mb-1" style={{ color: active === i ? 'var(--cyan)' : 'var(--muted)' }}>{e.tag}</p>
                <p style={{ fontSize: '0.85rem', fontWeight: 500, color: active === i ? 'var(--white)' : 'rgba(232,232,240,0.6)' }}>{e.role}</p>
                <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 4, fontFamily: 'var(--font-mono)' }}>{e.period}</p>
              </button>
            ))}
          </div>

          {/* Chamber detail */}
          <div className="lg:col-span-2" key={active}>
            <div className="glass-strong p-8 h-full animate-fade-in">
              {/* Header */}
              <div className="mb-6 pb-6" style={{ borderBottom: '1px solid var(--border)' }}>
                <p className="text-label mb-2" style={{ color: 'var(--cyan)' }}>{exp.tag}</p>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--white)', marginBottom: 4 }}>{exp.role}</h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(232,232,240,0.6)' }}>{exp.org}</p>
                <p className="text-label mt-2">{exp.period}</p>
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.88rem', color: 'rgba(232,232,240,0.65)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                {exp.description}
              </p>

              {/* Highlights */}
              <div className="mb-6">
                <p className="text-label mb-3">KEY CONTRIBUTIONS</p>
                <ul className="space-y-2">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span style={{ color: 'var(--cyan)', fontSize: '0.7rem', marginTop: 4, flexShrink: 0 }}>◆</span>
                      <span style={{ fontSize: '0.82rem', color: 'rgba(232,232,240,0.7)', lineHeight: 1.7 }}>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech stack */}
              <div>
                <p className="text-label mb-3">TECHNOLOGY STACK</p>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map(t => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
