import React, { useState } from 'react';
import { Button, Card, Steps, message, theme, Grid, Col, Row } from 'antd';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import FourthStep from './FourthStep';
import Footers from '../componet/Footerbar';
import useWindowWidth from '../componet/Check_size';
import NavbarHead from '../componet/Navbar';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const steps = [
  {
    title: 'Order',
    content: <FirstStep />
  },
  {
    title: 'Payment',
    content: <SecondStep />
  },
  {
    title: 'Address',
    content: <ThirdStep />
  },
  {
    title: 'Summary',
    content: <FourthStep />
  },
];

const StatusPage = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [showChatbox, setShowChatbox] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const windowWidth = useWindowWidth();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const toggleChatbox = () => {
    setShowChatbox(!showChatbox);
  };

  const selectTopic = (topic) => {
    setSelectedTopic(topic);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <div>
      {windowWidth > 450 && <NavbarHead />}
      <Card style={{ marginBottom: windowWidth < 450 ? "100px" : "10px" }}>
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </Card>

      {windowWidth < 450 && <Footers />}

      {/* Float Button */}
      <FloatButton icon={<QuestionCircleOutlined />} type="default" style={{ right: 20, bottom: 20 }} onClick={toggleChatbox} />

      {/* Chatbox */}
      {showChatbox && (
  <Card style={{ position: 'fixed', bottom: 100, right: 20, backgroundColor: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
    {/* FAQ Header */}
    <h3 style={{ textAlign: 'center', borderBottom: '1px solid #ccc', paddingBottom: 10 }}>FAQ:</h3>
    
    {/* FAQ Content */}
    <Row justify="space-around">
  <Col span={8}>
    <Button onClick={() => selectTopic('ขั้นตอนการใช้งาน')} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>ขั้นตอนการใช้งาน</Button>
  </Col>
  <Col span={8}>
    <Button onClick={() => selectTopic('ข้อควรระวัง')} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>ข้อควรระวัง</Button>
  </Col>
  <Col span={8}>
    <Button onClick={() => selectTopic('ช่องทางการติดต่อ')} style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>ช่องทางการติดต่อ</Button>
  </Col>
</Row>

    {/* Replies */}
    {selectedTopic && (
      <div style={{ marginTop: 16, border: '1px solid #ccc', padding: 10, borderRadius: 8 }}>
        {selectedTopic === 'ขั้นตอนการใช้งาน' && (
          <>
            <p>1. ทำการเลือกสินค้าลงตะกร้า</p>
            <p>2. กดที่ cart เพื่อทำการชำระเงิน</p>
            <p>3. ชำระเงินและส่งหลักฐานการโอนเงิน</p>
            <p>4. ทำการกดปุ่ม "ดำเนินการต่อ"</p>
            <p>5. เสร็จสิ้นการสั่งซื้อ</p>
          </>
        )}
        {selectedTopic === 'ข้อควรระวัง' && (
          <>
            <p>1. ส่งหลักฐานยืนยันการโอนเงินทุกครั้ง</p>
            <p>2. ตรวจสอบบัญชีที่ทำการโอนเงิน</p>
            <p>3. ตรวจสอบจำนวนเงินที่โอน</p>
          </>
        )}
        {selectedTopic === 'ช่องทางการติดต่อ' && (
          <>
            <p>Email : group10@email.com</p>
            <p>Tel Number : 123-456-7890</p>
            <p>Line ID: @group10</p>
          </>
        )}
      </div>
    )}
  </Card>
)}

    </div>
  );
};

export default StatusPage;
