import React, { useState } from 'react'
import axios from 'axios'
import { Link, Form, redirect, useActionData } from 'react-router-dom'
import { toast } from 'react-toastify'
import hotell from '../../assets/images/lulu.webp'
import getTokenFromHeader from '../../components/getTokenFromHeader'
export const action = async ({ request }) => {
  const formData = await request.formData()
  // const navigate = useNavigate()

  const data = Object.fromEntries(formData)
  try {
    const config = getTokenFromHeader()
    const res = await axios.post('/api/v1/Coffee/add', data, config)
    toast.success('Hotel added')
    return redirect('../allhotels')
  } catch (error) {
    console.log(error)
    toast.error('Something went wrong')
    return error
  }
}

export default function AddHotel() {
  //this is how u use the response data
  const res = useActionData()
  //:)

  const [HotelName, setHname] = useState('')
  const [Email, setEma] = useState('')
  const [PhoneNum, setPnum] = useState('')
  const [Location, setLoc] = useState('')
  const [Amenties, setAmen] = useState('')
  const [Description, setDesc] = useState('')
  const [RoomDetail, setRoom] = useState('')
  const [PackDetail, setPack] = useState('')

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
    color: '#042630',
    //fontWeight: "300",
    fontSize: '20px',
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
          //backgroundColor:"#FFFFF0",
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
            <h3>ADD HOTEL </h3>
          </label>
        </div>

        <br></br>

        <Form method="post">
          <div style={cardstyle}>
            <div className="form-group">
              <label htmlFor="HotelName" style={lableStyle}>
                Hotel name
              </label>
              <input
                type="text"
                className="form-control"
                id="HotelName"
                name="HotelName"
                placeholder="Enter hotel name"
                style={inputStyle}
                onChange={(e) => {
                  setHname(e.target.value)
                }}
                required
              />
            </div>

            <br></br>

            <div className="form-group">
              <label htmlFor="Email" style={lableStyle}>
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="Email"
                name="Email"
                placeholder="Enter email"
                style={inputStyle}
                onChange={(e) => {
                  setEma(e.target.value)
                }}
                required
              />
            </div>

            <br></br>

            <div className="form-group">
              <label htmlFor="PhoneNum" style={lableStyle}>
                Phone number
              </label>
              <input
                type="text"
                className="form-control"
                id="PhoneNum"
                name="PhoneNum"
                placeholder="Enter phone number"
                style={inputStyle}
                onChange={(e) => {
                  setPnum(e.target.value)
                }}
                required
                pattern="[0-9]+"
                title="Only values can be entered"
              />
            </div>
            <br></br>
            <div className="form-group">
              <label htmlFor="Location" style={lableStyle}>
                Location
              </label>
              <input
                type="text"
                className="form-control"
                id="Location"
                name="Location"
                placeholder="Enter location"
                style={inputStyle}
                onChange={(e) => {
                  setLoc(e.target.value)
                }}
                required
              />
            </div>
            <br></br>
            <div className="form-group">
              <label htmlFor="Amenties" style={lableStyle}>
                Cost(per day)
              </label>
              <input
                type="text"
                className="form-control"
                id="Amenties"
                name="Amenties"
                placeholder="Enter cost"
                style={inputStyle}
                onChange={(e) => {
                  setAmen(e.target.value)
                }}
                required
                pattern="[0-9]+"
                title="Only values can be entered"
              />
            </div>
            <br></br>
            <div className="form-group">
              <label htmlFor="Description" style={lableStyle}>
                Description
              </label>
              <textarea
                type="text"
                className="form-control"
                id="Description"
                name="Description"
                placeholder="Enter dis"
                style={inputStyle}
                onChange={(e) => {
                  setDesc(e.target.value)
                }}
                required
              />
            </div>
            <br></br>
            <div className="form-group">
              <label htmlFor="RoomDetail" style={lableStyle}>
                Room details
              </label>
              <input
                type="text"
                className="form-control"
                id="RoomDetail"
                name="RoomDetail"
                placeholder="Enter room"
                style={inputStyle}
                onChange={(e) => {
                  setRoom(e.target.value)
                }}
                required
              />
            </div>
            <br></br>
            <div className="form-group">
              <label htmlFor="PackDetail" style={lableStyle}>
                Package details
              </label>
              <input
                type="text"
                className="form-control"
                id="PackDetail"
                name="PackDetail"
                placeholder="Enter pack"
                style={inputStyle}
                onChange={(e) => {
                  setPack(e.target.value)
                }}
                required
              />
            </div>

            <br></br>

            <div>
              <button
                type="submit"
                className="btn btn-primary"
                style={buttonStyle}
              >
                Submit
              </button>
            </div>
          </div>
        </Form>
      </div>
    </>
  )
}
