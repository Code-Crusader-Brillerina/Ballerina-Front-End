import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

const PrescriptionRow = ({
  index,
  prescription,
  onChange,
  onRemove,
  onAdd,
  isLast,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4">
      <input
        type="text"
        placeholder="Medicine Name"
        value={prescription.medicine}
        onChange={(e) => onChange(index, "medicine", e.target.value)}
        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
        required
      />
      <input
        type="text"
        placeholder="Dosage (e.g. 500mg)"
        value={prescription.dosage}
        onChange={(e) => onChange(index, "dosage", e.target.value)}
        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
        required
      />
      <input
        type="text"
        placeholder="Duration (e.g. 5 days)"
        value={prescription.duration}
        onChange={(e) => onChange(index, "duration", e.target.value)}
        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400"
        required
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
        >
          <FaTrash />
        </button>
        {isLast && (
          <button
            type="button"
            onClick={onAdd}
            className="p-3 bg-green-100 text-green-600 rounded-lg hover:bg-green-200"
          >
            <FaPlus />
          </button>
        )}
      </div>
    </div>
  );
};

export default PrescriptionRow;
