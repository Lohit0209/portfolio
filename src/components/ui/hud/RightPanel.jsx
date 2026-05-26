'use client'
import { useJourneyStore, SECTIONS } from '@/store/journeyStore'

export default function RightPanel() {
  const active    = useJourneyStore(s => s.activeSection)
  const mission   = useJourneyStore(s => s.currentMission)
  const objective = useJourneyStore(s => s.currentObjective)
  const robotState = useJourneyStore(s => s.robotState)
  const sp        = useJourneyStore(s => s.scrollProgress)
  const section   = SECTIONS.find(s => s.id === active) || SECTIONS[0]
  const sidx      = SECTIONS.findIndex(s => s.id === active)
  const progress  = Math.round(sp * 100)

  const statusColor = robotState === 'standby' ? 'var(--text-2)' : robotState === 'navigating' ? 'var(--cyan)' : robotState === 'docking' ? 'var(--green)' : robotState === 'connecting' ? 'var(--warm)' : 'var(--cyan)'

  return (
    <div style={{height:'100%',display:'flex',flexDirection:'column',gap:10}}>
      {/* Mission card */}
      <div className="glass" style={{padding:'16px',flex:1}}>
        <p style={{fontFamily:'var(--font-mono)',fontSize:'0.5rem',letterSpacing:'0.2em',color:'var(--text-3)',marginBottom:10}}>CURRENT MISSION</p>
        <h3 style={{fontFamily:'var(--font-display)',fontSize:'1.15rem',fontWeight:600,color:'var(--text)',lineHeight:1.2,marginBottom:10}}>{section.label}</h3>
        <p style={{fontFamily:'var(--font-mono)',fontSize:'0.5rem',letterSpacing:'0.15em',color:'var(--text-3)',marginBottom:4}}>MISSION</p>
        <p style={{fontFamily:'var(--font-body)',fontSize:'0.72rem',color:'var(--text-2)',lineHeight:1.6,marginBottom:12}}>{mission}</p>
        <p style={{fontFamily:'var(--font-mono)',fontSize:'0.5rem',letterSpacing:'0.15em',color:'var(--text-3)',marginBottom:4}}>OBJECTIVE</p>
        <p style={{fontFamily:'var(--font-body)',fontSize:'0.68rem',color:'var(--text-2)',lineHeight:1.6,marginBottom:14}}>{objective}</p>
        <p style={{fontFamily:'var(--font-mono)',fontSize:'0.5rem',letterSpacing:'0.15em',color:'var(--text-3)',marginBottom:6}}>STATUS</p>
        <div style={{display:'flex',alignItems:'center',gap:7,marginBottom:12}}>
          <div style={{width:6,height:6,borderRadius:'50%',background:statusColor,boxShadow:`0 0 6px ${statusColor}`}}/>
          <span style={{fontFamily:'var(--font-mono)',fontSize:'0.6rem',letterSpacing:'0.12em',color:statusColor,fontWeight:600,textTransform:'uppercase'}}>{robotState}</span>
        </div>
        <p style={{fontFamily:'var(--font-mono)',fontSize:'0.5rem',letterSpacing:'0.15em',color:'var(--text-3)',marginBottom:5}}>PROGRESS</p>
        <div className="progress-bar" style={{marginBottom:4}}>
          <div className="progress-fill" style={{width:`${progress}%`}}/>
        </div>
        <span style={{fontFamily:'var(--font-mono)',fontSize:'0.55rem',color:'var(--cyan)'}}>{progress}%</span>
      </div>

      {/* System health */}
      <div className="glass" style={{padding:'14px'}}>
        <p style={{fontFamily:'var(--font-mono)',fontSize:'0.5rem',letterSpacing:'0.2em',color:'var(--text-3)',marginBottom:10}}>SYSTEM HEALTH</p>
        {[['LIDAR','ONLINE','green'],['VISION','ONLINE','green'],['IMU','ONLINE','green'],['BATTERY','87%','warn']].map(([k,v,c])=>(
          <div key={k} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:6}}>
            <span style={{fontFamily:'var(--font-mono)',fontSize:'0.52rem',color:'var(--text-3)'}}>{k}</span>
            <span style={{fontFamily:'var(--font-mono)',fontSize:'0.52rem',fontWeight:600,color:c==='green'?'var(--green)':c==='warn'?'var(--warm)':'var(--cyan)'}}>{v}</span>
          </div>
        ))}
      </div>

      {/* Reach out */}
      <div className="glass" style={{padding:'12px',textAlign:'center'}}>
        <p style={{fontFamily:'var(--font-mono)',fontSize:'0.5rem',letterSpacing:'0.2em',color:'var(--text-3)',marginBottom:8}}>REACH OUT</p>
        <a href="mailto:divar012@umn.edu" style={{display:'inline-flex',alignItems:'center',gap:6,padding:'7px 16px',background:'var(--cyan-dim)',border:'1px solid var(--border-active)',borderRadius:99,textDecoration:'none',cursor:'pointer'}}>
          <span style={{fontFamily:'var(--font-mono)',fontSize:'0.55rem',color:'var(--cyan)'}}>✉ LET'S CONNECT</span>
        </a>
      </div>
    </div>
  )
}
