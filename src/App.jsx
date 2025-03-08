import React from 'react'
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import './App.css'

const App = () => {

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/order-form">Order Form</Link></li>
          <li><Link to="/order-list">Orders</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/order-form" element={<OrderForm />} />
        <Route path="/order-list" element={<OrderList />} />
      </Routes>
    </Router>
  );
}

export default App;
