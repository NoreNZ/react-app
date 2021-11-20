import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Customers from './pages/Customer.js';
import Orders from './pages/Orders.js';
import Products from './pages/Products.js';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/customers' element={<Customers/>} />
          <Route path='/orders' element={<Orders/>} />
          <Route path='/products' element={<Products/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;