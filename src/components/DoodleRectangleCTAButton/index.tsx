"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

interface DoodleRectangleCTAButtonProps {
    title: string;
    onClickCallback: () => void;
}

const DoodleRectangleCTAButton = ({
    title,
    onClickCallback,
}: DoodleRectangleCTAButtonProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!buttonRef.current) return;

        // Subtle bounce animation for rectangle
        gsap.to(buttonRef.current, {
            y: -8 * Math.random() * 0.5 + 4,
            scaleY: 0.95,
            scaleX: 1.02 * Math.random() * 0.05 + 0.98,
            duration: 0.6 * Math.random() * 0.5 + 0.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            transformOrigin: "center center",
        });

        // Slight sketch "vibration" for doodle look
        gsap.to(buttonRef.current, {
            x: "+=0.5",
            yoyo: true,
            repeat: -1,
            duration: 0.08 * Math.random() * 0.5 + 0.04,
            ease: "none",
        });
    }, []);

    return (
        <button
            onClick={onClickCallback}
            ref={buttonRef}
            className="
                relative
                z-10
                bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
                text-white font-bold py-4 px-8 rounded-lg shadow-lg
                hover:shadow-2xl hover:scale-110 hover:shadow-yellow-300 transition-all duration-300 ease-in-out
                border-4 border-white
                text-4xl
                min-w-[180px]
                whitespace-nowrap
                cursor-pointer
                hover:brightness-110
                "
            style={{
                boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0)'
            }}
            onMouseEnter={(e) => {
                const button = e.currentTarget;
                button.style.boxShadow = 'inset 0 0 30px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 150, 0.8)';
            }}
            onMouseLeave={(e) => {
                const button = e.currentTarget;
                button.style.boxShadow = 'inset 0 0 20px rgba(255, 255, 255, 0)';
            }}
        >
            {title}
        </button>
    );
};

export default DoodleRectangleCTAButton;
