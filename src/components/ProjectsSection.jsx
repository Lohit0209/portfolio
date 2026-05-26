'use client'
import { useState } from 'react'

const projects = [
  {
    id: 'cvx2',
    tag: 'NODE · 01',
    title: 'C-V2X Digital Twin Framework',
    category: 'Autonomous Vehicles · NextG Networks',
    status: 'Active Research',
    description: 'A real-time digital twin synchronization framework for C-V2X enabled autonomous vehicle platoons on 5G/NextG networks. Enables sub-10ms teleoperation latency with predictive channel modeling.',
    tech: ['ROS2', 'CARLA', 'C-V2X', '5G NR', 'Python', 'SUMO', 'TensorFlow', 'MATLAB'],
    impact: 'Reduces AV collision risk by 67% in mixed-traffic simulations',
    arch: ['Physical AV Layer', 'C-V2X Protocol Stack', 'Digital Twin Engine', '5G Network Slice', 'Teleoperation Interface'],
    github: 'https://github.com/lalitaditya',
    color: '#00e5ff',
  },
  {
    id: 'swarm',
    tag: 'NODE · 02',
    title: 'Autonomous Swarm Navigation',
    category: 'Swarm Robotics · Multi-Agent Systems',
    status: 'Completed',
    description: 'Distributed multi-UAV coordination system for smoke detection and area coverage in GPS-denied environments. Implements decentralized consensus protocols and dynamic mesh networking.',
    tech: ['ROS2', 'PX4', 'Gazebo', 'Python', 'C++', 'MANET', 'OpenCV', 'TensorFlow'],
    impact: '94% smoke detection accuracy across 20+ UAV swarm deployments',
    arch: ['Swarm Consensus Layer', 'Mesh Network Protocol', 'Sensor Fusion', 'Coverage Planner', 'Fault Recovery'],
    github: 'https://github.com/lalitaditya',
    color: '#00e5ff',
  },
  {
    id: 'teleop',
    tag: 'NODE · 03',
    title: 'NextG Teleoperation System',
    category: 'Teleoperation · Autonomous Systems',
    status: 'Active Research',
    description: 'High-fidelity teleoperation platform for remotely operated autonomous vehicles over 5G/6G networks. Features predictive control, latency compensation, and XR-based operator interface.',
    tech: ['ROS2', 'Unreal Engine', 'OpenXR', 'Python', 'C++', '5G', 'CUDA', 'PyTorch'],
    impact: 'Maintains safe teleoperation control under 150ms network latency',
    arch: ['XR Operator Interface', 'Latency Predictor', 'Control Arbitration', 'Network Layer', 'Physical Robot'],
    github: 'https://github.com/lalitaditya',
    color: 'rgba(0,229,255,0.8)',
  },
  {
    id: 'dt',
    tag: 'NODE · 04',
    title: 'Urban Digital Twin Platform',
    category: 'Digital Twins · Smart Cities',
    status: 'Completed',
    description: 'City-scale digital twin platform synchronizing traffic, infrastructure, and autonomous agent data in real-time. Supports what-if analysis and predictive scenario simulation.',
    tech: ['Unreal Engine', 'Python', 'REST API', 'PostgreSQL', 'SUMO', 'ROS2', 'Three.js'],
    impact: 'Simulates 10,000+ vehicles with real-time synchronization under 50ms',
    arch: ['Real-World Sensors', 'Data Ingestion', 'Digital Twin Core', 'Simulation Engine', 'Visualization'],
    github: 'https://github.com/lalitaditya',
    color: 'rgba(0,229,255,0.6)',
  },
  {
    id: 'xr',
    tag: 'NODE · 05',
    title: 'XR Robotics Training Environment',
    category: 'XR Simulation · Human-Robot Interaction',
    status: 'Completed',
    description: 'Photorealistic XR environment for autonomous agent training and human-robot interaction research. Features procedural world generation and physics-accurate simulation.',
    tech: ['Unity', 'Unreal Engine', 'C#', 'OpenXR', 'ROS', 'Python', 'ML-Agents'],
    impact: '3x faster robot skill learning vs. real-world training cycles',
    arch: ['Procedural World Gen', 'Physics Engine', 'ROS Bridge', 'XR Interface', 'ML Training Loop'],
    github: 'https://github.com/lalitaditya',
    color: 'rgba(0,229,255,0.5)',
  },
  {
    id: 'slam',
    tag: 'NODE · 06',
    title: 'Multi-Modal SLAM System',
    category: 'Navigation · Sensor Fusion',
    status: 'Completed',
    description: 'Robust SLAM implementation fusing LiDAR, camera, IMU, and GPS data for outdoor autonomous navigation in dynamic environments. Achieves centimeter-level localization accuracy.',
    tech: ['ROS2', 'C++', 'OpenCV', 'PCL', 'GTSAM', 'Python', 'CUDA'],
    impact: '<5cm localization error in dynamic urban environments at 20 FPS',
    arch: ['Sensor Array', 'Data Fusion Layer', 'Feature Extraction', 'Graph Optimization', 'Map Builder'],
    github: 'https://github.com/lalitaditya',
    color: 'rgba(0,229,255,0.4)',
  },
]

function ArchDiagram({ arch, color }) {
  return (
    <div className="flex flex-col gap-1 mt-4">
      {arch.map((layer, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            style={{
              height: 28,
              flex: 1,
              background: `rgba(0,229,255,${0.04 + i * 0.02})`,
              border: `1px solid rgba(0,229,255,${0.08 + i * 0.03})`,
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 10,
            }}
          >
            <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: `rgba(232,232,240,${0.4 + i * 0.12})` }}>
              {layer}
            </span>
          </div>
          {i < arch.length - 1 && (
            <span style={{ fontSize: '0.6rem', color: 'rgba(0,229,255,0.3)' }}>↓</span>
          )}
        </div>
      )).reverse()}
    </div>
  )
}

export default function ProjectsSection() {
  const [expanded, setExpanded] = useState(null)

  return (
    <section id="projects" className="section" style={{ background: 'var(--surface-1)' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="text-label mb-3">// ZONE_03 · RESEARCH PROJECTS</p>
          <h2 className="text-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--white)' }}>
            System <span style={{ color: 'var(--cyan)' }}>Nodes</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: 8 }}>Click any node to expand architecture</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {projects.map((proj, i) => {
            const isOpen = expanded === proj.id
            return (
              <div
                key={proj.id}
                className="project-card animate-fade-in-up"
                style={{ animationDelay: `${i * 0.08}s`, cursor: 'pointer' }}
                onClick={() => setExpanded(isOpen ? null : proj.id)}
              >
                {/* Card header band */}
                <div style={{ height: 3, background: `linear-gradient(to right, ${proj.color}, transparent)` }} />

                <div className="p-6">
                  {/* Tag + Status */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-label">{proj.tag}</span>
                    <span
                      className="chip"
                      style={{
                        fontSize: '0.6rem',
                        background: proj.status === 'Active Research' ? 'rgba(0,229,255,0.1)' : 'rgba(90,90,114,0.2)',
                        borderColor: proj.status === 'Active Research' ? 'var(--border-active)' : 'var(--border)',
                        color: proj.status === 'Active Research' ? 'var(--cyan)' : 'var(--muted)',
                      }}
                    >
                      {proj.status === 'Active Research' && <span className="w-1.5 h-1.5 rounded-full inline-block mr-1.5" style={{ background: 'var(--cyan)' }} />}
                      {proj.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--white)', marginBottom: 6, lineHeight: 1.3 }}>{proj.title}</h3>
                  <p style={{ fontSize: '0.72rem', color: 'var(--cyan)', fontFamily: 'var(--font-mono)', marginBottom: 12, opacity: 0.8 }}>{proj.category}</p>

                  {/* Description */}
                  <p style={{ fontSize: '0.8rem', color: 'rgba(232,232,240,0.55)', lineHeight: 1.7, marginBottom: 16 }}>
                    {proj.description}
                  </p>

                  {/* Impact */}
                  <div className="glass p-3 rounded-lg mb-4" style={{ borderColor: 'rgba(0,229,255,0.1)' }}>
                    <p className="text-label mb-1">IMPACT</p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--white)', fontStyle: 'italic' }}>{proj.impact}</p>
                  </div>

                  {/* Tech chips */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.tech.slice(0, 5).map(t => (
                      <span key={t} className="chip" style={{ fontSize: '0.58rem', padding: '2px 8px' }}>{t}</span>
                    ))}
                    {proj.tech.length > 5 && (
                      <span className="chip" style={{ fontSize: '0.58rem', padding: '2px 8px', borderColor: 'var(--border)', color: 'var(--muted)' }}>+{proj.tech.length - 5}</span>
                    )}
                  </div>

                  {/* Expand toggle */}
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
                      {isOpen ? 'HIDE ARCHITECTURE ↑' : 'VIEW ARCHITECTURE ↓'}
                    </span>
                  </div>

                  {/* Architecture diagram (expanded) */}
                  {isOpen && (
                    <div className="animate-fade-in">
                      <p className="text-label mt-4 mb-2">SYSTEM ARCHITECTURE</p>
                      <ArchDiagram arch={proj.arch} color={proj.color} />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
