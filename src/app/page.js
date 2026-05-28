'use client'
import { useState, useEffect } from 'react'
import Preloader from '@/components/Preloader'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import EducationSection from '@/components/EducationSection'
import ExperienceSection from '@/components/ExperienceSection'
import ProjectsSection from '@/components/ProjectsSection'
import PublicationsSection from '@/components/PublicationsSection'
import SkillsSection from '@/components/SkillsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    if (loading) return

    const sections = document.querySelectorAll('section[id]')
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [loading])

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div style={{ 
        opacity: loading ? 0 : 1, 
        transition: 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
        visibility: loading ? 'hidden' : 'visible'
      }}>
        <Navigation activeSection={activeSection} />
        <main>
          <HeroSection />
          <EducationSection />
          <ExperienceSection />
          <ProjectsSection />
          <PublicationsSection />
          <SkillsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  )
}
