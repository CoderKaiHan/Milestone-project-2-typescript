import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import temp_logo from '../assets/paper-airplane.png'
import LogoutButton from './LogoutButton';
import { useAuth, AuthContextType } from './AuthContext';
import React from 'react';

const Navigation = () => {

    const navCollapStyle = {
      backgroundColor: '#f8f9fa',
      margin: '0',
      width: '100%'
    }

    // const { isAuthenticated, logout }:AuthContextType = useAuth()

    // Destructure isAuthenticated and logout, and specify their types using AuthContextType
    const authData: AuthContextType | undefined = useAuth();

    // Check if authData is defined before destructuring its properties
    if (!authData) {
      // Handle the case where useAuth() returns undefined
      // For example, you can return null or display a loading spinner
      return null; // or <LoadingSpinner />
    }
  
    // Now you can safely destructure isAuthenticated and logout
    const { isAuthenticated, logout } = authData;
 

    return (
        <div className='navbar-container'>
          <Navbar expand="lg" className="bg-body-tertiary" fixed='top' style={{height:'10%', display:'flex', alignContent:'center', justifyContent:'space-evenly'}}>
            <Container>
              {/* <Navbar.Brand href="/">
                <img src={temp_logo} alt='logo' className="navbar-logo" style={{height:'85px', width:'170px'}}/>
              </Navbar.Brand> */}
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" style={navCollapStyle}>
                <Nav className="me-auto">
                  <Navbar.Brand href="/">
                  <img src={temp_logo} alt='logo' className="navbar-logo" style={{height:'75px', width:'170px'}}/>
                  </Navbar.Brand>
                  <Nav.Link href="/">Home</Nav.Link>
                  {/* <NavDropdown title="Inspirations" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/inspiration/category_1">Category 1</NavDropdown.Item>
                    <NavDropdown.Item href="/inspiration/category_2">
                    Category 2
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/inspiration/category_3">Category 3</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/inspiration/category_all">
                    Category all
                    </NavDropdown.Item>
                  </NavDropdown> */}
                  <Nav.Link href="/escapes">Browse Escapes</Nav.Link>  
                  <Nav.Link href="/my_escapes">View My Escapes</Nav.Link> 
                  <Nav.Link href="/my_new_escapes">Make My Escapes</Nav.Link> 
                  {isAuthenticated ? (
                    <LogoutButton /> // Render the LogoutButton if the user is logged in
                  ) : (
                    <Nav.Link href="/login">Login</Nav.Link> // Otherwise, show the login link
                  )}             
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
    );
}

export default Navigation;
