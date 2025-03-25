import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, ROLES } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!currentUser) return null;

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">Bagel Shop</div>
        
        <ul className="flex space-x-6">
          {/* Customer and Dev can see Order Form */}
          {(currentUser.role === ROLES.CUSTOMER || currentUser.role === ROLES.DEV) && (
            <li>
              <Link to="/order-form" className="hover:text-blue-300 transition-colors">
                Order Form
              </Link>
            </li>
          )}
          
          {/* Staff and Dev can see Orders */}
          {(currentUser.role === ROLES.STAFF || currentUser.role === ROLES.DEV) && (
            <li>
              <Link to="/order-list" className="hover:text-blue-300 transition-colors">
                Orders
              </Link>
            </li>
          )}
          
          <li>
            <button 
              onClick={handleLogout}
              className="text-red-300 hover:text-red-100 transition-colors"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;