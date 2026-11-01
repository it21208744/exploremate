import { Link } from 'react-router-dom'

export default function Logo({ to = '/', light = false }) {
  return (
    <Link to={to} className="flex items-center gap-2.5" aria-label="ExploreMate home">
      <svg viewBox="0 0 64 64" className="h-9 w-9" aria-hidden>
        <rect width="64" height="64" rx="16" fill={light ? '#fff' : '#12302A'} />
        <path d="M18 44c6-16 14-24 28-26-4 6-6 12-6 18-6-2-14 0-22 8Z" fill="#E8A317" />
        <circle cx="24" cy="24" r="4" fill={light ? '#1F6B52' : '#A9D3BE'} />
      </svg>
      <span className={`font-display text-xl font-bold tracking-tight ${light ? 'text-white' : 'text-ink'}`}>ExploreMate</span>
    </Link>
  )
}
