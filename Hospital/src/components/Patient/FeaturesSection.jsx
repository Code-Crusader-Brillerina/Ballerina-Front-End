// components/Patient/homePage/FeaturesSection.jsx

import React from 'react';
import { FaStethoscope, FaCapsules, FaFileMedicalAlt } from 'react-icons/fa';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition-shadow cursor-pointer">
    <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-100 mb-4">
      <Icon className="h-8 w-8 text-green-500" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const FeaturesSection = () => {
  const features = [
    { icon: FaStethoscope, title: 'Find Doctors', description: 'Search and book appointments with qualified doctors near you.' },
    { icon: FaCapsules, title: 'Get Prescriptions', description: 'View and manage your prescriptions securely online.' },
    { icon: FaFileMedicalAlt, title: 'View Medical Records', description: 'Access your health history and medical records anytime, anywhere.' },
  ];

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Patient Hamsgonce</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;