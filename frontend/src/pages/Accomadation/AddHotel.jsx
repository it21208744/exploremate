import React,{useState} from "react"
import axios from "axios";

import {Link, Form, useNavigate, useActionData} from 'react-router-dom';
import {toast} from 'react-toastify'




export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
    const res = await axios.post("/api/v1/Coffee/add", data )
    toast.success('Hotel added')
    return res
  } catch (error) {
    toast.error('Something went wrong')
    return error
  }
}

export default function AddHotel(){

  //this is how u use the response data
 const res = useActionData()
 //:)


const [HotelName , setHname] = useState("");
const [Email , setEma] = useState("");
const [PhoneNum , setPnum] = useState("");
const [Location , setLoc] = useState("");
const [Amenties , setAmen] = useState("");
const [Description , setDesc] = useState("");
const [RoomDetail , setRoom] = useState("");
const [PackDetail , setPack] = useState("");


const navigate = useNavigate();


// function sendData(e){
//   e.preventDefault();

//   const newSales = {
        // HotelName,
        // Email,
        // PhoneNum,
        // Location,
        // Amenties,
        // Description,
        // RoomDetail,
        // PackDetail
       
//   }
//   //hehehe


//   //hehe
//    axios.post("http://localhost:5000/Coffee/add", newSales ).then(() =>{
    
//    setHname("");
//    setEma("");
//    setPnum("");
//    setLoc("");
//    setAmen("");
//    setDesc("");
//    setRoom("");
//    setPack("");
 
//       //navigate("/allsale1");

//    }).catch((err)=>{
//     alert(err)
//    })
 

// }



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
                    <label  style={lableStyle1}><h3>ADD SALES </h3></label>
                    </div>
                    
                       
                    
  <br></br>
  
    <Form method="post">
    <div style={cardstyle}>
  <div className="form-group">
    <label htmlFor="HotelName" style={lableStyle}  >Hotel name</label>
    <input type="text" className="form-control" id="HotelName" name="HotelName"  placeholder="Enter hotel name" style={inputStyle}  onChange={(e) => {
        setHname(e.target.value);
    }}
    />
   </div>
   

   
   <div className="form-group" >
    <label htmlFor="Email" style={lableStyle} >Email</label>
    <input type="text" className="form-control" id="Email" name="Email" placeholder="Enter email" style={inputStyle} onChange={(e) => {
      setEma(e.target.value);
    }}
    />
   </div>
   
   
   
   <div className="form-group">
    <label htmlFor="PhoneNum" style={lableStyle}  >phone number</label>
    <input type="text" className="form-control" id="PhoneNum" name="PhoneNum"  placeholder="Enter phone number" style={inputStyle} onChange={(e) => {
        setPnum(e.target.value);
    }}/>
   </div>
   
   <div className="form-group">
    <label htmlFor="Location" style={lableStyle} >Location</label>
    <input type="text" className="form-control" id="Location" name="Location"  placeholder="Enter location" style={inputStyle} onChange={(e) => {
        setLoc(e.target.value);
    }}/>
    </div>
   
    <div className="form-group">
    <label htmlFor="Amenties" style={lableStyle}  >am</label>
    <input type="text" className="form-control" id="Amenties" name="Amenties"  placeholder="Enter am" style={inputStyle} onChange={(e) => {
        setAmen(e.target.value);
    }}/>
   </div>

   <div className="form-group">
    <label htmlFor="Description" style={lableStyle}  >Dis</label>
    <input type="text" className="form-control" id="Description" name="Description"  placeholder="Enter dis" style={inputStyle} onChange={(e) => {
        setDesc(e.target.value);
    }}/>
   </div>

   <div className="form-group">
    <label htmlFor="RoomDetail" style={lableStyle}  >room</label>
    <input type="text" className="form-control" id="RoomDetail" name="RoomDetail"  placeholder="Enter room" style={inputStyle} onChange={(e) => {
        setRoom(e.target.value);
    }}/>
   </div>

   <div className="form-group">
    <label htmlFor="PackDetail" style={lableStyle}  >pack</label>
    <input type="text" className="form-control" id="PackDetail" name="PackDetail"  placeholder="Enter pack" style={inputStyle} onChange={(e) => {
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