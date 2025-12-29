import React from 'react';
import authService from '../../services/authService';
import './AdminNavbar.css';

const AdminNavbar = () => {
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    if (window.confirm('Voulez-vous vraiment vous déconnecter ?')) {
      authService.logout();
    }
  };

  return (
    <nav className="admin-navbar">
      <div className="navbar-brand">
        <div className="brand-logo">🏥</div>
        <div className="brand-text">
          <h2>Cabinet Médical</h2>
          <span className="brand-subtitle">Système de Gestion</span>
        </div>
      </div>
      
      <div className="navbar-user">
        <div className="user-info">
          <div className="user-avatar">
            {user?.nom?.charAt(0)}{user?.prenom?.charAt(0)}
          </div>
          <div className="user-details">
            <span className="user-name">{user?.prenom} {user?.nom}</span>
            <span className="user-role">{user?.role}</span>
          </div>
        </div>
        <button onClick={handleLogout} className="btn-logout">
          <span className="logout-icon">🚪</span>
          Déconnexion
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;