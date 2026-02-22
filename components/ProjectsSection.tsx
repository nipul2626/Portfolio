'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  color: string
  borderColor: string
  icon: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'border-blue-500/30',
    icon: '🛍️',
  },
  {
    id: 2,
    title: 'AI Content Generator',
    description: 'AI-powered tool for generating marketing content, blog posts, and social media copy with real-time collaboration features.',
    tags: ['React', 'OpenAI API', 'WebSockets', 'Tailwind'],
    color: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-500/30',
    icon: '🤖',
  },
  {
    id: 3,
    title: 'Real-Time Analytics Dashboard',
    description: 'Comprehensive analytics platform with live data visualization, custom reports, and predictive insights.',
    tags: ['Next.js', 'D3.js', 'MongoDB', 'Socket.io'],
    color: 'from-green-500 to-emerald-500',
    borderColor: 'border-green-500/30',
    icon: '📊',
  },
  {
    id: 4,
    title: 'Social Media Management Suite',
    description: 'Multi-platform social media scheduler with engagement analytics and team collaboration tools.',
    tags: ['TypeScript', 'Express', 'React', 'AWS'],
    color: 'from-orange-500 to-red-500',
    borderColor: 'border-orange-500/30',
    icon: '📱',
  },
  {
    id: 5,
    title: 'Project Management Tool',
    description: 'Collaborative workspace with real-time updates, task automation, and team communication features.',
    tags: ['Vue.js', 'GraphQL', 'Firebase', 'Figma API'],
    color: 'from-pink-500 to-rose-500',
    borderColor: 'border-pink-500/30',
    icon: '✅',
  },
  {
    id: 6,
    title: 'Machine Learning Pipeline',
    description: 'End-to-end ML pipeline for data processing, model training, and inference with REST API integration.',
    tags: ['Python', 'TensorFlow', 'FastAPI', 'Docker'],
    color: 'from-indigo-500 to-purple-500',
    borderColor: 'border-indigo-500/30',
    icon: '🧠',
  },
]

export const ProjectsSection = () => {
  const projectsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    projectsRef.current.forEach((project) => {
      if (project) observer.observe(project)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-white mb-4 text-balance">
            Featured Projects
          </h2>
          <p className="text-purple-300 text-lg md:text-xl max-w-2xl">
            A selection of my most impactful work, showcasing innovative solutions and cutting-edge technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                projectsRef.current[index] = el
              }}
              className={`glass rounded-2xl p-6 md:p-8 border ${project.borderColor} opacity-0 transform translate-y-8 transition-all duration-500 hover:transform hover:scale-105 group cursor-pointer`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Icon */}
              <div className={`text-5xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {project.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold font-serif text-white mb-3 group-hover:text-purple-300 transition-colors">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm md:text-base mb-6 line-clamp-3">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.slice(0, 3).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className={`text-xs px-3 py-1 rounded-full bg-gradient-to-r ${project.color} bg-opacity-20 border border-opacity-30 text-gray-300 font-mono`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Button */}
              <button className={`w-full py-2 px-4 rounded-lg bg-gradient-to-r ${project.color} text-white font-semibold text-sm transition-all duration-300 group-hover:shadow-lg opacity-0 group-hover:opacity-100`}>
                View Project →
              </button>
            </div>
          ))}
        </div>

        {/* View All Projects Link */}
        <div className="flex justify-center mt-16 md:mt-20">
          <Link
            href="#"
            className="px-8 py-3 border border-purple-400 text-purple-300 font-bold rounded-lg hover:bg-purple-500/10 transition-all duration-300 glass"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}
