import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Table, Button, Modal } from 'react-bootstrap'
import hotell from '../../assets/images/7.jpeg'
import ReactToPrint from 'react-to-print'

export default function AllSales() {
  const [hotel, setHotel] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [inputText, setInputText] = useState('')

  // Move fetchHotelData outside of useEffect
  const fetchHotelData = async () => {
    try {
      const response = await axios.get('/api/v1/Coffee/')
      setHotel(response.data)
    } catch (error) {
      console.error('Error fetching hotel data:', error)
    }
  }

  useEffect(() => {
    fetchHotelData()
  }, [])

  const handleDeleteClick = (_id) => {
    setSelectedId(_id)
    setShowModal(true)
  }

  const handleDelete = () => {
    axios
      .delete(`/api/v1/Coffee/delete/${selectedId}`)
      .then((res) => {
        fetchHotelData() // Call fetchHotelData to update the state after deletion
        setHotel(hotel.filter((item) => item._id !== selectedId))
        setShowModal(false)
      })
      .catch((err) => {
        alert(err.message)
        setShowModal(false)
      })
  }

  const SetToLocalStorage = (
    id,
    HotelName,
    Email,
    PhoneNum,
    Location,
    Amenties,
    Description,
    RoomDetail,
    PackDetail
  ) => {
    localStorage.setItem('id', id)
    localStorage.setItem('HotelName', HotelName)
    localStorage.setItem('Email', Email)
    localStorage.setItem('PhoneNum', PhoneNum)
    localStorage.setItem('Location', Location)
    localStorage.setItem('Amenties', Amenties)
    localStorage.setItem('Description', Description)
    localStorage.setItem('RoomDetail', RoomDetail)
    localStorage.setItem('PackDetail', PackDetail)
  }
  const componentRef = useRef(null)

  // Styles
  const lableStyle1 = {
    color: '#042630',
    fontSize: '20px',
  }

  const buttonDelete = {
    display: 'inline-block',
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
    // display: "inline-block",
    // backgroundColor: "green",
    // color:"#fff",
    display: 'inline-block',
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

  const buttonDelete1 = {
    display: 'inline-block',
    backgroundColor: '#D71515',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '10px',
    width: '60px',
    height: '30px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    marginLeft: '10px',
  }

  const buttonEdit1 = {
    display: 'inline-block',
    backgroundColor: '#b4b4b2',
    color: 'black',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '10px',
    width: '60px',
    height: '30px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    marginLeft: '70px',
  }

  const buttonEdit11 = {
    display: 'inline-block',
    backgroundImage: 'linear-gradient(125deg,#042630,#4c7273)',
    color: '#fff',
    // backgroundColor: "#b4b4b2",
    //color:"black",
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '10px',
    width: '150px',
    height: '30px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    marginLeft: '500px',
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
    width: '1200px',
    marginLeft: '40px',
    marginTop: '40px',
  }
  const imagestyle = {
    width: '97%', // Image is larger
    height: '50vh',
    //marginTop: '5px',
    marginLeft: '30px',
    borderRadius: '20px',
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
    color: '#4c7273',
  }
  const modalStyle = {
    position: 'absolute',
    top: '10%', // To place it near the top
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    // width:'200px',
  }

  return (
    <>
      <div
        style={{
          //background: `url(${hotell})`,
          backgroundColor: '#FFFFF0', //#FFFFF0
          //backgroundRepeat:"no-repeat",
          //backgroundSize:"cover",
          //width: '50vw',
          //height: '100vh'
          // position: 'relative',
          // display: 'inline-block'
        }}
      >
        <img style={imagestyle} src={hotell} alt="An example image" />
        <div
          style={{
            position: 'absolute',
            top: '45%',
            left: '50%',
            textAlign: 'center',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'none',
            color: '#fff', //#042630
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <br />
          <br />
          <label style={{ fontSize: '25px' }}>
            <h3>HOTEL DETAILS</h3>
          </label>

          <br></br>
          <div style={cardstyle}>
            <Table
              style={tableStyle}
              className="table table-striped"
              id="my-table"
            >
              <thead>
                <tr>
                  <th style={thStyle}>Hotel Name</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Phone Number</th>
                  <th style={thStyle}>Location</th>
                  <th style={thStyle}>Cost</th>
                  <th style={thStyle}>Description</th>
                  <th style={thStyle}>Room Details</th>
                  <th style={thStyle}>Pack Details</th>
                </tr>
              </thead>
              <tbody>
                {hotel.map((item) => (
                  <tr key={item._id}>
                    <td style={tdStyle}>{item.HotelName}</td>
                    <td style={tdStyle}>{item.Email}</td>
                    <td style={tdStyle}>{item.PhoneNum}</td>
                    <td style={tdStyle}>{item.Location}</td>
                    <td style={tdStyle}>{item.Amenties}</td>
                    <td style={tdStyle}>{item.Description}</td>
                    <td style={tdStyle}>{item.RoomDetail}</td>
                    <td style={tdStyle}>{item.PackDetail}</td>
                    <td>
                      <a href="uphotels">
                        <button
                          style={buttonEdit}
                          className="btn-success"
                          onClick={() =>
                            SetToLocalStorage(
                              item._id,
                              item.HotelName,
                              item.Email,
                              item.PhoneNum,
                              item.Location,
                              item.Amenties,
                              item.Description,
                              item.RoomDetail,
                              item.PackDetail
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
            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              // centered // This centers the modal vertically
              style={modalStyle}
            >
              {/* <Modal.Header closeButton></Modal.Header> */}
              <Modal.Header>
                <Modal.Title style={{ textAlign: 'center' }}>
                  Delete Confirmation
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to delete this item?
              </Modal.Body>
              <br />
              <Modal.Footer>
                <Button
                  variant="secondary"
                  style={buttonEdit1}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  style={buttonDelete1}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
            <div hidden>
              <div ref={componentRef}>
                <center>
                  <h1>All Hotel Details</h1>
                </center>
                <br></br>
                <table className="table">
                  <thead style={{ fontSize: '24px' }}>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">HotelName</th>
                      <th scope="col">Email</th>
                      <th scope="col">PhoneNum</th>
                      <th scope="col">Location</th>
                      <th scope="col">Cost</th>
                      <th scope="col">Description</th>
                      <th scope="col">RoomDetail</th>
                      <th scope="col">PackDetail</th>
                    </tr>
                  </thead>
                  {hotel
                    .filter((el) => {
                      if (el === '') {
                        return el
                      } else {
                        return (
                          el.HotelName.toLowerCase().includes(inputText) ||
                          el.Location.toLowerCase().includes(inputText)
                        )
                      }
                    })
                    .map((item) => {
                      return (
                        <tbody style={{ fontSize: '24px' }} key={item._id}>
                          <tr>
                            <th scope="row">{item._id}</th>
                            <td>{item.HotelName}</td>
                            <td>{item.Email}</td>
                            <td>{item.PhoneNum}</td>
                            <td>{item.Location}</td>
                            <td>{item.Amenties}</td>
                            <td>{item.Description}</td>
                            <td>{item.RoomDetail}</td>
                            <td>{item.PackDetail}</td>
                          </tr>
                        </tbody>
                      )
                    })}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  )
}
