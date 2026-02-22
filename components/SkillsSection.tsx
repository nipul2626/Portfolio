'use client'

import { useEffect, useRef } from 'react'

interface Skill {
  name: string
  proficiency: number
  category: string
  icon: string
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', proficiency: 95, category: 'Frontend', icon: '⚛️' },
  { name: 'Next.js', proficiency: 94, category: 'Frontend', icon: '▲' },
  { name: 'TypeScript', proficiency: 92, category: 'Frontend', icon: 'TS' },
  { name: 'Tailwind CSS', proficiency: 96, category: 'Frontend', icon: '🎨' },
  { name: 'Framer Motion', proficiency: 88, category: 'Frontend', icon: '✨' },
  
  // Backend
  { name: 'Node.js', proficiency: 93, category: 'Backend', icon: '⚙️' },
  { name: 'Express', proficiency: 91, category: 'Backend', icon: '🚀' },
  { name: 'PostgreSQL', proficiency: 89, category: 'Backend', icon: '🗄️' },
  { name: 'MongoDB', proficiency: 87, category: 'Backend', icon: '📊' },
  { name: 'Firebase', proficiency: 85, category: 'Backend', icon: '🔥' },
  
  // DevOps & Tools
  { name: 'Git', proficiency: 94, category: 'Tools', icon: '📦' },
  { name: 'Docker', proficiency: 82, category: 'Tools', icon: '🐳' },
  { name: 'AWS', proficiency: 80, category: 'Tools', icon: '☁️' },
  { name: 'GraphQL', proficiency: 84, category: 'Tools', icon: 'GQL' },
  { name: 'REST APIs', proficiency: 95, category: 'Tools', icon: 'API' },
]

export const SkillsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.skill-bar')
            bars.forEach((bar: Element, index: number) => {
              setTimeout(() => {
                bar.classList.add('animate-in')
              }, index * 50)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-white mb-4 text-balance">
            Skills & Expertise
          </h2>
          <p className="text-purple-300 text-lg md:text-xl max-w-2xl">
            A comprehensive arsenal of technologies and expertise honed through years of development experience.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="space-y-8">
          {/* Frontend Skills */}
          <div className="glass rounded-2xl p-8 md:p-12 border border-blue-500/30">
            <h3 className="text-2xl font-bold font-serif text-blue-300 mb-8 flex items-center gap-3">
              <span className="w-3 h-3 bg-blue-500 rounded-full" />
              Frontend Development
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills
                .filter((skill) => skill.category === 'Frontend')
                .map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 font-medium flex items-center gap-2">
                        <span className="text-lg">{skill.icon}</span>
                        {skill.name}
                      </span>
                      <span className="text-purple-400 text-sm font-mono">{skill.proficiency}%</span>
                    </div>
                    <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div
                        className="skill-bar h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-700"
                        style={{
                          width: `${skill.proficiency}%`,
                          transitionDelay: `${index * 50}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Backend Skills */}
          <div className="glass rounded-2xl p-8 md:p-12 border border-pink-500/30">
            <h3 className="text-2xl font-bold font-serif text-pink-300 mb-8 flex items-center gap-3">
              <span className="w-3 h-3 bg-pink-500 rounded-full" />
              Backend & Databases
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills
                .filter((skill) => skill.category === 'Backend')
                .map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 font-medium flex items-center gap-2">
                        <span className="text-lg">{skill.icon}</span>
                        {skill.name}
                      </span>
                      <span className="text-purple-400 text-sm font-mono">{skill.proficiency}%</span>
                    </div>
                    <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div
                        className="skill-bar h-full bg-gradient-to-r from-pink-500 to-orange-500 rounded-full transition-all duration-700"
                        style={{
                          width: `${skill.proficiency}%`,
                          transitionDelay: `${index * 50}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Tools & Platforms */}
          <div className="glass rounded-2xl p-8 md:p-12 border border-green-500/30">
            <h3 className="text-2xl font-bold font-serif text-green-300 mb-8 flex items-center gap-3">
              <span className="w-3 h-3 bg-green-500 rounded-full" />
              Tools & Platforms
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills
                .filter((skill) => skill.category === 'Tools')
                .map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 font-medium flex items-center gap-2">
                        <span className="text-lg">{skill.icon}</span>
                        {skill.name}
                      </span>
                      <span className="text-purple-400 text-sm font-mono">{skill.proficiency}%</span>
                    </div>
                    <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div
                        className="skill-bar h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full transition-all duration-700"
                        style={{
                          width: `${skill.proficiency}%`,
                          transitionDelay: `${index * 50}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
