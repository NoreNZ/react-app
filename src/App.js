import React, {useState, useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Customers from './pages/Customer.js';
import Orders from './pages/Orders.js';
import Products from './pages/Products.js';

function App() {

  const [contacts, setContacts] = useState([]);

  useEffect(() => { 
    const api_url = 
    "https://api.npoint.io/03f147d9f120cfebf707";

    const fetchData = async () => {
        try {
            const response = await fetch(api_url);
            const json = await response.json();
            console.log(json);
            setContacts(json);
        } catch (error) {
            console.log("error", error);
        }
      }

      fetchData();
  }, []);

  const [orders, setOrders] = useState([]);
     

  useEffect(() => { 
    const api_url = 
    "https://api.npoint.io/cffc6503bfc34e741c1a";

    const fetchData = async () => {
        try {
            const response = await fetch(api_url);
            const json = await response.json();
            console.log(json);
            setOrders(json);
        } catch (error) {
            console.log("error", error);
        }
      }

      fetchData();
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/customers' element={<Table contacts/>} />
          <Route path='/orders' element={<Orders/>} />
          <Route path='/products' element={<Products/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;