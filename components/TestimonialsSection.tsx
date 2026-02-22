'use client'

import { useState, useEffect, useRef } from 'react'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  message: string
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechStart Inc',
    message:
      'Nipul transformed our entire product experience with his innovative approach. His technical expertise combined with design thinking resulted in a 40% increase in user engagement.',
    avatar: '👩‍💼',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'CTO',
    company: 'CloudFlow Solutions',
    message:
      'The architecture and code quality delivered were exceptional. Nipul solved complex problems with elegant solutions and maintained excellent communication throughout the project.',
    avatar: '👨‍💻',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Founder',
    company: 'Creative Digital',
    message:
      'Working with Nipul was a game-changer for our startup. He not only built our MVP but also mentored our team on best practices. Highly recommended!',
    avatar: '👩‍🔬',
  },
]

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay])

  const handlePrevious = () => {
    setAutoPlay(false)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setAutoPlay(false)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full filter blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-serif text-white mb-4 text-balance">
            What Others Say
          </h2>
          <p className="text-purple-300 text-lg md:text-xl max-w-2xl">
            Testimonials from clients and colleagues I've worked with on groundbreaking projects.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial */}
          <div className="glass rounded-2xl p-8 md:p-12 border border-purple-500/30 min-h-96">
            <div className="flex flex-col h-full">
              {/* Quote mark */}
              <div className="text-6xl text-purple-500/30 mb-4 font-serif">"</div>

              {/* Message */}
              <p className="text-lg md:text-xl text-gray-200 mb-8 flex-grow italic leading-relaxed">
                {testimonials[activeIndex].message}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="text-5xl">{testimonials[activeIndex].avatar}</div>
                <div>
                  <p className="text-white font-bold text-lg">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-purple-300 text-sm">
                    {testimonials[activeIndex].role} at{' '}
                    <span className="font-semibold">
                      {testimonials[activeIndex].company}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePrevious}
              className="p-3 rounded-full border border-purple-400/50 text-purple-300 hover:bg-purple-500/20 transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index)
                    setAutoPlay(false)
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-purple-500 w-8'
                      : 'bg-purple-500/30 hover:bg-purple-500/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-purple-400/50 text-purple-300 hover:bg-purple-500/20 transition-all duration-300"
              aria-label="Next testimonial"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
