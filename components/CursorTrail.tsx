'use client'

import { useEffect, useRef, useState } from 'react'

interface TrailPoint {
  x: number
  y: number
  timestamp: number
}

interface MagneticButton {
  element: HTMLElement
  originalX: number
  originalY: number
  currentX: number
  currentY: number
}

export const CursorTrail = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trailPoints = useRef<TrailPoint[]>([])
  const cursorPos = useRef({ x: 0, y: 0 })
  const targetPos = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()
  const [isMobile, setIsMobile] = useState(false)
  const [isOverInteractive, setIsOverInteractive] = useState(false)
  const magneticButtons = useRef<Map<HTMLElement, MagneticButton>>(new Map())

  useEffect(() => {
    // Check if mobile/touch device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const canvas = canvasRef.current
    if (!canvas || isMobile) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Track all interactive buttons for magnetic effect
    const findMagneticButtons = () => {
      magneticButtons.current.clear()
      const buttons = document.querySelectorAll('button, a, [role="button"]')
      buttons.forEach((el) => {
        const htmlEl = el as HTMLElement
        const rect = htmlEl.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        if (!magneticButtons.current.has(htmlEl)) {
          magneticButtons.current.set(htmlEl, {
            element: htmlEl,
            originalX: centerX,
            originalY: centerY,
            currentX: centerX,
            currentY: centerY,
          })
        }
      })
    }

    findMagneticButtons()

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY }
      
      // Add trail point
      trailPoints.current.push({
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now(),
      })

      // Limit trail points to 20
      if (trailPoints.current.length > 20) {
        trailPoints.current.shift()
      }

      // Check if hovering over interactive element
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.style.cursor === 'pointer'
      setIsOverInteractive(!!isInteractive)

      // Update magnetic buttons on EVERY mouse move
      magneticButtons.current.forEach((button) => {
        const rect = button.element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        const dx = e.clientX - centerX
        const dy = e.clientY - centerY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        const MAGNETIC_RADIUS = 80
        const STRENGTH = 0.3
        
        if (distance < MAGNETIC_RADIUS) {
          // Pull button toward cursor
          const moveX = (dx * STRENGTH)
          const moveY = (dy * STRENGTH)
          button.currentX = centerX + moveX
          button.currentY = centerY + moveY
          
          // Apply transform
          button.element.style.transform = `translate(${moveX}px, ${moveY}px)`
          button.element.style.transition = 'none'
        } else {
          // Spring back when cursor moves away
          button.currentX = centerX
          button.currentY = centerY
          button.element.style.transform = 'translate(0, 0)'
          button.element.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }
      })
    }

    const handleMouseLeave = () => {
      // Reset all buttons immediately on mouse leave
      magneticButtons.current.forEach((button) => {
        button.element.style.transform = 'translate(0, 0)'
        button.element.style.transition = 'none'
      })
    }

    // Animate cursor and trail
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Smooth cursor follow with spring physics
      const dx = targetPos.current.x - cursorPos.current.x
      const dy = targetPos.current.y - cursorPos.current.y
      cursorPos.current.x += dx * 0.15
      cursorPos.current.y += dy * 0.15

      const now = Date.now()

      // Draw trail
      trailPoints.current = trailPoints.current.filter(point => now - point.timestamp < 1000)

      trailPoints.current.forEach((point, index) => {
        const age = now - point.timestamp
        const opacity = Math.max(0, 1 - age / 1000)
        const size = 8 * opacity

        // Trail glow
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, size * 2)
        gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.8})`)
        gradient.addColorStop(0.3, `rgba(168, 85, 247, ${opacity * 0.6})`)
        gradient.addColorStop(1, 'rgba(168, 85, 247, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(point.x, point.y, size * 2, 0, Math.PI * 2)
        ctx.fill()

        // Particle sparkles
        if (index % 3 === 0 && opacity > 0.3) {
          const sparkleSize = 2 * opacity
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
          ctx.beginPath()
          ctx.arc(
            point.x + (Math.random() - 0.5) * 10,
            point.y + (Math.random() - 0.5) * 10,
            sparkleSize,
            0,
            Math.PI * 2
          )
          ctx.fill()
        }
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      {/* Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Custom Cursor */}
      <style jsx global>{`
        body {
          cursor: none !important;
        }
        
        a, button, [role="button"], input, textarea, select {
          cursor: none !important;
        }

        .custom-cursor {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.15s ease-out;
        }

        .cursor-dot {
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: -3px;
          left: -3px;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        }

        .cursor-ring {
          width: 30px;
          height: 30px;
          border: 2px solid rgba(168, 85, 247, 0.6);
          border-radius: 50%;
          position: absolute;
          top: -15px;
          left: -15px;
          transition: all 0.2s ease-out;
          box-shadow: 0 0 15px rgba(168, 85, 247, 0.4);
        }

        .cursor-ring.active {
          width: 50px;
          height: 50px;
          top: -25px;
          left: -25px;
          border-color: rgba(168, 85, 247, 1);
        }

        .cursor-ring.active::before,
        .cursor-ring.active::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(168, 85, 247, 0.6);
        }

        .cursor-ring.active::before {
          width: 2px;
          height: 20px;
        }

        .cursor-ring.active::after {
          width: 20px;
          height: 2px;
        }
      `}</style>

      {/* Cursor Elements */}
      <div
        className="custom-cursor"
        style={{
          left: `${targetPos.current.x}px`,
          top: `${targetPos.current.y}px`,
          transform: isOverInteractive ? 'scale(1.5)' : 'scale(1)',
        }}
      >
        <div className="cursor-dot" />
        <div className={`cursor-ring ${isOverInteractive ? 'active' : ''}`} />
      </div>
    </>
  )
}
