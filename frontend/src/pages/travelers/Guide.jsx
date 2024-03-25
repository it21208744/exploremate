import Wrapper from '../../assets/wrappers/travelersWrappers/guide'
import getTokenfromHeaders from '../../components/getTokenFromHeader'
import axios from 'axios'
import { useState, useEffect } from 'react'

import NiceModal from '@ebay/nice-modal-react'
import SinglePlanInfo from '../../components/SinglePlanInfo'

const Guide = () => {
  const [plans, setPlans] = useState([])

  const getPlans = async () => {
    const res = await axios.get('/api/v1/travelers/', getTokenfromHeaders())
    setPlans(res.data)
  }

  useEffect(() => {
    getPlans()
  }, [])

  const showPlan = (city, plan, packingList, id) => {
    NiceModal.show(SinglePlanInfo, { city, plan, packingList, id })
  }

  return (
    <Wrapper>
      {plans.map((plan) => {
        return (
          <div className="guideContainer" key={plan._id}>
            <div className="planThumbnail">
              <h1>To {plan.city}</h1>
              <h3>{Object.keys(plan.plan).length} days trip</h3>
              <button
                onClick={() =>
                  showPlan(plan.city, plan.plan, plan.packingList, plan._id)
                }
              >
                Show plan
              </button>
            </div>
          </div>
        )
      })}
    </Wrapper>
  )
}
export default Guide
