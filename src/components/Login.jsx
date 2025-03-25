import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, ROLES } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    login(role);
    
    // Redirect based on role
    if (role === ROLES.CUSTOMER) {
      navigate('/order-form');
    } else if (role === ROLES.STAFF) {
      navigate('/order-list');
    } else if (role === ROLES.DEV) {
      navigate('/order-form');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Bagel Shop Login</h1>
        
        <div className="space-y-4">
          <button
            onClick={() => handleLogin(ROLES.CUSTOMER)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Login as Customer
          </button>
          
          <button
            onClick={() => handleLogin(ROLES.STAFF)}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
          >
            Login as Staff
          </button>
          
          <button
            onClick={() => handleLogin(ROLES.DEV)}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
          >
            Login as Developer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;