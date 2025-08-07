import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const getDoctorDetails = (name) => {
  return {
    name: name,
    specialty: 'Physiologist',
    education: 'MBBS Colombo University',
    imageUrl: 'https://via.placeholder.com/200',
    bio: 'Dr. Maya Fornado is a dedicated medical professional committed to delivering compassionate care and promoting patient well-being through expertise, integrity, and a passion for improving health outcomes in the community.',
  };
};

const Appointment = () => {
  const { doctorName } = useParams();
  const doctor = getDoctorDetails(doctorName);
  const navigate = useNavigate();

  const handlePaymentClick = () => {
    navigate('/appointment/payment');
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Appointment</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Dr. {doctor.name}</h2>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img src={doctor.imageUrl} alt={`Dr. ${doctor.name}`} className="w-full h-auto object-cover" />
            </div>
            <p className="text-sm text-gray-600 font-semibold">{doctor.education}</p>
            <p className="text-sm text-blue-600">{doctor.specialty}</p>
            <p className="mt-4 text-sm text-gray-700">{doctor.bio}</p>
          </div>
          
          <div className="md:w-2/3">
            <div className="flex space-x-4 mb-4">
              <label className="flex items-center space-x-2 text-gray-700">
                <input type="radio" name="appointment-type" className="form-radio text-blue-600" defaultChecked />
                <span>Online</span>
              </label>
              <label className="flex items-center space-x-2 text-gray-700">
                <input type="radio" name="appointment-type" className="form-radio text-blue-600" />
                <span>In-person</span>
              </label>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Available Date</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-bold text-center text-gray-800 mb-2">July 2025</h4>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <span key={day} className="font-semibold text-gray-500">{day}</span>
                  ))}
                  {new Array(31).fill('').map((_, i) => (
                    <span key={i} className={`p-2 rounded-lg cursor-pointer ${i + 1 === 16 ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}>
                      {i + 1}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Available Times</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border-2 border-blue-600 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-semibold">8.00 AM - 12.00 PM</span>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg border-2 border-transparent hover:border-gray-300 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">8.00 PM - 10.00 PM</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Documents</h3>
              <div className="grid grid-cols-4 gap-4">
                {new Array(4).fill('').map((_, i) => (
                  <div key={i} className="flex items-center justify-center h-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handlePaymentClick}
              className="w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;