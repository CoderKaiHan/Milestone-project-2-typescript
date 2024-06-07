import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth() // destructure the login function from our imported useAuth

  const handleInput = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json()
        console.log('Login successful', data)
        login(data.token) // calling the login function from context to update the auth state
        navigate('/')
      } else {
        const data = await response.json()
        setError(data.message)
        console.error('Login failed')
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.')
      console.error('An error occurred:', error)
    }
  }
  

  return (
    <div className="create">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
        <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInput}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInput}
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">Submit</Button>
        {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        <div style={{paddingTop:'25px'}}>
        Haven't registered yet? You can <a href="/Register">register here.</a>
      </div>
      </Form>
    </div>
  );
}

export default Login;