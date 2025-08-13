// src/components/MedicineTable.js
import React from 'react';

const MedicineTable = ({ medicines }) => {
  // Function to determine status based on stock level
  const getStatus = (stock, reorderLevel) => {
    if (stock === 0) return { text: "Out of Stock", color: "bg-red-100 text-red-700" };
    if (stock <= reorderLevel) return { text: "Low Stock", color: "bg-yellow-100 text-yellow-700" };
    return { text: "In Stock", color: "bg-green-100 text-green-700" };
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h3 className="font-semibold text-indigo-900 text-lg">Medicine Stock Inventory</h3>
      </div>
      
      <div className="overflow-x-auto rounded-xl border border-indigo-100">
        <table className="min-w-full text-sm">
          <thead className="bg-indigo-50">
            <tr className="text-left text-indigo-700">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Medicine</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4">Reorder Level</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine, index) => {
              const status = getStatus(medicine.stock, medicine.reorderLevel);
              return (
                <tr key={medicine.id} className="border-b border-indigo-50 hover:bg-indigo-50/40">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-medium text-indigo-900">{medicine.name}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">
                      {medicine.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium">{medicine.stock}</td>
                  <td className="py-3 px-4">{medicine.reorderLevel}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${status.color}`}>
                      {status.text}
                    </span>
                  </td>
                </tr>
              );
            })}
            {medicines.length === 0 && (
              <tr>
                <td colSpan="6" className="py-6 text-center text-indigo-500">
                  No medicines found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <p className="text-sm text-indigo-600">
          Showing <span className="font-medium">{medicines.length}</span> medicines
        </p>
        <div className="flex space-x-2">
          <button className="px-3 py-1.5 rounded-lg bg-white border border-indigo-200 text-indigo-700">
            Previous
          </button>
          <button className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MedicineTable;