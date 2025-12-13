"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import type { VolunteerTeacher } from "@/lib/types"

interface VolunteerTableChildrenPathwayProps {
    data: VolunteerTeacher[]
    allData: VolunteerTeacher[]
    onFilterChange: (filtered: VolunteerTeacher[]) => void
    onPageChange: (page: number) => void
    currentPage: number
    totalPages: number
}

export default function VolunteerTableChildrenPathway({
    data,
    allData,
    onFilterChange,
    onPageChange,
    currentPage,
    totalPages,
}: VolunteerTableChildrenPathwayProps) {
    // const [searchSchool, setSearchSchool] = useState("")
    const [searchSubject, setSearchSubject] = useState("")
    const [searchTimeline, setSearchTimeline] = useState("")

    useEffect(() => {
        const filtered = allData.filter((item) => {
            // const matchSchool = item.schoolName.toLowerCase().includes(searchSchool.toLowerCase())
            const matchSubject = item.subject.toLowerCase().includes(searchSubject.toLowerCase())
            const matchTimeline = item.timeline.toLowerCase().includes(searchTimeline.toLowerCase())

            return matchSubject && matchTimeline
        })

        onFilterChange(filtered)
        onPageChange(1) // Reset to first page on filter change
    }, [searchSubject, allData, onFilterChange, onPageChange, searchTimeline])

    return (
        <div className="w-full">
            {/* Search Filters */}
            <div className="p-6 space-y-4 border-b border-border bg-muted/30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* School Search */}
                    {/* <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search school..."
                            value={searchSchool}
                            onChange={(e) => setSearchSchool(e.target.value)}
                            className="pl-10"
                        />
                    </div> */}

                    {/* Subject Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search subject..."
                            value={searchSubject}
                            onChange={(e) => setSearchSubject(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {/* Timeline Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search timeline..."
                            value={searchTimeline}
                            onChange={(e) => setSearchTimeline(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border bg-muted/50">
                            {/* <th className="px-6 py-4 text-left text-xl font-semibold text-foreground">School Name</th> */}
                            <th className="px-6 py-4 text-left text-xl font-semibold text-foreground">Subject</th>
                            <th className="px-6 py-4 text-left text-xl font-semibold text-foreground">Timeline</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item) => (
                                <tr key={item.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                                    {/* <td className="px-6 py-4 text-xl text-foreground font-medium">{item.schoolName}</td> */}
                                    <td className="px-6 py-4 text-xl text-foreground">
                                        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                                            {item.subject}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xl text-muted-foreground">{item.timeline}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="px-6 py-12 text-center text-muted-foreground">
                                    No positions found matching your search criteria.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-muted/30">
                <div className="text-xl text-muted-foreground">
                    Page {currentPage} of {totalPages}
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
