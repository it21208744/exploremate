import React from 'react'
import { useActionData } from 'react-router-dom'
import hotell from '../assets/images/ok.jpg'
// Component to display the AI-generated plan
export default function PlanResult() {
  let data = localStorage.getItem('budgetPlan') // Get the plan data from the action
  data = JSON.parse(data)
  console.log(data)
  if (!data || !data.plan) {
    console.log(data[0])
    return <div>No plan data available.</div>
  }

  const plan = data.plan
  const cardstyle ={
    overflow : "hidden",
    boxShadow:"0 2px 20px ",
    borderRadius: "$radius",
    transition: "transform 200ms ease-in",
    padding:"30px",
    backdropFilter: "blur(5px)",
    background: "linear-gradient(rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.3))",
    width: "800px",
    marginLeft:"360px",
    marginBottom: "10px"
  }
  const buttonStyle = {
    display: "inline-block",
    backgroundImage: "linear-gradient(125deg,#042630,#4c7273)",
    color:"#fff",
    textTransform:"uppercase",
    letterSpacing:"2px",
    fontSize: "16px",
      width:"130px",
      height:"36px",
      border:"none",
      borderRadius: "5px",
      cursor: "pointer",
      
  };
  return (
    <>
    <div
        style={{
          background: `url(${hotell})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '100vw',
          height: '125vh',
        }}
      >
    <div>
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
            <button type="submit" style={buttonStyle}>Book now</button>
          </div>
          </div>
        )
      })}
    </div>
    </div>
    </>
  )
}
