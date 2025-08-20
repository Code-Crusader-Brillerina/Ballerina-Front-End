import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Video, Clock, User, Pill, Package, CheckCircle, Plus, ArrowRight, Heart, Activity, Stethoscope, Truck, MapPin, Phone } from 'lucide-react';

// NOTE: Your sub-components (AppointmentCard, CompletedAppointmentCard, etc.) do not need any changes.

// Enhanced Appointment Card Component
const AppointmentCard = ({ doctor, time, date, type = "Online", url="https://meet.jit.si/h" }) => {
  const doctorName = doctor.name;
  const specialty = doctor.specialization;
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate(`/video-conference/${doctorName}`, {
      state: { doctor, url },
    });
  };

  return (
    <div className="group relative bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100">
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-bl-3xl rounded-tr-2xl opacity-10"></div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Stethoscope className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Dr. {doctorName}</h3>
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
          <span className="text-sm font-medium">
            {time}, {date}
          </span>
        </div>
        <button
          onClick={handleJoin}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Video className="w-4 h-4" />
          <span className="font-medium">Join</span>
        </button>
      </div>
    </div>
  );
};

// Enhanced Completed Appointment Card
const CompletedAppointmentCard = ({ appointment, onClick, isActive, onNavigateToPrescription }) => (
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
          <h4 className="font-semibold text-gray-800">Dr. {appointment.doctor.name}</h4>
          <p className="text-sm text-gray-500">{appointment.date}</p>
        </div>
      </div>
      {appointment.prescriptionId && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onNavigateToPrescription(appointment.prescriptionId); 
          }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg">
          View Prescription
        </button>
      )}
      {!appointment.prescriptionId && !isActive && (
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
        <h4 className="font-semibold text-gray-800">{prescription.pharmacy.name}</h4>
        <p className="text-sm text-gray-500 flex items-center">
          <Truck className="w-4 h-4 mr-1" />
           Status: {prescription.status}
        </p>
      </div>
      <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-300'} transition-colors`}></div>
    </div>
  </div>
);

// Enhanced Delivery Progress Component
const DeliveryProgress = ({ prescription }) => {
    // This is a simplified static mapping. A real app might get this from the prescription object itself.
    const getSteps = (status) => {
        const baseSteps = [
            { name: 'Order Confirmed', icon: '📝', completed: false },
            { name: 'Order Packed', icon: '📦', completed: false },
            { name: 'Shipped', icon: '🚚', completed: false },
            { name: 'Delivered', icon: '✅', completed: false },
        ];

        if (!status) return baseSteps;

        if (status.toLowerCase().includes('confirmed')) {
            baseSteps[0].completed = true;
        }
        if (status.toLowerCase().includes('packed')) {
            baseSteps[0].completed = true;
            baseSteps[1].completed = true;
        }
        // Add more status checks as needed
        
        return baseSteps;
    };
    
    const steps = prescription ? getSteps(prescription.status) : [];

  return (
    // ... JSX for delivery progress remains the same
    <div className="space-y-4">
      {steps.length > 0 && prescription ? (
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
              <p className={`font-semibold ${step.completed ? 'text-green-700' : 'text-gray-800'}`}>{step.name}</p>
            </div>
            {step.completed && <CheckCircle className="w-6 h-6 text-green-500" />}
            {index < steps.length - 1 && (
              <div className={`absolute left-6 top-16 w-0.5 h-4 ${step.completed ? 'bg-green-300' : 'bg-gray-300'}`}></div>
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
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [allPrescriptions, setAllPrescriptions] = useState([]); // Holds ALL prescriptions for summary views
  const [paidPrescriptions, setPaidPrescriptions] = useState([]); // Holds only PAID prescriptions for delivery section
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const navigate = useNavigate();

  const handleNavigateToPrescription = (preId) => {
    navigate(`/prescription/${preId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsResponse, prescriptionsResponse] = await Promise.all([
          fetch('http://localhost:8080/patient/getAllAppoinments', { credentials: 'include' }),
          fetch('http://localhost:8080/patient/getAllPrescriptions', { credentials: 'include' })
        ]);

        const [appointmentsData, prescriptionsData] = await Promise.all([
          appointmentsResponse.json(),
          prescriptionsResponse.json()
        ]);

        if (appointmentsData.success && prescriptionsData.success) {
          const fetchedAppointments = appointmentsData.data;
          const fetchedPrescriptions = prescriptionsData.data;

          // Store all prescriptions for use in the summary view
          setAllPrescriptions(fetchedPrescriptions);

          // 1. --- Filter for the "Prescriptions & Delivery" section ---
          // Shows only prescriptions that have been paid for and confirmed.
          const paidList = fetchedPrescriptions.filter(p => 
            p.diliveryMethod === 'paid' && p.status === 'order confirmed'
          );
          // console.log(recentList);
          setPaidPrescriptions(paidList);

          // Create a Set of appointment IDs from the paid prescriptions for efficient lookup
          const paidPrescriptionAppointmentIds = new Set(paidList.map(p => p.appoinment.aid));

          // 2. --- Filter for the "Recent Appointments" section ---
          // Shows completed/paid appointments where the prescription has NOT been paid/confirmed yet.
          const recentList = fetchedAppointments
            .filter(appt => appt.status === 'completed' && appt.paymentState === 'paid')
            .filter(appt => {
              // Keep the appointment only if its ID is NOT in the set of paid prescription appointments
              return !paidPrescriptionAppointmentIds.has(appt.aid);
            })
            .map(appt => {
              // Still find the matching prescription to get its ID for the button
              const matchingPrescription = fetchedPrescriptions.find(p => p.appoinment?.aid === appt.aid);
              return {
                ...appt,
                prescriptionId: matchingPrescription?.preId
              };
            })
            .filter(appt => appt.prescriptionId); // Ensure it has a prescription linked

          console.log(recentList);
          setCompletedAppointments(recentList);

          // 3. --- Filter for "Upcoming Appointments" (logic is unchanged) ---
          const upcoming = fetchedAppointments.filter(appt => appt.status === 'scheduled' && appt.paymentState === 'paid');
          setUpcomingAppointments(upcoming);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header and Quick Stats sections remain the same */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 py-8">
            <h1 className="text-4xl font-bold mb-2">Welcome back, Eshan!</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg">
                <p>Upcoming</p><p className="text-3xl font-bold">{upcomingAppointments.length}</p><p>Appointments</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-2xl p-6 shadow-lg">
                <p>Active</p><p className="text-3xl font-bold">{paidPrescriptions.length}</p><p>Prescriptions</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl p-6 shadow-lg">
                <p>Pending</p><p className="text-3xl font-bold">{completedAppointments.length}</p><p>Prescriptions</p>
            </div>
             <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl p-6 shadow-lg">
                <p>Health</p><p className="text-3xl font-bold">98%</p><p>Score</p>
            </div>
        </div>

        {/* Appointments Section */}
        <section className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Upcoming Appointments</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appt, index) => (
                <AppointmentCard key={index} {...appt} />
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-2">No upcoming appointments found.</p>
            )}
          </div>
        </section>

        {/* Completed Appointments (leading to unpaid prescriptions) Section */}
        <section className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Recent Appointments</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {completedAppointments.length > 0 ? (
                completedAppointments.map(appt => (
                  <CompletedAppointmentCard
                    key={appt.aid}
                    appointment={appt}
                    onClick={() => setSelectedAppointment(appt)}
                    isActive={selectedAppointment?.aid === appt.aid}
                    onNavigateToPrescription={handleNavigateToPrescription}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-center">No recent appointments awaiting prescription payment.</p>
              )}
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6">
              {selectedAppointment ? (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800">Appointment Summary</h3>
                  <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <h4 className="font-semibold text-blue-600 mb-2 flex items-center"><Pill className="w-5 h-5 mr-2" />Prescriptions</h4>
                    <ul className="list-disc list-inside text-gray-700">
                      {/* IMPORTANT: Filter from allPrescriptions to show details regardless of payment status */}
                      {allPrescriptions
                        .filter(p => p.appoinment.aid === selectedAppointment.aid)
                        .flatMap(p => p.items)
                        .map((item, index) => (
                          <li key={index}><strong>{item.name}:</strong> {item.dosage}, {item.frequency}.</li>
                        ))}
                    </ul>
                  </div>
                  <div className="bg-white rounded-2xl p-5 shadow-sm">
                    <h4 className="font-semibold text-green-600 mb-2 flex items-center"><Stethoscope className="w-5 h-5 mr-2" />Doctor's Advice</h4>
                    <p className="text-gray-700">{allPrescriptions.find(p => p.appoinment.aid === selectedAppointment.aid)?.note || 'No specific advice found.'}</p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <CheckCircle className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-lg font-medium">Select an appointment</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Paid & Confirmed Prescriptions Section */}
        <section className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Prescriptions & Delivery</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {paidPrescriptions.length > 0 ? (
                paidPrescriptions.map((p) => (
                  <PrescriptionCard
                    key={p.preId}
                    prescription={p}
                    onClick={() => setSelectedPrescription(p)}
                    isActive={p.preId === selectedPrescription?.preId}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-center">No active prescription deliveries.</p>
              )}
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center"><Truck className="w-6 h-6 mr-2 text-green-600" />Delivery Progress</h3>
              <DeliveryProgress prescription={selectedPrescription} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;