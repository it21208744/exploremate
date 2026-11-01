import { Link } from 'react-router-dom'
import { Map, MapPin, Plus } from 'lucide-react'
import useFetch from '../../lib/useFetch'
import { EmptyState, ErrorNote, PageHeader, PageLoader } from '../../components/ui'
import { fmtDate } from '../../lib/format'

export default function Trips() {
  const { data: plans, loading, error, reload } = useFetch('/planner/plans', { initial: [] })
  return (
    <div>
      <PageHeader title="My trips" subtitle="Every plan you saved, ready to open, print or share." actions={<Link to="/app/plan" className="btn-primary"><Plus className="h-4 w-4" /> Plan a trip</Link>} />
      {loading ? (
        <PageLoader />
      ) : error ? (
        <ErrorNote onRetry={reload}>{error}</ErrorNote>
      ) : !plans.length ? (
        <EmptyState icon={Map} title="No saved trips yet" action={<Link to="/app/plan" className="btn-primary">Plan your first trip</Link>}>
          Generate a plan and press “Save trip” to keep it here.
        </EmptyState>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => (
            <Link key={p._id} to={`/app/trips/${p._id}`} className="panel group flex flex-col p-5 transition hover:border-tea-400">
              <div className="flex items-center gap-1.5 text-sm text-ink-mute"><MapPin className="h-4 w-4 text-tea-600" /> {[p.location?.name, p.location?.country].filter(Boolean).join(', ')}</div>
              <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-tea-700">{p.title}</h3>
              <p className="mt-2 line-clamp-2 flex-1 text-sm text-ink-soft">{p.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {p.startDate && <span className="chip bg-mist-50 text-ink-soft">{fmtDate(p.startDate)}</span>}
                <span className="chip bg-tea-50 text-tea-700">{p.days} days</span>
                <span className="chip bg-mist-50 text-ink-soft">{p.activityCount} activities</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
