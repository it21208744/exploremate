import { fetchJson } from './fetchJson.js'
import { HttpError } from '../utils/http.js'

// WMO weather interpretation codes → label + icon key (used by the UI)
const WMO = {
  0: ['Clear sky', 'sun'], 1: ['Mainly clear', 'sun'], 2: ['Partly cloudy', 'cloud-sun'], 3: ['Overcast', 'cloud'],
  45: ['Fog', 'fog'], 48: ['Freezing fog', 'fog'],
  51: ['Light drizzle', 'drizzle'], 53: ['Drizzle', 'drizzle'], 55: ['Heavy drizzle', 'drizzle'],
  56: ['Freezing drizzle', 'drizzle'], 57: ['Freezing drizzle', 'drizzle'],
  61: ['Light rain', 'rain'], 63: ['Rain', 'rain'], 65: ['Heavy rain', 'rain'],
  66: ['Freezing rain', 'rain'], 67: ['Freezing rain', 'rain'],
  71: ['Light snow', 'snow'], 73: ['Snow', 'snow'], 75: ['Heavy snow', 'snow'], 77: ['Snow grains', 'snow'],
  80: ['Rain showers', 'rain'], 81: ['Rain showers', 'rain'], 82: ['Violent rain showers', 'rain'],
  85: ['Snow showers', 'snow'], 86: ['Snow showers', 'snow'],
  95: ['Thunderstorm', 'storm'], 96: ['Thunderstorm with hail', 'storm'], 99: ['Thunderstorm with hail', 'storm'],
}
export const describeCode = (code) => {
  const [label, icon] = WMO[code] || ['Unknown', 'cloud']
  return { label, icon }
}

/** Finds a place by name. Returns { name, country, region, lat, lon, timezone, population } */
export async function geocode(query) {
  const q = String(query || '').trim()
  if (!q) throw new HttpError(400, 'Please enter a destination')
  // Open-Meteo works best with the city part of "Kandy, Sri Lanka"
  const [city, ...rest] = q.split(',').map((s) => s.trim()).filter(Boolean)
  const hint = rest.join(' ').toLowerCase()
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=10&language=en&format=json`
  const data = await fetchJson(url, { ttl: 24 * 60 * 60 * 1000 })
  let results = data.results || []
  if (hint) {
    const filtered = results.filter((r) =>
      [r.country, r.admin1, r.country_code].filter(Boolean).some((v) => String(v).toLowerCase().includes(hint))
    )
    if (filtered.length) results = filtered
  }
  const r = results[0]
  if (!r) throw new HttpError(404, `We couldn't find "${q}". Try a city name such as "Kandy" or "Paris, France".`)
  return {
    name: r.name,
    country: r.country || '',
    countryCode: r.country_code || '',
    region: r.admin1 || '',
    lat: r.latitude,
    lon: r.longitude,
    timezone: r.timezone || 'auto',
    population: r.population || null,
  }
}

/** Current conditions + 16-day daily forecast. */
export async function getWeather(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day,precipitation',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,uv_index_max,sunrise,sunset',
    timezone: 'auto',
    forecast_days: '16',
  })
  const d = await fetchJson(`https://api.open-meteo.com/v1/forecast?${params}`, { ttl: 20 * 60 * 1000 })
  const c = d.current || {}
  const daily = (d.daily?.time || []).map((date, i) => ({
    date,
    code: d.daily.weather_code[i],
    ...describeCode(d.daily.weather_code[i]),
    tempMax: d.daily.temperature_2m_max[i],
    tempMin: d.daily.temperature_2m_min[i],
    rainChance: d.daily.precipitation_probability_max?.[i] ?? null,
    rainMm: d.daily.precipitation_sum?.[i] ?? null,
    windMax: d.daily.wind_speed_10m_max?.[i] ?? null,
    uvMax: d.daily.uv_index_max?.[i] ?? null,
    sunrise: d.daily.sunrise?.[i] ?? null,
    sunset: d.daily.sunset?.[i] ?? null,
  }))
  return {
    timezone: d.timezone,
    units: { temp: '°C', wind: 'km/h', rain: 'mm' },
    current: {
      time: c.time,
      temp: c.temperature_2m,
      feelsLike: c.apparent_temperature,
      humidity: c.relative_humidity_2m,
      wind: c.wind_speed_10m,
      precipitation: c.precipitation,
      isDay: c.is_day === 1,
      code: c.weather_code,
      ...describeCode(c.weather_code),
    },
    daily,
  }
}

/** Picks the forecast days that fall inside the trip window. */
export function tripForecast(weather, startDate, days) {
  const start = new Date(startDate)
  const dates = Array.from({ length: days }, (_, i) => {
    const d = new Date(start)
    d.setUTCDate(d.getUTCDate() + i)
    return d.toISOString().slice(0, 10)
  })
  const byDate = Object.fromEntries((weather?.daily || []).map((d) => [d.date, d]))
  return dates.map((date) => ({ date, forecast: byDate[date] || null }))
}
