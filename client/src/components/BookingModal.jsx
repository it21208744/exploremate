import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { addDays, differenceInCalendarDays, parseISO, startOfDay, subDays } from 'date-fns'
import { BedDouble, Car, Mail, MapPin, Phone, Snowflake, Users } from 'lucide-react'
import api, { errorMessage } from '../api/client'
import { ListingImage, Modal, PageLoader, Spinner } from './ui'
import { fmtRange, isoDay, money } from '../lib/format'

/**
 * Booking flow for a hotel (nights, check-out day free) or a taxi (inclusive hire days).
 * Props: kind, id, open, onClose, onBooked, defaultGuests
 */
export default function BookingModal({ kind, id, open, onClose, onBooked, defaultGuests = 1, defaultRange }) {
  const [item, setItem] = useState(null)
  const [range, setRange] = useState(defaultRange)
  const [guests, setGuests] = useState(defaultGuests)
  const [pickup, setPickup] = useState('')
  const [notes, setNotes] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(null)
  const isHotel = kind === 'hotel'

  useEffect(() => {
    if (!open || !id) return
    setItem(null)
    setDone(null)
    setRange(defaultRange)
    setGuests(defaultGuests)
    api
      .get(`/${isHotel ? 'hotels' : 'taxis'}/${id}`)
      .then((r) => setItem(r.data))
      .catch((e) => {
        toast.error(errorMessage(e))
        onClose()
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, id])

  const disabled = useMemo(() => {
    const ranges = (item?.bookedRanges || []).map((r) => {
      const from = startOfDay(parseISO(r.from))
      const to = startOfDay(parseISO(r.to))
      // Hotel check-out day stays bookable as someone else's check-in
      return { from, to: isHotel ? subDays(to, 1) : to }
    })
    return [{ before: startOfDay(new Date()) }, ...ranges]
  }, [item, isHotel])

  const units = range?.from && range?.to ? differenceInCalendarDays(range.to, range.from) + (isHotel ? 0 : 1) : range?.from && !isHotel ? 1 : 0
  const price = isHotel ? item?.pricePerNight : item?.dailyRate
  const max = isHotel ? item?.maxGuests : item?.seats
  const ready = isHotel ? units >= 1 : !!range?.from

  // Stop a range from spanning over booked dates
  const onSelect = (r) => {
    if (r?.from && r?.to) {
      const clash = (item?.bookedRanges || []).some((b) => {
        const s = startOfDay(parseISO(b.from)), e = startOfDay(parseISO(b.to))
        return isHotel ? s < r.to && e > r.from : s <= r.to && e >= r.from
      })
      if (clash) {
        toast.error('That range includes dates that are already booked')
        return setRange({ from: r.to, to: undefined })
      }
    }
    setRange(r)
  }

  const book = async () => {
    setBusy(true)
    try {
      const { data } = await api.post('/bookings', {
        kind,
        itemId: id,
        startDate: isoDay(range.from),
        endDate: isoDay(range.to || range.from),
        guests: Number(guests),
        pickupLocation: pickup,
        notes,
      })
      setDone(data)
      onBooked?.(data)
    } catch (e) {
      toast.error(errorMessage(e))
    } finally {
      setBusy(false)
    }
  }

  const title = item ? (isHotel ? item.name : `${item.vehicleModel}, ${item.companyName}`) : 'Loading…'

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={done ? (done.status === 'confirmed' ? 'Booking confirmed' : 'Request sent') : title}
      size="lg"
      footer={
        done ? (
          <>
            <button className="btn-outline" onClick={onClose}>Close</button>
            <Link to="/app/bookings" className="btn-primary" onClick={onClose}>View my bookings</Link>
          </>
        ) : item ? (
          <>
            <div className="mr-auto self-center text-sm">
              {ready ? (
                <>
                  <span className="text-ink-mute">{units} {isHotel ? (units === 1 ? 'night' : 'nights') : units === 1 ? 'day' : 'days'} × {money(price)} = </span>
                  <strong className="font-display text-lg">{money(units * price)}</strong>
                </>
              ) : (
                <span className="text-ink-mute">{isHotel ? 'Pick check-in and check-out dates' : 'Pick the day(s) you need a driver'}</span>
              )}
            </div>
            <button className="btn-primary" disabled={!ready || busy} onClick={book}>
              {busy && <Spinner className="h-4 w-4" />} {isHotel ? 'Book this stay' : 'Request this ride'}
            </button>
          </>
        ) : null
      }
    >
      {!item ? (
        <PageLoader />
      ) : done ? (
        <div className="py-4 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-tea-50 text-2xl text-tea-600">✓</div>
          <p className="mt-4 text-lg font-semibold">{isHotel ? `You’re staying at ${item.name}` : `${item.companyName} will confirm your ride`}</p>
          <p className="mt-1 text-ink-mute">{fmtRange(done.startDate, done.endDate)}, {money(done.totalPrice)}</p>
          {!isHotel && <p className="mx-auto mt-3 max-w-sm text-sm text-ink-mute">You’ll see the status change to “Confirmed” in My bookings once the operator accepts.</p>}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-[1fr_auto]">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl">
              <ListingImage src={item.imageUrl} name={isHotel ? item.name : item.companyName} icon={isHotel ? BedDouble : Car} className="h-44" />
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-mute">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {item.address || item.location}</span>
              <span className="flex items-center gap-1"><Users className="h-4 w-4" /> Up to {max}</span>
              {!isHotel && item.airConditioned && <span className="flex items-center gap-1"><Snowflake className="h-4 w-4" /> A/C</span>}
            </div>
            {isHotel ? (
              <>
                <p className="text-sm leading-relaxed text-ink-soft">{item.description}</p>
                <dl className="grid gap-3 text-sm sm:grid-cols-2">
                  <div className="rounded-xl bg-mist-50 p-3"><dt className="text-xs text-ink-mute">Rooms</dt><dd>{item.roomDetails}</dd></div>
                  <div className="rounded-xl bg-mist-50 p-3"><dt className="text-xs text-ink-mute">Package</dt><dd>{item.packageDetails}</dd></div>
                </dl>
                {item.amenities?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">{item.amenities.map((a) => <span key={a} className="chip bg-tea-50 text-tea-700">{a}</span>)}</div>
                )}
              </>
            ) : (
              <dl className="grid gap-3 text-sm sm:grid-cols-2">
                <div className="rounded-xl bg-mist-50 p-3"><dt className="text-xs text-ink-mute">Vehicle</dt><dd>{item.vehicleType}, {item.vehicleModel}, {item.plateNo}</dd></div>
                <div className="rounded-xl bg-mist-50 p-3"><dt className="text-xs text-ink-mute">Driver</dt><dd>{item.driverName}</dd></div>
                <div className="rounded-xl bg-mist-50 p-3"><dt className="text-xs text-ink-mute">Daily rate</dt><dd>{money(item.dailyRate)} with driver</dd></div>
                {item.pricePerKm > 0 && <div className="rounded-xl bg-mist-50 p-3"><dt className="text-xs text-ink-mute">Extra distance</dt><dd>{money(item.pricePerKm)} per km</dd></div>}
              </dl>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <a className="flex items-center gap-1 text-tea-700" href={`tel:${isHotel ? item.phone : item.companyPhone}`}><Phone className="h-4 w-4" /> {isHotel ? item.phone : item.companyPhone}</a>
              <a className="flex items-center gap-1 text-tea-700" href={`mailto:${isHotel ? item.email : item.companyEmail}`}><Mail className="h-4 w-4" /> {isHotel ? item.email : item.companyEmail}</a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="label">{isHotel ? 'Guests' : 'Passengers'}</span>
                <input className="input" type="number" min="1" max={max} value={guests} onChange={(e) => setGuests(e.target.value)} />
              </label>
              {!isHotel && (
                <label className="block">
                  <span className="label">Pickup point</span>
                  <input className="input" placeholder="Hotel name or address" value={pickup} onChange={(e) => setPickup(e.target.value)} />
                </label>
              )}
              <label className={`block ${isHotel ? '' : 'sm:col-span-2'}`}>
                <span className="label">Note for the {isHotel ? 'hotel' : 'driver'} (optional)</span>
                <input className="input" maxLength={500} placeholder={isHotel ? 'Late arrival, dietary needs…' : 'Flight number, luggage…'} value={notes} onChange={(e) => setNotes(e.target.value)} />
              </label>
            </div>
          </div>
          <div>
            <div className="mb-1 text-sm font-semibold">{isHotel ? 'Check-in → check-out' : 'Hire dates'}</div>
            <div className="rounded-xl border border-mist-200 p-2">
              <DayPicker mode="range" selected={range} onSelect={onSelect} disabled={disabled} fromDate={new Date()} toDate={addDays(new Date(), 365)} numberOfMonths={1} />
            </div>
            <p className="mt-2 max-w-[300px] text-xs text-ink-mute">Struck-through dates are already booked. {range?.from && fmtRange(range.from, range.to || range.from)}</p>
          </div>
        </div>
      )}
    </Modal>
  )
}
