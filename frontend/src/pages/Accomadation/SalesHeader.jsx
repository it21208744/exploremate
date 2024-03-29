import React from "react";
import { Link } from "react-router-dom";
import hotell from '../../assets/images/hotell.jpg'

const SalesHeader =()=>{
  const lableStyle = { 
    color:"#5543ca",
    fontWeight: "400", 
    fontSize: "18px",        
  };
  
  const logoColor = { 
    color:"#6F4E37"         
  };
    return(
<>
<div style={{background: `url(${hotell})`,
  //background:`url("../../assets/images/hotell.jpg")`,
 //backgroundColor:"#FFFFF0",
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    width: '100vw',
    height: '100vh'
      
}} >
<div >
  <center>
  <h1 style={{ color: '#042630' }}>WELCOME TO EXPLOREMATE</h1>
  </center>
</div>
            {/* <ul >       
            
              <li >
              <Link to ="addhotel" className="nav-link"  style={lableStyle}>Add New Hotels |</Link>
              <Link to ="allhotels" className="nav-link"  style={lableStyle}>Manage Hotels |</Link>
              <Link to ="allhotels" className="nav-link"  style={lableStyle}>View Bookings</Link>
              </li>
              
             <br/>
              
            </ul> */}
        
        </div>
      
            </>
  
    );
}

export default SalesHeader;