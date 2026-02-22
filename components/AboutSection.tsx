'use client'

import { useEffect, useRef } from 'react'

interface Stat {
  label: string
  value: string
  unit: string
}

const stats: Stat[] = [
  { label: 'Projects Completed', value: '25+', unit: '' },
  { label: 'Years Experience', value: '5+', unit: '' },
  { label: 'Technologies', value: '30+', unit: '' },
  { label: 'Satisfied Clients', value: '50+', unit: '' },
]

export const AboutSection = () => {
  const statsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
        }
      })
    }, { threshold: 0.3 })

    statsRef.current.forEach(stat => {
      if (stat) observer.observe(stat)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background orbital elements */}
      <div className="absolute -left-40 top-1/4 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute -right-40 bottom-1/4 w-80 h-80 bg-purple-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-white mb-4 text-balance">
            About The Mission
          </h2>
          <p className="text-purple-300 text-lg md:text-xl max-w-2xl">
            I'm a full-stack developer passionate about creating immersive digital experiences through innovative technology and creative problem-solving.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 mb-16 md:mb-24">
          {/* Left column - Text content */}
          <div className="glass rounded-2xl p-8 md:p-12 border border-purple-500/30">
            <h3 className="text-2xl md:text-3xl font-bold font-serif text-purple-200 mb-6">
              The Journey Begins
            </h3>
            <div className="space-y-4 text-gray-300 text-base md:text-lg leading-relaxed">
              <p>
                I embarked on my development journey with a passion for building intuitive user interfaces and robust backend systems. With expertise spanning the full technology stack, I create solutions that are both beautiful and functional.
              </p>
              <p>
                My focus lies in transforming complex requirements into elegant, performant applications. From React and Next.js frontends to Node.js and database architecture, I bring comprehensive technical expertise to every project.
              </p>
              <p>
                I believe in continuous learning and staying at the forefront of web development trends, ensuring every project leverages the best modern practices and technologies available.
              </p>
            </div>
          </div>

          {/* Right column - Tech stack */}
          <div className="glass rounded-2xl p-8 md:p-12 border border-blue-500/30">
            <h3 className="text-2xl md:text-3xl font-bold font-serif text-blue-200 mb-6">
              Core Technologies
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-purple-300 font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full" />
                  Frontend Stack
                </p>
                <p className="text-gray-400 text-sm md:text-base">React, Next.js, TypeScript, Tailwind CSS, Framer Motion</p>
              </div>
              <div>
                <p className="text-blue-300 font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  Backend Stack
                </p>
                <p className="text-gray-400 text-sm md:text-base">Node.js, Express, PostgreSQL, MongoDB, Firebase</p>
              </div>
              <div>
                <p className="text-pink-300 font-semibold mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full" />
                  Tools & Platforms
                </p>
                <p className="text-gray-400 text-sm md:text-base">Git, Docker, AWS, Vercel, GraphQL, REST APIs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => {
                statsRef.current[index] = el
              }}
              className="glass rounded-xl p-6 md:p-8 border border-purple-500/30 text-center opacity-0 transform translate-y-4 transition-all duration-500"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="text-3xl md:text-4xl font-black font-serif bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                {stat.value}
              </div>
              <p className="text-xs md:text-sm text-gray-400 uppercase tracking-wider font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
