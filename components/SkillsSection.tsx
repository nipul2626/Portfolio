'use client'

import { useEffect, useRef, useState } from 'react'

interface Skill {
  name: string
  category: string
  color: string
  size: number
  orbitRadius: number
  orbitSpeed: number
  startAngle: number
}

const skills: Skill[] = [
  // Frontend Development (Blue - #3b82f6)
  { name: 'HTML5', category: 'Frontend', color: '#3b82f6', size: 60, orbitRadius: 180, orbitSpeed: 0.8, startAngle: 0 },
  { name: 'CSS3', category: 'Frontend', color: '#3b82f6', size: 58, orbitRadius: 190, orbitSpeed: 0.75, startAngle: 45 },
  { name: 'JavaScript', category: 'Frontend', color: '#3b82f6', size: 70, orbitRadius: 200, orbitSpeed: 0.7, startAngle: 90 },
  { name: 'TypeScript', category: 'Frontend', color: '#3b82f6', size: 68, orbitRadius: 210, orbitSpeed: 0.65, startAngle: 135 },
  { name: 'Tailwind CSS', category: 'Frontend', color: '#3b82f6', size: 65, orbitRadius: 220, orbitSpeed: 0.6, startAngle: 180 },
  { name: 'React.js', category: 'Frontend', color: '#3b82f6', size: 72, orbitRadius: 230, orbitSpeed: 0.55, startAngle: 225 },
  { name: 'Next.js', category: 'Frontend', color: '#3b82f6', size: 70, orbitRadius: 240, orbitSpeed: 0.5, startAngle: 270 },
  { name: 'Framer Motion', category: 'Frontend', color: '#3b82f6', size: 55, orbitRadius: 195, orbitSpeed: 0.72, startAngle: 315 },
  { name: 'Responsive Design', category: 'Frontend', color: '#3b82f6', size: 58, orbitRadius: 205, orbitSpeed: 0.68, startAngle: 30 },
  { name: 'Material UI', category: 'Frontend', color: '#3b82f6', size: 54, orbitRadius: 215, orbitSpeed: 0.62, startAngle: 60 },
  { name: 'Android XML', category: 'Frontend', color: '#3b82f6', size: 52, orbitRadius: 225, orbitSpeed: 0.58, startAngle: 120 },

  // Mobile Development (Orange - #fb923c)
  { name: 'Kotlin', category: 'Mobile', color: '#fb923c', size: 68, orbitRadius: 250, orbitSpeed: 0.48, startAngle: 15 },
  { name: 'Android Studio', category: 'Mobile', color: '#fb923c', size: 70, orbitRadius: 260, orbitSpeed: 0.45, startAngle: 75 },
  { name: 'XML UI Design', category: 'Mobile', color: '#fb923c', size: 58, orbitRadius: 270, orbitSpeed: 0.42, startAngle: 135 },
  { name: 'Jetpack Components', category: 'Mobile', color: '#fb923c', size: 62, orbitRadius: 255, orbitSpeed: 0.47, startAngle: 195 },
  { name: 'Intent & Navigation', category: 'Mobile', color: '#fb923c', size: 56, orbitRadius: 265, orbitSpeed: 0.44, startAngle: 255 },
  { name: 'RecyclerView', category: 'Mobile', color: '#fb923c', size: 60, orbitRadius: 275, orbitSpeed: 0.4, startAngle: 315 },
  { name: 'Custom UI Components', category: 'Mobile', color: '#fb923c', size: 58, orbitRadius: 245, orbitSpeed: 0.49, startAngle: 45 },
  { name: 'Form Validation', category: 'Mobile', color: '#fb923c', size: 54, orbitRadius: 268, orbitSpeed: 0.43, startAngle: 105 },
  { name: 'SQLite Local', category: 'Mobile', color: '#fb923c', size: 56, orbitRadius: 258, orbitSpeed: 0.46, startAngle: 165 },

  // Backend Development (Purple - #a855f7)
  { name: 'Node.js', category: 'Backend', color: '#a855f7', size: 70, orbitRadius: 285, orbitSpeed: 0.38, startAngle: 0 },
  { name: 'REST API', category: 'Backend', color: '#a855f7', size: 68, orbitRadius: 295, orbitSpeed: 0.36, startAngle: 60 },
  { name: 'PHP', category: 'Backend', color: '#a855f7', size: 64, orbitRadius: 305, orbitSpeed: 0.34, startAngle: 120 },
  { name: 'JSON Handling', category: 'Backend', color: '#a855f7', size: 58, orbitRadius: 290, orbitSpeed: 0.37, startAngle: 180 },
  { name: 'Authentication', category: 'Backend', color: '#a855f7', size: 66, orbitRadius: 300, orbitSpeed: 0.35, startAngle: 240 },
  { name: 'Express', category: 'Backend', color: '#a855f7', size: 68, orbitRadius: 310, orbitSpeed: 0.33, startAngle: 300 },
  { name: 'Spring Boot', category: 'Backend', color: '#a855f7', size: 64, orbitRadius: 295, orbitSpeed: 0.36, startAngle: 30 },

  // Databases (Green - #22c55e)
  { name: 'SQLite', category: 'Databases', color: '#22c55e', size: 62, orbitRadius: 320, orbitSpeed: 0.32, startAngle: 90 },
  { name: 'MySQL', category: 'Databases', color: '#22c55e', size: 66, orbitRadius: 330, orbitSpeed: 0.3, startAngle: 180 },
  { name: 'Firebase', category: 'Databases', color: '#22c55e', size: 68, orbitRadius: 325, orbitSpeed: 0.31, startAngle: 270 },
  { name: 'MongoDB', category: 'Databases', color: '#22c55e', size: 64, orbitRadius: 335, orbitSpeed: 0.29, startAngle: 0 },

  // Tools & Platforms (Yellow - #facc15)
  { name: 'Git', category: 'Tools', color: '#facc15', size: 66, orbitRadius: 345, orbitSpeed: 0.28, startAngle: 45 },
  { name: 'GitHub', category: 'Tools', color: '#facc15', size: 68, orbitRadius: 355, orbitSpeed: 0.27, startAngle: 135 },
  { name: 'Vercel', category: 'Tools', color: '#facc15', size: 62, orbitRadius: 350, orbitSpeed: 0.275, startAngle: 225 },
  { name: 'VS Code', category: 'Tools', color: '#facc15', size: 64, orbitRadius: 340, orbitSpeed: 0.285, startAngle: 315 },
  { name: 'Postman', category: 'Tools', color: '#facc15', size: 58, orbitRadius: 360, orbitSpeed: 0.26, startAngle: 90 },
  { name: 'Figma', category: 'Tools', color: '#facc15', size: 60, orbitRadius: 348, orbitSpeed: 0.28, startAngle: 180 },
  { name: 'Canva', category: 'Tools', color: '#facc15', size: 56, orbitRadius: 342, orbitSpeed: 0.285, startAngle: 270 },
]

export const SkillsSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const animationFrameRef = useRef<number>()
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = Math.min(800, rect.width)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const planetRadius = 60

    const isMobile = window.innerWidth < 768
    const visibleSkills = isMobile ? skills.slice(0, 20) : skills

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      timeRef.current += 0.005

      // Draw central planet
      const planetGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, planetRadius)
      planetGradient.addColorStop(0, '#a855f7')
      planetGradient.addColorStop(0.5, '#7c3aed')
      planetGradient.addColorStop(1, '#5b21b6')
      
      ctx.shadowBlur = 30
      ctx.shadowColor = '#a855f7'
      ctx.fillStyle = planetGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, planetRadius, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0

      // Draw orbital paths (faint)
      const uniqueOrbits = [...new Set(visibleSkills.map(s => s.orbitRadius))]
      uniqueOrbits.forEach(radius => {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius * (isMobile ? 0.6 : 1), 0, Math.PI * 2)
        ctx.stroke()
      })

      // Draw asteroids
      visibleSkills.forEach(skill => {
        const angle = skill.startAngle + timeRef.current * skill.orbitSpeed
        const scaledRadius = skill.orbitRadius * (isMobile ? 0.6 : 1)
        const x = centerX + Math.cos(angle) * scaledRadius
        const y = centerY + Math.sin(angle) * scaledRadius
        const asteroidSize = skill.size * (isMobile ? 0.7 : 1) / 2

        const isHovered = hoveredSkill === skill.name

        // Asteroid glow
        if (isHovered) {
          ctx.shadowBlur = 25
          ctx.shadowColor = skill.color
        } else {
          ctx.shadowBlur = 12
          ctx.shadowColor = skill.color
        }

        // Asteroid body (glassmorphic circle)
        const asteroidGradient = ctx.createRadialGradient(x, y, 0, x, y, asteroidSize)
        asteroidGradient.addColorStop(0, `${skill.color}44`)
        asteroidGradient.addColorStop(0.7, `${skill.color}22`)
        asteroidGradient.addColorStop(1, `${skill.color}11`)
        
        ctx.fillStyle = asteroidGradient
        ctx.beginPath()
        ctx.arc(x, y, asteroidSize, 0, Math.PI * 2)
        ctx.fill()

        // Asteroid border
        ctx.strokeStyle = `${skill.color}88`
        ctx.lineWidth = isHovered ? 3 : 2
        ctx.beginPath()
        ctx.arc(x, y, asteroidSize, 0, Math.PI * 2)
        ctx.stroke()
        ctx.shadowBlur = 0

        // Skill name text
        if (!isMobile || isHovered) {
          ctx.fillStyle = isHovered ? '#ffffff' : '#e0e0e0'
          ctx.font = `${isHovered ? 13 : 11}px "Rajdhani", sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(skill.name, x, y)
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      let foundSkill: string | null = null

      visibleSkills.forEach(skill => {
        const angle = skill.startAngle + timeRef.current * skill.orbitSpeed
        const scaledRadius = skill.orbitRadius * (isMobile ? 0.6 : 1)
        const x = centerX + Math.cos(angle) * scaledRadius
        const y = centerY + Math.sin(angle) * scaledRadius
        const asteroidSize = skill.size * (isMobile ? 0.7 : 1) / 2

        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2)
        if (distance < asteroidSize) {
          foundSkill = skill.name
        }
      })

      setHoveredSkill(foundSkill)
      canvas.style.cursor = foundSkill ? 'pointer' : 'default'
    }

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      visibleSkills.forEach(skill => {
        const angle = skill.startAngle + timeRef.current * skill.orbitSpeed
        const scaledRadius = skill.orbitRadius * (isMobile ? 0.6 : 1)
        const x = centerX + Math.cos(angle) * scaledRadius
        const y = centerY + Math.sin(angle) * scaledRadius
        const asteroidSize = skill.size * (isMobile ? 0.7 : 1) / 2

        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2)
        if (distance < asteroidSize) {
          setSelectedSkill(skill)
        }
      })
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('click', handleClick)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [hoveredSkill])

  return (
    <section className="relative py-20 md:py-32 overflow-hidden" id="skills">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-white mb-4 text-balance">
            Asteroid Belt of Skills
          </h2>
          <p className="text-purple-300 text-lg md:text-xl max-w-2xl mx-auto">
            Navigate through my technical universe. Each asteroid represents a skill orbiting in the cosmic expanse of knowledge.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3b82f6', boxShadow: '0 0 10px #3b82f6' }} />
            <span className="text-sm text-gray-300">Frontend</span>
          </div>
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#fb923c', boxShadow: '0 0 10px #fb923c' }} />
            <span className="text-sm text-gray-300">Mobile</span>
          </div>
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#a855f7', boxShadow: '0 0 10px #a855f7' }} />
            <span className="text-sm text-gray-300">Backend</span>
          </div>
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
            <span className="text-sm text-gray-300">Databases</span>
          </div>
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#facc15', boxShadow: '0 0 10px #facc15' }} />
            <span className="text-sm text-gray-300">Tools</span>
          </div>
        </div>

        {/* Canvas Container */}
        <div ref={containerRef} className="relative w-full max-w-5xl mx-auto">
          <canvas
            ref={canvasRef}
            className="w-full h-auto rounded-2xl glass"
            style={{ minHeight: '400px' }}
          />
          
          {/* Tooltip */}
          {hoveredSkill && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 glass px-6 py-3 rounded-full border border-white/20 pointer-events-none">
              <p className="text-white font-medium">{hoveredSkill}</p>
              <p className="text-purple-300 text-sm text-center">Click to learn more</p>
            </div>
          )}
        </div>

        {/* Skill Detail Modal */}
        {selectedSkill && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedSkill(null)}
          >
            <div
              className="glass max-w-md w-full p-8 rounded-2xl border-2 relative"
              style={{ borderColor: selectedSkill.color }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedSkill(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <span className="text-white text-xl">×</span>
              </button>

              <div className="text-center mb-6">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold"
                  style={{
                    backgroundColor: `${selectedSkill.color}33`,
                    boxShadow: `0 0 30px ${selectedSkill.color}`,
                    border: `2px solid ${selectedSkill.color}`,
                  }}
                >
                  {selectedSkill.name.substring(0, 2)}
                </div>
                <h3 className="text-3xl font-bold font-serif text-white mb-2">{selectedSkill.name}</h3>
                <p className="text-gray-400 text-sm uppercase tracking-wider">{selectedSkill.category}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-gray-300 text-sm mb-2">Proficiency Level</p>
                  <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: '90%',
                        backgroundColor: selectedSkill.color,
                        boxShadow: `0 0 10px ${selectedSkill.color}`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-gray-300 text-sm mb-2">Experience</p>
                  <p className="text-white">Multiple projects and production applications</p>
                </div>

                <div>
                  <p className="text-gray-300 text-sm mb-2">Related Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {skills
                      .filter(s => s.category === selectedSkill.category && s.name !== selectedSkill.name)
                      .slice(0, 5)
                      .map((relatedSkill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs"
                          style={{
                            backgroundColor: `${relatedSkill.color}22`,
                            border: `1px solid ${relatedSkill.color}66`,
                            color: relatedSkill.color,
                          }}
                        >
                          {relatedSkill.name}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
