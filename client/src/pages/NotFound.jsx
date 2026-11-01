import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo />
      <h1 className="font-display text-6xl font-extrabold text-tea-600">404</h1>
      <p className="max-w-sm text-ink-mute">This page took a wrong turn somewhere. Let’s get you back on the map.</p>
      <Link to="/" className="btn-primary">Go to the home page</Link>
    </div>
  )
}
