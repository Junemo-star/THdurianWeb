import React, { useState, useEffect } from 'react';
import { Card, Input, Cascader, Button } from 'antd';
import axios from 'axios';
import Urlconfig from '..config';

const head = Urlconfig.serverUrlPrefix;
const { TextArea } = Input;

const ThirdStep = () => {
  const [value, setValue] = useState('');
  const [locationOptions, setLocationOptions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      fetchLocationData(token);
    } else {
      console.error('JWT token not found in localStorage');
    }
  }, []);

  const fetchLocationData = async (token) => {
    try {
      const response = await axios.get(head+'/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      const location = data.location;
      setLocationOptions([{ label: location, value: location }]);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  const handleCascaderChange = (value) => {
    setSelectedLocation(value[0]);
    setValue(value[0]); 
  };

  const handleSubmit = () => {
  };

  return (
    <Card title="ที่อยู่สำหรับจัดส่งสินค้า" style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="ที่อยู่ของคุณ"
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
      <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
        <Cascader
          options={locationOptions}
          placeholder="เลือกที่อยู่"
          onChange={handleCascaderChange}
        />
        <Button type="primary" onClick={handleSubmit} style={{ marginLeft: '10px' }}>Submit</Button>
      </div>
    </Card>
  );
};

export default ThirdStep;