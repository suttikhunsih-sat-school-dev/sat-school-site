import SaturnInSpaceMascot from "@/components/SVGComponents/SaturnInSpaceMascot"

interface SaturnInSpaceMascotWrapperProps {
    mascotImageRef: React.RefObject<HTMLDivElement | null>,
    mascotInnerRef: React.RefObject<HTMLDivElement | null>,
    width: number
}

const SaturnInSpaceMascotWrapper = ({
    mascotImageRef,
    mascotInnerRef,
    width
}: SaturnInSpaceMascotWrapperProps) => {
    return <div ref={mascotImageRef} className="w-1/4 flex items-center justify-center overflow-visible">
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
                <SaturnInSpaceMascot width={width} preserveAspectRatio="xMidYMid meet" />
            </div>
        </div>
    </div>
}

export default SaturnInSpaceMascotWrapper