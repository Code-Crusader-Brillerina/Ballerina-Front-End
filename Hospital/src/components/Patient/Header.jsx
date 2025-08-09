import React, { useState } from 'react';
import { FaRegBell, FaRegUserCircle } from 'react-icons/fa';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  // Use a state variable to simulate a logged-in status.
  // In a real application, this would come from an authentication context.
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Change to `true` to test logged-in state

  return (
    <header className="bg-transparent">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Left side: Logo */}
        <div className="flex items-center space-x-2">
          <img src="/Logo.png" alt="Hallguce Logo" className="h-8" />
          <span className="text-xl font-bold text-gray-800">Halgouce</span>
        </div>

        {/* Center: Navigation Tabs */}
        <nav className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
          {/* New "Home" NavLink added here */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-semibold transition-colors ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `font-semibold transition-colors ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/doctorpage"
            className={({ isActive }) =>
              `font-semibold transition-colors ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`
            }
          >
            Doctor
          </NavLink>
          <NavLink
            to="/pharmacypage"
            className={({ isActive }) =>
              `font-semibold transition-colors ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`
            }
          >
            Pharmacy
          </NavLink>
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              `font-semibold transition-colors ${isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-blue-600"}`
            }
          >
            About us
          </NavLink>
        </nav>

        {/* Right side: Conditional rendering based on login status */}
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <FaRegBell className="text-gray-600 text-2xl cursor-pointer hover:text-blue-600 transition-colors" />
            <FaRegUserCircle className="text-gray-600 text-2xl cursor-pointer hover:text-blue-600 transition-colors" />
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <button className="text-gray-600 font-semibold px-4 py-2 rounded-lg hover:text-blue-600 transition-colors">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
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