import React from 'react';
import { FaUsers, FaUserMd, FaFlask, FaPills } from 'react-icons/fa';
import ChartCard from '../../components/Admin/AdminDashboard/ChartCard';
import MetricCard from '../../components/Admin/AdminDashboard/MetricCard';

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-800">AdminDashboard</h1>

      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ChartCard
          title="Total Revenue"
          value="12,35"
          percentage="+3%"
          subtitle="Cua Morray"
          color="green"
        />
        <ChartCard
          title="Total Doctors Revenue"
          value="2510"
          percentage="+5%"
          subtitle="Cora Montae"
          color="green"
        />
        <ChartCard
          title="Total Pharmacies Revenue"
          value="1640"
          percentage="+2%"
          subtitle="Daldzy"
          color="red"
        />
      </div>

      {/* Primary User/Entity Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          icon={FaUsers}
          title="Total Patients"
          value="52,50"
          percentage="+20.0%"
          color="green"
        />
        <MetricCard
          icon={FaUserMd}
          title="Total Doctors"
          value="5975"
          percentage="+42.0%"
          color="green"
        />
        <MetricCard
          icon={FaFlask}
          title="Total Pharmacies"
          value="7880"
          percentage="+20.0%"
          color="red"
        />
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* These cards have different icons and styles in the image */}

        <MetricCard
          icon={FaPills}
          title="Total Medicine Types"
          value="74,50"
          percentage="+26.0%"
          color="green"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;