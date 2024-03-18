import React, {useState, useEffect,useRef} from 'react'
import axios from "axios";

//import { Alert } from 'react-bootstrap';
//import SalesHeader from './SalesHeader';
//import { Table, Button, Modal } from 'react-bootstrap';
//import ReactToPrint from "react-to-print";

export default function AllSales(){
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

 const[hotel, sethotel] = useState([]);
 const [filteredData, setFilteredData] = useState([]);
 //const [searchTerm, setSearchTerm] = useState('');
 //const [inputText,setInputText] = useState("");

     function gethotel(){
        axios.get("http://localhost:5000/api/v1/Coffee/").then((res) => {
          sethotel(res.data);
        }).catch((err) => {
            alert(err.message);
        })
    }

    // const handleDeleteClick = (_id) => {
    //   setSelectedId(_id);
    //   setShowModal(true);
    // };



    // function handleDelete(){

    //     axios.delete(`http://localhost:8070/Coffee/delete/${selectedId}`).then((res)=>{
    //         gethotel();
    //         sethotel(hotel.filter(item => item._id !== selectedId));
    //         setShowModal(false);
    //     }).catch((err) => {
    //         alert(err.message);
    //         setShowModal(false);
    //     })
         
    //     }

    //     const SetToLocalStorage = (id, HotelName,Email,PhoneNum,Location,Amenties,Description,RoomDetail,PackDetail) =>{

    //       localStorage.setItem("id",id);
    //       localStorage.setItem("HotelName",HotelName);
    //       localStorage.setItem("Email",Email);
    //       localStorage.setItem("PhoneNum",PhoneNum);
    //       localStorage.setItem("Location",Location);
    //       localStorage.setItem("Amenties",Amenties);
    //       localStorage.setItem("Description",Description);
    //       localStorage.setItem("RoomDetail",RoomDetail);
    //       localStorage.setItem("PackDetail",PackDetail);
   
    //    };

    

      // const calculateMul = (item) => {
      //   return (item.price - item.discount) * item.quantity;
      // };


      // useEffect(() => {
      //   const filteredResults = hotel.filter(item => {
      //     return item.HotelName.toLowerCase().includes(searchTerm.toLowerCase());
      //   });
      //   setFilteredData(filteredResults);
      // }, [hotel, searchTerm]);
    
      // const handleSearch = event => {
      //   setSearchTerm(event.target.value);
      // };
    


       

    useEffect(() => {
        gethotel();
       
     },[] )

  //const [totalAmount, setTotalAmount] = useState(0);

  // const handleAmountChange = (e) => {
  //   const newAmount = parseFloat(e.target.value);
  //   setTotalAmount(totalAmount + newAmount);
  // };

  // const notification = totalAmount > 100000 ? (
  //   <div className="notification" style={{color: "red"}}>Total amount exceeds 100,000</div>
  // ) : <div className="notification"></div>;
 

  // const handleCalculate = () => {
  //   let total = 0;
  //   Coffees.forEach((item) => {
  //     total += calculateMul(item);
  //   });
  //   setTotalAmount(total);
  // };

  const componentRef = useRef(null);
  // const inputStyle = {
  //   display: "block",
  //     width:"100%",
  //     height:"36px",
  //     borderWidth: "0 0 2px 0",
  //     borderColor: "#5543ca",
  //     fontSize: "18px",
  //     fontWeight: "400",
  //     LineHeight: '26px',
  // };

 
  // const buttonStyle1 = {
  //   display: "inline-block",
  //   backgroundImage: "linear-gradient(125deg,#a72879,#064497)",
  //   color:"#fff",
  //   textTransform:"uppercase",
  //   letterSpacing:"2px",
  //   fontSize: "16px",
  //     width:"200px",
  //     height:"36px",
  //     border:"none",
  //     cursor: "pointer",
  //     float: "right",
  //     marginRight: '1200px'
  // };


  // const lableStyle = { 
  //   color:"#5543ca"         
  // };

  // const cardstyle ={
  //   overflow : "hidden",
  //   boxShadow:"0 2px 20px ",
  //   borderRadius: "$radius",
  //   transition: "transform 200ms ease-in",
  //   padding:"20px",
  //   backdropFilter: "blur(50px)",
  //   background: "linear-gradient(rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.3))",
  //   marginLeft:"60px",
  //   marginRight:"60px"
  // }
   

//  const searchStyle = {
  
//   borderRadius: "25px",
//   borderColor:"#5543ca",
//     border: "2px solid #3c341f",
//     padding: "20px",
//     width: '300px',
//     height: '15px',
// };
    return (
      <>
      
  
  
  <div className="d-flex flex-direction-column justify-content-between m-2">
      <h3 >Sales Details</h3>
  
      
    </div>
     
    <br></br>
    <div >
      <table className="table table-striped" id="my-table" style={{color: "#000"}}>
      <thead>
  <tr>
    
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
    {filteredData.map((item)=>(
       <tr key={item._id}>

            
            <td>{item.HotelName}</td>
            <td>{item.Email}</td>
            <td>{item.PhoneNum}</td>
            <td>{item.Location}</td>
            <td>{item.Amenties}</td>
            <td>{item.Description}</td>
            <td>{item.RoomDetail}</td>
            <td>{item.PackDetail}</td>
   
      </tr>))}
    
      </tbody>
      </table>
     
      
      
      </div>
      <br></br>
      
   
    
      </>
    );
    

    
 
}