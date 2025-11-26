"use client"

import { useState, useMemo, useCallback } from "react"
import type { VolunteerTeacher } from "@/lib/types"
import BangkokMap from "@/components/BangkokMap"
import TeacherTable from "@/components/TeacherTable"
import { MOCK_VOLUNTEER_DATA } from "@/lib/mock-data"
import Image from "next/image"

export default function Home() {
    const [filteredData, setFilteredData] = useState<VolunteerTeacher[]>(MOCK_VOLUNTEER_DATA)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const handleFilterChange = useCallback((filtered: VolunteerTeacher[]) => {
        setFilteredData(filtered)
    }, [])

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page)
    }, [])

    // Calculate pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedData = filteredData.slice(startIndex, endIndex)

    // Get schools for map from all filtered data
    const schoolsForMap = useMemo(() => {
        return filteredData.map((teacher) => ({
            id: teacher.id,
            name: teacher.schoolName,
            subject: teacher.subject,
            timeline: teacher.timeline,
            latitude: teacher.latitude,
            longitude: teacher.longitude,
        }))
    }, [filteredData])

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="bg-primary text-primary-foreground py-2 px-4 md:px-8">
                <div className="max-w-7xl mx-auto flex items-center space-x-4">
                    <Image
                        src="/Logo-Saturday-school-white.png"
                        alt="Saturday School Logo"
                        width={120}
                        height={120}
                        className="drop-shadow-xl h-auto"
                        priority
                    />
                    <div>

                        <h1 className="text-3xl font-bold mb-2">Saturday Volunteer Teachers</h1>
                        <p className="text-primary-foreground/90">Find and manage volunteer teaching positions in Bangkok schools</p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* add a mascot image */}
                    <div className="absolute top-[200px] left-8 w-32 md:w-40 lg:w-48">
                        <Image
                            src="/Boy_BusyPaperwork.png"
                            alt="BoyBusyPaperwork"
                            width={242}
                            height={242}
                            className="drop-shadow-lg h-auto"
                            priority
                        />
                    </div>
                    {/* Table Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-card rounded-lg border border-border shadow-sm">
                            <div className="p-6 border-b border-border">
                                <h2 className="text-xl font-semibold text-foreground">Positions Available</h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Showing {paginatedData.length} of {filteredData.length} positions
                                </p>
                            </div>
                            <TeacherTable
                                data={paginatedData}
                                allData={MOCK_VOLUNTEER_DATA}
                                onFilterChange={handleFilterChange}
                                onPageChange={handlePageChange}
                                currentPage={currentPage}
                                totalPages={totalPages}
                            />
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden sticky top-8">
                            <div className="p-4 border-b border-border">
                                <h2 className="text-lg font-semibold text-foreground">Bangkok Schools Map</h2>
                                <p className="text-xs text-muted-foreground mt-1">{schoolsForMap.length} schools shown</p>
                            </div>
                            <BangkokMap schools={schoolsForMap} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
