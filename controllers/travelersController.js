import { generatePlans } from '../components/openAI.js'
import { jsonStringToObject } from '../components/stringToObject.js'
import { checkWeather } from '../components/weather.js'

export const addPlan = async (req, res) => {
  const { location, days, type } = req.body
  const plans = await generatePlans(location, days, type)
  const plansContent = jsonStringToObject(plans.content)
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
