import React, { createContext, useState, useContext, useEffect } from 'react';

// Define user roles
export const ROLES = {
  CUSTOMER: 'customer',
  STAFF: 'staff',
  DEV: 'dev'
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  
  // Initialize user from localStorage on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('bagelAppUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Login function
  const login = (role) => {
    const user = { role };
    setCurrentUser(user);
    localStorage.setItem('bagelAppUser', JSON.stringify(user));
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('bagelAppUser');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
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