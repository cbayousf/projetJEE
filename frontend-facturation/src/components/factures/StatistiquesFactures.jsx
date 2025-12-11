import React, { useState, useEffect } from 'react';
import { factureService } from '../../services/factureService';
import './StatistiquesFactures.css';

const StatistiquesFactures = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStatistiques();
  }, []);

  const loadStatistiques = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await factureService.getStatistiques();
      setStats(response.data);
    } catch (error) {
      console.error('Erreur:', error);
      setError('Impossible de charger les statistiques');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">⏳ Chargement...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!stats) return <div className="no-data">Aucune statistique disponible</div>;

  return (
    <div className="statistiques-container">
      <h2>📊 Statistiques Financières</h2>
      
      <div className="stats-grid">
        <div className="stat-card revenue">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Revenus Mensuel</h3>
            <p className="stat-value">{stats.revenusMensuel.toFixed(2)} DH</p>
            <p className="stat-label">Ce mois</p>
          </div>
        </div>

        <div className="stat-card revenue-year">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>Revenus Annuel</h3>
            <p className="stat-value">{stats.revenusAnnuel.toFixed(2)} DH</p>
            <p className="stat-label">Cette année</p>
          </div>
        </div>

        <div className="stat-card success">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Factures Payées</h3>
            <p className="stat-value">{stats.nombreFacturesPayees}</p>
            <p className="stat-label">Total</p>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>En Attente</h3>
            <p className="stat-value">{stats.nombreFacturesEnAttente}</p>
            <p className="stat-subtitle">{stats.montantEnAttente.toFixed(2)} DH</p>
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>Total Factures</h3>
            <p className="stat-value">{stats.totalFactures}</p>
            <p className="stat-label">Toutes périodes</p>
          </div>
        </div>

        <div className="stat-card average">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Moyenne par Facture</h3>
            <p className="stat-value">
              {stats.totalFactures > 0 
                ? (stats.revenusAnnuel / stats.totalFactures).toFixed(2) 
                : '0.00'} DH
            </p>
            <p className="stat-label">Calculé sur l'année</p>
          </div>
        </div>
      </div>

      <button className="btn btn-primary" onClick={loadStatistiques}>
        🔄 Actualiser
      </button>
    </div>
  );
};

export default StatistiquesFactures;