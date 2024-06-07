import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useAuth } from './AuthContext';

// Now using AuthContext to manage state for login/logout

function LogoutButton() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  };

  // Need to figure out how to get rid of button background
  return (
    <Button variant="secondary" onClick={handleLogout}>Log Out</Button>
  );
}

export default LogoutButton;