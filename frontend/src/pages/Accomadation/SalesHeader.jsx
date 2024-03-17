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
             <Link to ="/allsale1" className="nav-link" style={lableStyle}>All Sales</Link>
              </li>
              <li className="nav-item">
              <Link to ="/addsale1" className="nav-link"  style={lableStyle}>Add Sales</Link>
              </li>
              
             <br/>
              
            </ul>
        
       
      
      
  
    )
}

export default SalesHeader;