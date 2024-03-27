import React, { useState } from 'react';
import axios from 'axios';

function FeedbackForm() {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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

  return (
    <div style={{ margin: '0 auto', maxWidth: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px',position: 'relative', left: '30vw' }}> {/* Apply card-like styling to the container div */}
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}> 
        <div style={{ marginBottom: '1rem' }}> 
          <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }} 
            required
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Submit Feedback</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
