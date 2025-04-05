import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const ROLES = {
  CUSTOMER: 'customer',
  STAFF: 'staff',
  DEV: 'dev'
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Initialize user from localStorage on app load
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    
    if (savedToken) {
      try {
        // Verify and decode the token
        const decodedToken = jwtDecode(savedToken);
        
        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          // Token is expired
          localStorage.removeItem('token');
          setCurrentUser(null);
          setToken(null);
        } else {
          // Token is valid
          setToken(savedToken);
          setCurrentUser({
            userId: decodedToken.userId,
            role: decodedToken.role
          });
        }
      } catch (error) {
        console.error('Token decode error:', error);
        localStorage.removeItem('token');
      }
    }
    
    setLoading(false);
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      const data = await response.json();
      
      // Save token to localStorage
      localStorage.setItem('token', data.token);
      
      setToken(data.token);
      setCurrentUser(data.user);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: error.message };
    }
  };
  
  // Register function
  const register = async (username, password, role) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      
      const data = await response.json();
      
      // Save token to localStorage
      localStorage.setItem('token', data.token);
      
      setToken(data.token);
      setCurrentUser(data.user);
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: error.message };
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };
  
  // Create a fetch function that automatically adds the auth token
  const authFetch = async (endpoint, options = {}) => {
    // Clone the options to avoid modifying the original object
    const authOptions = { ...options };
    
    // Add headers if they don't exist
    if (!authOptions.headers) {
      authOptions.headers = {};
    }
    
    // Add token if it exists
    if (token) {
      authOptions.headers.Authorization = `Bearer ${token}`;
    }
    
    // Make the fetch request with the full URL
    try {
      // Ensure endpoint doesn't start with a slash if API_URL ends with one
      const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
      const response = await fetch(url, authOptions);
      
      // Handle token expiration errors
      if (response.status === 401 || response.status === 403) {
        logout();
        throw new Error('Your session has expired. Please login again.');
      }
      
      return response;
    } catch (error) {
      console.error('Auth fetch error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      token, 
      loading, 
      login, 
      register, 
      logout,
      authFetch 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};