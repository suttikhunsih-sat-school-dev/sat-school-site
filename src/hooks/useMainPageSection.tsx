import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import WhatWeDo from "../components/MainPageSubSection/WhatWedo";
import ProjectsPillarForVolunteerSection from "../components/MainPageSubSection/ProjectsPillarForVolunteerSection";
import LandingPageFirstPage from "@/components/MainPageSubSection/LandingPageFirstPage";

const useMainPageSection = () => {
    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };
    const [scrollY, setScrollY] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const quoteRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionsRef = useRef<HTMLElement[]>([]);
    const sections = [
        {
            id: "section1", content: (
                <LandingPageFirstPage />
            )
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
                <ProjectsPillarForVolunteerSection />
            ),
        },
        // {
        //     id: "section4",
        //     content: (
        //         <div className="z-[2] animate-content text-white text-4xl text-center">
        //             <ProjectsPillarForVolunteerSection />
        //         </div>
        //     ),
        // },
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

        gsap.to(quoteRef.current, {
            opacity: 0,
            y: 50,
            scrollTrigger: {
                trigger: sectionsRef.current[1],
                start: "top 80%",
                end: "top 20%",
                scrub: 1,
                markers: false, // Set to true for debugging
            },
        });

        // Animate out mascot when entering section 2
        gsap.to('[data-mascot-element]', {
            opacity: 0,
            x: -300,
            duration: 0.8,
            scrollTrigger: {
                trigger: sectionsRef.current[1],
                start: "top 80%",
                end: "top 20%",
                scrub: 1,
            },
        });

        // Animate out cloud when entering section 2
        gsap.to('[data-cloud-element]', {
            opacity: 0,
            y: 100,
            duration: 0.8,
            scrollTrigger: {
                trigger: sectionsRef.current[1],
                start: "top 80%",
                end: "top 20%",
                scrub: 1,
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
    return { scrollToSection, sections, sectionsRef, videoRef, containerRef, logoRef, quoteRef, scrollY };
};

export default useMainPageSection;