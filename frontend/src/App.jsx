import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth, ROLES } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import './App.css';

// Loading component
const LoadingScreen = () => (
  <div className="flex justify-center items-center min-h-screen bg-blue-100">
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-blue-100 rounded-full animate-spin mb-4"></div>
      <p className="text-xl text-gray-600">Loading...</p>
    </div>
  </div>
);

// Wrapper component that handles authentication loading
const AppContent = () => {
  const { loading } = useAuth();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  return (
    <div className="bg-blue-100 min-h-screen">
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
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
