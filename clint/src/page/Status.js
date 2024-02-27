import React, { useState } from 'react';
import { Button, Card, Steps, message, theme } from 'antd';
import FirstStep from './FirstStep';
import SecondStep from './SecondStep';
import ThirdStep from './ThirdStep';
import FourthStep from './FourthStep';

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

const StatusPage: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

<<<<<<< HEAD
  useEffect(() => {
    if (token && activeStep === 1) {
      axios.get('http://localhost:1337/api/public')
        .then(response => {
          const data = response.data;
          const cart = JSON.parse(localStorage.getItem('cart')) || [];
          console.log(cart)
          const ids = cart.map(item => item[0]);
          console.log(ids)
          const totalPrice = cart.reduce((total, item) => {
            const [id, amount] = item;
            const foundItem = data.find(durian => durian.Id.includes(parseInt(id)));
            if (foundItem && foundItem.Price) {
              return total + (foundItem.Price * amount);
            }
            return total;
          }, 0);
          setSumPrice(totalPrice);
          const filteredData = data.filter(item => {
            return item.Id.some(id => ids.includes(id.toString()));
          });
          setDurianTypes(filteredData);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [token, activeStep]);
  
  

  const nextStep = () => {
    setActiveStep(activeStep + 1);
=======
  const next = () => {
    setCurrent(current + 1);
>>>>>>> 150313f2a32a13e9235f75fc2e59a7de9eac3133
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <Card title="Cart">
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
  );
};

export default StatusPage;