import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { AuthProvider, ROLES } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="container mx-auto p-4">
          <Routes>
            {/* Public route */}
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route 
              path="/order-form" 
              element={
                <ProtectedRoute 
                  element={<OrderForm />} 
                  allowedRoles={[ROLES.CUSTOMER, ROLES.DEV]} 
                />
              } 
            />
            <Route 
              path="/order-list" 
              element={
                <ProtectedRoute 
                  element={<OrderList />} 
                  allowedRoles={[ROLES.STAFF, ROLES.DEV]} 
                />
              } 
            />
            
            {/* Redirect to login by default */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
};

export default App;
