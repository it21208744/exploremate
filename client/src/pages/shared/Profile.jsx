import { useState } from 'react'
import toast from 'react-hot-toast'
import api, { errorMessage, fieldErrors } from '../../api/client'
import { useAuth } from '../../context/AuthContext'
import { Field, PageHeader, Spinner } from '../../components/ui'
import { ROLE_LABEL, fmtDate, fullName, initials } from '../../lib/format'

export default function Profile() {
  const { user, applySession } = useAuth()
  const [form, setForm] = useState({ firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone || '' })
  const [pw, setPw] = useState({ currentPassword: '', newPassword: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [pwErrors, setPwErrors] = useState({})
  const [busy, setBusy] = useState(null)

  const saveProfile = async (e) => {
    e.preventDefault()
    setBusy('profile')
    setErrors({})
    try {
      const { data } = await api.patch('/auth/me', form)
      applySession(data)
      toast.success('Profile saved')
    } catch (err) {
      setErrors(fieldErrors(err))
      toast.error(errorMessage(err))
    } finally {
      setBusy(null)
    }
  }

  const savePassword = async (e) => {
    e.preventDefault()
    if (pw.newPassword !== pw.confirm) return setPwErrors({ confirm: 'Passwords do not match' })
    setBusy('pw')
    setPwErrors({})
    try {
      await api.patch('/auth/me/password', { currentPassword: pw.currentPassword, newPassword: pw.newPassword })
      setPw({ currentPassword: '', newPassword: '', confirm: '' })
      toast.success('Password changed')
    } catch (err) {
      const fe = fieldErrors(err)
      setPwErrors(Object.keys(fe).length ? fe : { currentPassword: errorMessage(err) })
    } finally {
      setBusy(null)
    }
  }

  return (
    <div>
      <PageHeader title="Profile" subtitle="Your details are shared with hotels and drivers when you book." />
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="panel flex flex-col items-center p-6 text-center lg:self-start">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-turmeric-500 font-display text-2xl font-bold">{initials(user)}</div>
          <div className="mt-3 text-lg font-semibold">{fullName(user)}</div>
          <div className="text-sm text-ink-mute">{user.email}</div>
          <span className="chip mt-3 bg-tea-50 text-tea-700">{ROLE_LABEL[user.role]}</span>
          {user.createdAt && <div className="mt-4 text-xs text-ink-mute">Member since {fmtDate(user.createdAt, 'MMMM yyyy')}</div>}
        </aside>
        <div className="space-y-6">
          <form onSubmit={saveProfile} className="panel p-6">
            <h2 className="text-lg font-semibold">Personal details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="First name" error={errors.firstName}><input className="input" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} /></Field>
              <Field label="Last name" error={errors.lastName}><input className="input" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} /></Field>
              <Field label="Email" error={errors.email}><input className="input" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
              <Field label="Phone" error={errors.phone}><input className="input" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
            </div>
            <div className="mt-5 flex justify-end"><button className="btn-primary" disabled={busy === 'profile'}>{busy === 'profile' && <Spinner className="h-4 w-4" />} Save details</button></div>
          </form>
          <form onSubmit={savePassword} className="panel p-6">
            <h2 className="text-lg font-semibold">Change password</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Field label="Current password" error={pwErrors.currentPassword}><input className="input" type="password" autoComplete="current-password" required value={pw.currentPassword} onChange={(e) => setPw({ ...pw, currentPassword: e.target.value })} /></Field>
              <Field label="New password" error={pwErrors.newPassword} hint="8+ characters with upper, lower case and a number"><input className="input" type="password" autoComplete="new-password" required value={pw.newPassword} onChange={(e) => setPw({ ...pw, newPassword: e.target.value })} /></Field>
              <Field label="Repeat new password" error={pwErrors.confirm}><input className="input" type="password" autoComplete="new-password" required value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} /></Field>
            </div>
            <div className="mt-5 flex justify-end"><button className="btn-primary" disabled={busy === 'pw'}>{busy === 'pw' && <Spinner className="h-4 w-4" />} Change password</button></div>
          </form>
        </div>
      </div>
    </div>
  )
}
