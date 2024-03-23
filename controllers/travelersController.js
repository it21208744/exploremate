import { generateList, generatePlans } from '../components/openAI.js'
import { checkWeather } from '../components/weather.js'

import travelPlan from '../models/travelPlan.js'

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

export const savePlan = async (req, res) => {
  const city = req.body.planAndWeather.weather.name

  const packingList = req.body.planAndWeather.packingList

  const plan = req.body.planAndWeather.plansContent

  try {
    await travelPlan.create({ city, packingList, plan })
    res.send('Plan saved')
  } catch (error) {
    //console.log(error)
    res.send('Something went wrong')
  }
}
