"use client"

import { useState } from "react"

interface Province {
    name: string
    thaiName: string
    projects: number
    region: string
}

interface RegionData {
    name: string
    displayName: string
    emoji: string
    color: string
    borderColor: string
    lightColor: string
    provinces: Province[]
    projectCount: number
}

// All Thai provinces mapped to their regions
const THAI_PROVINCES: Province[] = [
    // Northern Region
    { name: "Chiang Mai", thaiName: "เชียงใหม่", region: "north", projects: 1 },
    { name: "Chiang Rai", thaiName: "เชียงราย", region: "north", projects: 1 },
    { name: "Phayao", thaiName: "พะเยา", region: "north", projects: 1 },
    { name: "Phrae", thaiName: "แพร่", region: "north", projects: 1 },
    { name: "Nan", thaiName: "น่าน", region: "north", projects: 1 },
    { name: "Uttaradit", thaiName: "อุตรดิตถ์", region: "north", projects: 1 },
    { name: "Lampang", thaiName: "ลำปาง", region: "north", projects: 1 },
    { name: "Lamphun", thaiName: "ลำพูน", region: "north", projects: 1 },

    // Northeastern Region
    { name: "Mukdahan", thaiName: "มุกดาหาร", region: "northeast", projects: 1 },
    { name: "Nakhon Phanom", thaiName: "นครพนม", region: "northeast", projects: 1 },
    { name: "Sakon Nakhon", thaiName: "สกลนคร", region: "northeast", projects: 1 },
    { name: "Amnat Charoen", thaiName: "อำนาจเจริญ", region: "northeast", projects: 1 },

    // Central Region
    { name: "Nakhon Sawan", thaiName: "นครสวรรค์", region: "central", projects: 1 },
    { name: "Chai Nat", thaiName: "ชัยนาท", region: "central", projects: 1 },

    // Southern Region
    { name: "Phangnga", thaiName: "พังงา", region: "southern", projects: 1 },
    { name: "Phuket", thaiName: "ภูเก็ต", region: "southern", projects: 1 },
    { name: "Krabi", thaiName: "กระบี่", region: "southern", projects: 1 },
    { name: "Satun", thaiName: "สตูล", region: "southern", projects: 1 },
    { name: "Songkhla", thaiName: "สงขลา", region: "southern", projects: 1 },

    // Eastern Region
    { name: "Chanthaburi", thaiName: "จันทบุรี", region: "eastern", projects: 1 },
]

const THAI_REGIONS: RegionData[] = [
    {
        name: "north",
        displayName: "North",
        emoji: "🏔️",
        color: "#10b981",
        borderColor: "#059669",
        lightColor: "#d1fae5",
        provinces: THAI_PROVINCES.filter((p) => p.region === "north"),
        projectCount: THAI_PROVINCES.filter((p) => p.region === "north").length,
    },
    {
        name: "northeast",
        displayName: "Northeast",
        emoji: "🌾",
        color: "#ef4444",
        borderColor: "#dc2626",
        lightColor: "#fee2e2",
        provinces: THAI_PROVINCES.filter((p) => p.region === "northeast"),
        projectCount: THAI_PROVINCES.filter((p) => p.region === "northeast").length,
    },
    {
        name: "central",
        displayName: "Central",
        emoji: "🏙️",
        color: "#f59e0b",
        borderColor: "#d97706",
        lightColor: "#fef3c7",
        provinces: THAI_PROVINCES.filter((p) => p.region === "central"),
        projectCount: THAI_PROVINCES.filter((p) => p.region === "central").length,
    },
    {
        name: "southern",
        displayName: "Southern",
        emoji: "🏝️",
        color: "#3b82f6",
        borderColor: "#2563eb",
        lightColor: "#dbeafe",
        provinces: THAI_PROVINCES.filter((p) => p.region === "southern"),
        projectCount: THAI_PROVINCES.filter((p) => p.region === "southern").length,
    },
    {
        name: "eastern",
        displayName: "Eastern",
        emoji: "🌊",
        color: "#8b5cf6",
        borderColor: "#7c3aed",
        lightColor: "#ede9fe",
        provinces: THAI_PROVINCES.filter((p) => p.region === "eastern"),
        projectCount: THAI_PROVINCES.filter((p) => p.region === "eastern").length,
    },
]

interface ThaiDistrictMapProps {
    onRegionSelect: (region: string) => void
    selectedRegion: string | null
}

export default function ThaiDistrictMap({ onRegionSelect, selectedRegion }: ThaiDistrictMapProps) {
    const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

    return (
        <div className="w-full space-y-8">
            {/* Thailand Map SVG - Real geographical representation */}
            <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl p-8">
                <svg
                    viewBox="0 0 800 900"
                    className="w-full h-auto"
                    style={{ aspectRatio: "4/5" }}
                    preserveAspectRatio="xMidYMid meet"
                >
                    <defs>
                        <linearGradient id="seaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: "#e0f2fe", stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: "#bae6fd", stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>

                    <rect width="800" height="900" fill="url(#seaGradient)" />

                    {/* Northern Region - Top left mountainous area */}
                    <g>
                        <path
                            d="M 200 150 L 350 120 L 420 140 L 440 220 L 380 280 L 280 260 L 240 200 Z"
                            fill={selectedRegion === "north" ? "#10b981" : hoveredRegion === "north" ? "#d1fae5" : "#ffffff"}
                            stroke="#059669"
                            strokeWidth="3"
                            className="transition-all cursor-pointer hover:shadow-lg"
                            onMouseEnter={() => setHoveredRegion("north")}
                            onMouseLeave={() => setHoveredRegion(null)}
                            onClick={() => onRegionSelect("north")}
                            style={{
                                filter:
                                    hoveredRegion === "north" || selectedRegion === "north"
                                        ? "drop-shadow(0 8px 16px rgba(0,0,0,0.2))"
                                        : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                            }}
                        />
                        <text
                            x="320"
                            y="200"
                            textAnchor="middle"
                            fontSize="18"
                            fontWeight="bold"
                            fill={selectedRegion === "north" ? "#fff" : "#1f2937"}
                            pointerEvents="none"
                        >
                            North
                        </text>
                        <circle
                            cx="420"
                            cy="140"
                            r="24"
                            fill="#10b981"
                            stroke="#fff"
                            strokeWidth="2"
                            pointerEvents="none"
                            style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.2))" }}
                        />
                        <text x="420" y="148" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white" pointerEvents="none">
                            8
                        </text>
                    </g>

                    {/* Northeastern Region - Large right plateau */}
                    <g>
                        <path
                            d="M 440 220 L 600 180 L 680 200 L 700 350 L 620 420 L 500 380 L 420 300 Z"
                            fill={selectedRegion === "northeast" ? "#ef4444" : hoveredRegion === "northeast" ? "#fee2e2" : "#ffffff"}
                            stroke="#dc2626"
                            strokeWidth="3"
                            className="transition-all cursor-pointer hover:shadow-lg"
                            onMouseEnter={() => setHoveredRegion("northeast")}
                            onMouseLeave={() => setHoveredRegion(null)}
                            onClick={() => onRegionSelect("northeast")}
                            style={{
                                filter:
                                    hoveredRegion === "northeast" || selectedRegion === "northeast"
                                        ? "drop-shadow(0 8px 16px rgba(0,0,0,0.2))"
                                        : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                            }}
                        />
                        <text
                            x="570"
                            y="290"
                            textAnchor="middle"
                            fontSize="18"
                            fontWeight="bold"
                            fill={selectedRegion === "northeast" ? "#fff" : "#1f2937"}
                            pointerEvents="none"
                        >
                            Northeast
                        </text>
                        <circle
                            cx="680"
                            cy="200"
                            r="24"
                            fill="#ef4444"
                            stroke="#fff"
                            strokeWidth="2"
                            pointerEvents="none"
                            style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.2))" }}
                        />
                        <text x="680" y="208" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white" pointerEvents="none">
                            4
                        </text>
                    </g>

                    {/* Central Region - Middle connecting area */}
                    <g>
                        <path
                            d="M 280 260 L 380 280 L 420 300 L 420 420 L 340 440 L 260 380 Z"
                            fill={selectedRegion === "central" ? "#f59e0b" : hoveredRegion === "central" ? "#fef3c7" : "#ffffff"}
                            stroke="#d97706"
                            strokeWidth="3"
                            className="transition-all cursor-pointer hover:shadow-lg"
                            onMouseEnter={() => setHoveredRegion("central")}
                            onMouseLeave={() => setHoveredRegion(null)}
                            onClick={() => onRegionSelect("central")}
                            style={{
                                filter:
                                    hoveredRegion === "central" || selectedRegion === "central"
                                        ? "drop-shadow(0 8px 16px rgba(0,0,0,0.2))"
                                        : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                            }}
                        />
                        <text
                            x="350"
                            y="350"
                            textAnchor="middle"
                            fontSize="18"
                            fontWeight="bold"
                            fill={selectedRegion === "central" ? "#fff" : "#1f2937"}
                            pointerEvents="none"
                        >
                            Central
                        </text>
                        <circle
                            cx="420"
                            cy="290"
                            r="24"
                            fill="#f59e0b"
                            stroke="#fff"
                            strokeWidth="2"
                            pointerEvents="none"
                            style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.2))" }}
                        />
                        <text x="420" y="298" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white" pointerEvents="none">
                            2
                        </text>
                    </g>

                    {/* Southern Region - Peninsula extending downward */}
                    <g>
                        <path
                            d="M 260 380 L 340 440 L 360 580 L 340 720 L 280 760 L 220 680 L 200 480 Z"
                            fill={selectedRegion === "southern" ? "#3b82f6" : hoveredRegion === "southern" ? "#dbeafe" : "#ffffff"}
                            stroke="#2563eb"
                            strokeWidth="3"
                            className="transition-all cursor-pointer hover:shadow-lg"
                            onMouseEnter={() => setHoveredRegion("southern")}
                            onMouseLeave={() => setHoveredRegion(null)}
                            onClick={() => onRegionSelect("southern")}
                            style={{
                                filter:
                                    hoveredRegion === "southern" || selectedRegion === "southern"
                                        ? "drop-shadow(0 8px 16px rgba(0,0,0,0.2))"
                                        : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                            }}
                        />
                        <text
                            x="280"
                            y="550"
                            textAnchor="middle"
                            fontSize="18"
                            fontWeight="bold"
                            fill={selectedRegion === "southern" ? "#fff" : "#1f2937"}
                            pointerEvents="none"
                        >
                            Southern
                        </text>
                        <circle
                            cx="360"
                            cy="460"
                            r="24"
                            fill="#3b82f6"
                            stroke="#fff"
                            strokeWidth="2"
                            pointerEvents="none"
                            style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.2))" }}
                        />
                        <text x="360" y="468" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white" pointerEvents="none">
                            5
                        </text>
                    </g>

                    {/* Eastern Region - Coastal strip on right */}
                    <g>
                        <path
                            d="M 500 380 L 620 420 L 660 500 L 640 600 L 560 580 L 520 480 Z"
                            fill={selectedRegion === "eastern" ? "#8b5cf6" : hoveredRegion === "eastern" ? "#ede9fe" : "#ffffff"}
                            stroke="#7c3aed"
                            strokeWidth="3"
                            className="transition-all cursor-pointer hover:shadow-lg"
                            onMouseEnter={() => setHoveredRegion("eastern")}
                            onMouseLeave={() => setHoveredRegion(null)}
                            onClick={() => onRegionSelect("eastern")}
                            style={{
                                filter:
                                    hoveredRegion === "eastern" || selectedRegion === "eastern"
                                        ? "drop-shadow(0 8px 16px rgba(0,0,0,0.2))"
                                        : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                            }}
                        />
                        <text
                            x="590"
                            y="510"
                            textAnchor="middle"
                            fontSize="18"
                            fontWeight="bold"
                            fill={selectedRegion === "eastern" ? "#fff" : "#1f2937"}
                            pointerEvents="none"
                        >
                            Eastern
                        </text>
                        <circle
                            cx="660"
                            cy="480"
                            r="24"
                            fill="#8b5cf6"
                            stroke="#fff"
                            strokeWidth="2"
                            pointerEvents="none"
                            style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.2))" }}
                        />
                        <text x="660" y="488" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white" pointerEvents="none">
                            1
                        </text>
                    </g>
                </svg>
            </div>

            {/* Region cards with province list - show all regions by default */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {THAI_REGIONS.map((region) => {
                    const isSelected = selectedRegion === region.name

                    return (
                        <div
                            key={region.name}
                            className="p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md"
                            style={{
                                borderColor: isSelected ? region.borderColor : "#e5e7eb",
                                backgroundColor: isSelected ? region.lightColor : "#ffffff",
                            }}
                            onClick={() => onRegionSelect(region.name)}
                        >
                            {/* Region header */}
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xl">{region.emoji}</span>
                                <h3 className="font-bold text-sm" style={{ color: region.borderColor }}>
                                    {region.displayName}
                                </h3>
                            </div>

                            {/* Project count badge */}
                            <div
                                className="px-2 py-1 rounded text-white font-bold text-center text-sm mb-3"
                                style={{ backgroundColor: region.color }}
                            >
                                {region.projectCount} {region.projectCount === 1 ? "Project" : "Projects"}
                            </div>

                            {/* Provinces list */}
                            <div className="space-y-2">
                                <p className="text-xs font-semibold text-gray-600 mb-2">Provinces:</p>
                                {region.provinces.slice(0, 3).map((province) => (
                                    <div key={province.name} className="text-xs text-gray-700 flex items-start gap-2">
                                        <span className="text-lg leading-none">📍</span>
                                        <span>{province.thaiName}</span>
                                    </div>
                                ))}
                                {region.provinces.length > 3 && (
                                    <p className="text-xs text-gray-500 italic mt-1">+{region.provinces.length - 3} more</p>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
