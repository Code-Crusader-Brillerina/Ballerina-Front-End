
import React from 'react';

const StatsCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* In Stock Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-green-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-indigo-900">In Stock</h3>
            <p className="text-sm text-indigo-500">Above reorder level</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">Good</span>
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold text-indigo-900">{stats.inStock}</p>
          <p className="text-xs text-indigo-500 mt-1">Medicines</p>
        </div>
      </div>
      
      {/* Low Stock Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-yellow-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-indigo-900">Low Stock</h3>
            <p className="text-sm text-indigo-500">At or below reorder</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">Warning</span>
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold text-indigo-900">{stats.lowStock}</p>
          <p className="text-xs text-indigo-500 mt-1">Medicines</p>
        </div>
      </div>
      
      {/* Out of Stock Card */}
      <div className="bg-white rounded-2xl p-5 shadow-sm ring-1 ring-red-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-indigo-900">Out of Stock</h3>
            <p className="text-sm text-indigo-500">Needs urgent restock</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-700">Critical</span>
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold text-indigo-900">{stats.outOfStock}</p>
          <p className="text-xs text-indigo-500 mt-1">Medicines</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;