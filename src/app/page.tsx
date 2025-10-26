"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import CTAButton from "./components/CTAButton";
import HamburgerMenu from './components/HamburgerMenu';

const INITIAL_BACKGROUND_OPACITY_REDUCTION = 0.5;

const HomePage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  // const buttonGroupRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const [scrollY, setScrollY] = useState(0);

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
      scale: 0.5,
      yPercent: -50,
      top: "15%",
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

  const opacity = useMemo(
    () => (1 - scrollY / 500) - INITIAL_BACKGROUND_OPACITY_REDUCTION,
    [scrollY]
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const sections = [
    {
      id: "section1", content:
        <div className="fixed bottom-20 md:bottom-40 left-1/2 transform -translate-x-1/2 z-40 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-[90%] md:w-auto">
          <CTAButton title="Donate" onClickCallback={() => scrollToSection("section4")} />
          <CTAButton title="Volunteer" onClickCallback={() => scrollToSection("section4")} />
          <CTAButton title="CSR (company)" onClickCallback={() => scrollToSection("section4")} />
        </div>
    },
    {
      id: "section2",
      content: (
        <div className="animate-content text-white text-4xl text-center">
          <p className="text-lg mt-2">
            mission / vision , what we do exactly
          </p>
        </div>
      ),
    },
    {
      id: "section3",
      content: (
        <div className="animate-content text-white text-4xl text-center">
          <p>Our Impact, projects</p>
          <p className="text-lg mt-2">More than 10,000 kids across Thailand have joined.</p>
          <p className="text-lg mt-2">All projects</p>
        </div>
      ),
    },
    {
      id: "section4",
      content: (
        <div className="animate-content text-white text-4xl text-center">
          <p>Join Us / Donate / Support</p>
          <p className="text-lg mt-2">Be part of our next chapter!</p>
        </div>
      ),
    },
  ];

  return (
    <div ref={containerRef} className="relative">
      {/* Background video + overlay */}
      <div className="fixed top-0 left-0 w-full h-screen z-[1]">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ opacity }}
        >
          <source src="/sat-school-yt.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute top-0 left-0 w-full h-full transition-colors"
          style={{
            backgroundColor: `rgba(30, 85, 165, ${1 - opacity})`,
          }}
        />
      </div>

      {/* Fixed logo — always visible for section 1 & 2 */}
      <div
        ref={logoRef}
        className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] flex justify-center items-center pointer-events-none w-[90%] md:w-[60%] lg:w-[50%]"
        style={{ willChange: 'transform' }}
      >
        <Image
          src="/sat-school-logo-no-bg.png"
          alt="Saturday School Logo"
          width={1000}
          height={1000}
          className="drop-shadow-lg w-full h-auto"
          priority
        />
      </div>

      {/* Navigation (for demo) */}
      <HamburgerMenu />


      {/* Scrollable content sections */}
      {sections.map((s, i) => (
        <section
          id={s.id}
          key={s.id}
          ref={(el) => { if (el) sectionsRef.current[i] = el; }}
          className={`relative flex items-center justify-center h-screen px-8 ${i <= 1 ? "bg-transparent" : "bg-[#1e55a5]"
            }`}
        >
          {s.content}
        </section>
      ))}
    </div>
  );
};

export default HomePage;
