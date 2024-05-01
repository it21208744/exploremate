import React from "react";
import { Link } from "react-router-dom";
import hotell from '../../assets/images/y.avif'

const SalesHeader =()=>{

  const lableStyle = { 
    color:"#fff",
    fontWeight: "1000px", 
    fontSize: "50px",  
    marginTop:"200px"  ,
     marginLeft:'450px',
     fontFamily: 'Arial, sans-serif',
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
  <p style={{color:'#fff',marginLeft:'600px'}}>evaluate your journey with this exclusive expirience with us on this ,
  <br></br>       evaluate your journey with this exclusive expirience</p>
  <button style = {{marginLeft:'700px',marginTop:'1px',}}>Add Hotels</button>
  </div>
  </div>
 
   
        </div>
    
       
            </>
  
    );
}

export default SalesHeader;