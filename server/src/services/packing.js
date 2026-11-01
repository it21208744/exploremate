/** Rule-based packing list from forecast + trip type. Always available, no AI needed. */
export function buildPackingList({ forecasts = [], current, tripType = '', days = 1 }) {
  const known = forecasts.map((f) => f.forecast).filter(Boolean)
  const maxT = known.length ? Math.max(...known.map((d) => d.tempMax)) : current?.temp ?? 25
  const minT = known.length ? Math.min(...known.map((d) => d.tempMin)) : current?.temp ?? 20
  const rainy = known.some((d) => (d.rainChance ?? 0) >= 50 || (d.rainMm ?? 0) >= 2) || ['rain', 'drizzle', 'storm'].includes(current?.icon)
  const stormy = known.some((d) => d.icon === 'storm') || current?.icon === 'storm'
  const windy = known.some((d) => (d.windMax ?? 0) >= 35) || (current?.wind ?? 0) >= 35
  const highUv = known.some((d) => (d.uvMax ?? 0) >= 6)
  const snow = known.some((d) => d.icon === 'snow') || current?.icon === 'snow'
  const type = tripType.toLowerCase()
  const items = []
  const add = (item, reason, category) => items.push({ item, reason, category })

  add('Passport / national ID & travel documents', 'Needed for check-ins, bookings and emergencies', 'Essentials')
  add('Phone, charger & power bank', 'Maps, tickets and photos all day long', 'Essentials')
  add('Reusable water bottle', `Stay hydrated${maxT >= 28 ? ` — highs reach ${Math.round(maxT)}°C` : ''}`, 'Essentials')
  add('Basic first-aid kit & personal medication', 'Covers small cuts, headaches and upset stomachs', 'Health')
  add(`${Math.min(days, 7)} days of clothing`, `Planned for a ${days}-day trip (do laundry for longer stays)`, 'Clothing')

  if (maxT >= 27) {
    add('Light, breathable cotton/linen clothes', `Warm days up to ${Math.round(maxT)}°C`, 'Clothing')
    add('Sunglasses & a hat', 'Strong sunshine expected', 'Clothing')
  }
  if (highUv || maxT >= 27) add('Sunscreen SPF 50+', highUv ? 'UV index is high on some days' : 'Hot, sunny weather', 'Health')
  if (minT <= 15) add('Warm jacket or fleece', `Temperatures drop to ${Math.round(minT)}°C`, 'Clothing')
  if (minT <= 5) add('Thermal layers, gloves & beanie', `Near-freezing lows of ${Math.round(minT)}°C`, 'Clothing')
  if (snow) add('Waterproof insulated boots', 'Snow is in the forecast', 'Clothing')
  if (rainy) {
    add('Compact umbrella or rain jacket', 'Rain is likely on some days', 'Clothing')
    add('Waterproof bag / dry pouch', 'Keeps your phone and documents dry', 'Gear')
    add('Quick-dry footwear or sandals', 'Wet streets and trails', 'Clothing')
  }
  if (stormy) add('Flexible indoor backup plans', 'Thunderstorms are possible — avoid exposed areas', 'Tips')
  if (windy) add('Windbreaker', 'Strong winds expected', 'Clothing')
  add('Insect repellent', 'Useful outdoors, especially around dusk', 'Health')

  if (/adventure/.test(type)) {
    add('Comfortable hiking shoes', 'For trails and uneven ground', 'Gear')
    add('Small daypack', 'Carry water, snacks and layers on excursions', 'Gear')
    add('Torch / headlamp', 'Early starts and caves', 'Gear')
  }
  if (/cultural|historical/.test(type)) {
    add('Modest clothing that covers shoulders & knees', 'Required at many temples and religious sites', 'Clothing')
    add('Slip-on shoes', 'You often remove shoes at sacred sites', 'Clothing')
  }
  if (/family/.test(type)) {
    add('Snacks & wet wipes', 'Keeps everyone happy between stops', 'Essentials')
    add('Travel games or books for kids', 'For long drives and downtime', 'Gear')
  }
  if (/food/.test(type)) {
    add('Digestive tablets / antacids', 'For adventurous eating', 'Health')
    add('Hand sanitiser', 'Street-food stalls may not have washing facilities', 'Health')
  }
  if (/beach|relax/.test(type)) {
    add('Swimwear & beach towel', 'Beach and pool time', 'Clothing')
    add('Flip-flops', 'Sand and pool decks', 'Clothing')
  }
  add('Some local cash', 'Small shops, tuk-tuks and tips often need cash', 'Essentials')
  return items
}
