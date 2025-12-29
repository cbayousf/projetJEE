import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { 
      path: '/admin/dashboard', 
      label: 'Dashboard', 
      icon: '📊',
      description: 'Vue d\'ensemble'
    },
    { 
      path: '/admin/cabinets', 
      label: 'Cabinets', 
      icon: '🏢',
      description: 'Gestion des cabinets'
    },
    { 
      path: '/admin/users', 
      label: 'Utilisateurs', 
      icon: '👥',
      description: 'Médecins & Secrétaires'
    },
    { 
      path: '/admin/specialites', 
      label: 'Spécialités', 
      icon: '⚕️',
      description: 'Spécialités médicales'
    },
    { 
      path: '/admin/medicaments', 
      label: 'Médicaments', 
      icon: '💊',
      description: 'Base de données'
    },
  ];

  return (
    <div className="admin-sidebar">
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <div className="menu-icon">{item.icon}</div>
            <div className="menu-content">
              <span className="menu-label">{item.label}</span>
              <span className="menu-description">{item.description}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="version-info">
          <span className="version-badge">v1.0.0</span>
          <span className="version-text">Version Bêta</span>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;