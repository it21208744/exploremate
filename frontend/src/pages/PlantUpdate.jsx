import axios from 'axios'
import React, { useState, useEffect } from 'react'
import getTokenFromHeader from '../components/getTokenFromHeader'
//import { DatePickerDialogRjsf } from "../../utils/DatePicker";
//import { useNavigate } from "react-router-dom";
import {
  Link,
  Form,
  useNavigate,
  useActionData,
  redirect,
} from 'react-router-dom'
import { toast } from 'react-toastify'
import taxii from '../assets/taxi5.jpg'

const PlantUpdate = () => {
  const navigate = useNavigate()

  const [id, setid] = useState(' ')
  const [companyName, setcompanyName] = useState(' ')
  const [bussinessRegNo, setbussinessRegNo] = useState('')
  const [companyEmail, setcompanyEmail] = useState('')
  const [comContactNo, setcomContactNo] = useState('')

  const [vehicleType, setvehicleType] = useState('')
  const [vehicleModel, setvehicleModel] = useState('')
  const [licenNo, setlicenNo] = useState(' ')
  const [inssuranceCompany, setinssuranceCompany] = useState('')

  const [driverName, setdriverName] = useState('')
  const [driverEmail, setdriverEmail] = useState('')
  const [contactNumber, setcontactNumber] = useState('')
  const [driverLiceNo, setdriverLiceNo] = useState('')

  useEffect(() => {
    setid(localStorage.getItem('id'))
    setcompanyName(localStorage.getItem('companyName'))
    setbussinessRegNo(localStorage.getItem('bussinessRegNo'))
    setcompanyEmail(localStorage.getItem('companyEmail'))
    setcomContactNo(localStorage.getItem('comContactNo'))

    setvehicleType(localStorage.getItem('vehicleType'))
    setvehicleModel(localStorage.getItem('vehicleModel'))
    setlicenNo(localStorage.getItem('licenNo'))
    setinssuranceCompany(localStorage.getItem('inssuranceCompany'))

    setdriverName(localStorage.getItem('driverName'))
    setdriverEmail(localStorage.getItem('driverEmail'))
    setcontactNumber(localStorage.getItem('contactNumber'))
    setdriverLiceNo(localStorage.getItem('driverLiceNo'))
  }, [])
  const config = getTokenFromHeader()
  const handleUpdate = (e) => {
    e.preventDefault()
    console.log('Id...', id)
    axios.patch(
      `/api/v1/Planting/update/${id}`,

      {
        companyName: companyName,
        bussinessRegNo: bussinessRegNo,
        companyEmail: companyEmail,
        comContactNo: comContactNo,

        vehicleType: vehicleType,
        vehicleModel: vehicleModel,
        licenNo: licenNo,
        inssuranceCompany: inssuranceCompany,

        driverName: driverName,
        driverEmail: driverEmail,
        contactNumber: contactNumber,
        driverLiceNo: driverLiceNo,
      },
      config
    )

    navigate('/TaxiOwnerDashBoard/allPlanting')
  }

  //--------------------------------------------------------------
  const lableStyle1 = {
    color: '#fff',
    //fontWeight: "300",
    fontSize: '30px',
    // marginBottom: "1000px"
  }
  const lableStyle = {
    color: '#4c7273',
    fontWeight: '600',
    fontSize: '18px',
    fontFamily: 'Inter, systemUi, Avenir, Helvetica, Arial, sansSerif',
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
    width: '200px',
    height: '36px',
    border: 'none',
    cursor: 'pointer',
    marginTop: '6px',
    marginLeft: '650px',
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
    marginLeft: '320px',
  }

  //--------------------------------------------------------------
  return (
    <>
      <div
        style={{
          background: `url(${taxii})`,
          //backgroundColor:"#FFFFF0",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '100vw',
          height: '170vh',
        }}
      >
        <br></br>
        <div className="container">
          <b>
            <center>
              <h1 style={lableStyle1}>Update Taxies Records....</h1>
            </center>{' '}
          </b>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <div style={cardstyle}>
                <h2>Company details</h2>
                <div className="form-group">
                  <b>
                    <label htmlFor="companyName" style={lableStyle}>
                      CompanyName
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="companyName"
                      placeholder=" Company Name"
                      style={inputStyle}
                      value={companyName}
                      onChange={(e) => {
                        setcompanyName(e.target.value)
                      }}
                    />
                  </b>
                </div>
                <div className="form-group">
                  <b>
                    <label htmlFor="bussinessRegNo" style={lableStyle}>
                      BussinessRegNo
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="bussinessRegNo"
                      placeholder="Enter bussiness RegNo"
                      style={inputStyle}
                      value={bussinessRegNo}
                      onChange={(e) => {
                        setbussinessRegNo(e.target.value)
                      }}
                    />
                  </b>
                </div>

                <div className="form-group">
                  <b>
                    <label htmlFor="companyEmail" style={lableStyle}>
                      CompanyEmail
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="companyEmail"
                      placeholder="Enter company Email"
                      style={inputStyle}
                      value={companyEmail}
                      onChange={(e) => {
                        setcompanyEmail(e.target.value)
                      }}
                    />
                  </b>
                </div>

                <div className="form-group">
                  <label htmlFor="comContactNo" style={lableStyle}>
                    ComContactNo
                  </label>

                  <b>
                    <input
                      type="text"
                      className="form-control"
                      id="comContactNo"
                      placeholder="Enter comContactNo"
                      style={inputStyle}
                      value={comContactNo}
                      onChange={(e) => {
                        setcomContactNo(e.target.value)
                      }}
                    />
                  </b>

                  <h2>vehicle details</h2>
                </div>

                <div className="form-group">
                  <b>
                    <label htmlFor="vehicleType" style={lableStyle}>
                      VehicleType
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="vehicleType"
                      placeholder="Enter vehicleType"
                      style={inputStyle}
                      value={vehicleType}
                      onChange={(e) => {
                        setvehicleType(e.target.value)
                      }}
                    />
                  </b>
                </div>

                <div className="form-group">
                  <b>
                    <label htmlFor=" vehicleModel" style={lableStyle}>
                      {' '}
                      VehicleModel
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id=" vehicleModel"
                      placeholder="VehicleModel"
                      style={inputStyle}
                      value={vehicleModel}
                      onChange={(e) => {
                        setvehicleModel(e.target.value)
                      }}
                    />
                  </b>
                </div>

                <div className="form-group">
                  <b>
                    <label htmlFor="licenNo" style={lableStyle}>
                      LicenNo
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="licenNo"
                      placeholder="Licen Number"
                      style={inputStyle}
                      value={licenNo}
                      onChange={(e) => {
                        setlicenNo(e.target.value)
                      }}
                    />
                  </b>
                </div>

                <div className="form-group">
                  <b>
                    <label htmlFor="inssuranceCompany" style={lableStyle}>
                      InssuranceCompany
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="inssuranceCompany"
                      placeholder="Inssurance Company"
                      style={inputStyle}
                      value={inssuranceCompany}
                      onChange={(e) => {
                        setinssuranceCompany(e.target.value)
                      }}
                    />
                  </b>
                </div>
                <h2>Driver info</h2>

                <div className="form-group">
                  <b>
                    <label htmlFor="driverName" style={lableStyle}>
                      DriverName
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="driverName"
                      placeholder="Driver Name"
                      style={inputStyle}
                      value={driverName}
                      onChange={(e) => {
                        setdriverName(e.target.value)
                      }}
                    />
                  </b>
                </div>
                <div className="form-group">
                  <b>
                    <label htmlFor="driverEmail" style={lableStyle}>
                      DriverEmail
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="driverEmail"
                      placeholder="Driver Email"
                      style={inputStyle}
                      value={driverEmail}
                      onChange={(e) => {
                        setdriverEmail(e.target.value)
                      }}
                    />
                  </b>
                </div>

                <div className="form-group">
                  <b>
                    <label htmlFor="contactNumber" style={lableStyle}>
                      ContactNumber
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="contactNumber"
                      placeholder="Contact Number"
                      style={inputStyle}
                      value={contactNumber}
                      onChange={(e) => {
                        setcontactNumber(e.target.value)
                      }}
                    />
                  </b>
                </div>

                <div className="form-group">
                  <b>
                    <label htmlFor="driverLiceNo" style={lableStyle}>
                      DriverLiceNo
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="driverLiceNo"
                      placeholder="Driver Licen Number"
                      style={inputStyle}
                      value={driverLiceNo}
                      onChange={(e) => {
                        setdriverLiceNo(e.target.value)
                      }}
                    />
                  </b>
                </div>
              </div>
            </div>
            {/* <b><center><button className="btn btn-secondary" style={buttonStyle}onClick={handleUpdate}>Update</button></center></b> */}
            <button
              type="submit"
              className="btn btn-primary"
              style={buttonStyle}
            >
              Submit
            </button>
          </form>
        </div>{' '}
      </div>
    </>
  )
}

export default PlantUpdate
