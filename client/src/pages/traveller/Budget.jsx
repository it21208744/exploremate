import { useState } from 'react'
import { Link } from 'react-router-dom'
import { addDays } from 'date-fns'
import { BedDouble, Car, Coins, PiggyBank, Sparkles } from 'lucide-react'
import api, { errorMessage, fieldErrors } from '../../api/client'
import BookingModal from '../../components/BookingModal'
import { EmptyState, ErrorNote, Field, ListingImage, PageHeader, Spinner } from '../../components/ui'
import { AI_LABEL, money } from '../../lib/format'

export default function Budget() {
  const [form, setForm] = useState({ location: '', budget: 50000, nights: 2, guests: 2, withTaxi: true })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)
  const [booking, setBooking] = useState(null)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setErrors({})
    setError('')
    try {
      const { data } = await api.post('/budget/plan', { ...form, budget: Number(form.budget), nights: Number(form.nights), guests: Number(form.guests) })
      setResult(data)
    } catch (err) {
      setErrors(fieldErrors(err))
      setError(errorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  const start = addDays(new Date(), 1)
  const defaultRange = (kind) => ({ from: start, to: addDays(start, kind === 'hotel' ? Number(form.nights) : Number(form.nights) - 1) })

  return (
    <div>
      <PageHeader title="Budget planner" subtitle="Tell us your total budget. We’ll pair stays with a driver that fit inside it and suggest how to spend your days." />
      <form onSubmit={submit} className="panel grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-[2fr_1.3fr_1fr_1fr_auto]">
        <Field label="Where" error={errors.location}>
          <input className="input" required placeholder="Kandy, Galle, Ella…" value={form.location} onChange={set('location')} />
        </Field>
        <Field label="Total budget (LKR)" error={errors.budget}>
          <input className="input" type="number" min="1" required value={form.budget} onChange={set('budget')} />
        </Field>
        <Field label="Nights" error={errors.nights}>
          <input className="input" type="number" min="1" max="30" required value={form.nights} onChange={set('nights')} />
        </Field>
        <Field label="Guests" error={errors.guests}>
          <input className="input" type="number" min="1" max="30" required value={form.guests} onChange={set('guests')} />
        </Field>
        <div className="flex items-end">
          <button className="btn-accent w-full py-3" disabled={busy}>{busy ? <Spinner className="h-4 w-4" /> : <PiggyBank className="h-4 w-4" />} Find options</button>
        </div>
        <label className="flex items-center gap-2 text-sm text-ink-soft sm:col-span-2 lg:col-span-5">
          <input type="checkbox" className="h-4 w-4 accent-tea-600" checked={form.withTaxi} onChange={set('withTaxi')} />
          Include a car with driver for every day of the stay
        </label>
      </form>

      <div className="mt-8">
        {busy ? (
          <div className="panel flex items-center justify-center gap-3 py-14 text-ink-mute"><Spinner className="h-6 w-6 text-tea-600" /> Matching stays and rides to your budget…</div>
        ) : error ? (
          <ErrorNote>{error}</ErrorNote>
        ) : result && !result.options.length ? (
          <EmptyState icon={Coins} title={`Nothing fits LKR ${Number(result.query.budget).toLocaleString()} in ${result.query.location} yet`}>
            {result.stats.hotelsInArea
              ? `We found ${result.stats.hotelsInArea} stays here — the cheapest is ${money(result.stats.cheapestNight)} a night, so ${result.query.nights} nights needs at least ${money(result.stats.cheapestNight * result.query.nights)}.`
              : 'No hotels are listed in that area yet. Try a nearby city.'}
          </EmptyState>
        ) : result ? (
          <div className="space-y-5">
            <p className="text-sm text-ink-mute">
              {result.options.length} option{result.options.length > 1 ? 's' : ''} for {result.query.nights} night{result.query.nights > 1 ? 's' : ''} in {result.query.location}. Day plans by {AI_LABEL[result.generatedBy]}.
            </p>
            {result.options.map((o) => (
              <article key={o.hotel._id} className="panel grid overflow-hidden lg:grid-cols-[260px_1fr_240px]">
                <ListingImage src={o.hotel.imageUrl} name={o.hotel.name} icon={BedDouble} className="h-48 lg:h-full" />
                <div className="p-5">
                  <h3 className="text-lg font-semibold">{o.hotel.name}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{o.plan.highlight}</p>
                  <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                    {[['Morning', o.plan.morning], ['Afternoon', o.plan.afternoon], ['Evening', o.plan.evening]].map(([k, v]) => (
                      <div key={k}><dt className="text-xs font-semibold text-tea-700">{k}</dt><dd className="mt-0.5 text-ink-soft">{v}</dd></div>
                    ))}
                  </dl>
                  {o.plan.moneyTip && <p className="mt-4 flex gap-2 rounded-xl bg-turmeric-50 p-3 text-sm text-ink-soft"><Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-turmeric-600" /> {o.plan.moneyTip}</p>}
                </div>
                <div className="flex flex-col gap-3 border-t border-mist-200 bg-mist-50 p-5 lg:border-l lg:border-t-0">
                  <div className="flex justify-between text-sm"><span className="text-ink-mute">Stay, {o.nights} night{o.nights > 1 ? 's' : ''}</span><span>{money(o.stayCost)}</span></div>
                  {o.taxi ? (
                    <div className="flex justify-between text-sm"><span className="text-ink-mute">{o.taxi.vehicleType}, {o.days} day{o.days > 1 ? 's' : ''}</span><span>{money(o.rideCost)}</span></div>
                  ) : form.withTaxi ? (
                    <div className="text-xs text-ink-mute">No driver fits the remaining budget</div>
                  ) : null}
                  <div className="flex justify-between border-t border-mist-300 pt-3 font-semibold"><span>Total</span><span className="font-display text-lg">{money(o.total)}</span></div>
                  <div className="text-xs text-tea-700">{money(o.remaining)} left for food & tickets</div>
                  <button className="btn-primary mt-auto" onClick={() => setBooking({ kind: 'hotel', id: o.hotel._id })}><BedDouble className="h-4 w-4" /> Book the stay</button>
                  {o.taxi && <button className="btn-outline" onClick={() => setBooking({ kind: 'taxi', id: o.taxi._id })}><Car className="h-4 w-4" /> Request the ride</button>}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState icon={PiggyBank} title="Set a budget to see what fits">
            We only show combinations you can afford, with the money left over for everything else. <Link to="/app/stays" className="text-tea-700 underline">Or browse all stays</Link>.
          </EmptyState>
        )}
      </div>
      <BookingModal kind={booking?.kind} id={booking?.id} open={!!booking} onClose={() => setBooking(null)} defaultGuests={Number(form.guests)} defaultRange={booking ? defaultRange(booking.kind) : undefined} />
    </div>
  )
}
