"use client"

import { useMemo } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { LatLngExpression } from "leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
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

// Fix default marker icon issue
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// Custom marker icon with school pin
const schoolIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// Bangkok center coordinates
const BANGKOK_CENTER: LatLngExpression = [13.7563, 100.5018]

export default function BangkokMap({ schools }: BangkokMapProps) {
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
    <div className="w-full flex flex-col">
      {/* Map Container */}
      <div className="w-full h-96 md:h-[600px] rounded-lg overflow-hidden border border-blue-200 dark:border-slate-600">
        <MapContainer
          center={BANGKOK_CENTER}
          zoom={11}
          style={{ width: "100%", height: "100%" }}
          className="rounded-lg"
        >
          {/* OpenStreetMap Tile Layer */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            maxZoom={19}
          />

          {/* School Markers */}
          {uniqueSchools.map((school) => (
            <Marker
              key={school.id}
              position={[school.latitude, school.longitude]}
              icon={schoolIcon}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-sm">{school.name}</h3>
                  <p className="text-xs text-gray-600">{school.subject}</p>
                  <p className="text-xs text-gray-500">{school.timeline}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Legend and info */}
      <div className="mt-4 px-4 flex items-center gap-2 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-foreground">{schools.length} Schools</span>
        </div>
      </div>

      {/* School list overlay */}
      {schools.length > 0 && (
        <div className="mt-3 px-4 text-xs space-y-1 max-h-20 overflow-y-auto">
          <p className="text-muted-foreground font-medium">Schools Shown:</p>
          {schools.slice(0, 5).map((school) => (
            <div key={school.id} className="flex items-start gap-2 text-muted-foreground">
              <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0 text-red-500" />
              <div className="truncate">
                <p className="font-medium text-foreground truncate">{school.name}</p>
                <p className="text-xs">{school.subject}</p>
              </div>
            </div>
          ))}
          {schools.length > 5 && (
            <p className="text-muted-foreground text-xs pt-1">+{schools.length - 5} more schools</p>
          )}
        </div>
      )}
    </div>
  )
}