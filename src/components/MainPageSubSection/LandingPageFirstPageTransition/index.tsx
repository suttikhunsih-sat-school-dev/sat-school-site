import BoyRocket from "@/components/BoyRocket";
import SatSchoolMainQuote from "@/components/DoodleQuote/SatSchoolMainQuote/SatSchoolMainQuote";
import InteractiveCloud from "@/components/InteractiveCloud";
import SaturnInSpaceMascotWrapper from "@/components/Mascot/SaturnInSpaceMascotWrapper";
import SaturnWithRedFlagMascotWrapper from "@/components/Mascot/SaturnWithRedFlagMascotWrapper";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
const LandingPageFirstPageTransition = () => {
    const mascotImageRef = useRef<HTMLDivElement>(null);
    const mascotInnerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    
                    // Set initial state - mascot starts high above and small
                    gsap.set(mascotImageRef.current, {
                        y: -1000,
                        scale: 0.3,
                        opacity: 1,
                    });

                    // Animate mascot falling from above with growing scale
                    gsap.to(mascotImageRef.current, {
                        y: 0,
                        scale: 1,
                        duration: 2.5,
                        ease: "power2.inOut",
                    });
                }
            },
            { threshold: 0.3 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, [hasAnimated]);
    return <div className="z-[3]" ref={containerRef}>
        <SaturnInSpaceMascotWrapper mascotImageRef={mascotImageRef} mascotInnerRef={mascotInnerRef}  width={500}  />
    </div>
}

export default LandingPageFirstPageTransition;