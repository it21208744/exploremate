import { useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ArrowLeft, Pencil, Printer, Trash2 } from 'lucide-react'
import { useReactToPrint } from 'react-to-print'
import api, { errorMessage } from '../../api/client'
import useFetch from '../../lib/useFetch'
import TripView from '../../components/TripView'
import { ConfirmDialog, ErrorNote, Field, Modal, PageLoader, Spinner } from '../../components/ui'

export default function TripDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: trip, setData, loading, error, reload } = useFetch(`/planner/plans/${id}`)
  const [confirm, setConfirm] = useState(false)
  const [busy, setBusy] = useState(false)
  const [edit, setEdit] = useState(null)
  const printRef = useRef(null)
  const print = useReactToPrint({ content: () => printRef.current, documentTitle: trip?.title || 'ExploreMate trip' })

  if (loading) return <PageLoader />
  if (error) return <ErrorNote onRetry={reload}>{error}</ErrorNote>

  const remove = async () => {
    setBusy(true)
    try {
      await api.delete(`/planner/plans/${id}`)
      toast.success('Trip deleted')
      navigate('/app/trips')
    } catch (e) {
      toast.error(errorMessage(e))
      setBusy(false)
    }
  }
  const saveEdit = async (e) => {
    e.preventDefault()
    setBusy(true)
    try {
      const { data } = await api.patch(`/planner/plans/${id}`, edit)
      setData(data)
      setEdit(null)
      toast.success('Trip updated')
    } catch (err) {
      toast.error(errorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <Link to="/app/trips" className="no-print mb-4 inline-flex items-center gap-1.5 text-sm text-ink-mute hover:text-ink"><ArrowLeft className="h-4 w-4" /> My trips</Link>
      <div ref={printRef}>
        <TripView
          trip={trip}
          storageKey={`em_pack_${id}`}
          actions={
            <>
              <button className="btn-outline" onClick={() => setEdit({ title: trip.title, notes: trip.notes || '' })}><Pencil className="h-4 w-4" /> Rename & notes</button>
              <button className="btn-outline" onClick={print}><Printer className="h-4 w-4" /> Print</button>
              <button className="btn-ghost text-chili-600" onClick={() => setConfirm(true)}><Trash2 className="h-4 w-4" /> Delete</button>
            </>
          }
        />
        {trip.notes && (
          <div className="panel mt-6 p-5">
            <h3 className="font-semibold">My notes</h3>
            <p className="mt-2 whitespace-pre-line text-sm text-ink-soft">{trip.notes}</p>
          </div>
        )}
      </div>
      <ConfirmDialog open={confirm} title="Delete this trip?" busy={busy} onClose={() => setConfirm(false)} onConfirm={remove}>
        “{trip.title}” will be removed from My trips. Bookings you made are not affected.
      </ConfirmDialog>
      <Modal
        open={!!edit}
        onClose={() => setEdit(null)}
        title="Rename & notes"
        footer={<><button className="btn-outline" onClick={() => setEdit(null)}>Cancel</button><button className="btn-primary" form="edit-trip" disabled={busy}>{busy && <Spinner className="h-4 w-4" />} Save changes</button></>}
      >
        {edit && (
          <form id="edit-trip" onSubmit={saveEdit} className="space-y-4">
            <Field label="Trip name"><input className="input" required maxLength={120} value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} /></Field>
            <Field label="Notes"><textarea className="input min-h-[140px]" maxLength={5000} value={edit.notes} onChange={(e) => setEdit({ ...edit, notes: e.target.value })} placeholder="Flight times, people to meet, restaurants to try…" /></Field>
          </form>
        )}
      </Modal>
    </div>
  )
}
