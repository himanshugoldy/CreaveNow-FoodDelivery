import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from './Screens/Home';
import Signup from './Screens/Signup';
import Login from './Screens/Login';
import { CartProvider } from './components/ContextReducer';
import Cart from './Screens/Cart';
import MyOrder from './Screens/MyOrder';


function App() {

  const [searchValue, setSearchValue] = useState('');

  // Function to handle the searchValue update from the Header component
  const handleSearchValueUpdate = (value) => {
    setSearchValue(value);
  };




  return (
    <CartProvider>
      <Router>
      <Routes>
      <Route path="/" element={<Home onSearchSubmit={handleSearchValueUpdate}/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/createuser" element={<Signup />} />
      <Route path="/myOrderData" element={<MyOrder />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
