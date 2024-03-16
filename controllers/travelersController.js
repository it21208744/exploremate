import { generateList, generatePlans } from '../components/openAI.js'

import { checkWeather } from '../components/weather.js'

export const addPlan = async (req, res) => {
  const { location, days, type } = req.body
  const plansContent = await generatePlans(location, days, type)

  const weather = await checkWeather(location)
  const descSituation = weather.weather[0].description
  const temp = weather.main.temp
  const windSpeed = weather.wind.speed
  let packingList = await generateList(descSituation, temp, windSpeed)
  // console.log(packingList)

  res.json({ plansContent, weather, packingList })
}

export const getAllPlans = (req, res) => {
  res.send(`get all plans`)
}

export const getSinglePlan = (req, res) => {
  res.json(req.params)
}

export const deletePlan = (req, res) => {
  res.send(`delete a plan`)
}
