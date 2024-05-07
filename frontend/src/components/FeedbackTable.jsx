import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const FeedbackTable = () => {
  const [feedbackEntries, setFeedbackEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editMessage, setEditMessage] = useState('');

  useEffect(() => {
    const fetchFeedbackEntries = async () => {
      try {
        const response = await axios.get('api/v1/feedback/feedback', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setFeedbackEntries(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching feedback entries:', error.response.data);
        setLoading(false);
      }
    };

    fetchFeedbackEntries();
  }, []);

  const handleDeleteFeedback = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this feedback entry?');

    if (!confirmed) {
      return; 
    }

    try {
      await axios.delete(`api/v1/feedback/feedback/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      setFeedbackEntries(feedbackEntries.filter(entry => entry._id !== id));
    } catch (error) {
      console.error('Error deleting feedback:', error.response.data);
    }
  };

  const handleUpdateFeedback = async (id) => {
    try {
      await axios.put(`api/v1/feedback/feedback/${id}`, {
        message: editMessage
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      setFeedbackEntries(feedbackEntries.map(entry => {
        if (entry._id === id) {
          return { ...entry, message: editMessage };
        }
        return entry;
      }));
     
      setEditingId(null);
      setEditMessage('');
    } catch (error) {
      console.error('Error updating feedback:', error.response.data);
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
    marginBottom: "30px"
  }
  

  return (
    

    
    <div style={{
      backgroundImage: 'url("https://skeepers.io/app/uploads/2022/10/customer-feedback.jpg")', 
      backgroundRepeat:"no-repeat",
      backgroundSize:"cover",
      backgroundPosition: "center",
      width: '100vw',
      height: '100vh'
        
  }} >
    
    <div >
    
    
      <h2 >Feedback Entries</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          
          {feedbackEntries.map((entry) => (
            <div key={entry._id} style={cardstyle}>
              <p ><strong style={lableStyle}>Message:</strong> {editingId === entry._id ? (
                <input type="text" value={editMessage} onChange={(e) => setEditMessage(e.target.value)} style={inputStyle} />
              ) : (
                entry.message
              )}</p>
              <p><strong style={lableStyle}>Date:</strong> {new Date(entry.createdAt).toLocaleDateString()}</p>
              <div>
                {editingId === entry._id ? (
                  <button style={{ marginRight: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 12px', cursor: 'pointer' }} onClick={() => handleUpdateFeedback(entry._id)}>Save</button>
                ) : (
                  <>
                    {/* <button style={{ marginRight: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 12px', cursor: 'pointer' }} onClick={() => setEditingId(entry._id)}>Edit</button> */}
                    <button style={{ marginRight: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 12px', cursor: 'pointer' }} onClick={() => {setEditingId(entry._id); setEditMessage(entry.message);}}>Edit</button>
                    <button style={{ backgroundColor: '#c00a1c', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 12px', cursor: 'pointer' }} onClick={() => handleDeleteFeedback(entry._id)}>Delete</button>
                  </>
                )}
              </div>
              
            </div>
            
            
          ))}
          {/* <div>
          <button style={{ backgroundColor: '#c00a1c', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 12px', cursor: 'pointer' }} onClick={() => handleDeleteFeedback(entry._id)}>Add New Feedback</button>
          </div> */}
          <div style={{
  position: 'fixed',
  bottom: '20px', // Adjust the distance from the bottom as needed
  right: '20px', // Adjust the distance from the right as needed
  zIndex: '999', // Ensure the button is above other content
}}>
  <button style={{ backgroundColor: '#2c098d', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 12px', cursor: 'pointer', position: 'relative' }}>
    <Link to="/feedback" style={{ color: "#FFFFFF", textDecoration: "none" }}>
      Add New Feedback
    </Link>
    <div style={{ position: 'absolute', top: '-70px', right: '0', fontSize: '50px', animation: 'blink 1s infinite' }}>😊</div>
  </button>
  <style>
    {`
      @keyframes blink {
        50% { opacity: 0; }
      }
    `}
  </style>
</div>
<div style={{
  position: 'fixed',
  bottom: '20px', // Adjust the distance from the bottom as needed
  right: '1200px', // Adjust the distance from the right as needed
  zIndex: '999', // Ensure the button is above other content
}}>
  <button style={{ backgroundColor: '#2c098d', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 12px', cursor: 'pointer', position: 'relative' }}>
    <Link to="/travelerDashBoard/profile" style={{ color: "#FFFFFF", textDecoration: "none" }}>
      GoBack
    </Link>
    {/* <div style={{ position: 'absolute', top: '-70px', right: '0', fontSize: '50px', animation: 'blink 1s infinite' }}>😊</div> */}
  </button>
  <style>
    {`
      @keyframes blink {
        50% { opacity: 0; }
      }
    `}
  </style>
</div>



          

          
        </div>
        
      )}
    </div>
    </div>
    
    
    
    
  );
  

};


export default FeedbackTable;
