import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate,Link } from 'react-router-dom';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/customSignupStyles.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleCurrentLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Do something with the latitude and longitude values
          setLocation(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        (error) => {
          console.log("Error occurred while fetching current location:", error);
          // Handle error while getting the current location
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
      // Handle the case when geolocation is not supported
    }
  };
    

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          location: location
        })
      });
  
      const res = await response.json();
  
      if (response.ok) {
        // Handle successful signup
        console.log("User created successfully!");
        navigate('/login');
        // Perform any additional actions or redirects upon successful signup
      } else {
        // Handle error response
        alert('Enter Valid Credentials')
        console.log("Failed to create user.");
        // Perform any error handling or display error messages to the user
      }
    } catch (error) {
      // Handle network or fetch error
      console.log("Error occurred:", error);
      // Perform any error handling or display error messages to the user
    }
  };


  const handleHome = ()=>{
    navigate('/');
  }



  return (
    <div className="signup-container">
      <div className="background-images" />

      <Container className="signup-form">
        <h1 className="form-heading">Sign Up</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={handleNameChange}
              style={{ fontSize: '18px' }}
            />
          </Form.Group>

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

          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={handleLocationChange}
              style={{ fontSize: '18px' }}
            />
          </Form.Group>

          {/* <Button
            variant="primary"
            type="button"
            onClick={handleCurrentLocationClick}
            className="current-location-button"
          >
            Current Location
          </Button> */}

          <Button variant="primary" type="submit" className="signup-button">
            Sign up
          </Button>

          <Link to="/login" className="login-link">
            Already a user? Login
          </Link>
          <Button variant="primary" type="submit" className="signup-button" onClick={handleHome}>
            Home
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Signup;
