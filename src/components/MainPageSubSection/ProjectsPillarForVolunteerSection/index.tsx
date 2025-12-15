

"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

const projects = [
    {
        id: "bkk",
        img: "/project-logo-round-bkk.png",
        title: "Digital Classroom – BKK",
        description: "พัฒนาเครื่องมือการเรียนรู้ดิจิทัลให้โรงเรียน",
        href: "/volunteer/bkk",
    },
    {
        id: "children-pathways",
        img: "/project-logo-round-children-pathway.png",
        title: "Children Pathways",
        description: "สร้างเส้นทางการเรียนรู้ให้เด็ก ๆ",
        href: "/volunteer/children-pathways",
    },
    {
        id: "expansion",
        img: "/project-logo-round-expansion.png",
        title: "Project Expansion",
        description: "ขยายผลกระทบของโปรเจค",
        href: "/volunteer/expansion",
    },
    {
        id: "saturn-v",
        img: "/project-logo-round-saturn-v.png",
        title: "Saturn V",
        description: "นวัตกรรมเพื่ออนาคต",
        href: "/volunteer/saturn-v",
    },
];

export default function ProjectsPillarForVolunteerSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const detailRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    /* ---------- floating idle animation ---------- */
    useEffect(() => {
        const ctx = gsap.context(() => {
            itemsRef.current.forEach((el, i) => {
                if (!el) return;
                gsap.to(el, {
                    y: "+=50",
                    duration: 3 + i,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    /* ---------- focus animation ---------- */
    const focusProject = (index: number) => {
        setActiveIndex(index);

        const isMobile = window.innerWidth < 768;
        const scaleMain = isMobile ? 1.2 : 1.4;

        itemsRef.current.forEach((el, i) => {
            if (!el) return;

            if (i === index) {
                gsap.to(el, {
                    scale: scaleMain,
                    y: 30,
                    opacity: 1,
                    duration: 0.6,
                    ease: "power3.out",
                });
            } else {
                gsap.to(el, {
                    scale: 0.75,
                    opacity: 0.3,
                    duration: 0.6,
                    y: 0,
                    ease: "power3.out",
                });
            }
        });

        gsap.fromTo(
            detailRef.current,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
    };

    /* ---------- reset animation ---------- */
    const reset = () => {
        setActiveIndex(null);

        itemsRef.current.forEach(el => {
            if (!el) return;
            gsap.to(el, {
                scale: 1,
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out",
            });
        });

        gsap.to(detailRef.current, {
            autoAlpha: 0,
            y: 20,
            duration: 0.4,
        });
    };



    /* ---------- click outside to reset ---------- */
    const handleBackgroundClick = (e: React.MouseEvent) => {
        if (e.target === containerRef.current && activeIndex !== null) {
            reset();
        }
    };

    const activeProject =
        activeIndex !== null ? projects[activeIndex] : null;

    return (
        <section
            ref={containerRef}
            onClick={handleBackgroundClick}
            className="min-h-screen w-full bg-cover bg-center px-6 py-20"
            style={{
                backgroundImage: "url('/space-bg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                top: '50%',
                position: "absolute",
                zIndex: 3,
                width: "100vw",
                height: "100vh",
                opacity: 1,
            }}
        >
            <h1 ref={headerRef}
                className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
                โปรเจคของเราที่อยากชวนเพื่อน ๆ มาช่วยทำ!
            </h1>

            {/* GRID */}
            <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {projects.map((p, i) => (
                    <div
                        key={p.id}
                        ref={(el: HTMLDivElement | null) => {
                            if (el) itemsRef.current[i] = el;
                        }}
                        onClick={e => {
                            e.stopPropagation();
                            focusProject(i);
                        }}
                        className="flex justify-center cursor-pointer"
                    >
                        <div className="w-40 md:w-48 lg:w-56">
                            <Image
                                src={p.img}
                                alt={p.title}
                                width={400}
                                height={400}
                                className="object-contain"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* DETAILS */}
            <div
                ref={detailRef}
                className="max-w-2xl mx-auto mt-16 text-center text-white opacity-0"
            >
                {activeProject && (
                    <>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                            {activeProject.title}
                        </h2>
                        <p className="text-base md:text-lg mb-6">
                            {activeProject.description}
                        </p>
                        <Link
                            href={activeProject.href}
                            className="inline-block bg-white text-black px-6 py-3 rounded-full font-semibold"
                        >
                            ดูรายละเอียด →
                        </Link>
                    </>
                )}
            </div>
            {/* </div> */}
        </section>
    );
}
