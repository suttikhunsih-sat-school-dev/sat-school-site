"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import useMainPageSection from "./hooks/useMainPageSection";
import DoodleBallCTAButton from "./components/DoodleBallCTAButton";
import SatSchoolMainQuote from "./components/DoodleQuote/SatSchoolMainQuote/SatSchoolMainQuote";

const INITIAL_BACKGROUND_OPACITY_REDUCTION = 0.5;

const HomePage = () => {
  const {
    sections,
    sectionsRef,
    videoRef,
    containerRef,
    logoRef,
    scrollY,
    scrollToSection,
  } = useMainPageSection()

  const opacity = useMemo(
    () => (1 - scrollY / 500) - INITIAL_BACKGROUND_OPACITY_REDUCTION,
    [scrollY]
  );

  return (
    <div ref={containerRef} className="relative">
      <div className="flex flex-col gap-2 fixed top-10 md:bottom-40 right-[0px] transform -translate-x-1/2 z-40 space-y-4 md:space-y-0 md:space-x-4 w-[90%] md:w-auto">
        <DoodleBallCTAButton title="สมัครอาสา" onClickCallback={() => scrollToSection("section4")} />
        <DoodleBallCTAButton title="บริจาค" onClickCallback={() => scrollToSection("section4")} />
        <DoodleBallCTAButton title="CSR" onClickCallback={() => scrollToSection("section4")} />
      </div>
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
      <div className="fixed top-1/3 left-0 w-full h-[340px] z-[2] flex justify-center items-center pointer-events-none">
        <SatSchoolMainQuote />
      </div>

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
