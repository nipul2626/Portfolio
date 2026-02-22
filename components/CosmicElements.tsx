'use client'

import { useEffect, useRef } from 'react'

export const CosmicElements = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shootingStarsRef = useRef<Array<{
    x: number
    y: number
    length: number
    speed: number
    angle: number
    opacity: number
  }>>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let animationFrameId: number

    // Create shooting star
    const createShootingStar = () => {
      const side = Math.floor(Math.random() * 4)
      let x, y, angle

      switch (side) {
        case 0: // Top
          x = Math.random() * canvas.width
          y = 0
          angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3
          break
        case 1: // Right
          x = canvas.width
          y = Math.random() * canvas.height
          angle = (3 * Math.PI) / 4 + (Math.random() - 0.5) * 0.3
          break
        case 2: // Bottom
          x = Math.random() * canvas.width
          y = canvas.height
          angle = -Math.PI / 4 + (Math.random() - 0.5) * 0.3
          break
        default: // Left
          x = 0
          y = Math.random() * canvas.height
          angle = Math.PI / 4 + (Math.random() - 0.5) * 0.3
      }

      shootingStarsRef.current.push({
        x,
        y,
        length: 80 + Math.random() * 40,
        speed: 4 + Math.random() * 3,
        angle,
        opacity: 0.8 + Math.random() * 0.2,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Randomly create new shooting stars
      if (Math.random() < 0.01) {
        createShootingStar()
      }

      // Draw and update shooting stars
      shootingStarsRef.current = shootingStarsRef.current.filter((star) => {
        star.x += Math.cos(star.angle) * star.speed
        star.y += Math.sin(star.angle) * star.speed
        star.opacity -= 0.005

        if (star.opacity <= 0 || star.x < -100 || star.x > canvas.width + 100 || star.y < -100 || star.y > canvas.height + 100) {
          return false
        }

        // Draw shooting star trail
        const gradient = ctx.createLinearGradient(
          star.x,
          star.y,
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`)
        gradient.addColorStop(0.5, `rgba(168, 85, 247, ${star.opacity * 0.5})`)
        gradient.addColorStop(1, 'rgba(168, 85, 247, 0)')

        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        )
        ctx.stroke()

        // Draw star head
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.shadowBlur = 8
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)'
        ctx.beginPath()
        ctx.arc(star.x, star.y, 2, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        return true
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <>
      {/* Shooting Stars Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Decorative Rotating Galaxies */}
      <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
        <div
          className="absolute top-10 right-20 w-96 h-96 opacity-5"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)',
            animation: 'orbitRotate 120s linear infinite',
          }}
        />
        <div
          className="absolute bottom-20 left-10 w-80 h-80 opacity-5"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
            animation: 'orbitRotate 150s linear infinite reverse',
          }}
        />
      </div>

      {/* Decorative Orbiting Planets */}
      <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
        {/* Top Right Small Planet */}
        <div
          className="absolute top-32 right-16 w-16 h-16 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #f97316, #ea580c)',
            boxShadow: '0 0 30px rgba(249, 115, 22, 0.4)',
            animation: 'float 8s ease-in-out infinite',
          }}
        />

        {/* Middle Left Medium Planet */}
        <div
          className="absolute top-1/2 left-20 w-24 h-24 rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #3b82f6, #1e40af)',
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.3)',
            animation: 'float 10s ease-in-out infinite 2s',
          }}
        />

        {/* Bottom Right Large Planet */}
        <div
          className="absolute bottom-32 right-32 w-20 h-20 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle at 30% 30%, #ec4899, #be185d)',
            boxShadow: '0 0 35px rgba(236, 72, 153, 0.3)',
            animation: 'float 12s ease-in-out infinite 4s',
          }}
        />
      </div>

      {/* Saturn Ring Dividers (between sections) */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        .section-divider {
          position: relative;
          height: 2px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(168, 85, 247, 0.3) 20%, 
            rgba(168, 85, 247, 0.5) 50%, 
            rgba(168, 85, 247, 0.3) 80%, 
            transparent 100%
          );
          margin: 4rem 0;
        }

        .section-divider::before {
          content: '';
          position: absolute;
          top: -10px;
          left: 0;
          right: 0;
          height: 20px;
          background: radial-gradient(ellipse at center, 
            rgba(168, 85, 247, 0.2) 0%, 
            transparent 70%
          );
          filter: blur(8px);
        }

        .section-divider::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 8px;
          height: 8px;
          background: #a855f7;
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.8);
          animation: glowPulse 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
