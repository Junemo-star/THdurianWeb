import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Row, Col, Card, Button, Form, Input, Flex} from 'antd';
const { TextArea } = Input;
const MainContainer = styled.div`
  padding: 0 16px;
`;

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 70px;
  position: relative;
`;

const StepWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const StepStyle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 3px solid ${({ step }) => (step === 'completed' ? '#164b15' : '#eaf3e7')};
  transition: 0.4s ease;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StepCount = styled.span`
  font-size: 19px;
  color: #eaf3e7;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const StepsLabelContainer = styled.div`
  position: absolute;
  top: 66px;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StepLabel = styled.span`
  font-size: 19px;
  color: #1a4b15;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: ${({ isFirstStep }) => (isFirstStep ? 'flex-end' : 'space-between')};
  margin: 0 -15px;
  margin-top: 100px;
`;

const ButtonStyle = styled.button`
  border-radius: 4px;
  border: 0;
  background: #1a4b15;
  color: #ffffff;
  cursor: pointer;
  padding: 8px;
  width: 90px;
  :active {
    transform: scale(0.98);
  }
  :disabled {
    background: #f3e7f3;
    color: #000000;
    cursor: not-allowed;
  }
`;

const CheckMark = styled.div`
  font-size: 26px;
  font-weight: 600;
  color: #green;
  -ms-transform: scaleX(-1) rotate(-46deg); /* IE 9 */
  -webkit-transform: scaleX(-1) rotate(-46deg); /* Chrome, Safari, Opera */
  transform: scaleX(-1) rotate(-46deg);
`;

const steps = [
  {
    label: 'Order',
    step: 1,
  },
  {
    label: 'Payment',
    step: 2,
  },
  {
    label: 'Address',
    step: 3,
  },
  {
    label: 'Summary',
    step: 4,
  },
];

const StatusPage = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [durianTypes, setDurianTypes] = useState([]);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    postalCode: ''
  });
  const [sumPrice, setSumPrice] = useState(0); 
  const token = localStorage.getItem('jwtToken');

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
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    // need to be update soon ex. axios post ...
    console.log('Address submitted:', address);
  };

  return (
    <Card style={{ width: '45%', margin: 'auto', marginTop: '75px', background: '#97dba7'}}>
      <MainContainer>
        <StepContainer>
          {steps.map(({ step, label }) => (
            <StepWrapper key={step}>
              <StepStyle step={activeStep >= step ? 'completed' : 'incomplete'}>
                {activeStep > step ? (
                  <CheckMark>L</CheckMark>
                ) : (
                  <StepCount>{step}</StepCount>
                )}
              </StepStyle>
              <StepsLabelContainer>
                <StepLabel key={step}>{label}</StepLabel>
              </StepsLabelContainer>
            </StepWrapper>
          ))}
        </StepContainer>

        <ButtonsContainer isFirstStep={activeStep === 1}>
          {activeStep !== 1 && (
            <ButtonStyle onClick={prevStep}>Previous</ButtonStyle>
          )}
          {activeStep !== steps.length && (
            <ButtonStyle onClick={nextStep}>Next</ButtonStyle>
          )}
        </ButtonsContainer>

        {activeStep === 2 && (
          <div style={{ marginTop: '50px' }}>
            <h2>Payment Information</h2>
            <Form layout="vertical">
              <Form.Item label="Card Number" name="cardNumber" rules={[{ required: true, message: 'Please input your card number!' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="Expiration Date" name="expireDate" rules={[{ required: true, message: 'Please input expiration date!' }]}>
                <Input />
              </Form.Item>
              <Form.Item label="CCV" name="ccv" rules={[{ required: true, message: 'Please input your CCV!' }]}>
                <Input />
              </Form.Item>
              <Form.Item>
                <ButtonStyle type="primary" htmlType="submit">Submit</ButtonStyle>
              </Form.Item>
            </Form>
          </div>
        )}

{activeStep === 1 && (
  <div>
    {durianTypes.map((durian, index) => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const categoryAmount = cart.reduce((total, item) => {
        const [itemId, amount] = item;
        return durian.Id.includes(parseInt(itemId)) ? total + amount : total;
      }, 0);
      
      return (
        <Row key={index} style={{ marginTop: '15px' }}>
           <Col span={4} style={{ backgroundColor: 'lightblue', padding: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px' }}>
            {durian.Picture && ( 
              <img src={"http://localhost:1337" + durian.Picture.formats.thumbnail.url} alt="Durian" style={{ maxWidth: '85px', height: 'auto' }} />
            )}
          </Col>
          <Col span={20} style={{ backgroundColor: '#ADEDA0', padding: '10px', borderRadius: '10px', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ margin: 0 }}>{durian.Category} x {categoryAmount}</p>
            </Col>
        </Row>
      );
    })}
    <Row style={{ marginTop: '20px' }}>
      <Col span={24} style={{ backgroundColor: 'White', padding: '10px', borderRadius: '10px', border: '1px solid #ccc', textAlign: 'center' }}>
        Price: ฿{sumPrice}
      </Col>
    </Row>
  </div>
)}

{activeStep === 3 && (
  <div style={{ marginTop: '50px' }}>
    <h2>Address Information</h2>
    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
      <div style={{ marginBottom: '20px' }} />
      <TextArea
        placeholder="Type your Address Information"
        autoSize={{ minRows: 3, maxRows: 5 }}
        value={address.postalCode}
        onChange={(e) => handleAddressChange({ target: { name: 'postalCode', value: e.target.value } })}
      />
    </div>
    <Form layout="vertical" onFinish={handleAddressSubmit}>
      <Form.Item>
        <ButtonStyle type="primary" htmlType="submit">Submit</ButtonStyle>
      </Form.Item>
    </Form>
  </div>
)}

{activeStep === 4 && (
  <Flex vertical gap="small" style={{ width: '100%', marginTop: '50px' }}>
    <Button type="primary" block style={{ backgroundColor: 'darkgreen', borderColor: 'green' }}>
      Proceed
    </Button>
  </Flex>
)}

      </MainContainer>
    </Card>
  );
};

export default StatusPage;
