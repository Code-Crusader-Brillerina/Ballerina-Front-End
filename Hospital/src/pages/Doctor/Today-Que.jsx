import React, { useState } from "react";
import { FaUserInjured } from "react-icons/fa";
import CalendarSection from "../../components/Doctor/DoctorQue/CalendarSection";
import StatsSection from "../../components/Doctor/DoctorQue/StatsSection";
import PatientFilters from "../../components/Doctor/DoctorQue/PatientFilters";
import PatientCard from "../../components/Doctor/DoctorQue/PatientCard";

const TodayQue = () => {
  const [date, setDate] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState("all");

  const patients = [
    {
      name: "Kavinda Perera",
      gender: "Male",
      age: 32,
      patientId: "PID343",
      address: "123, Galle Road, Colombo 03",
      university: "NHS Colombo University",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      status: "waiting",
      time: "09:30 AM"
    },
    {
      name: "Nimali Fernando",
      gender: "Female",
      age: 28,
      patientId: "PID422",
      address: "45, Kandy Road, Peradeniya",
      university: "University of Peradeniya",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      status: "in-progress",
      time: "10:15 AM"
    },
    {
      name: "Raj Sharma",
      gender: "Male",
      age: 45,
      patientId: "PID187",
      address: "78, Gampaha Road, Ja-Ela",
      university: "Sri Jayewardenepura University",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      status: "completed",
      time: "08:45 AM"
    },
    {
      name: "Sunethra Bandara",
      gender: "Female",
      age: 65,
      patientId: "PID599",
      address: "22, Temple Street, Anuradhapura",
      university: "Rajarata University",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      status: "waiting",
      time: "11:00 AM"
    },
    {
      name: "Dinesh Silva",
      gender: "Male",
      age: 19,
      patientId: "PID276",
      address: "9, Beach Road, Negombo",
      university: "Ocean University",
      image: "https://randomuser.me/api/portraits/men/19.jpg",
      status: "waiting",
      time: "11:30 AM"
    },
  ];

  const filteredPatients =
    activeFilter === "all"
      ? patients
      : patients.filter((p) => p.status === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-teal-900 flex items-center">
          <FaUserInjured className="mr-3 text-teal-600" />
          Doctor Dashboard
        </h1>
        <p className="text-teal-700 mt-2">
          Welcome, Dr. Perera. You have{" "}
          {patients.filter((p) => p.status === "waiting").length} patients
          waiting today.
        </p>
      </div>

      {/* Filters */}
      <PatientFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {/* Calendar + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <CalendarSection date={date} setDate={setDate} />
        <StatsSection totalPatients={patients.length} completed={2} />
      </div>

      {/* Patient List */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-teal-900 mb-4">
          Today's Patients
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPatients.map((p, index) => (
            <PatientCard key={index} patient={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodayQue;
