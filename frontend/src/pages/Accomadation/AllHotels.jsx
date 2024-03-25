import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Table, Button, Modal } from 'react-bootstrap';

export default function AllSales() {
    const [hotel, setHotel] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Move fetchHotelData outside of useEffect
    const fetchHotelData = async () => {
        try {
            const response = await axios.get("/api/v1/Coffee/");
            setHotel(response.data);
        } catch (error) {
            console.error('Error fetching hotel data:', error);
        }
    };

    useEffect(() => {
        fetchHotelData();
    }, []);

    const handleDeleteClick = (_id) => {
        setSelectedId(_id);
        setShowModal(true);
    };

    const handleDelete = () => {
        axios.delete(`/api/v1/Coffee/delete/${selectedId}`).then((res) => {
            fetchHotelData(); // Call fetchHotelData to update the state after deletion
            setHotel(hotel.filter(item => item._id !== selectedId));
            setShowModal(false);
        }).catch((err) => {
            alert(err.message);
            setShowModal(false);
        });
    };

    const SetToLocalStorage = (id, HotelName, Email, PhoneNum, Location, Amenties, Description, RoomDetail, PackDetail) => {
        localStorage.setItem("id", id);
        localStorage.setItem("HotelName", HotelName);
        localStorage.setItem("Email", Email);
        localStorage.setItem("PhoneNum", PhoneNum);
        localStorage.setItem("Location", Location);
        localStorage.setItem("Amenties", Amenties);
        localStorage.setItem("Description", Description);
        localStorage.setItem("RoomDetail", RoomDetail);
        localStorage.setItem("PackDetail", PackDetail);
    };

 //heading
const lableStyle1 = { 
    color:"#042630" ,
    //fontWeight: "300",  
    fontSize: "20px", 
   // marginBottom: "1000px"
  };


  const buttonDelete = {
    display: "inline-block",
    //backgroundImage: "linear-gradient(125deg,#042630,#4c7273)",
    backgroundColor: "#D71515",
    color:"#fff",
    textTransform:"uppercase",
    letterSpacing:"2px",
    fontSize: "16px",
      width:"110px",
      height:"36px",
      border:"none",
      borderRadius: "20px",
      cursor: "pointer",
      
  };

  const buttonEdit = {
    display: "inline-block",
    //backgroundImage: "linear-gradient(125deg,#042630,#4c7273)",
    backgroundColor: "green",
    color:"#fff",
    textTransform:"uppercase",
    letterSpacing:"2px",
    fontSize: "16px",
      width:"110px",
      height:"36px",
      border:"none",
      borderRadius: "20px",
      cursor: "pointer",
      
  };




  


    return (
        <>
        <div style={{backgroundImage:`url("../../../assets/images/beautiOfEarth.webp")`,
         backgroundColor:"#FFFFF0",
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    width: '100vw',
    height: '100vh'
      
}} >
            <div style={{marginLeft:"700px"}}><br/><br/>
                    <label  style={lableStyle1}><h3>HOTEL DETAILS</h3></label>
                    </div>
                    
                       
                    
  <br></br>
                <table className="table table-striped" id="my-table" style={{ color: "#000" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>HotelName</th>
                            <th>Email</th>
                            <th>PhoneNum</th>
                            <th>Location</th>
                            <th>Amenties</th>
                            <th>Description</th>
                            <th>RoomDetail</th>
                            <th>PackDetail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotel.map((item) => (
                            <tr key={item._id}>
                                <td>{item._id}</td>
                                <td>{item.HotelName}</td>
                                <td>{item.Email}</td>
                                <td>{item.PhoneNum}</td>
                                <td>{item.Location}</td>
                                <td>{item.Amenties}</td>
                                <td>{item.Description}</td>
                                <td>{item.RoomDetail}</td>
                                <td>{item.PackDetail}</td>
                                <td>
                                    <a href="uphotels">
                                        <button style={buttonEdit } className="btn-success" onClick={() => SetToLocalStorage(
                                            item._id,
                                            item.HotelName,
                                            item.Email,
                                            item.PhoneNum,
                                            item.Location,
                                            item.Amenties,
                                            item.Description,
                                            item.RoomDetail,
                                            item.PackDetail
                                        )}>Edit</button>
                                    </a>
                                </td>
                                <td><button style={ buttonDelete } className="btn-danger" onClick={() => handleDeleteClick(item._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            
            <br />
        </>
    );
}
