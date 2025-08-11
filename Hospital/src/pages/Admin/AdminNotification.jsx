import React, { useState } from 'react';
import { FaBell, FaCheckCircle } from 'react-icons/fa';
import AddNotificationModal from '../../components/Admin/AdminNotification/AddNotificationModal';


const initialNotifications = [
  { id: 1, title: 'New appointment scheduled', message: 'Dr. Smith has a new appointment on Nov 15, 2025.', time: '1 hour ago', read: false },
  { id: 2, title: 'Payment received', message: 'A payment of Rs. 560.00 has been processed.', time: '3 hours ago', read: false },
  { id: 3, title: 'New pharmacy added', message: 'The New Pharmacy has been added to the system.', time: 'Yesterday', read: true },
  { id: 4, title: 'User registration', message: 'A new patient, John Doe, has registered.', time: '2 days ago', read: true },
  { id: 5, title: 'New medical record', message: 'Patient Jane Smith has a new medical record available.', time: 'Last week', read: true },
];

const AdminNotification = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNotification = (newNotificationData) => {
    const newNotification = {
      id: notifications.length + 1,
      ...newNotificationData,
      read: false,
    };
    setNotifications([newNotification, ...notifications]);
    setIsModalOpen(false);
  };

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({ ...notif, read: true }));
    setNotifications(updatedNotifications);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
        <div className="flex space-x-4">
          <button
            onClick={handleMarkAllAsRead}
            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          >
            Mark All as Read
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-green-700 transition-colors"
          >
            + Add Notification
          </button>
        </div>
      </div>

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
      
      {isModalOpen && (
        <AddNotificationModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddNotification}
        />
      )}
    </div>
  );
};

export default AdminNotification;