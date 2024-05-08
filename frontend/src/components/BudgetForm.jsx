// Import necessary modules
import React, { useState } from 'react'
import axios from 'axios'
import { Form, redirect, useActionData, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import hotell from '../assets/images/f.jpg'
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
  const [btnState, setBtnState] = useState('GENERATE')
  const navigate = useNavigate() // To redirect to another page upon form submission

  const handleSubmit = async (event) => {
    setBtnState('GENERATING')
    event.preventDefault()
    const formData = {
      Location,
      Budget,
      NumDays,
    }
    try {
      const response = await axios.post('/api/v1/bd/find-hotels', formData)
      setBtnState('GENERATE')
      // console.log(response.data.plan)

      localStorage.setItem('budgetPlan', JSON.stringify(response.data))

      toast.success('Plan added')
      navigate('../budgetdisplay') // Redirect to the plan result page
    } catch (error) {
      return toast.error('No matching hotels found')
    }

    // Submit form data to the action and navigate to the results page
  }

  const inputStyle = {
    display: 'block',
    width: '100%',
    height: '36px',
    borderWidth: '0 0 2px 0',
    borderColor: '#86b9b0',
    fontSize: '14px',
    fontWeight: '300',
    LineHeight: '26px',
    fontFamily: 'Inter, systemUi, Avenir, Helvetica, Arial, sansSerif',
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

  const lableStyle = {
    color: '#4c7273',
    fontWeight: '600',
    fontSize: '18px',
    fontFamily: 'Inter, systemUi, Avenir, Helvetica, Arial, sansSerif',
  }
  //heading
  const lableStyle1 = {
    //color:"#042630" ,
    color: '#042630',
    //fontWeight: "300",
    fontSize: '25px',
    // marginBottom: "1000px"
    //fontFamily: "Inter, systemUi, Avenir, Helvetica, Arial, sansSerif",
  }

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

    //marginBottom: "100px"
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
          <label style={lableStyle1}>
            <h3>Plan on Your Budget </h3>
          </label>
        </div>

        <br />
        <div style={cardstyle}>
          <Form method="post" onSubmit={handleSubmit}>
            <div style={{ padding: '30px' }}>
              <div className="form-group">
                <label style={lableStyle}>Location</label>
                <input
                  type="text"
                  name="Location"
                  placeholder="Enter location"
                  style={inputStyle}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <br />
              <div className="form-group">
                <label style={lableStyle}>Budget</label>
                <input
                  type="text"
                  name="Budget"
                  placeholder="Enter Budget"
                  style={inputStyle}
                  onChange={(e) => setBudget(e.target.value)}
                  required
                  pattern="[0-9]+"
                  title="Only values can be entered"
                />
              </div>

              <br />
              <div className="form-group">
                <label style={lableStyle}>Number of Days</label>
                <input
                  type="text"
                  name="NumDays"
                  placeholder="Enter NumDays"
                  style={inputStyle}
                  onChange={(e) => setNumDays(e.target.value)}
                  required
                  pattern="[0-9]+"
                  title="Only values can be entered"
                />
              </div>

              <br />
              <button
                type="submit"
                style={buttonStyle}
                disabled={btnState === 'GENERATING'}
              >
                {btnState}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}
