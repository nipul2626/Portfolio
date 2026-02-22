'use client'

import { useEffect, useRef, useState } from 'react'

export const RealisticPlanets = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const mousePos = useRef({ x: 0, y: 0 })
    const animationRef = useRef<number | null>(null)

    const [mounted, setMounted] = useState(false)

    const [planets, setPlanets] = useState([
        { name: 'jupiter', x: 5, y: 10, rotation: 0 },
        { name: 'saturn', x: 5, y: 75, rotation: 0 },
        { name: 'mars', x: 85, y: 20, rotation: 0 },
        { name: 'neptune', x: 95, y: 90, rotation: 0 },
    ])

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    // Mouse tracking
    useEffect(() => {
        if (!mounted) return

        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY }
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mounted])

    // Rotation animation
    useEffect(() => {
        if (!mounted) return

        const animate = () => {
            setPlanets((prev) =>
                prev.map((planet) => ({
                    ...planet,
                    rotation:
                        (planet.rotation +
                            (planet.name === 'saturn' ? 0.1 : 0.3)) %
                        360,
                }))
            )

            animationRef.current = requestAnimationFrame(animate)
        }

        animationRef.current = requestAnimationFrame(animate)

        return () => {
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [mounted])

    const getPlanetTilt = (planetX: number, planetY: number) => {
        if (!mounted) return { rotateX: 0, rotateY: 0 }

        const planetCenterX = (planetX / 100) * window.innerWidth
        const planetCenterY = (planetY / 100) * window.innerHeight

        const dx = mousePos.current.x - planetCenterX
        const dy = mousePos.current.y - planetCenterY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance === 0) return { rotateX: 0, rotateY: 0 }

        const INFLUENCE_RADIUS = 500
        if (distance > INFLUENCE_RADIUS)
            return { rotateX: 0, rotateY: 0 }

        const strength =
            (1 - distance / INFLUENCE_RADIUS) * 20

        return {
            rotateY: (dx / distance) * strength,
            rotateX: -(dy / distance) * strength,
        }
    }

    // Precompute tilts (performance improvement)
    const jupiterTilt = getPlanetTilt(5, 10)
    const saturnTilt = getPlanetTilt(5, 75)
    const marsTilt = getPlanetTilt(85, 20)
    const neptuneTilt = getPlanetTilt(95, 90)

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none overflow-hidden"
        >
            {/* Jupiter */}
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
                        transform: `rotateX(${jupiterTilt.rotateX}deg) rotateY(${jupiterTilt.rotateY}deg) rotateZ(${planets[0].rotation}deg)`,
                    }}
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 shadow-2xl" />
                </div>
            </div>

            {/* Saturn */}
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
                        transform: `rotateX(${saturnTilt.rotateX}deg) rotateY(${saturnTilt.rotateY}deg)`,
                    }}
                >
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-400 shadow-2xl" />

                    <div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 rounded-full border-8 border-yellow-300/70"
                        style={{
                            transform: `rotateX(25deg) rotateY(${saturnTilt.rotateY * 0.5}deg)`,
                        }}
                    />
                </div>
            </div>

            {/* Mars */}
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
                        transform: `rotateX(${marsTilt.rotateX}deg) rotateY(${marsTilt.rotateY}deg) rotateZ(${planets[2].rotation}deg)`,
                    }}
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-red-600 via-red-700 to-red-800 shadow-xl" />
                </div>
            </div>

            {/* Neptune */}
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
                        transform: `rotateX(${neptuneTilt.rotateX}deg) rotateY(${neptuneTilt.rotateY}deg) rotateZ(${planets[3].rotation}deg)`,
                    }}
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 shadow-xl" />
                </div>
            </div>
        </div>
    )
}