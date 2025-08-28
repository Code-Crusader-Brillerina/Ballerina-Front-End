import React from "react";
import { useNavigate } from "react-router-dom";
import PrescriptionStats from "../../components/Pharmacy/PharmacyPrescription/PrescriptionStats";
import PrescriptionCard from "../../components/Pharmacy/PharmacyPrescription/PrescriptionCard";

function PharmacyPrescriptionPage() {
  const navigate = useNavigate();

  const prescriptions = [
    {
      id: 1,
      patientName: "Kavinda Perera",
      age: 30,
      address: "123, Galle Road, Colombo 03",
      status: "Processing",
      date: "2023-08-15",
      time: "11:20 AM",
      medications: [
        { name: "Amoxicillin", dosage: "500mg", frequency: "Three times daily", duration: "7 days" },
        { name: "Paracetamol", dosage: "500mg", frequency: "As needed", duration: "3 days" }
      ],
      doctor: "Dr. Sanjay Kumar",
      clinic: "Metropolitan Health Center",
      notes: "Complete the full course even if symptoms improve",
      category: "Antibiotics",
      categoryIcon: "💊"
    },
    {
      id: 2,
      patientName: "Nimali Silva",
      age: 45,
      address: "456, Kandy Road, Kadawatha",
      status: "Ready",
      date: "2023-08-14",
      time: "03:40 PM",
      medications: [
        { name: "Azithromycin", dosage: "250mg", frequency: "Once daily", duration: "5 days" }
      ],
      doctor: "Dr. Lakshmi Wijesinghe",
      clinic: "Central Pharmacy Clinic",
      notes: "Take 1 hour before or 2 hours after meals",
      category: "Antibiotics",
      categoryIcon: "💊"
    },
    {
      id: 3,
      patientName: "Sunil Fernando",
      age: 28,
      address: "789, Negombo Road, Wattala",
      status: "Processing",
      date: "2023-08-15",
      time: "10:05 AM",
      medications: [
        { name: "Cephalexin", dosage: "500mg", frequency: "Four times daily", duration: "10 days" },
        { name: "Ibuprofen", dosage: "400mg", frequency: "Twice daily", duration: "5 days" }
      ],
      doctor: "Dr. Ajith Rathnayake",
      clinic: "Northern Health Services",
      notes: "May cause stomach upset - take with food if needed",
      category: "Antibiotics",
      categoryIcon: "💊"
    },
    {
      id: 4,
      patientName: "Priyanka Rathnayake",
      age: 35,
      address: "321, Havelock Road, Colombo 05",
      status: "Ready",
      date: "2023-08-14",
      time: "10:30 AM",
      medications: [
        { name: "Paracetamol", dosage: "500mg", frequency: "Twice daily", duration: "5 days" },
        { name: "Ibuprofen", dosage: "400mg", frequency: "As needed", duration: "7 days" }
      ],
      doctor: "Dr. Samantha Perera",
      clinic: "City Medical Center",
      notes: "Take after meals to avoid stomach upset",
      category: "Painkillers",
      categoryIcon: "🩹"
    },
    {
      id: 5,
      patientName: "Rajiv Bandara",
      age: 52,
      address: "654, Matara Road, Kalutara",
      status: "Completed",
      date: "2023-08-13",
      time: "02:15 PM",
      medications: [
        { name: "Tramadol", dosage: "50mg", frequency: "Every 6 hours", duration: "3 days" }
      ],
      doctor: "Dr. Ravi De Silva",
      clinic: "Coastal Health Clinic",
      notes: "May cause drowsiness - avoid driving",
      category: "Painkillers",
      categoryIcon: "🩹"
    },
    {
      id: 6,
      patientName: "Anjali Weerasinghe",
      age: 29,
      address: "987, Gampaha Road, Ja-Ela",
      status: "Processing",
      date: "2023-08-15",
      time: "09:45 AM",
      medications: [
        { name: "Aspirin", dosage: "81mg", frequency: "Once daily", duration: "30 days" },
        { name: "Naproxen", dosage: "220mg", frequency: "Twice daily", duration: "10 days" }
      ],
      doctor: "Dr. Nirmala Fernando",
      clinic: "Western Medical Associates",
      notes: "Take with food",
      category: "Painkillers",
      categoryIcon: "🩹"
    },
    {
      id: 7,
      patientName: "Malini Jayawardena",
      age: 68,
      address: "55, Independence Avenue, Colombo 07",
      status: "Ready",
      date: "2023-08-14",
      time: "09:15 AM",
      medications: [
        { name: "Atorvastatin", dosage: "40mg", frequency: "Once daily", duration: "30 days" },
        { name: "Metoprolol", dosage: "50mg", frequency: "Twice daily", duration: "30 days" }
      ],
      doctor: "Dr. Priyantha Abeysekara",
      clinic: "CardioCare Center",
      notes: "Monitor blood pressure weekly",
      category: "Heart Medications",
      categoryIcon: "❤️"
    },
    {
      id: 8,
      patientName: "Ranjith Gamage",
      age: 58,
      address: "22, Temple Road, Kandy",
      status: "Processing",
      date: "2023-08-15",
      time: "01:30 PM",
      medications: [
        { name: "Metformin", dosage: "850mg", frequency: "Twice daily", duration: "30 days" },
        { name: "Insulin Glargine", dosage: "20 units", frequency: "Once daily", duration: "30 days" }
      ],
      doctor: "Dr. Anoma Bandara",
      clinic: "Endocrine Specialists",
      notes: "Check fasting blood sugar every morning",
      category: "Diabetes Management",
      categoryIcon: "🩸"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* ✅ Keep your original header design */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-3 rounded-xl mr-3 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Pharmacy Prescription Management</h1>
              <p className="text-gray-600 mt-2">
                Manage all patient prescriptions in one place
              </p>
            </div>
          </div>
        </div>

        {/* ✅ Stats component */}
        <PrescriptionStats prescriptions={prescriptions} />

        {/* ✅ Prescription cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {prescriptions.map((prescription) => (
            <PrescriptionCard
              key={prescription.id}
              prescription={prescription}
              onClick={() => navigate(`/pharmacy/pharmacyprescriptiondetails/${prescription.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PharmacyPrescriptionPage;
