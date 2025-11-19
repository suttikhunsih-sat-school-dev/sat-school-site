"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";


const WhatWeDo = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const girlRef = useRef<HTMLDivElement>(null);
    const houseRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const slideShowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger, TextPlugin);

        // background management
        // Fade in background image with scroll
        gsap.to(bgRef.current, {
            opacity: 1,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "top 20%",
                scrub: 1,
                markers: false,
            },
        });

        // Main timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom center",
                pin: true, // This pins the section while animating
                scrub: false,
                markers: false, // Set to false in production
            },
        });

        // Initial states
        gsap.set([girlRef.current, houseRef.current], {
            opacity: 0,
            scale: 0.8,
        });
        gsap.set(girlRef.current, { x: -100 });
        gsap.set(houseRef.current, { x: 100 });
        gsap.set([textRef.current, descriptionRef.current], { opacity: 0 });
        gsap.set(slideShowRef.current, { opacity: 0 });

        // Animation sequence
        tl.to([girlRef.current, houseRef.current], {
            opacity: 1,
            scale: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
        })
            .to(textRef.current, {
                opacity: 1,
                duration: 0.5
            })
            .to(textRef.current, {
                text: "ภารกิจของโรงเรียนวันเสาร์",
                duration: 1,
                ease: "none"
            })
            .to({}, { duration: 1 }) // Pause
            .to(descriptionRef.current, {
                opacity: 1,
                duration: 0.5
            })
            .to(descriptionRef.current, {
                text: `เราสร้างพื้นที่การเรียนรู้เพื่อให้ "ทุกคน"เข้ามาพัฒนาการศึกษาไทย`,
                duration: 2,
                ease: "none"
            })
            .to(slideShowRef.current, {
                opacity: 1,
                duration: 1
            });

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
            {/* Left - Girl */}
            <div ref={girlRef} className="w-1/4">
                <Image
                    src="/BD10-guide-girl.png"
                    alt="guide girl cartoon"
                    width={300}
                    height={300}
                    className="drop-shadow-lg"
                    priority
                />
            </div>

            {/* Center - Content */}
            <div className="flex flex-col items-center justify-center w-2/4 text-center z-10">
                <h2 ref={textRef} className="text-5xl font-bold text-white mb-8"></h2>
                <p ref={descriptionRef} className="text-2xl text-white"></p>

                {/* Slideshow background */}
                <div
                    ref={slideShowRef}
                    className="absolute inset-0 -z-10 opacity-50"
                >
                    {/* Add your slideshow images here */}
                </div>
            </div>
            {/* <div className="absolute top-[10px] right-[300px] w-1/4">
                <div className="relative">
                    <Image
                        src="/viking.png"
                        alt="viking cartoon"
                        width={400}
                        height={400}
                        className="drop-shadow-lg"
                        priority
                    />
                </div>
            </div>
            <div className="w-1/4">
                <div className="relative">
                    <Image
                        src="/art-fun-house.png"
                        alt="art fun house cartoon"
                        width={1000}
                        height={1000}
                        className="drop-shadow-lg"
                        priority
                    />
                </div>
            </div>
            <div className="absolute bottom-[20px] right-[280px] w-1/5">
                <div className="relative">
                    <Image
                        src="/merry-go-cow.png"
                        alt="merry-go-cow cartoon"
                        width={400}
                        height={400}
                        className="drop-shadow-lg"
                        priority
                    />
                </div>
            </div> */}

        </div>
    );
};

export default WhatWeDo;