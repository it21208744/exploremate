import { useState } from 'react'
import toast from 'react-hot-toast'
import { MessageSquareHeart, Pencil, Trash2 } from 'lucide-react'
import api, { errorMessage } from '../../api/client'
import useFetch from '../../lib/useFetch'
import { ConfirmDialog, EmptyState, ErrorNote, Field, PageHeader, PageLoader, Spinner, Stars } from '../../components/ui'
import { fmtDate } from '../../lib/format'

const CATEGORIES = { general: 'General', planner: 'Trip planner', booking: 'Bookings', idea: 'Feature idea', bug: 'Something broke' }
const blank = { rating: 0, category: 'general', message: '', isPublic: true }

export default function Feedback() {
  const { data: list, setData, loading, error, reload } = useFetch('/feedback/mine', { initial: [] })
  const [form, setForm] = useState(blank)
  const [editing, setEditing] = useState(null)
  const [busy, setBusy] = useState(false)
  const [del, setDel] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    if (!form.rating) return toast.error('Choose a star rating')
    setBusy(true)
    try {
      if (editing) {
        const { data } = await api.patch(`/feedback/${editing}`, form)
        setData(list.map((f) => (f._id === editing ? data : f)))
        toast.success('Feedback updated')
      } else {
        const { data } = await api.post('/feedback', form)
        setData([data, ...list])
        toast.success('Thanks for your feedback')
      }
      setForm(blank)
      setEditing(null)
    } catch (err) {
      toast.error(errorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  const remove = async () => {
    setBusy(true)
    try {
      await api.delete(`/feedback/${del._id}`)
      setData(list.filter((f) => f._id !== del._id))
      toast.success('Feedback deleted')
      setDel(null)
      if (editing === del._id) { setEditing(null); setForm(blank) }
    } catch (err) {
      toast.error(errorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <PageHeader title="Feedback" subtitle="Tell us what worked and what didn’t. Four- and five-star reviews you mark public may appear on our home page." />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <form onSubmit={submit} className="panel space-y-4 p-6 lg:self-start">
          <h2 className="text-lg font-semibold">{editing ? 'Edit your feedback' : 'Share feedback'}</h2>
          <div>
            <span className="label">How was it?</span>
            <Stars value={form.rating} onChange={(rating) => setForm({ ...form, rating })} size="h-7 w-7" />
          </div>
          <Field label="About">
            <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {Object.entries(CATEGORIES).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </Field>
          <Field label="Your message">
            <textarea className="input min-h-[130px]" required minLength={3} maxLength={2000} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </Field>
          <label className="flex items-center gap-2 text-sm text-ink-soft">
            <input type="checkbox" className="h-4 w-4 accent-tea-600" checked={form.isPublic} onChange={(e) => setForm({ ...form, isPublic: e.target.checked })} />
            OK to show this on the home page (first name and initial only)
          </label>
          <div className="flex justify-end gap-2">
            {editing && <button type="button" className="btn-outline" onClick={() => { setEditing(null); setForm(blank) }}>Cancel</button>}
            <button className="btn-primary" disabled={busy}>{busy && <Spinner className="h-4 w-4" />} {editing ? 'Save changes' : 'Send feedback'}</button>
          </div>
        </form>
        <section>
          <h2 className="mb-3 text-lg font-semibold">Your feedback</h2>
          {loading ? (
            <PageLoader />
          ) : error ? (
            <ErrorNote onRetry={reload}>{error}</ErrorNote>
          ) : !list.length ? (
            <EmptyState icon={MessageSquareHeart} title="Nothing sent yet">Your messages will be listed here so you can edit or remove them.</EmptyState>
          ) : (
            <ul className="space-y-3">
              {list.map((f) => (
                <li key={f._id} className={`panel p-5 ${editing === f._id ? 'ring-2 ring-tea-200' : ''}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Stars value={f.rating} size="h-4 w-4" />
                      <div className="mt-1 text-xs text-ink-mute">{CATEGORIES[f.category]}, {fmtDate(f.createdAt)}{f.isPublic ? '' : ', private'}</div>
                    </div>
                    <div className="flex gap-1">
                      <button className="btn-ghost btn-sm" aria-label="Edit" onClick={() => { setEditing(f._id); setForm({ rating: f.rating, category: f.category, message: f.message, isPublic: f.isPublic }) }}><Pencil className="h-4 w-4" /></button>
                      <button className="btn-ghost btn-sm text-chili-600" aria-label="Delete" onClick={() => setDel(f)}><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                  <p className="mt-3 whitespace-pre-line text-sm text-ink-soft">{f.message}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      <ConfirmDialog open={!!del} title="Delete this feedback?" busy={busy} onClose={() => setDel(null)} onConfirm={remove}>It will be removed for good.</ConfirmDialog>
    </div>
  )
}
