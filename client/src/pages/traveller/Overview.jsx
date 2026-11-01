import { Link } from 'react-router-dom'
import { BedDouble, CalendarCheck, Car, Clock, Compass, Map, PiggyBank, Sparkles, Wallet } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import useFetch from '../../lib/useFetch'
import { ErrorNote, PageLoader, StatCard, StatusBadge } from '../../components/ui'
import { fmtRange, money } from '../../lib/format'

export default function Overview() {
  const { user } = useAuth()
  const { data, loading, error, reload } = useFetch('/stats')
  const hour = new Date().getHours()
  const greet = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div>
      <div className="relative overflow-hidden rounded-panel bg-ink p-6 text-white sm:p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-turmeric-500/90" aria-hidden />
        <div className="relative max-w-xl">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">{greet}, {user.firstName}</h1>
          <p className="mt-2 text-tea-100/75">Where to next? Start with a destination and we’ll do the rest.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/app/plan" className="btn-accent"><Sparkles className="h-4 w-4" /> Plan a trip</Link>
            <Link to="/app/budget" className="btn border border-white/20 text-white hover:bg-white/10"><PiggyBank className="h-4 w-4" /> Plan on a budget</Link>
          </div>
        </div>
      </div>

      {loading ? (
        <PageLoader />
      ) : error ? (
        <div className="mt-6"><ErrorNote onRetry={reload}>{error}</ErrorNote></div>
      ) : (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={Map} label="Saved trips" value={data.plans} />
            <StatCard icon={CalendarCheck} label="Upcoming bookings" value={data.upcomingCount} tone="lagoon" />
            <StatCard icon={Clock} label="Awaiting a driver" value={data.pendingCount} tone="turmeric" />
            <StatCard icon={Wallet} label="Booked so far" value={money(data.totalSpent)} tone="mist" />
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <section className="panel p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Coming up</h2>
                <Link to="/app/bookings" className="text-sm font-semibold text-tea-700">All bookings</Link>
              </div>
              {!data.nextBookings.length ? (
                <p className="py-6 text-center text-sm text-ink-mute">No upcoming bookings. <Link to="/app/stays" className="text-tea-700 underline">Find a stay</Link></p>
              ) : (
                <ul className="divide-y divide-mist-200">
                  {data.nextBookings.map((b) => (
                    <li key={b._id} className="flex items-center gap-3 py-3">
                      {b.kind === 'hotel' ? <BedDouble className="h-5 w-5 text-tea-600" /> : <Car className="h-5 w-5 text-turmeric-600" />}
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-medium">{b.hotel?.name || (b.taxi && `${b.taxi.vehicleType}, ${b.taxi.companyName}`) || 'Listing removed'}</div>
                        <div className="text-xs text-ink-mute">{fmtRange(b.startDate, b.endDate)}</div>
                      </div>
                      <StatusBadge status={b.status} kind={b.kind} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
            <section className="grid gap-3">
              {[
                ['/app/explore', Compass, 'Travelpedia', 'Weather and sights for any place'],
                ['/app/stays', BedDouble, 'Stays', 'Hotels with live availability'],
                ['/app/rides', Car, 'Rides', 'Cars, vans and tuk-tuks by the day'],
              ].map(([to, I, t, d]) => (
                <Link key={to} to={to} className="panel flex items-center gap-4 p-4 hover:border-tea-400">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-tea-50 text-tea-600"><I className="h-5 w-5" /></div>
                  <div><div className="font-semibold">{t}</div><div className="text-sm text-ink-mute">{d}</div></div>
                </Link>
              ))}
            </section>
          </div>
        </>
      )}
    </div>
  )
}
