import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { BedDouble, CalendarCheck, Car, MapPin, Phone } from 'lucide-react'
import api, { errorMessage } from '../../api/client'
import useFetch from '../../lib/useFetch'
import { ConfirmDialog, EmptyState, ErrorNote, PageHeader, PageLoader, StatusBadge, Tabs } from '../../components/ui'
import { fmtRange, money } from '../../lib/format'

export default function MyBookings() {
  const { data: list, setData, loading, error, reload } = useFetch('/bookings/mine', { initial: [] })
  const [tab, setTab] = useState('upcoming')
  const [cancel, setCancel] = useState(null)
  const [busy, setBusy] = useState(false)
  const today = new Date(new Date().toDateString())

  const groups = useMemo(() => {
    const active = (b) => ['pending', 'confirmed'].includes(b.status)
    return {
      upcoming: list.filter((b) => active(b) && new Date(b.endDate) >= today).sort((a, b) => new Date(a.startDate) - new Date(b.startDate)),
      past: list.filter((b) => active(b) && new Date(b.endDate) < today),
      cancelled: list.filter((b) => !active(b)),
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list])

  const doCancel = async () => {
    setBusy(true)
    try {
      const { data } = await api.patch(`/bookings/${cancel._id}/status`, { status: 'cancelled' })
      setData(list.map((b) => (b._id === data._id ? { ...b, status: data.status } : b)))
      toast.success('Booking cancelled')
      setCancel(null)
    } catch (e) {
      toast.error(errorMessage(e))
    } finally {
      setBusy(false)
    }
  }

  const shown = groups[tab]
  return (
    <div>
      <PageHeader title="My bookings" subtitle="Stays and rides in one list. Cancel anything that hasn’t ended yet." />
      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { value: 'upcoming', label: 'Upcoming', count: groups.upcoming.length },
          { value: 'past', label: 'Past', count: groups.past.length },
          { value: 'cancelled', label: 'Cancelled & declined', count: groups.cancelled.length },
        ]}
      />
      <div className="mt-6">
        {loading ? (
          <PageLoader />
        ) : error ? (
          <ErrorNote onRetry={reload}>{error}</ErrorNote>
        ) : !shown.length ? (
          <EmptyState
            icon={CalendarCheck}
            title={tab === 'upcoming' ? 'Nothing booked yet' : 'Nothing here'}
            action={tab === 'upcoming' && <div className="flex gap-2"><Link to="/app/stays" className="btn-primary">Find a stay</Link><Link to="/app/rides" className="btn-outline">Hire a ride</Link></div>}
          >
            {tab === 'upcoming' ? 'Book a hotel or a driver and it will show up here.' : null}
          </EmptyState>
        ) : (
          <ul className="space-y-3">
            {shown.map((b) => {
              const isHotel = b.kind === 'hotel'
              const l = isHotel ? b.hotel : b.taxi
              return (
                <li key={b._id} className="panel flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
                  <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${isHotel ? 'bg-tea-50 text-tea-600' : 'bg-turmeric-50 text-turmeric-700'}`}>
                    {isHotel ? <BedDouble className="h-6 w-6" /> : <Car className="h-6 w-6" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{l ? (isHotel ? l.name : `${l.vehicleModel}, ${l.companyName}`) : 'Listing removed'}</h3>
                      <StatusBadge status={b.status} kind={b.kind} />
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-mute">
                      <span>{fmtRange(b.startDate, b.endDate)}, {b.units} {isHotel ? 'night' : 'day'}{b.units > 1 ? 's' : ''}</span>
                      {l?.location && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {l.location}</span>}
                      {l && <a href={`tel:${isHotel ? l.phone : l.driverPhone || l.companyPhone}`} className="flex items-center gap-1 text-tea-700"><Phone className="h-3.5 w-3.5" /> {isHotel ? l.phone : `${l.driverName}, ${l.driverPhone}`}</a>}
                    </div>
                    {b.notes && <p className="mt-1 text-xs text-ink-mute">Note: {b.notes}</p>}
                  </div>
                  <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                    <div className="font-display text-lg font-bold">{money(b.totalPrice)}</div>
                    {tab === 'upcoming' && <button className="btn-ghost btn-sm text-chili-600" onClick={() => setCancel(b)}>Cancel</button>}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <ConfirmDialog open={!!cancel} title="Cancel this booking?" confirmLabel="Cancel booking" busy={busy} onClose={() => setCancel(null)} onConfirm={doCancel}>
        The dates will be released for other travellers. Check the property’s policy if you paid a deposit directly.
      </ConfirmDialog>
    </div>
  )
}
