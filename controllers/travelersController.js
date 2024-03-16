import { generatePlans } from '../components/openAI.js'

import { checkWeather } from '../components/weather.js'

export const addPlan = async (req, res) => {
  const { location, days, type } = req.body
  const plansContent = await generatePlans(location, days, type)

  const weather = await checkWeather(location)

  res.json({ plansContent, weather })
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

//const description = weather.weather[0].main
//const descSituation = weather.weather[0].description

//const temp = weather.main
//const windSpeed = weather.wind.speed
