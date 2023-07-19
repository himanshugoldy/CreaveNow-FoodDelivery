
import React, { useEffect, useState } from 'react';
import { Row, Col} from 'react-bootstrap';
import CarouselComponent from '../components/CarouselComponent';
import CardComponent from '../components/CardComponent';
import Cart from "../Screens/Cart";
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

const Header = () => {

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
          <Navbar expand="lg" className="bg-body-tertiary stickyNavbar" style={customNavbarStyles.header}>
            <Container fluid style={{ backgroundColor: 'yellowgreen' }}>
              <Navbar.Brand as={Link} to="/" style={customNavbarStyles.brand}>
                CraveNow
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto my-2 my-lg-0 custom-nav" style={{ maxHeight: '120px' }} navbarScroll>
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
    </div>
  );
}

export default Header;













































// Header.js
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import customNavbarStyles from '../styles/customNavbarStyles';

// const Header = () => {
  

//   return (
//     <Navbar expand="lg" className="bg-body-tertiary" style={customNavbarStyles.header}>
//       <Container fluid style={{ backgroundColor: 'yellowgreen' }}>
//         <Navbar.Brand as={Link} to="/" style={customNavbarStyles.brand}>
//           CraveNow
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="navbarScroll" />
//         <Navbar.Collapse id="navbarScroll">
//           <Nav className="me-auto my-2 my-lg-0 custom-nav" style={{ maxHeight: '120px' }} navbarScroll>
//             <Nav.Link as={Link} to="/" style={customNavbarStyles.link}>
//               Home
//             </Nav.Link>
//             <Nav.Link as={Link} to="/login" style={customNavbarStyles.link}>
//               Log In
//             </Nav.Link>
//             <Nav.Link as={Link} to="/createuser" style={customNavbarStyles.link}>
//               Sign Up
//             </Nav.Link>
//           </Nav>
//           <Form className="d-flex">
//             <Form.Control
//               type="search"
//               placeholder="Search"
//               className="me-2"
//               style={customNavbarStyles.searchInput}
//               aria-label="Search"
//             />
//             <Button variant="outline-success" style={customNavbarStyles.searchButton} type="submit">
//               Search
//             </Button>
//           </Form>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;
