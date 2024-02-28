import React, { useState } from 'react';
import { Button, Card, Steps, message, theme } from 'antd';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import FourthStep from './FourthStep';
import Footers from '../componet/Footerbar';
import useWindowWidth from '../componet/Check_size';
import NavbarHead from '../componet/Navbar';

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
  const windowWidth = useWindowWidth();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
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
    <div >
    {windowWidth > 450 && <NavbarHead />}
      <Card style={{marginBottom: ( windowWidth < 450 ) ? "100px" : "10px"}}>
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
    </div>
  );
};

export default StatusPage;