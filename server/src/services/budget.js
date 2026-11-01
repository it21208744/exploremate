import { generateJson } from './ai.js'

/**
 * Builds budget-friendly stay + ride combinations.
 * hotels/taxis are lean docs. Returns options sorted by best value.
 */
export async function buildBudgetOptions({ location, budget, nights, guests, hotels, taxis, withTaxi }) {
  const days = Math.max(nights, 1) // taxi hire days = nights of stay
  const options = []
  for (const h of hotels) {
    const stayCost = h.pricePerNight * nights
    if (stayCost > budget) continue
    const remaining = budget - stayCost
    // Cheapest suitable taxi that fits the remaining budget
    const ride = withTaxi
      ? taxis
          .filter((t) => t.seats >= guests && t.dailyRate * days <= remaining)
          .sort((a, b) => a.dailyRate - b.dailyRate)[0] || null
      : null
    const rideCost = ride ? ride.dailyRate * days : 0
    const total = stayCost + rideCost
    options.push({
      hotel: h,
      taxi: ride,
      nights,
      days,
      stayCost,
      rideCost,
      total,
      remaining: budget - total,
      perPerson: Math.round(total / Math.max(guests, 1)),
    })
  }
  options.sort((a, b) => Number(!!b.taxi) - Number(!!a.taxi) || a.total - b.total)
  const top = options.slice(0, 8)
  if (!top.length) return { options: [], generatedBy: 'local' }

  const { data, provider } = await generateJson(
    'You are ExploreMate, a friendly budget travel planner. Answer with valid JSON only.',
    `A traveller has a total budget of LKR ${budget} for ${nights} night(s) in ${location} with ${guests} guest(s).
For EACH stay option below write a short day plan that suits the hotel (use its description) and the budget left over.
${top
  .map(
    (o, i) =>
      `Option ${i + 1} (id ${o.hotel._id}): ${o.hotel.name} — ${o.hotel.description}. Package: ${o.hotel.packageDetails}. ${
        o.taxi ? `Includes a ${o.taxi.vehicleType} with driver.` : 'No taxi included.'
      } Leftover budget: LKR ${o.remaining}.`
  )
  .join('\n')}
Return JSON: { "plans": { "<hotel id>": { "highlight": "one sentence why this is a good pick", "morning": "...", "afternoon": "...", "evening": "...", "moneyTip": "how to use the leftover budget" } } }`
  )

  for (const o of top) {
    const p = data?.plans?.[String(o.hotel._id)]
    o.plan = p
      ? {
          highlight: String(p.highlight || ''),
          morning: String(p.morning || ''),
          afternoon: String(p.afternoon || ''),
          evening: String(p.evening || ''),
          moneyTip: String(p.moneyTip || ''),
        }
      : {
          highlight: `${o.hotel.name} keeps your stay at LKR ${o.stayCost.toLocaleString()} for ${o.nights} night${o.nights > 1 ? 's' : ''}.`,
          morning: `Enjoy breakfast at ${o.hotel.name} and set out to explore ${location}.`,
          afternoon: o.taxi
            ? `Use your ${o.taxi.vehicleType.toLowerCase()} with driver to reach the sights around ${location}.`
            : `Take local transport to the main sights around ${location}.`,
          evening: `Come back to relax — ${o.hotel.packageDetails.toLowerCase()}.`,
          moneyTip:
            o.remaining > 0
              ? `You still have LKR ${o.remaining.toLocaleString()} for food, entrance tickets and souvenirs.`
              : 'This option uses your whole budget — keep a little cash aside for meals.',
        }
  }
  return { options: top, generatedBy: data ? provider : 'local' }
}
