import axios from "axios";
import React,{useState,useEffect} from "react";
import SalesHeader from './SalesHeader';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const UpdateSale = () => {
const[id,setid] = useState(" ");
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


    useEffect(() => {
        setid(localStorage.getItem("id"));
        setHotelName(localStorage.getItem("HotelName"));
        setEmail(localStorage.getItem("Email"));
        setPhoneNum(localStorage.getItem("PhoneNum"));
        setLocation(localStorage.getItem("Location"));
        setAmenties(localStorage.getItem("Amenties"));
        setDescription(localStorage.getItem("Description"));
        setRoomDetail(localStorage.getItem("RoomDetail"));
        setPackDetail(localStorage.getItem("PackDetail"));
        setimageUrl(localStorage.getItem("imageUrl"));
      
     },[])


     const handleUpdate = (e)=>{
      e.preventDefault();
      console.log("Id...",id);
      axios.put(`http://localhost:8070/Coffee/update/${id}`,
      {
        
        HotelName:HotelName,
        Email:Email,
        PhoneNum:PhoneNum,
        Location:Location,
        Amenties:Amenties,
        Description:Description,
        RoomDetail:RoomDetail,
        PackDetail:PackDetail,
        imageUrl: imageUrl,
       
      }
      ).then(()=>{
        navigate("/allsale1");
      });
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
  <SalesHeader/>
  <div style={{marginLeft:"630px"}}><br/><br/>
                    <label for="topic" style={lableStyle1}><h3>Update Sales</h3></label>
                    </div>
                    <div style={{marginTop:"10px",marginLeft:"860px"}}>
                        <Link to="/allsale1">
                       
                            <button className="btn btn-secondary"  style={buttonStyle}> Back</button>
                           
                        </Link>
                       
                    </div>
   <br></br>
     <form onSubmit = {handleUpdate} >
     <div style={cardstyle}>
  <div className="form-group">
    <label for="itemNumber" style={lableStyle} >Item Number</label>
    <input    type="text" className="form-control" id="itemNumber"  placeholder="Enter itemNumber" style={inputStyle}
      value={itemNumber}
      onChange={(e)=>{

        setitemNumber(e.target.value);


      }}required
      pattern="[0-9]+"
    title="Only values can be entered"
    
    
    />
    
  </div>

  <div className="form-group">
    <label for="itemName" style={lableStyle} >Item Name</label>
    <input type="text" className="form-control" id="itemName"  placeholder="Enter itemName" style={inputStyle}
    value={itemName}
    onChange={(e)=>{

        setitemName(e.target.value);


      }}required
      
      />
    
  </div>


  
    <div className="form-group">
    <label for="price" style={lableStyle} >Price</label>
    <input type="text" className="form-control" id="price"  placeholder="Enter price" style={inputStyle}
   value={price}
    onChange={(e)=>{

        setprice(e.target.value);


      }}required
      pattern="[0.0-9.0]+"
    title="Only values can be entered"
     />
    
  </div>

  <div className="form-group">
    <label for="quantity" style={lableStyle} >Quantity</label>
    <input type="text" className="form-control" id="quantity"  placeholder="Enter quantity" style={inputStyle}
    value={quantity}
    onChange={(e)=>{

        setquantity(e.target.value);


      }}required
      pattern="[0-9]+"
    title="Only values can be entered"
      />
    
  </div>
  <div className="form-group">
    <label for="discount" style={lableStyle}  >Discount(Rs per item)</label>
    <input type="text" className="form-control" id="discount"  placeholder="Enter discount" style={inputStyle} 
    value={discount}
    onChange={(e) => {
        setDisc(e.target.value);
    }}required
    pattern="[0.0-9.0]+"
    title="Only values can be entered"/>
   </div>
  <div className="form-group">
    <label for="cusType" style={lableStyle} >Customer Type</label>
    <input className="form-control" id="cusType" placeholder="cusType" style={inputStyle}
    value={cusType}
    onChange={(e)=>{

        setcusType(e.target.value);


      }}required
      pattern="[a-zA-Z\s]+"
      title="Only input strings"
      />
  </div>

  <div >
  <button type="submit" class="btn btn-primary" style={buttonStyle}>update</button>
  </div>
  </div>
</form>
</div>   

</>
   )

}

export default UpdateSale