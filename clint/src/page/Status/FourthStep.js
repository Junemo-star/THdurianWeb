import React, { useEffect } from 'react';
import { Card, Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate hooks
import useWindowWidth from '../../componet/Check_size';
import Urlconfig from '../../config';

const FourthStep = () => {
  const head = Urlconfig.serverUrlPrefix;
  const navigate = useNavigate(); // Initialize useNavigate hook
  const windowWidth = useWindowWidth();

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const response = await axios.get(head+'/api/users/me', {
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
      const token = localStorage.getItem('jwtToken');
    
      if (!cart || !Array.isArray(cart) || cart.length === 0) {
        console.error('Cart is empty or invalid');
        return;
      }
    
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
    
      const productsResponse = await axios.get(head+'/api/public', config);
      const productsData = productsResponse.data;
    
      const userResponse = await axios.get(head+'/api/users/me', config);
      const userLocation = userResponse.data.location;
    
      const orders = cart.map(([id, amount]) => {
        const product = productsData.find(product => product.Id.includes(parseInt(id)));
        const categoryID = product ? product.CategoryID : null;
        const price = product ? product.Price * amount : 0;
        return {
          CategoryID: categoryID,
          Date: null,
          Amount: amount,
          Price: price,
          Location: userLocation,
          FarmPostNewID: parseInt(id),
          PaymentPictureID: null //Id of uploaded payment picture
        };
      });
  
      await Promise.all(orders.map(async order => {
        try {
          const farmPostResponse = await axios.get(head+`/api/farm-post-news/${order.FarmPostNewID}`, config);
          const farmPostData = farmPostResponse.data.data;
      
          // Deduct the ordered amount
          const updatedAmount = farmPostData.attributes.amount - order.Amount;
      
          // Prepare the updated data
          const updatedData = {
            data: {
              id: farmPostData.id,
              attributes: {
                ...farmPostData.attributes,
                amount: updatedAmount
              }
            }
          };
      
          // Send a PUT request to update the farm-post-news
          await axios.put(head+`/api/farm-post-news/${order.FarmPostNewID}`, updatedData, config);
        } catch (error) {
          console.error(`Error updating farm-post-news with ID ${order.FarmPostNewID}:`, error);
        }
      }));
    
      const postResponses = await Promise.all(orders.map(order =>
        axios.post(head+'/api/placed-orders', order, config)
      ));
    
      console.log('Orders placed successfully:', postResponses.map(res => res.data));
    
      // Clear cart
      localStorage.removeItem('cart');
      
      if (windowWidth > 450){
        window.location.reload()
        navigate('/Deliverys');
      } else {
        navigate('/Delivery');
        window.location.reload()
      }
    
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
