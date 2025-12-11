
import React, { useState, useEffect } from 'react';
import { factureService } from '../../services/factureService';
import './FactureList.css';

const FactureList = () => {
  const [factures, setFactures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('TOUS');
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadFactures();
  }, []);

  const loadFactures = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await factureService.getAllFactures();
      setFactures(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des factures:', error);
      setError('Impossible de charger les factures');
    } finally {
      setLoading(false);
    }
  };

  const handleValiderPaiement = async (id) => {
    if (window.confirm('✓ Confirmer la validation du paiement ?')) {
      try {
        await factureService.validerPaiement(id);
        loadFactures();
        showSuccessMessage('Paiement validé avec succès!');
      } catch (error) {
        console.error('Erreur:', error);
        showErrorMessage('Erreur lors de la validation du paiement');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('⚠️ Êtes-vous sûr de vouloir supprimer cette facture ?')) {
      try {
        await factureService.deleteFacture(id);
        loadFactures();
        showSuccessMessage('Facture supprimée avec succès!');
      } catch (error) {
        console.error('Erreur:', error);
        showErrorMessage('Erreur lors de la suppression');
      }
    }
  };

  const showSuccessMessage = (message) => {
    const div = document.createElement('div');
    div.className = 'toast-success';
    div.textContent = message;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
  };

  const showErrorMessage = (message) => {
    const div = document.createElement('div');
    div.className = 'toast-error';
    div.textContent = message;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
  };

  const filteredFactures = factures.filter(f => {
    const matchesFilter = filter === 'TOUS' || f.statut === filter;
    const matchesSearch = searchTerm === '' || 
      f.idFacture.toString().includes(searchTerm) ||
      f.patientId.toString().includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const getStatutBadge = (statut) => {
    const config = {
      EN_ATTENTE: { class: 'badge-warning', label: 'En attente', icon: '⏳' },
      PAYE: { class: 'badge-success', label: 'Payé', icon: '✓' },
      REMBOURSE: { class: 'badge-info', label: 'Remboursé', icon: '↺' }
    };
    const { class: cls, label, icon } = config[statut];
    return <span className={`badge ${cls}`}>{icon} {label}</span>;
  };

  const getModePaiementIcon = (mode) => {
    const icons = {
      ESPECES: '💵',
      CARTE: '💳',
      ASSURANCE: '🏥'
    };
    return icons[mode] || '💰';
  };

  const calculateStats = () => {
    const total = factures.length;
    const enAttente = factures.filter(f => f.statut === 'EN_ATTENTE').length;
    const payees = factures.filter(f => f.statut === 'PAYE').length;
    const montantTotal = factures.reduce((sum, f) => sum + f.montant, 0);
    return { total, enAttente, payees, montantTotal };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement des factures...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <span className="error-icon">⚠️</span>
        <p>{error}</p>
        <button onClick={loadFactures} className="btn btn-primary">
          🔄 Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="facture-list-container">
      {/* En-tête avec statistiques rapides */}
      <div className="page-header">
        <div>
          <h1 className="page-title">💰 Gestion des Factures</h1>
          <p className="page-subtitle">Gérez vos factures et paiements en toute simplicité</p>
        </div>
        <button 
          className="btn btn-primary btn-lg" 
          onClick={() => window.location.href='/factures/nouveau'}
        >
          <span>+</span> Nouvelle Facture
        </button>
      </div>

      {/* Statistiques rapides */}
      <div className="quick-stats">
        <div className="quick-stat">
          <span className="quick-stat-icon">📊</span>
          <div>
            <p className="quick-stat-label">Total</p>
            <p className="quick-stat-value">{stats.total}</p>
          </div>
        </div>
        <div className="quick-stat success">
          <span className="quick-stat-icon">✓</span>
          <div>
            <p className="quick-stat-label">Payées</p>
            <p className="quick-stat-value">{stats.payees}</p>
          </div>
        </div>
        <div className="quick-stat warning">
          <span className="quick-stat-icon">⏳</span>
          <div>
            <p className="quick-stat-label">En attente</p>
            <p className="quick-stat-value">{stats.enAttente}</p>
          </div>
        </div>
        <div className="quick-stat revenue">
          <span className="quick-stat-icon">💵</span>
          <div>
            <p className="quick-stat-label">Montant total</p>
            <p className="quick-stat-value">{stats.montantTotal.toFixed(2)} DH</p>
          </div>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="toolbar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Rechercher par ID facture ou patient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters">
          <button 
            className={`filter-btn ${filter === 'TOUS' ? 'active' : ''}`}
            onClick={() => setFilter('TOUS')}
          >
            Toutes
            <span className="count">{factures.length}</span>
          </button>
          <button 
            className={`filter-btn ${filter === 'EN_ATTENTE' ? 'active' : ''}`}
            onClick={() => setFilter('EN_ATTENTE')}
          >
            ⏳ En attente
            <span className="count">{stats.enAttente}</span>
          </button>
          <button 
            className={`filter-btn ${filter === 'PAYE' ? 'active' : ''}`}
            onClick={() => setFilter('PAYE')}
          >
            ✓ Payées
            <span className="count">{stats.payees}</span>
          </button>
        </div>
      </div>

      {/* Table des factures */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>📋 ID</th>
              <th>📅 Date</th>
              <th>👤 Patient</th>
              <th>💰 Montant</th>
              <th>💳 Mode Paiement</th>
              <th>📊 Statut</th>
              <th>⚙️ Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFactures.map(facture => (
              <tr key={facture.idFacture} className="table-row">
                <td className="font-bold">#{facture.idFacture}</td>
                <td>{new Date(facture.dateFacture).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}</td>
                <td>
                  <div className="patient-cell">
                    <span className="patient-icon">👤</span>
                    <span>ID: {facture.patientId}</span>
                  </div>
                </td>
                <td className="montant-cell">
                  <span className="montant-value">{facture.montant.toFixed(2)}</span>
                  <span className="currency">DH</span>
                </td>
                <td>
                  <span className="mode-paiement">
                    {getModePaiementIcon(facture.modePaiement)}
                    {facture.modePaiement}
                  </span>
                </td>
                <td>{getStatutBadge(facture.statut)}</td>
                <td>
                  <div className="actions">
                    {facture.statut === 'EN_ATTENTE' && (
                      <button 
                        className="btn btn-success btn-sm"
                        onClick={() => handleValiderPaiement(facture.idFacture)}
                        title="Valider le paiement"
                      >
                        ✓
                      </button>
                    )}
                    <button 
                      className="btn btn-info btn-sm"
                      title="Imprimer la facture"
                    >
                      🖨️
                    </button>
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(facture.idFacture)}
                      title="Supprimer"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredFactures.length === 0 && (
          <div className="no-data">
            <div className="no-data-icon">📭</div>
            <p>Aucune facture trouvée</p>
            {searchTerm && (
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => setSearchTerm('')}
              >
                Réinitialiser la recherche
              </button>
            )}
          </div>
        )}
      </div>

      {/* Pagination (optionnel) */}
      {filteredFactures.length > 0 && (
        <div className="pagination-info">
          Affichage de {filteredFactures.length} sur {factures.length} facture(s)
        </div>
      )}
    </div>
  );
};

export default FactureList;