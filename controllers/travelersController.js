import { generateList, generatePlans } from '../components/openAI.js'
import { checkWeather, weatherForecast } from '../components/weather.js'

import travelPlan from '../models/travelPlan.js'

export const addPlan = async (req, res) => {
  const { location, days, type, date } = req.body
  let weather
  let futureWeather
  try {
    futureWeather = await weatherForecast(location, date)
    weather = await checkWeather(location)
  } catch (error) {
    console.log(error)
  }

  console.log(futureWeather)
  if (weather !== undefined)
    if (weather.cod != 404) {
      const plansContent = await generatePlans(location, days, type)

      let packingList = await generateList(
        weather.weather[0].description,
        weather.main.temp,
        weather.wind.speed
      )

      return res
        .status(200)
        .json({ plansContent, weather, futureWeather, packingList, date })
    }

  res.status(404).json({ msg: 'There is no such city' })
}

export const getAllPlans = async (req, res) => {
  const plans = await travelPlan.find({ userEmail: req.user.email })
  res.send(plans)
}

export const getSinglePlan = (req, res) => {
  res.json(req.params)
}

export const deletePlan = async (req, res) => {
  console.log(req.params.id)
  try {
    await travelPlan.findByIdAndDelete(req.params.id)
    res.send('deleted')
  } catch (error) {
    res.json({ error })
  }
}

export const savePlan = async (req, res) => {
  const city = req.body.planAndWeather.weather.name

  const packingList = req.body.planAndWeather.packingList

  const plan = req.body.planAndWeather.plansContent

  const userEmail = req.user.email

  try {
    await travelPlan.create({ city, packingList, plan, userEmail })
    res.send('Plan saved')
  } catch (error) {
    res.status(500).send('Something went wrong')
  }
}
