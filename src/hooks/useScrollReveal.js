'use client'
import { useEffect } from 'react'

/**
 * Adds scroll-triggered reveal animations to all `.animate-fade-in-up`
 * and `.animate-fade-in` elements that have NOT yet been seen.
 * Elements start invisible and fade+slide in when they enter the viewport.
 */
export default function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-fade-in-up, .animate-fade-in')

    // Initially hide all (except hero which should play immediately)
    elements.forEach(el => {
      const section = el.closest('section')
      if (section?.id === 'hero') return
      el.style.opacity = '0'
      el.style.animationPlayState = 'paused'
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target
            el.style.opacity = ''
            el.style.animationPlayState = 'running'
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    elements.forEach(el => {
      const section = el.closest('section')
      if (section?.id === 'hero') return
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])
}
