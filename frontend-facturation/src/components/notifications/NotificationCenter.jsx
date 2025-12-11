import React, { useState, useEffect } from 'react';
import { notificationService } from '../../services/notificationService';
import './NotificationCenter.css';

const NotificationCenter = ({ utilisateurId }) => {
  const [notifications, setNotifications] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
    // Actualiser toutes les 30 secondes
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, [utilisateurId, showAll]);

  const loadNotifications = async () => {
    try {
      const response = showAll 
        ? await notificationService.getNotificationsByUtilisateur(utilisateurId)
        : await notificationService.getNotificationsNonLues(utilisateurId);
      setNotifications(response.data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarquerLu = async (id) => {
    try {
      await notificationService.marquerCommeLu(id);
      loadNotifications();
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleMarquerToutesLues = async () => {
    if (window.confirm('Marquer toutes les notifications comme lues ?')) {
      try {
        await notificationService.marquerToutesCommeLues(utilisateurId);
        loadNotifications();
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette notification ?')) {
      try {
        await notificationService.deleteNotification(id);
        loadNotifications();
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      RAPPEL_RDV: '📅',
      PATIENT_EN_COURS: '👤',
      ALERTE: '⚠️'
    };
    return icons[type] || '📢';
  };

  const getTypeClass = (type) => {
    return type.toLowerCase().replace(/_/g, '-');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days < 7) return `Il y a ${days}j`;
    
    return date.toLocaleDateString('fr-FR');
  };

  if (loading) return <div className="loading">⏳ Chargement...</div>;

  return (
    <div className="notification-center">
      <div className="notification-header">
        <h2>
          🔔 Notifications 
          {!showAll && notifications.length > 0 && (
            <span className="badge">{notifications.length}</span>
          )}
        </h2>
        <div className="notification-actions">
          <button 
            className="btn btn-sm"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? '📬 Non lues uniquement' : '📭 Tout afficher'}
          </button>
          {!showAll && notifications.length > 0 && (
            <button 
              className="btn btn-sm btn-success"
              onClick={handleMarquerToutesLues}
            >
              ✓ Tout marquer comme lu
            </button>
          )}
          <button 
            className="btn btn-sm btn-secondary"
            onClick={loadNotifications}
          >
            🔄 Actualiser
          </button>
        </div>
      </div>

      <div className="notification-list">
        {notifications.length === 0 ? (
          <div className="no-notifications">
            <div className="no-notif-icon">🔕</div>
            <p>{showAll ? 'Aucune notification' : 'Aucune nouvelle notification'}</p>
          </div>
        ) : (
          notifications.map(notif => (
            <div 
              key={notif.id} 
              className={`notification-item ${!notif.lu ? 'unread' : ''} ${getTypeClass(notif.type)}`}
            >
              <div className="notification-icon">
                {getTypeIcon(notif.type)}
              </div>
              <div className="notification-content">
                <p className="notification-message">{notif.message}</p>
                <span className="notification-date">
                  {formatDate(notif.dateEnvoi)}
                </span>
              </div>
              <div className="notification-actions-item">
                {!notif.lu && (
                  <button 
                    className="btn-icon"
                    onClick={() => handleMarquerLu(notif.id)}
                    title="Marquer comme lu"
                  >
                    ✓
                  </button>
                )}
                <button 
                  className="btn-icon delete"
                  onClick={() => handleDelete(notif.id)}
                  title="Supprimer"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;