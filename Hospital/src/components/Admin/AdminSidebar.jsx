import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  FaTachometerAlt, FaUsers, FaUserMd, FaPills, FaFlask, FaRegBell, FaCog, FaSignOutAlt, FaMoneyBill
} from 'react-icons/fa';

import { useAuth } from '../../context/AuthContext';
import SidebarLink from '../SidebarLink';
const AdminSidebar = () => {
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
        <h2 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Admin</h2>
      </div>

      {/* Navigation */}
      <nav className="space-y-3">
        <SidebarLink to="/admin" icon={FaTachometerAlt} text="Dashboard" end={true} />
        <SidebarLink to="/admin/transaction" icon={FaMoneyBill} text="Transaction" />
        <SidebarLink to="/admin/patients" icon={FaUsers} text="Patient List" />
        <SidebarLink to="/admin/doctors" icon={FaUserMd} text="Doctors" />
        <SidebarLink to="/admin/pharmacy" icon={FaFlask} text="Pharmacy" />
        <SidebarLink to="/admin/Medicine" icon={FaPills} text="Medicine" />
        <SidebarLink to="/admin/notifications" icon={FaRegBell} text="Notifications" />
        <SidebarLink to="/admin/settings" icon={FaCog} text="Settings" />
        
        {/* 4. Use the onClick prop for the logout button */}
        <SidebarLink icon={FaSignOutAlt} text="Logout" onClick={handleLogout} />
      </nav>
    </div>
  );
};

export default AdminSidebar;