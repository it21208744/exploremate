import React from "react";
import { Link } from "react-router-dom";

//function Header(){

const EstateHeader = () => {

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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="/" style={lableStyle}>Dashboard</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">

    

  
      
      
    <li className="nav-item ">
        <Link to="/pd" className="nav-link " style={lableStyle} > PlantingDetails </Link>
      </li>
      <li className="nav-item ">
        <Link to="/aadd" className="nav-link " style={lableStyle}>AddPlanting </Link>
      </li>
      
    </ul>
  </div>
</nav>
  )

}
export default EstateHeader;