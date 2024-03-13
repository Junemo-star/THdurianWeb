import React from 'react';
import { render, screen } from '@testing-library/react';
import DeliveryPc from '../page/Delivery/DeliveryPC';
import { AuthProvider } from '../componet/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom'; 

describe('DeliveryPc', () => {
  test('renders correctly', async () => {
    // Mocking the axios get function
    jest.mock('axios');
    const axios = require('axios');
    axios.get.mockResolvedValue({ data: [] });

    render(<AuthProvider><Router><DeliveryPc /></Router></AuthProvider>);

    // Check if the component renders correctly
    expect(screen.getByText('สถานะการจัดส่ง')).toBeInTheDocument();
  });

  // Add more tests as needed for different functionalities of the component
});
