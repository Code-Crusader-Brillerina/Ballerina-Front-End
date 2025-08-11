import React from 'react';
import { FaChartLine } from 'react-icons/fa';

const ChartCard = ({ title, value, percentage, subtitle, color }) => {
  const isPositive = percentage.startsWith('+');
  const textColorClass = isPositive ? 'text-green-500' : 'text-red-500';

  // Function to get a simple placeholder SVG for the chart
  const getChartSVG = (chartColor) => {
    // In a real app, you would use a charting library here.
    const pathData = "M0,15 C20,5 40,15 60,10 C80,5 100,15";
    return (
      <svg className="w-full h-16 mt-4" viewBox="0 0 100 20" preserveAspectRatio="none">
        <path d={pathData} stroke={chartColor} fill="none" strokeWidth="2" />
      </svg>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <div className="flex items-center space-x-1 text-sm">
            <span className={`font-semibold ${textColorClass}`}>{percentage}</span>
            {/* Using a simple chart line icon from FaChartLine as a placeholder */}
            <FaChartLine className={`w-4 h-4 ${textColorClass}`} />
          </div>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
        {/* Placeholder for menu icon (three dots) */}
        <svg className="w-5 h-5 text-gray-400 cursor-pointer" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0110-4 2 2 0 010 4zm0 8a2 2 0110-4 2 2 0 010 4z"/>
        </svg>
      </div>

      {/* Renders the SVG chart */}
      {getChartSVG(isPositive ? "#10B981" : "#EF4444")}
    </div>
  );
};

export default ChartCard;