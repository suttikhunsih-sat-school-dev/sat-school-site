"use client"

import { useEffect, useRef, useState, ReactNode } from "react"

// Cloud dimensions - adjust these to change cloud size
const CLOUD_WIDTH = 1200
const CLOUD_HEIGHT = 1200

interface Point {
    baseX: number
    baseY: number
    x: number
    y: number
    velocityX: number
    velocityY: number
    noiseOffsetX: number
    noiseOffsetY: number
    noiseSpeed: number
    baseRadius: number // Added base radius from center for edge detection
}

export default function InteractiveCloud({ children }: { children?: ReactNode }) {
    const cloudRef = useRef<SVGPathElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [mouse, setMouse] = useState({ x: -1000, y: -1000 })
    const pointsRef = useRef<Point[]>([])
    const animationRef = useRef<number>(null)
    const lastTimeRef = useRef<number>(Date.now())

    // Initialize cloud points
    useEffect(() => {
        const centerX = CLOUD_WIDTH / 2
        const centerY = CLOUD_HEIGHT / 2
        const numPoints = 150

        // Create control points around an ellipse
        pointsRef.current = Array.from({ length: numPoints }, (_, i) => {
            const angle = (i / numPoints) * Math.PI * 2
            const radiusX = (CLOUD_WIDTH / 800) * 280 + Math.random() * 40
            const radiusY = (CLOUD_HEIGHT / 600) * 200 + Math.random() * 30
            const x = centerX + Math.cos(angle) * radiusX
            const y = centerY + Math.sin(angle) * radiusY
            const baseRadius = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)

            return {
                baseX: x,
                baseY: y,
                x,
                y,
                velocityX: 0,
                velocityY: 0,
                noiseOffsetX: Math.random() * 1000,
                noiseOffsetY: Math.random() * 1000,
                noiseSpeed: 0.3 + Math.random() * 0.4,
                baseRadius, // Store base radius for distance calculations
            }
        })
    }, [])

    // Mouse move handler
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect()
            setMouse({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            })
        }

        container.addEventListener("mousemove", handleMouseMove)
        return () => container.removeEventListener("mousemove", handleMouseMove)
    }, [])

    // Animation loop
    useEffect(() => {
        const centerX = CLOUD_WIDTH / 2
        const centerY = CLOUD_HEIGHT / 2
        const springStrength = 0.3
        const damping = 0.8
        const pokeRadius = 150 // Distance from edge point to detect "poke"
        const pokeDepth = 80 // Maximum depth of poke inward
        const pullRadius = 100 // Distance from edge point to detect "pull"
        const pullStrength = 100 // Maximum pull outward strength
        const noiseScale = 15

        const animate = () => {
            const currentTime = Date.now()
            // const deltaTime = Math.min((currentTime - lastTimeRef.current) / 1000, 0.1)
            lastTimeRef.current = currentTime

            const points = pointsRef.current
            const time = currentTime * 0.001

            const mouseDistFromCenter = Math.sqrt((mouse.x - centerX) ** 2 + (mouse.y - centerY) ** 2)

            // Update each point based on mouse interaction
            points.forEach((point) => {
                // Distance from mouse to this edge point
                const dx = mouse.x - point.baseX
                const dy = mouse.y - point.baseY
                const distToPoint = Math.sqrt(dx * dx + dy * dy)

                const normalX = (point.baseX - centerX) / point.baseRadius
                const normalY = (point.baseY - centerY) / point.baseRadius

                let targetOffsetX = 0
                let targetOffsetY = 0

                if (mouseDistFromCenter > point.baseRadius && distToPoint < pokeRadius) {
                    const pokeFactor = Math.max(0, 1 - distToPoint / pokeRadius)
                    // Push point inward along its normal (toward center)
                    targetOffsetX = -normalX * pokeFactor * pokeDepth
                    targetOffsetY = -normalY * pokeFactor * pokeDepth
                } else if (mouseDistFromCenter < point.baseRadius && distToPoint < pullRadius) {
                    const pullFactor = Math.max(0, 1 - distToPoint / pullRadius)
                    // Pull point outward along mouse direction
                    const pullDirX = dx / distToPoint
                    const pullDirY = dy / distToPoint
                    // Only pull if moving away (dot product with normal > 0)
                    const movingAway = pullDirX * normalX + pullDirY * normalY
                    if (movingAway > 0) {
                        targetOffsetX = pullDirX * pullFactor * pullStrength
                        targetOffsetY = pullDirY * pullFactor * pullStrength
                    }
                }

                const noiseX = Math.sin(time * point.noiseSpeed + point.noiseOffsetX) * noiseScale
                const noiseY = Math.cos(time * point.noiseSpeed * 0.8 + point.noiseOffsetY) * noiseScale

                const targetX = point.baseX + targetOffsetX + noiseX
                const targetY = point.baseY + targetOffsetY + noiseY

                point.velocityX += (targetX - point.x) * springStrength
                point.velocityY += (targetY - point.y) * springStrength

                point.velocityX *= damping
                point.velocityY *= damping

                point.x += point.velocityX
                point.y += point.velocityY
            })

            if (points.length > 0) {
                let pathData = `M ${points[0].x} ${points[0].y}`

                for (let i = 0; i < points.length; i++) {
                    const current = points[i]
                    const next = points[(i + 1) % points.length]
                    const nextNext = points[(i + 2) % points.length]

                    const cp1x = current.x + (next.x - current.x) * 0.5
                    const cp1y = current.y + (next.y - current.y) * 0.5
                    const cp2x = next.x - (nextNext.x - current.x) * 0.15
                    const cp2y = next.y - (nextNext.y - current.y) * 0.15

                    pathData += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`
                }

                pathData += " Z"

                if (cloudRef.current) {
                    cloudRef.current.setAttribute("d", pathData)
                }
            }

            animationRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [mouse])

    return (
        <div ref={containerRef} className="relative cursor-pointer" style={{ width: `${CLOUD_WIDTH}px`, height: `${CLOUD_HEIGHT}px` }}>
            <svg width={CLOUD_WIDTH} height={CLOUD_HEIGHT} viewBox={`0 0 ${CLOUD_WIDTH} ${CLOUD_HEIGHT}`} className="drop-shadow-2xl absolute inset-0 pointer-events-none">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                    <pattern id="spaceBg" x="0" y="0" width={CLOUD_WIDTH} height={CLOUD_HEIGHT} patternUnits="userSpaceOnUse">
                        <image href="/space-bg.png" x="0" y="0" width={CLOUD_WIDTH} height={CLOUD_HEIGHT} />
                    </pattern>
                </defs>

                <path ref={cloudRef} d="" fill="url(#spaceBg)" filter="url(#goo)" />
            </svg>

            {children && (
                <div className="absolute inset-0 flex items-center justify-center">
                    {children}
                </div>
            )}
        </div>
    )
}
