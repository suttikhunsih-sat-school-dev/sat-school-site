"use client"
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { menuItems } from '@/app/constant/mainPage';
import Link from 'next/link';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const enterAnimation = () => {
            gsap.to(button, {
                scale: 1.1,
                duration: 0.3,
                ease: "elastic.out(1, 0.3)",
            });
        };

        const leaveAnimation = () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)",
            });
        };

        button.addEventListener('mouseenter', enterAnimation);
        button.addEventListener('mouseleave', leaveAnimation);

        return () => {
            button.removeEventListener('mouseenter', enterAnimation);
            button.removeEventListener('mouseleave', leaveAnimation);
        };
    }, []);

    useEffect(() => {
        if (menuRef.current) {
            if (isOpen) {
                gsap.to(menuRef.current, {
                    opacity: 1,
                    x: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            } else {
                gsap.to(menuRef.current, {
                    opacity: 0,
                    x: -100,
                    duration: 0.5,
                    ease: "power2.in"
                });
            }
        }
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);


    const toggleSubMenu = (itemId: string) => {
        setExpandedItems(prev => {
            const next = new Set(prev);
            if (next.has(itemId)) {
                next.delete(itemId);
            } else {
                next.add(itemId);
            }
            return next;
        });
    };

    return (
        <>
            <button
                ref={buttonRef}
                onClick={toggleMenu}
                className="fixed top-6 left-6 z-50 p-2 rounded-full bg-transparent transition-colors"
            >
                <div className="w-8 h-6 flex flex-col justify-between">
                    {[0, 1, 2].map((i) => (
                        <span
                            key={i}
                            className={`w-full h-0.5 bg-white transform transition-transform duration-300 ${isOpen && i === 0 ? 'rotate-45 translate-y-2.5' :
                                isOpen && i === 2 ? '-rotate-45 -translate-y-2.5' :
                                    isOpen && i === 1 ? 'opacity-0' : ''
                                }`}
                        />
                    ))}
                </div>
            </button>

            <div
                ref={menuRef}
                className="fixed top-0 left-0 h-full w-64 bg-[#1e55a5]/95 z-40 transform -translate-x-full"
                style={{ opacity: 0 }}
            >
                <div className="pt-20 px-4">
                    {menuItems.map((item) => (
                        <div key={item.id} className="mb-4">
                            <Link href={item.urlNavigate || '#'} key={item.id}>
                                <button
                                    onClick={() => {
                                        if (!item.urlNavigate) {
                                            toggleSubMenu(item.id)
                                        }
                                    }}
                                    className="text-white transition-colors w-full text-left py-2 flex justify-between items-center"
                                >
                                    {item.label}
                                    {item.children && (
                                        <span className={`transform transition-transform duration-200 ${expandedItems.has(item.id) ? 'rotate-180' : ''
                                            }`}>
                                            ▼
                                        </span>
                                    )}
                                </button>
                            </Link>
                            {item.children && expandedItems.has(item.id) && (
                                <div className="ml-4 mt-2 space-y-2">
                                    {item.children.map((child) => (
                                        <Link href={child.urlNavigate || '#'} key={child.id}>
                                            <button
                                                key={child.id}
                                                className="text-white/80 transition-colors w-full text-left py-1"
                                            >
                                                {child.label}
                                            </button>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30"
                    onClick={toggleMenu}
                />
            )}
        </>
    );
};

export default HamburgerMenu;