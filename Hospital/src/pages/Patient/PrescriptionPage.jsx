// PrescriptionPage.jsx

import React from 'react';
import { useParams } from 'react-router-dom';
import PrescriptionDetails from '../../components/Patient/prescriptionPage/PrescriptionDetails';
import SelectedPharmaciesSection from '../../components/Patient/prescriptionPage/SelectedPharmaciesSection';

// Placeholder data for completed appointments to match the data in CompletedAppointmentsSection
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
    prescription: 'Apply Hydrocortisone cream twice daily to the affected area. Avoid direct sun exposure.',
    adviser: 'Keep the skin moisturized and use a gentle, fragrance-free soap.',
  },
  {
    id: 3,
    doctor: 'Dr. Maya Fornado - Physiologist',
    date: 'Nov 10, 2025',
    prescription: 'Start physical therapy exercises. Use a cold pack for 15 minutes after each session.',
    adviser: 'Avoid heavy lifting and report any new pain to the therapist.',
  },
];

const PrescriptionPage = () => {
  const { id } = useParams();
  const appointment = completedAppointments.find(appt => appt.id === parseInt(id));

  // Handle case where appointment is not found
  if (!appointment) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Prescription Not Found</h1>
        <p>The requested prescription could not be found.</p>
      </div>
    );
  }

  const doctorInfo = {
    name: appointment.doctor.split(' - ')[0].replace('Dr. ', ''),
    specialty: appointment.doctor.split(' - ')[1],
    phone: '+1 555-123-4567', // Static phone number for now
  };

  const patientInfo = {
    name: 'Sarah Johnson', // Static patient name
    date: appointment.date,
    age: 32, // Static age
    gender: 'Female', // Static gender
  };

  const prescriptions = [
    appointment.prescription,
  ];

  const advice = appointment.adviser;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Prescription</h1>
      
      <PrescriptionDetails
        doctor={doctorInfo}
        patient={patientInfo}
        prescriptions={prescriptions}
        advice={advice}
      />
      
      <SelectedPharmaciesSection />
    </div>
  );
};

export default PrescriptionPage;