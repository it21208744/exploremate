import React from "react";
import { Link } from "react-router-dom";

const SalesHeader =()=>{
  const lableStyle = { 
    color:"#5543ca",
    fontWeight: "400", 
    fontSize: "18px",        
  };
  const logo = { 
    color:"5543ca",
    fontSize:"28px",  
         
  };
  const logoColor = { 
    color:"#6F4E37"         
  };
    return(

      
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          
        <div className="container-fluid">
         <a className="navbar-brand" href="/" style={lableStyle}>Dashboard</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">       
              <li className="nav-item">
             <Link to ="/allsale1" className="nav-link" style={lableStyle}>All Sales</Link>
              </li>
              <li className="nav-item">
              <Link to ="/addsale1" className="nav-link"  style={lableStyle}>Add Sales</Link>
              </li>
              <li className="nav-item">
              <Link to ="/alldel1" className="nav-link"  style={lableStyle}>All Deliveries</Link>
              </li>
              <li className="nav-item">
              <Link to ="/adddel1" className="nav-link"  style={lableStyle}>Add Deliveries</Link>
              </li>
             <br/>
              
            </ul>
          </div>
        </div>
      </nav>
      
  
    )
}

export default SalesHeader;