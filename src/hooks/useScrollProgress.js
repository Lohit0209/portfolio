'use client'
import { useEffect } from 'react'
import { useJourneyStore } from '@/store/journeyStore'

// This hook is kept for backward compat but scroll is now handled in page.js
export default function useScrollProgress(ref) {
  const setScrollProgress = useJourneyStore(s => s.setScrollProgress)
  useEffect(() => {
    if (!ref?.current) return
    const el = ref.current
    const onScroll = () => {
      const max = el.scrollHeight - el.clientHeight
      if (max > 0) setScrollProgress(el.scrollTop / max)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [setScrollProgress])
}
