import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; // Import axios for mocking
import RegisterPc from '../page/Register/RegisterPc';
import { BrowserRouter as Router } from 'react-router-dom'; 

jest.mock('axios'); // Mock axios

describe('RegisterPc Component', () => {
  test('renders RegisterPc component', () => {
    render(<Router><RegisterPc /></Router>);

    // Ensure that all input fields are rendered
    expect(screen.getByPlaceholderText('username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('confirm password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('example@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('firstname')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('lastname')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('location')).toBeInTheDocument();

    // Ensure that buttons are rendered
    expect(screen.getByText('ยืนยันการสมัคร')).toBeInTheDocument();
    expect(screen.getByText('ย้อนกลับ')).toBeInTheDocument();
  });

  test('submitting the form with valid data', async () => {
    axios.post.mockResolvedValueOnce({ data: { success: true } }); // Mock successful API response

    render(<Router><RegisterPc /></Router>);

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('password'), { target: { value: 'testpassword' } });
    fireEvent.change(screen.getByPlaceholderText('confirm password'), { target: { value: 'testpassword' } });
    fireEvent.change(screen.getByPlaceholderText('example@email.com'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('firstname'), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText('lastname'), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText('location'), { target: { value: 'New York' } });

    // Submit the form
    fireEvent.click(screen.getByText('ยืนยันการสมัคร'));

    // Wait for the form submission to complete
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
        username: 'testuser',
        password: 'testpassword',
        email: 'test@example.com',
        firstname: 'John',
        surname: 'Doe',
        location: 'New York',
        role: 3,
        confirmed: true,
        blocked: false,
      });
    });

    // Ensure that the user is redirected after successful registration
    expect(window.location.pathname).toBe('/Login');
  });

  // Add more test cases as needed for other scenarios
});
