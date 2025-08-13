import React from "react";

const PatientDetailsTab = () => (
  <>
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Patient Overview</h3>
      <p className="text-gray-600">
        Mr. Kavindha Perera presented as a patient at our facility for
        medical evaluation and care. The patient was examined and relevant
        diagnostic assessments were carried out. Clinical findings,
        observations, and treatment recommendations were documented in the
        patient's medical record.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100">
        <h4 className="font-medium text-blue-800 mb-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Current Medications
        </h4>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>Metformin 500mg - Twice daily</li>
          <li>Lisinopril 10mg - Once daily</li>
          <li>Atorvastatin 20mg - At bedtime</li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
        <h4 className="font-medium text-green-800 mb-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          Allergies
        </h4>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li>Penicillin - Skin rash, difficulty breathing</li>
          <li>Sulfa drugs - Nausea, vomiting</li>
        </ul>
      </div>
    </div>

    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl border border-purple-100">
      <h4 className="font-medium text-purple-800 mb-3 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        Recent Vital Signs
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="text-center">
          <div className="text-sm text-gray-500">Blood Pressure</div>
          <div className="font-bold text-gray-800">120/80 mmHg</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Heart Rate</div>
          <div className="font-bold text-gray-800">72 bpm</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Temperature</div>
          <div className="font-bold text-gray-800">98.6°F</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500">Oxygen</div>
          <div className="font-bold text-gray-800">98%</div>
        </div>
      </div>
    </div>
  </>
);

export default PatientDetailsTab;
