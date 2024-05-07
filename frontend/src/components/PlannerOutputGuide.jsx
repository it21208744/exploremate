import axios from 'axios'
import { toast } from 'react-toastify'
import getTokenFromHeader from './getTokenFromHeader'
import { Divider } from 'antd'
const PlannerOutput = (planAndWeather) => {
  const savePlan = async () => {
    try {
      const config = getTokenFromHeader()

      const res = await axios.post(
        '/api/v1/travelers/savePlan/',
        planAndWeather,
        config
      )
      // console.log(res)
      toast.success('Plan saved successfully')
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }

  const plans = planAndWeather?.planAndWeather?.plansContent

  let plansAsArray = []
  if (plans) {
    plansAsArray = Object.values(plans).map((item) => item.actions)
  }

  const packingList = planAndWeather?.planAndWeather?.packingList

  let PackingListAsArray = []
  if (packingList) {
    PackingListAsArray = Object.values(packingList).map((item) => ({
      itemName: item.ItemName,
      reason: item.ReasonToChoose,
    }))
  }

  return (
    <div>
      <h2>Need a guide?</h2>

      <ul>
        {plansAsArray.map((plan, index) => {
          return (
            <li key={index}>
              Day {index + 1} - {plan}
            </li>
          )
        })}
      </ul>
      <Divider />
      <h2>You might need these things...</h2>

      <ul>
        {PackingListAsArray.map((item, index) => {
          return (
            <li key={index}>
              {item.itemName}
              <ul>
                <li>{item.reason}</li>
              </ul>
            </li>
          )
        })}
      </ul>

      <button onClick={savePlan} className="saveBtn">
        save this plan
      </button>
    </div>
  )
}
export default PlannerOutput
