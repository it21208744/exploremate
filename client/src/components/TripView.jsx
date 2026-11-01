import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BedDouble, Car, CheckCircle2, Compass, Droplets, ExternalLink, Lightbulb, ListChecks, MapPin, Route, Sunrise, Sunset, Wind } from 'lucide-react'
import MapView from './MapView'
import WeatherIcon from './WeatherIcon'
import { Tabs } from './ui'
import { AI_LABEL, fmtDate } from '../lib/format'

const TIME_DOT = { Morning: 'bg-turmeric-500', Afternoon: 'bg-tea-500', Evening: 'bg-lagoon-500', Night: 'bg-ink' }

export function DayCard({ day, forecast }) {
  return (
    <section className="panel overflow-hidden break-inside-avoid">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-mist-200 bg-mist-50 px-5 py-4">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-3xl font-extrabold text-tea-600">{day.day}</span>
          <div>
            <h3 className="font-semibold leading-tight">{day.title}</h3>
            {day.date && <div className="text-xs text-ink-mute">{fmtDate(day.date, 'EEEE, d MMMM')}</div>}
          </div>
        </div>
        {forecast && (
          <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm ring-1 ring-mist-200">
            <WeatherIcon icon={forecast.icon} className="h-5 w-5" />
            <span>{forecast.label}</span>
            <span className="text-ink-mute">
              {Math.round(forecast.tempMin)}–{Math.round(forecast.tempMax)}°C
            </span>
            {forecast.rainChance != null && (
              <span className="flex items-center gap-0.5 text-lagoon-600">
                <Droplets className="h-3.5 w-3.5" />
                {forecast.rainChance}%
              </span>
            )}
          </div>
        )}
      </header>
      <ol className="space-y-5 px-5 py-5">
        {day.activities.map((a, i) => (
          <li key={i} className="grid grid-cols-[88px_1fr] gap-3 sm:grid-cols-[110px_1fr]">
            <div className="flex items-start gap-2 pt-0.5 text-sm text-ink-mute">
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${TIME_DOT[a.time] || 'bg-mist-300'}`} />
              {a.time}
            </div>
            <div>
              <div className="font-semibold">{a.title}</div>
              <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{a.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function PackingList({ items, storageKey }) {
  const [checked, setChecked] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || '{}')
    } catch {
      return {}
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(checked))
    } catch {
      /* ignore */
    }
  }, [checked, storageKey])
  const groups = useMemo(() => {
    const g = {}
    for (const it of items) (g[it.category || 'Essentials'] ||= []).push(it)
    return Object.entries(g)
  }, [items])
  const done = items.filter((it) => checked[it.item]).length

  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-mist-200">
          <div className="h-full rounded-full bg-tea-500 transition-all" style={{ width: `${items.length ? (done / items.length) * 100 : 0}%` }} />
        </div>
        <span className="text-sm text-ink-mute">
          {done} of {items.length} packed
        </span>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {groups.map(([cat, list]) => (
          <div key={cat} className="panel p-5 break-inside-avoid">
            <h4 className="mb-3 font-semibold">{cat}</h4>
            <ul className="space-y-3">
              {list.map((it) => (
                <li key={it.item}>
                  <label className="flex cursor-pointer gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 shrink-0 accent-tea-600"
                      checked={!!checked[it.item]}
                      onChange={(e) => setChecked({ ...checked, [it.item]: e.target.checked })}
                    />
                    <span>
                      <span className={`block text-sm font-medium ${checked[it.item] ? 'text-ink-mute line-through' : ''}`}>{it.item}</span>
                      <span className="block text-xs text-ink-mute">{it.reason}</span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export function WeatherPanel({ weather, compact = false }) {
  if (!weather) return <p className="text-sm text-ink-mute">Weather is unavailable right now.</p>
  const c = weather.current
  const trip = weather.trip || []
  const tripHasForecast = trip.some((t) => t.forecast)
  const list = tripHasForecast ? trip.filter((t) => t.forecast).map((t) => t.forecast) : weather.daily.slice(0, 7)
  return (
    <div className="space-y-4">
      {c && (
        <div className="flex flex-wrap items-center gap-6 rounded-panel bg-gradient-to-br from-lagoon-600 to-tea-800 p-5 text-white">
          <WeatherIcon icon={c.icon} className="h-12 w-12 !text-turmeric-300" />
          <div>
            <div className="text-sm text-white/70">Right now</div>
            <div className="font-display text-4xl font-bold">{Math.round(c.temp)}°C</div>
            <div className="text-sm text-white/80">{c.label}, feels like {Math.round(c.feelsLike)}°C</div>
          </div>
          <div className="ml-auto grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-white/85">
            <span className="flex items-center gap-1.5"><Droplets className="h-4 w-4" /> {c.humidity}% humidity</span>
            <span className="flex items-center gap-1.5"><Wind className="h-4 w-4" /> {Math.round(c.wind)} km/h</span>
            {weather.daily[0]?.sunrise && <span className="flex items-center gap-1.5"><Sunrise className="h-4 w-4" /> {weather.daily[0].sunrise.slice(11)}</span>}
            {weather.daily[0]?.sunset && <span className="flex items-center gap-1.5"><Sunset className="h-4 w-4" /> {weather.daily[0].sunset.slice(11)}</span>}
          </div>
        </div>
      )}
      {!compact && (
        <>
          <div className="text-sm font-semibold">{tripHasForecast ? 'Forecast for your trip' : 'Next 7 days'}</div>
          {trip.length > 0 && !tripHasForecast && (
            <p className="-mt-2 text-xs text-ink-mute">Your dates are more than 16 days away. The forecast for them appears closer to the trip — here is this week’s weather.</p>
          )}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {list.map((d) => (
              <div key={d.date} className="panel p-3 text-center">
                <div className="text-xs text-ink-mute">{fmtDate(d.date, 'EEE d')}</div>
                <WeatherIcon icon={d.icon} className="mx-auto my-2 h-7 w-7" />
                <div className="text-sm font-semibold">
                  {Math.round(d.tempMax)}° <span className="font-normal text-ink-mute">{Math.round(d.tempMin)}°</span>
                </div>
                <div className="mt-0.5 text-[11px] text-lagoon-600">{d.rainChance ?? 0}% rain</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function PlacesGrid({ places }) {
  if (!places?.length) return <p className="text-sm text-ink-mute">No notable places found nearby.</p>
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {places.map((p) => (
        <a key={p.id || p.name} href={p.url} target="_blank" rel="noreferrer" className="panel group flex flex-col overflow-hidden transition hover:border-tea-400">
          {p.image ? (
            <img src={p.image} alt="" className="h-36 w-full object-cover" loading="lazy" />
          ) : (
            <div className="grid h-36 place-items-center bg-tea-50"><MapPin className="h-8 w-8 text-tea-400" /></div>
          )}
          <div className="flex flex-1 flex-col p-4">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-semibold leading-snug group-hover:text-tea-700">{p.name}</h4>
              <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-ink-mute" />
            </div>
            <div className="mt-0.5 text-xs text-ink-mute">{[p.description, p.distanceKm != null && `${p.distanceKm} km`].filter(Boolean).join(', ')}</div>
            <p className="mt-2 line-clamp-3 text-sm text-ink-soft">{p.extract}</p>
          </div>
        </a>
      ))}
    </div>
  )
}

/** Full trip display used by the planner result and saved trips. */
export default function TripView({ trip, actions, storageKey }) {
  const [tab, setTab] = useState('itinerary')
  const loc = trip.location || {}
  const forecastByDate = Object.fromEntries((trip.weather?.trip || []).map((t) => [t.date, t.forecast]))

  return (
    <div>
      <div className="panel overflow-hidden">
        <div className="grid gap-0 md:grid-cols-[1fr_280px]">
          <div className="p-6">
            <div className="flex items-center gap-1.5 text-sm text-ink-mute">
              <MapPin className="h-4 w-4" /> {[loc.name, loc.region, loc.country].filter(Boolean).join(', ')}
            </div>
            <h2 className="mt-1 text-2xl font-bold sm:text-3xl">{trip.title || `${trip.days}-day ${String(trip.tripType || '').toLowerCase()} trip to ${loc.name}`}</h2>
            {trip.summary && <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{trip.summary}</p>}
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {trip.startDate && <span className="chip bg-mist-50 text-ink-soft">Starts {fmtDate(trip.startDate, 'd MMM yyyy')}</span>}
              {trip.tripType && <span className="chip bg-tea-50 text-tea-700">{trip.tripType}</span>}
              {trip.generatedBy && <span className="chip bg-turmeric-50 text-turmeric-700">Planned by {AI_LABEL[trip.generatedBy] || trip.generatedBy}</span>}
            </div>
            {actions && <div className="no-print mt-5 flex flex-wrap gap-2">{actions}</div>}
          </div>
          {trip.about?.image || trip.places?.[0]?.image ? (
            <img src={trip.about?.image || trip.places[0].image} alt="" className="hidden h-full w-full object-cover md:block" />
          ) : (
            <div className="hidden bg-tea-600 md:block" />
          )}
        </div>
      </div>

      <div className="no-print mt-6">
        <Tabs
          value={tab}
          onChange={setTab}
          tabs={[
            { value: 'itinerary', label: 'Itinerary', icon: Route },
            { value: 'packing', label: 'Packing list', icon: ListChecks, count: trip.packingList?.length },
            { value: 'travelpedia', label: 'Travelpedia', icon: Compass },
          ]}
        />
      </div>

      <div className="mt-6">
        {tab === 'itinerary' && (
          <div className="space-y-5">
            {trip.itinerary.map((d) => (
              <DayCard key={d.day} day={d} forecast={forecastByDate[d.date]} />
            ))}
            {trip.tips?.length > 0 && (
              <div className="rounded-panel border border-turmeric-300/60 bg-turmeric-50 p-5">
                <h3 className="flex items-center gap-2 font-semibold"><Lightbulb className="h-5 w-5 text-turmeric-600" /> Local tips</h3>
                <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                  {trip.tips.map((t) => (
                    <li key={t} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-tea-600" /> {t}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="no-print grid gap-4 sm:grid-cols-2">
              <Link to={`/app/stays?location=${encodeURIComponent(loc.name || '')}`} className="panel flex items-center gap-4 p-5 hover:border-tea-400">
                <BedDouble className="h-8 w-8 text-tea-600" />
                <div><div className="font-semibold">Find a stay in {loc.name}</div><div className="text-sm text-ink-mute">Hotels listed by local owners</div></div>
              </Link>
              <Link to={`/app/rides?location=${encodeURIComponent(loc.name || '')}`} className="panel flex items-center gap-4 p-5 hover:border-tea-400">
                <Car className="h-8 w-8 text-tea-600" />
                <div><div className="font-semibold">Hire a driver in {loc.name}</div><div className="text-sm text-ink-mute">Cars, vans and tuk-tuks</div></div>
              </Link>
            </div>
          </div>
        )}
        {tab === 'packing' && <PackingList items={trip.packingList || []} storageKey={storageKey} />}
        {tab === 'travelpedia' && (
          <div className="space-y-6">
            {trip.about?.extract && (
              <div className="panel p-5">
                <h3 className="font-semibold">About {loc.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{trip.about.extract}</p>
                {trip.about.url && <a href={trip.about.url} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm font-semibold text-tea-700 underline">Read more on Wikipedia</a>}
              </div>
            )}
            <WeatherPanel weather={trip.weather} />
            <MapView center={loc} places={trip.places || []} className="h-96" />
            <PlacesGrid places={trip.places} />
          </div>
        )}
      </div>
    </div>
  )
}
