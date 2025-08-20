import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import PrescriptionRow from "../../components/Doctor/DoctorAddPrescription/PrescriptionRow";

const PrescriptionPage = () => {
  const navigate = useNavigate();
  const { pid } = useParams(); // 👈 Get pid here
  const [prescriptions, setPrescriptions] = useState([
    { medicine: "", dosage: "", duration: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...prescriptions];
    updated[index][field] = value;
    setPrescriptions(updated);
  };

  const addPrescription = () => {
    setPrescriptions([
      ...prescriptions,
      { medicine: "", dosage: "", duration: "" },
    ]);
  };

  const removePrescription = (index) => {
    setPrescriptions(prescriptions.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("PID:", pid); 
    console.log("Prescription Data:", prescriptions);
    alert(`Prescription for patient ${pid} saved!`);
    navigate("/doctor/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-teal-600 hover:underline"
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      {/* Title */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-teal-800 mb-4">
          Prescription for Patient {pid}
        </h1>

        <form onSubmit={handleSubmit}>
          {prescriptions.map((prescription, index) => (
            <PrescriptionRow
              key={index}
              index={index}
              prescription={prescription}
              onChange={handleChange}
              onRemove={removePrescription}
              onAdd={addPrescription}
              isLast={index === prescriptions.length - 1}
            />
          ))}

          {/* Submit */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-3 rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Save Prescription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrescriptionPage;
