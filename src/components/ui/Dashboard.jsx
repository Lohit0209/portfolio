'use client'
import { useState } from 'react'
import { useJourneyStore, SECTIONS } from '@/store/journeyStore'
import TopBar from './hud/TopBar'
import LeftNav from './hud/LeftNav'
import RightPanel from './hud/RightPanel'
import CenterContent from './hud/CenterContent'
import BottomCards from './hud/BottomCards'
import BottomBar from './hud/BottomBar'

export default function Dashboard({ navMode, onSwitchMode, onGoSection }) {
  const booted = useJourneyStore(s => s.bootComplete)
  if (!booted) return null
  return (
    <div style={{
      position:'fixed', inset:0, zIndex:50,
      display:'grid',
      gridTemplateRows:'52px 1fr auto 52px',
      gridTemplateColumns:'200px 1fr 240px',
      pointerEvents:'none',
    }}>
      {/* TOP BAR */}
      <div style={{gridColumn:'1/-1', gridRow:1, pointerEvents:'auto'}}>
        <TopBar navMode={navMode} onSwitchMode={onSwitchMode} />
      </div>
      {/* LEFT NAV */}
      <div style={{gridColumn:1, gridRow:'2/4', pointerEvents:'auto', paddingTop:8}}>
        <LeftNav onGoSection={onGoSection} />
      </div>
      {/* CENTER */}
      <div style={{gridColumn:2, gridRow:2, pointerEvents:'auto', overflow:'hidden'}}>
        <CenterContent />
      </div>
      {/* RIGHT PANEL */}
      <div style={{gridColumn:3, gridRow:'2/4', pointerEvents:'auto', padding:'8px 16px 8px 0'}}>
        <RightPanel />
      </div>
      {/* BOTTOM CARDS */}
      <div style={{gridColumn:'1/-1', gridRow:3, pointerEvents:'auto'}}>
        <BottomCards onGoSection={onGoSection} />
      </div>
      {/* BOTTOM BAR */}
      <div style={{gridColumn:'1/-1', gridRow:4, pointerEvents:'auto'}}>
        <BottomBar navMode={navMode} />
      </div>
    </div>
  )
}
