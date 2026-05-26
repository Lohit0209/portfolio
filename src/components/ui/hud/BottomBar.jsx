'use client'
import { useJourneyStore } from '@/store/journeyStore'

export default function BottomBar({ navMode }) {
  const sp = useJourneyStore(s => s.scrollProgress)
  return (
    <div style={{ background:'var(--glass)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', borderTop:'1px solid var(--border)', height:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', gap:16 }}>
      {/* Journey progress */}
      <div style={{ display:'flex', alignItems:'center', gap:10, flex:1 }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.5rem', letterSpacing:'0.18em', color:'var(--text-3)', flexShrink:0 }}>JOURNEY</span>
        <div style={{ flex:1, maxWidth:280, height:2, background:'rgba(255,255,255,0.06)', borderRadius:99, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${sp*100}%`, background:'linear-gradient(90deg,var(--cyan),var(--cyan-bright))', borderRadius:99, transition:'width 0.4s ease' }}/>
        </div>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.5rem', color:'var(--cyan)', flexShrink:0 }}>{Math.round(sp*100)}%</span>
      </div>

      {/* Scroll hint */}
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
        <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
          <rect x="1" y="1" width="10" height="16" rx="5" stroke="rgba(89,195,255,0.4)" strokeWidth="1.2" fill="none"/>
          <rect x="5.5" y="3.5" width="1" height="4" rx="0.5" fill="rgba(89,195,255,0.6)"/>
        </svg>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.46rem', letterSpacing:'0.2em', color:'var(--text-3)', textTransform:'uppercase' }}>
          {navMode === 'auto' ? 'AUTO NAVIGATING' : 'SCROLL TO NAVIGATE'}
        </span>
      </div>

      {/* Status indicators */}
      <div style={{ display:'flex', alignItems:'center', gap:14 }}>
        {[['LiDAR','online'],['Vision','online'],['IMU','online']].map(([k,st])=>(
          <div key={k} style={{ display:'flex', alignItems:'center', gap:5 }}>
            <div style={{ width:5, height:5, borderRadius:'50%', background:st==='online'?'var(--green)':'var(--rose)' }}/>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.48rem', color:'var(--text-3)' }}>{k}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
