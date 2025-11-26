"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

interface DoodleBallCTAButtonProps {
    title: string;
    onClickCallback: () => void;
}

const DoodleBallCTAButton = ({
    title,
    onClickCallback,
}: DoodleBallCTAButtonProps) => {
    const buttonContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!buttonContainerRef.current) return;

        // Bouncy dribble + squash animation
        gsap.to(buttonContainerRef.current, {
            y: -18 * Math.random() * 0.5 + 9,
            scaleY: 0.9,
            scaleX: 1.05 * Math.random() * 0.1 + 0.95,
            rotation: 2,
            duration: 0.6 * Math.random() * 0.5 + 0.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            transformOrigin: "center bottom",
        });

        // Wobbly outline effect

        // Slight sketch “vibration” for doodle look
        gsap.to(buttonContainerRef.current, {
            x: "+=1",
            yoyo: true,
            repeat: -1,
            duration: 0.08 * Math.random() * 0.5 + 0.04,
            ease: "none",
        });
    }, []);

    return (
        <button onClick={onClickCallback} className="relative flex gap-1 justify-center items-center">

            {/* Actual dribbling button */}
            <div
                ref={buttonContainerRef}
                onClick={onClickCallback}
                // className="
                //     relative
                //     z-10
                //     bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500
                //     text-white font-bold py-4 px-4 rounded-full shadow-lg
                //     hover:shadow-xl transition-shadow duration-300 ease-in-out
                //     border-4 border-white
                //     "
                className="
                    relative
                    z-10
                    bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600
                    text-white font-bold py-4 px-4 rounded-full shadow-lg
                    hover:shadow-xl transition-shadow duration-300 ease-in-out
                    border-4 border-white
                    "
            >
            </div>
            <div onClick={onClickCallback} className=" text-white text-2xl font-bold py-4 px-4 rounded-full">
                {title}
            </div>
        </button>
    );
};

export default DoodleBallCTAButton;
