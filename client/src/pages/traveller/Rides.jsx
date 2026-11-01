import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Car, MapPin, Search, Snowflake, Users } from 'lucide-react'
import useFetch from '../../lib/useFetch'
import BookingModal from '../../components/BookingModal'
import { EmptyState, ErrorNote, ListingImage, PageHeader, PageLoader } from '../../components/ui'
import { money } from '../../lib/format'

const TYPES = ['Car', 'Van', 'SUV', 'Tuk-tuk', 'Mini bus', 'Bus']

export default function Rides() {
  const [params] = useSearchParams()
  const [filters, setFilters] = useState({ location: params.get('location') || '', vehicleType: '', seats: '', sort: 'price_asc' })
  const [applied, setApplied] = useState(filters)
  const [selected, setSelected] = useState(null)
  const query = Object.fromEntries(Object.entries(applied).filter(([, v]) => v !== ''))
  const { data: taxis, loading, error, reload } = useFetch('/taxis', { params: query, initial: [] })

  return (
    <div>
      <PageHeader title="Rides" subtitle="Hire a car, van or tuk-tuk with a local driver by the day." />
      <form onSubmit={(e) => { e.preventDefault(); setApplied(filters) }} className="panel grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute" />
          <input className="input pl-10" placeholder="Pickup city" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} aria-label="Location" />
        </div>
        <select className="input" value={filters.vehicleType} onChange={(e) => setFilters({ ...filters, vehicleType: e.target.value })} aria-label="Vehicle type">
          <option value="">Any vehicle</option>
          {TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
        <input className="input" type="number" min="1" placeholder="Passengers" value={filters.seats} onChange={(e) => setFilters({ ...filters, seats: e.target.value })} aria-label="Passengers" />
        <select className="input" value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value })} aria-label="Sort">
          <option value="price_asc">Cheapest first</option>
          <option value="price_desc">Priciest first</option>
          <option value="newest">Newest</option>
        </select>
        <button className="btn-primary"><Search className="h-4 w-4" /> Search</button>
      </form>
      <div className="mt-6">
        {loading ? (
          <PageLoader />
        ) : error ? (
          <ErrorNote onRetry={reload}>{error}</ErrorNote>
        ) : !taxis.length ? (
          <EmptyState icon={Car} title="No vehicles match that search">Try another city or vehicle type.</EmptyState>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {taxis.map((t) => (
              <button key={t._id} onClick={() => setSelected(t._id)} className="panel group grid grid-cols-[120px_1fr] overflow-hidden text-left transition hover:border-tea-400 sm:grid-cols-[160px_1fr]">
                <ListingImage src={t.imageUrl} name={t.vehicleType} icon={Car} className="h-full min-h-[130px]" />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold group-hover:text-tea-700">{t.vehicleModel}</h3>
                      <div className="text-xs text-ink-mute">{t.vehicleType}, {t.companyName}</div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="font-display font-bold">{money(t.dailyRate)}</div>
                      <div className="text-[11px] text-ink-mute">per day</div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className="chip bg-mist-50 text-ink-soft"><MapPin className="h-3 w-3" /> {t.location}</span>
                    <span className="chip bg-mist-50 text-ink-soft"><Users className="h-3 w-3" /> {t.seats} seats</span>
                    {t.airConditioned && <span className="chip bg-lagoon-50 text-lagoon-600"><Snowflake className="h-3 w-3" /> A/C</span>}
                  </div>
                  <div className="mt-2 text-xs text-ink-mute">Driver: {t.driverName}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
      <BookingModal kind="taxi" id={selected} open={!!selected} onClose={() => setSelected(null)} defaultGuests={Number(applied.seats) || 1} />
    </div>
  )
}
