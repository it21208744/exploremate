import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Compass, Search, Sparkles } from 'lucide-react'
import api, { errorMessage } from '../../api/client'
import MapView from '../../components/MapView'
import { PlacesGrid, WeatherPanel } from '../../components/TripView'
import { EmptyState, ErrorNote, PageHeader, PageLoader } from '../../components/ui'

export default function Explore() {
  const [q, setQ] = useState('')
  const [data, setData] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const search = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      setData((await api.get('/planner/explore', { params: { q } })).data)
    } catch (err) {
      setError(errorMessage(err))
      setData(null)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <PageHeader title="Travelpedia" subtitle="Look up any place: today’s weather, the week ahead and the sights around it." />
      <form onSubmit={search} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute" />
          <input className="input pl-10" required placeholder="Search a city or town" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <button className="btn-primary" disabled={busy}>Explore</button>
      </form>
      <div className="mt-8">
        {busy ? (
          <PageLoader label="Looking around…" />
        ) : error ? (
          <ErrorNote>{error}</ErrorNote>
        ) : !data ? (
          <EmptyState icon={Compass} title="Where do you want to look?">Try “Sigiriya”, “Nuwara Eliya” or “Kyoto”.</EmptyState>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">{data.location.name}</h2>
                <p className="text-ink-mute">{[data.location.region, data.location.country].filter(Boolean).join(', ')}</p>
              </div>
              <Link to={`/app/plan?location=${encodeURIComponent(data.location.name)}`} className="btn-accent"><Sparkles className="h-4 w-4" /> Plan a trip here</Link>
            </div>
            {data.about && (
              <div className="panel grid overflow-hidden md:grid-cols-[1fr_260px]">
                <div className="p-5">
                  <p className="leading-relaxed text-ink-soft">{data.about.extract}</p>
                  {data.about.url && <a href={data.about.url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-semibold text-tea-700 underline">Read more on Wikipedia</a>}
                </div>
                {data.about.image && <img src={data.about.image} alt="" className="hidden h-full w-full object-cover md:block" />}
              </div>
            )}
            <WeatherPanel weather={data.weather} />
            <MapView center={data.location} places={data.places} className="h-96" />
            <h3 className="text-lg font-semibold">Places nearby</h3>
            <PlacesGrid places={data.places} />
          </div>
        )}
      </div>
    </div>
  )
}
