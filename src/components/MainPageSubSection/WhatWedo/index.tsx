"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";
import SaturnInSpaceMascot from "@/components/SVGComponents/SaturnInSpaceMascot";
// import { ReactComponent as SatInSpace } from '/saturn-in-space.svg';

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
    // const houseRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<ContentRef>({});

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, TextPlugin);

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
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="z-[2] relative flex items-center justify-between w-full h-screen pl-0 pr-0"
        >
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
            {/* Left - Mascots */}
            <div ref={mascotImageRef} className="w-1/4 flex items-center justify-center overflow-visible">
                <div className="flex flex-col justify-center relative h-full w-full">
                    <SaturnInSpaceMascot width={500} preserveAspectRatio="xMidYMid meet" />
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
                        {/* เราคือมูลนิธิเพื่อการศึกษาที่ไม่แสวงหากำไร เพื่อสร้างพื้นที่การเรียนรู้ที่เปิดโอกาสให้ทุกคนในสังคมมีส่วนร่วม เราเชื่อว่าทุกคนสามารถเป็นส่วนหนึ่งของการเปลี่ยนแปลงทางการศึกษา โดยการสนับสนุนให้เด็ก ๆ กล้าที่จะเดินตามความฝันและกลับมาสร้างเปลี่ยนแปลงให้กับชุมชนและสังคม */}
                        มูลนิธิโรงเรียนวันเสาร์เป็นองค์กรไม่แสวงหาผลกำไรที่เชื่อว่า “ทุกคนในสังคมสามารถเป็นส่วนหนึ่งในการพัฒนาการศึกษาไทยได้” เราร่วมสร้างพื้นที่การเรียนรู้นอกห้องเรียนที่เปิดกว้างสำหรับเด็กและเยาวชนไทย
                    </p>
                    <br className=""/>
                     <p className="text-3xl text-white">
                    โดยดึงพลังจากอาสาสมัครหลากหลายอาชีพให้เข้ามาแบ่งปันทักษะ ความรู้ แรงบันดาลใจในห้องเรียนวันเสาร์และโครงการต่าง ๆ ของมูลนิธิ ผสานกับพลังสำคัญจากทุกภาคส่วนในสังคมร่วมส่งเสริมให้เด็กไทยกล้าทำตามคำฝัน และเติบโตไปเป็นคนที่มีพลังพร้อมกลับมาแบ่งปันให้คนรอบข้างและสังคม
                    </p>
                </div>

                {/* 2.4 - What We Do? Box */}
                {/* <div
                    ref={(el) => {
                        if (el) contentRef.current.whatWeDoBox = el;
                    }}
                    className="absolute bg-black/50 backdrop-blur px-8 py-6 rounded-lg"
                >
                    <h2 className="text-4xl font-bold text-white">เราทำอะไรบ้าง?</h2>
                </div> */}

                {/* 2.5 - Pillars Container */}
                {/* <div
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
                </div> */}

                {/* 2.6-2.9 - Images with Text Container */}
                {/* <div
                    ref={(el) => {
                        if (el) contentRef.current.imagesContainer = el;
                    }}
                    className="absolute top-2/3 w-full px-4 space-y-6"
                >
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="relative w-full h-48 flex items-center gap-4">
                            <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 hover:scale-95 transition-transform">
                                <span className="text-white text-3xl font-bold">Image {item}</span>
                            </div>
                            <div className="absolute bottom-4 left-4 bg-black/60 px-4 py-2 rounded">
                                <p className="text-white font-bold">Volunteer Project {item}</p>
                            </div>
                        </div>
                    ))}
                </div> */}
            </div>

        </div>
    );
};

export default WhatWeDo;