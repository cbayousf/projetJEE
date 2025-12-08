import React, { useState, useEffect } from 'react';
import { factureService } from '../../services/factureService';
import './FactureList.css';

const FactureList = () => {
  const [factures, setFactures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('TOUS');
  const [error, setError] = useState(null);

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
    if (window.confirm('Confirmer la validation du paiement ?')) {
      try {
        await factureService.validerPaiement(id);
        loadFactures();
        alert('Paiement validé avec succès!');
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la validation du paiement');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette facture ?')) {
      try {
        await factureService.deleteFacture(id);
        loadFactures();
        alert('Facture supprimée avec succès!');
      } catch (error) {
        console.error('Erreur:', error);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const filteredFactures = factures.filter(f => 
    filter === 'TOUS' || f.statut === filter
  );

  const getStatutBadge = (statut) => {
    const colors = {
      EN_ATTENTE: 'warning',
      PAYE: 'success',
      REMBOURSE: 'info'
    };
    const labels = {
      EN_ATTENTE: 'En attente',
      PAYE: 'Payé',
      REMBOURSE: 'Remboursé'
    };
    return <span className={`badge badge-${colors[statut]}`}>{labels[statut]}</span>;
  };

  if (loading) return <div className="loading">⏳ Chargement...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="facture-list-container">
      <div className="header">
        <h2>💰 Gestion des Factures</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => window.location.href='/factures/nouveau'}
        >
          + Nouvelle Facture
        </button>
      </div>

      <div className="filters">
        <button 
          className={filter === 'TOUS' ? 'active' : ''} 
          onClick={() => setFilter('TOUS')}
        >
          Toutes ({factures.length})
        </button>
        <button 
          className={filter === 'EN_ATTENTE' ? 'active' : ''} 
          onClick={() => setFilter('EN_ATTENTE')}
        >
          En attente ({factures.filter(f => f.statut === 'EN_ATTENTE').length})
        </button>
        <button 
          className={filter === 'PAYE' ? 'active' : ''} 
          onClick={() => setFilter('PAYE')}
        >
          Payées ({factures.filter(f => f.statut === 'PAYE').length})
        </button>
      </div>

      <div className="table-container">
        <table className="facture-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Patient ID</th>
              <th>Montant</th>
              <th>Mode Paiement</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFactures.map(facture => (
              <tr key={facture.idFacture}>
                <td>#{facture.idFacture}</td>
                <td>{new Date(facture.dateFacture).toLocaleDateString('fr-FR')}</td>
                <td>{facture.patientId}</td>
                <td className="montant">{facture.montant.toFixed(2)} DH</td>
                <td>{facture.modePaiement}</td>
                <td>{getStatutBadge(facture.statut)}</td>
                <td className="actions">
                  {facture.statut === 'EN_ATTENTE' && (
                    <button 
                      className="btn btn-success btn-sm"
                      onClick={() => handleValiderPaiement(facture.idFacture)}
                      title="Valider le paiement"
                    >
                      ✓ Valider
                    </button>
                  )}
                  <button 
                    className="btn btn-info btn-sm"
                    onClick={() => window.open(`/factures/${facture.idFacture}/pdf`, '_blank')}
                    title="Imprimer la facture"
                  >
                    🖨️ Imprimer
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(facture.idFacture)}
                    title="Supprimer la facture"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredFactures.length === 0 && (
          <div className="no-data">
            📭 Aucune facture trouvée
          </div>
        )}
      </div>
    </div>
  );
};

export default FactureList;