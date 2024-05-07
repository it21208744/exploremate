import React from "react";
import { Link } from "react-router-dom";
import taxi from '../assets/taxi.jpg'
//import hotells from '../../assets/images/hotel3.jpeg'

 //--------------------------------------------------------------  
const HeaderTaxi =()=>{
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

   //--------------------------------------------------------------  
    return(
<>
<div style={{
  background: `url(${taxi })`,
  backgroundPosition: "center",
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    width: '100vw',
    height: '100vh'
      
}} >
{/* <div >
  <center>
  <h1 style={{ color: '#042630' }}>WELCOME TO EXPLOREMATE ......</h1>
  
  <img style={{width: '80vw',
    height: '70vh'}} src={taxi} alt="My Uploaded Image" />
  </center>
</div> */}

<br/><br/>
      <div>
        <div >

  <h1 style={lableStyle}>WELCOME TO EXPLOREMATE</h1>
  <p style={{color:'#fff',marginLeft:'600px', fontFamily: "Inter, systemUi, Avenir, Helvetica, Arial, sansSerif",}}>evaluate your journey with this exclusive expirience with us on this ,
  <br></br>       evaluate your journey with this exclusive expirience</p>
  <button style = {buttonStyle}>Manage Taxies</button>
  </div>
  </div>
            
        
        </div>
      
            </>
  
    );
}

export default HeaderTaxi;