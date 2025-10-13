import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface CTAButtonProps {
    title: string,
    onClickCallback: () => void
}

const CTAButton = ({
    title,
    onClickCallback,
}: CTAButtonProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const button = buttonRef.current;

        if (!button) return;

        // Reset animation on mount
        gsap.set(button, { rotate: 0, scale: 1 });

        // Create hover animation
        const enterAnimation = () => {
            gsap.to(button, {
                rotate: "+=5",
                scale: 1.1,
                duration: 0.3,
                ease: "elastic.out(1, 0.3)",
                borderWidth: "4px",
            });
        };

        const leaveAnimation = () => {
            gsap.to(button, {
                rotate: 0,
                scale: 1,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)",
                borderWidth: "3px",
            });
        };

        button.addEventListener('mouseenter', enterAnimation);
        button.addEventListener('mouseleave', leaveAnimation);

        return () => {
            button.removeEventListener('mouseenter', enterAnimation);
            button.removeEventListener('mouseleave', leaveAnimation);
        };
    }, []);

    return (
        <button
            ref={buttonRef}
            onClick={onClickCallback}
            className="
                relative
                bg-[#e0e0e0]
                text-black
                font-bold
                text-lg
                px-8
                py-4
                rounded-[18px]
                shadow-lg
                border-3
                white
                transition-colors
                hover:bg-[#fbde4f]
                active:transform
                active:scale-95
                overflow-hidden
            "
            style={{
                textShadow: '1px 1px 0 rgba(0,0,0,0.1)',
                boxShadow: '3px 3px 0 rgba(0,0,0,0.2), 0 0 10px rgba(0,0,0,0.1)',
            }}
        >
            {title}
        </button>
    )
}

export default CTAButton