"use client"

import { useState, useMemo, useCallback } from "react"
import type { VolunteerTeacher } from "@/lib/types"
import { MOCK_VOLUNTEER_DATA } from "@/lib/mock-data"
import Image from "next/image"
import CTAButton from "@/components/CTAButton"
import VolunteerTableChildrenPathway from "@/components/VolunteerTableChildrenPathway"

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
    // const schoolsForMap = useMemo(() => {
    //     return filteredData.map((teacher) => ({
    //         id: teacher.id,
    //         name: teacher.schoolName,
    //         subject: teacher.subject,
    //         timeline: teacher.timeline,
    //         latitude: teacher.latitude,
    //         longitude: teacher.longitude,
    //     }))
    // }, [filteredData])

    const onClickApply = useCallback(() => {
        // open new tab to forms.gle/8XreJSurPgqZCkVP7
        window.open("https://forms.gle/8XreJSurPgqZCkVP7", "_blank")
    }, [])

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="bg-primary text-primary-foreground py-2 px-4 md:px-8">
                <div className="max-w-7xl mx-auto flex items-center space-x-4">
                    <Image
                        src="/Logo-Saturday-school-white.png"
                        alt="Saturday School Logo"
                        width={80}
                        height={80}
                        className="drop-shadow-xl h-auto"
                        priority
                    />
                    <h1 className="text-2xl font-bold">Saturday School Children Pathway - อาสาสมัคร โครงการเส้นทางของฉัน</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className=" mx-auto px-4 md:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                    <div className="lg:col-span-1">
                        <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden sticky top-8">
                            <div className="p-4 border-b border-border">
                                <h1 className="text-3xl font-bold mb-2">Children Pathway คืออะไร ?</h1>
                                <Image
                                    src="/project-logo-children-pathways.jpg"
                                    alt="Project Logo children pathways"
                                    width={200}
                                    height={200}
                                    className="object-contain"
                                />
                            </div>
                            {/* <BangkokMap schools={schoolsForMap} /> */}
                        </div>
                    </div>
                    {/* Table Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-card rounded-lg border border-border shadow-sm">
                            <div className="p-6 border-b border-border">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <h1 className="text-3xl font-bold mb-2">ตำแหน่งที่เปิดรับ (แยกรายวิชา)</h1>
                                    <div className="flex items-center gap-4">
                                        <Image
                                            src="/Boy_BusyPaperwork.png"
                                            alt="BoyBusyPaperwork"
                                            width={120}
                                            height={120}
                                            className="drop-shadow-lg h-auto"
                                            priority
                                        />
                                        <CTAButton title={"สมัคร (ทุกตำแหน่ง) คลิ๊กตรงนี้ !"} onClickCallback={onClickApply} />
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Showing {paginatedData.length} of {filteredData.length} positions
                                </p>
                            </div>
                            <VolunteerTableChildrenPathway
                                data={paginatedData}
                                allData={MOCK_VOLUNTEER_DATA}
                                onFilterChange={handleFilterChange}
                                onPageChange={handlePageChange}
                                currentPage={currentPage}
                                totalPages={totalPages}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
