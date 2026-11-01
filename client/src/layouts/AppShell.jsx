import { useEffect, useState } from 'react'
import { NavLink, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  BedDouble, CalendarCheck, Car, ClipboardList, Compass, Gauge, LogOut, Map, Menu, MessageSquareHeart,
  PiggyBank, PlusCircle, Sparkles, UserRound, X,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'
import { PageLoader } from '../components/ui'
import { ROLE_HOME, ROLE_LABEL, fullName, initials } from '../lib/format'

const NAV = {
  traveller: [
    { to: '/app', label: 'Overview', icon: Gauge, end: true },
    { to: '/app/plan', label: 'Plan a trip', icon: Sparkles },
    { to: '/app/trips', label: 'My trips', icon: Map },
    { to: '/app/budget', label: 'Budget planner', icon: PiggyBank },
    { to: '/app/explore', label: 'Travelpedia', icon: Compass },
    { to: '/app/stays', label: 'Stays', icon: BedDouble },
    { to: '/app/rides', label: 'Rides', icon: Car },
    { to: '/app/bookings', label: 'My bookings', icon: CalendarCheck },
  ],
  hotel: [
    { to: '/hotel', label: 'Overview', icon: Gauge, end: true },
    { to: '/hotel/listings', label: 'My hotels', icon: BedDouble, end: true },
    { to: '/hotel/listings/new', label: 'Add a hotel', icon: PlusCircle },
    { to: '/hotel/bookings', label: 'Guest bookings', icon: ClipboardList },
  ],
  taxi: [
    { to: '/taxi', label: 'Overview', icon: Gauge, end: true },
    { to: '/taxi/fleet', label: 'My fleet', icon: Car, end: true },
    { to: '/taxi/fleet/new', label: 'Add a vehicle', icon: PlusCircle },
    { to: '/taxi/requests', label: 'Ride requests', icon: ClipboardList },
  ],
}
const BASE = { traveller: '/app', hotel: '/hotel', taxi: '/taxi' }

function NavItems({ role, onNavigate }) {
  const base = BASE[role]
  const items = [
    ...NAV[role],
    { divider: true },
    { to: `${base}/feedback`, label: 'Feedback', icon: MessageSquareHeart },
    { to: `${base}/profile`, label: 'Profile', icon: UserRound },
  ]
  return (
    <nav className="flex flex-col gap-0.5">
      {items.map((it, i) =>
        it.divider ? (
          <div key={i} className="my-3 h-px bg-white/10" />
        ) : (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive ? 'bg-white/10 text-white' : 'text-tea-100/75 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <it.icon className={`h-[18px] w-[18px] ${isActive ? 'text-turmeric-400' : ''}`} />
                {it.label}
              </>
            )}
          </NavLink>
        )
      )}
    </nav>
  )
}

export default function AppShell({ role }) {
  const { user, loading, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => setOpen(false), [location.pathname])

  if (loading) return <PageLoader label="Signing you in…" />
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if (user.role !== role) return <Navigate to={ROLE_HOME[user.role]} replace />

  const signOut = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const sidebar = (
    <div className="flex h-full flex-col bg-ink px-4 py-5">
      <div className="mb-6 flex items-center justify-between px-2">
        <Logo to={BASE[role]} light />
        <button className="rounded-lg p-2 text-white/70 hover:bg-white/10 lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <NavItems role={role} onNavigate={() => setOpen(false)} />
      </div>
      <div className="mt-4 rounded-2xl bg-white/5 p-3">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-turmeric-500 font-display font-bold text-ink">{initials(user)}</div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-white">{fullName(user)}</div>
            <div className="truncate text-xs text-tea-100/60">{ROLE_LABEL[user.role]}</div>
          </div>
          <button onClick={signOut} className="rounded-lg p-2 text-tea-100/70 hover:bg-white/10 hover:text-white" title="Log out" aria-label="Log out">
            <LogOut className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen lg:pl-64">
      <aside className="no-print fixed inset-y-0 left-0 z-30 hidden w-64 lg:block">{sidebar}</aside>
      {open && (
        <div className="no-print fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 max-w-[85vw]">{sidebar}</aside>
        </div>
      )}
      <header className="no-print sticky top-0 z-20 flex items-center justify-between border-b border-mist-200 bg-paper/90 px-4 py-3 backdrop-blur lg:hidden">
        <button className="rounded-lg p-2 hover:bg-mist-50" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
        <Logo to={BASE[role]} />
        <div className="grid h-9 w-9 place-items-center rounded-full bg-turmeric-500 text-sm font-bold">{initials(user)}</div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
        <Outlet />
      </main>
    </div>
  )
}
