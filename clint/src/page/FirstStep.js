import React, { useState, useEffect } from 'react';
import { Card, Button, Image } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const FirstStep = () => {
  const [cartData, setCartData] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('cart')) || [];
    setCartData(localStorageData);

    fetch('http://localhost:1337/api/public')
      .then(response => response.json())
      .then(data => setApiData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const getFilteredData = () => {
    const aggregatedData = {};
    cartData.forEach(([id, amount]) => {
      if (aggregatedData[id]) {
        aggregatedData[id] += amount;
      } else {
        aggregatedData[id] = amount;
      }
    });

    const filteredData = [];
    Object.entries(aggregatedData).forEach(([id, amount]) => {
      const matchingItem = apiData.find(item => item.Id.includes(Number(id)));
      if (matchingItem) {
        filteredData.push({ id, category: matchingItem.Category, amount, picture: matchingItem.Picture });
      }
    });

    return filteredData;
  };

  const removeFromCart = idToRemove => {
    const updatedCartData = cartData.filter(([id, amount]) => id !== idToRemove);
    setCartData(updatedCartData);
    localStorage.setItem('cart', JSON.stringify(updatedCartData));
  };

  const getSumPrice = () => {
    let sum = 0;
    getFilteredData().forEach(item => {
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
        {current === 0 && (
          <div>
            {getFilteredData().map((item, index) => (
              <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', position: 'relative' }}>
                {console.log(item)}
                <div style={{ position: 'absolute', top: '10px', right: '10px', transform: 'scale(1.1)' }}>
                  <Button type="primary" danger onClick={() => removeFromCart(item.id)} icon={<DeleteOutlined />} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ flex: '1', marginRight: '10px' }}>
                    {item.picture === null ? (
                      <Image src='/noimg.png' alt={item.category} />
                    ) : (
                      <Image src={`http://localhost:1337${item.picture.formats.thumbnail.url}`} alt={item.category} />
                    )}
                  </div>
                  <div style={{ flex: '2' }}>
                    <span>{`${item.category} x ${item.amount}`}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <strong>ราคารวม:</strong> {getSumPrice()} บาท
      </div>
    </Card>
  );
};

export default FirstStep;