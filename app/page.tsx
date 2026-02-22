import { ParallaxBackground } from '@/components/ParallaxBackground'
import { ScrollProgress } from '@/components/ScrollProgress'
import { CursorTrail } from '@/components/CursorTrail'
import { CosmicElements } from '@/components/CosmicElements'
import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { AboutSection } from '@/components/AboutSection'
import { SkillsSection } from '@/components/SkillsSection'
import { ProjectsSection } from '@/components/ProjectsSection'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Cursor Trail Effect */}
      <CursorTrail />

      {/* Cosmic Elements - Shooting Stars & Planets */}
      <CosmicElements />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Parallax Background - Fixed */}
      <ParallaxBackground />

      {/* Navigation Header */}
      <Header />

      {/* Page Content */}
      <div className="relative z-0">
        {/* Hero */}
        <HeroSection />

        {/* About */}
        <AboutSection />

        {/* Skills */}
        <SkillsSection />

        {/* Projects */}
        <ProjectsSection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Contact */}
        <ContactSection />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  )
}
