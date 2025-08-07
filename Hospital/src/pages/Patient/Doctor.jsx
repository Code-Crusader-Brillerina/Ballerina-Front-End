import React from 'react';
import SearchFilter from '../../components/Patient/SearchFilter';
import Pagination from '../../components/Patient/Pagination';
import DoctorCard from '../../components/Patient/doctorPage/DoctorCard';

const doctorsData = new Array(12).fill({
  name: 'Maya Fornado',
  specialty: 'Physiologist',
  education: 'MBBS Colombo University',
  imageUrl: 'https://via.placeholder.com/150', // Added for the DoctorCard component
});

const Doctor = () => {
  return (
    // The parent layout component (Main.jsx) already provides the background.
    // This div should not have its own background color.
    <div className="min-h-screen font-sans"> 
      <div className="container mx-auto px-4 ">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Doctors</h2>
        
        <SearchFilter />


        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {doctorsData.map((doctor, index) => (
            <DoctorCard key={index} {...doctor} />
          ))}
        </div>
        
        <Pagination />
      </div>
    </div>
  );
};

export default Doctor;