'use client'
import { create } from 'zustand'

export const ROBOT_STATES = {
  BOOTING:    'booting',
  NAVIGATING: 'navigating',
  SCANNING:   'scanning',
  DOCKING:    'docking',
  RETRIEVING: 'retrieving',
  CONNECTING: 'connecting',
  STANDBY:    'standby',
}

export const SECTIONS = [
  {
    id: 'boot',
    num: '00',
    label: 'Boot Sequence',
    sub: 'System Initialization',
    icon: '⚡',
    progress: 0,
    mission: 'Initializing all autonomous systems and mapping the facility.',
    objective: 'Initialize all systems and begin autonomous exploration.',
    robotState: ROBOT_STATES.BOOTING,
    color: '#59C3FF',
  },
  {
    id: 'hero',
    num: '01',
    label: 'Journey Begins',
    sub: 'Autonomous Exploration',
    icon: '🧭',
    progress: 0.08,
    mission: 'Activating navigation systems and mapping the facility.',
    objective: 'Initialize all systems and begin autonomous exploration.',
    robotState: ROBOT_STATES.NAVIGATING,
    color: '#59C3FF',
  },
  {
    id: 'education',
    num: '02',
    label: 'Education',
    sub: 'Academic Foundations',
    icon: '🎓',
    progress: 0.18,
    mission: 'Retrieving academic records from holographic archive.',
    objective: 'Access education database and retrieve complete academic history.',
    robotState: ROBOT_STATES.RETRIEVING,
    color: '#59C3FF',
  },
  {
    id: 'research',
    num: '03',
    label: 'Research Labs',
    sub: 'Systems & Simulations',
    icon: '🔬',
    progress: 0.32,
    mission: 'Navigating to active simulation chambers.',
    objective: 'Investigate autonomous vehicle simulations and AI systems.',
    robotState: ROBOT_STATES.SCANNING,
    color: '#59C3FF',
  },
  {
    id: 'projects',
    num: '04',
    label: 'Projects',
    sub: 'Engineering Solutions',
    icon: '⚙️',
    progress: 0.48,
    mission: 'Docking into server terminal to retrieve architectures.',
    objective: 'Access all engineering project nodes and download schematics.',
    robotState: ROBOT_STATES.DOCKING,
    color: '#8FD3FF',
  },
  {
    id: 'publications',
    num: '05',
    label: 'Publications',
    sub: 'Research Contributions',
    icon: '📄',
    progress: 0.63,
    mission: 'Activating holographic research archive and citation network.',
    objective: 'Scan published research papers and extract citations.',
    robotState: ROBOT_STATES.RETRIEVING,
    color: '#8FD3FF',
  },
  {
    id: 'skills',
    num: '06',
    label: 'Skills Network',
    sub: 'Technical Expertise',
    icon: '🧠',
    progress: 0.78,
    mission: 'Connecting into neural capability network.',
    objective: 'Map all technical competencies and framework connections.',
    robotState: ROBOT_STATES.CONNECTING,
    color: '#FFD6A5',
  },
  {
    id: 'contact',
    num: '07',
    label: 'Future Lab',
    sub: "Let's Build Tomorrow",
    icon: '🌐',
    progress: 0.94,
    mission: 'Reaching final observation platform. Entering standby.',
    objective: 'Survey the future vision and prepare collaboration protocols.',
    robotState: ROBOT_STATES.STANDBY,
    color: '#FFD6A5',
  },
]

export const ZONES = SECTIONS.reduce((acc, s, i) => {
  const next = SECTIONS[i + 1]
  acc[s.id.toUpperCase()] = {
    id: s.id, label: s.label,
    start: s.progress,
    end: next ? next.progress - 0.01 : 1.0,
  }
  return acc
}, {})

export const useJourneyStore = create((set, get) => ({
  scrollProgress: 0,
  activeSection: 'boot',
  robotState: ROBOT_STATES.BOOTING,
  currentMission: SECTIONS[0].mission,
  currentObjective: SECTIONS[0].objective,
  bootComplete: false,
  navMode: 'manual',   // 'manual' | 'auto'
  cursorNDC: { x: 0, y: 0 },

  setNavMode: (mode) => set({ navMode: mode }),

  setScrollProgress: (p) => {
    const section = SECTIONS.reduce((best, s) =>
      Math.abs(p - s.progress) < Math.abs(p - best.progress) ? s : best, SECTIONS[0])
    set({
      scrollProgress: p,
      activeSection: section.id,
      robotState: section.robotState,
      currentMission: section.mission,
      currentObjective: section.objective,
      activeZone: section.id,
    })
  },

  goToSection: (id) => {
    const s = SECTIONS.find(x => x.id === id)
    if (!s) return
    set({
      scrollProgress: s.progress,
      activeSection: s.id,
      robotState: s.robotState,
      currentMission: s.mission,
      currentObjective: s.objective,
      activeZone: s.id,
    })
  },

  setBootComplete: () => set({ bootComplete: true, activeSection: 'hero', activeZone: 'hero' }),
  setCursorNDC: (x, y) => set({ cursorNDC: { x, y } }),
}))
