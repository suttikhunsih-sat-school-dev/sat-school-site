
import React, { JSX, useRef } from "react";
export default function SatSchoolMainQuote(): JSX.Element {
    const containerRef = useRef<HTMLDivElement | null>(null);

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "400px",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "transparent",
                overflow: "visible",
                zIndex: 2,
                cursor: "pointer",
            }}
        >
            <div
                style={{
                    position: "relative",
                    zIndex: 5,
                    textAlign: "center",
                    maxWidth: "1000px",
                    padding: "40px",
                }}
            >
                <div
                    style={{
                        fontSize: "clamp(32px, 4vw, 72px)",
                        fontWeight: 900,
                        color: "white",
                        lineHeight: "1.2",
                        textShadow: "3px 3px 0 #1e55a5, -1px -1px 0 rgba(0, 0, 0, 0.1)",
                        letterSpacing: "-0.02em"
                    }}
                >
                    The Future of Our Education Is In Your Hands
                </div>
            </div>
        </div>
    );
}
