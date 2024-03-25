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

  const showPlan = () => {
    // Show a modal with arguments passed to the component as props
    NiceModal.show(SinglePlanInfo, { name: 'Nate' })
  }

  return (
    <Wrapper>
      {plans.map((plan) => {
        return (
          <div className="guideContainer" key={plan._id}>
            <div className="planThumbnail">
              <h1>To {plan.city}</h1>
              <h3>{Object.keys(plan.plan).length} days trip</h3>
              <button onClick={showPlan}>Show plan</button>
              {/* {console.log(plan.city)} */}
            </div>
          </div>
        )
      })}
    </Wrapper>
  )
}
export default Guide
