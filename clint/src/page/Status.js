import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/statuspage.css';

function StatusPage() {
  const [status, setStatus] = useState(0);
  const [durianTypes, setDurianTypes] = useState([]);
  const token = localStorage.getItem('jwtToken');

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:1337/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        const { username } = response.data;
        if (status === 0) {
          fetchDurianTypes(token, username);
        } else {
          setDurianTypes([]);
        }
      })
      .catch(error => {
        console.error('Error fetching user information:', error);
      });
    } else {
      console.log('JWT token not found.');
    }
  }, [status, token]);
  

  const fetchDurianTypes = async (token, username) => {
    try {
      const response = await axios.get('http://localhost:1337/api/placed-orders?populate=*', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.status === 200) {
        const data = response.data;
        const userOrders = data.data.filter(item => item.attributes.owner.data.attributes.username === username);
        const durianTypeList = userOrders.map(item => item.attributes.product.data.attributes.durianType);
        setDurianTypes(durianTypeList);
      } else {
        console.error('Error fetching durian types:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching durian types:', error);
    }
  };
  

  return (
    <div className="App">
      <h1>Status Bar</h1>
      <div className="status-bar">
        <div className={`status ${status >= 0 ? 'active' : ''}`} onClick={() => handleStatusChange(0)}>Status 1</div>
        <div className={`status ${status >= 1 ? 'active' : ''}`} onClick={() => handleStatusChange(1)}>Status 2</div>
        <div className={`status ${status >= 2 ? 'active' : ''}`} onClick={() => handleStatusChange(2)}>Status 3</div>
        <div className={`status ${status >= 3 ? 'active' : ''}`} onClick={() => handleStatusChange(3)}>Status 4</div>
      </div>
      {status === 0 && (
        <div>
          <h2>Durian Types</h2>
          <ul>
            {durianTypes.map((type, index) => (
              <li key={index}>{type}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default StatusPage;
