import { useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Check, ClipboardList, Mail, Phone, Printer, X } from 'lucide-react'
import { useReactToPrint } from 'react-to-print'
import api, { errorMessage } from '../../api/client'
import { useAuth } from '../../context/AuthContext'
import useFetch from '../../lib/useFetch'
import { ConfirmDialog, EmptyState, ErrorNote, PageHeader, PageLoader, StatusBadge, Tabs } from '../../components/ui'
import { fmtDate, fmtRange, fullName, money } from '../../lib/format'

export default function IncomingBookings() {
  const { user } = useAuth()
  const isHotel = user.role === 'hotel'
  const { data: list, setData, loading, error, reload } = useFetch('/bookings/incoming', { initial: [] })
  const [tab, setTab] = useState(isHotel ? 'upcoming' : 'pending')
  const [confirm, setConfirm] = useState(null)
  const [busyId, setBusyId] = useState(null)
  const printRef = useRef(null)
  const print = useReactToPrint({ content: () => printRef.current, documentTitle: 'ExploreMate bookings report' })
  const today = new Date(new Date().toDateString())

  const groups = useMemo(
    () => ({
      pending: list.filter((b) => b.status === 'pending'),
      upcoming: list.filter((b) => b.status === 'confirmed' && new Date(b.endDate) >= today).sort((a, b) => new Date(a.startDate) - new Date(b.startDate)),
      past: list.filter((b) => b.status === 'confirmed' && new Date(b.endDate) < today),
      closed: list.filter((b) => ['cancelled', 'declined'].includes(b.status)),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [list]
  )

  const setStatus = async (b, status) => {
    setBusyId(b._id)
    try {
      const { data } = await api.patch(`/bookings/${b._id}/status`, { status })
      setData(list.map((x) => (x._id === b._id ? { ...x, status: data.status } : x)))
      toast.success({ confirmed: 'Ride accepted', declined: 'Request declined', cancelled: 'Booking cancelled' }[status])
      setConfirm(null)
    } catch (e) {
      toast.error(errorMessage(e))
    } finally {
      setBusyId(null)
    }
  }

  const tabs = [
    ...(isHotel ? [] : [{ value: 'pending', label: 'New requests', count: groups.pending.length }]),
    { value: 'upcoming', label: 'Upcoming', count: groups.upcoming.length },
    { value: 'past', label: 'Completed', count: groups.past.length },
    { value: 'closed', label: 'Cancelled & declined', count: groups.closed.length },
  ]
  const shown = groups[tab]

  return (
    <div>
      <PageHeader
        title={isHotel ? 'Guest bookings' : 'Ride requests'}
        subtitle={isHotel ? 'Every stay booked at your hotels.' : 'Accept or decline requests, and keep track of confirmed hires.'}
        actions={<button className="btn-outline" onClick={print} disabled={!shown.length}><Printer className="h-4 w-4" /> Print this list</button>}
      />
      <Tabs value={tab} onChange={setTab} tabs={tabs} />
      <div className="mt-6" ref={printRef}>
        <h2 className="mb-4 hidden text-xl font-bold print:block">{tabs.find((t) => t.value === tab)?.label} — printed {fmtDate(new Date())}</h2>
        {loading ? (
          <PageLoader />
        ) : error ? (
          <ErrorNote onRetry={reload}>{error}</ErrorNote>
        ) : !shown.length ? (
          <EmptyState icon={ClipboardList} title="Nothing here right now">{tab === 'pending' ? 'New ride requests from travellers will appear here.' : null}</EmptyState>
        ) : (
          <div className="panel overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-mist-200 bg-mist-50 text-xs text-ink-mute">
                <tr>
                  <th className="px-4 py-3 font-medium">Guest</th>
                  <th className="px-4 py-3 font-medium">{isHotel ? 'Hotel' : 'Vehicle'}</th>
                  <th className="px-4 py-3 font-medium">Dates</th>
                  <th className="px-4 py-3 font-medium">{isHotel ? 'Guests' : 'Passengers'}</th>
                  <th className="px-4 py-3 text-right font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="no-print px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-mist-200">
                {shown.map((b) => (
                  <tr key={b._id} className="align-top">
                    <td className="px-4 py-3">
                      <div className="font-medium">{fullName(b.traveller)}</div>
                      <div className="mt-0.5 flex flex-col gap-0.5 text-xs text-ink-mute">
                        <a href={`mailto:${b.traveller?.email}`} className="flex items-center gap-1 hover:text-tea-700"><Mail className="h-3 w-3" /> {b.traveller?.email}</a>
                        {b.traveller?.phone && <a href={`tel:${b.traveller.phone}`} className="flex items-center gap-1 hover:text-tea-700"><Phone className="h-3 w-3" /> {b.traveller.phone}</a>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {isHotel ? b.hotel?.name : b.taxi ? `${b.taxi.vehicleModel} (${b.taxi.plateNo})` : 'Removed'}
                      {b.pickupLocation && <div className="text-xs text-ink-mute">Pickup: {b.pickupLocation}</div>}
                      {b.notes && <div className="text-xs text-ink-mute">Note: {b.notes}</div>}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{fmtRange(b.startDate, b.endDate)}<div className="text-xs text-ink-mute">{b.units} {isHotel ? 'night' : 'day'}{b.units > 1 ? 's' : ''}</div></td>
                    <td className="px-4 py-3">{b.guests}</td>
                    <td className="px-4 py-3 text-right font-semibold whitespace-nowrap">{money(b.totalPrice)}</td>
                    <td className="px-4 py-3"><StatusBadge status={b.status} kind={b.kind} /></td>
                    <td className="no-print px-4 py-3">
                      <div className="flex justify-end gap-1.5">
                        {b.status === 'pending' && (
                          <>
                            <button className="btn-primary btn-sm" disabled={busyId === b._id} onClick={() => setStatus(b, 'confirmed')}><Check className="h-3.5 w-3.5" /> Accept</button>
                            <button className="btn-outline btn-sm" disabled={busyId === b._id} onClick={() => setConfirm({ b, status: 'declined' })}><X className="h-3.5 w-3.5" /> Decline</button>
                          </>
                        )}
                        {b.status === 'confirmed' && tab === 'upcoming' && (
                          <button className="btn-ghost btn-sm text-chili-600" onClick={() => setConfirm({ b, status: 'cancelled' })}>Cancel</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-mist-200 bg-mist-50 text-sm">
                <tr>
                  <td className="px-4 py-3 font-medium" colSpan={4}>{shown.length} booking{shown.length > 1 ? 's' : ''}</td>
                  <td className="px-4 py-3 text-right font-semibold">{money(shown.reduce((s, b) => s + b.totalPrice, 0))}</td>
                  <td colSpan={2} />
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
      <ConfirmDialog
        open={!!confirm}
        title={confirm?.status === 'declined' ? 'Decline this request?' : 'Cancel this booking?'}
        confirmLabel={confirm?.status === 'declined' ? 'Decline request' : 'Cancel booking'}
        busy={!!busyId}
        onClose={() => setConfirm(null)}
        onConfirm={() => setStatus(confirm.b, confirm.status)}
      >
        {fullName(confirm?.b?.traveller)} will see the change in their bookings. Consider contacting them first.
      </ConfirmDialog>
    </div>
  )
}
