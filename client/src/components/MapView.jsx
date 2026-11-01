import { useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

function FitBounds({ points }) {
  const map = useMap()
  useEffect(() => {
    if (points.length > 1) map.fitBounds(points.map((p) => [p.lat, p.lon]), { padding: [30, 30], maxZoom: 15 })
  }, [map, points])
  return null
}

/** OpenStreetMap map with the destination + optional places. No API key needed. */
export default function MapView({ center, places = [], className = 'h-80', onSelect }) {
  if (!center) return null
  const pts = [center, ...places.filter((p) => p.lat && p.lon)]
  return (
    <div className={`${className} overflow-hidden rounded-panel border border-mist-200`}>
      <MapContainer center={[center.lat, center.lon]} zoom={13} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <CircleMarker center={[center.lat, center.lon]} radius={10} pathOptions={{ color: '#12302A', fillColor: '#E8A317', fillOpacity: 1, weight: 3 }}>
          <Popup>{center.name}</Popup>
        </CircleMarker>
        {places.map((p) => (
          <CircleMarker
            key={p.id || p.name}
            center={[p.lat, p.lon]}
            radius={7}
            pathOptions={{ color: '#fff', fillColor: '#1F6B52', fillOpacity: 1, weight: 2 }}
            eventHandlers={onSelect ? { click: () => onSelect(p) } : undefined}
          >
            <Popup>
              <strong>{p.name}</strong>
              {p.distanceKm != null && <div>{p.distanceKm} km away</div>}
            </Popup>
          </CircleMarker>
        ))}
        <FitBounds points={pts} />
      </MapContainer>
    </div>
  )
}
