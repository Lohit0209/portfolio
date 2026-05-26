'use client'
import { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useJourneyStore, SECTIONS } from '@/store/journeyStore'
import BootSequence from '@/components/ui/BootSequence'
import Dashboard from '@/components/ui/Dashboard'
import CustomCursor from '@/components/CustomCursor'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false, loading: () => null })

export default function Home() {
  const [phase, setPhase] = useState('boot')
  const [navMode, setNavMode] = useState('manual')
  const autoRef = useRef(null)

  const setBootComplete = useJourneyStore(s => s.setBootComplete)
  const goToSection    = useJourneyStore(s => s.goToSection)
  const setScrollProgress = useJourneyStore(s => s.setScrollProgress)
  const setCursorNDC   = useJourneyStore(s => s.setCursorNDC)

  useEffect(() => {
    const onMove = e => setCursorNDC(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    )
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [setCursorNDC])

  const handleBoot = () => setPhase('mode')

  const startJourney = (mode) => {
    setNavMode(mode)
    setBootComplete()
    setPhase('journey')
    if (mode === 'auto') startAuto()
  }

  const startAuto = () => {
    cancelAuto()
    const DWELL = 7000
    let idx = 0
    const next = () => {
      if (idx >= SECTIONS.length) { idx = 0 }
      const s = SECTIONS[idx]
      setScrollProgress(s.progress)
      idx++
      autoRef.current = setTimeout(next, DWELL)
    }
    autoRef.current = setTimeout(next, 800)
  }

  const cancelAuto = () => { if (autoRef.current) clearTimeout(autoRef.current) }

  const switchMode = (mode) => {
    cancelAuto()
    setNavMode(mode)
    if (mode === 'auto') startAuto()
  }

  useEffect(() => () => cancelAuto(), [])

  // Manual scroll → progress
  useEffect(() => {
    if (phase !== 'journey' || navMode !== 'manual') return
    const el = document.getElementById('scroll-proxy')
    if (!el) return
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight
      if (max > 0) setScrollProgress(el.scrollTop / max)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [phase, navMode, setScrollProgress])

  return (
    <>
      <Scene />
      {phase === 'boot' && <BootSequence onComplete={handleBoot} />}
      {phase === 'mode' && <ModeScreen onSelect={startJourney} />}
      {phase === 'journey' && (
        <>
          <CustomCursor />
          <Dashboard navMode={navMode} onSwitchMode={switchMode} onGoSection={goToSection} />
          {navMode === 'manual' && (
            <div id="scroll-proxy" style={{ position:'fixed', inset:0, zIndex:0, overflowY:'scroll', pointerEvents:'none' }}>
              <div style={{ height:'800vh' }} />
            </div>
          )}
        </>
      )}
    </>
  )
}

function ModeScreen({ onSelect }) {
  const [vis, setVis] = useState(false)
  useEffect(() => { setTimeout(() => setVis(true), 80) }, [])
  const card = (mode, icon, title, sub) => (
    <button onClick={() => onSelect(mode)} style={{
      display:'flex', flexDirection:'column', alignItems:'center', gap:10,
      padding:'28px 36px', minWidth:190, background:'var(--glass)',
      border:'1px solid var(--border)', borderRadius:16, cursor:'pointer',
      transition:'all 0.3s ease', color:'var(--text)',
    }}
    onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--border-active)';e.currentTarget.style.background='var(--glass-light)'}}
    onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.background='var(--glass)'}}>
      <span style={{fontSize:'2rem'}}>{icon}</span>
      <span style={{fontFamily:'var(--font-body)',fontWeight:600,fontSize:'0.92rem'}}>{title}</span>
      <span style={{fontFamily:'var(--font-mono)',fontSize:'0.58rem',color:'var(--text-2)'}}>{sub}</span>
    </button>
  )
  return (
    <div style={{
      position:'fixed', inset:0, zIndex:9998,
      background:'linear-gradient(160deg,var(--bg-0),var(--bg-1))',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      opacity: vis ? 1 : 0, transition:'opacity 0.5s ease',
    }}>
      <div style={{position:'absolute',inset:0,opacity:0.03,backgroundImage:'linear-gradient(rgba(89,195,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(89,195,255,1) 1px,transparent 1px)',backgroundSize:'40px 40px'}}/>
      <div style={{position:'relative',zIndex:1,textAlign:'center'}}>
        <p style={{fontFamily:'var(--font-mono)',fontSize:'0.55rem',letterSpacing:'0.28em',color:'var(--text-3)',marginBottom:18}}>SELECT NAVIGATION MODE</p>
        <h1 style={{fontFamily:'var(--font-display)',fontWeight:200,fontSize:'clamp(2.8rem,5vw,5rem)',letterSpacing:'-0.04em',color:'var(--text)',lineHeight:1.0,marginBottom:4}}>LALITADITYA</h1>
        <h1 style={{fontFamily:'var(--font-display)',fontWeight:200,fontSize:'clamp(2.8rem,5vw,5rem)',letterSpacing:'-0.04em',color:'var(--cyan)',lineHeight:1.0,marginBottom:14}}>DIVAKARLA</h1>
        <p style={{fontFamily:'var(--font-mono)',fontSize:'0.62rem',letterSpacing:'0.15em',color:'var(--text-3)',marginBottom:48}}>AUTONOMOUS SYSTEMS · ROBOTICS · DIGITAL TWINS</p>
        <div style={{display:'flex',gap:16,justifyContent:'center'}}>
          {card('auto','🤖','Autonomous','Sit back & enjoy the ride')}
          {card('manual','🖱️','Manual','Scroll to explore freely')}
        </div>
        <p style={{fontFamily:'var(--font-body)',fontSize:'0.72rem',color:'var(--text-3)',marginTop:28}}>Your robot companion is ready to guide you</p>
      </div>
    </div>
  )
}
