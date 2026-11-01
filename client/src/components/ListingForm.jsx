import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ArrowLeft, X } from 'lucide-react'
import api, { errorMessage, fieldErrors } from '../api/client'
import ImageUpload from './ImageUpload'
import { ErrorNote, Field, PageHeader, PageLoader, Spinner } from './ui'

function TagInput({ value = [], onChange, suggestions = [] }) {
  const [text, setText] = useState('')
  const add = (t) => {
    const v = t.trim()
    if (v && !value.includes(v)) onChange([...value, v])
    setText('')
  }
  return (
    <div>
      <div className="input flex min-h-[46px] flex-wrap gap-1.5 py-2">
        {value.map((t) => (
          <span key={t} className="chip bg-tea-50 text-tea-700">
            {t}
            <button type="button" onClick={() => onChange(value.filter((x) => x !== t))} aria-label={`Remove ${t}`}><X className="h-3 w-3" /></button>
          </span>
        ))}
        <input
          className="min-w-[120px] flex-1 bg-transparent text-sm outline-none"
          value={text}
          placeholder={value.length ? '' : 'Type and press Enter'}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault()
              add(text)
            } else if (e.key === 'Backspace' && !text && value.length) onChange(value.slice(0, -1))
          }}
          onBlur={() => text && add(text)}
        />
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {suggestions.filter((s) => !value.includes(s)).map((s) => (
          <button key={s} type="button" className="chip bg-mist-50 text-ink-soft hover:bg-tea-50" onClick={() => add(s)}>+ {s}</button>
        ))}
      </div>
    </div>
  )
}

/**
 * Config-driven create/edit form for hotels and taxis.
 * sections: [{ title, description, fields: [{ name, label, type, required, options, span, placeholder, hint }] }]
 */
export default function ListingForm({ endpoint, listPath, nounTitle, sections, defaults }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState(defaults)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(!!id)
  const [loadError, setLoadError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!id) return
    api
      .get(`${endpoint}/${id}`)
      .then(({ data }) => setForm(Object.fromEntries(Object.keys(defaults).map((k) => [k, data[k] ?? defaults[k]]))))
      .catch((e) => setLoadError(errorMessage(e)))
      .finally(() => setLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const set = (name, value) => setForm((f) => ({ ...f, [name]: value }))

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setErrors({})
    try {
      const payload = { ...form }
      for (const s of sections) for (const f of s.fields) if (f.type === 'number' && payload[f.name] !== '') payload[f.name] = Number(payload[f.name])
      if (id) await api.patch(`${endpoint}/${id}`, payload)
      else await api.post(endpoint, payload)
      toast.success(id ? 'Changes saved' : `${nounTitle} added`)
      navigate(listPath)
    } catch (err) {
      const fe = fieldErrors(err)
      setErrors(fe)
      toast.error(errorMessage(err))
      const first = Object.keys(fe)[0]
      if (first) document.querySelector(`[name="${first}"]`)?.focus()
    } finally {
      setBusy(false)
    }
  }

  if (loading) return <PageLoader />
  if (loadError) return <ErrorNote>{loadError}</ErrorNote>

  const input = (f) => {
    const common = { name: f.name, id: f.name, required: f.required, placeholder: f.placeholder, className: `input ${errors[f.name] ? 'input-error' : ''}` }
    if (f.type === 'textarea') return <textarea {...common} rows={f.rows || 3} value={form[f.name]} onChange={(e) => set(f.name, e.target.value)} />
    if (f.type === 'select')
      return (
        <select {...common} value={form[f.name]} onChange={(e) => set(f.name, e.target.value)}>
          {f.options.map((o) => <option key={o}>{o}</option>)}
        </select>
      )
    if (f.type === 'tags') return <TagInput value={form[f.name]} onChange={(v) => set(f.name, v)} suggestions={f.suggestions} />
    if (f.type === 'image') return <ImageUpload value={form[f.name]} onChange={(v) => set(f.name, v)} />
    if (f.type === 'toggle')
      return (
        <span className="flex items-center gap-2 text-sm">
          <input type="checkbox" className="h-4 w-4 accent-tea-600" checked={!!form[f.name]} onChange={(e) => set(f.name, e.target.checked)} />
          {f.toggleLabel}
        </span>
      )
    return <input {...common} type={f.type || 'text'} min={f.min} step={f.step} value={form[f.name]} onChange={(e) => set(f.name, e.target.value)} />
  }

  return (
    <div>
      <Link to={listPath} className="mb-4 inline-flex items-center gap-1.5 text-sm text-ink-mute hover:text-ink"><ArrowLeft className="h-4 w-4" /> Back</Link>
      <PageHeader title={id ? `Edit ${nounTitle.toLowerCase()}` : `Add a ${nounTitle.toLowerCase()}`} subtitle={id ? 'Changes show up for travellers straight away.' : 'Fill in the details travellers need to book you.'} />
      <form onSubmit={submit} className="space-y-6">
        {sections.map((s) => (
          <section key={s.title} className="panel grid gap-6 p-5 md:grid-cols-[220px_1fr] md:p-6">
            <div>
              <h2 className="font-semibold">{s.title}</h2>
              {s.description && <p className="mt-1 text-sm text-ink-mute">{s.description}</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {s.fields.map((f) => (
                <Field key={f.name} label={f.label} error={errors[f.name]} hint={f.hint} className={f.span === 2 ? 'sm:col-span-2' : ''}>
                  {input(f)}
                </Field>
              ))}
            </div>
          </section>
        ))}
        <div className="sticky bottom-0 z-10 -mx-4 flex justify-end gap-2 border-t border-mist-200 bg-paper/95 px-4 py-4 backdrop-blur sm:mx-0 sm:rounded-panel sm:border">
          <Link to={listPath} className="btn-outline">Cancel</Link>
          <button className="btn-primary" disabled={busy}>{busy && <Spinner className="h-4 w-4" />} {id ? 'Save changes' : `Add ${nounTitle.toLowerCase()}`}</button>
        </div>
      </form>
    </div>
  )
}
