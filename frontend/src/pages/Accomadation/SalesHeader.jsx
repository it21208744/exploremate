import React from "react";
import { Link } from "react-router-dom";

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
<div style={{ textAlign: 'center' }}>
  <h1 style={{ color: '#042630' }}>WELCOME TO EXPLOREMATE</h1>
</div>
            <ul >       
            
              <li >
              <Link to ="addhotel" className="nav-link"  style={lableStyle}>Add New Hotels |</Link>
              <Link to ="allhotels" className="nav-link"  style={lableStyle}>Manage Hotels |</Link>
              <Link to ="allhotels" className="nav-link"  style={lableStyle}>View Bookings</Link>
              </li>
              
             <br/>
              
            </ul>
        
       
      
            </>
  
    );
}

export default SalesHeader;