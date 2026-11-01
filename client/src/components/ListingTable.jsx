import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Pencil, PlusCircle, Printer, Search, Trash2 } from 'lucide-react'
import { useReactToPrint } from 'react-to-print'
import api, { errorMessage } from '../api/client'
import useFetch from '../lib/useFetch'
import { ConfirmDialog, EmptyState, ErrorNote, ListingImage, PageHeader, PageLoader } from './ui'
import { fmtDate } from '../lib/format'

/** Owner listing manager: search, print report, show/hide, edit, delete. */
export default function ListingTable({ title, subtitle, endpoint, basePath, noun, icon, columns, searchFields, nameOf }) {
  const { data: rows, setData, loading, error, reload } = useFetch(`${endpoint}/mine`, { initial: [] })
  const [q, setQ] = useState('')
  const [del, setDel] = useState(null)
  const [busy, setBusy] = useState(false)
  const printRef = useRef(null)
  const print = useReactToPrint({ content: () => printRef.current, documentTitle: `ExploreMate ${noun} report` })

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    return t ? rows.filter((r) => searchFields.some((f) => String(r[f] || '').toLowerCase().includes(t))) : rows
  }, [rows, q, searchFields])

  const toggle = async (r) => {
    try {
      const { data } = await api.patch(`${endpoint}/${r._id}`, { active: !r.active })
      setData(rows.map((x) => (x._id === r._id ? data : x)))
      toast.success(data.active ? 'Now visible to travellers' : 'Hidden from travellers')
    } catch (e) {
      toast.error(errorMessage(e))
    }
  }
  const remove = async () => {
    setBusy(true)
    try {
      await api.delete(`${endpoint}/${del._id}`)
      setData(rows.filter((x) => x._id !== del._id))
      toast.success(`${noun} deleted`)
      setDel(null)
    } catch (e) {
      toast.error(errorMessage(e))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <PageHeader
        title={title}
        subtitle={subtitle}
        actions={
          <>
            <button className="btn-outline" onClick={print} disabled={!filtered.length}><Printer className="h-4 w-4" /> Print report</button>
            <Link to={`${basePath}/new`} className="btn-primary"><PlusCircle className="h-4 w-4" /> Add {noun.toLowerCase()}</Link>
          </>
        }
      />
      {rows.length > 0 && (
        <div className="relative mb-4 max-w-sm">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-mute" />
          <input className="input pl-10" placeholder="Search by name or location" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" />
        </div>
      )}
      {loading ? (
        <PageLoader />
      ) : error ? (
        <ErrorNote onRetry={reload}>{error}</ErrorNote>
      ) : !rows.length ? (
        <EmptyState icon={icon} title={`No ${noun.toLowerCase()}s yet`} action={<Link to={`${basePath}/new`} className="btn-primary">Add your first {noun.toLowerCase()}</Link>}>
          Add one and travellers can find and book it right away.
        </EmptyState>
      ) : (
        <div ref={printRef}>
          <h2 className="mb-4 hidden text-xl font-bold print:block">{title} — {fmtDate(new Date())} ({filtered.length})</h2>
          <div className="panel overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-mist-200 bg-mist-50 text-xs text-ink-mute">
                <tr>
                  <th className="px-4 py-3 font-medium">{noun}</th>
                  {columns.map((c) => <th key={c.label} className={`px-4 py-3 font-medium ${c.align === 'right' ? 'text-right' : ''}`}>{c.label}</th>)}
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="no-print px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-mist-200">
                {filtered.map((r) => (
                  <tr key={r._id}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-14 shrink-0 overflow-hidden rounded-lg"><ListingImage src={r.imageUrl} name={nameOf(r)} className="h-11" /></div>
                        <div className="font-medium">{nameOf(r)}</div>
                      </div>
                    </td>
                    {columns.map((c) => <td key={c.label} className={`px-4 py-3 ${c.align === 'right' ? 'text-right' : ''}`}>{c.render(r)}</td>)}
                    <td className="px-4 py-3">
                      <span className={`chip ${r.active ? 'bg-tea-50 text-tea-700' : 'bg-mist-50 text-ink-mute'}`}>{r.active ? 'Live' : 'Hidden'}</span>
                    </td>
                    <td className="no-print px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button className="btn-ghost btn-sm" onClick={() => toggle(r)} title={r.active ? 'Hide' : 'Show'} aria-label={r.active ? 'Hide from travellers' : 'Show to travellers'}>
                          {r.active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                        <Link to={`${basePath}/${r._id}/edit`} className="btn-ghost btn-sm" aria-label="Edit"><Pencil className="h-4 w-4" /></Link>
                        <button className="btn-ghost btn-sm text-chili-600" onClick={() => setDel(r)} aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!filtered.length && <p className="p-6 text-center text-sm text-ink-mute">Nothing matches “{q}”.</p>}
          </div>
        </div>
      )}
      <ConfirmDialog open={!!del} title={`Delete ${del ? nameOf(del) : ''}?`} busy={busy} onClose={() => setDel(null)} onConfirm={remove}>
        This removes the listing for good and cancels its upcoming bookings. To pause it instead, hide it from travellers.
      </ConfirmDialog>
    </div>
  )
}
