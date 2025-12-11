import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import FactureList from './components/factures/FactureList';
import FactureForm from './components/factures/FactureForm';
import StatistiquesFactures from './components/factures/StatistiquesFactures';
import NotificationCenter from './components/notifications/NotificationCenter';
import NotificationBadge from './components/notifications/NotificationBadge';
import './App.css';

function App() {
  // ID de l'utilisateur connecté (à remplacer par votre système d'auth)
  const utilisateurId = 1;

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-brand">
            <h1>🏥 Cabinet Médical</h1>
            <span className="subtitle">Module Facturation</span>
          </div>
          <div className="navbar-menu">
            <Link to="/factures" className="nav-link">
              💰 Factures
            </Link>
            <Link to="/statistiques" className="nav-link">
              📊 Statistiques
            </Link>
            <Link to="/notifications" className="nav-link">
              <NotificationBadge 
                utilisateurId={utilisateurId}
              />
            </Link>
          </div>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/factures" />} />
            <Route path="/factures" element={<FactureList />} />
            <Route path="/factures/nouveau" element={<FactureForm />} />
            <Route path="/statistiques" element={<StatistiquesFactures />} />
            <Route 
              path="/notifications" 
              element={<NotificationCenter utilisateurId={utilisateurId} />} 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;