import React, { useState } from "react";
import AppointmentCard from "../../components/Doctor/DoctorAppointment/AppointmentCard";

const DoctorAppointment = () => {
  // Today's date
  const today = new Date();
  const todayString = today.toISOString().split("T")[0];

  const formattedToday = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Sample appointment data
  const appointments = [
    {
      id: 1,
      patientName: "Kavindha Perera",
      gender: "Male",
      age: 34,
      date: "2025-08-10",
      time: "10:30 AM",
      status: "completed",
      reason: "Annual Checkup",
      avatarColor: "bg-gradient-to-r from-purple-500 to-indigo-600"
    },
    {
      id: 2,
      patientName: "Nethmi Fernando",
      gender: "Female",
      age: 29,
      date: todayString,
      time: "02:15 PM",
      status: "in-progress",
      reason: "Flu Symptoms",
      avatarColor: "bg-gradient-to-r from-pink-500 to-rose-500"
    },
    {
      id: 3,
      patientName: "Sahan Wickramasinghe",
      gender: "Male",
      age: 41,
      date: "2025-08-15",
      time: "09:00 AM",
      status: "scheduled",
      reason: "Follow-up Appointment",
      avatarColor: "bg-gradient-to-r from-blue-500 to-cyan-500"
    },
    {
      id: 4,
      patientName: "Amaya Bandara",
      gender: "Female",
      age: 52,
      date: "2025-08-05",
      time: "11:45 AM",
      status: "completed",
      reason: "Vaccination",
      avatarColor: "bg-gradient-to-r from-amber-500 to-orange-500"
    },
    {
      id: 5,
      patientName: "Dilshan Rajapaksa",
      gender: "Male",
      age: 67,
      date: "2025-08-18",
      time: "03:30 PM",
      status: "scheduled",
      reason: "Cardiology Consultation",
      avatarColor: "bg-gradient-to-r from-emerald-500 to-teal-600"
    },
    {
      id: 6,
      patientName: "Chamari Atapattu",
      gender: "Female",
      age: 38,
      date: todayString,
      time: "04:00 PM",
      status: "scheduled",
      reason: "Physical Therapy",
      avatarColor: "bg-gradient-to-r from-violet-500 to-fuchsia-500"
    }
  ];

  // Separate appointments
  const pastAppointments = appointments.filter((a) => a.date < todayString);
  const presentAppointments = appointments.filter((a) => a.date === todayString);
  const futureAppointments = appointments.filter((a) => a.date > todayString);

  const [activeTab, setActiveTab] = useState("today");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
              Appointment History
            </h1>
            <div className="bg-white rounded-xl shadow-lg py-2 px-6 inline-block">
              <p className="text-gray-600 font-medium">{formattedToday}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-gradient-to-r from-indigo-500 to-violet-600 rounded-2xl shadow-lg p-5 text-white">
            <h3 className="font-medium">Total Appointments</h3>
            <p className="text-3xl font-bold mt-2">{appointments.length}</p>
          </div>
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg p-5 text-white">
            <h3 className="font-medium">Completed</h3>
            <p className="text-3xl font-bold mt-2">{pastAppointments.length}</p>
          </div>
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-lg p-5 text-white">
            <h3 className="font-medium">Scheduled</h3>
            <p className="text-3xl font-bold mt-2">{futureAppointments.length}</p>
          </div>
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl shadow-lg p-5 text-white">
            <h3 className="font-medium">Today</h3>
            <p className="text-3xl font-bold mt-2">{presentAppointments.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="flex border-b border-gray-200">
            <button 
              onClick={() => setActiveTab("today")} 
              className={`px-6 py-4 font-medium text-sm ${activeTab === "today" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
            >
              Today's Appointments ({presentAppointments.length})
            </button>
            <button 
              onClick={() => setActiveTab("upcoming")} 
              className={`px-6 py-4 font-medium text-sm ${activeTab === "upcoming" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
            >
              Upcoming ({futureAppointments.length})
            </button>
            <button 
              onClick={() => setActiveTab("past")} 
              className={`px-6 py-4 font-medium text-sm ${activeTab === "past" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500"}`}
            >
              History ({pastAppointments.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "today" && (
              presentAppointments.length > 0
                ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {presentAppointments.map(appt => <AppointmentCard key={appt.id} appt={appt} />)}
                  </div>
                : <p className="text-center text-gray-500">No Appointments Today</p>
            )}
            {activeTab === "upcoming" && (
              futureAppointments.length > 0
                ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {futureAppointments.map(appt => <AppointmentCard key={appt.id} appt={appt} />)}
                  </div>
                : <p className="text-center text-gray-500">No Upcoming Appointments</p>
            )}
            {activeTab === "past" && (
              pastAppointments.length > 0
                ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {pastAppointments.map(appt => <AppointmentCard key={appt.id} appt={appt} />)}
                  </div>
                : <p className="text-center text-gray-500">No Past Appointments</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-sm mt-8">
          <p>© 2025 MediCare Clinic. All appointments are confidential.</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointment;
