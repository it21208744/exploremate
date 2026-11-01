import { Link } from 'react-router-dom'
import { BedDouble, Car, CalendarClock, ClipboardList, Hourglass, PlusCircle, Wallet } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import useFetch from '../../lib/useFetch'
import { ErrorNote, PageHeader, PageLoader, StatCard, StatusBadge } from '../../components/ui'
import { fmtRange, fullName, money } from '../../lib/format'

export default function OwnerOverview() {
  const { user } = useAuth()
  const isHotel = user.role === 'hotel'
  const base = isHotel ? '/hotel' : '/taxi'
  const { data, loading, error, reload } = useFetch('/stats')
  if (loading) return <PageLoader />
  if (error) return <ErrorNote onRetry={reload}>{error}</ErrorNote>
  const peak = Math.max(...data.monthly.map((m) => m.revenue), 1)

  return (
    <div>
      <PageHeader
        title={`Welcome, ${user.firstName}`}
        subtitle={isHotel ? 'How your hotels are doing.' : 'How your fleet is doing.'}
        actions={<Link to={isHotel ? '/hotel/listings/new' : '/taxi/fleet/new'} className="btn-primary"><PlusCircle className="h-4 w-4" /> {isHotel ? 'Add a hotel' : 'Add a vehicle'}</Link>}
      />
      {!data.listings && (
        <div className="mb-6 rounded-panel border border-turmeric-300/60 bg-turmeric-50 p-5 text-sm">
          <strong>Get your first {isHotel ? 'hotel' : 'vehicle'} online.</strong> Travellers can only book you once you have a listing.{' '}
          <Link to={isHotel ? '/hotel/listings/new' : '/taxi/fleet/new'} className="font-semibold text-tea-700 underline">Add it now</Link>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={isHotel ? BedDouble : Car} label={isHotel ? 'Hotels listed' : 'Vehicles listed'} value={data.listings} />
        <StatCard icon={CalendarClock} label="Upcoming confirmed" value={data.upcomingCount} tone="lagoon" />
        {isHotel ? (
          <StatCard icon={ClipboardList} label="All-time bookings" value={data.totalBookings} tone="turmeric" />
        ) : (
          <StatCard icon={Hourglass} label="Requests to answer" value={data.pendingCount} tone="turmeric" />
        )}
        <StatCard icon={Wallet} label="Confirmed revenue" value={money(data.revenue)} tone="mist" />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <section className="panel p-5">
          <h2 className="text-lg font-semibold">Revenue by month</h2>
          <p className="text-sm text-ink-mute">Confirmed bookings by start month, including the next two months</p>
          <div className="mt-6 flex h-48 items-end gap-3">
            {data.monthly.map((m) => (
              <div key={m.key} className="flex flex-1 flex-col items-center gap-2">
                <div className="text-[11px] text-ink-mute">{m.revenue ? `${Math.round(m.revenue / 1000)}k` : ''}</div>
                <div className="w-full max-w-[44px] rounded-t-lg bg-tea-500" style={{ height: `${Math.max((m.revenue / peak) * 140, m.revenue ? 6 : 2)}px`, opacity: m.revenue ? 1 : 0.2 }} title={`${m.label}: ${money(m.revenue)}`} />
                <div className="text-xs text-ink-mute">{m.label}</div>
              </div>
            ))}
          </div>
        </section>
        <section className="panel p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Latest {isHotel ? 'bookings' : 'requests'}</h2>
            <Link to={`${base}/${isHotel ? 'bookings' : 'requests'}`} className="text-sm font-semibold text-tea-700">See all</Link>
          </div>
          {!data.recent.length ? (
            <div className="flex flex-col items-center py-8 text-center text-sm text-ink-mute"><ClipboardList className="mb-2 h-8 w-8 text-mist-300" /> No bookings yet.</div>
          ) : (
            <ul className="divide-y divide-mist-200">
              {data.recent.map((b) => (
                <li key={b._id} className="flex items-center gap-3 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{fullName(b.traveller) || 'Traveller'}</div>
                    <div className="truncate text-xs text-ink-mute">{b.hotel?.name || b.taxi?.vehicleModel}, {fmtRange(b.startDate, b.endDate)}</div>
                  </div>
                  <StatusBadge status={b.status} kind={b.kind} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
