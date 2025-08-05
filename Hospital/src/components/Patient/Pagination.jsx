import React from 'react';

const Pagination = () => (
  <div className="flex justify-center mt-8 space-x-2">
    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 text-white">1</button>
    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300">2</button>
    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300">3</button>
  </div>
);

export default Pagination;