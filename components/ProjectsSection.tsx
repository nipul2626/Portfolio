'use client'

import { useEffect, useRef, useState } from 'react'

interface Project {
  id: number
  name: string
  tagline: string
  description: string
  features: string[]
  techStack: string[]
  githubUrl?: string
  githubFrontendUrl?: string
  githubBackendUrl?: string
  liveUrl?: string
  planetType: string
  planetColor: string
  atmosphereColor: string
  size: number
  orbitRadius: number
  orbitSpeed: number
  startAngle: number
  moons?: string[]
}

const projects: Project[] = [
  {
    id: 1,
    name: 'AI Portfolio Builder',
    tagline: 'Intelligent Platform for Creating Portfolios',
    description: 'Revolutionary platform that uses AI to generate stunning portfolios. Upload your resume, and let AI create a complete portfolio website. Deploy instantly with one click.',
    features: [
      'AI-Powered Generation',
      'Resume Upload & Parse',
      'One-Click Deploy',
      'Multiple Templates',
      'Customization Options',
    ],
    techStack: ['React', 'Vite', 'Tailwind', 'JavaScript'],
    githubUrl: 'https://github.com/nipul2626/ai-portfolio-builder',
    planetType: 'Earth-like',
    planetColor: '#3b82f6',
    atmosphereColor: '#06b6d4',
    size: 100,
    orbitRadius: 200,
    orbitSpeed: 0.3,
    startAngle: 0,
  },
  {
    id: 2,
    name: 'SkillSetu',
    tagline: 'AI-Powered Mock Interview Platform',
    description: 'Revolutionary mock interview platform powered by AI. Perform realistic interviews, get instant AI evaluations with detailed feedback, receive personalized learning roadmaps, and track your progress over time.',
    features: [
      'AI Evaluation Engine',
      'Personalized Roadmaps',
      'Progress Tracking',
      'Interview History',
      'Performance Analytics',
    ],
    techStack: ['Java', 'XML', 'Spring Boot', 'Gemini API', 'Kotlin', 'Android'],
    githubFrontendUrl: 'https://github.com/nipul2626/Skillsetu',
    githubBackendUrl: 'https://github.com/nipul2626/SkillsetuBackend',
    planetType: 'Mars-like',
    planetColor: '#f97316',
    atmosphereColor: '#fb923c',
    size: 95,
    orbitRadius: 320,
    orbitSpeed: 0.2,
    startAngle: 120,
    moons: ['Frontend App', 'Backend API'],
  },
  {
    id: 3,
    name: "Valentine's Website",
    tagline: 'Stunning UI Showcase',
    description: 'Visually stunning showcase website featuring cutting-edge animations and transitions. Demonstrates advanced animation techniques using Framer Motion and modern UI design principles.',
    features: [
      'Advanced Animations',
      'Modern UI Design',
      'Interactive Elements',
      'Smooth Transitions',
    ],
    techStack: ['React', 'Vite', 'Tailwind', 'Framer Motion'],
    githubUrl: 'https://github.com/nipul2626/v0-valentine-s-website',
    planetType: 'Venus-like',
    planetColor: '#ec4899',
    atmosphereColor: '#fbbf24',
    size: 85,
    orbitRadius: 440,
    orbitSpeed: 0.15,
    startAngle: 240,
    moons: ['Animation Features'],
  },
]

export const ProjectsSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)
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
      canvas.height = Math.min(900, rect.width * 0.9)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const sunRadius = 70
    const isMobile = window.innerWidth < 768

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      timeRef.current += 0.008

      // Draw central sun
      const sunGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, sunRadius)
      sunGradient.addColorStop(0, '#fbbf24')
      sunGradient.addColorStop(0.5, '#f97316')
      sunGradient.addColorStop(1, '#ea580c')
      
      ctx.shadowBlur = 50
      ctx.shadowColor = '#f97316'
      ctx.fillStyle = sunGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, sunRadius, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowBlur = 0

      // Draw sun corona/rays
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI / 4) + timeRef.current
        const rayLength = sunRadius + 20 + Math.sin(timeRef.current * 2 + i) * 10
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)'
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(centerX + Math.cos(angle) * sunRadius, centerY + Math.sin(angle) * sunRadius)
        ctx.lineTo(centerX + Math.cos(angle) * rayLength, centerY + Math.sin(angle) * rayLength)
        ctx.stroke()
      }

      // Draw orbital paths
      projects.forEach(project => {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(centerX, centerY, project.orbitRadius * (isMobile ? 0.7 : 1), 0, Math.PI * 2)
        ctx.stroke()
      })

      // Draw planets
      projects.forEach((project, index) => {
        const angle = project.startAngle + timeRef.current * project.orbitSpeed
        const scaledRadius = project.orbitRadius * (isMobile ? 0.7 : 1)
        const x = centerX + Math.cos(angle) * scaledRadius
        const y = centerY + Math.sin(angle) * scaledRadius
        const planetRadius = project.size * (isMobile ? 0.6 : 1) / 2

        const isHovered = hoveredProject === project.id

        // Planet atmosphere glow
        ctx.shadowBlur = isHovered ? 40 : 25
        ctx.shadowColor = project.atmosphereColor
        
        // Planet gradient
        const planetGradient = ctx.createRadialGradient(
          x - planetRadius / 3,
          y - planetRadius / 3,
          0,
          x,
          y,
          planetRadius
        )
        planetGradient.addColorStop(0, project.planetColor + 'ee')
        planetGradient.addColorStop(0.7, project.planetColor + 'aa')
        planetGradient.addColorStop(1, project.planetColor + '66')
        
        ctx.fillStyle = planetGradient
        ctx.beginPath()
        ctx.arc(x, y, planetRadius, 0, Math.PI * 2)
        ctx.fill()

        // Planet surface texture (simplified)
        ctx.fillStyle = project.planetColor + '33'
        for (let i = 0; i < 5; i++) {
          const craterX = x + (Math.cos(i * 1.5) * planetRadius * 0.4)
          const craterY = y + (Math.sin(i * 1.5) * planetRadius * 0.4)
          ctx.beginPath()
          ctx.arc(craterX, craterY, planetRadius * 0.15, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.shadowBlur = 0

        // Draw tech stack icons orbiting planet
        if (!isMobile) {
          project.techStack.slice(0, 4).forEach((tech, techIndex) => {
            const techAngle = techIndex * (Math.PI / 2) + timeRef.current * 2
            const techOrbitRadius = planetRadius + 25
            const techX = x + Math.cos(techAngle) * techOrbitRadius
            const techY = y + Math.sin(techAngle) * techOrbitRadius

            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
            ctx.font = '10px monospace'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillText(tech.substring(0, 3), techX, techY)
          })
        }

        // Draw moons
        if (project.moons) {
          project.moons.forEach((moon, moonIndex) => {
            const moonAngle = moonIndex * Math.PI + timeRef.current * 1.5
            const moonOrbitRadius = planetRadius + 45
            const moonX = x + Math.cos(moonAngle) * moonOrbitRadius
            const moonY = y + Math.sin(moonAngle) * moonOrbitRadius
            const moonRadius = 8

            ctx.fillStyle = '#94a3b8'
            ctx.shadowBlur = 10
            ctx.shadowColor = '#94a3b8'
            ctx.beginPath()
            ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2)
            ctx.fill()
            ctx.shadowBlur = 0
          })
        }

        // Planet name label
        if (isHovered || isMobile) {
          ctx.fillStyle = '#ffffff'
          ctx.font = `bold ${isHovered ? 16 : 14}px "Orbitron", sans-serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'top'
          ctx.shadowBlur = 5
          ctx.shadowColor = '#000000'
          ctx.fillText(project.name, x, y + planetRadius + 10)
          ctx.shadowBlur = 0
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

      let foundProjectId: number | null = null

      projects.forEach(project => {
        const angle = project.startAngle + timeRef.current * project.orbitSpeed
        const scaledRadius = project.orbitRadius * (isMobile ? 0.7 : 1)
        const x = centerX + Math.cos(angle) * scaledRadius
        const y = centerY + Math.sin(angle) * scaledRadius
        const planetRadius = project.size * (isMobile ? 0.6 : 1) / 2

        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2)
        if (distance < planetRadius) {
          foundProjectId = project.id
        }
      })

      setHoveredProject(foundProjectId)
      canvas.style.cursor = foundProjectId ? 'pointer' : 'default'
    }

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      projects.forEach(project => {
        const angle = project.startAngle + timeRef.current * project.orbitSpeed
        const scaledRadius = project.orbitRadius * (isMobile ? 0.7 : 1)
        const x = centerX + Math.cos(angle) * scaledRadius
        const y = centerY + Math.sin(angle) * scaledRadius
        const planetRadius = project.size * (isMobile ? 0.6 : 1) / 2

        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2)
        if (distance < planetRadius) {
          setSelectedProject(project)
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
  }, [hoveredProject])

  return (
    <section className="relative py-20 md:py-32 overflow-hidden" id="projects">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-yellow-500/5 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-white mb-4 text-balance">
            Solar System of Projects
          </h2>
          <p className="text-purple-300 text-lg md:text-xl max-w-2xl mx-auto">
            Explore my project universe. Each planet represents a unique creation orbiting around innovation.
          </p>
        </div>

        {/* Canvas Container */}
        <div ref={containerRef} className="relative w-full max-w-6xl mx-auto">
          <canvas
            ref={canvasRef}
            className="w-full h-auto rounded-2xl glass"
            style={{ minHeight: '500px' }}
          />
          
          {/* Tooltip */}
          {hoveredProject && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 glass px-6 py-3 rounded-full border border-white/20 pointer-events-none">
              <p className="text-white font-medium">
                {projects.find(p => p.id === hoveredProject)?.name}
              </p>
              <p className="text-purple-300 text-sm text-center">Click to explore</p>
            </div>
          )}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="glass max-w-4xl w-full rounded-2xl border-2 overflow-hidden relative"
              style={{ borderColor: selectedProject.atmosphereColor }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <span className="text-white text-2xl">×</span>
              </button>

              <div className="grid md:grid-cols-5 gap-0">
                {/* Left Side - Planet Visualization */}
                <div
                  className="md:col-span-2 p-8 flex items-center justify-center relative"
                  style={{
                    background: `linear-gradient(135deg, ${selectedProject.planetColor}22, ${selectedProject.atmosphereColor}22)`,
                  }}
                >
                  <div
                    className="w-48 h-48 rounded-full flex items-center justify-center text-5xl font-bold relative"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${selectedProject.planetColor}ee, ${selectedProject.planetColor}66)`,
                      boxShadow: `0 0 60px ${selectedProject.atmosphereColor}`,
                      animation: 'orbitRotate 20s linear infinite',
                    }}
                  >
                    {selectedProject.name.substring(0, 2).toUpperCase()}
                    
                    {/* Orbiting tech icons */}
                    {selectedProject.techStack.slice(0, 3).map((tech, idx) => (
                      <div
                        key={idx}
                        className="absolute w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-xs"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `rotate(${idx * 120}deg) translate(120px) rotate(-${idx * 120}deg)`,
                        }}
                      >
                        {tech.substring(0, 2)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side - Project Details */}
                <div className="md:col-span-3 p-8 md:p-12 overflow-y-auto max-h-[80vh]">
                  <div className="mb-2">
                    <span
                      className="text-xs uppercase tracking-wider px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: `${selectedProject.atmosphereColor}33`,
                        color: selectedProject.atmosphereColor,
                      }}
                    >
                      {selectedProject.planetType}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold font-serif text-white mb-2">
                    {selectedProject.name}
                  </h3>
                  
                  <p className="text-gray-400 text-lg mb-6">{selectedProject.tagline}</p>

                  <p className="text-gray-300 mb-8 leading-relaxed">{selectedProject.description}</p>

                  {/* Key Features */}
                  <div className="mb-8">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                      <span className="text-xl">✨</span>
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-300">
                          <span
                            className="mt-1"
                            style={{ color: selectedProject.atmosphereColor }}
                          >
                            ▹
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-8">
                    <h4 className="text-white font-bold mb-4">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 rounded-lg text-sm font-mono"
                          style={{
                            backgroundColor: `${selectedProject.atmosphereColor}22`,
                            border: `1px solid ${selectedProject.atmosphereColor}66`,
                            color: selectedProject.atmosphereColor,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-4">
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-all flex items-center gap-2"
                      >
                        <span>📦</span>
                        View Code
                      </a>
                    )}
                    {selectedProject.githubFrontendUrl && (
                      <a
                        href={selectedProject.githubFrontendUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-all flex items-center gap-2"
                      >
                        <span>📦</span>
                        Frontend Code
                      </a>
                    )}
                    {selectedProject.githubBackendUrl && (
                      <a
                        href={selectedProject.githubBackendUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-all flex items-center gap-2"
                      >
                        <span>🔧</span>
                        Backend Code
                      </a>
                    )}
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 rounded-lg text-white font-semibold transition-all flex items-center gap-2"
                        style={{
                          background: `linear-gradient(135deg, ${selectedProject.planetColor}, ${selectedProject.atmosphereColor})`,
                        }}
                      >
                        <span>🚀</span>
                        Launch Project
                      </a>
                    )}
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
