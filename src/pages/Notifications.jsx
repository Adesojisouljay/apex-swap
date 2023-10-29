import React, { useState, useEffect } from 'react';
import './notifications.scss';

const UserNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulated sample data (replace with your own data or API calls)
    const sampleData = [
      {
        id: 1,
        message: 'Welcome! Thanks for joining our platform.',
        timestamp: '2023-09-21 10:30 AM',
      },
      {
        id: 2,
        message: 'Your transaction has been canceled.',
        timestamp: '2023-09-20 02:45 PM',
      },
      {
        id: 3,
        message: 'Your withdrawal request has been completed.',
        timestamp: '2023-09-19 09:15 AM',
      },
    ];

    setNotifications(sampleData);
  }, []);

  return (
    <div className="user-notifications">
      <h2>Notifications</h2>
      <div className="notification-list">
        {notifications.map((notification) => (
          <div className="notification-item" key={notification.id}>
            <div className="notification-details">
              <div className="notification-message">{notification.message}</div>
              <div className="notification-timestamp">{notification.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserNotifications;
