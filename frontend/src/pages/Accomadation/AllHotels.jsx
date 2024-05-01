import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Table, Button, Modal } from 'react-bootstrap';
import hotell from '../../assets/images/as.webp'
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

    // Styles
    const lableStyle1 = { 
        color:"#042630" ,
        fontSize: "20px", 
    };

    const buttonDelete = {
        display: "inline-block",
        backgroundColor: "#D71515",
        color:"#fff",
        textTransform:"uppercase",
        letterSpacing:"1px",
        fontSize: "14px",
        width:"90px",
        height:"36px",
        border:"none",
        borderRadius: "20px",
        cursor: "pointer",
    };

    const buttonEdit = {
        display: "inline-block",
        backgroundColor: "green",
        color:"#fff",
        textTransform:"uppercase",
        letterSpacing:"1px",
        fontSize: "14px",
        width:"90px",
        height:"36px",
        border:"none",
        borderRadius: "20px",
        cursor: "pointer",
    };

    const cardstyle ={
        overflow : "hidden",
        boxShadow:"0 2px 20px ",
        borderRadius: "$radius",
        transition: "transform 200ms ease-in",
        padding:"30px",
        backdropFilter: "blur(5px)",
        background: "linear-gradient(rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.3))",
        width: "1200px",
        marginLeft:"180px",
    };
    
    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
        color: '#4c7273'
    };

    const thStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
        backgroundColor: '#f2f2f2'
    };

    const tdStyle = {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'left',
        color: '#4c7273',
        
    };

    return (
        <>
        
    <div style={{
  background: `url(${hotell})`,
 //backgroundColor:"#FFFFF0",
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    width: '100vw',
    height: '150vh'
      
}} >
            <div style={{marginLeft:"700px"}}><br/><br/>
                <label  style={lableStyle1}><h3>HOTEL DETAILS</h3></label>
            </div>
            <br></br>
            <div style={cardstyle}>
                <Table style={tableStyle} className="table table-striped" id="my-table">
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
                                <td  style={tdStyle}>{item.Location}</td>
                                <td style={tdStyle}>{item.Amenties}</td>
                                <td style={tdStyle}>{item.Description}</td>
                                <td style={tdStyle}>{item.RoomDetail}</td>
                                <td style={tdStyle}>{item.PackDetail}</td>
                                <td>
                                    <a href="uphotels">
                                        <button style={buttonEdit} className="btn-success" onClick={() => SetToLocalStorage(
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
                                <td><button style={buttonDelete} className="btn-danger" onClick={() => handleDeleteClick(item._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                
                <Modal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    centered // This centers the modal vertically
                >
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
        </div>
        <br />
        </>
    );
}
