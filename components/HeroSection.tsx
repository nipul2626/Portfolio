'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const title = titleRef.current
    if (!title) return

    // Split text into letters
    const text = title.textContent || ''
    title.textContent = ''

    const letters = text.split('').map((letter, index) => {
      const span = document.createElement('span')
      span.textContent = letter
      span.style.display = 'inline-block'
      span.style.animation = `particleFloat 0.8s ease-out ${index * 0.05}s forwards`
      span.style.opacity = '0'
      return span
    })

    letters.forEach(letter => title.appendChild(letter))
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient glow background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Animated orbitals */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      </div>

      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        {/* Cosmic title */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-black font-serif mb-6 text-white leading-tight tracking-tight"
          style={{
            textShadow: '0 0 30px rgba(168, 85, 247, 0.5), 0 0 60px rgba(59, 130, 246, 0.3)',
          }}
        >
          NIPUL  RATHOD
        </h1>

        {/* Subtitle with glow */}
        <p className="text-xl md:text-2xl text-purple-200 mb-8 font-light max-w-3xl mx-auto">
           Full Stack Developer
        </p>

        {/* Description */}
        <p className="text-base md:text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Journey through my cosmic portfolio as I showcase my skills, projects, and experience in crafting exceptional digital experiences.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="#about"
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 glass border border-purple-400/50"
          >
            Explore Mission
          </Link>
          <Link
            href="#projects"
            className="px-8 py-3 border border-purple-400 text-purple-300 font-bold rounded-lg hover:bg-purple-500/10 transition-all duration-300 backdrop-blur-sm"
          >
            View Projects
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-purple-400 text-sm">Scroll to explore</span>
            <svg
              className="w-6 h-6 text-purple-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
