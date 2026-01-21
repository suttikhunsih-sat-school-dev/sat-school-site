"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function BoyRocket() {
    const ref = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
        if (!ref.current) return

        const ctx = gsap.context(() => {
            gsap.to(ref.current, {
                y: 18,
                duration: 2.2,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
            })
        }, ref)

        return () => ctx.revert()
    }, [])

    return (
        <img
            ref={ref}
            src="/boy-rocket.png"
            alt="boy rocket"
            width={400}
            height={400}
            // className="pointer-events-none absolute z-10 left-4 top-4 w-28 max-w-none"
            // style={{ transformOrigin: "center bottom" }}
        />
    )
}
