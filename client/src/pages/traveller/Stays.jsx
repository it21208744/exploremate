import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BedDouble, MapPin, Search, Users } from 'lucide-react'
import useFetch from '../../lib/useFetch'
import BookingModal from '../../components/BookingModal'
import { EmptyState, ErrorNote, ListingImage, PageHeader, PageLoader } from '../../components/ui'
import { money } from '../../lib/format'

export default function Stays() {
  const [params, setParams] = useSearchParams()
  const [filters, setFilters] = useState({ location: params.get('location') || '', maxPrice: '', guests: '', sort: 'newest' })
  const [applied, setApplied] = useState(filters)
  const [selected, setSelected] = useState(null)
  const query = Object.fromEntries(Object.entries(applied).filter(([, v]) => v !== ''))
  const { data: hotels, loading, error, reload } = useFetch('/hotels', { params: query, initial: [] })

  useEffect(() => {
    if (params.get('book')) setSelected(params.get('book'))
  }, [params])

  const apply = (e) => {
    e.preventDefault()
    setApplied(filters)
    setParams(filters.location ? { location: filters.location } : {})
  }

  return (
    <div>
      <PageHeader title="Stays" subtitle="Hotels and guesthouses listed by their owners. Book instantly with live availability." />
      <form onSubmit={apply} className="panel grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
        <div className="relative">
          <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute" />
          <input className="input pl-10" placeholder="City or area" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} aria-label="Location" />
        </div>
        <input className="input" type="number" min="0" placeholder="Max per night (LKR)" value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} aria-label="Maximum price per night" />
        <input className="input" type="number" min="1" placeholder="Guests" value={filters.guests} onChange={(e) => setFilters({ ...filters, guests: e.target.value })} aria-label="Guests" />
        <select className="input" value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value })} aria-label="Sort">
          <option value="newest">Newest</option>
          <option value="price_asc">Price: low to high</option>
          <option value="price_desc">Price: high to low</option>
        </select>
        <button className="btn-primary"><Search className="h-4 w-4" /> Search</button>
      </form>

      <div className="mt-6">
        {loading ? (
          <PageLoader />
        ) : error ? (
          <ErrorNote onRetry={reload}>{error}</ErrorNote>
        ) : !hotels.length ? (
          <EmptyState icon={BedDouble} title="No stays match that search">Try another city, a higher price or fewer guests.</EmptyState>
        ) : (
          <>
            <p className="mb-3 text-sm text-ink-mute">{hotels.length} {hotels.length === 1 ? 'stay' : 'stays'}</p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {hotels.map((h) => (
                <button key={h._id} onClick={() => setSelected(h._id)} className="panel group overflow-hidden text-left transition hover:border-tea-400">
                  <ListingImage src={h.imageUrl} name={h.name} icon={BedDouble} className="h-44" />
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold leading-snug group-hover:text-tea-700">{h.name}</h3>
                      <div className="shrink-0 text-right">
                        <div className="font-display font-bold">{money(h.pricePerNight)}</div>
                        <div className="text-[11px] text-ink-mute">per night</div>
                      </div>
                    </div>
                    <div className="mt-1 flex gap-3 text-xs text-ink-mute">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {h.location}</span>
                      <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {h.maxGuests}</span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{h.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <BookingModal kind="hotel" id={selected} open={!!selected} onClose={() => setSelected(null)} defaultGuests={Number(applied.guests) || 1} />
    </div>
  )
}
