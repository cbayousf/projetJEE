import React, { useState, useEffect } from 'react';
import cabinetService from '../services/cabinetService';
import userService from '../services/userService';
import medicamentService from '../services/medicamentService';
import specialiteService from '../services/specialiteService';
import StatsCard from '../components/admin/StatsCard';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    cabinets: { total: 0, actifs: 0 },
    users: { total: 0, medecins: 0, secretaires: 0 },
    medicaments: 0,
    specialites: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    loadStats();
    loadRecentActivities();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      
      const [cabinetsData, usersData, medicamentsData, specialitesData] = await Promise.all([
        cabinetService.getAll(),
        userService.getAll(),
        medicamentService.getAll(),
        specialiteService.getAll(),
      ]);

      setStats({
        cabinets: {
          total: cabinetsData.length,
          actifs: cabinetsData.filter(c => c.serviceActif).length,
        },
        users: {
          total: usersData.length,
          medecins: usersData.filter(u => u.role === 'MEDECIN').length,
          secretaires: usersData.filter(u => u.role === 'SECRETAIRE').length,
        },
        medicaments: medicamentsData.length,
        specialites: specialitesData.length,
      });
    } catch (error) {
      console.error('Erreur lors du chargement des statistiques:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRecentActivities = () => {
    // Activités simulées (à remplacer par de vraies données plus tard)
    setRecentActivities([
      { id: 1, type: 'user', message: 'Nouvel utilisateur ajouté', time: 'Il y a 2 heures', icon: '👤' },
      { id: 2, type: 'cabinet', message: 'Cabinet modifié', time: 'Il y a 5 heures', icon: '🏢' },
      { id: 3, type: 'medicament', message: '10 médicaments ajoutés', time: 'Hier', icon: '💊' },
      { id: 4, type: 'specialite', message: 'Nouvelle spécialité créée', time: 'Il y a 2 jours', icon: '⚕️' },
    ]);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Chargement du dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* En-tête */}
      <div className="dashboard-header">
        <div>
          <h1>📊 Dashboard Administrateur</h1>
          <p className="dashboard-subtitle">Vue d'ensemble de votre système de gestion</p>
        </div>
        <button onClick={loadStats} className="btn-refresh">
          <span className="refresh-icon">🔄</span>
          Actualiser
        </button>
      </div>

      {/* Cartes de statistiques */}
      <div className="stats-grid">
        <StatsCard
          title="Cabinets"
          value={stats.cabinets.total}
          icon="🏢"
          color="#3498db"
          subtitle={`${stats.cabinets.actifs} actifs`}
          trend={{ type: 'up', value: '+12%' }}
        />
        <StatsCard
          title="Utilisateurs"
          value={stats.users.total}
          icon="👥"
          color="#27ae60"
          subtitle={`${stats.users.medecins} médecins, ${stats.users.secretaires} secrétaires`}
        />
        <StatsCard
          title="Médecins"
          value={stats.users.medecins}
          icon="⚕️"
          color="#9b59b6"
          subtitle="Personnel médical"
          trend={{ type: 'up', value: '+5%' }}
        />
        <StatsCard
          title="Médicaments"
          value={stats.medicaments}
          icon="💊"
          color="#e74c3c"
          subtitle="Base de données"
        />
      </div>

      {/* Grille de contenu */}
      <div className="dashboard-content-grid">
        {/* Activités récentes */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>🕐 Activités Récentes</h2>
            <span className="badge">Aujourd'hui</span>
          </div>
          <div className="activities-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-content">
                  <p className="activity-message">{activity.message}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accès rapide */}
        <div className="dashboard-card">
          <div className="card-header">
            <h2>⚡ Accès Rapide</h2>
          </div>
          <div className="quick-actions">
            <a href="/admin/users" className="quick-action-btn">
              <span className="action-icon">➕</span>
              <span>Nouvel Utilisateur</span>
            </a>
            <a href="/admin/cabinets" className="quick-action-btn">
              <span className="action-icon">🏢</span>
              <span>Nouveau Cabinet</span>
            </a>
            <a href="/admin/medicaments" className="quick-action-btn">
              <span className="action-icon">💊</span>
              <span>Nouveau Médicament</span>
            </a>
            <a href="/admin/specialites" className="quick-action-btn">
              <span className="action-icon">⚕️</span>
              <span>Nouvelle Spécialité</span>
            </a>
          </div>
        </div>

        
      </div>

      {/* Message de bienvenue */}
      <div className="welcome-banner">
        <div className="banner-icon">👋</div>
        <div className="banner-content">
          <h3>Bienvenue sur votre Dashboard !</h3>
          <p>
            Utilisez le menu latéral pour accéder aux différentes fonctionnalités de gestion.
            Vous pouvez gérer les cabinets, les utilisateurs, les spécialités et les médicaments.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;