import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import PharmacySidebar from '../components/Pharmacy/PharmacySidebar';
import GradientBackground from '../components/GradientBackground';
import { FaRegBell, FaRegUserCircle } from 'react-icons/fa';

const PharmacyLayout = () => {
  const [activeTab, setActiveTab] = useState();

  return (
    <GradientBackground> {/* Wrap the content with GradientBackground */}
      <div className="flex min-h-screen"> {/* Remove bg-gray-100 from here */}
        {/* Sidebar */}
        <PharmacySidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main Content Area */}
        <div className="flex-grow">
          {/* Header (Top Nav) */}
          <header className="bg-transparent p-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
            </div>
            <div className="flex items-center space-x-4 ">
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
    </GradientBackground>
  );
};

export default PharmacyLayout;
