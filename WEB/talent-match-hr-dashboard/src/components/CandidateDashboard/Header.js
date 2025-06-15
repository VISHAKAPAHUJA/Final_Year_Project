import React from 'react';
import { FaHandshake, FaHome, FaBell, FaUser } from 'react-icons/fa';

const Header = () => {
  const handleLogout = () => {
    // Clear session data (if any)
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    
    // Redirect to login page (cross-origin)
    window.location.href = 'http://localhost:3000/login';
  };

  return (
    <header className="gradient-bg text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="navbar-glass p-3 rounded-full float-effect pulse">
              <FaHandshake className="text-2xl text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
              Talent<span className="font-light">Match</span>
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="text-white hover:text-blue-100 transition transform hover:scale-105">
                <FaHome className="mr-1 inline" /> Dashboard
              </a>
              <a href="#" className="text-white hover:text-blue-100 transition transform hover:scale-105 relative">
                <FaBell className="mr-1 inline" /> Alerts
                <span className="absolute -top-1 -right-3 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-xs animate-ping opacity-75"></span>
              </a>
            </div>
            <div className="relative group">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition cursor-pointer transform hover:scale-110">
                <FaUser className="text-white" />
              </div>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-50 hidden group-hover:block opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">Settings</a>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;