"use client"

import { useState, useMemo, useCallback } from "react"
import dynamic from "next/dynamic"
// Dynamically import the map with no SSR
const BangkokMap = dynamic(() => import("@/components/BangkokMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-96 md:h-[600px] bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Loading map...</p>
        </div>
    ),
})
const VolunteerChildrenPathwaysPage = () => {
    return <div>Volunteer Bangkok Page</div>;
};

export default VolunteerChildrenPathwaysPage;