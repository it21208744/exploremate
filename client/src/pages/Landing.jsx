import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BedDouble, Car, CloudRain, CloudSun, MapPin, Sun, Umbrella, Footprints, Shirt, Sparkles } from 'lucide-react'
import api from '../api/client'
import Logo from '../components/Logo'
import { Stars } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { ROLE_HOME } from '../lib/format'

function SampleTicket() {
  const days = [
    { d: 'Fri', icon: CloudSun, t: '28°', tone: 'text-turmeric-500' },
    { d: 'Sat', icon: CloudRain, t: '26°', tone: 'text-lagoon-500' },
    { d: 'Sun', icon: Sun, t: '29°', tone: 'text-turmeric-500' },
  ]
  const stops = [
    ['Morning', 'Temple of the Tooth', 'Arrive for the 9:30 puja; shoulders and knees covered.'],
    ['Afternoon', 'Kandy Lake loop', 'An easy 3 km walk under the shade of the lakeside trees.'],
    ['Evening', 'Udawattakele Forest', 'Short trail to spot macaques before sunset at 5:47 pm.'],
  ]
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-4 -z-10 rotate-2 rounded-[28px] bg-turmeric-500/90" aria-hidden />
      <div className="overflow-hidden rounded-[24px] bg-white shadow-ticket">
        <div className="flex items-start justify-between bg-ink px-6 pb-5 pt-6 text-white">
          <div>
            <div className="flex items-center gap-1.5 text-sm text-tea-100/70">
              <MapPin className="h-4 w-4" /> Kandy, Sri Lanka
            </div>
            <div className="mt-1 font-display text-2xl font-bold">3 days, cultural</div>
          </div>
          <div className="flex gap-3">
            {days.map((x) => (
              <div key={x.d} className="flex flex-col items-center gap-1 text-xs text-tea-100/70">
                {x.d}
                <x.icon className={`h-5 w-5 ${x.tone}`} />
                <span className="font-semibold text-white">{x.t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative px-6 py-5">
          <div className="mb-3 text-sm font-semibold text-tea-700">Day 1</div>
          <ol className="relative space-y-4 border-l-2 border-dashed border-tea-200 pl-5">
            {stops.map(([time, title, desc]) => (
              <li key={title} className="relative">
                <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-white bg-tea-600 ring-2 ring-tea-200" />
                <div className="text-xs text-ink-mute">{time}</div>
                <div className="font-semibold">{title}</div>
                <div className="text-sm text-ink-soft">{desc}</div>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-dashed border-mist-300 bg-mist-50 px-6 py-4">
          {[[Umbrella, 'Rain jacket'], [Shirt, 'Temple-ready clothes'], [Footprints, 'Slip-on shoes']].map(([I, t]) => (
            <span key={t} className="chip bg-white text-ink-soft ring-1 ring-mist-200">
              <I className="h-3.5 w-3.5 text-tea-600" /> {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Landing() {
  const { user } = useAuth()
  const [reviews, setReviews] = useState([])
  useEffect(() => {
    api.get('/feedback/public').then((r) => setReviews(r.data)).catch(() => {})
  }, [])
  const home = user ? ROLE_HOME[user.role] : null

  return (
    <div className="overflow-x-hidden">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
        <Logo />
        <nav className="flex items-center gap-2">
          {home ? (
            <Link to={home} className="btn-primary">Open my dashboard</Link>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">Log in</Link>
              <Link to="/register" className="btn-primary">Create account</Link>
            </>
          )}
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:pt-16">
        <div>
          <h1 className="font-display text-[2.6rem] font-extrabold leading-[1.02] sm:text-6xl lg:text-[4.2rem]">
            Plan the trip. Pack for the weather. Book the stay and the ride.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Tell ExploreMate where and when. It checks the real forecast, finds the sights nearby and hands you a day-by-day
            plan with a packing list — then lets you book a hotel and a driver in the same place.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={home || '/register'} className="btn-accent px-6 py-3 text-base">
              <Sparkles className="h-5 w-5" /> Plan my first trip
            </Link>
            <Link to="/register?role=hotel" className="btn-outline px-6 py-3 text-base">List my hotel or taxi</Link>
          </div>
        </div>
        <SampleTicket />
      </section>

      <section className="bg-ink py-20 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="max-w-2xl font-display text-3xl font-bold text-white sm:text-4xl">How a plan comes together</h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-4">
            {[
              ['Say where and when', 'Pick a destination, a start date, how many days and the kind of trip you like.'],
              ['We check the ground', 'Live 16-day forecast from Open-Meteo and notable places nearby from Wikipedia.'],
              ['Get your plan', 'Morning, afternoon and evening for every day, plus a packing list that matches the weather.'],
              ['Book and go', 'Reserve a hotel and hire a car, van or tuk-tuk from local operators — all in one account.'],
            ].map(([t, d], i) => (
              <li key={t}>
                <div className="font-display text-5xl font-extrabold text-turmeric-500">{i + 1}</div>
                <h3 className="mt-3 text-lg font-semibold text-white">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tea-100/70">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">One place for travellers and the people who host them</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            [Sparkles, 'Travellers', 'Plan trips, save them, stay within budget and keep every booking in one list.', '/register?role=traveller', 'Start planning'],
            [BedDouble, 'Hotel owners', 'List rooms and packages, see guest bookings as they arrive and print reports.', '/register?role=hotel', 'List a hotel'],
            [Car, 'Taxi operators', 'Add your vehicles and drivers, then accept or decline ride requests.', '/register?role=taxi', 'Add a vehicle'],
          ].map(([I, t, d, to, cta], i) => (
            <div key={t} className={`rounded-panel p-7 ${i === 0 ? 'bg-tea-600 text-white' : 'border border-mist-200 bg-white'}`}>
              <I className={`h-8 w-8 ${i === 0 ? 'text-turmeric-400' : 'text-tea-600'}`} />
              <h3 className={`mt-5 text-xl font-bold ${i === 0 ? 'text-white' : ''}`}>{t}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${i === 0 ? 'text-tea-50/85' : 'text-ink-mute'}`}>{d}</p>
              <Link to={to} className={`mt-6 inline-block text-sm font-semibold underline underline-offset-4 ${i === 0 ? 'text-turmeric-300' : 'text-tea-700'}`}>
                {cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="border-t border-mist-200 bg-mist-50 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-3xl font-bold">What people say after their trips</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {reviews.slice(0, 3).map((r) => (
                <figure key={r.id} className="panel p-6">
                  <Stars value={r.rating} size="h-4 w-4" />
                  <blockquote className="mt-4 leading-relaxed text-ink-soft">“{r.message}”</blockquote>
                  <figcaption className="mt-4 flex items-center gap-2 text-sm font-semibold">
                    {r.name}
                    {r.isSample && <span className="chip bg-mist-50 font-normal text-ink-mute">Sample review</span>}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-mist-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-ink-mute sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Logo />
          <p>Weather by Open-Meteo and MET Norway, maps © OpenStreetMap contributors, place info from Wikipedia.</p>
        </div>
      </footer>
    </div>
  )
}
