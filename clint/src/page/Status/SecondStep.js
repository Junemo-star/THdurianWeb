import React, { useState } from 'react';
import { Card, Button, Upload, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Urlconfig from '../../config';

const { Text } = Typography;

const SecondStep = () => {
  const head = Urlconfig.serverUrlPrefix;
  const [file, setFile] = useState(null);

  const handleUpload = info => {
    console.log(info.file);
    setFile(info.file);
  };

  const handleSubmit = async () => {
    // Check if file exists
    if (!file) {
      console.error("No file selected for upload");
      return;
    }

    try {
      // Generate random key for file name
      const randomKey = generateRandomKey() + getFileExtension(file.name);
      const fileName = randomKey;
      const fileWithKey = new File([file], fileName, { type: file.type });

      // Save key to localStorage
      localStorage.setItem('keyPic', randomKey);

      const form = new FormData();
      form.append('files', fileWithKey);

      const response = await fetch(head+'/api/upload', {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        console.log('File uploaded successfully!');
      } else {
        console.error('Error uploading file:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading file:', error);

    }
  };

  // Function to generate a random key
  const generateRandomKey = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const getFileExtension = fileName => {
    return '.' + fileName.split('.').pop();
  };

  return (
    <Card title="ช่องทางการชำระเงิน" style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', padding: '10px', display: 'flex', alignItems: 'center' }}>
      <img src="https://www.kasikornbank.com/SiteCollectionDocuments/about/img/logo/logo.png" alt="1" style={{ width: '50px', marginRight: '10px', border: '1px solid #ccc' }} />
        <div style={{ flex: '1', textAlign: 'center' }}>
          <p style={{ fontWeight: 'bold' }}>ธนาคารกสิกรไทย</p>
          <p>ชื่อบัญชี : กลุ่ม 10</p>
          <p>เลขบัญชี : 1234567890</p>
        </div>
      </div>
      <div style={{ borderBottom: '1px solid #ccc', padding: '10px', display: 'flex', alignItems: 'center' }}>
      <img src="https://i.pinimg.com/736x/02/31/87/023187a2f2dc47bbdc809b43c7667b3a.jpg" alt="2" style={{ width: '50px', marginRight: '10px', border: '1px solid #ccc' }} />
        <div style={{ flex: '1', textAlign: 'center' }}>
          <p style={{ fontWeight: 'bold' }}>ธนาคารไทยพาณิชย์</p>
          <p>ชื่อบัญชี : กลุ่ม 10</p>
          <p>เลขบัญชี : 1234567890</p>
        </div>
      </div>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Text type="danger">*ส่งหลักฐานการชำระสินค้า*</Text>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
          <Upload beforeUpload={() => false} onChange={handleUpload}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </div>
        <div style={{marginTop:'20px'}}>
          <Button type="primary" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </Card>
  );
};

export default SecondStep;
