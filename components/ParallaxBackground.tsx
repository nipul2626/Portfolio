'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  twinkleSpeed: number
  depth: number
}

export const ParallaxBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const scrollYRef = useRef(0)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()

    // Generate stars
    const generateStars = () => {
      starsRef.current = []
      const starCount = window.innerWidth > 768 ? 400 : 200
      
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          depth: Math.random() * 0.8 + 0.2,
        })
      }
    }
    generateStars()

    // Handle scroll
    const handleScroll = () => {
      scrollYRef.current = window.scrollY
    }

    // Animation loop
    let time = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw deep space gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)')
      gradient.addColorStop(0.5, 'rgba(10, 10, 26, 0.8)')
      gradient.addColorStop(1, 'rgba(26, 0, 51, 0.8)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars with parallax
      starsRef.current.forEach((star) => {
        const parallaxOffset = (scrollYRef.current * star.depth) / 100
        const y = (star.y - parallaxOffset) % canvas.height
        
        const twinkle = Math.sin(time * star.twinkleSpeed) * 0.5 + 0.5
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`
        ctx.beginPath()
        ctx.arc(star.x, y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw occasional shooting stars on desktop
      if (window.innerWidth > 768) {
        const shootingStarChance = 0.002
        if (Math.random() < shootingStarChance) {
          const sx = Math.random() * canvas.width
          const sy = Math.random() * canvas.height * 0.3
          const length = Math.random() * 100 + 50
          
          const gradient = ctx.createLinearGradient(sx, sy, sx + length, sy - length * 0.5)
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
          gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)')
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
          
          ctx.strokeStyle = gradient
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(sx, sy)
          ctx.lineTo(sx + length, sy - length * 0.5)
          ctx.stroke()
        }
      }

      time++
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', resizeCanvas)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 will-change-transform"
      style={{ pointerEvents: 'none' }}
    />
  )
}
