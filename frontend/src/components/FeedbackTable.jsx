import React, { useState, useEffect } from 'react';
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

  return (
    <div style={{ margin: '0 auto', maxWidth: '800px', padding: '20px',position: 'relative', left: '30vw' }}>
      <h2>Feedback Entries</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {feedbackEntries.map((entry) => (
            <div key={entry._id} style={{ border: '5px solid #ccc', borderRadius: '5px', padding: '20px' }}>
              <p><strong>Message:</strong> {editingId === entry._id ? (
                <input type="text" value={editMessage} onChange={(e) => setEditMessage(e.target.value)} />
              ) : (
                entry.message
              )}</p>
              <p><strong>Date:</strong> {new Date(entry.createdAt).toLocaleDateString()}</p>
              <div>
                {editingId === entry._id ? (
                  <button style={{ marginRight: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 12px', cursor: 'pointer' }} onClick={() => handleUpdateFeedback(entry._id)}>Save</button>
                ) : (
                  <>
                    {/* <button style={{ marginRight: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 12px', cursor: 'pointer' }} onClick={() => setEditingId(entry._id)}>Edit</button> */}
                    <button style={{ marginRight: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 12px', cursor: 'pointer' }} onClick={() => {setEditingId(entry._id); setEditMessage(entry.message);}}>Edit</button>
                    <button style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', padding: '8px 12px', cursor: 'pointer' }} onClick={() => handleDeleteFeedback(entry._id)}>Delete</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackTable;
