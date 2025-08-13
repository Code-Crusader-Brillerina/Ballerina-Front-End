import React, { useState } from 'react';
import { Calendar, Video, Clock, User, Pill, Package, CheckCircle, Plus, ArrowRight, Heart, Activity, Stethoscope, Truck, MapPin, Phone } from 'lucide-react';

// Enhanced Appointment Card Component
const AppointmentCard = ({ doctor, time, type, status = 'upcoming' }) => {
  const doctorName = doctor.split(' - ')[0].replace('Dr. ', '');
  const specialty = doctor.split(' - ')[1];
  
  return (
    <div className="group relative bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-bl-3xl rounded-tr-2xl opacity-10"></div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Stethoscope className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">{doctorName}</h3>
            <p className="text-blue-600 font-medium text-sm">{specialty}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {type}
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">{time}</span>
        </div>
        <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
          <Video className="w-4 h-4" />
          <span className="font-medium">Join</span>
        </button>
      </div>
    </div>
  );
};

// Enhanced Completed Appointment Card
const CompletedAppointmentCard = ({ appointment, onClick, isActive }) => (
  <div
    onClick={onClick}
    className={`group cursor-pointer rounded-2xl p-5 transition-all duration-300 transform hover:-translate-y-1 ${
      isActive 
        ? 'bg-gradient-to-br from-blue-50 to-purple-50 ring-2 ring-blue-500 shadow-lg' 
        : 'bg-white hover:bg-gray-50 shadow-md hover:shadow-lg border border-gray-100'
    }`}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          isActive ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gray-100 group-hover:bg-blue-100'
        } transition-all duration-200`}>
          <CheckCircle className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'}`} />
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{appointment.doctor}</h4>
          <p className="text-sm text-gray-500">{appointment.date}</p>
        </div>
      </div>
      
      {isActive && (
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg">
          View Details
        </button>
      )}
      
      {!isActive && (
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
      )}
    </div>
  </div>
);

// Enhanced Prescription Card
const PrescriptionCard = ({ prescription, isActive, onClick }) => (
  <div 
    onClick={onClick} 
    className={`group cursor-pointer rounded-2xl p-5 transition-all duration-300 transform hover:-translate-y-1 ${
      isActive 
        ? 'bg-gradient-to-br from-green-50 to-blue-50 ring-2 ring-green-500 shadow-lg' 
        : 'bg-white hover:bg-gray-50 shadow-md hover:shadow-lg border border-gray-100'
    }`}
  >
    <div className="flex items-center space-x-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
        isActive ? 'bg-gradient-to-br from-green-500 to-blue-600' : 'bg-green-100 group-hover:bg-green-200'
      } transition-all duration-200`}>
        <Pill className={`w-6 h-6 ${isActive ? 'text-white' : 'text-green-600'}`} />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{prescription.pharmacy}</h4>
        <p className="text-sm text-gray-500 flex items-center">
          <Truck className="w-4 h-4 mr-1" />
          {prescription.date}
        </p>
      </div>
      <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-300'} transition-colors`}></div>
    </div>
  </div>
);

// Enhanced Delivery Progress Component
const DeliveryProgress = ({ prescription }) => {
  const allSteps = {
    1: [
      { name: 'Order Confirmed', time: '10:00 PM, Nov 15, 2025', icon: '📝', completed: true },
      { name: 'Order Packed', time: '10:00 PM, Nov 15, 2025', icon: '📦', completed: true },
      { name: 'Shipped', time: '10:00 PM, Nov 15, 2025', icon: '🚚', completed: false },
      { name: 'Delivered', time: '10:00 PM, Nov 15, 2025', icon: '✅', completed: false },
    ],
    2: [
      { name: 'Order Confirmed', time: '09:00 PM, Nov 14, 2025', icon: '📝', completed: true },
      { name: 'Order Packed', time: '09:30 PM, Nov 14, 2025', icon: '📦', completed: false },
      { name: 'Shipped', time: '', icon: '🚚', completed: false },
      { name: 'Delivered', time: '', icon: '✅', completed: false },
    ],
    3: [
      { name: 'Order Confirmed', time: '11:00 AM, Nov 12, 2025', icon: '📝', completed: true },
      { name: 'Order Packed', time: '11:00 AM, Nov 12, 2025', icon: '📦', completed: true },
      { name: 'Shipped', time: '11:00 AM, Nov 12, 2025', icon: '🚚', completed: true },
      { name: 'Delivered', time: '11:00 AM, Nov 12, 2025', icon: '✅', completed: true },
    ]
  };

  const steps = prescription ? allSteps[prescription.id] : [];

  return (
    <div className="space-y-4">
      {steps.length > 0 ? (
        steps.map((step, index) => (
          <div key={index} className={`relative flex items-center space-x-4 rounded-2xl p-4 transition-all duration-200 ${
            step.completed ? 'bg-gradient-to-r from-green-50 to-blue-50' : 'bg-gray-50'
          }`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg shadow-md ${
              step.completed ? 'bg-gradient-to-br from-green-400 to-blue-500' : 'bg-gray-200'
            }`}>
              <span className={step.completed ? 'filter drop-shadow-sm' : ''}>{step.icon}</span>
            </div>
            <div className="flex-grow">
              <p className={`font-semibold ${step.completed ? 'text-green-700' : 'text-gray-800'}`}>
                {step.name}
              </p>
              <p className={`text-sm ${step.completed ? 'text-green-600' : 'text-gray-500'}`}>
                {step.time}
              </p>
            </div>
            {step.completed && (
              <CheckCircle className="w-6 h-6 text-green-500" />
            )}
            {index < steps.length - 1 && (
              <div className={`absolute left-6 top-16 w-0.5 h-4 ${
                step.completed ? 'bg-green-300' : 'bg-gray-300'
              }`}></div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">Select a prescription to view its progress</p>
        </div>
      )}
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState({ id: 1 });

  const appointments = [
    { doctor: 'Dr. Maya Fornado - Cardiologist', time: '10:00 AM, Nov 15, 2025', type: 'Online' },
    { doctor: 'Dr. John Smith - Neurologist', time: '2:00 PM, Nov 16, 2025', type: 'In-Person' },
  ];

  const completedAppointments = [
    {
      id: 1,
      doctor: 'Dr. John Doe - Cardiologist',
      date: 'Oct 28, 2025',
      prescription: 'Take two pills of Atorvastatin daily. Schedule a follow-up in 3 months.',
      adviser: 'Maintain a low-sodium diet and exercise for 30 minutes, 5 times a week.',
    },
    {
      id: 2,
      doctor: 'Dr. Jane Smith - Dermatologist',
      date: 'Nov 01, 2025',
      prescription: 'Apply Hydrocortisone cream twice daily to the affected area.',
      adviser: 'Keep the skin moisturized and use gentle, fragrance-free soap.',
    },
    {
      id: 3,
      doctor: 'Dr. Maya Fornado - Physiologist',
      date: 'Nov 10, 2025',
      prescription: 'Start physical therapy exercises. Use cold pack for 15 minutes after each session.',
      adviser: 'Avoid heavy lifting and report any new pain to the therapist.',
    },
  ];

  const prescriptions = [
    { id: 1, pharmacy: 'Halgouce Pharmacy', date: 'Delivery on Nov 15, 2025' },
    { id: 2, pharmacy: 'Halgouce Pharmacy', date: 'Delivery on Nov 16, 2025' },
    { id: 3, pharmacy: 'Halgouce Pharmacy', date: 'Delivered Nov 12, 2025' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome back, Eshan!</h1>
              <p className="text-blue-100 text-lg">Your health journey continues with Halgouce</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Upcoming</p>
                <p className="text-3xl font-bold">2</p>
                <p className="text-blue-100 text-sm">Appointments</p>
              </div>
              <Calendar className="w-10 h-10 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Active</p>
                <p className="text-3xl font-bold">3</p>
                <p className="text-green-100 text-sm">Prescriptions</p>
              </div>
              <Pill className="w-10 h-10 text-green-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold">12</p>
                <p className="text-orange-100 text-sm">Appointments</p>
              </div>
              <CheckCircle className="w-10 h-10 text-orange-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Health</p>
                <p className="text-3xl font-bold">98%</p>
                <p className="text-purple-100 text-sm">Score</p>
              </div>
              <Heart className="w-10 h-10 text-purple-200" />
            </div>
          </div>
        </div>

        {/* Appointments Section */}
        <section className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Upcoming Appointments</h2>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {appointments.map((appt, index) => (
              <AppointmentCard key={index} {...appt} />
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
              <Plus className="w-5 h-5" />
              <span className="font-semibold">New Appointment</span>
            </button>
            <button className="flex items-center space-x-2 bg-white text-blue-600 border-2 border-blue-200 px-6 py-3 rounded-2xl hover:bg-blue-50 transition-all duration-200">
              <User className="w-5 h-5" />
              <span className="font-semibold">Medical History</span>
            </button>
          </div>
        </section>

        {/* Completed Appointments Section */}
        <section className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Recent Appointments</h2>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {completedAppointments.map(appt => (
                <CompletedAppointmentCard
                  key={appt.id}
                  appointment={appt}
                  onClick={() => setSelectedAppointment(appt)}
                  isActive={selectedAppointment?.id === appt.id}
                />
              ))}
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6">
              {selectedAppointment ? (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Appointment Summary
                  </h3>
                  
                  <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <h4 className="font-semibold text-blue-600 mb-2 flex items-center">
                      <Pill className="w-5 h-5 mr-2" />
                      Prescriptions
                    </h4>
                    <p className="text-gray-700">{selectedAppointment.prescription}</p>
                  </div>

                  <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <h4 className="font-semibold text-green-600 mb-2 flex items-center">
                      <Stethoscope className="w-5 h-5 mr-2" />
                      Doctor's Advice
                    </h4>
                    <p className="text-gray-700">{selectedAppointment.adviser}</p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <CheckCircle className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-lg font-medium">Select an appointment</p>
                  <p className="text-sm">to view detailed summary</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Prescriptions Section */}
        <section className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Prescriptions & Delivery</h2>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {prescriptions.map((p) => (
                <PrescriptionCard 
                  key={p.id}
                  prescription={p}
                  onClick={() => setSelectedPrescription(p)}
                  isActive={p.id === selectedPrescription?.id}
                />
              ))}
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Truck className="w-6 h-6 mr-2 text-green-600" />
                Delivery Progress
              </h3>
              <DeliveryProgress prescription={selectedPrescription} />
            </div>
          </div>
          
          <div className="mt-8">
            <button className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-2xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Order New Prescription</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;