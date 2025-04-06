import React from 'react';
import bagelLogo from '../assets/images/bagel-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, ROLES } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout, logoutLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!currentUser) return null;

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="font-bold text-xl flex items-center">
          <img src={bagelLogo} alt="Bagel Shop Logo" className="h-8 w-8 mr-2" />
          Bagel Shop
        </div>
        
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
              className={`text-red-300 hover:text-red-100 transition-colors ${logoutLoading ? 'cursor-not-allowed opacity-50' : ''}`}
              disabled={logoutLoading}
            >
              {logoutLoading ? (
                <span className="flex items-center">
                  <div className="w-4 h-4 border-2 border-red-100 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Logging out...
                </span>
              ) : (
                'Logout'
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;