import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PharmacySidebar from '../components/Pharmacy/PharmacySidebar';
import GradientBackground from '../components/GradientBackground';
import { FaRegBell } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext'; // 1. Import useAuth

const PharmacyLayout = () => {
  const [activeTab, setActiveTab] = useState();
  const { user } = useAuth(); // 2. Get the user from context

  return (
    <GradientBackground>
      <div className="flex min-h-screen">
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

              {/* 3. MODIFICATION: Display profile picture or fallback initial */}
              {user?.profilepic ? (
                <img 
                  src={user.profilepic} 
                  alt="Profile" 
                  className="w-9 h-9 rounded-full object-cover cursor-pointer border-2 border-white shadow-sm" 
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-lg font-semibold cursor-pointer">
                  {user?.username?.charAt(0).toUpperCase() || 'P'}
                </div>
              )}
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