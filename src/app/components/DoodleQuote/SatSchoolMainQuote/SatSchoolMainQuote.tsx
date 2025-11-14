import React, { JSX, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/**
 * SatSchoolMainQuote — Liquid Splash UI
 * Fully responsive blob covering text + interactive hover / click ripple
 */
export default function SatSchoolMainQuote(): JSX.Element {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const blobRef = useRef<SVGPathElement | null>(null);

    useLayoutEffect(() => {
        const blob = blobRef.current;
        const container = containerRef.current;
        if (!blob || !container) return;

        /** -----------------------
         * Smooth Cardinal Spline Blob
         * ----------------------- */
        const buildPath = (pts: any[]) => {
            const tension = 0.55;
            let d = `M ${pts[0].x} ${pts[0].y}`;

            for (let i = 0; i < pts.length; i++) {
                const p0 = pts[(i - 1 + pts.length) % pts.length];
                const p1 = pts[i];
                const p2 = pts[(i + 1) % pts.length];
                const p3 = pts[(i + 2) % pts.length];

                const cp1x = p1.x + (p2.x - p0.x) * tension;
                const cp1y = p1.y + (p2.y - p0.y) * tension;
                const cp2x = p2.x - (p3.x - p1.x) * tension;
                const cp2y = p2.y - (p3.y - p1.y) * tension;

                d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
            }

            return d + " Z";
        };

        /** -----------------------
         * Blob geometry setup
         * ----------------------- */
        const points = 18; // smoother & splash-like
        const radius = 320; // MUCH bigger — covers full area
        const variance = 55; // more wobble

        const basePoints: any[] = Array.from({ length: points }).map((_, i) => {
            const angle = (i / points) * Math.PI * 2;
            const baseX = Math.cos(angle) * radius;
            const baseY = Math.sin(angle) * radius;
            return {
                angle,
                baseX,
                baseY,
                x: baseX,
                y: baseY,
            };
        });

        blob.setAttribute("d", buildPath(basePoints));

        /** -----------------------
         * Auto Liquid Wibble Animation
         * ----------------------- */
        const wibble = gsap.to(basePoints, {
            x: (i: number) => basePoints[i].baseX + gsap.utils.random(-variance, variance),
            y: (i: number) => basePoints[i].baseY + gsap.utils.random(-variance, variance),
            duration: 3.2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: 0.06,
            onUpdate: () => blob.setAttribute("d", buildPath(basePoints)),
        });

        /** -----------------------
         * Hover / Mouse Move Interaction
         * ----------------------- */
        const mouseStrength = 0.6; // blob reacts to cursor

        const onMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const cx = e.clientX - rect.left - rect.width / 2;
            const cy = e.clientY - rect.top - rect.height / 2;

            gsap.to(basePoints, {
                x: (i: number) => basePoints[i].baseX + Math.cos(basePoints[i].angle) * cx * mouseStrength,
                y: (i: number) => basePoints[i].baseY + Math.sin(basePoints[i].angle) * cy * mouseStrength,
                duration: 0.6,
                ease: "sine.out",
                onUpdate: () => blob.setAttribute("d", buildPath(basePoints)),
            });
        };

        container.addEventListener("mousemove", onMove);

        /** -----------------------
         * Click Splash Effect
         * ----------------------- */
        const onClick = () => {
            gsap.fromTo(
                blob,
                { scale: 1 },
                {
                    scale: 1.08,
                    duration: 0.25,
                    ease: "power2.out",
                    yoyo: true,
                    repeat: 1,
                    transformOrigin: "center center",
                }
            );
        };

        container.addEventListener("click", onClick);

        return () => {
            wibble.kill();
            container.removeEventListener("mousemove", onMove);
            container.removeEventListener("click", onClick);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "340px",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "transparent",
                overflow: "hidden",
                zIndex: 2,
            }}
        >
            {/* Interactive Liquid Splash */}
            <svg
                width="900"
                height="900"
                viewBox="-450 -450 900 900"
                style={{ position: "absolute" }}
                aria-hidden
            >
                <defs>
                    <radialGradient id="splashGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#e9f2ff" />
                    </radialGradient>
                </defs>

                <path
                    ref={blobRef}
                    fill="url(#splashGradient)"
                    stroke="#ffffff"
                    strokeWidth={8}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />
            </svg>

            {/* Fixed Text */}
            <div
                style={{
                    position: "relative",
                    zIndex: 5,
                    textAlign: "center",
                    pointerEvents: "none",
                }}
            >
                <div style={{ fontSize: "42px", fontWeight: 800, color: "#2261a8" }}>
                    The Future of Our Education
                </div>

                <div style={{ marginTop: "12px", fontSize: "34px", fontWeight: 800, color: "#2261a8" }}>
                    is in Your Hands
                </div>
            </div>
        </div>
    );
}
