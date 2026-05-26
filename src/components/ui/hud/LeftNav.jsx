'use client'
import { useJourneyStore, SECTIONS } from '@/store/journeyStore'

export default function LeftNav({ onGoSection }) {
  const active = useJourneyStore(s => s.activeSection)
  return (
    <div style={{height:'100%',background:'var(--glass)',backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',borderRight:'1px solid var(--border)',padding:'8px 12px',display:'flex',flexDirection:'column',gap:2,overflowY:'auto'}}>
      {SECTIONS.map(s => {
        const isActive = active === s.id
        return (
          <button key={s.id} onClick={() => onGoSection(s.id)}
            className={`nav-item${isActive?' active':''}`}>
            <span style={{fontFamily:'var(--font-mono)',fontSize:'0.55rem',color:isActive?'var(--cyan)':'var(--text-3)',minWidth:20,marginTop:1}}>{s.num}</span>
            <div>
              <p style={{fontFamily:'var(--font-body)',fontSize:'0.75rem',fontWeight:isActive?600:400,color:isActive?'var(--text)':'var(--text-2)',marginBottom:1,transition:'all 0.2s'}}>{s.label}</p>
              <p style={{fontFamily:'var(--font-mono)',fontSize:'0.48rem',color:isActive?'rgba(89,195,255,0.6)':'var(--text-3)'}}>{s.sub}</p>
            </div>
          </button>
        )
      })}
      {/* System status mini */}
      <div style={{marginTop:'auto',padding:'10px 4px',borderTop:'1px solid var(--border)'}}>
        <p style={{fontFamily:'var(--font-mono)',fontSize:'0.48rem',letterSpacing:'0.2em',color:'var(--text-3)',marginBottom:8}}>SYSTEM STATUS</p>
        {[['LIDAR','online'],['VISION','online'],['NAVIGATION','active'],['BATTERY','warn']].map(([k,st])=>(
          <div key={k} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:5}}>
            <span style={{fontFamily:'var(--font-mono)',fontSize:'0.5rem',color:'var(--text-3)'}}>{k}</span>
            <span style={{fontFamily:'var(--font-mono)',fontSize:'0.5rem',color:st==='online'?'var(--green)':st==='active'?'var(--cyan)':'var(--warm)',fontWeight:600}}>{st.toUpperCase()}</span>
          </div>
        ))}
        <div style={{marginTop:6}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:3}}>
            <span style={{fontFamily:'var(--font-mono)',fontSize:'0.48rem',color:'var(--text-3)'}}>BATTERY</span>
            <span style={{fontFamily:'var(--font-mono)',fontSize:'0.48rem',color:'var(--warm)'}}>87%</span>
          </div>
          <div style={{height:2,background:'rgba(255,255,255,0.06)',borderRadius:99}}>
            <div style={{height:'100%',width:'87%',background:'linear-gradient(90deg,var(--warm),#FFD6A5)',borderRadius:99}}/>
          </div>
        </div>
      </div>
    </div>
  )
}
