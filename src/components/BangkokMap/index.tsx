"use client"

import { useMemo } from "react"
import { MapPin } from "lucide-react"

interface School {
  id: string
  name: string
  subject: string
  timeline: string
  latitude: number
  longitude: number
}

interface BangkokMapProps {
  schools: School[]
}

// Bangkok bounds (approximate)
const BANGKOK_BOUNDS = {
  north: 14.0,
  south: 13.5,
  east: 100.9,
  west: 100.1,
}

export default function BangkokMap({ schools }: BangkokMapProps) {
  // Convert lat/lng to SVG coordinates
  const coordToSvg = (lat: number, lng: number) => {
    const svgWidth = 400
    const svgHeight = 300

    const x = ((lng - BANGKOK_BOUNDS.west) / (BANGKOK_BOUNDS.east - BANGKOK_BOUNDS.west)) * svgWidth
    const y = ((BANGKOK_BOUNDS.north - lat) / (BANGKOK_BOUNDS.north - BANGKOK_BOUNDS.south)) * svgHeight

    return { x: Math.max(0, Math.min(svgWidth, x)), y: Math.max(0, Math.min(svgHeight, y)) }
  }

  const uniqueSchools = useMemo(() => {
    const grouped = new Map<string, School>()
    schools.forEach((school) => {
      const key = `${school.latitude.toFixed(2)}-${school.longitude.toFixed(2)}`
      if (!grouped.has(key)) {
        grouped.set(key, school)
      }
    })
    return Array.from(grouped.values())
  }, [schools])

  return (
    <div className="w-full h-96 md:h-[600px] rounded-b-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-700 p-4 flex flex-col">
      {/* SVG Map */}
      <svg
        viewBox="0 0 400 300"
        className="flex-1 bg-white dark:bg-slate-900 rounded-lg border border-blue-200 dark:border-slate-600"
      >
        {/* Bangkok simplified background */}
        <rect width="400" height="300" fill="currentColor" className="fill-blue-50 dark:fill-slate-800" />

        {/* Grid for reference */}
        <g strokeDasharray="5,5" stroke="currentColor" className="stroke-blue-100 dark:stroke-slate-700">
          <line x1="100" y1="0" x2="100" y2="300" strokeWidth="0.5" />
          <line x1="200" y1="0" x2="200" y2="300" strokeWidth="0.5" />
          <line x1="300" y1="0" x2="300" y2="300" strokeWidth="0.5" />
          <line x1="0" y1="75" x2="400" y2="75" strokeWidth="0.5" />
          <line x1="0" y1="150" x2="400" y2="150" strokeWidth="0.5" />
          <line x1="0" y1="225" x2="400" y2="225" strokeWidth="0.5" />
        </g>

        {/* School markers */}
        {uniqueSchools.map((school) => {
          const { x, y } = coordToSvg(school.latitude, school.longitude)
          return (
            <g key={school.id}>
              {/* Marker circle */}
              <circle cx={x} cy={y} r="6" className="fill-red-500 stroke-white dark:stroke-slate-900" strokeWidth="2" />
              {/* Marker pin top */}
              <circle cx={x} cy={y} r="3" className="fill-white dark:fill-slate-900" />
            </g>
          )
        })}
      </svg>

      {/* Legend and info */}
      <div className="mt-4 flex items-center gap-2 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-foreground">{schools.length} Schools</span>
        </div>
      </div>

      {/* School list overlay */}
      {schools.length > 0 && (
        <div className="mt-3 text-xs space-y-1 max-h-20 overflow-y-auto">
          <p className="text-muted-foreground font-medium">Schools Shown:</p>
          {schools.slice(0, 3).map((school) => (
            <div key={school.id} className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0 text-red-500" />
              <div className="truncate">
                <p className="font-medium text-foreground truncate">{school.name}</p>
                <p className="text-xs">{school.subject}</p>
              </div>
            </div>
          ))}
          {schools.length > 3 && (
            <p className="text-muted-foreground text-xs pt-1">+{schools.length - 3} more schools</p>
          )}
        </div>
      )}
    </div>
  )
}