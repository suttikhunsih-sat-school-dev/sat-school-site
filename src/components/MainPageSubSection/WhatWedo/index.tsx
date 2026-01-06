"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";
import SaturnInSpaceMascot from "@/components/SVGComponents/SaturnInSpaceMascot";

interface ContentRef {
    whatIsBox?: HTMLDivElement | null;
    whatIsText?: HTMLDivElement | null;
    subtextBox?: HTMLDivElement | null;
    whatWeDoBox?: HTMLDivElement | null;
    pillarsContainer?: HTMLDivElement | null;
    imagesContainer?: HTMLDivElement | null;
}

const WhatWeDo = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const mascotImageRef = useRef<HTMLDivElement>(null);
    const mascotInnerRef = useRef<HTMLDivElement>(null);
    const cloudsRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<ContentRef>({});
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, TextPlugin);

        // Mouse move parallax effect for mascot
        const handleMouseMove = (e: MouseEvent) => {
            if (!mascotInnerRef.current) return;

            const rect = mascotInnerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const x = (e.clientX - centerX) * 0.15;
            const y = (e.clientY - centerY) * 0.15;

            gsap.to(mascotInnerRef.current, {
                x: x,
                y: y,
                duration: 0.5,
                overwrite: "auto"
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Animated clouds moving upward to create falling effect
        const cloudsTl = gsap.timeline({ repeat: -1 });
        if (cloudsRef.current) {
            cloudsTl.to(cloudsRef.current, {
                y: -500,
                duration: 8,
                ease: "none"
            })
                .set(cloudsRef.current, { y: 500 }, 0);
        }

        // Animate floating doodles
        const doodleElements = document.querySelectorAll('[data-doodle]');
        doodleElements.forEach((doodle, index) => {
            const duration = 12 + (index * 0.8);
            // Start from bottom (off-screen) and float to top (off-screen)
            gsap.set(doodle, { y: 800 });
            gsap.to(doodle, {
                y: -1200,
                rotation: 360 * (index % 2 === 0 ? 1 : -1),
                duration: duration,
                repeat: -1,
                ease: "none",
                delay: index * 0.8
            });
        });

        // background management
        gsap.to(bgRef.current, {
            opacity: 1,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "top 20%",
                scrub: 5,
                markers: false,
            },
        });

        // Main timeline for content parallax
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom center",
                pin: true,
                scrub: 5,
                markers: false,
            },
        });

        // Initial states
        gsap.set([mascotImageRef.current], {
            opacity: 0,
            scale: 0.8,
        });
        gsap.set(mascotImageRef.current, { x: 300 });

        // Set initial states for content boxes
        if (contentRef.current.whatIsBox) {
            gsap.set(contentRef.current.whatIsBox, { x: 200, scale: 0.5, opacity: 0 });
        }
        if (contentRef.current.subtextBox) {
            gsap.set(contentRef.current.subtextBox, { opacity: 0, y: -20 });
        }
        if (contentRef.current.whatWeDoBox) {
            gsap.set(contentRef.current.whatWeDoBox, { x: 200, scale: 0.5, opacity: 0 });
        }
        if (contentRef.current.pillarsContainer) {
            gsap.set(contentRef.current.pillarsContainer, { opacity: 0 });
        }
        if (contentRef.current.imagesContainer) {
            gsap.set(contentRef.current.imagesContainer, { opacity: 0 });
        }

        // Animation sequence
        tl.to([mascotImageRef.current], {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 2,
            ease: "power3.out",
        })
            // 2.1 - "What is Saturday School?" box appears from right
            .to(contentRef.current.whatIsBox!, {
                x: 0,
                scale: 1,
                opacity: 1,
                duration: 2,
                ease: "back.out",
            }, 0.5)
            // 2.2 - Subtext appears
            .to(contentRef.current.subtextBox!, {
                opacity: 1,
                y: 0,
                duration: 0.8,
            }, 1)
            // Pause
            .to({}, { duration: 2 })
            // 2.3 - Both boxes disappear to the left
            .to(
                [contentRef.current.whatIsBox!, contentRef.current.subtextBox!],
                {
                    x: -300,
                    scale: 0,
                    opacity: 0,
                    duration: 2,
                    ease: "back.in",
                },
                2.8
            )
            // 2.4 - "What We do?" box appears
            .to(contentRef.current.whatWeDoBox!, {
                x: 0,
                scale: 1,
                opacity: 1,
                duration: 2,
                ease: "back.out",
            }, 2.8)
            // 2.5 - Pillars appear one by one
            .to(contentRef.current.pillarsContainer!, {
                opacity: 1,
                duration: 0.5,
            }, 3.8)
            // 2.6-2.9 - Images appear and animate with text
            .to(contentRef.current.imagesContainer!, {
                opacity: 1,
                duration: 0.5,
            }, 4.3);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="z-[2] relative flex items-center justify-between w-full h-screen pl-0 pr-0 overflow-hidden"
        >
            {/* Animated Clouds Background */}
            <div
                ref={cloudsRef}
                className="absolute inset-0 -z-20 w-full h-[1000px]"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 20% 30%, rgba(251, 222, 79, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(251, 222, 79, 0.1) 0%, transparent 50%)
                    `,
                    backgroundSize: "200% 200%",
                }}
            >
                <svg className="w-full h-full opacity-20" viewBox="0 0 1200 600" preserveAspectRatio="none">
                    {/* Cloud shapes for parallax depth */}
                    <ellipse cx="150" cy="80" rx="120" ry="50" fill="rgba(255, 255, 255, 0.1)" />
                    <ellipse cx="400" cy="150" rx="140" ry="60" fill="rgba(255, 255, 255, 0.08)" />
                    <ellipse cx="900" cy="100" rx="110" ry="45" fill="rgba(255, 255, 255, 0.1)" />
                    <ellipse cx="600" cy="400" rx="130" ry="55" fill="rgba(255, 255, 255, 0.07)" />
                </svg>
            </div>

            {/* Background with space image */}
            <div
                ref={bgRef}
                className="absolute inset-0 -z-20 opacity-0 w-full h-full"
                style={{
                    backgroundImage: "url('/space-bg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            {/* Gradient overlay for smoother transition */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1e55a5]/500 to-transparent" />

            {/* Floating Doodles - Background Layer */}
            <div className="absolute inset-0 -z-5 pointer-events-none overflow-hidden">
                {/* Doodle Stars and Celestial Objects - Behind Mascot */}
                <div data-doodle className="absolute left-[10%] top-[20%]" style={{ filter: 'drop-shadow(0 0 10px rgba(251, 222, 79, 0.3))' }}>
                    <svg width="120" height="120" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30 5L36 20H52L40 29L45 44L30 35L15 44L20 29L8 20H24Z" fill="#fbde4f" stroke="#002060" strokeWidth="2" />
                    </svg>
                </div>

                <div data-doodle className="absolute right-[15%] top-[40%]" style={{ filter: 'drop-shadow(0 0 15px rgba(251, 222, 79, 0.4))' }}>
                    <svg width="160" height="160" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="40" cy="40" r="35" fill="#fbde4f" stroke="#002060" strokeWidth="2" />
                        <circle cx="25" cy="30" r="8" fill="#002060" opacity="0.4" />
                    </svg>
                </div>

                <div data-doodle className="absolute left-[25%] top-[60%]" style={{ filter: 'drop-shadow(0 0 12px rgba(251, 222, 79, 0.3))' }}>
                    <svg width="140" height="140" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="35" cy="35" r="25" fill="#2d5a8c" stroke="#fbde4f" strokeWidth="2" />
                        <ellipse cx="35" cy="35" rx="28" ry="8" fill="none" stroke="#fbde4f" strokeWidth="2" opacity="0.6" />
                    </svg>
                </div>

                <div data-doodle className="absolute right-[25%] top-[70%]" style={{ filter: 'drop-shadow(0 0 10px rgba(251, 222, 79, 0.3))' }}>
                    <svg width="100" height="100" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M25 5L28 15H38L30 20L33 30L25 25L17 30L20 20L12 15H22Z" fill="#fbde4f" stroke="#002060" strokeWidth="1.5" />
                    </svg>
                </div>
            </div>

            {/* Floating Doodles - Foreground Layer (over mascot) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
                <div data-doodle className="absolute left-[35%] top-[15%]" style={{ filter: 'drop-shadow(0 0 14px rgba(251, 222, 79, 0.4))' }}>
                    <svg width="150" height="150" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="37.5" cy="37.5" r="32" fill="#fbde4f" stroke="#002060" strokeWidth="2" />
                        <path d="M20 37.5Q37.5 20 55 37.5" fill="none" stroke="#002060" strokeWidth="2" />
                        <path d="M20 37.5Q37.5 55 55 37.5" fill="none" stroke="#002060" strokeWidth="2" />
                    </svg>
                </div>

                <div data-doodle className="absolute right-[20%] top-[50%]" style={{ filter: 'drop-shadow(0 0 11px rgba(251, 222, 79, 0.35))' }}>
                    <svg width="110" height="110" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27.5 5L31 16H43L33 23L37 34L27.5 27L18 34L22 23L12 16H24Z" fill="#fbde4f" stroke="#002060" strokeWidth="2" />
                    </svg>
                </div>

                <div data-doodle className="absolute left-[20%] top-[45%]" style={{ filter: 'drop-shadow(0 0 13px rgba(251, 222, 79, 0.4))' }}>
                    <svg width="130" height="130" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="32.5" cy="32.5" r="28" fill="#2d5a8c" stroke="#fbde4f" strokeWidth="2" />
                        <ellipse cx="32.5" cy="32.5" rx="31" ry="10" fill="none" stroke="#fbde4f" strokeWidth="2" opacity="0.7" />
                        <circle cx="32.5" cy="18" r="4" fill="#fbde4f" opacity="0.6" />
                    </svg>
                </div>
            </div>

            {/* Left - Mascots with Parallax */}
            <div ref={mascotImageRef} className="w-1/4 flex items-center justify-center overflow-visible">
                <div
                    ref={mascotInnerRef}
                    className="flex flex-col justify-center relative h-full w-full"
                    style={{
                        animation: 'mascotBob 3s ease-in-out infinite, mascotSway 4s ease-in-out infinite, mascotPulse 4s ease-in-out infinite'
                    }}
                >
                    <style>{`
                        @keyframes mascotBob {
                            0%, 100% { transform: translateY(0px); }
                            50% { transform: translateY(-25px); }
                        }
                        @keyframes mascotSway {
                            0%, 100% { transform: rotateZ(-3deg); }
                            50% { transform: rotateZ(3deg); }
                        }
                        @keyframes mascotPulse {
                            0%, 100% { transform: scale(1); }
                            50% { transform: scale(1.02); }
                        }
                        @keyframes headTilt {
                            0%, 100% { transform: rotateZ(-5deg); }
                            50% { transform: rotateZ(5deg); }
                        }
                        @keyframes armWave {
                            0%, 100% { transform: rotateZ(0deg) translateX(0); }
                            25% { transform: rotateZ(-20deg) translateX(-10px); }
                            50% { transform: rotateZ(-40deg) translateX(-15px); }
                            75% { transform: rotateZ(-20deg) translateX(-10px); }
                        }
                        @keyframes eyesBlink {
                            0%, 90%, 100% { opacity: 1; }
                            95% { opacity: 0.1; }
                        }
                        @keyframes mouthSmile {
                            0%, 100% { transform: scaleY(1); }
                            50% { transform: scaleY(1.1); }
                        }
                        @keyframes earWiggle {
                            0%, 100% { transform: rotateZ(0deg); }
                            20% { transform: rotateZ(-12deg); }
                            40% { transform: rotateZ(8deg); }
                            60% { transform: rotateZ(-8deg); }
                            80% { transform: rotateZ(12deg); }
                        }
                        @keyframes cheerfulJump {
                            0%, 100% { transform: translateY(0px) scaleY(1); }
                            25% { transform: translateY(-15px) scaleY(0.95); }
                            50% { transform: translateY(-30px) scaleY(0.9); }
                            75% { transform: translateY(-15px) scaleY(0.95); }
                        }
                        .mascot-svg {
                            filter: drop-shadow(0 10px 30px rgba(251, 222, 79, 0.15));
                            transition: filter 0.3s ease;
                        }
                        .mascot-svg:hover {
                            filter: drop-shadow(0 15px 40px rgba(251, 222, 79, 0.25));
                        }
                    `}</style>
                    <div className="mascot-svg">
                        <SaturnInSpaceMascot width={500} preserveAspectRatio="xMidYMid meet" />
                    </div>
                </div>
            </div>

            {/* Center - Content */}
            <div className="flex flex-col items-center p-20 pr-80 justify-start w-3/4 text-start z-10 relative h-full">
                {/* 2.1 - What is Saturday School? Box */}
                <div
                    ref={(el) => {
                        if (el) contentRef.current.whatIsBox = el;
                    }}
                    className="absolute bg-black/50 backdrop-blur px-8 py-6 rounded-lg mb-4"
                >
                    <h2 className="text-5xl font-bold text-white">Saturday School คืออะไร?</h2>
                </div>

                {/* 2.2 - Subtext Box */}
                <div
                    ref={(el) => {
                        if (el) contentRef.current.subtextBox = el;
                    }}
                    className="absolute bg-black/50 backdrop-blur right-1/4 top-24 mt-24 px-8 py-4 max-w-2xl"
                >
                    <p className="text-3xl text-white">
                        เราคือมูลนิธิเพื่อการศึกษาที่ไม่แสวงหากำไร เพื่อสร้างพื้นที่การเรียนรู้ที่เปิดโอกาสให้ทุกคนในสังคมมีส่วนร่วม เราเชื่อว่าทุกคนสามารถเป็นส่วนหนึ่งของการเปลี่ยนแปลงทางการศึกษา โดยการสนับสนุนให้เด็ก ๆ กล้าที่จะเดินตามความฝันและกลับมาสร้างเปลี่ยนแปลงให้กับชุมชนและสังคม
                    </p>
                </div>

                {/* 2.4 - What We Do? Box */}
                <div
                    ref={(el) => {
                        if (el) contentRef.current.whatWeDoBox = el;
                    }}
                    className="absolute bg-black/50 backdrop-blur px-8 py-6 rounded-lg"
                >
                    <h2 className="text-4xl font-bold text-white">เราทำอะไรบ้าง?</h2>
                </div>

                {/* 2.5 - Pillars Container */}
                <div
                    ref={(el) => {
                        if (el) contentRef.current.pillarsContainer = el;
                    }}
                    className="absolute top-1/3 w-full flex justify-around px-8 gap-6"
                >
                    {[1, 2, 3, 4].map((pillar) => (
                        <div
                            key={pillar}
                            className="flex flex-col items-center animate-fade-in-up"
                            style={{ animationDelay: `${pillar * 0.2}s` }}
                        >
                            <div className="w-20 h-20 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-2">
                                <span className="text-white text-2xl font-bold">{pillar}</span>
                            </div>
                            <p className="text-white text-sm font-semibold">Pillar {pillar}</p>
                        </div>
                    ))}
                </div>

                {/* 2.6-2.9 - Images with Text Container */}
                <div
                    ref={(el) => {
                        if (el) contentRef.current.imagesContainer = el;
                    }}
                    className="absolute top-2/3 w-full px-4 space-y-6"
                >
                    {/* Placeholder for images/content */}
                </div>
            </div>

        </div>
    );
};

export default WhatWeDo;