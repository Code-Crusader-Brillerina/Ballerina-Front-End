
import React from 'react';

const Header = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) => {
  const categories = ["All", "Antibiotics", "Painkillers", "Antihistamines", "Gastro", "Diabetes", "Cardiovascular", "Hormones"];
  
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white rounded-2xl p-6 shadow-sm">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-indigo-900">Pharmacy Medicine Stock</h1>
        <p className="text-sm text-indigo-600 mt-1">Live inventory overview with reorder thresholds</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <div className="relative w-full">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search medicine…"
            className="pl-10 pr-4 py-2 w-full rounded-2xl bg-white shadow-sm ring-1 ring-indigo-100 focus:ring-2 focus:ring-indigo-300 outline-none"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded-2xl bg-white shadow-sm ring-1 ring-indigo-100 focus:ring-2 focus:ring-indigo-300"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Header;