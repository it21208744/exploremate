import axios from "axios";
import React,{useState,useEffect} from "react";
//import SalesHeader from './SalesHeader';
import {Link, Form, useNavigate, useActionData} from 'react-router-dom';
import {toast} from 'react-toastify'

const UpdateHotels = () => {
    const[id,setid] = useState(" ");
    const [HotelName , setHname] = useState("");
const [Email , setEma] = useState("");
const [PhoneNum , setPnum] = useState("");
const [Location , setLoc] = useState("");
const [Amenties , setAmen] = useState("");
const [Description , setDesc] = useState("");
const [RoomDetail , setRoom] = useState("");
const [PackDetail , setPack] = useState("");
   

    const navigate = useNavigate();


    useEffect(() => {
        setid(localStorage.getItem("id"));
        setHname(localStorage.getItem("HotelName"));
        setEma(localStorage.getItem("Email"));
        setPnum(localStorage.getItem("PhoneNum"));
        setLoc(localStorage.getItem("Location"));
        setAmen(localStorage.getItem("Amenties"));
        setDesc(localStorage.getItem("Description"));
        setRoom(localStorage.getItem("RoomDetail"));
        setPack(localStorage.getItem("PackDetail"));
        


     },[])


     const handleUpdate = (e)=>{
      e.preventDefault();
      console.log("Id...",id);
      axios.put(`/api/v1/Coffee/update/${id}`,
      
      {
        
        HotelName:HotelName,
        Email:Email,
        PhoneNum:PhoneNum,
        Location:Location,
        Amenties:Amenties,
        Description:Description,
        RoomDetail:RoomDetail,
        PackDetail:PackDetail,
       
      }
      )
  };

 

  const inputStyle = {
    display: "block",
            width:"100%",
            height:"36px",
            borderWidth: "0 0 2px 0",
            borderColor: "#5543ca",
            fontSize: "18px",
            fontWeight: "400",
            LineHeight: '26px',
  };
  
  const buttonStyle = {
    display: "inline-block",
    backgroundImage: "linear-gradient(125deg,#a72879,#064497)",
    color:"#fff",
    textTransform:"uppercase",
    letterSpacing:"2px",
    fontSize: "16px",
      width:"200px",
      height:"36px",
      border:"none",
      cursor: "pointer",
      
  };
  
  const lableStyle = { 
    color:"#064497"         
  };
  const lableStyle1 = { 
    color:"#064497" ,
    fontWeight: "500",  
       
  };
  
  const cardstyle ={
    overflow : "hidden",
    boxShadow:"0 2px 20px ",
    borderRadius: "$radius",
    transition: "transform 200ms ease-in",
    padding:"20px",
    backdropFilter: "blur(5px)",
    background: "linear-gradient(rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.3))",
    width: "610px",
    marginLeft:"450px"
  }
  
   return(
  <>
    <div style={{backgroundImage:`url("./images/coffee-beans-2.jpg")`,
      backgroundRepeat:"no-repeat",
      backgroundSize:"cover",
      width: '100vw',
    height: '100vh'
      
}}>
 
  <div style={{marginLeft:"630px"}}><br/><br/>
                    <label  style={lableStyle1}><h3>Update Sales</h3></label>
                    </div>
                    
   <br></br>
     <Form onSubmit = {handleUpdate} >
     <div style={cardstyle}>
  <div className="form-group">
    <label htmlFor="HotelName" style={lableStyle}  >Hotel name</label>
    <input type="text" className="form-control" id="HotelName" name="HotelName"  placeholder="Enter hotel name" style={inputStyle} value = {HotelName} onChange={(e) => {
        setHname(e.target.value);
    }}
    />
   </div>
   

   
   <div className="form-group" >
    <label htmlFor="Email" style={lableStyle} >Email</label>
    <input type="text" className="form-control" id="Email" name="Email" placeholder="Enter email" style={inputStyle} value = {Email} onChange={(e) => {
      setEma(e.target.value);
    }}
    />
   </div>
   
   
   
   <div className="form-group">
    <label htmlFor="PhoneNum" style={lableStyle}  >phone number</label>
    <input type="text" className="form-control" id="PhoneNum" name="PhoneNum"  placeholder="Enter phone number" style={inputStyle} value = {PhoneNum} onChange={(e) => {
        setPnum(e.target.value);
    }}/>
   </div>
   
   <div className="form-group">
    <label htmlFor="Location" style={lableStyle} >Location</label>
    <input type="text" className="form-control" id="Location" name="Location"  placeholder="Enter location" style={inputStyle} value = {Location} onChange={(e) => {
        setLoc(e.target.value);
    }}/>
    </div>
   
    <div className="form-group">
    <label htmlFor="Amenties" style={lableStyle}  >am</label>
    <input type="text" className="form-control" id="Amenties" name="Amenties"  placeholder="Enter am" style={inputStyle} value = {Amenties} onChange={(e) => {
        setAmen(e.target.value);
    }}/>
   </div>

   <div className="form-group">
    <label htmlFor="Description" style={lableStyle}  >Dis</label>
    <input type="text" className="form-control" id="Description" name="Description"  placeholder="Enter dis" style={inputStyle} value = {Description} onChange={(e) => {
        setDesc(e.target.value);
    }}/>
   </div>

   <div className="form-group">
    <label htmlFor="RoomDetail" style={lableStyle}  >room</label>
    <input type="text" className="form-control" id="RoomDetail" name="RoomDetail"  placeholder="Enter room" style={inputStyle} value = {RoomDetail} onChange={(e) => {
        setRoom(e.target.value);
    }}/>
   </div>

   <div className="form-group">
    <label htmlFor="PackDetail" style={lableStyle}  >pack</label>
    <input type="text" className="form-control" id="PackDetail" name="PackDetail"  placeholder="Enter pack" style={inputStyle} value = {PackDetail} onChange={(e) => {
        setPack(e.target.value);
    }}/>

   </div>
   


    <div >
    <button type="submit" className="btn btn-primary" style={buttonStyle}>Submit</button>
 </div>
 </div>
 
</Form>
</div>   

</>
   )

}

export default UpdateHotels