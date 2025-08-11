import React from 'react';
import { FaBell, FaCheckCircle } from 'react-icons/fa';

const notifications = [
  { id: 1, title: 'New appointment scheduled', message: 'Dr. Smith has a new appointment on Nov 15, 2025.', time: '1 hour ago', read: false },
  { id: 2, title: 'Payment received', message: 'A payment of Rs. 560.00 has been processed.', time: '3 hours ago', read: false },
  { id: 3, title: 'New pharmacy added', message: 'The New Pharmacy has been added to the system.', time: 'Yesterday', read: true },
  { id: 4, title: 'User registration', message: 'A new patient, John Doe, has registered.', time: '2 days ago', read: true },
  { id: 5, title: 'New medical record', message: 'Patient Jane Smith has a new medical record available.', time: 'Last week', read: true },
];

const AdminNotification = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      {/* Header and Action Button */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
        <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
          Mark All as Read
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center space-x-4 p-4 rounded-lg transition-colors
              ${notification.read ? 'bg-gray-100 text-gray-500' : 'bg-blue-50 text-gray-800 font-semibold'}`}
          >
            <div className="flex-shrink-0">
              {notification.read ? (
                <FaCheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <FaBell className="h-6 w-6 text-blue-600" />
              )}
            </div>
            <div className="flex-grow">
              <p className="text-sm">{notification.title}</p>
              <p className={`text-xs ${notification.read ? 'text-gray-500' : 'text-gray-600'}`}>
                {notification.message}
              </p>
            </div>
            <div className="flex-shrink-0 text-xs">
              {notification.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNotification;