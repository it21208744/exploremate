import { differenceInCalendarDays, format, parseISO } from 'date-fns'

export const money = (n) =>
  n == null ? '—' : `LKR ${Number(n).toLocaleString('en-LK', { maximumFractionDigits: 0 })}`

const toDate = (d) => (typeof d === 'string' ? parseISO(d) : d)
export const fmtDate = (d, f = 'd MMM yyyy') => (d ? format(toDate(d), f) : '')
export const fmtRange = (a, b) => {
  if (!a) return ''
  const s = toDate(a), e = toDate(b)
  if (!b || +s === +e) return fmtDate(s, 'EEE d MMM yyyy')
  if (s.getFullYear() === e.getFullYear()) {
    if (s.getMonth() === e.getMonth()) return `${format(s, 'd')}–${format(e, 'd MMM yyyy')}`
    return `${format(s, 'd MMM')} – ${format(e, 'd MMM yyyy')}`
  }
  return `${fmtDate(s)} – ${fmtDate(e)}`
}
export const nightsBetween = (a, b) => differenceInCalendarDays(toDate(b), toDate(a))
export const isoDay = (d) => format(d, 'yyyy-MM-dd')

export const fullName = (u) => [u?.firstName, u?.lastName].filter(Boolean).join(' ')
export const initials = (u) => `${u?.firstName?.[0] || ''}${u?.lastName?.[0] || ''}`.toUpperCase()

export const ROLE_LABEL = { traveller: 'Traveller', hotel: 'Hotel owner', taxi: 'Taxi operator' }
export const ROLE_HOME = { traveller: '/app', hotel: '/hotel', taxi: '/taxi' }

export const AI_LABEL = { gemini: 'Google Gemini', openai: 'OpenAI', local: 'ExploreMate built-in planner' }
