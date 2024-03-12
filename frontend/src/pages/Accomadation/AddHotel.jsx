import React,{useState} from "react"
import axios from "axios";
import SalesHeader from './SalesHeader';
import {Link} from 'react-router-dom';

import { useNavigate } from "react-router-dom";
export default function AddSales(){

const [itemNumber , setNumber] = useState("");
const [itemName , setName] = useState("");
const [price , setPrice] = useState("");
const [quantity , setQunty] = useState("");
const [discount , setDisc] = useState("");
const [cusType , setType] = useState("");



const navigate = useNavigate();


function sendData(e){
  e.preventDefault();
  
 
  
  

  const newSales = {
    itemNumber,
    itemName,
    price,
    quantity,
    discount,
    cusType
  }

   axios.post("http://localhost:8070/Coffee/add", newSales ).then(() =>{
    
      setNumber("");
      setName("");
      setPrice("");
      setQunty("");
      setDisc("");
      setType("");
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
  <SalesHeader/>
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
    <label for="itemNumber" style={lableStyle}  >Item Number</label>
    <input type="text" class="form-control" id="itemNumber"  placeholder="Enter item number" style={inputStyle}  onChange={(e) => {
        setNumber(e.target.value);
    }}required
    pattern="[0-9]+"
    title="Only values can be entered"
    />
   </div>
   
   <div className="form-group">
    <label for="itemName" style={lableStyle} >Item Name</label>
    <input type="text" className="form-control" id="itemName"  placeholder="Enter item name" style={inputStyle} onChange={(e) => {
        setName(e.target.value);
    }}required
/>
   </div>
   
   <div className="form-group" >
    <label for="price" style={lableStyle} >Price(Rs)</label>
    <input type="text" className="form-control" id="price"  placeholder="Enter price" style={inputStyle} onChange={(e) => {
        setPrice(e.target.value);
    }}required
    pattern="[0.0-9.0]+"
    title="Only values can be entered"
    />
   </div>
   
   <div className="form-group">
    <label for="quantity" style={lableStyle}  >Quantity(# of Items)</label>
    <input type="text" className="form-control" id="quantity"  placeholder="Enter quantity" style={inputStyle} onChange={(e) => {
        setQunty(e.target.value);
    }}required
    pattern="[0-9]+"
    title="Only values can be entered"/>
   </div>
   
   <div className="form-group">
    <label for="discount" style={lableStyle}  >Discount(Rs per item)</label>
    <input type="text" className="form-control" id="discount"  placeholder="Enter discount" style={inputStyle} onChange={(e) => {
        setDisc(e.target.value);
    }}required
    pattern="[0.0-9.0]+"
    title="Only values can be entered"/>
   </div>
   
   <div className="form-group">
    <label for="cusType" style={lableStyle} >Customer Type</label>
    <input type="text" className="form-control" id="cusType"  placeholder="Enter customer type" style={inputStyle} onChange={(e) => {
        setType(e.target.value);
    }}required
    pattern="[a-zA-Z\s]+"
    title="Only input strings"/>
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