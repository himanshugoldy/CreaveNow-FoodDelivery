import React, { useEffect, useState } from 'react';
import { Row, Col} from 'react-bootstrap';
import Header from '../components/Header';
import CarouselComponent from '../components/CarouselComponent';
import CardComponent from '../components/CardComponent';
import Cart from './Cart';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Navbar from 'react-bootstrap/Navbar';
import customNavbarStyles from '../styles/customNavbarStyles';
import Modal from "../Modal.js";
import "../styles/customNavbar.css";
import { useCart } from '../components/ContextReducer';
import Footer from '../components/Footer';

const Home = () => {

  let data = useCart();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Pass the searchValue to the parent component (App.js) using the onSearchSubmit prop
    // onSearchSubmit(searchValue);
    console.log(searchValue);
  };
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      setFoodItem(data[0]);
      setFoodCat(data[1]);

      // console.log(data[0], data[1]);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }

  useEffect(() => {
    loadData();
  }, [])
  const token = localStorage.getItem("authToken");
  // console.log(token);

  const handleLogout = ()=>{
    localStorage.removeItem("authToken");
    navigate('/');
  }

  const [cartView,setCartView] = useState(false);



  return (
    <div>
      <div>
          <Navbar expand="lg" className="bg-body-tertiary" style={customNavbarStyles.header}>
            <Container fluid style={{ backgroundColor: 'yellowgreen' }}>
              <Navbar.Brand as={Link} to="/" style={customNavbarStyles.brand}>
                CraveNow
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto my-2 my-lg-0 custom-nav" style={{ maxHeight: '120px' }} navbarScroll>
                  {/* <Nav.Link as={Link} to="/" style={customNavbarStyles.link}>
                    Home
                  </Nav.Link> */}
                  {/* <Nav.Link as={Link} to="/login" style={customNavbarStyles.link}>
                    Log In
                  </Nav.Link>
                  <Nav.Link as={Link} to="/createuser" style={customNavbarStyles.link}>
                    Sign Up
                  </Nav.Link> */}
                  {
                    !token?
                    <div>
                      <Button as={Link} to="/" style={customNavbarStyles.btn} className="custom-navbar-btn">
                        Home
                      </Button>
                      <Button as={Link} to="/login" style={customNavbarStyles.btn} className="custom-navbar-btn">
                        Log In
                      </Button>
                      <Button as={Link} to="/createuser" style={customNavbarStyles.btn} className="custom-navbar-btn">
                        Sign Up
                      </Button>
                    </div>:
                    <div>
                      <Button as={Link} to="/" style={customNavbarStyles.btn} className="custom-navbar-btn">
                        Home
                      </Button>
                      <Button  style={customNavbarStyles.btn} className="btnCart" onClick={()=>{setCartView(true)}}>
                        My Cart{" "}
                        <Badge pill bg="danger"> {data.length} </Badge>
                      </Button>
                      {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                      <Button style={customNavbarStyles.btn} className='btnLogout' onClick={handleLogout}>
                        LogOut
                      </Button>
                      <Button as={Link} to="/myorderData" style={customNavbarStyles.btn} className="custom-navbar-btn">
                        My Orders
                      </Button>
                    </div>
                  }
                </Nav>
                <Form className="d-flex" onSubmit={handleSearchSubmit}>
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    style={customNavbarStyles.searchInput}
                    aria-label="Search"
                    value={searchValue}
                    onChange={handleSearchChange}
                  />
                  <Button variant="outline-success" style={customNavbarStyles.searchButton} type="submit">
                    Search
                  </Button>
                </Form>
              </Navbar.Collapse>
            </Container>
        </Navbar>
      </div>
      <CarouselComponent />
      <div>
        {foodCat.length > 0 ? (
          foodCat.map((data) => (
            <div key={data._id}>
              <div className='fs-3 m-3'>{data.CategoryName}</div>
              <hr />
              <Row>
                {foodItem.length > 0 ? (
                  foodItem
                    .filter((item) => (item.CategoryName === data.CategoryName) && (item.CategoryName.toLowerCase().includes(searchValue.toLowerCase())))
                    .map((filterItems) => (
                      <Col key={filterItems._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                        <CardComponent 
                          foodItem = {filterItems}
                          options = {filterItems.options}
                        />
                      </Col>
                    ))
                ) : (
                  <Col>
                    <div>No Such Data Found</div>
                  </Col>
                )}
              </Row>
            </div>
          ))
        ) : (
          ''
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
