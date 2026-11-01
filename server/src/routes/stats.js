import { Router } from 'express'
import Booking from '../models/Booking.js'
import Hotel from '../models/Hotel.js'
import Taxi from '../models/Taxi.js'
import TravelPlan from '../models/TravelPlan.js'
import { requireAuth } from '../middleware/auth.js'
import { asyncHandler, toDay } from '../utils/http.js'

const router = Router()
router.use(requireAuth)

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const today = toDay(new Date())
    const { role, _id } = req.user

    if (role === 'traveller') {
      const [plans, bookings] = await Promise.all([
        TravelPlan.countDocuments({ user: _id }),
        Booking.find({ traveller: _id }).populate('hotel', 'name location').populate('taxi', 'companyName vehicleType location').lean(),
      ])
      const active = bookings.filter((b) => ['pending', 'confirmed'].includes(b.status))
      const upcoming = active.filter((b) => b.endDate >= today).sort((a, b) => a.startDate - b.startDate)
      return res.json({
        role,
        plans,
        upcomingCount: upcoming.length,
        pendingCount: active.filter((b) => b.status === 'pending').length,
        totalSpent: bookings.filter((b) => b.status === 'confirmed').reduce((s, b) => s + b.totalPrice, 0),
        nextBookings: upcoming.slice(0, 4),
      })
    }

    const Model = role === 'hotel' ? Hotel : Taxi
    const [listings, bookings] = await Promise.all([
      Model.countDocuments({ owner: _id }),
      Booking.find({ owner: _id }).populate('traveller', 'firstName lastName').populate('hotel', 'name').populate('taxi', 'companyName vehicleModel').lean(),
    ])
    const confirmed = bookings.filter((b) => b.status === 'confirmed')
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(today.getUTCFullYear(), today.getUTCMonth() - 3 + i, 1)
      return { key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`, label: d.toLocaleString('en', { month: 'short' }), revenue: 0, bookings: 0 }
    })
    for (const b of confirmed) {
      const d = new Date(b.startDate)
      const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`
      const m = months.find((x) => x.key === key)
      if (m) {
        m.revenue += b.totalPrice
        m.bookings += 1
      }
    }
    res.json({
      role,
      listings,
      totalBookings: bookings.length,
      pendingCount: bookings.filter((b) => b.status === 'pending').length,
      upcomingCount: confirmed.filter((b) => b.endDate >= today).length,
      revenue: confirmed.reduce((s, b) => s + b.totalPrice, 0),
      monthly: months,
      recent: bookings.sort((a, b) => b.createdAt - a.createdAt).slice(0, 5),
    })
  })
)

export default router
