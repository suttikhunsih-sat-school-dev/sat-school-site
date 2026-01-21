
import SaturnInSpaceMascotWrapper from "@/components/Mascot/SaturnInSpaceMascotWrapper";
import { RefObject, useEffect, useRef } from "react";
import gsap from "gsap";

interface LandingPageFirstPageTransitionProps {
    sectionsRef: RefObject<HTMLElement[]>
}
const LandingPageFirstPageTransition = ({sectionsRef} : LandingPageFirstPageTransitionProps) => {
    const mascotImageRef = useRef<HTMLDivElement>(null);
    const mascotInnerRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Set initial state - mascot starts high above and small
        gsap.set('[data-falling-mascot]', {
            y: -1000,
            scale: 0.3,
        });
    }, []);

    return <div className="z-[3]" ref={containerRef} data-transition-section>
        <div data-falling-mascot ref={mascotImageRef}>
            <SaturnInSpaceMascotWrapper mascotImageRef={mascotImageRef} mascotInnerRef={mascotInnerRef}  width={500}  />
        </div>
    </div>
}

export default LandingPageFirstPageTransition;