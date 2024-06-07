import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('')
  const navigate = useNavigate();

        <br />
  const handleInput = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); // Get response data to access the message
      if (!response.ok) {
        throw new Error(data.message || 'Failed to register.');
      }

      console.log('Registration successful', data)
      localStorage.setItem('token', data.token)
      navigate('/')
    } catch (error:any) {
      console.error('Registration failed:', error.message)
      setError(error.message) // Update the error state with the received error message
    }
  };

  return (
    <div className="Create">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="registerEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInput}
            required
          />
        </Form.Group>
        <br />
        <Form.Group controlId="registerPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInput}
            required
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">Register</Button>
        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
      </Form>
    </div>
  );
}

export default Register;
