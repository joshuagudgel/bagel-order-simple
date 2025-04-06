import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, ROLES } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState(ROLES.CUSTOMER);
  const [error, setError] = useState('');
  
  const { login, register, authLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    
    try {
      let result;
      
      if (isRegistering) {
        result = await register(username, password, role);
      } else {
        result = await login(username, password);
      }
      
      if (result.success) {
        // Redirect based on role
        if (role === ROLES.CUSTOMER) {
          navigate('/order-form');
        } else if (role === ROLES.STAFF) {
          navigate('/order-list');
        } else if (role === ROLES.DEV) {
          navigate('/order-form');
        }
      } else {
        setError(result.message || 'Authentication failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-300">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isRegistering ? 'Register for Bagel Shop' : 'Bagel Shop'}
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
              required
              disabled={authLoading}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              required
              disabled={authLoading}
            />
          </div>
          
          {isRegistering && (
            <div>
              <label htmlFor="role" className="block text-gray-700 font-medium mb-1">
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={authLoading}
              >
                <option value={ROLES.CUSTOMER}>Customer</option>
                <option value={ROLES.STAFF}>Staff</option>
                <option value={ROLES.DEV}>Developer</option>
              </select>
            </div>
          )}
          
          <button
            type="submit"
            className={`w-full font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              authLoading 
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
            disabled={authLoading}
          >
            {authLoading ? (
              <div className="flex justify-center items-center">
                <div className="w-5 h-5 border-4 border-blue-600 border-t-blue-100 rounded-full animate-spin mr-2"></div>
                {isRegistering ? 'Registering...' : 'Logging in...'}
              </div>
            ) : (
              isRegistering ? 'Register' : 'Login'
            )}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
            disabled={authLoading}
          >
            {isRegistering 
              ? 'Already have an account? Login' 
              : 'Need an account? Register'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;