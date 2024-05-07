import React from "react";
import { Link } from "react-router-dom";
import hotell from '../../assets/images/7.jpeg'

const SalesHeader =()=>{

  const lableStyle = { 
    color:"#fff",
    fontWeight: "1000px", 
    fontSize: "50px",  
    marginTop:"200px"  ,
     marginLeft:'450px',
     fontFamily: 'Arial, sans-serif',
  };
  
  const buttonStyle = {
    backgroundColor: '#fff', // Transparent background
    border: 'none', // Dark border (black) 1px solid #000
    color: ' #000', // Dark text (black)
    padding: '10px 20px', // Padding for spacing
    borderRadius: '5px', // Rounded corners
    cursor: 'pointer', // Pointer cursor for hover effect
    transition: 'background 0.3s, color 0.3s', // Transition for hover effects
    marginLeft:'700px',
    marginTop:'1px',
    fontSize:'15px',
  };
    return(
<>
<div style={{
  background: `url(${hotell})`,
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    backgroundPosition: "center",
   // filter: "blur(10px)",
    width: '100vw',
    height: '100vh'
      
}} >
   {/* <img style={{width: '80vw',
    height: '65vh',
    marginLeft:'150px',}} src={hotell} alt="My Uploaded Image" /> */}
  <br/><br/>
      <div>
        <div >

  <h1 style={lableStyle}>WELCOME TO EXPLOREMATE</h1>
  <p style={{color:'#fff',marginLeft:'600px', fontFamily: "Inter, systemUi, Avenir, Helvetica, Arial, sansSerif",}}>evaluate your journey with this exclusive expirience with us on this ,
  <br></br>       evaluate your journey with this exclusive expirience</p>
  <button style = {buttonStyle}>Manage Hotels</button>
  </div>
  </div>
 
   
        </div>
    
       
            </>
  
    );
}

export default SalesHeader;