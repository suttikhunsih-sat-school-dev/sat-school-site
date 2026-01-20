"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import useMainPageSection from "../hooks/useMainPageSection";
import DoodleRectangleCTAButton from "../components/DoodleRectangleCTAButton";

const INITIAL_BACKGROUND_OPACITY_REDUCTION = 0.0;

const HomePage = () => {
  const {
    sections,
    sectionsRef,
    // videoRef,
    containerRef,
    logoRef,
    mainButtonGroupContainerRef,
    scrollY,
    scrollToSection,
  } = useMainPageSection()

  const opacity = useMemo(
    () => (1 - scrollY / 500) - INITIAL_BACKGROUND_OPACITY_REDUCTION,
    [scrollY]
  );

  return (
    <div ref={containerRef} className="relative">
      {/* Background video + overlay */}
      {/* <div className="fixed top-0 left-0 w-full h-screen z-[1]">
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
      </div> */}
      <div className="fixed top-0 left-0 w-full h-screen z-[1]">
        {/* <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ opacity }}
        >
          <source src="/sat-school-yt.mp4" type="video/mp4" />
        </video> */}
        <div
          className="absolute top-0 left-0 w-full h-full transition-colors"
          style={{
            backgroundColor: `rgba(30, 85, 165, ${1 - opacity})`,
          }}
        />
      </div>

      {/* <InteractiveCloud /> */}
      <div
        ref={logoRef}
        className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[4] flex justify-center items-center pointer-events-none w-[90%] md:w-[60%] lg:w-[50%]"
        style={{ willChange: 'transform' }}
      >
        <Image
          src="/Logo-Saturday-school-white.png"
          alt="Saturday School Logo"
          width={480}
          height={480}
          className="drop-shadow-xl h-auto"
          priority
        />
      </div>


      <div ref={mainButtonGroupContainerRef} className="fixed bottom-[60px] left-0 w-full flex justify-center items-center z-[4] gap-6">
        <DoodleRectangleCTAButton title="สมัครอาสา" onClickCallback={() => scrollToSection("section4")} />
        <DoodleRectangleCTAButton title="บริจาค" onClickCallback={() => scrollToSection("section4")} />
        <DoodleRectangleCTAButton title="CSR" onClickCallback={() => scrollToSection("section4")} />
      </div>


      {/* Scrollable content sections */}
      {sections.map((s, i) => (
        <section
          id={s.id}
          key={s.id}
          ref={(el) => { if (el) sectionsRef.current[i] = el; }}
          className={`relative flex items-center justify-center h-screen ${i <= 1 ? "bg-transparent" : "bg-[#1e55a5]"
            }`}
        >
          {s.content}
        </section>
      ))}

    </div>
  );
};

export default HomePage;
