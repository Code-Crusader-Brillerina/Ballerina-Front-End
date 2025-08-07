import React from 'react';
import { FaPills, FaFileMedical, FaDownload } from 'react-icons/fa';

const PrescriptionDetails = ({ doctor, patient, prescriptions, advice }) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-8">
    <div className="flex justify-between items-start mb-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dr. {doctor.name}</h2>
        <p className="text-gray-600">{doctor.specialty}</p>
        <p className="text-gray-600">Phone: {doctor.phone}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-600">Date: {patient.date}</p>
        <p className="text-sm text-gray-600">Patient Name: {patient.name}</p>
        <p className="text-sm text-gray-600">Age/Gender: {patient.age} / {patient.gender}</p>
      </div>
    </div>

    {/* Prescribed Medications */}
    <div className="space-y-4 mb-6">
      {prescriptions.map((p, index) => (
        <div key={index} className="flex items-center space-x-4 bg-gray-50 rounded-lg p-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <FaPills className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-sm text-gray-700">{p}</p>
        </div>
      ))}
    </div>

    {/* Doctor's Advice */}
    <div className="flex items-start space-x-4 bg-gray-50 rounded-lg p-3">
      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
        <FaFileMedical className="h-5 w-5 text-yellow-600" />
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">{advice}</p>
    </div>

    {/* Download Button */}
    <div className="mt-6 flex justify-end">
      <button className="flex items-center space-x-2 bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
        <FaDownload className="h-4 w-4" />
        <span>Download</span>
      </button>
    </div>
  </div>
);

export default PrescriptionDetails;