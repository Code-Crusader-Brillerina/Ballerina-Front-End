import React, { useState } from "react";
import { FaPills, FaNotesMedical, FaUserMd, FaHospital, FaUserInjured, FaCapsules, FaFilePrescription, FaTruck, FaSyncAlt } from "react-icons/fa";

export default function PrescriptionCard() {
  const [deliveryType, setDeliveryType] = useState("");
  const [status, setStatus] = useState("");

  const medications = [
    { id: 1, name: "Paracetamol", dosage: "500 mg", form: "Tablet", instructions: "1 tablet every 6 hours after food", duration: "3 days" },
    { id: 2, name: "Omeprazole", dosage: "20 mg", form: "Capsule", instructions: "1 capsule once daily before breakfast", duration: "5 days" },
    { id: 3, name: "Amoxicillin", dosage: "500 mg", form: "Capsule", instructions: "1 capsule every 8 hours", duration: "7 days" }
  ];

  const advice = {
    text: "Advice: Drink plenty of fluids, rest, and avoid cold beverages.\nFollow-up: After 5 days or if symptoms worsen."
  };

  const handleUpdate = () => {
    alert(`Delivery Type: ${deliveryType}, Status: ${status}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden w-full max-w-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <FaFilePrescription className="text-3xl mr-3" />
              <div>
                <h1 className="text-2xl font-bold">Medical Prescription</h1>
                <p className="text-blue-100">#PR-1072</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
              <span className="inline-block w-3 h-3 bg-green-400 rounded-full mr-2"></span>
              Active
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Doctor & Patient Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-3 rounded-xl mr-4">
                  <FaUserMd className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 font-medium">Prescribed By</h3>
                  <p className="font-bold text-gray-800">Dr. Jack R. Frost, LCDR, MD</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-xl mr-4">
                  <FaHospital className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 font-medium">Facility</h3>
                  <p className="font-bold text-gray-800">U.S.S. Neverforgotten (DD 178)</p>
                </div>
              </div>
            </div>
            
            <div className="bg-cyan-50 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="bg-cyan-100 p-3 rounded-xl mr-4">
                  <FaUserInjured className="text-cyan-600 text-xl" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 font-medium">Patient</h3>
                  <p className="font-bold text-gray-800">John R. Doe, HM3, USN</p>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p><span className="font-medium">DOB:</span> 23 Jan 1999</p>
                <p><span className="font-medium">Issued:</span> 12 Aug 2023</p>
              </div>
            </div>
          </div>

          {/* Prescription Details */}
          <div className="bg-gray-50 rounded-xl p-5 mb-8">
            <h3 className="font-bold text-gray-700 mb-3 flex items-center">
              <FaFilePrescription className="mr-2 text-blue-500" />
              Prescription Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600"><span className="font-medium">Medication:</span> Tr. Belladonna (15ml) + Amphogel q.s.ad (120 ml)</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Dosage:</span> 5ml three times daily before meals</p>
              </div>
              <div>
                <p className="text-sm text-gray-600"><span className="font-medium">Manufacturer:</span> Wyeth (Lot P39K106)</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Expiration:</span> Dec 2002</p>
              </div>
            </div>
          </div>

          {/* Medication List */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-700 mb-4 flex items-center">
              <FaPills className="mr-2 text-blue-500" />
              Medications
            </h3>
            <div className="space-y-4">
              {medications.map((med) => (
                <div key={med.id} className="flex items-start border border-gray-200 rounded-xl p-4 bg-white hover:bg-blue-50 transition-colors">
                  <div className="bg-blue-100 p-3 rounded-xl mr-4">
                    <FaCapsules className="text-blue-600 text-xl" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-800">{med.name} <span className="font-normal text-gray-600">{med.dosage}</span></h4>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{med.form}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{med.instructions}</p>
                    <p className="text-sm text-gray-500">Duration: {med.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advice Section */}
          <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-5 mb-8">
            <div className="flex items-start">
              <div className="bg-yellow-100 p-3 rounded-xl mr-4">
                <FaNotesMedical className="text-yellow-600 text-xl" />
              </div>
              <div>
                <h3 className="font-bold text-gray-700 mb-2">Medical Advice</h3>
                <p className="text-gray-700 whitespace-pre-line">{advice.text}</p>
              </div>
            </div>
          </div>

          {/* Delivery and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Type</label>
              <div className="relative">
                <select
                  className="w-full border border-gray-300 rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 appearance-none"
                  value={deliveryType}
                  onChange={(e) => setDeliveryType(e.target.value)}
                >
                  <option value="">Select delivery type</option>
                  <option value="pickup">Pharmacy Pickup</option>
                  <option value="homeDelivery">Home Delivery</option>
                </select>
                <FaTruck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="relative">
                <select
                  className="w-full border border-gray-300 rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 appearance-none"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select status</option>
                  <option value="processing">Processing</option>
                  <option value="ready">Ready for Pickup</option>
                  <option value="delivered">Delivered</option>
                </select>
                <FaSyncAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleUpdate}
            className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white py-3 rounded-xl font-medium shadow-md transition-all transform hover:scale-[1.02]"
          >
            Update Prescription
          </button>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 text-center text-xs text-gray-500">
          <p>© 2023 Medical Prescription System. All prescriptions are digitally signed and secured.</p>
        </div>
      </div>
    </div>
  );
}
