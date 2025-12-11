import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import FactureList from './components/factures/FactureList';
import FactureForm from './components/factures/FactureForm';
import StatistiquesFactures from './components/factures/StatistiquesFactures';
import NotificationCenter from './components/notifications/NotificationCenter';
import NotificationBadge from './components/notifications/NotificationBadge';
import RendezVousList from './components/rendezvous/RendezVousList';
import RendezVousForm from './components/rendezvous/RendezVousForm';
import ConsultationForm from './components/consultations/ConsultationForm';
import './App.css';

function App() {
  // ID de l'utilisateur connecté (à remplacer par votre système d'auth)
  const utilisateurId = 1;

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-brand">
            <div className="navbar-logo">Cabinet Medical</div>
            <div className="navbar-brand-text">
              <h1>Cabinet Medical</h1>
              <span className="subtitle">Systeme de Gestion</span>
            </div>
          </div>
          <div className="navbar-menu">
            <Link to="/rendezvous" className="nav-link">
              Rendez-vous
            </Link>
            <Link to="/consultations" className="nav-link">
              Consultations
            </Link>
            <Link to="/factures" className="nav-link">
              Factures
            </Link>
            <Link to="/statistiques" className="nav-link">
              Statistiques
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
            <Route path="/" element={<Navigate to="/rendezvous" />} />
            <Route path="/rendezvous" element={<RendezVousList />} />
            <Route path="/rendezvous/nouveau" element={<RendezVousForm />} />
            <Route path="/consultations/nouveau" element={<ConsultationForm />} />
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