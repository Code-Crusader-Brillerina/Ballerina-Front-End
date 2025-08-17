import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PrescriptionDetails from '../../components/Patient/prescriptionPage/PrescriptionDetails';
import SelectedPharmaciesSection from '../../components/Patient/prescriptionPage/SelectedPharmaciesSection';
import { Package } from 'lucide-react';

const PrescriptionPage = () => {
  const { id } = useParams();

  // State for prescription details
  const [prescriptionData, setPrescriptionData] = useState(null);
  const [prescriptionLoading, setPrescriptionLoading] = useState(true);
  const [prescriptionError, setPrescriptionError] = useState(null);

  // State for pharmacy prices
  const [pharmacies, setPharmacies] = useState([]);
  const [pharmaciesLoading, setPharmaciesLoading] = useState(true);
  const [pharmaciesError, setPharmaciesError] = useState(null);


  useEffect(() => {
    // Function to fetch the main prescription details
    const fetchPrescription = async () => {
      try {
        setPrescriptionLoading(true);
        const response = await fetch('http://localhost:8080/patient/getPrescription', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ preId: id }),
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok && data.success) {
          setPrescriptionData(data.data);
        } else {
          setPrescriptionError(data.message || 'Failed to fetch prescription details.');
        }
      } catch (err) {
        setPrescriptionError('An error occurred while fetching data.');
      } finally {
        setPrescriptionLoading(false);
      }
    };

    // Function to fetch pharmacy prices based on the prescription
    const fetchPharmacies = async () => {
        try {
            setPharmaciesLoading(true);
            const response = await fetch('http://localhost:8080/patient/calculatePrescriptionPrices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ preId: id }),
                credentials: 'include',
            });
            const data = await response.json();
            if (response.ok && data.success) {
                setPharmacies(data.data);
            } else {
                setPharmaciesError(data.message || 'Failed to fetch pharmacy prices.');
            }
        } catch (err) {
            setPharmaciesError('An error occurred while fetching pharmacies.');
        } finally {
            setPharmaciesLoading(false);
        }
    };


    fetchPrescription();
    fetchPharmacies();
  }, [id]);

  if (prescriptionLoading) {
    return <div className="flex justify-center items-center min-h-screen"><p>Loading prescription details...</p></div>;
  }

  if (prescriptionError) {
    return (
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Error</h1>
        <p className="text-red-500">{prescriptionError}</p>
      </div>
    );
  }

  if (!prescriptionData) {
    return (
      <div className="container mx-auto p-4 md:p-8 text-center">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">Prescription not found.</p>
      </div>
    );
  }

  const { doctor, patient, items, note, appoinment } = prescriptionData;

  const doctorInfo = {
    name: doctor.name,
    specialty: doctor.specialization,
    licenseNomber: doctor.licenseNomber,
    phone: patient.phoneNumber,
  };

  const patientInfo = {
    name: patient.name,
    date: appoinment?.date,
    age: patient.DOB,
    gender: patient.gender,
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Prescription Details</h1>
      
      <PrescriptionDetails
        doctor={doctorInfo}
        patient={patientInfo}
        prescriptions={items}
        advice={note}
        appointment={appoinment}
      />
      
      <SelectedPharmaciesSection 
        pharmacies={pharmacies} 
        loading={pharmaciesLoading}
        error={pharmaciesError}
      />
    </div>
  );
};

export default PrescriptionPage;