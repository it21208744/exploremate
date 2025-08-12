import Wrapper from '../../assets/wrappers/travelersWrappers/guide'
import getTokenfromHeaders from '../../components/getTokenFromHeader'
import axios from 'axios'
import { useState, useEffect } from 'react'
import planImg from '../../assets/images/pl2.jpg'
import NiceModal from '@ebay/nice-modal-react'
import SinglePlanInfo from '../../components/SinglePlanInfo'
import { Card, Space } from 'antd'
import pl1Image from '../../assets/images/pl.avif';

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
    <Wrapper style={{
      backgroundImage: `url(${pl1Image})`,
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat', 
      minHeight: '100vh', 
      padding: '20px', 
    }}>
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
            cover={<img src={planImg} style={{ 
              width: '30vw',
                height: '13vh', 
                objectFit: 'cover', 
                borderRadius: '12px', 
                display: 'block', 
                margin: '0 auto', 
             }} />}
            style={{
              position: 'relative',
              left: '20vw',
              marginBottom: '2vh',
              width: 800,
              height:300,
              border: 'solid',
              borderWidth: '2px',
              overflow: 'hidden',
            boxShadow: '0 2px 20px ',
            borderRadius: '12px', 
            transition: 'transform 200ms ease-in',
            padding: '30px',
            backdropFilter: 'blur(5px)',
            background: 'linear-gradient(rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.3))',
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
