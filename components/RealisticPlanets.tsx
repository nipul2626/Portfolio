'use client'

import { useEffect, useRef, useState } from 'react'

export const RealisticPlanets = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const [planets, setPlanets] = useState<Array<{
    name: string
    x: number
    y: number
    rotation: number
  }>>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useEffect(() => {
    // Animate planet rotations
    let animationFrame: number

    const animate = () => {
      setPlanets((prev) =>
        prev.map((planet) => ({
          ...planet,
          rotation: (planet.rotation + (planet.name === 'saturn' ? 0.1 : 0.3)) % 360,
        }))
      )
      animationFrame = requestAnimationFrame(animate)
    }

    setPlanets([
      { name: 'jupiter', x: 5, y: 10, rotation: 0 },
      { name: 'saturn', x: 5, y: 75, rotation: 0 },
      { name: 'mars', x: 85, y: 20, rotation: 0 },
      { name: 'neptune', x: 10, y: 90, rotation: 0 },
    ])

    animate()

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  const getPlanetTilt = (planetX: number, planetY: number) => {
    if (typeof window === 'undefined') return { rotateX: 0, rotateY: 0 }

    const planetCenterX = (planetX / 100) * window.innerWidth
    const planetCenterY = (planetY / 100) * window.innerHeight

    const dx = mousePos.current.x - planetCenterX
    const dy = mousePos.current.y - planetCenterY
    const distance = Math.sqrt(dx * dx + dy * dy)

    const INFLUENCE_RADIUS = 500
    if (distance > INFLUENCE_RADIUS) return { rotateX: 0, rotateY: 0 }

    const strength = (1 - distance / INFLUENCE_RADIUS) * 20
    return {
      rotateY: (dx / distance) * strength,
      rotateX: -(dy / distance) * strength,
    }
  }

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Jupiter - Top Right */}
      <div
        className="absolute transition-transform duration-700"
        style={{
          left: '5%',
          top: '10%',
          width: '350px',
          height: '350px',
          perspective: '1000px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            transform: `rotateX(${getPlanetTilt(5, 10).rotateX}deg) rotateY(${getPlanetTilt(5, 10).rotateY}deg) rotateZ(${planets[0]?.rotation || 0}deg)`,
          }}
        >
          {/* Jupiter Body */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 shadow-2xl overflow-hidden">
            {/* Atmospheric Bands */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 inset-x-0 h-12 bg-gradient-to-r from-transparent via-orange-700/40 to-transparent" />
              <div className="absolute top-1/2 inset-x-0 h-16 bg-gradient-to-r from-transparent via-orange-800/30 to-transparent" />
              <div className="absolute bottom-1/4 inset-x-0 h-10 bg-gradient-to-r from-transparent via-orange-700/35 to-transparent" />
              
              {/* Great Red Spot */}
              <div className="absolute w-32 h-24 rounded-full bg-gradient-radial from-red-700/60 to-transparent" style={{ left: '60%', top: '55%', filter: 'blur(8px)' }} />
            </div>

            {/* Glow */}
            <div className="absolute inset-0 rounded-full shadow-2xl" style={{
              boxShadow: 'inset -30px -30px 60px rgba(0, 0, 0, 0.3), 0 0 80px rgba(249, 115, 22, 0.6)',
            }} />
          </div>
        </div>
      </div>

      {/* Saturn - Bottom Left with Rings */}
      <div
        className="absolute transition-transform duration-700"
        style={{
          left: '5%',
          top: '75%',
          width: '300px',
          height: '300px',
          perspective: '1000px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            transform: `rotateX(${getPlanetTilt(5, 75).rotateX}deg) rotateY(${getPlanetTilt(5, 75).rotateY}deg)`,
          }}
        >
          {/* Saturn Body */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-400 shadow-2xl overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56">
            {/* Bands */}
            <div className="absolute top-1/3 inset-x-0 h-8 bg-gradient-to-r from-transparent via-yellow-600/30 to-transparent" />
            
            {/* Glow */}
            <div className="absolute inset-0 rounded-full shadow-2xl" style={{
              boxShadow: 'inset -20px -20px 40px rgba(0, 0, 0, 0.2), 0 0 60px rgba(250, 204, 21, 0.5)',
            }} />
          </div>

          {/* Saturn Rings */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
              transform: `rotateX(25deg) rotateY(${getPlanetTilt(5, 75).rotateY * 0.5}deg)`,
            }}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 rounded-full border-8 border-yellow-300/70" style={{
              boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.3), 0 0 40px rgba(250, 204, 21, 0.4)',
            }} />
          </div>
        </div>
      </div>

      {/* Mars - Right side */}
      <div
        className="absolute transition-transform duration-700"
        style={{
          right: '10%',
          top: '20%',
          width: '150px',
          height: '150px',
          perspective: '1000px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            transform: `rotateX(${getPlanetTilt(90, 20).rotateX}deg) rotateY(${getPlanetTilt(90, 20).rotateY}deg) rotateZ(${planets[2]?.rotation || 0}deg)`,
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-red-600 via-red-700 to-red-800 shadow-xl" style={{
            boxShadow: '0 0 40px rgba(220, 38, 38, 0.5)',
          }} />
        </div>
      </div>

      {/* Neptune - Bottom right */}
      <div
        className="absolute transition-transform duration-700"
        style={{
          right: '5%',
          bottom: '10%',
          width: '120px',
          height: '120px',
          perspective: '1000px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            transform: `rotateX(${getPlanetTilt(95, 90).rotateX}deg) rotateY(${getPlanetTilt(95, 90).rotateY}deg) rotateZ(${planets[3]?.rotation || 0}deg)`,
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 shadow-xl" style={{
            boxShadow: '0 0 50px rgba(59, 130, 246, 0.6)',
          }} />
        </div>
      </div>
    </div>
  )
}
