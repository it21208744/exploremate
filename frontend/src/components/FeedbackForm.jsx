import React, { useState } from 'react';
import axios from 'axios'; // Make sure axios is installed: npm install axios

function FeedbackForm() {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('api/v1/feedback/feedback', { message }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
        }
      });
      
      console.log('Feedback submitted successfully:', response.data);
      // Show a JavaScript alert box when feedback is successfully submitted
      window.alert('Feedback added successfully!');
      // You can handle success here, e.g., show a success message to the user
    } catch (error) {
      console.error('Error submitting feedback:', error.response.data);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div style={{ position: 'relative', left: '30vw' }}>
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}> {/* Apply max width to the form */}
        <div style={{ marginBottom: '1rem' }}> {/* Margin bottom for spacing */}
          <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }} 
            required
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>Submit Feedback</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
