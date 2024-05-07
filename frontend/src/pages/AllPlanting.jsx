import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Table, Button, Modal, Alert } from 'react-bootstrap'
import taxii from '../assets/taxi5.jpg'
import ReactToPrint from 'react-to-print'
import getTokenFromHeader from '../components/getTokenFromHeader'
export default function AllPlanting() {
  const [taxi, settaxi] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [inputText, setInputText] = useState('')
  const config = getTokenFromHeader()
  // Move fetchtaxiData outside of useEffect
  const fetchTaxiData = async () => {
    try {
      const response = await axios.get('/api/v1/Planting/', config)
      settaxi(response.data)
    } catch (error) {
      console.error('Error fetch Taxi data:', error)
    }
  }

  useEffect(() => {
    fetchTaxiData()
  }, [])

  const handleDeleteClick = (_id) => {
    setSelectedId(_id)
    //setShowModal(true);
    setShowNotification(true)
  }

  const handleDelete = () => {
    axios
      .delete(`/api/v1/Planting/delete/${selectedId}`, config)
      .then((res) => {
        fetchTaxiData() // Call fetchTaxiData to update the state after deletion
        settaxi(taxi.filter((item) => item._id !== selectedId))
        // Hide the notification after the item is deleted
        setShowNotification(false)
      })
      .catch((err) => {
        alert(err.message)
        // Hide the notification if there was an error
        setShowNotification(false)
      })
  }
  const SetToLocalStorage = (
    id,
    companyName,
    bussinessRegNo,
    companyEmail,
    comContactNo,
    vehicleType,
    vehicleModel,
    licenNo,
    inssuranceCompany,
    driverName,
    driverEmail,
    contactNumber,
    driverLiceNo
  ) => {
    localStorage.setItem('id', id)
    localStorage.setItem('companyName', companyName)
    localStorage.setItem('bussinessRegNo', bussinessRegNo)
    localStorage.setItem('companyEmail', companyEmail)
    localStorage.setItem('comContactNo', comContactNo)
    localStorage.setItem('vehicleType', vehicleType)
    localStorage.setItem('vehicleModel', vehicleModel)
    localStorage.setItem('licenNo', licenNo)
    localStorage.setItem('inssuranceCompany', inssuranceCompany)
    localStorage.setItem('driverName', driverName)
    localStorage.setItem('driverEmail', driverEmail)
    localStorage.setItem('contactNumber', contactNumber)
    localStorage.setItem('driverLiceNo', driverLiceNo)
  }

  const componentRef = useRef(null)

  //--------------------------------------------------------------

  // Styles for the notification

  const buttonEdit11 = {
    display: 'inline-block',
    backgroundImage: 'linear-gradient(125deg,#042630,#4c7273)',
    color: '#fff', // white background
     // black text
    textTransform: 'uppercase', // uppercase text
    letterSpacing: '1px', // spacing between letters
    fontSize: '10px', // font size
    width: '150px', // button width
    height: '40px', // button height
    border: '1px solid black', // 2px wide black border
    borderRadius: '5px', // rounded corners with a 20px radius
    cursor: 'pointer', // changes cursor to pointer on hover
    marginLeft: '680px', // positioning to the right (adjust as needed)
  }

  const alertStyle = {
    marginBottom: '20px',
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1000,
    borderRadius: '5px',
    padding: '10px',
  }

  const buttonStyle = {
    marginLeft: '10px',
  }

  //heading
  const lableStyle1 = {
    color: '#fff',
    //fontWeight: "300",
    fontSize: '25px',
    // marginBottom: "1000px"
  }

  const buttonDelete = {
    display: 'inline-block',
    //backgroundImage: "linear-gradient(125deg,#042630,#4c7273)",
    backgroundColor: '#D71515',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '14px',
    width: '90px',
    height: '36px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
  }

  const buttonEdit = {
    display: 'inline-block',
    //backgroundImage: "linear-gradient(125deg,#042630,#4c7273)",
    backgroundImage: 'linear-gradient(125deg,#042630,#4c7273)',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '14px',
    width: '90px',
    height: '36px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
  }

  const cardstyle = {
    overflow: 'hidden',
    boxShadow: '0 2px 10px ',
    borderRadius: '$radius',
    transition: 'transform 200ms ease-in',
    padding: '30px',
    backdropFilter: 'blur(10px)',
    background:
      'linear-gradient(rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.3))',
    width: '1365px',
    marginLeft: '55px',
  }

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    color: '#4c7273',
  }

  const thStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#f2f2f2',
  }

  const tdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
    color: '#fff',
  }

  // Component for the notification message
  const Notification = ({ buttonStyle, onClose, onDelete }) => {
    // Define custom styles for the notification container and buttons
    const notificationStyle = {
      backgroundColor: '#f2f2f2', // White background for the notification
      color: 'black', // Text color
      padding: '10px',
      borderRadius: '5px', // Rounded corners
      marginBottom: '20px',
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      border: '1px solid lightgray', // Optional: border for better visibility
    }

    const headingStyle = {
      color: 'red', // Red color for the heading text
      textAlign: 'center', // Center-align the heading text
      fontWeight: 'bold', // Bold the heading text
    }

    const deleteButtonStyle = {
      backgroundColor: 'red', // Red color for "Delete" button
      color: 'white', // White text color
      marginLeft: '10px',
      borderRadius: '5px', // Rounded corners
    }

    const cancelButtonStyle = {
      backgroundColor: 'blue', // Blue color for "Cancel" button
      color: 'white', // White text color
      borderRadius: '5px', // Rounded corners
    }

    //--------------------------------------------------------------

    return (
      <Alert style={notificationStyle} onClose={onClose} dismissible>
        <Alert.Heading style={headingStyle}>Delete Confirmation</Alert.Heading>
        <p>Are you sure you want to delete this taxi?</p>
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            style={cancelButtonStyle}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button variant="danger" style={deleteButtonStyle} onClick={onDelete}>
            Delete
          </Button>
        </div>
      </Alert>
    )
  }

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
        <div style={{ marginLeft: '650px' }}>
          <br />
          <br />
          <label style={lableStyle1}>
            <h3>TAXI DETAILS</h3>
          </label>
        </div>
        <br />
        <div style={cardstyle}>
          <Table
            style={tableStyle}
            table
            className="table table-striped"
            id="my-table"
          >
            <thead>
              <tr>
                <th style={thStyle}>Company Name</th>
                <th style={thStyle}>Bussiness RegNo</th>
                <th style={thStyle}>Company Email</th>
                <th style={thStyle}>Company Contact No</th>
                <th style={thStyle}>Vehicle Type</th>
                <th style={thStyle}>Vehicle Model</th>
                <th style={thStyle}>Licen Number</th>
                <th style={thStyle}>Inssurance Company</th>
                <th style={thStyle}>Driver Name</th>
                <th style={thStyle}>Driver Email</th>
                <th style={thStyle}>Contact Number</th>
                <th style={thStyle}>Driver Licen Number</th>
              </tr>
            </thead>
            <tbody>
              {taxi.map((item) => (
                <tr key={item._id}>
                  <td style={tdStyle}>{item.companyName}</td>
                  <td style={tdStyle}>{item.bussinessRegNo}</td>
                  <td style={tdStyle}>{item.companyEmail}</td>
                  <td style={tdStyle}>{item.comContactNo}</td>
                  <td style={tdStyle}>{item.vehicleType}</td>
                  <td style={tdStyle}>{item.vehicleModel}</td>
                  <td style={tdStyle}>{item.licenNo}</td>
                  <td style={tdStyle}>{item.inssuranceCompany}</td>
                  <td style={tdStyle}>{item.driverName}</td>
                  <td style={tdStyle}>{item.driverEmail}</td>
                  <td style={tdStyle}>{item.contactNumber}</td>
                  <td style={tdStyle}>{item.driverLiceNo}</td>

                  <td>
                    <a href="plantUpdate">
                      <button
                        style={buttonEdit}
                        className="btn-success"
                        onClick={() =>
                          SetToLocalStorage(
                            item._id,
                            item.companyName,
                            item.bussinessRegNo,
                            item.companyEmail,
                            item.comContactNo,
                            item.vehicleType,
                            item.vehicleModel,
                            item.licenNo,
                            item.inssuranceCompany,
                            item.driverName,
                            item.driverEmail,
                            item.contactNumber,
                            item.driverLiceNo
                          )
                        }
                      >
                        Edit
                      </button>
                    </a>
                  </td>
                  <td>
                    <button
                      style={buttonDelete}
                      className="btn-danger"
                      onClick={() => handleDeleteClick(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <br></br>
          <div className="content">
            <ReactToPrint
              trigger={() => (
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={buttonEdit11}
                >
                  <i className="fas fa-print mr-2"></i>Generate a report
                </button>
              )}
              content={() => componentRef.current} //return the current value of the reference
            />
          </div>

          {/*
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    </Modal.Footer>
                </Modal> */}

          {showNotification && (
            <Notification
              buttonStyle={buttonStyle} // Pass buttonStyle as a prop
              onClose={() => setShowNotification(false)}
              onDelete={handleDelete}
            />
          )}

          <div hidden>
            <div ref={componentRef}>
              <center>
                <h1>All Taxi Details</h1>
              </center>
              <br></br>

              <table
                style={{ borderCollapse: 'collapse', border: '1px solid' }}
              >
                <thead
                  style={{
                    fontSize: '24px',
                    borderCollapse: 'collapse',
                    border: '1px solid',
                  }}
                >
                  <tr>
                    {/* <th scope="col">id</th> */}
                    <th
                      style={{
                        borderCollapse: 'collapse',
                        border: '1px solid',
                      }}
                      scope="col"
                    >
                      Company Name
                    </th>
                    <th
                      style={{
                        borderCollapse: 'collapse',
                        border: '1px solid',
                      }}
                      scope="col"
                    >
                      Bussiness RegNo
                    </th>
                    <th
                      style={{
                        borderCollapse: 'collapse',
                        border: '1px solid',
                      }}
                      scope="col"
                    >
                      Company Email
                    </th>
                    <th
                      style={{
                        borderCollapse: 'collapse',
                        border: '1px solid',
                      }}
                      scope="col"
                    >
                      Company Contact No
                    </th>
                    <th
                      style={{
                        borderCollapse: 'collapse',
                        border: '1px solid',
                      }}
                      scope="col"
                    >
                      Vehicle Type
                    </th>
                    <th
                      style={{
                        borderCollapse: 'collapse',
                        border: '1px solid',
                      }}
                      scope="col"
                    >
                      Vehicle Model
                    </th>
                    <th
                      style={{
                        borderCollapse: 'collapse',
                        border: '1px solid',
                      }}
                      scope="col"
                    >
                      Licen Number
                    </th>
                    <th
                      style={{
                        borderCollapse: 'collapse',
                        border: '1px solid',
                      }}
                      scope="col"
                    >
                      Inssurance Company
                    </th>
                    <th
                      style={{
                        borderCollapse: 'collapse',
                        border: '1px solid',
                      }}
                      scope="col"
                    >
                      Driver Name
                    </th>
                    <th
                      style={{
                        borderCollapse: 'collapse',
                        border: '1px solid',
                      }}
                      scope="col"
                    >
                      Driver Email
                    </th>
                    <th
                      style={{
                        borderCollapse: 'collapse',
                        border: '1px solid',
                      }}
                      scope="col"
                    >
                      Contact Number
                    </th>
                    <th
                      style={{
                        borderCollapse: 'collapse',
                        border: '1px solid',
                      }}
                      scope="col"
                    >
                      Driver Licen Number
                    </th>
                  </tr>
                </thead>
                {taxi
                  .filter((el) => {
                    if (el === '') {
                      return el
                    } else {
                      return (
                        el.companyName.toLowerCase().includes(inputText) ||
                        el.bussinessRegNo.toLowerCase().includes(inputText)
                      )
                    }
                  })
                  .map((item) => {
                    return (
                      <tbody
                        style={{ fontSize: '24px', border: '1px solid' }}
                        key={item._id}
                      >
                        <tr>
                          {/* <th scope="row">{item._id}</th> */}
                          <td
                            style={{
                              borderCollapse: 'collapse',
                              border: '1px solid',
                            }}
                          >
                            {item.companyName}
                          </td>
                          <td
                            style={{
                              borderCollapse: 'collapse',
                              border: '1px solid',
                            }}
                          >
                            {item.bussinessRegNo}
                          </td>
                          <td
                            style={{
                              borderCollapse: 'collapse',
                              border: '1px solid',
                            }}
                          >
                            {item.companyEmail}
                          </td>
                          <td
                            style={{
                              borderCollapse: 'collapse',
                              border: '1px solid',
                            }}
                          >
                            {item.comContactNo}
                          </td>
                          <td
                            style={{
                              borderCollapse: 'collapse',
                              border: '1px solid',
                            }}
                          >
                            {item.vehicleType}
                          </td>
                          <td
                            style={{
                              borderCollapse: 'collapse',
                              border: '1px solid',
                            }}
                          >
                            {item.vehicleModel}
                          </td>
                          <td
                            style={{
                              borderCollapse: 'collapse',
                              border: '1px solid',
                            }}
                          >
                            {item.licenNo}
                          </td>
                          <td
                            style={{
                              borderCollapse: 'collapse',
                              border: '1px solid',
                            }}
                          >
                            {item.inssuranceCompany}
                          </td>
                          <td
                            style={{
                              borderCollapse: 'collapse',
                              border: '1px solid',
                            }}
                          >
                            {item.driverName}
                          </td>
                          <td
                            style={{
                              borderCollapse: 'collapse',
                              border: '1px solid',
                            }}
                          >
                            {item.driverEmail}
                          </td>
                          <td
                            style={{
                              borderCollapse: 'collapse',
                              border: '1px solid',
                            }}
                          >
                            {item.contactNumber}
                          </td>
                          <td
                            style={{
                              borderCollapse: 'collapse',
                              border: '1px solid',
                            }}
                          >
                            {item.contactNumber}
                          </td>
                        </tr>
                      </tbody>
                    )
                  })}
              </table>
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  )
}
