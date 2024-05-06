// Import necessary modules
import React, { useState } from 'react'
import axios from 'axios'
import { Form, redirect, useActionData, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import hotell from '../assets/images/10.jpg'
import { budgetPlanning } from '../../../components/openAI' // Import the AI function

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const { Location, Budget, NumDays } = data

  // Fetch the list of hotels and taxis, etc.
  const filtereHotelList = await axios.get('/api/v1/Coffee/') // Assuming this endpoint exists
  //const FilterTaxiList = await axios.get('/api/taxis');   // Assuming this endpoint exists

  // Call the AI function with user data
  const plan = await budgetPlanning(
    NumDays,
    filtereHotelList.data,
    FilterTaxiList.data
  )

  return { plan } // Return the generated plan as action data
}

// Form component
export default function BudgetForm() {
  const [Location, setLocation] = useState('')
  const [Budget, setBudget] = useState('')
  const [NumDays, setNumDays] = useState('')
  const navigate = useNavigate() // To redirect to another page upon form submission

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = {
      Location,
      Budget,
      NumDays,
    }

    // Submit form data to the action and navigate to the results page
    const response = await axios.post('/api/v1/bd/find-hotels', formData)
    // console.log(response.data.plan)
    if (response.status === 200) {
      localStorage.setItem('budgetPlan', JSON.stringify(response.data))

      toast.success('Plan added')
      navigate('../budgetdisplay') // Redirect to the plan result page
    } else {
      toast.error('Something went wrong')
    }
  }

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
        <div style={{ marginLeft: '700px' }}>
          <br />
          <br />
          <label style={{ fontSize: '20px' }}>
            <h3>Plan on Your Budget </h3>
          </label>
        </div>

        <br />
        <Form method="post" onSubmit={handleSubmit}>
          <div style={{ padding: '30px' }}>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="Location"
                placeholder="Enter location"
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <br />
            <div className="form-group">
              <label>Budget</label>
              <input
                type="text"
                name="Budget"
                placeholder="Enter Budget"
                onChange={(e) => setBudget(e.target.value)}
                required
                pattern="[0-9]+"
                title="Only values can be entered"
              />
            </div>

            <br />
            <div className="form-group">
              <label>Number of Days</label>
              <input
                type="text"
                name="NumDays"
                placeholder="Enter NumDays"
                onChange={(e) => setNumDays(e.target.value)}
                required
                pattern="[0-9]+"
                title="Only values can be entered"
              />
            </div>

            <br />
            <button type="submit">Submit</button>
          </div>
        </Form>
      </div>
    </>
  )
}
