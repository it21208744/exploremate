import { geocode, getWeather, tripForecast } from './weather.js'
import { getNearbyPlaces, getPlaceSummary } from './places.js'
import { generateJson } from './ai.js'
import { buildPackingList } from './packing.js'

export const TRIP_TYPES = ['Cultural', 'Adventure', 'Historical', 'Family-Friendly', 'Food Hunting', 'Beach & Relaxation', 'Nature & Wildlife']

const SLOT_TEMPLATES = {
  default: ['Start the day at {p}.', 'Head over to {p} and take your time exploring.', 'Wind down the day around {p}.'],
  cultural: ['Begin with a visit to {p} to soak in the local culture.', 'Explore {p} — chat with locals and look for traditional crafts.', 'Spend the evening near {p} and catch a cultural show if one is on.'],
  adventure: ['Make an early start at {p} while it is cool and quiet.', 'Get active around {p} — look for hiking trails or guided tours.', 'Catch the sunset from {p} after an action-packed day.'],
  historical: ['Discover the history of {p} — a local guide brings the stories alive.', 'Continue to {p} and look out for heritage architecture.', 'End the day near {p} with a relaxed stroll.'],
  family: ['Start with an easy, family-friendly visit to {p}.', 'Take the kids to {p} — plan a picnic or snack stop.', 'Relax near {p} with an early dinner.'],
  food: ['Breakfast like a local, then visit {p}.', 'Lunch at a busy local eatery near {p} — follow the crowd.', 'Hunt for street food and night markets around {p}.'],
  beach: ['Slow morning, then head to {p}.', 'Enjoy {p} at your own pace — swim, read or nap.', 'Sundowners and seafood near {p}.'],
  nature: ['Go early to {p} for the best chance to spot wildlife.', 'Explore the greenery around {p}.', 'Enjoy a quiet evening near {p} and listen to nature.'],
}
const GENERIC = [
  ['Old town walk', 'Wander the central streets, cafés and markets to get your bearings.'],
  ['Local market', 'Browse fresh produce, spices and handicrafts — great for souvenirs.'],
  ['Viewpoint at golden hour', 'Ask your host about the best nearby viewpoint for sunset.'],
  ['Signature local dish', 'Try the dish the area is famous for at a well-reviewed local spot.'],
  ['Museum or heritage site', 'Learn about the region’s history and people.'],
  ['Nature escape', 'Find a nearby park, lake or trail for some fresh air.'],
]

const shorten = (text, max = 170) => {
  const first = text.split(/(?<=[a-z]{2}\.)\s/)[0]
  if (first.length <= max) return first
  return `${first.slice(0, first.lastIndexOf(' ', max))}…`
}

const slotKey = (type) => {
  const t = type.toLowerCase()
  if (t.includes('cultur')) return 'cultural'
  if (t.includes('advent')) return 'adventure'
  if (t.includes('histor')) return 'historical'
  if (t.includes('family')) return 'family'
  if (t.includes('food')) return 'food'
  if (t.includes('beach') || t.includes('relax')) return 'beach'
  if (t.includes('nature') || t.includes('wild')) return 'nature'
  return 'default'
}

/** Deterministic itinerary using real nearby places — used when no AI key is set. */
function localItinerary({ place, forecasts, tripType, places }) {
  const tpl = SLOT_TEMPLATES[slotKey(tripType)]
  const slots = ['Morning', 'Afternoon', 'Evening']
  let cursor = 0
  const itinerary = forecasts.map(({ date, forecast }, i) => {
    const wet = forecast && ((forecast.rainChance ?? 0) >= 60 || forecast.icon === 'storm')
    const activities = slots.map((time, s) => {
      const p = places[cursor % Math.max(places.length, 1)]
      if (places.length) cursor++
      if (p && cursor <= places.length) {
        return {
          time,
          title: p.name,
          description: `${tpl[s].replace('{p}', p.name)} ${shorten(p.extract)}`,
          place: p.name,
        }
      }
      const [title, description] = GENERIC[(i * 3 + s) % GENERIC.length]
      return { time, title, description, place: place.name }
    })
    if (wet) activities[1].description += ' Rain is likely — keep an indoor alternative (museum, café, spa) in mind.'
    return {
      day: i + 1,
      date,
      title: i === 0 ? `Arrive & explore ${place.name}` : `Day ${i + 1} in ${place.name}`,
      activities,
    }
  })
  return {
    summary: `A ${forecasts.length}-day ${tripType.toLowerCase()} trip to ${place.name}${place.country ? `, ${place.country}` : ''}, built around notable places nearby and the latest forecast.`,
    itinerary,
    tips: [
      'Keep digital and paper copies of your bookings and ID.',
      'Start sightseeing early to beat the heat and the crowds.',
      'Ask your hotel for trusted taxi or tuk-tuk contacts — or book one in ExploreMate.',
    ],
  }
}

function aiPrompt({ place, forecasts, days, tripType, travellers, interests, places }) {
  const wx = forecasts
    .map(({ date, forecast: f }) =>
      f ? `${date}: ${f.label}, ${Math.round(f.tempMin)}–${Math.round(f.tempMax)}°C, rain ${f.rainChance ?? '?'}%` : `${date}: no forecast yet`
    )
    .join('\n')
  const placeList = places.map((p) => `- ${p.name} (${p.distanceKm} km): ${p.extract.slice(0, 160)}`).join('\n')
  return `Plan a ${days}-day ${tripType} trip to ${place.name}${place.region ? `, ${place.region}` : ''}${place.country ? `, ${place.country}` : ''} for ${travellers} traveller(s).
${interests ? `Traveller interests: ${interests}\n` : ''}
Weather forecast per day:
${wx}

Real places near the destination (prefer these, but you may add other well-known local spots):
${placeList || '(none found)'}

Return ONLY JSON with this exact shape:
{
  "summary": "2 sentence overview of the trip",
  "itinerary": [
    { "day": 1, "date": "YYYY-MM-DD", "title": "short theme for the day",
      "activities": [
        { "time": "Morning", "title": "activity or place name", "description": "1-2 sentences: what to do and why", "place": "place name" },
        { "time": "Afternoon", ... }, { "time": "Evening", ... }
      ] }
  ],
  "packingList": [ { "item": "specific item", "reason": "which weather or activity makes it necessary", "category": "Clothing|Essentials|Health|Gear|Tips" } ],
  "tips": ["3-5 short practical local tips"]
}
Rules: exactly ${days} itinerary days with dates matching the forecast list; 3-4 activities per day; adapt to rain (indoor options) and heat; at least 10 packing items tied to the forecast and the ${tripType} style; keep it realistic about travel time.`
}

const normaliseItinerary = (raw, forecasts) =>
  (Array.isArray(raw) ? raw : []).slice(0, forecasts.length).map((d, i) => ({
    day: i + 1,
    date: forecasts[i]?.date || d.date,
    title: String(d.title || `Day ${i + 1}`),
    activities: (Array.isArray(d.activities) ? d.activities : []).map((a) => ({
      time: String(a.time || ''),
      title: String(a.title || a.place || 'Activity'),
      description: String(a.description || a.actions || ''),
      place: String(a.place || ''),
    })),
  }))

export async function generateTrip({ location, startDate, days, tripType, travellers = 1, interests = '' }) {
  const place = await geocode(location)
  const [weather, places, about] = await Promise.all([
    getWeather(place.lat, place.lon).catch((e) => {
      console.warn('Weather lookup failed:', e.message)
      return null
    }),
    getNearbyPlaces(place.lat, place.lon, { exclude: place.name }),
    getPlaceSummary(place.name, place.country),
  ])
  const forecasts = tripForecast(weather, startDate, days)
  const rulesPacking = buildPackingList({ forecasts, current: weather?.current, tripType, days })

  const { data, provider } = await generateJson(
    'You are ExploreMate, an expert local travel planner. You write practical, specific, safe itineraries and always answer with valid JSON only.',
    aiPrompt({ place, forecasts, days, tripType, travellers, interests, places })
  )

  let result
  const aiDays = data ? normaliseItinerary(data.itinerary, forecasts) : []
  if (data && aiDays.length) {
    result = {
      summary: String(data.summary || ''),
      itinerary: aiDays,
      packingList: (Array.isArray(data.packingList) ? data.packingList : [])
        .map((p) => ({ item: String(p.item || p.ItemName || ''), reason: String(p.reason || p.ReasonToChoose || ''), category: String(p.category || 'Essentials') }))
        .filter((p) => p.item),
      tips: (Array.isArray(data.tips) ? data.tips : []).map(String),
      generatedBy: provider,
    }
    if (result.packingList.length < 6) result.packingList = rulesPacking
  } else {
    result = { ...localItinerary({ place, forecasts, tripType, places }), packingList: rulesPacking, generatedBy: 'local' }
  }

  return {
    location: place,
    about,
    startDate,
    days,
    tripType,
    travellers,
    weather: weather && { ...weather, trip: forecasts },
    places,
    ...result,
  }
}
