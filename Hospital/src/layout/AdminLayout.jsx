import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Admin/Sidebar';
import { FaRegBell, FaRegUserCircle } from 'react-icons/fa';


const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content Area */}
      <div className="flex-grow">
        {/* Header (Top Nav) */}
        <header className="bg-white p-4 flex justify-between items-center shadow-md">
          <div className="flex items-center space-x-2">

          </div>
          <div className="flex items-center space-x-4">

            <FaRegBell className="text-gray-600 text-2xl cursor-pointer hover:text-blue-600 transition-colors" />
            <FaRegUserCircle className="text-gray-600 text-2xl cursor-pointer hover:text-blue-600 transition-colors" />

          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;