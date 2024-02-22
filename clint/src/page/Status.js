import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Card } from 'antd';

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
  const token = localStorage.getItem('jwtToken');
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:1337/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const { username } = response.data;
          setUsername(username);
        })
        .catch((error) => {
          console.error('Error fetching user information:', error);
        });
    } else {
      console.log('JWT token not found.');
    }
  }, [token]);

  useEffect(() => {
    if (token && username) {
      fetchDurianTypes(token, username);
    }
  }, [token, username]);

  const fetchDurianTypes = async (token, username) => {
    try {
      const response = await axios.get(
        'http://localhost:1337/api/placed-orders?populate=*',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        const userOrders = data.data.filter(
          (item) => item.attributes.owner.data.attributes.username === username
        );
        const durianTypeList = userOrders.map(
          (item) => item.attributes.product.data.attributes.durianType
        );
        setDurianTypes(durianTypeList);
      } else {
        console.error('Error fetching durian types:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching durian types:', error);
    }
  };

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
            <form>
              <label htmlFor="cardNumber">Card Number:</label>
              <input type="text" id="cardNumber" name="cardNumber" required />
              <br />
              <label htmlFor="expireDate">Expiration Date:</label>
              <input type="text" id="expireDate" name="expireDate" required />
              <br />
              <label htmlFor="ccv">CCV:</label>
              <input type="text" id="ccv" name="ccv" required />
              <br />
              <ButtonStyle type="submit">Summit</ButtonStyle>
            </form>
          </div>
        )}

        {activeStep === 1 && (
          <div style={{ marginTop: '50px' }}>
            <h2>Durian Types</h2>
            <ul>
              {durianTypes.map((type, index) => (
                <li key={index}>{type}</li>
              ))}
            </ul>
          </div>
        )}

        {activeStep === 3 && (
          <div style={{ marginTop: '50px' }}>
            <h2>Address Information</h2>
            <form onSubmit={handleAddressSubmit}>
              <label htmlFor="street">Street:</label>
              <input type="text" id="street" name="street" value={address.street} onChange={handleAddressChange} required />
              <br />
              <label htmlFor="city">City:</label>
              <input type="text" id="city" name="city" value={address.city} onChange={handleAddressChange} required />
              <br />
              <label htmlFor="postalCode">Postal Code:</label>
              <input type="text" id="postalCode" name="postalCode" value={address.postalCode} onChange={handleAddressChange} required />
              <br />
              <ButtonStyle type="submit">Submit</ButtonStyle>
            </form>
          </div>
        )}
      </MainContainer>
    </Card>
  );
};

export default StatusPage;
