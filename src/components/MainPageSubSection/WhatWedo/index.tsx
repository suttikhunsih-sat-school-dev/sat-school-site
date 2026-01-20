"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";
import SaturnInSpaceMascot from "@/components/SVGComponents/SaturnInSpaceMascot";

interface ContentRef {
    whatIsBox?: HTMLDivElement | null;
    whatIsText?: HTMLDivElement | null;
    mainContent?: HTMLDivElement | null;
    impactStatement?: HTMLDivElement | null;
    visionBox?: HTMLDivElement | null;
    missionBox?: HTMLDivElement | null;
    subtextBox?: HTMLDivElement | null;
    whatWeDoBox?: HTMLDivElement | null;
    pillarsContainer?: HTMLDivElement | null;
    imagesContainer?: HTMLDivElement | null;
    // Step-by-step content refs
    step1?: HTMLDivElement | null;
    step2?: HTMLDivElement | null;
    imageA?: HTMLDivElement | null;
    step3?: HTMLDivElement | null;
    imageB?: HTMLDivElement | null;
    step4?: HTMLDivElement | null;
    imageC?: HTMLDivElement | null;
    step5?: HTMLDivElement | null;
}

const WhatWeDo = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const mascotImageRef = useRef<HTMLDivElement>(null);
    const mascotInnerRef = useRef<HTMLDivElement>(null);
    const cloudsRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<ContentRef>({});
    // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, TextPlugin);

        // Random idle floating animation for mascot
        const floatingTl = gsap.timeline({ repeat: -1 });
        floatingTl.to(mascotInnerRef.current, {
            x: () => gsap.utils.random(-30, 30),
            y: () => gsap.utils.random(-40, 40),
            duration: () => gsap.utils.random(4, 6),
            ease: "sine.inOut",
        })
            .to(mascotInnerRef.current, {
                rotation: () => gsap.utils.random(-5, 5),
                duration: () => gsap.utils.random(3, 5),
                ease: "sine.inOut",
            }, 0);

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

        // Animate floating doodles with scroll acceleration
        const doodleElements = document.querySelectorAll('[data-doodle]');
        doodleElements.forEach((doodle, index) => {
            const duration = 12 + (index * 0.8);
            // Start from bottom (off-screen) and float to top (off-screen)
            gsap.set(doodle, { y: 800 });
            const doodleTl = gsap.to(doodle, {
                y: -1200,
                rotation: 360 * (index % 2 === 0 ? 1 : -1),
                duration: duration,
                repeat: -1,
                ease: "none",
                delay: index * 0.8
            });

            // Add scroll-triggered speed-up and shake effect
            ScrollTrigger.create({
                trigger: containerRef.current,
                onUpdate: (self) => {
                    const speed = 1 + (self.getVelocity() / 100) * 0.3; // Speed up based on scroll velocity
                    doodleTl.timeScale(Math.max(0.5, speed));
                }
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

        // Mascot shake effect on scroll
        ScrollTrigger.create({
            trigger: containerRef.current,
            onUpdate: (self) => {
                const velocity = Math.abs(self.getVelocity());
                if (velocity > 0 && mascotInnerRef.current) {
                    const shake = (velocity / 500) * 8; // Intensity based on scroll speed
                    gsap.to(mascotInnerRef.current, {
                        x: () => `+=${gsap.utils.random(-shake, shake)}`,
                        y: () => `+=${gsap.utils.random(-shake, shake)}`,
                        rotation: () => `+=${gsap.utils.random(-2, 2)}`,
                        duration: 0.05,
                        overwrite: "auto",
                        ease: "power1.inOut"
                    });
                }
            }
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
            // opacity: 0,
            scale: 0.8,
        });
        gsap.set(mascotImageRef.current, { x: 3000, y: -5000 });

        // Set initial states for content boxes
        if (contentRef.current.mainContent) {
            gsap.set(contentRef.current.mainContent, { opacity: 0, scale: 0.95 });
        }
        if (contentRef.current.impactStatement) {
            gsap.set(contentRef.current.impactStatement, { opacity: 0, scale: 0.95 });
        }
        if (contentRef.current.visionBox) {
            gsap.set(contentRef.current.visionBox, { opacity: 0, x: -100 });
        }
        if (contentRef.current.missionBox) {
            gsap.set(contentRef.current.missionBox, { opacity: 0, x: 100 });
        }
        // Step-by-step initial states
        if (contentRef.current.step1) {
            gsap.set(contentRef.current.step1, { opacity: 0, scale: 0.95, y: 20 });
        }
        if (contentRef.current.step2) {
            gsap.set(contentRef.current.step2, { opacity: 0, scale: 0.95, x: 100 });
        }
        if (contentRef.current.imageA) {
            gsap.set(contentRef.current.imageA, { opacity: 0, scale: 0.8 });
        }
        if (contentRef.current.step3) {
            gsap.set(contentRef.current.step3, { opacity: 0, scale: 0.95, y: 20 });
        }
        if (contentRef.current.imageB) {
            gsap.set(contentRef.current.imageB, { opacity: 0, scale: 0.8, x: -50 });
        }
        if (contentRef.current.step4) {
            gsap.set(contentRef.current.step4, { opacity: 0, scale: 0.95, y: 20 });
        }
        if (contentRef.current.imageC) {
            gsap.set(contentRef.current.imageC, { opacity: 0, scale: 0.8 });
        }
        if (contentRef.current.step5) {
            gsap.set(contentRef.current.step5, { opacity: 0, scale: 0.95, y: 20 });
        }

        // Animation sequence - 8 detailed steps based on scroll
        tl.to([mascotImageRef.current], {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            duration: 4,
            ease: "power3.out",
        })
            // Step 1: Text appears with typing animation
            .to(contentRef.current.step1!, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 2,
                ease: "power2.out",
            }, 1)
            // Type step 1 text - typing effect
            .to(contentRef.current.step1!, {
                text: "มูลนิธิโรงเรียนวันเสาร์เป็นองค์กรไม่แสวงหาผลกำไรที่เชื่อว่า",
                duration: 3.5,
                ease: "none",
                delay: 0.5,
            }, 1)
            // Step 2: Second box appears beside first
            .to(contentRef.current.step2!, {
                opacity: 1,
                scale: 1,
                x: 0,
                duration: 2,
                ease: "power2.out",
            }, 2.5)
            // Hold step 1 & 2 visible
            .to({}, { duration: 4 })
            // Step 3: Image A appears
            .to(contentRef.current.imageA!, {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: "back.out",
            })
            // Hold
            .to({}, { duration: 3 })
            // Step 4: New box with typing animation
            .to(contentRef.current.step3!, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 2,
                ease: "power2.out",
            })
            // Type step 3 text
            .to(contentRef.current.step3!, {
                text: "เราร่วมสร้างพื้นที่การเรียนรู้นอกห้องเรียนที่เปิดกว้างสำหรับเด็กและเยาวชนไทย",
                duration: 3.5,
                ease: "none",
                delay: 0.5,
            }, "-=1.5")
            // Hold
            .to({}, { duration: 2 })
            // Step 5: Image B appears
            .to(contentRef.current.imageB!, {
                opacity: 1,
                scale: 1,
                x: 0,
                duration: 1.5,
                ease: "back.out",
            })
            // Hold
            .to({}, { duration: 3 })
            // Step 6: New box with typing animation
            .to(contentRef.current.step4!, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 2,
                ease: "power2.out",
            })
            // Type step 4 text
            .to(contentRef.current.step4!, {
                text: "โดยดึงพลังจากอาสาสมัครหลากหลายอาชีพให้เข้ามาแบ่งปันทักษะ ความรู้ แรงบันดาลใจในห้องเรียนวันเสาร์และโครงการต่าง ๆ ของมูลนิธิ",
                duration: 4,
                ease: "none",
                delay: 0.5,
            }, "-=1.5")
            // Hold
            .to({}, { duration: 2 })
            // Step 7: Image C appears
            .to(contentRef.current.imageC!, {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: "back.out",
            })
            // Hold
            .to({}, { duration: 3 })
            // Step 8: Final box appears
            .to(contentRef.current.step5!, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 2,
                ease: "power2.out",
            })
            // Hold final content
            .to({}, { duration: 5 })
            // === STAGE 2: Fade out first stage and show impact, vision, mission ===
            // Fade out all step boxes and images
            .to([
                contentRef.current.step1,
                contentRef.current.step2,
                contentRef.current.step3,
                contentRef.current.step4,
                contentRef.current.step5,
                contentRef.current.imageA,
                contentRef.current.imageB,
                contentRef.current.imageC
            ], {
                opacity: 0,
                scale: 0.95,
                duration: 2.5,
                ease: "power2.in",
                stagger: 0.2,
            })
            // Show Impact Statement
            .to(contentRef.current.impactStatement!, {
                opacity: 1,
                scale: 1,
                duration: 2,
                ease: "power2.out",
            }, "-=1")
            // Hold
            .to({}, { duration: 4 })
            // Show Vision and Mission boxes
            .to([contentRef.current.visionBox, contentRef.current.missionBox], {
                opacity: 1,
                x: 0,
                duration: 2,
                ease: "power2.out",
                stagger: 0.5,
            })
            // Hold final stage
            .to({}, { duration: 5 })

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

            {/* Center - Content */}
            <div className="flex flex-col items-center p-20 pr-80 justify-start w-3/4 text-start z-10 relative h-full overflow-y-auto">
                {/* Step 1: First text with typing animation */}
                <div
                    ref={(el) => {
                        if (el) contentRef.current.step1 = el;
                    }}
                    className="absolute top-40 left-20 bg-black/50 backdrop-blur px-8 py-6 rounded-lg max-w-2xl"
                >
                    <p className="text-lg text-white leading-relaxed h-16"></p>
                </div>

                {/* Step 2: Second box beside with flashy text */}
                <div
                    ref={(el) => {
                        if (el) contentRef.current.step2 = el;
                    }}
                    className="absolute top-40 right-32 bg-yellow-400/80 backdrop-blur px-8 py-6 rounded-lg max-w-xl shadow-lg"
                    style={{ boxShadow: '0 0 30px rgba(251, 222, 79, 0.5)' }}
                >
                    <p className="text-lg font-bold text-blue-900 leading-relaxed">
                        "ทุกคนในสังคมสามารถเป็นส่วนหนึ่งในการพัฒนาการศึกษาไทยได้"
                    </p>
                </div>

                {/* Step 3: Image A */}
                <div
                    ref={(el) => {
                        if (el) contentRef.current.imageA = el;
                    }}
                    className="absolute top-80 left-32 w-48 h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg shadow-lg flex items-center justify-center"
                    style={{ boxShadow: '0 10px 40px rgba(251, 222, 79, 0.3)' }}
                >
                    <div className="text-center text-white">
                        <p className="text-sm font-semibold">รูปภาพ A</p>
                        <p className="text-xs">Image A</p>
                    </div>
                </div>

                {/* Step 4: New box with typing animation */}
                <div
                    ref={(el) => {
                        if (el) contentRef.current.step3 = el;
                    }}
                    className="absolute top-96 left-20 bg-black/50 backdrop-blur px-8 py-6 rounded-lg max-w-2xl"
                >
                    <p className="text-lg text-white leading-relaxed h-20"></p>
                </div>

                {/* Step 5: Image B */}
                <div
                    ref={(el) => {
                        if (el) contentRef.current.imageB = el;
                    }}
                    className="absolute top-96 right-32 w-40 h-40 bg-gradient-to-br from-green-400 to-teal-500 rounded-lg shadow-lg flex items-center justify-center"
                    style={{ boxShadow: '0 10px 40px rgba(251, 222, 79, 0.3)' }}
                >
                    <div className="text-center text-white">
                        <p className="text-sm font-semibold">รูปภาพ B</p>
                        <p className="text-xs">Image B</p>
                    </div>
                </div>

                {/* Step 6: New box with typing animation */}
                <div
                    ref={(el) => {
                        if (el) contentRef.current.step4 = el;
                    }}
                    className="absolute top-[32rem] left-20 bg-black/50 backdrop-blur px-8 py-6 rounded-lg max-w-2xl"
                >
                    <p className="text-lg text-white leading-relaxed h-24"></p>
                </div>

                {/* Step 7: Image C */}
                <div
                    ref={(el) => {
                        if (el) contentRef.current.imageC = el;
                    }}
                    className="absolute top-[32rem] right-32 w-40 h-40 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg shadow-lg flex items-center justify-center"
                    style={{ boxShadow: '0 10px 40px rgba(251, 222, 79, 0.3)' }}
                >
                    <div className="text-center text-white">
                        <p className="text-sm font-semibold">รูปภาพ C</p>
                        <p className="text-xs">Image C</p>
                    </div>
                </div>

                {/* Step 8: Final box */}
                <div
                    ref={(el) => {
                        if (el) contentRef.current.step5 = el;
                    }}
                    className="absolute top-[48rem] left-20 bg-black/50 backdrop-blur px-8 py-6 rounded-lg max-w-3xl"
                >
                    <p className="text-lg text-white leading-relaxed">
                        ผสานกับพลังสำคัญจากทุกภาคส่วนในสังคมร่วมส่งเสริมให้เด็กไทยกล้าทำตามคำฝัน และเติบโตไปเป็นคนที่มีพลังพร้อมกลับมาแบ่งปันให้คนรอบข้างและสังคม
                    </p>
                </div>

                {/* Impact Statement and Vision/Mission for second stage */}
                <div
                    ref={(el) => {
                        if (el) contentRef.current.impactStatement = el;
                    }}
                    className="absolute top-40 left-20 bg-black/50 backdrop-blur px-8 py-6 rounded-lg max-w-3xl"
                >
                    <p className="text-xl text-white leading-relaxed font-semibold">
                        "เราตั้งใจจะเปลี่ยนชีวิตคนให้เชื่อมั่นในศักยภาพของตนเอง กล้าทำตามความฝัน สามารถรับผิดชอบชีวิตตนเองได้ และพร้อมแบ่งปันให้กับคนรอบข้างและสังคม"
                    </p>
                </div>

                <div
                    ref={(el) => {
                        if (el) contentRef.current.visionBox = el;
                    }}
                    className="absolute top-1/2 left-20 bg-blue-900/60 backdrop-blur px-8 py-6 rounded-lg max-w-sm"
                >
                    <h3 className="text-2xl font-bold text-yellow-300 mb-3">วิสัยทัศน์</h3>
                    <p className="text-white leading-relaxed">
                        เด็กทุกคนกล้าเดินตามความฝัน และสร้างความเปลี่ยนแปลงให้กับชุมชนและสังคมของเขา
                    </p>
                </div>

                <div
                    ref={(el) => {
                        if (el) contentRef.current.missionBox = el;
                    }}
                    className="absolute bottom-1/5 right-32 bg-blue-900/60 backdrop-blur px-8 py-6 rounded-lg max-w-sm"
                >
                    <h3 className="text-2xl font-bold text-yellow-300 mb-3">พันธกิจ</h3>
                    <p className="text-white leading-relaxed">
                        เสริมพลังให้คนทั่วไปเข้ามามีส่วนร่วมในการเปลี่ยนแปลงเชิงบวกกับการศึกษาไทย
                    </p>
                </div>
            </div>
            {/* Right - Mascots with Parallax */}
            <div ref={mascotImageRef} className="w-1/4 flex items-center justify-center overflow-visible">
                <div
                    ref={mascotInnerRef}
                    className="flex flex-col justify-center relative h-full w-full transition-transform"
                // style={{
                //     animation: 'mascotBob 3s ease-in-out infinite, mascotSway 4s ease-in-out infinite, mascotPulse 4s ease-in-out infinite'
                // }}
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

        </div>
    );
};

export default WhatWeDo;