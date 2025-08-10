import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt, FaUsers, FaUserMd, FaPills, FaFlask, FaRegBell, FaCog, FaSignOutAlt
} from 'react-icons/fa';

const SidebarLink = ({ to, icon: Icon, text, subLinks, end }) => {
  return (
    <div>
      <NavLink
        to={to}
        end={end} // <-- Add the `end` prop here
        className={({ isActive }) =>
          `flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors
          ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-blue-800'}`
        }
      >
        <Icon className="w-5 h-5" />
        <span>{text}</span>
      </NavLink>
      {subLinks && subLinks.length > 0 && (
        <ul className="pl-10 mt-2 space-y-2">
          {subLinks.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `block text-sm py-2 px-2 rounded-md transition-colors
                  ${isActive ? 'bg-blue-700 text-white' : 'text-gray-400 hover:text-white hover:bg-blue-800'}`
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

const Sidebar = () => {
  return (
    <div className="w-64 flex-shrink-0 bg-blue-900 text-white p-6">
      {/* Logo/Title */}
      <div className="flex items-center space-x-2 mb-8">
        <FaTachometerAlt className="w-8 h-8 text-blue-500" />
        <h2 className="text-xl font-bold">Admin</h2>
      </div>

      {/* Navigation */}
      <nav className="space-y-4">
        {/* Add end prop to the Dashboard link */}
        <SidebarLink to="/admin" icon={FaTachometerAlt} text="Dashboard" end={true} />
        <SidebarLink to="/admin/patients" icon={FaUsers} text="Patient List" subLinks={[]} />
        <SidebarLink to="/admin/doctors" icon={FaPills} text="Doctors" subLinks={[]} />
        <SidebarLink to="/admin/pharmacy" icon={FaFlask} text="Pharmacy" subLinks={[]} />
        <SidebarLink to="/admin/notifications" icon={FaRegBell} text="Notifications" />
        <SidebarLink to="/admin/settings" icon={FaCog} text="Settings" />
        <SidebarLink to="/logout" icon={FaSignOutAlt} text="Logout" />
      </nav>
    </div>
  );
};

export default Sidebar;