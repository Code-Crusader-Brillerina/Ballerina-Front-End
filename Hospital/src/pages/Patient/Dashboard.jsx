import React from 'react';
import AppointmentsSection from '../../components/Patient/dashboardPage/AppointmentsSection';
import PrescriptionsSection from '../../components/Patient/dashboardPage/PrescriptionsSection';



const Dashboard = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Hello, Eshan Senadhi</h1>
      
      <AppointmentsSection />
      
      <PrescriptionsSection />
    </div>
  );
};

export default Dashboard;