import React from 'react'
import { useActionData } from 'react-router-dom'
import hotell from '../assets/images/f.jpg'
// Component to display the AI-generated plan
import NiceModal from '@ebay/nice-modal-react'
import BookingHotelInfo from '../components/BookingHotelInfo'
import axios from 'axios'
import getTokenFromHeader from './getTokenFromHeader'
export default function PlanResult() {
  let data = localStorage.getItem('budgetPlan') // Get the plan data from the action
  data = JSON.parse(data)

  if (!data || !data.plan) {
    return <div>No plan data available.</div>
  }
  const viewHotel = (hotel) => {
    NiceModal.show(BookingHotelInfo, hotel)
  }
  const plan = data.plan
  const cardstyle = {
    overflow: 'hidden',
    boxShadow: '0 2px 20px ',
    borderRadius: '$radius',
    transition: 'transform 200ms ease-in',
    padding: '30px',
    backdropFilter: 'blur(5px)',
    background:
      'linear-gradient(rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.3))',
    width: '800px',
    marginLeft: '360px',
    marginTop: '50px',
  }
  const buttonStyle = {
    display: 'inline-block',
    backgroundImage: 'linear-gradient(125deg,#042630,#4c7273)',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontSize: '16px',
    width: '130px',
    height: '36px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }

  const getHotel = async (id) => {
    const conf = getTokenFromHeader()
    const hotel = await axios.get(`/api/v1/Coffee/get/${id}`, conf)
    return hotel.data.hotel
  }
  return (
    <>
      <div
        style={{
          background: `url(${hotell})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '100vw',
          height: '180vh',
        }}
      >
        <div>
          <div></div>
          <br></br>
          {Object.keys(plan).map((key) => {
            const hotelPlan = plan[key]

            return (
              <div style={cardstyle}>
                <div key={hotelPlan.id}>
                  <h2>{hotelPlan.HotelName}</h2>
                  {/* <p>{hotelPlan.Description}</p> */}
                  <p>Total Expense: {hotelPlan.TotalExpense}</p>
                  <h3>Plan:</h3>
                  <p>Morning: {hotelPlan.Plan.morning}</p>
                  <p>Evening: {hotelPlan.Plan.evening}</p>
                  <p>Night: {hotelPlan.Plan.night}</p>
                  <br />
                  <button
                    type="submit"
                    style={buttonStyle}
                    onClick={() => {
                      getHotel(hotelPlan.id).then((data) => viewHotel(data))
                    }}
                  >
                    Book now
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
