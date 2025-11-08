import { useEffect, useRef, useState } from "react";
import DoodleBallCTAButton from "../components/DoodleBallCTAButton";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import WhatWeDo from "../components/MainPageSubSection/WhatWedo";

const useMainPageSection = () => {
    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };
    const [scrollY, setScrollY] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionsRef = useRef<HTMLElement[]>([]);
    const sections = [
        {
            id: "section1", content: <></>
        },
        {
            id: "section2",
            content: (
                <WhatWeDo />
            ),
        },
        {
            id: "section3",
            content: (
                <div className="z-[2] animate-content text-white text-4xl text-center">
                    <p>Our Impact, projects</p>
                    <p className="text-lg mt-2">More than 10,000 kids across Thailand have joined.</p>
                    <p className="text-lg mt-2">All projects</p>
                </div>
            ),
        },
        {
            id: "section4",
            content: (
                <div className="z-[2] animate-content text-white text-4xl text-center">
                    <p>Join Us / Donate / Support</p>
                    <p className="text-lg mt-2">Be part of our next chapter!</p>
                </div>
            ),
        },
    ];

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", onScroll);

        // Video fade-out when section 2 starts appearing
        gsap.to(videoRef.current, {
            opacity: 0,
            scrollTrigger: {
                trigger: sectionsRef.current[1],
                start: "top 80%",
                end: "top 20%",
                scrub: true,
            },
        });

        // Logo move up and shrink
        gsap.to(logoRef.current, {
            scale: 0.3,
            yPercent: -50,
            top: "10%",
            left: "10%",
            scrollTrigger: {
                trigger: sectionsRef.current[1],
                start: "top bottom",
                end: "top 20%",
                scrub: 1,
                markers: false, // Set to true for debugging
            },
        });

        // Animate section content
        sectionsRef.current.forEach((section, i) => {
            if (i === 0) return;
            gsap.from(section.querySelectorAll(".animate-content"), {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    end: "top 30%",
                    toggleActions: "play none none reverse",
                },
            });
        });

        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return { scrollToSection, sections, sectionsRef, videoRef, containerRef, logoRef, scrollY };
};

export default useMainPageSection;