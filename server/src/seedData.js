/**
 * Sample data for demos (used by `npm run seed` and AUTO_SEED).
 * Safe to run repeatedly: it only adds what is missing.
 * All businesses and people here are fictional and marked "(demo)" / sample.
 */
import User from './models/User.js'
import Hotel from './models/Hotel.js'
import Taxi from './models/Taxi.js'
import Booking from './models/Booking.js'
import Feedback from './models/Feedback.js'
import TravelPlan from './models/TravelPlan.js'

const PASSWORD = 'Explore@123'
const DAY = 24 * 60 * 60 * 1000

const USERS = [
  { key: 'nimal', firstName: 'Nimal', lastName: 'Perera', email: 'traveller@exploremate.dev', role: 'traveller', phone: '+94 77 123 4567' },
  { key: 'hotel', firstName: 'Ayesha', lastName: 'Fernando', email: 'hotel@exploremate.dev', role: 'hotel', phone: '+94 71 222 3344' },
  { key: 'taxi', firstName: 'Kasun', lastName: 'Silva', email: 'taxi@exploremate.dev', role: 'taxi', phone: '+94 76 555 8899' },
  { key: 'sara', firstName: 'Sara', lastName: 'Jayawardena', email: 'sara@exploremate.dev', role: 'traveller', phone: '+94 70 456 7788' },
  { key: 'tom', firstName: 'Tom', lastName: 'Becker', email: 'tom@exploremate.dev', role: 'traveller', phone: '+49 151 2345 6789' },
  { key: 'priya', firstName: 'Priya', lastName: 'Raman', email: 'priya@exploremate.dev', role: 'traveller', phone: '+94 75 321 9090' },
]

// [name, location, price/night, description, rooms, package, amenities, maxGuests]
const HOTELS = [
  ['Lakeview Retreat (demo)', 'Kandy', 18500, 'Calm boutique stay overlooking Kandy Lake, a short walk from the Temple of the Tooth.', 'Deluxe double rooms with lake-facing balconies', 'Breakfast included, free airport pickup on 3+ nights', ['Wi-Fi', 'Breakfast', 'Lake view', 'Parking'], 3],
  ['Hill Country Bungalow (demo)', 'Kandy', 9500, 'Colonial-style bungalow in the hills with a tea garden and home-cooked Sri Lankan meals.', 'Family rooms for up to 4 guests', 'Half board with rice & curry dinner', ['Garden', 'Family rooms', 'Hot water'], 4],
  ['Peradeniya Garden Inn (demo)', 'Kandy', 13500, 'Quiet guesthouse a few minutes from the Royal Botanical Gardens, with a shaded courtyard and bicycles to borrow.', 'Garden-view doubles and one twin room', 'Breakfast with fresh hoppers on weekends', ['Wi-Fi', 'Breakfast', 'Bicycles', 'Garden'], 2],
  ['Fort Ramparts Villa (demo)', 'Galle', 26000, 'Restored Dutch-era villa inside Galle Fort, steps from the lighthouse and ramparts.', 'Suites with four-poster beds and plunge pool', 'Breakfast, sunset tea on the terrace', ['Pool', 'Breakfast', 'Air conditioning', 'Wi-Fi'], 2],
  ['Unawatuna Beach Cabanas (demo)', 'Galle', 7800, 'Laid-back cabanas a minute from Unawatuna beach, perfect for snorkelling and sunsets.', 'Beach cabanas with fans and mosquito nets', 'Room only, beach loungers included', ['Beachfront', 'Wi-Fi'], 2],
  ['Jungle Beach Treehouse (demo)', 'Galle', 15500, 'Treehouse rooms in the forest above Jungle Beach, with monkeys for neighbours and a path down to the cove.', 'Two-level treehouse rooms with open-air showers', 'Breakfast and snorkel gear', ['Breakfast', 'Nature', 'Snorkel gear'], 2],
  ['Ella Gap Eco Lodge (demo)', 'Ella', 14000, 'Eco lodge facing Ella Gap with sunrise views; easy access to Little Adam’s Peak and Nine Arch Bridge.', 'Wooden chalets with mountain views', 'Breakfast and guided sunrise hike', ['Mountain view', 'Breakfast', 'Hiking'], 3],
  ['Nine Arches Homestay (demo)', 'Ella', 6500, 'Friendly family homestay a 15-minute walk from Nine Arch Bridge. The host runs cooking classes in the evening.', 'Simple doubles with balcony', 'Breakfast; cooking class on request', ['Breakfast', 'Cooking class', 'Hot water'], 3],
  ['Colombo City Hub (demo)', 'Colombo', 21000, 'Modern city hotel near Galle Face Green with a rooftop bar and quick access to the old Dutch Hospital.', 'Executive king rooms', 'Breakfast and rooftop pool access', ['Pool', 'Gym', 'Wi-Fi', 'Air conditioning'], 2],
  ['Cinnamon Lane Suites (demo)', 'Colombo', 16500, 'Serviced apartments in Colombo 7, close to Viharamahadevi Park and the National Museum.', 'One- and two-bedroom apartments with kitchens', 'Room only, weekly housekeeping', ['Kitchen', 'Wi-Fi', 'Air conditioning', 'Parking'], 4],
  ['Misty Pines Cottage (demo)', 'Nuwara Eliya', 12500, 'Cosy cottage with fireplace near Gregory Lake, ideal for the cool hill-country climate.', 'Cottage rooms with heaters', 'Breakfast and evening bonfire', ['Fireplace', 'Garden', 'Parking'], 4],
  ['Tea Estate Manor (demo)', 'Nuwara Eliya', 24000, 'Restored planter’s manor on a working tea estate, with factory tours and walks through the plantation.', 'Heritage rooms with fireplaces', 'Full board and tea-factory tour', ['Full board', 'Tea tours', 'Fireplace', 'Garden'], 3],
  ['Lion Rock View Resort (demo)', 'Sigiriya', 19500, 'Resort with a pool facing Sigiriya Rock; early-morning climbs and Minneriya safaris can be arranged.', 'Villas with garden terraces', 'Breakfast, bicycles and safari booking help', ['Pool', 'Breakfast', 'Bicycles', 'Air conditioning'], 3],
  ['Pidurangala Village Rooms (demo)', 'Sigiriya', 7200, 'Simple village rooms at the foot of Pidurangala rock, the best sunrise view of Sigiriya.', 'Fan-cooled doubles', 'Breakfast with village curries', ['Breakfast', 'Garden'], 2],
  ['Mirissa Surf House (demo)', 'Mirissa', 11000, 'Surf house on the quiet end of Mirissa beach with boards for hire and whale-watching trips from the harbour.', 'Sea-facing doubles and a shared dorm', 'Breakfast and surfboard discounts', ['Beachfront', 'Breakfast', 'Surfboards', 'Wi-Fi'], 3],
  ['Coconut Hill Villas (demo)', 'Mirissa', 17500, 'Hillside villas near Coconut Tree Hill with an infinity pool looking over the bay.', 'Private villas with outdoor bathrooms', 'Breakfast and evening seafood barbecue on Saturdays', ['Pool', 'Breakfast', 'Sea view', 'Air conditioning'], 2],
  ['Nilaveli Blue Bay (demo)', 'Trincomalee', 13000, 'Beach hotel on Nilaveli with boat trips to Pigeon Island for snorkelling.', 'Beach-view rooms', 'Breakfast and discounted Pigeon Island trips', ['Beachfront', 'Breakfast', 'Snorkelling'], 3],
  ['Jaffna Heritage House (demo)', 'Jaffna', 9800, 'Traditional courtyard house near Nallur Kandaswamy Kovil, serving Jaffna crab curry and palmyra treats.', 'Courtyard rooms with antique furniture', 'Breakfast and Jaffna-style dinner', ['Breakfast', 'Courtyard', 'Bicycles'], 3],
  ['Sacred City Lodge (demo)', 'Anuradhapura', 8500, 'Lodge beside the Tissa Wewa reservoir, a short cycle from Ruwanwelisaya and the Sri Maha Bodhi.', 'Doubles with lake views', 'Breakfast and free bicycles for the ruins', ['Breakfast', 'Bicycles', 'Lake view'], 2],
  ['Arugam Point Cabanas (demo)', 'Arugam Bay', 8900, 'Cabanas a short walk from the main point break, with yoga on the roof every morning.', 'Cabanas with hammocks', 'Breakfast and morning yoga', ['Beachfront', 'Yoga', 'Breakfast'], 2],
  ['Bentota River Lodge (demo)', 'Bentota', 15000, 'Riverside lodge on the Bentota Ganga with mangrove boat rides and watersports nearby.', 'River-view rooms', 'Breakfast and one free river safari', ['River view', 'Pool', 'Breakfast', 'Boat rides'], 3],
  ['Negombo Lagoon Stay (demo)', 'Negombo', 10500, 'Handy first or last night: 20 minutes from the airport, on the lagoon near the fish market.', 'Air-conditioned doubles', 'Breakfast and airport transfer', ['Airport transfer', 'Breakfast', 'Air conditioning'], 3],
]

// [company, location, type, model, plate, seats, daily rate, driver, A/C]
const TAXIS = [
  ['Kandy Ride Co. (demo)', 'Kandy', 'Car', 'Toyota Axio', 'CAB-1234', 4, 9000, 'Ruwan Jayasuriya', true],
  ['Kandy Ride Co. (demo)', 'Kandy', 'Van', 'Toyota KDH', 'PH-5678', 9, 15000, 'Sunil Bandara', true],
  ['Kandy Ride Co. (demo)', 'Kandy', 'Tuk-tuk', 'Bajaj RE', 'QB-2201', 3, 4000, 'Mahesh Kumara', false],
  ['Southern Wheels (demo)', 'Galle', 'Tuk-tuk', 'Bajaj RE', 'QA-4321', 3, 4500, 'Chaminda Wijesinghe', false],
  ['Southern Wheels (demo)', 'Galle', 'Car', 'Suzuki Wagon R', 'CBK-7788', 4, 7500, 'Pradeep Kumara', true],
  ['Southern Wheels (demo)', 'Mirissa', 'Car', 'Toyota Vitz', 'CBM-3344', 4, 8000, 'Nuwan Gamage', true],
  ['Southern Wheels (demo)', 'Bentota', 'Van', 'Toyota HiAce', 'PE-6612', 12, 17000, 'Ajith Fonseka', true],
  ['Hill Trails Transport (demo)', 'Ella', 'SUV', 'Mitsubishi Montero', 'KX-2468', 6, 18000, 'Lahiru Dissanayake', true],
  ['Hill Trails Transport (demo)', 'Ella', 'Tuk-tuk', 'TVS King', 'QE-7781', 3, 3800, 'Saman Rathnayake', false],
  ['Hill Trails Transport (demo)', 'Nuwara Eliya', 'Van', 'Nissan Caravan', 'NE-9090', 10, 16000, 'Tharindu Herath', true],
  ['City Cabs Colombo (demo)', 'Colombo', 'Car', 'Toyota Prius', 'CAR-1357', 4, 10000, 'Dinesh Rajapaksha', true],
  ['City Cabs Colombo (demo)', 'Negombo', 'Car', 'Honda Vezel', 'CBV-2020', 4, 11000, 'Roshan Peiris', true],
  ['Cultural Triangle Tours (demo)', 'Sigiriya', 'SUV', 'Toyota Land Cruiser', 'WP-8800', 6, 22000, 'Gamini Abeysekara', true],
  ['Cultural Triangle Tours (demo)', 'Anuradhapura', 'Car', 'Toyota Corolla', 'NC-4545', 4, 8500, 'Upul Senanayake', true],
  ['East Coast Cabs (demo)', 'Trincomalee', 'Van', 'Toyota KDH', 'EP-1919', 9, 15500, 'Mohamed Rizwan', true],
  ['East Coast Cabs (demo)', 'Arugam Bay', 'Tuk-tuk', 'Bajaj RE', 'EQ-5050', 3, 4200, 'Ilham Cassim', false],
  ['Northern Rides (demo)', 'Jaffna', 'Car', 'Toyota Allion', 'NP-3030', 4, 9500, 'Thiru Selvarajah', true],
]

// [traveller, kind, listing (hotel name or plate), startOffsetDays, length, status, guests, note]
// Hotels: length = nights. Taxis: length = hire days. No overlaps per listing.
const BOOKINGS = [
  ['nimal', 'hotel', 'Ella Gap Eco Lodge (demo)', -40, 3, 'confirmed', 2, ''],
  ['nimal', 'taxi', 'KX-2468', -40, 3, 'confirmed', 2, 'Pickup at Ella railway station'],
  ['nimal', 'hotel', 'Lakeview Retreat (demo)', 12, 3, 'confirmed', 2, 'Arriving by the afternoon train'],
  ['nimal', 'taxi', 'CAB-1234', 12, 3, 'pending', 2, 'Need a day trip to Sigiriya on day 2'],
  ['nimal', 'hotel', 'Fort Ramparts Villa (demo)', 30, 2, 'cancelled', 2, 'Plans changed'],
  ['sara', 'hotel', 'Lion Rock View Resort (demo)', -70, 3, 'confirmed', 2, ''],
  ['sara', 'taxi', 'WP-8800', -70, 3, 'confirmed', 2, 'Minneriya safari on day 2'],
  ['sara', 'hotel', 'Fort Ramparts Villa (demo)', 5, 3, 'confirmed', 2, 'Anniversary trip, a quiet room please'],
  ['sara', 'taxi', 'CBK-7788', 5, 3, 'confirmed', 2, 'Pickup from Galle railway station'],
  ['sara', 'hotel', 'Coconut Hill Villas (demo)', 20, 2, 'confirmed', 2, ''],
  ['sara', 'taxi', 'CBM-3344', 20, 2, 'pending', 2, 'Whale-watching harbour drop-off at 6 am'],
  ['tom', 'hotel', 'Colombo City Hub (demo)', -20, 2, 'confirmed', 1, 'Late check-in around 11 pm'],
  ['tom', 'taxi', 'CAR-1357', -20, 1, 'declined', 1, 'Airport pickup'],
  ['tom', 'hotel', 'Tea Estate Manor (demo)', 25, 2, 'confirmed', 1, 'Vegetarian meals please'],
  ['tom', 'taxi', 'NE-9090', 25, 2, 'pending', 1, 'Pickup at Nanu Oya station'],
  ['tom', 'hotel', 'Arugam Point Cabanas (demo)', 45, 4, 'confirmed', 1, 'Bringing my own surfboard'],
  ['priya', 'hotel', 'Mirissa Surf House (demo)', -100, 4, 'confirmed', 3, ''],
  ['priya', 'hotel', 'Jaffna Heritage House (demo)', -12, 3, 'confirmed', 2, ''],
  ['priya', 'taxi', 'NP-3030', -12, 2, 'confirmed', 2, 'Point Pedro and Casuarina beach'],
  ['priya', 'hotel', 'Hill Country Bungalow (demo)', 3, 2, 'confirmed', 4, 'Two kids, one cot please'],
  ['priya', 'taxi', 'PH-5678', 3, 2, 'confirmed', 4, 'Pickup at Kandy railway station, 10 am'],
  ['priya', 'hotel', 'Sacred City Lodge (demo)', 60, 2, 'confirmed', 2, ''],
]

const FEEDBACK = [
  ['nimal', 5, 'planner', 'The planner gave me a 3-day Kandy plan that put the museum on the rainy afternoon. The packing list told me to bring temple-friendly clothes, which I would have forgotten.'],
  ['sara', 5, 'booking', 'Booked the villa in Galle Fort and a driver for the same dates in two minutes. The driver accepted the request the same evening.'],
  ['tom', 4, 'planner', 'Travelpedia was handy for checking the weather in Nuwara Eliya before packing. I would love a way to share trips with friends.'],
  ['priya', 5, 'general', 'The budget planner found a family room and a van in Kandy that fit our budget, with money left for the elephant orphanage.'],
  ['tom', 3, 'idea', 'Please add train timetables. The Kandy to Ella train is the highlight of most trips here.'],
]

const PLACES = {
  kandy: { name: 'Kandy', country: 'Sri Lanka', region: 'Central Province', lat: 7.2906, lon: 80.6336 },
  galle: { name: 'Galle', country: 'Sri Lanka', region: 'Southern Province', lat: 6.0329, lon: 80.2168 },
  ella: { name: 'Ella', country: 'Sri Lanka', region: 'Uva Province', lat: 6.8667, lon: 81.0466 },
}

const act = (time, title, description) => ({ time, title, description, place: title })

const PLANS = [
  {
    user: 'nimal',
    title: '3-day cultural trip to Kandy',
    location: PLACES.kandy,
    startOffset: 12,
    days: 3,
    tripType: 'Cultural',
    summary: 'Three unhurried days in the hill capital: the Temple of the Tooth, the botanical gardens and an evening of Kandyan dance, with indoor options for rainy afternoons.',
    itinerary: [
      { title: 'The old royal city', activities: [act('Morning', 'Temple of the Tooth', 'Arrive for the morning puja and walk the temple complex. Cover shoulders and knees.'), act('Afternoon', 'National Museum of Kandy', 'Royal regalia and Kandyan-era artefacts beside the temple — a good choice if it rains.'), act('Evening', 'Kandy Lake', 'Walk the shady lake loop and watch the temple lights come on.')] },
      { title: 'Gardens and views', activities: [act('Morning', 'Royal Botanical Gardens, Peradeniya', 'Orchid house, giant bamboo and the avenue of palms. Allow three hours.'), act('Afternoon', 'Ceylon Tea Museum', 'Learn how tea is made, then have a cup with a view on the top floor.'), act('Evening', 'Kandyan dance show', 'Drummers and fire-walkers at the cultural centre near the lake, around 5 pm.')] },
      { title: 'Forest and markets', activities: [act('Morning', 'Udawattakele Forest Reserve', 'Easy forest trails above the lake; look for macaques and hornbills.'), act('Afternoon', 'Kandy Municipal Market', 'Spices, fruit and handicrafts — good for souvenirs.'), act('Evening', 'Arthur’s Seat viewpoint', 'Sunset over the city and the lake before dinner.')] },
    ],
    tips: ['Carry a scarf or sarong for temple visits.', 'Afternoon showers are common: plan indoor stops after lunch.', 'Tuk-tuks should use the meter; agree a price if there is none.'],
  },
  {
    user: 'nimal',
    title: 'Galle Fort weekend',
    location: PLACES.galle,
    startOffset: 30,
    days: 2,
    tripType: 'Historical',
    summary: 'A slow weekend inside the walls of Galle Fort with a morning at Unawatuna beach.',
    itinerary: [
      { title: 'Inside the fort', activities: [act('Morning', 'Galle Fort ramparts', 'Walk the ramparts from the clock tower to the lighthouse before the heat.'), act('Afternoon', 'National Maritime Museum', 'Shipwreck finds and the story of the old port.'), act('Evening', 'Flag Rock', 'Watch the sunset and the cliff jumpers from the bastion.')] },
      { title: 'Beach and jungle', activities: [act('Morning', 'Unawatuna beach', 'Swim and snorkel while the sea is calm.'), act('Afternoon', 'Japanese Peace Pagoda', 'Short climb through the jungle to the white stupa with views over the bay.'), act('Evening', 'Pedlar Street cafés', 'Dinner and a stroll through the lanes of the fort.')] },
    ],
    tips: ['The ramparts are best before 9 am or after 4 pm.', 'Bring cash for small cafés and tuk-tuks.'],
  },
  {
    user: 'sara',
    title: 'Ella in two days',
    location: PLACES.ella,
    startOffset: 15,
    days: 2,
    tripType: 'Adventure',
    summary: 'Short hikes, the Nine Arch Bridge and tea-country views.',
    itinerary: [
      { title: 'Hikes and bridges', activities: [act('Morning', 'Little Adam’s Peak', 'Easy 45-minute climb for sunrise over Ella Gap.'), act('Afternoon', 'Nine Arch Bridge', 'Time your visit for a passing train — ask locals for the schedule.'), act('Evening', 'Ella town', 'Dinner on the main street; try kottu and fresh juice.')] },
      { title: 'Rock and waterfall', activities: [act('Morning', 'Ella Rock', 'A longer 3–4 hour hike; start early and take water.'), act('Afternoon', 'Ravana Falls', 'Cool off at one of the widest waterfalls in the country.'), act('Evening', 'Tea factory visit', 'See the evening tea processing at a nearby estate.')] },
    ],
    tips: ['Wear proper shoes for Ella Rock — the path gets muddy.', 'Book the Kandy–Ella train seats early.'],
  },
]

const PACKING = [
  { item: 'Light cotton clothes', reason: 'Warm days around 28°C', category: 'Clothing' },
  { item: 'Compact umbrella or rain jacket', reason: 'Afternoon showers are likely', category: 'Clothing' },
  { item: 'Modest clothing that covers shoulders & knees', reason: 'Required at temples', category: 'Clothing' },
  { item: 'Comfortable walking shoes', reason: 'Lots of walking and some hills', category: 'Gear' },
  { item: 'Sunscreen SPF 50+', reason: 'High UV around midday', category: 'Health' },
  { item: 'Insect repellent', reason: 'Mosquitoes at dusk', category: 'Health' },
  { item: 'Reusable water bottle', reason: 'Stay hydrated in the heat', category: 'Essentials' },
  { item: 'Phone, charger & power bank', reason: 'Maps and tickets all day', category: 'Essentials' },
  { item: 'Some local cash', reason: 'Tuk-tuks and small shops', category: 'Essentials' },
]

const today = () => {
  const n = new Date()
  return new Date(Date.UTC(n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()))
}

export async function seedDemo({ fresh = false, log = true } = {}) {
  const users = {}
  for (const u of USERS) {
    const { key, ...data } = u
    let user = await User.findOne({ email: data.email })
    if (user && fresh) {
      await Promise.all([
        Hotel.deleteMany({ owner: user._id }),
        Taxi.deleteMany({ owner: user._id }),
        Booking.deleteMany({ $or: [{ owner: user._id }, { traveller: user._id }] }),
        Feedback.deleteMany({ user: user._id }),
        TravelPlan.deleteMany({ user: user._id }),
      ])
    }
    if (!user) user = await User.create({ ...data, password: PASSWORD })
    users[key] = user
  }

  // Listings: add any that are missing
  const hotels = {}
  for (const [name, location, pricePerNight, description, roomDetails, packageDetails, amenities, maxGuests] of HOTELS) {
    let h = await Hotel.findOne({ owner: users.hotel._id, name })
    if (!h)
      h = await Hotel.create({
        owner: users.hotel._id, name, location, pricePerNight, description, roomDetails, packageDetails, amenities, maxGuests,
        email: 'hotel@exploremate.dev', phone: '+94 81 222 3344', address: `${location}, Sri Lanka`,
      })
    hotels[name] = h
  }
  const taxis = {}
  for (const [i, [companyName, location, vehicleType, vehicleModel, plateNo, seats, dailyRate, driverName, airConditioned]] of TAXIS.entries()) {
    let t = await Taxi.findOne({ owner: users.taxi._id, plateNo })
    if (!t)
      t = await Taxi.create({
        owner: users.taxi._id, companyName, location, vehicleType, vehicleModel, plateNo, seats, dailyRate, driverName, airConditioned,
        businessRegNo: `PV-00${1000 + i}`, companyEmail: 'taxi@exploremate.dev', companyPhone: '+94 76 555 8899',
        insuranceCompany: 'Ceylinco Insurance', driverEmail: `driver${i + 1}@exploremate.dev`, driverPhone: `+94 77 000 ${String(1000 + i * 37).slice(-4)}`,
        driverLicenseNo: `B${4000000 + i}`, pricePerKm: Math.round(dailyRate / 100),
      })
    taxis[plateNo] = t
  }

  // Bookings: only once, relative to today so they always look current
  const travellerIds = ['nimal', 'sara', 'tom', 'priya'].map((k) => users[k]._id)
  if (!(await Booking.exists({ traveller: { $in: travellerIds } }))) {
    const t0 = today()
    await Booking.insertMany(
      BOOKINGS.map(([who, kind, ref, offset, length, status, guests, notes]) => {
        const item = kind === 'hotel' ? hotels[ref] : taxis[ref]
        const start = new Date(t0.getTime() + offset * DAY)
        const end = new Date(start.getTime() + (kind === 'hotel' ? length : length - 1) * DAY)
        const unitPrice = kind === 'hotel' ? item.pricePerNight : item.dailyRate
        return {
          kind, [kind]: item._id, owner: item.owner, traveller: users[who]._id, startDate: start, endDate: end,
          units: length, guests, unitPrice, totalPrice: unitPrice * length, status, notes,
          pickupLocation: kind === 'taxi' ? notes.match(/[Pp]ickup (?:at|from) ([^,]+)/)?.[1] || '' : '',
          createdAt: new Date(Math.min(start.getTime() - 10 * DAY, Date.now() - (BOOKINGS.length - 1) * 3600 * 1000)),
        }
      })
    )
  }

  // Saved trips
  for (const p of PLANS) {
    const user = users[p.user]
    if (await TravelPlan.exists({ user: user._id, title: p.title })) continue
    const start = new Date(today().getTime() + p.startOffset * DAY)
    await TravelPlan.create({
      user: user._id, title: p.title, location: p.location, startDate: start, days: p.days, tripType: p.tripType,
      summary: p.summary, tips: p.tips, packingList: PACKING, generatedBy: 'local', travellers: 2,
      itinerary: p.itinerary.map((d, i) => ({ day: i + 1, date: new Date(start.getTime() + i * DAY).toISOString().slice(0, 10), ...d })),
    })
  }

  // Sample reviews (clearly flagged as samples on the home page)
  await Feedback.deleteMany({ user: { $in: travellerIds }, isSample: { $ne: true }, message: /^Demo review:/ })
  for (const [who, rating, category, message] of FEEDBACK) {
    const user = users[who]
    if (!(await Feedback.exists({ user: user._id, message }))) await Feedback.create({ user: user._id, rating, category, message, isSample: true })
  }

  if (log) {
    console.log('\n🌱 Sample data ready. Log in with any of these (password: %s)', PASSWORD)
    for (const u of USERS) console.log(`   • ${u.role.padEnd(9)} → ${u.email}`)
  }
}
