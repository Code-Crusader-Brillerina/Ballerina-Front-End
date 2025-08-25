import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarLink = ({ to, icon: Icon, text, onClick, end }) => {
  const linkClasses = `flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gradient-to-r hover:from-green-100 hover:to-blue-100 hover:text-gray-800`;
  const activeLinkClasses = `bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg`;

  // If an onClick function is provided, render a button
  if (onClick) {
    return (
      <button onClick={onClick} className={`w-full ${linkClasses}`}>
        <Icon className="w-5 h-5" />
        <span className="font-medium">{text}</span>
      </button>
    );
  }

  // Otherwise, render a NavLink for navigation
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClasses : ''}`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{text}</span>
    </NavLink>
  );
};

export default SidebarLink;