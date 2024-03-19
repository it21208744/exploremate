import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function AllSales() {
    const [hotel, setHotel] = useState([]);

    useEffect(() => {
        const fetchHotelData = async () => {
            try {
                const response = await axios.get("/api/v1/Coffee/");
                setHotel(response.data);
            } catch (error) {
                console.error('Error fetching hotel data:', error);
            }
        };

        fetchHotelData();
    }, []);

    return (
        <>
            <div className="d-flex flex-direction-column justify-content-between m-2">
                <h3>Sales Details</h3>
            </div>

            <br />

            <div>
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
            <button className="btn-success" onClick={() => SetToLocalStorage(
                item._id,
                item.HotelName,
                item.Email,
                item.PhoneNum,
                item.Location,
                item.Amenties,
                item.Description,
                item.RoomDetail,
                item.PackDetail
            )}>Edit{" "}</button>
        </a>
    </td>
</tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br />
        </>
    );
}