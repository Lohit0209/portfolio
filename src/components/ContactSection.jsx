'use client'
import { useState } from 'react'

const contacts = [
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/lalitaditya-divakarla',
    href: 'https://www.linkedin.com/in/lalitaditya-divakarla',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/lalitaditya',
    href: 'https://github.com/lalitaditya',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'divar012@umn.edu',
    href: 'mailto:divar012@umn.edu',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    label: 'University',
    value: 'University of Minnesota, Twin Cities',
    href: 'https://twin-cities.umn.edu',
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
  },
]

export default function ContactSection() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="section" style={{ background: 'var(--black)' }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="text-label mb-3">// ZONE_06 · FUTURE LAB · CONTACT</p>
          <h2 className="text-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'var(--white)' }}>
            Initialize <span style={{ color: 'var(--cyan)' }}>Connection</span>
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginTop: 10, maxWidth: 500 }}>
            Open to research collaborations, industry partnerships, and internship opportunities in autonomous systems.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Links */}
          <div>
            <p className="text-label mb-6">COMMUNICATION CHANNELS</p>
            <div className="space-y-4 mb-10">
              {contacts.map((c, i) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass flex items-center gap-4 p-4 rounded-lg animate-fade-in-up group"
                  style={{ textDecoration: 'none', animationDelay: `${i * 0.1}s`, transition: 'all 0.3s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-active)'; e.currentTarget.style.boxShadow = '0 0 20px var(--cyan-dim)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--cyan-dim)', border: '1px solid var(--border-active)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cyan)', flexShrink: 0 }}>
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-label mb-0.5">{c.label}</p>
                    <p style={{ fontSize: '0.82rem', color: 'rgba(232,232,240,0.7)', fontFamily: 'var(--font-mono)' }}>{c.value}</p>
                  </div>
                  <span style={{ marginLeft: 'auto', color: 'var(--cyan)', opacity: 0.5 }}>↗</span>
                </a>
              ))}
            </div>

            {/* Status card */}
            <div className="glass-strong p-5 rounded-xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 rounded-full animate-pulse-cyan" style={{ background: 'var(--cyan)', display: 'inline-block', flexShrink: 0 }} />
                <span className="text-label" style={{ color: 'var(--cyan)' }}>SYSTEM STATUS · ACTIVE</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'rgba(232,232,240,0.6)', lineHeight: 1.7 }}>
                Currently pursuing PhD at University of Minnesota. Available for research collaboration, speaking engagements, and exploratory conversations about autonomous systems and AI infrastructure.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <p className="text-label mb-6">SEND A MESSAGE</p>
            <form onSubmit={handleSubmit} className="glass-strong p-8 rounded-xl space-y-5">
              {[
                { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your Name' },
                { key: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                { key: 'subject', label: 'Subject', type: 'text', placeholder: 'Research Collaboration / Inquiry' },
              ].map(field => (
                <div key={field.key}>
                  <label className="text-label block mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    value={form[field.key]}
                    onChange={(e) => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    required
                    style={{
                      width: '100%',
                      background: 'var(--surface-3)',
                      border: '1px solid var(--border)',
                      borderRadius: 6,
                      padding: '10px 14px',
                      color: 'var(--white)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      outline: 'none',
                      transition: 'border-color 0.3s ease',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = 'var(--border-active)'; e.target.style.boxShadow = '0 0 10px var(--cyan-dim)' }}
                    onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                  />
                </div>
              ))}
              <div>
                <label className="text-label block mb-2">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Describe your research interest or collaboration idea..."
                  rows={4}
                  required
                  style={{
                    width: '100%',
                    background: 'var(--surface-3)',
                    border: '1px solid var(--border)',
                    borderRadius: 6,
                    padding: '10px 14px',
                    color: 'var(--white)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.3s ease',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = 'var(--border-active)'; e.target.style.boxShadow = '0 0 10px var(--cyan-dim)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
              </div>
              <button type="submit" className="btn-primary w-full justify-center" style={{ width: '100%' }}>
                <span style={{ position: 'relative', zIndex: 1 }}>
                  {sent ? '✓ Message Transmitted' : 'Transmit Message →'}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
