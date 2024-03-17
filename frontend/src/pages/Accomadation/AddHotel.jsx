import React,{useState} from "react"
import axios from "axios";

import {Link} from 'react-router-dom';

import { useNavigate } from "react-router-dom";
export default function AddSales(){

const [HotelName , setHotelName] = useState("");
const [Email , setEmail] = useState("");
const [PhoneNum , setPhoneNum] = useState("");
const [Location , setLocation] = useState("");
const [Amenties , setAmenties] = useState("");
const [Description , setDescription] = useState("");
const [RoomDetail , setRoomDetail] = useState("");
const [PackDetail , setPackDetail] = useState("");
const [imageUrl , setimageUrl] = useState("");

const navigate = useNavigate();


function sendData(e){
  e.preventDefault();

  const newSales = {
        HotelName,
        Email,
        PhoneNum,
        Location,
        Amenties,
        Description,
        RoomDetail,
        PackDetail,
        imageUrl
  }

   axios.post("http://localhost:5173/Coffee/add", newSales ).then(() =>{
    
   setHotelName("");
   setEmail("");
   setPhoneNum("");
   setLocation("");
   setAmenties("");
   setDescription("");
   setRoomDetail("");
   setPackDetail("");
   setimageUrl("");
      navigate("/allsale1");

   }).catch((err)=>{
    alert(err)
   })
 

}



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
  width: "800px",
  marginLeft:"360px"
}







  return(
    <>
    

    <div style={{backgroundImage:`url("./images/coffee-beans-2.jpg")`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    width: '100vw',
    height: '100vh'
      
}} >
  
  <div style={{marginLeft:"700px"}}><br/><br/>
                    <label for="topic" style={lableStyle1}><h3>ADD SALES </h3></label>
                    </div>
                    <div style={{marginTop:"10px",marginLeft:"960px"}}>
                    <Link to="/allsale1">
                            <button className="btn btn-secondary" style={buttonStyle}> Back</button>
                        </Link>
                        </div>
                       
                    
  <br></br>
  
    <form onSubmit={sendData}>
    <div style={cardstyle}>
  <div className="form-group">
    <label for="HotelName" style={lableStyle}  >Hotel name</label>
    <input type="text" class="form-control" id="HotelName"  placeholder="Enter hotel name" style={inputStyle}  onChange={(e) => {
        setHotelName(e.target.value);
    }}
    />
   </div>
   

   
   <div className="form-group" >
    <label for="Email" style={lableStyle} >Email</label>
    <input type="text" className="form-control" id="Email"  placeholder="Enter email" style={inputStyle} onChange={(e) => {
       setEmail(e.target.value);
    }}
    />
   </div>
   
   <div className="form-group">
    <label for="quantity" style={lableStyle}  >Quantity</label>
    <input type="text" className="form-control" id="quantity"  placeholder="Enter quantity" style={inputStyle} onChange={(e) => {
        setquantity(e.target.value);
    }}/>
   </div>
   
   <div className="form-group">
    <label for="PhoneNum" style={lableStyle}  >phone number</label>
    <input type="text" className="form-control" id="PhoneNum "  placeholder="Enter phone number" style={inputStyle} onChange={(e) => {
        setPhoneNum(e.target.value);
    }}/>
   </div>
   
   <div className="form-group">
    <label for="Location" style={lableStyle} >Location</label>
    <input type="text" className="form-control" id="Location"  placeholder="Enter location" style={inputStyle} onChange={(e) => {
        setLocation(e.target.value);
    }}/>
    </div>
   
    <div className="form-group">
    <label for="Amenties" style={lableStyle}  >Discount(Rs per item)</label>
    <input type="text" className="form-control" id="Amenties"  placeholder="Enter discount" style={inputStyle} onChange={(e) => {
        setAmenties(e.target.value);
    }}/>
   </div>

   <div className="form-group">
    <label for="Description" style={lableStyle}  >Dis</label>
    <input type="text" className="form-control" id="Description"  placeholder="Enter dis" style={inputStyle} onChange={(e) => {
        setDescription(e.target.value);
    }}/>
   </div>

   <div className="form-group">
    <label for="RoomDetail" style={lableStyle}  >room</label>
    <input type="text" className="form-control" id="RoomDetail"  placeholder="Enter room" style={inputStyle} onChange={(e) => {
        setRoomDetail(e.target.value);
    }}/>
   </div>

   <div className="form-group">
    <label for="PackDetail" style={lableStyle}  >pack</label>
    <input type="text" className="form-control" id="PackDetail"  placeholder="Enter pack" style={inputStyle} onChange={(e) => {
        setPackDetail(e.target.value);
    }}/>

   </div>
   <div className="form-group">
    <label for="imageUrl" style={lableStyle}  >imag</label>
    <input type="text" className="form-control" id="imageUrl"  placeholder="Enter image" style={inputStyle} onChange={(e) => {
        setimageUrl(e.target.value);
    }}/>
   </div>


    <div >
    <button type="submit" class="btn btn-primary" style={buttonStyle}>Submit</button>
 </div>
 </div>
 
</form>
</div>


</>
 )
}