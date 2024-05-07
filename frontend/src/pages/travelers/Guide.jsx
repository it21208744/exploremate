import Wrapper from '../../assets/wrappers/travelersWrappers/guide'
import getTokenfromHeaders from '../../components/getTokenFromHeader'
import axios from 'axios'
import { useState, useEffect } from 'react'
import planImg from '../../assets/images/plans.png'
import NiceModal from '@ebay/nice-modal-react'
import SinglePlanInfo from '../../components/SinglePlanInfo'
import { Card, Space } from 'antd'

const Guide = () => {
  const [plans, setPlans] = useState([])

  const getPlans = async () => {
    const res = await axios.get('/api/v1/travelers/', getTokenfromHeaders())
    setPlans(res.data)
  }

  useEffect(() => {
    getPlans()
  }, [])

  const showPlan = (city, plan, packingList, id, getPlans) => {
    NiceModal.show(SinglePlanInfo, { city, plan, packingList, id, getPlans })
  }

  return (
    <Wrapper>
      {plans.map((plan) => {
        return (
          <Card
            key={plan._id}
            onClick={() =>
              showPlan(
                plan.city,
                plan.plan,
                plan.packingList,
                plan._id,
                getPlans
              )
            }
            hoverable="true"
            cover={<img src={planImg} style={{ width: '20vw' }} />}
            style={{
              position: 'relative',
              left: '20vw',
              marginBottom: '2vh',
              width: 800,
              border: 'solid',
              borderWidth: '2px',
            }}
          >
            <h1>To {plan.city}</h1>
            <h3>{Object.keys(plan.plan).length} days trip</h3>
          </Card>
        )
      })}
    </Wrapper>
  )
}
export default Guide

// <div className="guideContainer" key={plan._id}>
//   <div className="planThumbnail">
//     <h1>To {plan.city}</h1>
//     <h3>{Object.keys(plan.plan).length} days trip</h3>
//     <button
//       onClick={() =>
//         showPlan(
//           plan.city,
//           plan.plan,
//           plan.packingList,
//           plan._id,
//           getPlans
//         )
//       }
//     >
//       Show plan
//     </button>
//   </div>
// </div>
