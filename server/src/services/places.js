import { fetchJson } from './fetchJson.js'

const WIKI = 'https://en.wikipedia.org/w/api.php'
// Skip results that are rarely interesting to a traveller
const GOOD = /\b(temple|kovil|devale|devalaya|vihara|viharaya|stupa|dagoba|shrine|mosque|church|cathedral|museum|gallery|palace|fort|castle|ruins|heritage|monument|memorial|lake|reservoir|waterfall|falls|beach|bay|lagoon|island|park|garden|botanical|zoo|sanctuary|reserve|forest|national park|peak|mountain|rock|cave|viewpoint|lighthouse|bridge|market|square|tower|old town|tea estate|plantation)\b/i
const BAD = /\b(prison|institute|diocese|company|bank|attack|bombing|riot|massacre|election|village|suburb|gn division|neighbourhood|hotel|resort|mall|office|ministry|council|club|association|cemetery|hospital|clinic|school|college|university|station|airport|road|street|highway|junction|constituency|district|ward|regiment|battalion|camp|factory|power station|plant|timeline|history of|empire|siege|war|battle|festival|federation|arrondissement|commune|period|era|event|organi[sz]ation|film|album|novel|song|born|politician|cricketer|singer|actor|newspaper|television|radio|party|movement|dynasty|kingdom of|archdiocese|parish|village|settlement|grama|cricket ground|ground)\b/i
const BORING = /\b(railway station|bus station|school|college|university|hospital|electoral|district|division|constituency|ward|police|post office|airport|bridge|road|street|junction|halt|grama niladhari|secretariat|stadium|cricket ground)\b/i

/** Short Wikipedia summary of a destination (or null). */
export async function getPlaceSummary(name, country = '') {
  const candidates = [country ? `${name}, ${country}` : null, name].filter(Boolean)
  for (const title of candidates) {
    try {
      const s = await fetchJson(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`, {
        ttl: 24 * 60 * 60 * 1000,
      })
      if (s?.type === 'standard' && s.extract) {
        return {
          title: s.title,
          description: s.description || '',
          extract: s.extract,
          image: s.thumbnail?.source || s.originalimage?.source || '',
          url: s.content_urls?.desktop?.page || '',
        }
      }
    } catch {
      /* try next */
    }
  }
  return null
}

// Strip pronunciations/translations such as "(Sinhala: …; Tamil: …)"
const cleanExtract = (t) =>
  t
    .replace(/\s*\([^()]*[^\x00-\x7F][^()]*\)/g, '')
    .replace(/\s+/g, ' ')
    .trim()

function scorePlace(p) {
  const text = `${p.name} ${p.description}`
  let score = 0
  if (GOOD.test(text)) score += 3
  if (BAD.test(p.description)) score -= 6
  else if (BAD.test(p.name)) score -= 3
  if (!p.description && !GOOD.test(p.name)) score -= 1
  if (/^place in\b/i.test(p.description)) score -= 2
  if (/\b(town|city|capital)\b/i.test(p.description) && !GOOD.test(p.name)) score -= 2
  if (p.image) score += 1
  if (p.distanceKm <= 0.5 && /city|town|capital/i.test(p.description)) score -= 5 // the destination itself
  return score
}

/** Notable places near a coordinate, with short descriptions and images. */
export async function getNearbyPlaces(lat, lon, { radius = 10000, limit = 18, exclude = '' } = {}) {
  try {
    const geo = await fetchJson(
      `${WIKI}?action=query&list=geosearch&gscoord=${lat}%7C${lon}&gsradius=${radius}&gslimit=60&format=json&origin=*`,
      { ttl: 24 * 60 * 60 * 1000 }
    )
    const hits = (geo?.query?.geosearch || []).filter((p) => !BORING.test(p.title))
    if (!hits.length) return []
    const ids = hits.slice(0, 40).map((p) => p.pageid)
    const info = await fetchJson(
      `${WIKI}?action=query&prop=extracts%7Cpageimages%7Cdescription&exintro=1&explaintext=1&exsentences=2&piprop=thumbnail&pithumbsize=480&pageids=${ids.join('%7C')}&format=json&origin=*`,
      { ttl: 24 * 60 * 60 * 1000 }
    )
    const pages = info?.query?.pages || {}
    return hits
      .slice(0, 40)
      .map((h) => {
        const p = pages[h.pageid] || {}
        return {
          id: h.pageid,
          name: h.title,
          lat: h.lat,
          lon: h.lon,
          distanceKm: Math.round((h.dist / 1000) * 10) / 10,
          description: p.description || '',
          extract: (p.extract || '').trim(),
          image: p.thumbnail?.source || '',
          url: `https://en.wikipedia.org/?curid=${h.pageid}`,
        }
      })
      .filter((p) => p.extract && !/may refer to/i.test(p.extract))
      .map((p) => ({ ...p, extract: cleanExtract(p.extract), score: scorePlace(p) }))
      .filter((p) => p.score >= 0 && !(exclude && (p.name.toLowerCase() === exclude.toLowerCase() || p.name.toLowerCase().startsWith(`${exclude.toLowerCase()},`))))
      // Sights first, then places with photos, then the closest
      .sort((a, b) => b.score - a.score || a.distanceKm - b.distanceKm)
      .slice(0, limit)
      .map(({ score, ...p }) => p)
  } catch (e) {
    console.warn('Wikipedia lookup failed:', e.message)
    return []
  }
}
