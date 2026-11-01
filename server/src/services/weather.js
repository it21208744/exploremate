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
  let data
  try {
    data = await fetchJson(url, { ttl: 24 * 60 * 60 * 1000 })
  } catch (e) {
    console.warn('Open-Meteo geocoding failed, trying OpenStreetMap:', e.message)
    return geocodeOSM(q)
  }
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

/** Backup place search via OpenStreetMap Nominatim (no key). */
async function geocodeOSM(q) {
  const list = await fetchJson(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=jsonv2&limit=1&addressdetails=1&accept-language=en`,
    { ttl: 24 * 60 * 60 * 1000 }
  )
  const r = list?.[0]
  if (!r) throw new HttpError(404, `We couldn't find "${q}". Try a city name such as "Kandy" or "Paris, France".`)
  const a = r.address || {}
  return {
    name: a.city || a.town || a.village || a.hamlet || r.name || q,
    country: a.country || '',
    countryCode: (a.country_code || '').toUpperCase(),
    region: a.state || a.province || '',
    lat: Number(r.lat),
    lon: Number(r.lon),
    timezone: 'auto',
    population: null,
  }
}

// MET Norway symbol codes → WMO-like icon keys
const metIcon = (sym = '') => {
  const s = sym.replace(/_(day|night|polartwilight)$/, '')
  if (/thunder/.test(s)) return { code: 95, label: 'Thunderstorm', icon: 'storm' }
  if (/snow|sleet/.test(s)) return { code: 73, label: s.includes('sleet') ? 'Sleet' : 'Snow', icon: 'snow' }
  if (/heavyrain/.test(s)) return { code: 65, label: 'Heavy rain', icon: 'rain' }
  if (/lightrain/.test(s)) return { code: 61, label: 'Light rain', icon: 'drizzle' }
  if (/rain/.test(s)) return { code: 63, label: s.includes('showers') ? 'Rain showers' : 'Rain', icon: 'rain' }
  if (/fog/.test(s)) return { code: 45, label: 'Fog', icon: 'fog' }
  if (/cloudy/.test(s) && !/partly/.test(s)) return { code: 3, label: 'Cloudy', icon: 'cloud' }
  if (/partlycloudy|fair/.test(s)) return { code: 2, label: s.startsWith('fair') ? 'Mainly clear' : 'Partly cloudy', icon: 'cloud-sun' }
  if (/clearsky/.test(s)) return { code: 0, label: 'Clear sky', icon: 'sun' }
  return { code: 3, label: 'Cloudy', icon: 'cloud' }
}
const SEVERITY = { storm: 6, snow: 5, rain: 4, drizzle: 3, fog: 2, cloud: 1, 'cloud-sun': 0.5, sun: 0 }

/** Backup forecast from MET Norway (~9 days, no key). Same shape as getWeather. */
async function getWeatherMET(lat, lon) {
  const d = await fetchJson(
    `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${Number(lat).toFixed(4)}&lon=${Number(lon).toFixed(4)}`,
    { ttl: 30 * 60 * 1000 }
  )
  const series = d?.properties?.timeseries || []
  if (!series.length) throw new Error('MET Norway returned no forecast')
  // Approximate local time from longitude (good enough for grouping into days)
  const offsetMs = Math.round(lon / 15) * 3600 * 1000
  const days = new Map()
  for (const t of series) {
    const local = new Date(new Date(t.time).getTime() + offsetMs)
    const date = local.toISOString().slice(0, 10)
    const hour = local.getUTCHours()
    const det = t.data.instant.details
    const next = t.data.next_1_hours || t.data.next_6_hours
    const rain = t.data.next_1_hours?.details?.precipitation_amount ?? (t.data.next_6_hours?.details?.precipitation_amount ?? 0) / 6
    const day = days.get(date) || { date, temps: [], rain: 0, wind: 0, icons: [] }
    day.temps.push(det.air_temperature)
    day.rain += rain || 0
    day.wind = Math.max(day.wind, (det.wind_speed || 0) * 3.6)
    if (next?.summary?.symbol_code && hour >= 7 && hour <= 20) day.icons.push(metIcon(next.summary.symbol_code))
    days.set(date, day)
  }
  const daily = [...days.values()].map((x) => {
    const worst = x.icons.sort((a, b) => SEVERITY[b.icon] - SEVERITY[a.icon])[0] || { code: 3, label: 'Cloudy', icon: 'cloud' }
    const mm = Math.round(x.rain * 10) / 10
    return {
      date: x.date,
      ...worst,
      tempMax: Math.max(...x.temps),
      tempMin: Math.min(...x.temps),
      rainChance: mm >= 5 ? 85 : mm >= 1 ? 65 : mm >= 0.2 ? 40 : 10, // estimated from rain amount
      rainMm: mm,
      windMax: Math.round(x.wind),
      uvMax: null,
      sunrise: null,
      sunset: null,
    }
  })
  const now = series[0]
  const det = now.data.instant.details
  const cur = metIcon((now.data.next_1_hours || now.data.next_6_hours)?.summary?.symbol_code)
  return {
    timezone: 'auto',
    source: 'MET Norway',
    units: { temp: '°C', wind: 'km/h', rain: 'mm' },
    current: {
      time: now.time,
      temp: det.air_temperature,
      feelsLike: det.air_temperature,
      humidity: det.relative_humidity,
      wind: Math.round((det.wind_speed || 0) * 3.6),
      precipitation: now.data.next_1_hours?.details?.precipitation_amount ?? 0,
      isDay: true,
      ...cur,
    },
    daily,
  }
}

/** Current conditions + daily forecast. Open-Meteo first, MET Norway as backup. */
export async function getWeather(lat, lon) {
  try {
    return await getWeatherOpenMeteo(lat, lon)
  } catch (e) {
    console.warn('Open-Meteo weather failed, using MET Norway:', e.message)
    return getWeatherMET(lat, lon)
  }
}

async function getWeatherOpenMeteo(lat, lon) {
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
    source: 'Open-Meteo',
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
