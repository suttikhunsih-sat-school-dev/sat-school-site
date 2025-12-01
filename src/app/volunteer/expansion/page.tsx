"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MOCK_EXPANSION_DATA } from "@/lib/mock-data"

const REGIONS = [
    {
        name: "north",
        label: "🏔️ North",
        color: "bg-green-500",
        borderColor: "border-green-500",
        textColor: "text-green-600",
    },
    {
        name: "northeast",
        label: "🌾 Northeast",
        color: "bg-red-500",
        borderColor: "border-red-500",
        textColor: "text-red-600",
    },
    {
        name: "central",
        label: "🏙️ Central",
        color: "bg-orange-500",
        borderColor: "border-orange-500",
        textColor: "text-orange-600",
    },
    {
        name: "southern",
        label: "🌴 Southern",
        color: "bg-blue-500",
        borderColor: "border-blue-500",
        textColor: "text-blue-600",
    },
    {
        name: "eastern",
        label: "🏖️ Eastern",
        color: "bg-purple-500",
        borderColor: "border-purple-500",
        textColor: "text-purple-600",
    },
]

export default function ExpansionPage() {
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

    const getProjectsByRegion = (regionName: string) => {
        return MOCK_EXPANSION_DATA.filter((project) => project.region === regionName)
    }

    const getProjectCount = (regionName: string) => {
        return getProjectsByRegion(regionName).length
    }

    const selectedProjects = selectedRegion ? getProjectsByRegion(selectedRegion) : []

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-6 px-4 shadow-lg">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Teacher Expansion Program</h1>
                        <p className="text-blue-100 text-sm mt-1">Click a region to view open projects</p>
                    </div>
                    <Link href="/">
                        <Button variant="outline" className="text-white border-white hover:bg-white/20 bg-transparent">
                            Back
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 py-8">
                {/* Region Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                    {REGIONS.map((region) => {
                        const projectCount = getProjectCount(region.name)
                        const isSelected = selectedRegion === region.name

                        return (
                            <button
                                key={region.name}
                                onClick={() => setSelectedRegion(isSelected ? null : region.name)}
                                className={`p-6 rounded-lg border-2 transition-all transform hover:scale-105 cursor-pointer ${isSelected
                                    ? `${region.color} text-white shadow-xl`
                                    : `border-gray-200 bg-white hover:border-gray-300 ${region.textColor}`
                                    }`}
                            >
                                <div className="text-2xl mb-2">{region.label.split(" ")[0]}</div>
                                <div className={`text-2xl font-bold mb-1 ${isSelected ? "text-white" : region.textColor}`}>
                                    {projectCount}
                                </div>
                                <div className={`text-xs ${isSelected ? "text-white/90" : "text-gray-600"}`}>
                                    {projectCount === 1 ? "project" : "projects"}
                                </div>
                            </button>
                        )
                    })}
                </div>

                {/* Projects List */}
                {selectedRegion && (
                    <div className="bg-white rounded-xl border border-indigo-200 shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-indigo-200 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {REGIONS.find((r) => r.name === selectedRegion)?.label.split(" ")[1]} Projects
                            </h2>
                            <Button onClick={() => setSelectedRegion(null)} variant="outline" className="text-indigo-600">
                                Clear
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                            {selectedProjects.map((project) => (
                                <Card
                                    key={project.id}
                                    className="p-4 border-indigo-200 hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-blue-50"
                                >
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-gray-800 text-sm">{project.schoolName}</h3>
                                        <p className={`text-xs font-semibold ${REGIONS.find((r) => r.name === selectedRegion)?.textColor}`}>
                                            {project.district}
                                        </p>
                                        <div className="pt-2 border-t border-indigo-100">
                                            <p className="text-xs text-gray-500">
                                                📅 {new Date(project.startDate).toLocaleDateString("th-TH")} -{" "}
                                                {new Date(project.endDate).toLocaleDateString("th-TH")}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!selectedRegion && (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg">Select a region to view open teaching positions</p>
                    </div>
                )}
            </main>
        </div>
    )
}
