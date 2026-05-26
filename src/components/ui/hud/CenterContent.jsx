'use client'
import { useState } from 'react'
import { useJourneyStore, SECTIONS } from '@/store/journeyStore'

// Journey topology map nodes
function JourneyMap({ onGoSection }) {
  const active = useJourneyStore(s => s.activeSection)
  const sp     = useJourneyStore(s => s.scrollProgress)
  return (
    <div style={{background:'var(--glass)',border:'1px solid var(--border)',borderRadius:12,padding:'14px 16px',height:'100%',display:'flex',flexDirection:'column'}}>
      <p style={{fontFamily:'var(--font-mono)',fontSize:'0.5rem',letterSpacing:'0.22em',color:'var(--text-3)',marginBottom:12}}>JOURNEY OVERVIEW</p>
      <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'space-around',gap:4}}>
        {SECTIONS.slice(1).map((s, i) => {
          const isActive = active === s.id
          const isPast   = sp >= s.progress
          return (
            <div key={s.id} className={`journey-node${isActive?' active':''}`} onClick={()=>onGoSection(s.id)} style={{pointerEvents:'auto'}}>
              <div className="journey-node-dot" style={{background:isActive?'var(--cyan-dim)':isPast?'rgba(89,195,255,0.08)':'var(--glass)',borderColor:isActive?'var(--cyan)':isPast?'rgba(89,195,255,0.3)':'var(--border)'}}>
                <span style={{fontSize:'0.7rem'}}>{s.icon}</span>
              </div>
              <span className="journey-node-label" style={{color:isActive?'var(--cyan)':isPast?'var(--text-2)':'var(--text-3)'}}>{s.label.split(' ')[0]}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// CONTENT per active section
const CONTENT = {
  boot: null,
  hero: <HeroContent />,
  education: <EduContent />,
  research: <ResContent />,
  projects: <ProjContent />,
  publications: <PubContent />,
  skills: <SkillContent />,
  contact: <ContactContent />,
}

export default function CenterContent() {
  const active = useJourneyStore(s => s.activeSection)
  const goSection = useJourneyStore(s => s.goToSection)
  return (
    <div style={{height:'100%',display:'flex',flexDirection:'column',gap:10,padding:'8px 12px'}}>
      <JourneyMap onGoSection={goSection}/>
      <div style={{flex:1,overflowY:'auto'}} className="content-scroll">
        {CONTENT[active] || <HeroContent/>}
      </div>
    </div>
  )
}

function HeroContent() {
  const go = useJourneyStore(s => s.goToSection)
  return (
    <div style={{animation:'fadeInUp 0.5s ease both'}}>
      <p style={{fontFamily:'var(--font-mono)',fontSize:'0.55rem',letterSpacing:'0.22em',color:'var(--text-3)',marginBottom:10}}>Hello, I'm</p>
      <h1 style={{fontFamily:'var(--font-display)',fontWeight:200,fontSize:'clamp(2rem,3.5vw,3.2rem)',letterSpacing:'-0.04em',lineHeight:1.0,color:'var(--text)'}}>LALITADITYA</h1>
      <h1 style={{fontFamily:'var(--font-display)',fontWeight:200,fontSize:'clamp(2rem,3.5vw,3.2rem)',letterSpacing:'-0.04em',lineHeight:1.0,color:'var(--cyan)',marginBottom:10}}>DIVAKARLA</h1>
      <p style={{fontFamily:'var(--font-mono)',fontSize:'0.58rem',letterSpacing:'0.14em',color:'var(--text-3)',marginBottom:12}}>AUTONOMOUS SYSTEMS · ROBOTICS · DIGITAL TWINS</p>
      <p style={{fontFamily:'var(--font-body)',fontSize:'0.82rem',color:'var(--text-2)',lineHeight:1.75,marginBottom:16,maxWidth:380}}>I design and build intelligent robotic systems that perceive, plan, and act in the real world. Exploring autonomy, perception, and decentralized intelligence to shape the future of robotics.</p>
      <button className="btn-cta" onClick={()=>go('education')}>START JOURNEY →</button>
    </div>
  )
}

function EduContent() {
  return (
    <div style={{animation:'fadeInUp 0.5s ease both'}}>
      <SectionHeader zone="02" title="Education" sub="ACADEMIC FOUNDATIONS & ACHIEVEMENTS"/>
      {[{d:'PhD in Computer Science',s:'University of Minnesota',p:'2023–Present',f:'Autonomous Systems · Digital Twins · C-V2X · Swarm Robotics · Multi-agent Systems'},{d:'M.S. in Computer Science',s:'University of Minnesota',p:'2021–2023',f:'SLAM · Path Planning · Sensor Fusion · ROS2 · Perception'},{d:'B.Tech in Electronics & Communication',s:'PES University, Bangalore',p:'2017–2021',f:'Embedded Systems · Signal Processing · IoT · VLSI Design'}].map((e,i)=>(
        <div key={i} style={{background:'var(--glass)',border:'1px solid var(--border)',borderLeft:'3px solid var(--cyan)',borderRadius:10,padding:'12px 14px',marginBottom:8}}>
          <p style={{fontFamily:'var(--font-body)',fontWeight:600,fontSize:'0.82rem',color:'var(--text)',marginBottom:3}}>{e.d}</p>
          <p style={{fontFamily:'var(--font-body)',fontSize:'0.72rem',color:'var(--cyan)',marginBottom:2}}>{e.s}</p>
          <p style={{fontFamily:'var(--font-mono)',fontSize:'0.52rem',color:'var(--text-3)',marginBottom:5}}>{e.p}</p>
          <p style={{fontFamily:'var(--font-mono)',fontSize:'0.52rem',color:'var(--text-2)',lineHeight:1.6}}>{e.f}</p>
        </div>
      ))}
    </div>
  )
}

function ResContent() {
  const [a,setA]=useState(0)
  const items=[{tag:'CHAMBER 01',t:'C-V2X Autonomous Vehicle Platoons',d:'Digital twin synchronization for AV platoons on 5G NextG networks. Achieved sub-10ms teleoperation latency and 67% collision risk reduction through real-time sensor fusion.',tech:['ROS2','CARLA','C-V2X','5G NR','Digital Twin','SUMO']},{tag:'CHAMBER 02',t:'Swarm UAV Coordination System',d:'Decentralized consensus algorithm for 20+ UAV formations performing smoke and hazard detection. Achieved 94% accuracy using MANET protocols.',tech:['PX4','MANET','Gazebo','Swarm AI','OpenCV']},{tag:'CHAMBER 03',t:'XR Teleoperation Platform',d:'Photorealistic XR simulation with haptic feedback for remote autonomous vehicle operation. End-to-end latency under 150ms over NextG.',tech:['Unreal Engine','OpenXR','CUDA','5G','Haptics']}]
  const c=items[a]
  return (
    <div style={{animation:'fadeInUp 0.5s ease both'}}>
      <SectionHeader zone="03" title="Research Labs" sub="AUTONOMOUS SYSTEMS & SIMULATIONS"/>
      <div style={{display:'flex',gap:6,marginBottom:12}}>
        {items.map((_,i)=><button key={i} onClick={()=>setA(i)} style={{padding:'5px 14px',borderRadius:99,border:`1px solid ${a===i?'var(--border-active)':'var(--border)'}`,background:a===i?'var(--cyan-dim)':'transparent',color:a===i?'var(--cyan)':'var(--text-3)',fontFamily:'var(--font-mono)',fontSize:'0.52rem',cursor:'pointer',transition:'all 0.2s'}}>0{i+1}</button>)}
      </div>
      <div style={{background:'var(--glass)',border:'1px solid var(--border)',borderRadius:10,padding:'14px 16px',animation:'fadeIn 0.3s ease'}}>
        <p style={{fontFamily:'var(--font-mono)',fontSize:'0.48rem',letterSpacing:'0.18em',color:'var(--cyan)',marginBottom:6}}>{c.tag}</p>
        <h3 style={{fontFamily:'var(--font-body)',fontWeight:600,fontSize:'0.88rem',color:'var(--text)',marginBottom:8}}>{c.t}</h3>
        <p style={{fontFamily:'var(--font-body)',fontSize:'0.75rem',color:'var(--text-2)',lineHeight:1.75,marginBottom:12}}>{c.d}</p>
        <div style={{display:'flex',flexWrap:'wrap',gap:5}}>{c.tech.map(t=><span key={t} className="chip">{t}</span>)}</div>
      </div>
    </div>
  )
}

function ProjContent() {
  const projs=[{t:'C-V2X Digital Twin Framework',c:'AV · NextG · 5G',m:'67% collision risk reduction',s:'Active'},{t:'Autonomous Swarm Navigation',c:'Swarm · UAV · MANET',m:'94% detection accuracy',s:'Complete'},{t:'NextG Teleoperation System',c:'Teleop · 5G · Haptics',m:'Safe at 150ms latency',s:'Active'},{t:'Multi-Modal SLAM Pipeline',c:'Navigation · Sensor Fusion',m:'<5cm localization error',s:'Complete'},{t:'Autonomous Intersection Manager',c:'Traffic · CV2X · Edge',m:'40% throughput increase',s:'Active'}]
  return (
    <div style={{animation:'fadeInUp 0.5s ease both'}}>
      <SectionHeader zone="04" title="Projects" sub="REAL-WORLD ROBOTICS & SOFTWARE SOLUTIONS"/>
      {projs.map((p,i)=>(
        <div key={i} style={{background:'var(--glass)',border:'1px solid var(--border)',borderLeft:`3px solid ${p.s==='Active'?'var(--cyan)':'var(--text-3)'}`,borderRadius:10,padding:'10px 14px',marginBottom:7}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
            <p style={{fontFamily:'var(--font-body)',fontWeight:600,fontSize:'0.8rem',color:'var(--text)',lineHeight:1.3}}>{p.t}</p>
            <span style={{fontFamily:'var(--font-mono)',fontSize:'0.46rem',color:p.s==='Active'?'var(--cyan)':'var(--text-3)',padding:'2px 8px',border:`1px solid ${p.s==='Active'?'var(--border-active)':'var(--border)'}`,borderRadius:99,flexShrink:0,background:p.s==='Active'?'var(--cyan-dim)':'transparent'}}>{p.s}</span>
          </div>
          <p style={{fontFamily:'var(--font-mono)',fontSize:'0.52rem',color:'var(--text-3)',marginTop:3}}>{p.c}</p>
          <p style={{fontFamily:'var(--font-body)',fontSize:'0.68rem',color:'var(--text-2)',marginTop:4,fontStyle:'italic'}}>{p.m}</p>
        </div>
      ))}
    </div>
  )
}

function PubContent() {
  const pubs=[{v:'IEEE ITSC 2024',t:'Real-Time Digital Twin Synchronization for C-V2X AV Platoons',c:12},{v:'IEEE Trans. Robotics 2024',t:'Decentralized Swarm Coordination for Multi-UAV Detection Networks',c:8},{v:'ACM MobiCom 2023',t:'Latency-Tolerant Autonomous Vehicle Teleoperation over NextG Networks',c:15},{v:'IEEE VR Workshop 2023',t:'XR Simulation Environments for Autonomous Agent Training',c:5},{v:'IEEE ICRA 2022',t:'Sensor Fusion for Robust SLAM in GPS-Denied Environments',c:19}]
  return (
    <div style={{animation:'fadeInUp 0.5s ease both'}}>
      <SectionHeader zone="05" title="Publications" sub="PAPERS, JOURNALS & RESEARCH IMPACT"/>
      {pubs.map((p,i)=>(
        <div key={i} style={{background:'var(--glass)',border:'1px solid var(--border)',borderRadius:10,padding:'10px 14px',marginBottom:7}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:5}}>
            <span style={{fontFamily:'var(--font-mono)',fontSize:'0.5rem',letterSpacing:'0.08em',color:'var(--cyan)'}}>{p.v}</span>
            <span style={{fontFamily:'var(--font-mono)',fontSize:'0.52rem',color:'var(--text-3)'}}>↗ {p.c} citations</span>
          </div>
          <p style={{fontFamily:'var(--font-body)',fontSize:'0.78rem',fontWeight:500,color:'var(--text)',lineHeight:1.4}}>{p.t}</p>
        </div>
      ))}
    </div>
  )
}

function SkillContent() {
  const groups=[{l:'Robotics',c:'var(--cyan)',items:['ROS2','SLAM','Path Planning','Sensor Fusion','PX4','Control Theory','Motion Planning']},{l:'AI / ML',c:'var(--cyan)',items:['PyTorch','TensorFlow','CUDA','OpenCV','Deep Learning','YOLOv8','Transformers']},{l:'Simulation',c:'var(--warm)',items:['CARLA','Unreal Engine','Gazebo','SUMO','Unity','Blender','Omniverse']},{l:'Networks',c:'var(--warm)',items:['C-V2X','5G/NextG','MANET','Edge Computing','ROS2 DDS','DSRC']},{l:'Languages',c:'#8FD3FF',items:['Python','C++','MATLAB','JavaScript','ROS','SQL','Bash']},{l:'Tools',c:'#8FD3FF',items:['Git','Docker','Linux','RViz','Foxglove','Jupyter','CMake']}]
  return (
    <div style={{animation:'fadeInUp 0.5s ease both'}}>
      <SectionHeader zone="06" title="Skills Network" sub="TECHNICAL COMPETENCIES & EXPERTISE GRAPH"/>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
        {groups.map((g,i)=>(
          <div key={i} style={{background:'var(--glass)',border:'1px solid var(--border)',borderTop:`2px solid ${g.c}`,borderRadius:10,padding:'10px 12px'}}>
            <p style={{fontFamily:'var(--font-mono)',fontSize:'0.5rem',letterSpacing:'0.14em',color:g.c,marginBottom:8}}>{g.l.toUpperCase()}</p>
            {g.items.map(s=><p key={s} style={{fontFamily:'var(--font-body)',fontSize:'0.68rem',color:'var(--text-2)',marginBottom:3}}>· {s}</p>)}
          </div>
        ))}
      </div>
    </div>
  )
}

function ContactContent() {
  return (
    <div style={{animation:'fadeInUp 0.5s ease both',textAlign:'center',padding:'12px 0'}}>
      <SectionHeader zone="07" title="Future Lab" sub="VISION, GOALS & FUTURE INNOVATIONS"/>
      <p style={{fontFamily:'var(--font-body)',fontSize:'0.85rem',color:'var(--text-2)',lineHeight:1.75,marginBottom:20,maxWidth:380,margin:'0 auto 20px'}}>Open to research collaborations, industry partnerships, and opportunities in autonomous systems, robotics, and AI.</p>
      <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap',marginBottom:18}}>
        {[['LinkedIn ↗','https://linkedin.com/in/lalitaditya-divakarla'],['GitHub ↗','https://github.com/lalitaditya'],['Email ↗','mailto:divar012@umn.edu']].map(([l,h])=>(
          <a key={l} href={h} target="_blank" rel="noopener noreferrer" className="btn-cta" style={{textDecoration:'none',fontSize:'0.78rem',padding:'9px 20px'}}>{l}</a>
        ))}
      </div>
      <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'var(--glass)',border:'1px solid var(--border-active)',borderRadius:99,padding:'8px 18px'}}>
        <div style={{width:7,height:7,borderRadius:'50%',background:'var(--cyan)',boxShadow:'0 0 6px var(--cyan-glow)'}}/>
        <span style={{fontFamily:'var(--font-mono)',fontSize:'0.55rem',letterSpacing:'0.12em',color:'var(--text-2)'}}>AVAILABLE FOR COLLABORATION</span>
      </div>
    </div>
  )
}

function SectionHeader({zone,title,sub}) {
  return (
    <div style={{marginBottom:14}}>
      <p style={{fontFamily:'var(--font-mono)',fontSize:'0.5rem',letterSpacing:'0.22em',color:'var(--cyan)',marginBottom:4}}>ZONE {zone} · {sub}</p>
      <h2 style={{fontFamily:'var(--font-display)',fontWeight:300,fontSize:'1.8rem',letterSpacing:'-0.03em',color:'var(--text)',marginBottom:0}}>{title}</h2>
    </div>
  )
}


