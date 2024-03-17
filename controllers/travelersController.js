import { generateList, generatePlans } from '../components/openAI.js'

import { checkWeather } from '../components/weather.js'

export const addPlan = async (req, res, next) => {
  const { location, days, type, date } = req.body

  const weather = await checkWeather(location)

  if (weather.cod != 404) {
    const plansContent = await generatePlans(location, days, type)

    let packingList = await generateList(
      weather.weather[0].description,
      weather.main.temp,
      weather.wind.speed
    )

    return res.status(200).json({ plansContent, weather, packingList })
  }

  res.status(404).json({ msg: 'There is no such city' })
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
