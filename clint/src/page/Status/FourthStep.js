import React, { useEffect } from 'react';
import { Card, Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import axios from 'axios';

const FourthStep = () => {
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const response = await axios.get('http://localhost:1337/api/users/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log('User location data:', response.data);
        } else {
          console.error('JWT token not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };

    fetchLocationData();
  }, []);

  const handleContinue = async () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart'));
      const token = localStorage.getItem('token');
      
      if (!cart || !Array.isArray(cart) || cart.length === 0) {
        console.error('Cart is empty or invalid');
        return;
      }
      
      const orders = cart.map(([categoryId, amount]) => {
        const product = {
          CategoryID: categoryId,
          Date: null,
          Amount: amount,
          Price: null,
          Location: null,
          FarmPostNewID: null, //Id of farm post new
          PaymentPictureID: 12 //Id of uploaded payment picture
        };
        return product;
      });
      
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const productsResponse = await axios.get('http://localhost:1337/api/public', config);
      const productsData = productsResponse.data;
      
      orders.forEach(order => {
        const product = productsData.find(product => product.Id.includes(order.CategoryID));
        if (product) {
          order.Price = product.Price * order.Amount;
        }
      });

      const userResponse = await axios.get('http://localhost:1337/api/users/me', config);
      const userLocation = userResponse.data.location;

      orders.forEach(order => {
        order.Location = userLocation;
      });

      const postResponses = await Promise.all(orders.map(order =>
        axios.post('http://localhost:1337/api/placed-orders', order, config)
      ));

      console.log('Orders placed successfully:', postResponses.map(res => res.data));
      
      // Clear cart after successful order placement
      localStorage.removeItem('cart');
      
    } catch (error) {
      console.error('Error placing orders:', error);
    }
  };

  return (
    <Card title="Success" style={{ width: '100%', height: '100%', textAlign: 'center' }}>
      <CheckCircleFilled style={{ fontSize: '64px', color: '#52c41a' }} />
      <p style={{ marginTop: '10px', fontSize: '24px', fontWeight: 'bold' }}>ทำการสั่งซื้อสำเร็จ</p>
      <Button type="primary" style={{ marginTop: '20px' }} onClick={handleContinue}>ดำเนินการต่อ</Button>
    </Card>
  );
};

export default FourthStep;
