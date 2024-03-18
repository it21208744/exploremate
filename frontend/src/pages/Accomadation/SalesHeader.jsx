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

      
            <ul className="navbar-nav">       
            
              <li className="nav-item">
              <Link to ="addhotel" className="nav-link"  style={lableStyle}>Add Hotels</Link>
              <Link to ="allhotels" className="nav-link"  style={lableStyle}>Add Hotels</Link>
              </li>
              
             <br/>
              
            </ul>
        
       
      
      
  
    )
}

export default SalesHeader;