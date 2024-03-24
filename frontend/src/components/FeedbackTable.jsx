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
      return; // If user cancels, do nothing
    }

    try {
      await axios.delete(`api/v1/feedback/feedback/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      // Remove the deleted feedback entry from the state
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
      // Update the feedback entry in the state
      setFeedbackEntries(feedbackEntries.map(entry => {
        if (entry._id === id) {
          return { ...entry, message: editMessage };
        }
        return entry;
      }));
      // Clear the editing state
      setEditingId(null);
      setEditMessage('');
    } catch (error) {
      console.error('Error updating feedback:', error.response.data);
    }
  };

  return (
    <div style={{ margin: '0 auto', maxWidth: '800px', padding: '20px' }}>
      <h2>Feedback Entries</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Message</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbackEntries.map((entry) => (
              <tr key={entry._id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {editingId === entry._id ? (
                    <input type="text" value={editMessage} onChange={(e) => setEditMessage(e.target.value)} />
                  ) : (
                    entry.message
                  )}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{new Date(entry.createdAt).toLocaleDateString()}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {editingId === entry._id ? (
                    <button onClick={() => handleUpdateFeedback(entry._id)}>Save</button>
                  ) : (
                    <>
                      <button onClick={() => setEditingId(entry._id)}>Edit</button>
                      <button onClick={() => handleDeleteFeedback(entry._id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FeedbackTable;
