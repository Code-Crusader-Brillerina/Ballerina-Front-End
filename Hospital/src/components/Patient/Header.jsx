import React, { useState } from 'react';
import { FaRegBell, FaRegUserCircle } from 'react-icons/fa';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state

  return (
    <header className="bg-gradient-to-r from-white via-green-50/80 to-blue-100/80 backdrop-blur-sm border-b border-green-100/50 relative z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left side: Logo */}
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img src="/Logo.png" alt="Halgouce Logo" className="h-8" />
          </Link>
          <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Halgouce</span>
        </div>

        {/* Center: Navigation Tabs */}
        <nav className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
          <NavLink to="/" end className={({ isActive }) => `font-semibold transition-colors pb-1 ${isActive ? "text-green-600 border-b-2 border-green-600" : "text-gray-700 hover:text-green-600"}`}>Home</NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => `font-semibold transition-colors pb-1 ${isActive ? "text-green-600 border-b-2 border-green-600" : "text-gray-700 hover:text-green-600"}`}>Dashboard</NavLink>
          <NavLink to="/doctorpage" className={({ isActive }) => `font-semibold transition-colors pb-1 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700 hover:text-blue-600"}`}>Doctor</NavLink>
          <NavLink to="/pharmacypage" className={({ isActive }) => `font-semibold transition-colors pb-1 ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-700 hover:text-blue-600"}`}>Pharmacy</NavLink>
          <NavLink to="/about-us" className={({ isActive }) => `font-semibold transition-colors pb-1 ${isActive ? "text-green-600 border-b-2 border-green-600" : "text-gray-700 hover:text-green-600"}`}>About us</NavLink>
        </nav>

        {/* Right side: Conditional rendering based on login status */}
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <FaRegBell className="text-gray-700 text-2xl cursor-pointer hover:text-green-600 transition-colors" />
            <FaRegUserCircle className="text-gray-700 text-2xl cursor-pointer hover:text-blue-600 transition-colors" />
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <button className="text-gray-700 font-semibold px-4 py-2 rounded-lg hover:text-green-600 hover:bg-green-50/50 transition-all duration-200">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg">
                Signup
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;