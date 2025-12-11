import React, { useState, useEffect } from 'react';
import { notificationService } from '../../services/notificationService';
import './NotificationBadge.css';

const NotificationBadge = ({ utilisateurId, onClick }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    loadCount();
    const interval = setInterval(loadCount, 30000);
    return () => clearInterval(interval);
  }, [utilisateurId]);

  const loadCount = async () => {
    try {
      const response = await notificationService.countNotificationsNonLues(utilisateurId);
      setCount(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="notification-badge-container" onClick={onClick}>
      <span className="bell-icon">🔔</span>
      {count > 0 && (
        <span className="notification-count">{count > 99 ? '99+' : count}</span>
      )}
    </div>
  );
};

export default NotificationBadge;