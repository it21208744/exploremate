import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AlertCircle, Loader2, Star, X } from 'lucide-react'

export const Spinner = ({ className = 'h-5 w-5' }) => <Loader2 className={`animate-spin ${className}`} aria-hidden />

export function PageLoader({ label = 'Loading…' }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-ink-mute" role="status">
      <Spinner className="h-7 w-7 text-tea-600" />
      <span className="text-sm">{label}</span>
    </div>
  )
}

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-sub">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2 no-print">{actions}</div>}
    </div>
  )
}

export function EmptyState({ icon: Icon, title, children, action }) {
  return (
    <div className="panel flex flex-col items-center px-6 py-14 text-center">
      {Icon && (
        <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-tea-50 text-tea-600">
          <Icon className="h-7 w-7" />
        </div>
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      {children && <p className="mt-1 max-w-md text-sm text-ink-mute">{children}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

export function ErrorNote({ children, onRetry }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-chili-500/30 bg-chili-50 p-4 text-sm text-chili-600" role="alert">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="flex-1">{children}</div>
      {onRetry && (
        <button className="font-semibold underline" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}

export function Field({ label, error, hint, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      {label && <span className="label">{label}</span>}
      {children}
      {error ? <p className="field-error">{error}</p> : hint ? <p className="mt-1 text-xs text-ink-mute">{hint}</p> : null}
    </label>
  )
}

export function Modal({ open, onClose, title, children, footer, size = 'md' }) {
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    ref.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])
  if (!open) return null
  const width = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl', xl: 'max-w-5xl' }[size]
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]" onClick={onClose} />
      <div
        ref={ref}
        tabIndex={-1}
        className={`relative flex max-h-[92vh] w-full ${width} flex-col overflow-hidden rounded-t-panel bg-white shadow-ticket outline-none sm:rounded-panel`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-mist-200 px-5 py-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button className="btn-ghost -mr-2 p-2" onClick={onClose} aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
        {footer && <div className="flex flex-wrap justify-end gap-2 border-t border-mist-200 bg-mist-50 px-5 py-3">{footer}</div>}
      </div>
    </div>,
    document.body
  )
}

export function ConfirmDialog({ open, title, children, confirmLabel = 'Delete', tone = 'danger', busy, onConfirm, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
      footer={
        <>
          <button className="btn-outline" onClick={onClose} disabled={busy}>
            Keep it
          </button>
          <button className={tone === 'danger' ? 'btn-danger' : 'btn-primary'} onClick={onConfirm} disabled={busy}>
            {busy && <Spinner className="h-4 w-4" />} {confirmLabel}
          </button>
        </>
      }
    >
      <div className="text-sm text-ink-soft">{children}</div>
    </Modal>
  )
}

const STATUS = {
  pending: 'bg-turmeric-50 text-turmeric-700 ring-turmeric-300/60',
  confirmed: 'bg-tea-50 text-tea-700 ring-tea-200',
  declined: 'bg-chili-50 text-chili-600 ring-chili-500/30',
  cancelled: 'bg-mist-50 text-ink-mute ring-mist-300',
}
const STATUS_TEXT = { pending: 'Awaiting driver', confirmed: 'Confirmed', declined: 'Declined', cancelled: 'Cancelled' }
export function StatusBadge({ status, kind }) {
  const text = status === 'pending' && kind === 'hotel' ? 'Pending' : STATUS_TEXT[status]
  return <span className={`chip ring-1 ${STATUS[status] || STATUS.cancelled}`}>{text}</span>
}

export function Stars({ value = 0, onChange, size = 'h-5 w-5' }) {
  const [hover, setHover] = useState(0)
  const shown = hover || value
  return (
    <div className="flex gap-0.5" onMouseLeave={() => setHover(0)} role={onChange ? 'radiogroup' : undefined} aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) =>
        onChange ? (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} star${n > 1 ? 's' : ''}`}
            onMouseEnter={() => setHover(n)}
            onClick={() => onChange(n)}
            className="rounded p-0.5"
          >
            <Star className={`${size} ${n <= shown ? 'fill-turmeric-500 text-turmeric-500' : 'text-mist-300'}`} />
          </button>
        ) : (
          <Star key={n} className={`${size} ${n <= shown ? 'fill-turmeric-500 text-turmeric-500' : 'text-mist-300'}`} aria-hidden />
        )
      )}
    </div>
  )
}

/** Listing photo with a tasteful generated fallback. */
const PATTERNS = ['from-tea-600 to-tea-900', 'from-lagoon-500 to-tea-800', 'from-turmeric-600 to-tea-800', 'from-tea-400 to-lagoon-600']
export function ListingImage({ src, name = '', className = 'h-40', icon: Icon }) {
  const [failed, setFailed] = useState(false)
  const hash = [...name].reduce((h, c) => h + c.charCodeAt(0), 0)
  if (src && !failed) return <img src={src} alt="" onError={() => setFailed(true)} className={`${className} w-full object-cover`} loading="lazy" />
  return (
    <div className={`${className} relative w-full overflow-hidden bg-gradient-to-br ${PATTERNS[hash % PATTERNS.length]}`}>
      <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden>
        <path d="M0 80 Q 40 50 80 70 T 160 60 T 200 70 V100 H0Z" fill="#fff" />
        <path d="M0 90 Q 50 70 100 85 T 200 80 V100 H0Z" fill="#fff" />
      </svg>
      {Icon && <Icon className="absolute bottom-3 right-3 h-6 w-6 text-white/70" />}
      <span className="absolute left-4 top-3 font-display text-3xl font-bold text-white/90">{name.slice(0, 1)}</span>
    </div>
  )
}

export function Tabs({ tabs, value, onChange }) {
  return (
    <div className="flex gap-1 overflow-x-auto rounded-xl bg-mist-50 p-1" role="tablist">
      {tabs.map((t) => (
        <button
          key={t.value}
          role="tab"
          aria-selected={value === t.value}
          onClick={() => onChange(t.value)}
          className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-sm font-medium transition ${
            value === t.value ? 'bg-white text-ink shadow-lift' : 'text-ink-mute hover:text-ink'
          }`}
        >
          {t.icon && <t.icon className="h-4 w-4" />}
          {t.label}
          {t.count != null && <span className="rounded-full bg-mist-200 px-1.5 text-[11px]">{t.count}</span>}
        </button>
      ))}
    </div>
  )
}

export function StatCard({ icon: Icon, label, value, hint, tone = 'tea' }) {
  const tones = { tea: 'bg-tea-50 text-tea-600', turmeric: 'bg-turmeric-50 text-turmeric-700', lagoon: 'bg-lagoon-50 text-lagoon-600', mist: 'bg-mist-50 text-ink-soft' }
  return (
    <div className="panel p-5">
      <div className="flex items-center gap-3">
        <div className={`grid h-10 w-10 place-items-center rounded-xl ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-sm text-ink-mute">{label}</span>
      </div>
      <div className="mt-3 font-display text-2xl font-bold">{value}</div>
      {hint && <div className="mt-0.5 text-xs text-ink-mute">{hint}</div>}
    </div>
  )
}
