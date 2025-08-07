// Dashboard.jsx

import React from 'react';
import AppointmentsSection from '../../components/Patient/dashboardPage/AppointmentsSection';
import PrescriptionsSection from '../../components/Patient/dashboardPage/PrescriptionsSection';
import CompletedAppointmentsSection from '../../components/Patient/dashboardPage/CompletedAppointmentsSection'; // Import the new component

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Hello, Eshan Senadhi</h1>
      
      <AppointmentsSection />


      <CompletedAppointmentsSection />
      

      <PrescriptionsSection />

      
    </div>
  );
};

export default Dashboard;