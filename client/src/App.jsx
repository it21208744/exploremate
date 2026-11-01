import { Suspense, lazy } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import AppShell from './layouts/AppShell'
import { PageLoader } from './components/ui'
import Landing from './pages/Landing'
import { Login, Register } from './pages/Auth'
import NotFound from './pages/NotFound'

const L = (fn) => {
  const C = lazy(fn)
  return (
    <Suspense fallback={<PageLoader />}>
      <C />
    </Suspense>
  )
}

const shared = [
  { path: 'profile', element: L(() => import('./pages/shared/Profile')) },
  { path: 'feedback', element: L(() => import('./pages/shared/Feedback')) },
]

const router = createBrowserRouter([
  { path: '/', element: <Landing />, errorElement: <NotFound /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    path: '/app',
    element: <AppShell role="traveller" />,
    children: [
      { index: true, element: L(() => import('./pages/traveller/Overview')) },
      { path: 'plan', element: L(() => import('./pages/traveller/Planner')) },
      { path: 'trips', element: L(() => import('./pages/traveller/Trips')) },
      { path: 'trips/:id', element: L(() => import('./pages/traveller/TripDetail')) },
      { path: 'budget', element: L(() => import('./pages/traveller/Budget')) },
      { path: 'explore', element: L(() => import('./pages/traveller/Explore')) },
      { path: 'stays', element: L(() => import('./pages/traveller/Stays')) },
      { path: 'rides', element: L(() => import('./pages/traveller/Rides')) },
      { path: 'bookings', element: L(() => import('./pages/traveller/MyBookings')) },
      ...shared,
    ],
  },
  {
    path: '/hotel',
    element: <AppShell role="hotel" />,
    children: [
      { index: true, element: L(() => import('./pages/shared/OwnerOverview')) },
      { path: 'listings', element: L(() => import('./pages/hotel/Hotels')) },
      { path: 'listings/new', element: L(() => import('./pages/hotel/HotelForm')) },
      { path: 'listings/:id/edit', element: L(() => import('./pages/hotel/HotelForm')) },
      { path: 'bookings', element: L(() => import('./pages/shared/IncomingBookings')) },
      ...shared,
    ],
  },
  {
    path: '/taxi',
    element: <AppShell role="taxi" />,
    children: [
      { index: true, element: L(() => import('./pages/shared/OwnerOverview')) },
      { path: 'fleet', element: L(() => import('./pages/taxi/Fleet')) },
      { path: 'fleet/new', element: L(() => import('./pages/taxi/TaxiForm')) },
      { path: 'fleet/:id/edit', element: L(() => import('./pages/taxi/TaxiForm')) },
      { path: 'requests', element: L(() => import('./pages/shared/IncomingBookings')) },
      ...shared,
    ],
  },
  // Old V1 URLs → new ones
  { path: '/travelerDashBoard/*', element: <Navigate to="/app" replace /> },
  { path: '/HotelOwnerDashBoardLayout/*', element: <Navigate to="/hotel" replace /> },
  { path: '/TaxiOwnerDashBoard/*', element: <Navigate to="/taxi" replace /> },
  { path: '*', element: <NotFound /> },
])

export default function App() {
  return <RouterProvider router={router} />
}
