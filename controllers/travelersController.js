import { generatePlans } from '../components/openAI.js'

export const addPlan = async (req, res) => {
  const { location, dates, type } = req.body
  const plans = await generatePlans(location, dates, type)

  res.send(plans.content)
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
