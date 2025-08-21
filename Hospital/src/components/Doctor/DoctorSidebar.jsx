import React from 'react';
import { useNavigate } from 'react-router-dom';
// 1. Import useAuth
import {
  FaTachometerAlt, FaUsers, FaRegBell, FaCog, FaSignOutAlt, FaMoneyBill
} from 'react-icons/fa';
import SidebarLink from '../SidebarLink';
import { useAuth } from '../../context/AuthContext';
 // Assuming SidebarLink is in the same folder

const DoctorSidebar = () => {
  const { logout } = useAuth(); // 2. Get logout function from context
  const navigate = useNavigate();

  // 3. Create a handler for the logout action
  const handleLogout = async () => {
    await logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="w-64 flex-shrink-0 bg-gradient-to-b from-white via-green-25 to-blue-50 border-r border-green-100/50 text-gray-700 p-6 shadow-lg">
      {/* Logo/Title */}
      <div className="flex items-center space-x-2 mb-8 pb-4 border-b border-green-200/30">
        <img src="/Logo.png" alt="Hallguce Logo" className="h-8 w-8" />
        <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Doctor</h2>
      </div>

      {/* Navigation */}
      <nav className="space-y-3">
        <SidebarLink to="/doctor" icon={FaTachometerAlt} text="Dashboard" end={true} />
        <SidebarLink to="/doctor/today-que" icon={FaMoneyBill} text="Today-Que" />
        <SidebarLink to="/doctor/appointments" icon={FaUsers} text="Appointments" />
        <SidebarLink to="/doctor/notifications" icon={FaRegBell} text="Notifications" />
        <SidebarLink to="/doctor/settings" icon={FaCog} text="Settings" />
        
        {/* 4. Use the onClick prop for the logout button */}
        <SidebarLink icon={FaSignOutAlt} text="Logout" onClick={handleLogout} />
      </nav>
    </div>
  );
};

export default DoctorSidebar;