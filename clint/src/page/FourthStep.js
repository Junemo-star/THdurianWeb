import React from 'react';
import { Card, Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


const FourthStep = () => {
  const navigate = useNavigate()

  const finish = () => {
    navigate("/")
  }

  return (
    <Card title="Success" style={{ width: '100%', height: '100%', textAlign: 'center' }}>
      <CheckCircleFilled style={{ fontSize: '64px', color: '#52c41a' }} />
      <p style={{ marginTop: '10px', fontSize: '24px', fontWeight: 'bold' }}>ทำการสั่งซื้อสำเร็จ</p>
      <Button type="primary" style={{ marginTop: '20px' }} onClick={() => finish()}>ดำเนินการต่อ</Button>
    </Card>
  );
};

export default FourthStep;