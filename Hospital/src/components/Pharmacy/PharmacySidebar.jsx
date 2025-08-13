import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt, FaUsers, FaUserMd, FaPills, FaFlask, FaRegBell, FaCog, FaSignOutAlt,
  FaMoneyBill
} from 'react-icons/fa';

const SidebarLink = ({ to, icon: Icon, text, subLinks, end }) => {
  return (
    <div>
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          `flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors
          ${isActive ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg' : 'text-gray-600 hover:bg-gradient-to-r hover:from-green-100 hover:to-blue-100 hover:text-gray-800'}`
        }
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{text}</span>
      </NavLink>
      {subLinks && subLinks.length > 0 && (
        <ul className="pl-10 mt-2 space-y-2">
          {subLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `block text-sm py-2 px-2 rounded-md transition-colors
                  ${isActive ? 'bg-gradient-to-r from-green-400 to-blue-400 text-white' : 'text-gray-500 hover:text-gray-700 hover:bg-green-50'}`
                }
              >
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const PharmacySidebar = () => {
  return (
    <div className="w-64 flex-shrink-0 bg-gradient-to-b from-white via-green-25 to-blue-50 border-r border-green-100/50 text-gray-700 p-6 shadow-lg">
      {/* Logo/Title */}
      <div className="flex items-center space-x-2 mb-8 pb-4 border-b border-green-200/30">
        <img src="/Logo.png" alt="Hallguce Logo" className="h-8 w-8" />
        <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Pharmacy</h2>
      </div>

      {/* Navigation */}
      <nav className="space-y-3">
        <SidebarLink to="/pharmacy" icon={FaTachometerAlt} text="Dashboard" end={true} />
        <SidebarLink to="/pharmacy/prescription" icon={FaMoneyBill} text="Prescription" subLinks={[]} />
        <SidebarLink to="/pharmacy/medicine-stock" icon={FaUsers} text="Medicine-Stock" subLinks={[]} />
        <SidebarLink to="/pharmacy/notifications" icon={FaRegBell} text="Notifications" />
        <SidebarLink to="/pharmacy/settings" icon={FaCog} text="Settings" />
        <SidebarLink to="/logout" icon={FaSignOutAlt} text="Logout" />
      </nav>
    </div>
  );
};

export default PharmacySidebar;