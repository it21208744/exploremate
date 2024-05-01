import React from "react";
import { Link } from "react-router-dom";
import hotell from '../../assets/images/t.jpg'

const SalesHeader =()=>{

  const lableStyle = { 
    color:"#042630",
    fontWeight: "400", 
    fontSize: "18px",    
    marginTop:"80px"    
  };
  

    return(
<>
<div style={{
  background: `url(${hotell})`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    backgroundPosition: "center",
    width: '100vw',
    height: '100vh'
      
}} >

  {/* <h1 style={lableStyle}>WELCOME TO EXPLOREMATE</h1> */}
  
  <img style={{width: '80vw',
    height: '70vh',
    marginLeft:'150px',marginTop:'120px'}} src={hotell} alt="My Uploaded Image" />
    
        </div>
      
            </>
  
    );
}

export default SalesHeader;