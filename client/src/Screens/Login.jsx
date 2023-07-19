import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/customLoginStyles.css';

const Login= () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = (e) =>{
    navigate('/createuser');
  };

    

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Successful login
        console.log('Login successful');
        // Redirect to the home page
        navigate('/');
        localStorage.setItem('userEmail',email);
        localStorage.setItem("authToken",data.authToken);
        console.log(localStorage.getItem("authToken"));
      } else {
        // Handle unsuccessful login, display error message, etc.
        alert('Enter Valid Credentials!')
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      // Handle any error that occurred during the login request
    }
  };

  const handleHome = ()=>{
    navigate('/');
  }

  return (
    <div className="login-container">
      <div className="background-images" />

      <Container className="login-form">
        <h1 className="form-heading">Login</h1>
        <Form onSubmit={handleLogin}>

          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              style={{ fontSize: '18px' }}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              style={{ fontSize: '18px' }}
            />
          </Form.Group>


          <Button variant="primary" type="submit" className="login-button" >
            Login
          </Button>

          <Link to="/createuser" className="login-link" onClick={handleRegister}>
            Not Registered? Sign Up
          </Link>
          <Button variant="primary" type="submit" className="signup-button" onClick={handleHome}>
            Home
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
