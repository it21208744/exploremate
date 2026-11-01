import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, CloudSun, Sun } from 'lucide-react'

const ICONS = { sun: Sun, 'cloud-sun': CloudSun, cloud: Cloud, fog: CloudFog, drizzle: CloudDrizzle, rain: CloudRain, snow: CloudSnow, storm: CloudLightning }
const TONE = { sun: 'text-turmeric-500', 'cloud-sun': 'text-turmeric-500', rain: 'text-lagoon-500', drizzle: 'text-lagoon-500', storm: 'text-lagoon-600', snow: 'text-lagoon-500' }

export default function WeatherIcon({ icon, className = 'h-6 w-6' }) {
  const I = ICONS[icon] || Cloud
  return <I className={`${className} ${TONE[icon] || 'text-ink-mute'}`} aria-hidden />
}
