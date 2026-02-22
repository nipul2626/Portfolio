import { ParallaxBackground } from '@/components/ParallaxBackground'
import { ScrollProgress } from '@/components/ScrollProgress'
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
