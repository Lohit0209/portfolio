'use client'
import { useJourneyStore, SECTIONS } from '@/store/journeyStore'

const CARDS = [
  { id:'education',    label:'Education',       sub:'Academic Background\n& Achievements',   icon:'🎓', img:'🏛️' },
  { id:'research',     label:'Research Labs',   sub:'Autonomous Systems,\nSimulations & Digital Twins', icon:'🔬', img:'🤖' },
  { id:'projects',     label:'Projects',        sub:'Real-world Robotics\n& Software Solutions', icon:'⚙️', img:'🛠️' },
  { id:'publications', label:'Publications',    sub:'Papers, Journals &\nResearch Impact', icon:'📄', img:'📚' },
  { id:'skills',       label:'Skills Network',  sub:'Technical Skills\n& Expertise Graph', icon:'🧠', img:'🔗' },
  { id:'contact',      label:'Future Lab',      sub:'Vision & Impact\nLet\'s Collaborate', icon:'🌐', img:'🚀' },
]

export default function BottomCards({ onGoSection }) {
  const active = useJourneyStore(s => s.activeSection)
  return (
    <div style={{ background:'var(--glass)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', borderTop:'1px solid var(--border)', padding:'8px 12px', display:'flex', gap:8, overflowX:'auto' }}>
      {CARDS.map(c => {
        const isActive = active === c.id
        return (
          <button key={c.id} onClick={() => onGoSection(c.id)}
            className={`section-card${isActive?' active-card':''}`}
            style={{ flex:'0 0 150px', textAlign:'left', cursor:'pointer' }}>
            {/* Emoji background */}
            <div style={{ fontSize:'1.5rem', marginBottom:6, opacity:0.7 }}>{c.img}</div>
            <p style={{ fontFamily:'var(--font-body)', fontWeight:600, fontSize:'0.75rem', color: isActive ? 'var(--cyan)' : 'var(--text)', marginBottom:3, lineHeight:1.2 }}>{c.label}</p>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.48rem', color:'var(--text-3)', lineHeight:1.5, whiteSpace:'pre-line' }}>{c.sub}</p>
            {isActive && <div style={{ width:'100%', height:1.5, background:'linear-gradient(90deg,var(--cyan),transparent)', marginTop:8, borderRadius:99 }} />}
          </button>
        )
      })}
    </div>
  )
}
