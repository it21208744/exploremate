import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Table, Button, Modal } from 'react-bootstrap';

export default function AllPlanting() {
    const [taxi, settaxi] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Move fetchHotelData outside of useEffect
    const fetchTaxiData = async () => {
        try {
            const response = await axios.get("/api/v1/Planting/");
            settaxi(response.data);
        } catch (error) {
            console.error('Error fetch Taxi data:', error);
        }
    };

    useEffect(() => {
      fetchTaxiData();
    }, []);

    const handleDeleteClick = (_id) => {
        setSelectedId(_id);
        setShowModal(true);
    };

    const handleDelete = () => {
        axios.delete(`/api/v1/Planting/delete/${selectedId}`).then((res) => {
          fetchTaxiData(); // Call fetchHotelData to update the state after deletion
          settaxi(taxi.filter(item => item._id !== selectedId));
            setShowModal(false);
        }).catch((err) => {
            alert(err.message);
            setShowModal(false);
        });
    };

    const SetToLocalStorage = (id, companyName, bussinessRegNo, companyEmail, comContactNo, vehicleType, vehicleModel,licenNo,inssuranceCompany,driverName,driverEmail,contactNumber,driverLiceNo) =>{

    
       localStorage.setItem("id",id);
       localStorage.setItem("companyName",companyName);
       localStorage.setItem("bussinessRegNo",bussinessRegNo);
       localStorage.setItem("companyEmail",companyEmail);
       localStorage.setItem("comContactNo",comContactNo);
       localStorage.setItem("vehicleType",vehicleType);
       localStorage.setItem("vehicleModel",vehicleModel);
       localStorage.setItem("licenNo",licenNo);
       localStorage.setItem("inssuranceCompany",inssuranceCompany);
       localStorage.setItem("driverName",driverName);
       localStorage.setItem("driverEmail",driverEmail);
       localStorage.setItem("contactNumber",contactNumber);
       localStorage.setItem("driverLiceNo",driverLiceNo);


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
    //backgroundImage: "linear-gradient(125deg,#042630,#4c7273)",
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
    width: "1300px",
    marginLeft:"100px",
   
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
    textAlign: 'left'
  };



    return (
        <>
        <div style={{
            //backgroundImage:url("../../../assets/images/beautiOfEarth.webp"),
         backgroundColor:"#FFFFF0",
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    width: '100vw',
    height: '100vh'
      
}} >
            <div style={{marginLeft:"700px" }}><br/><br/>
                    <label  style={lableStyle1}><h3>TAXI DETAILS</h3></label>
                    </div>
            <br />
            <div style={cardstyle}>
                <Table style={tableStyle}table className="table table-striped" id="my-table" >
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
                                <td style={tdStyle}>{item. driverEmail}</td>
                                <td style={tdStyle}>{item.contactNumber}</td>
                                <td style={tdStyle}>{item.driverLiceNo}</td>

                                <td>
                                    <a href="plantUpdate">
                                        <button style={buttonEdit } className="btn-success" onClick={() => SetToLocalStorage(
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
                                        )}>Edit</button>
                                    </a>
                                </td>
                                <td><button style={ buttonDelete } className="btn-danger" onClick={() => handleDeleteClick(item._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

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
            </div>
            <br />
        </>
    );
}