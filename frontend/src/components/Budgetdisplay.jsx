import React from 'react'
import { useActionData } from 'react-router-dom'

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

  return (
    <div>
      {Object.keys(plan).map((key) => {
        const hotelPlan = plan[key]
        return (
          <div key={hotelPlan.id}>
            <h2>{hotelPlan.HotelName}</h2>
            <p>{hotelPlan.Description}</p>
            <p>Total Expense: {hotelPlan.TotalExpense}</p>
            <h3>Plan:</h3>
            <p>Morning: {hotelPlan.Plan.morning}</p>
            <p>Evening: {hotelPlan.Plan.evening}</p>
            <p>Night: {hotelPlan.Plan.night}</p>
          </div>
        )
      })}
    </div>
  )
}
