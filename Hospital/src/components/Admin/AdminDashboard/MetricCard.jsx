import React from 'react';

const MetricCard = ({ icon: Icon, title, value, percentage, color }) => {
  const isPositive = percentage.startsWith('+');
  const textColorClass = isPositive ? 'text-green-500' : 'text-red-500';
  const iconBgClass = `bg-${color}-100`;
  const iconColorClass = `text-${color}-500`;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
      <div className="flex items-center">
        <div className={`p-3 rounded-full mr-4 ${iconBgClass}`}>
          <Icon className={`text-xl ${iconColorClass}`} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-semibold text-sm ${textColorClass}`}>{percentage}</p>
      </div>
    </div>
  );
};

export default MetricCard;