/** Demo accounts and listings (used by `npm run seed` and AUTO_SEED). */
import User from './models/User.js'
import Hotel from './models/Hotel.js'
import Taxi from './models/Taxi.js'
import Booking from './models/Booking.js'
import Feedback from './models/Feedback.js'
import TravelPlan from './models/TravelPlan.js'

const PASSWORD = 'Explore@123'

const DEMO = [
  { firstName: 'Nimal', lastName: 'Perera', email: 'traveller@exploremate.dev', role: 'traveller', phone: '+94 77 123 4567' },
  { firstName: 'Ayesha', lastName: 'Fernando', email: 'hotel@exploremate.dev', role: 'hotel', phone: '+94 71 222 3344' },
  { firstName: 'Kasun', lastName: 'Silva', email: 'taxi@exploremate.dev', role: 'taxi', phone: '+94 76 555 8899' },
]

const HOTELS = [
  ['Lakeview Retreat (demo)', 'Kandy', 18500, 'Calm boutique stay overlooking Kandy Lake, a short walk from the Temple of the Tooth.', 'Deluxe double rooms with lake-facing balconies', 'Breakfast included, free airport pickup on 3+ nights', ['Wi-Fi', 'Breakfast', 'Lake view', 'Parking'], 3],
  ['Hill Country Bungalow (demo)', 'Kandy', 9500, 'Colonial-style bungalow in the hills with a tea garden and home-cooked Sri Lankan meals.', 'Family rooms for up to 4 guests', 'Half board with rice & curry dinner', ['Garden', 'Family rooms', 'Hot water'], 4],
  ['Fort Ramparts Villa (demo)', 'Galle', 26000, 'Restored Dutch-era villa inside Galle Fort, steps from the lighthouse and ramparts.', 'Suites with four-poster beds and plunge pool', 'Breakfast, sunset tea on the terrace', ['Pool', 'Breakfast', 'Air conditioning', 'Wi-Fi'], 2],
  ['Unawatuna Beach Cabanas (demo)', 'Galle', 7800, 'Laid-back cabanas a minute from Unawatuna beach — perfect for snorkelling and sunsets.', 'Beach cabanas with fans and mosquito nets', 'Room only, beach loungers included', ['Beachfront', 'Wi-Fi'], 2],
  ['Ella Gap Eco Lodge (demo)', 'Ella', 14000, 'Eco lodge facing Ella Gap with sunrise views; easy access to Little Adam’s Peak and Nine Arch Bridge.', 'Wooden chalets with mountain views', 'Breakfast and guided sunrise hike', ['Mountain view', 'Breakfast', 'Hiking'], 3],
  ['Colombo City Hub (demo)', 'Colombo', 21000, 'Modern city hotel near Galle Face Green with a rooftop bar and quick access to the old Dutch Hospital.', 'Executive king rooms', 'Breakfast and rooftop pool access', ['Pool', 'Gym', 'Wi-Fi', 'Air conditioning'], 2],
  ['Misty Pines Cottage (demo)', 'Nuwara Eliya', 12500, 'Cosy cottage with fireplace near Gregory Lake — ideal for the cool hill-country climate.', 'Cottage rooms with heaters', 'Breakfast and evening bonfire', ['Fireplace', 'Garden', 'Parking'], 4],
]

const TAXIS = [
  ['Kandy Ride Co. (demo)', 'Kandy', 'Car', 'Toyota Axio', 'CAB-1234', 4, 9000, 'Ruwan Jayasuriya'],
  ['Kandy Ride Co. (demo)', 'Kandy', 'Van', 'Toyota KDH', 'PH-5678', 9, 15000, 'Sunil Bandara'],
  ['Southern Wheels (demo)', 'Galle', 'Tuk-tuk', 'Bajaj RE', 'QA-4321', 3, 4500, 'Chaminda Wijesinghe'],
  ['Southern Wheels (demo)', 'Galle', 'Car', 'Suzuki Wagon R', 'CBK-7788', 4, 7500, 'Pradeep Kumara'],
  ['Hill Trails Transport (demo)', 'Ella', 'SUV', 'Mitsubishi Montero', 'KX-2468', 6, 18000, 'Lahiru Dissanayake'],
  ['City Cabs Colombo (demo)', 'Colombo', 'Car', 'Toyota Prius', 'CAR-1357', 4, 10000, 'Dinesh Rajapaksha'],
  ['Hill Trails Transport (demo)', 'Nuwara Eliya', 'Van', 'Nissan Caravan', 'NE-9090', 10, 16000, 'Tharindu Herath'],
]

export async function seedDemo({ fresh = false, log = true } = {}) {
const users = {}
for (const u of DEMO) {
  let user = await User.findOne({ email: u.email })
  if (user && fresh) {
    await Promise.all([
      Hotel.deleteMany({ owner: user._id }),
      Taxi.deleteMany({ owner: user._id }),
      Booking.deleteMany({ $or: [{ owner: user._id }, { traveller: user._id }] }),
      Feedback.deleteMany({ user: user._id }),
      TravelPlan.deleteMany({ user: user._id }),
    ])
  }
  if (!user) user = await User.create({ ...u, password: PASSWORD })
  users[u.role] = user
}

if (!(await Hotel.exists({ owner: users.hotel._id }))) {
  await Hotel.insertMany(
    HOTELS.map(([name, location, pricePerNight, description, roomDetails, packageDetails, amenities, maxGuests]) => ({
      owner: users.hotel._id, name, location, pricePerNight, description, roomDetails, packageDetails, amenities, maxGuests,
      email: 'hotel@exploremate.dev', phone: '+94 81 222 3344', address: `${location}, Sri Lanka`,
    }))
  )
}
if (!(await Taxi.exists({ owner: users.taxi._id }))) {
  await Taxi.insertMany(
    TAXIS.map(([companyName, location, vehicleType, vehicleModel, plateNo, seats, dailyRate, driverName], i) => ({
      owner: users.taxi._id, companyName, location, vehicleType, vehicleModel, plateNo, seats, dailyRate, driverName,
      businessRegNo: `PV-00${1000 + i}`, companyEmail: 'taxi@exploremate.dev', companyPhone: '+94 76 555 8899',
      insuranceCompany: 'Ceylinco Insurance', driverEmail: `driver${i + 1}@exploremate.dev`, driverPhone: `+94 77 000 00${10 + i}`,
      driverLicenseNo: `B${4000000 + i}`, pricePerKm: Math.round(dailyRate / 100), airConditioned: vehicleType !== 'Tuk-tuk',
    }))
  )
}
if (!(await Feedback.exists({ user: users.traveller._id }))) {
  await Feedback.create({ user: users.traveller._id, rating: 5, category: 'planner', message: 'Demo review: the planner gave me a great 3-day plan for Kandy with a packing list that matched the rainy weather.' })
}

if (log) {
  console.log('\n🌱 Demo data ready. Log in with any of these (password: %s)', PASSWORD)
  for (const u of DEMO) console.log(`   • ${u.role.padEnd(9)} → ${u.email}`)
}
}
