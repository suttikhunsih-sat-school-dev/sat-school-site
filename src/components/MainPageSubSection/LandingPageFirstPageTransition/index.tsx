import BoyRocket from "@/components/BoyRocket";
import SatSchoolMainQuote from "@/components/DoodleQuote/SatSchoolMainQuote/SatSchoolMainQuote";
import InteractiveCloud from "@/components/InteractiveCloud";
import SaturnInSpaceMascotWrapper from "@/components/Mascot/SaturnInSpaceMascotWrapper";
import SaturnWithRedFlagMascotWrapper from "@/components/Mascot/SaturnWithRedFlagMascotWrapper";
import { useEffect, useRef } from "react";
import gsap from "gsap";
const LandingPageFirstPage = () => {
    const mascotImageRef = useRef<HTMLDivElement>(null);
    const mascotInnerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        // Initial states
        gsap.from([mascotImageRef.current], {
            // opacity: 0,
            y: 0,
        });
        gsap.to([mascotImageRef.current], {
            // opacity: 0,
        });

        // gsap.set(mascotImageRef.current, { x: 3000, y: -5000 });
    },[])
    return <div className="z-[3]">
        <SaturnInSpaceMascotWrapper mascotImageRef={mascotImageRef} mascotInnerRef={mascotInnerRef}  width={500}  />
    </div>
}

export default LandingPageFirstPage;