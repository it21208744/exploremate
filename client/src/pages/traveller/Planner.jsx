import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { addDays } from 'date-fns'
import { Bookmark, Printer, RotateCcw, Sparkles } from 'lucide-react'
import { useReactToPrint } from 'react-to-print'
import api, { errorMessage, fieldErrors } from '../../api/client'
import TripView from '../../components/TripView'
import { ErrorNote, Field, PageHeader, Spinner } from '../../components/ui'
import { isoDay } from '../../lib/format'

const TYPES = ['Cultural', 'Adventure', 'Historical', 'Family-Friendly', 'Food Hunting', 'Beach & Relaxation', 'Nature & Wildlife']
const STEPS = ['Finding the destination', 'Checking the forecast', 'Looking up places nearby', 'Writing your itinerary']

function Generating() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((x) => Math.min(x + 1, STEPS.length - 1)), 1800)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="panel flex flex-col items-center px-6 py-14 text-center" role="status" aria-live="polite">
      <Spinner className="h-8 w-8 text-tea-600" />
      <ul className="mt-6 space-y-2 text-sm">
        {STEPS.map((s, n) => (
          <li key={s} className={n < i ? 'text-tea-600' : n === i ? 'font-semibold text-ink' : 'text-ink-mute/60'}>
            {n < i ? '✓ ' : ''}
            {s}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Planner() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    location: params.get('location') || '',
    startDate: isoDay(addDays(new Date(), 7)),
    days: 3,
    tripType: 'Cultural',
    travellers: 2,
    interests: '',
  })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [trip, setTrip] = useState(null)
  const printRef = useRef(null)
  const print = useReactToPrint({ content: () => printRef.current, documentTitle: trip ? `ExploreMate — ${trip.location.name}` : 'ExploreMate trip' })

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const generate = async (e) => {
    e.preventDefault()
    setBusy(true)
    setErrors({})
    setError('')
    setTrip(null)
    try {
      const { data } = await api.post('/planner/generate', { ...form, days: Number(form.days), travellers: Number(form.travellers) })
      setTrip(data)
    } catch (err) {
      setErrors(fieldErrors(err))
      setError(errorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  const save = async () => {
    setSaving(true)
    try {
      const { data } = await api.post('/planner/plans', trip)
      toast.success('Trip saved to My trips')
      navigate(`/app/trips/${data._id}`)
    } catch (err) {
      toast.error(errorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <PageHeader title="Plan a trip" subtitle="Where are you headed? We’ll combine the live forecast with real sights nearby and build your days." />

      <form onSubmit={generate} className="panel no-print grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-6">
        <Field label="Destination" error={errors.location} className="sm:col-span-2 lg:col-span-2">
          <input className="input" required placeholder="Kandy, Ella, Paris, Tokyo…" value={form.location} onChange={set('location')} />
        </Field>
        <Field label="Start date" error={errors.startDate}>
          <input className="input" type="date" required min={isoDay(new Date())} value={form.startDate} onChange={set('startDate')} />
        </Field>
        <Field label="Days" error={errors.days}>
          <input className="input" type="number" min="1" max="14" required value={form.days} onChange={set('days')} />
        </Field>
        <Field label="Travellers" error={errors.travellers}>
          <input className="input" type="number" min="1" max="30" value={form.travellers} onChange={set('travellers')} />
        </Field>
        <Field label="Trip style">
          <select className="input" value={form.tripType} onChange={set('tripType')}>
            {TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Anything you love? (optional)" className="sm:col-span-2 lg:col-span-4">
          <input className="input" placeholder="e.g. tea estates, street food, photography, slow mornings" value={form.interests} onChange={set('interests')} maxLength={300} />
        </Field>
        <div className="flex items-end sm:col-span-2">
          <button className="btn-accent w-full py-3" disabled={busy}>
            {busy ? <Spinner className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />} {busy ? 'Planning…' : 'Plan my trip'}
          </button>
        </div>
      </form>

      <div className="mt-8">
        {busy && <Generating />}
        {!busy && error && <ErrorNote>{error}</ErrorNote>}
        {!busy && trip && (
          <div ref={printRef}>
            <TripView
              trip={trip}
              storageKey={`em_pack_draft_${trip.location.name}_${trip.startDate}`}
              actions={
                <>
                  <button className="btn-primary" onClick={save} disabled={saving}>
                    {saving ? <Spinner className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />} Save trip
                  </button>
                  <button className="btn-outline" onClick={print}><Printer className="h-4 w-4" /> Print</button>
                  <button className="btn-ghost" onClick={generate}><RotateCcw className="h-4 w-4" /> Try another version</button>
                </>
              }
            />
          </div>
        )}
      </div>
    </div>
  )
}
