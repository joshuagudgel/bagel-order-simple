import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, ROLES } from '../context/AuthContext';

// Route that requires authentication and specific roles
export const ProtectedRoute = ({ element, allowedRoles }) => {
  const { currentUser } = useAuth();

  // If not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Check if user role is allowed to access this route
  if (!allowedRoles.includes(currentUser.role)) {
    // Redirect based on role
    if (currentUser.role === ROLES.CUSTOMER) {
      return <Navigate to="/order-form" replace />;
    } else if (currentUser.role === ROLES.STAFF) {
      return <Navigate to="/order-list" replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  // If user is allowed, render the page
  return element;
};