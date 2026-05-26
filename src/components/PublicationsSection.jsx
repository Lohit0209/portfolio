'use client'
import { useState } from 'react'

const publications = [
  {
    id: 'pub1',
    type: 'Conference Paper',
    title: 'Real-Time Digital Twin Synchronization for C-V2X Enabled Autonomous Vehicle Platoons on 5G Networks',
    venue: 'IEEE International Conference on Intelligent Transportation Systems (ITSC)',
    year: '2024',
    authors: 'Lalitaditya Divakarla, et al.',
    abstract: 'We present a novel framework for real-time digital twin synchronization of autonomous vehicle platoons using Cellular Vehicle-to-Everything (C-V2X) communication over 5G networks. Our approach achieves sub-10ms synchronization latency enabling safe teleoperation and cooperative driving.',
    tags: ['C-V2X', 'Digital Twins', 'Autonomous Vehicles', '5G', 'Platoon Control'],
    doi: '#',
    cited: 12,
  },
  {
    id: 'pub2',
    type: 'Journal Article',
    title: 'Decentralized Swarm Coordination for Multi-UAV Smoke Detection in GPS-Denied Environments',
    venue: 'IEEE Transactions on Robotics',
    year: '2024',
    authors: 'Lalitaditya Divakarla, et al.',
    abstract: 'This paper proposes a decentralized coordination architecture for UAV swarms operating in GPS-denied environments. We demonstrate deployment of 20+ UAVs achieving 94% smoke detection accuracy using distributed consensus and dynamic mesh networking protocols.',
    tags: ['Swarm Robotics', 'UAV', 'Multi-Agent', 'MANET', 'Coverage Planning'],
    doi: '#',
    cited: 8,
  },
  {
    id: 'pub3',
    type: 'Conference Paper',
    title: 'Latency-Tolerant Teleoperation Framework for Autonomous Vehicles over NextG Networks',
    venue: 'ACM MobiCom Workshop on Networked Robotics',
    year: '2023',
    authors: 'Lalitaditya Divakarla, et al.',
    abstract: 'We introduce a predictive teleoperation control framework that maintains safe remote driving under network latencies up to 150ms on 5G/6G infrastructure. The system uses model predictive control with online latency estimation to ensure smooth vehicle response.',
    tags: ['Teleoperation', 'NextG', '5G', 'Predictive Control', 'Autonomous Vehicles'],
    doi: '#',
    cited: 15,
  },
  {
    id: 'pub4',
    type: 'Workshop Paper',
    title: 'XR-Based Simulation Environments for Autonomous Agent Training and Human-Robot Interaction',
    venue: 'IEEE VR Workshop on XR for Robotics',
    year: '2023',
    authors: 'Lalitaditya Divakarla, et al.',
    abstract: 'We present an XR-based simulation framework that combines photorealistic environments with physics-accurate simulation for training autonomous agents. Results show 3x faster skill acquisition compared to real-world training cycles.',
    tags: ['XR Simulation', 'Human-Robot Interaction', 'Sim-to-Real', 'Autonomous Agents'],
    doi: '#',
    cited: 5,
  },
]

export default function PublicationsSection() {
  const [hover, setHover] = useState(null)

  return (
    <section id="publications" className="section" style={{ background: 'var(--black)' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="text-label mb-3">// ZONE_04 · RESEARCH ARCHIVE</p>
          <h2 className="text-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--white)' }}>
            Publications <span style={{ color: 'var(--cyan)' }}>Vault</span>
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: 8 }}>Hover a document to expand research context</p>
        </div>

        <div className="space-y-4">
          {publications.map((pub, i) => {
            const isHovered = hover === pub.id
            return (
              <div
                key={pub.id}
                className="pub-card animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s`, cursor: 'default' }}
                onMouseEnter={() => setHover(pub.id)}
                onMouseLeave={() => setHover(null)}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Left: index + type */}
                  <div className="flex-shrink-0 lg:w-36">
                    <p className="text-label mb-1" style={{ color: 'var(--cyan)', opacity: 0.6 }}>DOC_{String(i+1).padStart(2,'0')}</p>
                    <span className="chip" style={{ fontSize: '0.58rem' }}>{pub.type}</span>
                    <p className="text-label mt-3">{pub.year}</p>
                    <div className="mt-3 flex items-center gap-1.5">
                      <span style={{ fontSize: '0.7rem', color: 'var(--cyan)', fontFamily: 'var(--font-mono)' }}>↗ {pub.cited}</span>
                      <span className="text-label">citations</span>
                    </div>
                  </div>

                  {/* Right: content */}
                  <div className="flex-1">
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--white)', lineHeight: 1.4, marginBottom: 8 }}>
                      {pub.title}
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: 'var(--cyan)', fontFamily: 'var(--font-mono)', opacity: 0.7, marginBottom: 4 }}>
                      {pub.venue}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: 12 }}>
                      {pub.authors}
                    </p>

                    {/* Expandable abstract */}
                    <div
                      style={{
                        maxHeight: isHovered ? 200 : 0,
                        overflow: 'hidden',
                        transition: 'max-height 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                      }}
                    >
                      <div style={{ paddingBottom: 12 }}>
                        <p className="text-label mb-2" style={{ color: 'var(--cyan)' }}>ABSTRACT</p>
                        <p style={{ fontSize: '0.8rem', color: 'rgba(232,232,240,0.6)', lineHeight: 1.8 }}>{pub.abstract}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {pub.tags.map(t => (
                        <span key={t} className="chip" style={{ fontSize: '0.58rem', padding: '2px 8px' }}>{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* DOI link */}
                  <div className="flex-shrink-0">
                    <a
                      href={pub.doi}
                      className="btn-primary text-xs py-2 px-3"
                      style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}
                    >
                      <span style={{ position: 'relative', zIndex: 1 }}>Read ↗</span>
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
