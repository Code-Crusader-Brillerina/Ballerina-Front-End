import React from 'react';

// Added a `prescription` prop to make the component dynamic
const DeliveryProgress = ({ prescription }) => {
  // Placeholder data for demonstration. In a real app, this would be fetched from an API.
  const allSteps = {
    1: [ // Steps for prescription with ID 1
      { name: 'Order Confirmed', time: '10:00 PM, Nov 15, 2025', icon: '📝', completed: true },
      { name: 'Order Packed', time: '10:00 PM, Nov 15, 2025', icon: '📦', completed: true },
      { name: 'Shipped', time: '10:00 PM, Nov 15, 2025', icon: '🚚', completed: false },
      { name: 'Delivered', time: '10:00 PM, Nov 15, 2025', icon: '✅', completed: false },
    ],
    2: [ // Steps for prescription with ID 2
      { name: 'Order Confirmed', time: '09:00 PM, Nov 14, 2025', icon: '📝', completed: true },
      { name: 'Order Packed', time: '09:30 PM, Nov 14, 2025', icon: '📦', completed: false },
      { name: 'Shipped', time: '', icon: '🚚', completed: false },
      { name: 'Delivered', time: '', icon: '✅', completed: false },
    ],
    3: [ // Steps for prescription with ID 3
        { name: 'Order Confirmed', time: '11:00 AM, Nov 12, 2025', icon: '📝', completed: true },
        { name: 'Order Packed', time: '11:00 AM, Nov 12, 2025', icon: '📦', completed: true },
        { name: 'Shipped', time: '11:00 AM, Nov 12, 2025', icon: '🚚', completed: true },
        { name: 'Delivered', time: '11:00 AM, Nov 12, 2025', icon: '✅', completed: true },
    ]
  }

  // Get the steps for the currently selected prescription, or show a default message.
  const steps = prescription ? allSteps[prescription.id] : [];

  return (
    <div className="space-y-4">
      {steps.length > 0 ? (
        steps.map((step, index) => (
          <div key={index} className={`flex items-center space-x-4 rounded-lg p-3 ${step.completed ? 'bg-green-50' : 'bg-gray-50'}`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${step.completed ? 'bg-green-100' : 'bg-gray-200'}`}>
              {step.icon}
            </div>
            <div className="flex-grow">
              <p className={`text-sm font-semibold ${step.completed ? 'text-green-700' : 'text-gray-800'}`}>{step.name}</p>
              <p className={`text-xs ${step.completed ? 'text-green-500' : 'text-gray-500'}`}>{step.time}</p>
            </div>
            {step.completed && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center py-8">Select a prescription to view its progress.</p>
      )}
    </div>
  );
};

export default DeliveryProgress;