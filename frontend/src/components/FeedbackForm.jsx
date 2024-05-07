import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


function FeedbackForm() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate('/feedbackTabel');
    
    try {
      const response = await axios.post('api/v1/feedback/feedback', { message }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }
      });
      
      console.log('Feedback submitted successfully:', response.data);
    
      window.alert('Feedback added successfully!');
      
    } catch (error) {
      console.error('Error submitting feedback:', error.response.data);
      
    }
  };
  const inputStyle = {
    display: "block",
            width:"100%",
            height:"36px",
            borderWidth: "0 0 2px 0",
            borderColor: "#86b9b0",
            fontSize: "14px",
            fontWeight: "300",
            LineHeight: '26px',
  };
  
  const buttonStyle = {
    display: "inline-block",
    backgroundImage: "linear-gradient(125deg,#042630,#4c7273)",
    //backgroundColor: "#c46804",
    color:"#fff",
    textTransform:"uppercase",
    letterSpacing:"2px",
    fontSize: "16px",
      width:"200px",
      height:"36px",
      border:"none",
      borderRadius: "5px",
      cursor: "pointer",
      marginLeft:"30px"
      
  };
  // const backgroundImage = {
  //   backgroundImage: url('path/to/your/image.jpg'),
  //   backgroundSize: "cover",
  //   backgroundPosition: "center",
    
  // };
  const lableStyle = { 
    color:"#4c7273" ,  
    fontWeight: "600",    
    fontSize: "18px",   
  };
  //heading
  const lableStyle1 = { 
    color:"#042630" ,
    //fontWeight: "300",  
    fontSize: "20px", 
   // marginBottom: "1000px"
  };
  
  const cardstyle ={
    overflow : "hidden",
    boxShadow:"0 2px 20px ",
    borderRadius: "10px",
    transition: "transform 200ms ease-in",
    padding:"30px",
    backdropFilter: "blur(5px)",
    background: "linear-gradient(rgba(255, 255, 255, 0.7),rgba(255, 255, 255, 0.3))",
    width: "500px",
    marginLeft:"360px",
    //marginBottom: "100px"
  }

  return (
    <div style={{
      
        backgroundImage: 'url("https://skeepers.io/app/uploads/2022/10/customer-feedback.jpg")', 
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
        
        width: '100vw',
        height: '120vh'
          
    }}> 
    <br></br>
    <br></br>
    <br></br>
      <div  style={cardstyle}>
      <label style={lableStyle}><h2>Feedback Form</h2></label>
      <form onSubmit={handleSubmit}> 
        <div> 
          <label htmlFor="message" style={lableStyle} >Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
             
            required
          />
          
        </div>
        <br></br>
        <br></br>
        <button type="submit" className="btn btn-primary" style={buttonStyle}>Submit Feedback</button>
        <button type="submit" className="btn btn-primary" style={buttonStyle}>
          <Link to="/feedbackTabel" style={{ color: "#ffffff" ,textDecoration: "none"}}>Go Back</Link>
        </button>
      </form>
    </div>
    </div>
  );
}

export default FeedbackForm;
