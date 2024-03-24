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


    return (
        <>
            <div className="d-flex flex-direction-column justify-content-between m-2">
                <h3>Taxi Details</h3>
            </div>
            <br />
            <div>
                <table className="table table-striped" id="my-table" style={{ color: "#000" }}>
                    <thead>
                        <tr>
                        <th scope="col">Company Name</th>
                        <th scope="col">Bussiness RegNo</th>
                        <th scope="col">Company Email</th>
                        <th scope="col">Company Contact No</th>
                        <th scope="col">Vehicle Type</th>
                        <th scope="col">Vehicle Model</th>
                        <th scope="col">Licen Number</th>
                        <th scope="col">Inssurance Company</th>
                        <th scope="col">Driver Name</th>
                        <th scope="col">Driver Email</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Driver Licen Number</th>
      
                        </tr>
                    </thead>
                    <tbody>
                        {taxi.map((item) => (
                            <tr key={item._id}>
                                <td>{item.companyName}</td>
                                <td>{item.bussinessRegNo}</td>
                                <td>{item.companyEmail}</td>
                                <td>{item.comContactNo}</td>
                                <td>{item.vehicleType}</td>
                                <td>{item.vehicleModel}</td>
                                <td>{item.licenNo}</td>
                                <td>{item.inssuranceCompany}</td>
                                <td>{item.driverName}</td>
                                <td>{item. driverEmail}</td>
                                <td>{item.contactNumber}</td>
                                <td>{item.driverLiceNo}</td>

                                <td>
                                    <a href="plantUpdate">
                                        <button className="btn-success" onClick={() => SetToLocalStorage(
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
                                <td><button className="btn-danger" onClick={() => handleDeleteClick(item._id)}>Delete</button></td>
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