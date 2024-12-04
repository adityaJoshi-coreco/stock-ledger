// Notification.js
import React, { useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // The notification will disappear after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  return (
    message && (
      <div className={`notification ${type}`}>
        <p>{message}</p>
      </div>
    )
  );
};

export default Notification;
