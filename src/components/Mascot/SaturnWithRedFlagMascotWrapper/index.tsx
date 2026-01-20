import SaturnWithRedFlagMascot from "@/components/SVGComponents/SaturnWithRedFlagMascot"
import { useEffect, useRef } from "react";
import gsap from "gsap";

const SaturnWithRedFlagMascotWrapper = () => {
    const mascotImageRef = useRef<HTMLDivElement>(null);
    const mascotInnerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!mascotInnerRef.current) return;

            const rect = mascotInnerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const x = (e.clientX - centerX) * 0.08;
            const y = (e.clientY - centerY) * 0.08;

            gsap.to(mascotInnerRef.current, {
                x: x,
                y: y,
                duration: 0.5,
                overwrite: "auto"
            });
        };
        // Initial states - set to visible
        gsap.set([mascotImageRef.current], {
            opacity: 1,
            scale: 1,
        });
        gsap.set(mascotImageRef.current, { x: 0 });

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        }

    }, [])
    return <div ref={mascotImageRef} className="flex items-center justify-center overflow-visible h-auto w-auto">
        <div
            ref={mascotInnerRef}
            className="flex flex-col justify-center relative h-full w-full transition-transform"
        >
            <style>{`
                        @keyframes mascotBob {
                            0%, 100% { transform: translateY(0px); }
                            50% { transform: translateY(-25px); }
                        }
                        @keyframes mascotSway {
                            0%, 100% { transform: rotateZ(-3deg); }
                            50% { transform: rotateZ(3deg); }
                        }
                        @keyframes mascotPulse {
                            0%, 100% { transform: scale(1); }
                            50% { transform: scale(1.02); }
                        }
                        @keyframes headTilt {
                            0%, 100% { transform: rotateZ(-5deg); }
                            50% { transform: rotateZ(5deg); }
                        }
                        @keyframes armWave {
                            0%, 100% { transform: rotateZ(0deg) translateX(0); }
                            25% { transform: rotateZ(-20deg) translateX(-10px); }
                            50% { transform: rotateZ(-40deg) translateX(-15px); }
                            75% { transform: rotateZ(-20deg) translateX(-10px); }
                        }
                        @keyframes eyesBlink {
                            0%, 90%, 100% { opacity: 1; }
                            95% { opacity: 0.1; }
                        }
                        @keyframes mouthSmile {
                            0%, 100% { transform: scaleY(1); }
                            50% { transform: scaleY(1.1); }
                        }
                        @keyframes earWiggle {
                            0%, 100% { transform: rotateZ(0deg); }
                            20% { transform: rotateZ(-12deg); }
                            40% { transform: rotateZ(8deg); }
                            60% { transform: rotateZ(-8deg); }
                            80% { transform: rotateZ(12deg); }
                        }
                        @keyframes cheerfulJump {
                            0%, 100% { transform: translateY(0px) scaleY(1); }
                            25% { transform: translateY(-15px) scaleY(0.95); }
                            50% { transform: translateY(-30px) scaleY(0.9); }
                            75% { transform: translateY(-15px) scaleY(0.95); }
                        }
                        .mascot-svg {
                            filter: drop-shadow(0 10px 30px rgba(251, 222, 79, 0.15));
                            transition: filter 0.3s ease;
                        }
                        .mascot-svg:hover {
                            filter: drop-shadow(0 15px 40px rgba(251, 222, 79, 0.25));
                        }
                    `}</style>
            <div className="mascot-svg">
                <SaturnWithRedFlagMascot width={500} preserveAspectRatio="xMidYMid meet" />
            </div>
        </div>
    </div>
}

export default SaturnWithRedFlagMascotWrapper;