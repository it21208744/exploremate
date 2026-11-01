import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { BedDouble, Car, Eye, EyeOff, Sparkles } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { errorMessage, fieldErrors } from '../api/client'
import Logo from '../components/Logo'
import { Field, Spinner } from '../components/ui'
import { ROLE_HOME } from '../lib/format'

function AuthFrame({ title, subtitle, children, aside }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_minmax(0,520px)]">
      <div className="flex flex-col px-5 py-6 sm:px-10">
        <Logo />
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">{title}</h1>
          <p className="mt-2 text-ink-mute">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
      <div className="relative hidden overflow-hidden bg-ink lg:block">
        <svg className="absolute inset-x-0 bottom-0 w-full text-tea-700" viewBox="0 0 520 300" preserveAspectRatio="none" aria-hidden>
          <path d="M0 160 C 80 100 140 190 230 130 S 400 80 520 140 V300 H0Z" fill="currentColor" opacity=".55" />
          <path d="M0 220 C 100 170 180 240 290 200 S 440 170 520 210 V300 H0Z" fill="#1F6B52" />
          <path d="M0 270 C 120 240 260 290 520 255 V300 H0Z" fill="#185440" />
        </svg>
        <div className="absolute right-16 top-24 h-24 w-24 rounded-full bg-turmeric-500" aria-hidden />
        <div className="relative max-w-sm p-12 pt-48 text-white">{aside}</div>
      </div>
    </div>
  )
}

function PasswordInput({ error, ...props }) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <input {...props} type={show ? 'text' : 'password'} className={`input pr-11 ${error ? 'input-error' : ''}`} />
      <button type="button" onClick={() => setShow((s) => !s)} className="absolute inset-y-0 right-0 px-3 text-ink-mute hover:text-ink" aria-label={show ? 'Hide password' : 'Show password'}>
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  )
}

export function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  if (user) return <Navigate to={ROLE_HOME[user.role]} replace />

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const u = await login(form.email, form.password)
      toast.success(`Welcome back, ${u.firstName}`)
      const from = location.state?.from
      navigate(from && from.startsWith(ROLE_HOME[u.role]) ? from : ROLE_HOME[u.role], { replace: true })
    } catch (err) {
      setError(errorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthFrame
      title="Log in"
      subtitle="Pick up where you left off."
      aside={<p className="font-display text-3xl font-bold leading-snug">Your saved trips, bookings and ride requests are waiting.</p>}
    >
      <form onSubmit={submit} className="space-y-4">
        {error && <p className="rounded-xl bg-chili-50 px-4 py-3 text-sm text-chili-600" role="alert">{error}</p>}
        <Field label="Email">
          <input className="input" type="email" autoComplete="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </Field>
        <Field label="Password">
          <PasswordInput autoComplete="current-password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </Field>
        <button className="btn-primary w-full py-3" disabled={busy}>
          {busy && <Spinner className="h-4 w-4" />} Log in
        </button>
      </form>
      <p className="mt-6 text-sm text-ink-mute">
        New to ExploreMate? <Link className="font-semibold text-tea-700 underline underline-offset-4" to="/register">Create an account</Link>
      </p>
    </AuthFrame>
  )
}

const ROLES = [
  { value: 'traveller', label: 'Traveller', desc: 'Plan trips and book stays & rides', icon: Sparkles },
  { value: 'hotel', label: 'Hotel owner', desc: 'List hotels and manage guests', icon: BedDouble },
  { value: 'taxi', label: 'Taxi operator', desc: 'List vehicles and take ride requests', icon: Car },
]

export function Register() {
  const { user, register } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const initialRole = ROLES.some((r) => r.value === params.get('role')) ? params.get('role') : 'traveller'
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', role: initialRole })
  const [errors, setErrors] = useState({})
  const [busy, setBusy] = useState(false)
  if (user) return <Navigate to={ROLE_HOME[user.role]} replace />

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const checks = [
    [form.password.length >= 8, '8+ characters'],
    [/[A-Z]/.test(form.password), 'an uppercase letter'],
    [/[a-z]/.test(form.password), 'a lowercase letter'],
    [/\d/.test(form.password), 'a number'],
  ]

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setErrors({})
    try {
      const u = await register(form)
      toast.success('Account created — welcome to ExploreMate')
      navigate(ROLE_HOME[u.role], { replace: true })
    } catch (err) {
      const fe = fieldErrors(err)
      setErrors(Object.keys(fe).length ? fe : { _: errorMessage(err) })
    } finally {
      setBusy(false)
    }
  }

  return (
    <AuthFrame
      title="Create your account"
      subtitle="Free for travellers, hotels and taxi operators."
      aside={<p className="font-display text-3xl font-bold leading-snug">From the first idea to the last tuk-tuk ride, in one place.</p>}
    >
      <form onSubmit={submit} className="space-y-4">
        {errors._ && <p className="rounded-xl bg-chili-50 px-4 py-3 text-sm text-chili-600" role="alert">{errors._}</p>}
        <fieldset>
          <legend className="label">I am a…</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {ROLES.map((r) => (
              <label
                key={r.value}
                className={`cursor-pointer rounded-xl border p-3 transition ${form.role === r.value ? 'border-tea-600 bg-tea-50 ring-2 ring-tea-100' : 'border-mist-300 hover:border-tea-400'}`}
              >
                <input type="radio" name="role" value={r.value} checked={form.role === r.value} onChange={set('role')} className="sr-only" />
                <r.icon className={`h-5 w-5 ${form.role === r.value ? 'text-tea-600' : 'text-ink-mute'}`} />
                <div className="mt-2 text-sm font-semibold">{r.label}</div>
                <div className="text-xs text-ink-mute">{r.desc}</div>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First name" error={errors.firstName}>
            <input className="input" required autoComplete="given-name" value={form.firstName} onChange={set('firstName')} />
          </Field>
          <Field label="Last name" error={errors.lastName}>
            <input className="input" required autoComplete="family-name" value={form.lastName} onChange={set('lastName')} />
          </Field>
        </div>
        <Field label="Email" error={errors.email}>
          <input className="input" type="email" required autoComplete="email" value={form.email} onChange={set('email')} />
        </Field>
        <Field label="Phone (optional)" error={errors.phone}>
          <input className="input" type="tel" autoComplete="tel" placeholder="+94 77 123 4567" value={form.phone} onChange={set('phone')} />
        </Field>
        <Field label="Password" error={errors.password}>
          <PasswordInput required autoComplete="new-password" value={form.password} onChange={set('password')} error={errors.password} />
          <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
            {checks.map(([ok, t]) => (
              <li key={t} className={ok ? 'text-tea-600' : 'text-ink-mute'}>{ok ? '✓' : '○'} {t}</li>
            ))}
          </ul>
        </Field>
        <button className="btn-primary w-full py-3" disabled={busy || !checks.every(([ok]) => ok)}>
          {busy && <Spinner className="h-4 w-4" />} Create account
        </button>
      </form>
      <p className="mt-6 text-sm text-ink-mute">
        Already have an account? <Link className="font-semibold text-tea-700 underline underline-offset-4" to="/login">Log in</Link>
      </p>
    </AuthFrame>
  )
}
