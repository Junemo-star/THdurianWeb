import React, { useState, useEffect } from 'react';
import { Card, Button, Image } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const FirstStep = () => {
  const [cartData, setCartData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('cart')) || [];
    setCartData(localStorageData);

    fetch('http://localhost:1337/api/public')
      .then(response => response.json())
      .then(data => setApiData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const aggregatedData = {};
      cartData.forEach(([id, amount]) => {
        if (aggregatedData[id]) {
          aggregatedData[id] += amount;
        } else {
          aggregatedData[id] = amount;
        }
      });

      const dataPromises = Object.entries(aggregatedData).map(([id, amount]) => {
        const matchingItem = apiData.find(item => item.Id.includes(Number(id)));
        if (matchingItem) {
          return fetch(`http://localhost:1337/api/farm-post-news/${id}`)
            .then(response => response.json())
            .then(dateData => {
              const date = new Date(dateData?.data?.attributes?.date);
              const formattedDate = date.toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
              return {
                id,
                category: matchingItem.Category,
                amount,
                picture: matchingItem.Picture,
                date: formattedDate
              };
            })
            .catch(error => console.error(`Error fetching date for item with ID ${id}:`, error));
        } else {
          return Promise.resolve(null);
        }
      });

      Promise.all(dataPromises)
        .then(results => {
          const validResults = results.filter(result => result !== null);
          setFilteredData(validResults);
        });
    };

    if (apiData.length > 0 && cartData.length > 0) {
      fetchData();
    }
  }, [apiData, cartData]);

  const removeFromCart = idToRemove => {
    const updatedCartData = cartData.filter(([id, amount]) => id !== idToRemove);
    setCartData(updatedCartData);
    localStorage.setItem('cart', JSON.stringify(updatedCartData));
  };

  const getSumPrice = () => {
    let sum = 0;
    filteredData.forEach(item => {
      const matchingItem = apiData.find(apiItem => apiItem.Id.includes(Number(item.id)));
      if (matchingItem) {
        sum += matchingItem.Price * item.amount;
      }
    });
    return sum;
  };

  return (
    <Card title="รายการที่สั่งซื้อ">
      <div>
        {filteredData.map((item, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '10px', right: '10px', transform: 'scale(1.1)' }}>
              <Button type="primary" danger onClick={() => removeFromCart(item.id)} icon={<DeleteOutlined />} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flex: '1', marginRight: '10px' }}>
                <Image src={`http://localhost:1337${item.picture.formats.thumbnail.url}`} alt={item.category} />
              </div>
              <div style={{ flex: '2' }}>
                <div>{`${item.category} x ${item.amount}`}</div>
                <div style={{ opacity: 0.61 }}>{item.date}</div> 
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <strong>ราคารวม:</strong> {getSumPrice()} บาท
      </div>
    </Card>
  );
};

export default FirstStep;
