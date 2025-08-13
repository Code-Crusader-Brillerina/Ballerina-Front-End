import React from 'react';
import SearchFilter from '../../components/Patient/doctorPage/SearchFilter';
import Pagination from '../../components/Patient/Pagination';
import DoctorCard from '../../components/Patient/doctorPage/DoctorCard';

const doctorsData = new Array(12).fill({
  name: 'Maya Fornado',
  specialty: 'Physiologist',
  education: 'MBBS Colombo University',
  imageUrl: 'p2.png',
});

const Doctor = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Doctors</h2>
      <SearchFilter />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {doctorsData.map((doctor, index) => (
          <DoctorCard key={index} {...doctor} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default Doctor;