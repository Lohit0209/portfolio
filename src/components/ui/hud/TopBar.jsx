'use client'
import { useJourneyStore } from '@/store/journeyStore'

const gl = { background:'var(--glass)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', border:'1px solid var(--border)', height:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px' }

export default function TopBar({ navMode, onSwitchMode }) {
  const section = useJourneyStore(s => s.activeSection)
  return (
    <div style={gl}>
      {/* Logo */}
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <div style={{width:30,height:30,borderRadius:'50%',background:'var(--cyan-dim)',border:'1.5px solid var(--border-active)',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{width:7,height:7,borderRadius:'50%',background:'var(--cyan)'}}/>
        </div>
        <div>
          <p style={{fontFamily:'var(--font-display)',fontWeight:500,fontSize:'0.78rem',letterSpacing:'0.04em',color:'var(--text)',lineHeight:1}}>LALITADITYA DIVAKARLA</p>
          <p style={{fontFamily:'var(--font-mono)',fontSize:'0.48rem',letterSpacing:'0.18em',color:'var(--text-3)'}}>AUTONOMOUS SYSTEMS ENGINEER</p>
        </div>
      </div>

      {/* Mode toggle — inspired by reference */}
      <div style={{display:'flex',alignItems:'center',gap:6,background:'rgba(0,0,0,0.25)',border:'1px solid var(--border)',borderRadius:10,padding:'6px 8px'}}>
        <p style={{fontFamily:'var(--font-mono)',fontSize:'0.5rem',letterSpacing:'0.2em',color:'var(--text-3)',marginRight:6}}>MODE SELECTION</p>
        {[['auto','🤖','AUTONOMOUS MODE','Sit back and enjoy the ride'],['manual','🖱️','MANUAL MODE','Explore at your pace']].map(([m,ic,t,s])=>(
          <button key={m} onClick={()=>onSwitchMode(m)} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 12px',borderRadius:7,border:`1px solid ${navMode===m?'var(--border-active)':'transparent'}`,background:navMode===m?'var(--cyan-dim)':'transparent',cursor:'pointer',transition:'all 0.2s'}}>
            <span style={{fontSize:'0.8rem'}}>{ic}</span>
            <div style={{textAlign:'left'}}>
              <p style={{fontFamily:'var(--font-mono)',fontSize:'0.52rem',letterSpacing:'0.1em',color:navMode===m?'var(--cyan)':'var(--text-2)',fontWeight:600}}>{t}</p>
              <p style={{fontFamily:'var(--font-mono)',fontSize:'0.46rem',color:'var(--text-3)'}}>{s}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Links */}
      <div style={{display:'flex',alignItems:'center',gap:16}}>
        {[['GitHub','https://github.com/lalitaditya'],['LinkedIn','https://linkedin.com/in/lalitaditya-divakarla'],['✉','mailto:divar012@umn.edu']].map(([l,h])=>(
          <a key={l} href={h} target="_blank" rel="noopener noreferrer"
            style={{fontFamily:'var(--font-body)',fontSize:'0.8rem',color:'var(--text-2)',textDecoration:'none',transition:'color 0.2s'}}
            onMouseEnter={e=>e.target.style.color='var(--cyan)'} onMouseLeave={e=>e.target.style.color='var(--text-2)'}>{l}</a>
        ))}
      </div>
    </div>
  )
}
