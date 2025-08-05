import React from 'react';
import { FaRegBell, FaRegUserCircle } from 'react-icons/fa';

const Header = () => (
  <header className="bg-transparent">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      {/* Left side: Logo */}
      <div className="flex items-center space-x-2">
        <img src="/Logo.png" alt="Hallguce Logo" className="h-8" />
        <span className="text-xl font-bold text-gray-800">Halgouce</span>
      </div>

      {/* Center: Navigation Tabs */}
      <nav className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
        <a href="#" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors">Dashboard</a>
        <a href="#" className="text-blue-600 font-semibold border-b-2 border-blue-600">Doctor</a>
        <a href="#" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors">Pharmacy</a>
        <a href="#" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors">About us</a>
      </nav>
      
      {/* Right side: Icons */}
      <div className="flex items-center space-x-4">
        <FaRegBell className="text-gray-600 text-2xl cursor-pointer hover:text-blue-600 transition-colors" />
        <FaRegUserCircle className="text-gray-600 text-2xl cursor-pointer hover:text-blue-600 transition-colors" />
      </div>
    </div>
  </header>
);

export default Header;