import React, { useState, useEffect } from 'react';
import { rendezVousService } from '../../services/rendezVousService';
import './RendezVousList.css';

const RendezVousList = () => {
  const [rendezVousList, setRendezVousList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('TOUS');
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadRendezVous();
  }, []);

  const loadRendezVous = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await rendezVousService.getAllRendezVous();
      setRendezVousList(response.data);
    } catch (error) {
      console.error('Erreur:', error);
      setError('Impossible de charger les rendez-vous');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatut = async (id, newStatut) => {
    if (window.confirm(`Changer le statut en ${newStatut} ?`)) {
      try {
        await rendezVousService.updateStatut(id, newStatut);
        loadRendezVous();
        showSuccessMessage('Statut mis à jour avec succès!');
      } catch (error) {
        console.error('Erreur:', error);
        showErrorMessage('Erreur lors de la mise à jour du statut');
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce rendez-vous ?')) {
      try {
        await rendezVousService.deleteRendezVous(id);
        loadRendezVous();
        showSuccessMessage('Rendez-vous supprimé avec succès!');
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

  const filteredRendezVous = rendezVousList.filter(rdv => {
    const matchesFilter = filter === 'TOUS' || rdv.statut === filter;
    const matchesSearch = searchTerm === '' ||
      rdv.idRendezVous.toString().includes(searchTerm) ||
      rdv.patientId.toString().includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const getStatutBadge = (statut) => {
    const config = {
      EN_ATTENTE: { class: 'badge-warning', label: 'En attente', icon: '' },
      CONFIRME: { class: 'badge-info', label: 'Confirme', icon: '' },
      ANNULE: { class: 'badge-danger', label: 'Annule', icon: '' },
      TERMINE: { class: 'badge-success', label: 'Termine', icon: '' }
    };
    const { class: cls, label, icon } = config[statut];
    return <span className={`badge ${cls}`}>{icon} {label}</span>;
  };

  const calculateStats = () => {
    const total = rendezVousList.length;
    const enAttente = rendezVousList.filter(r => r.statut === 'EN_ATTENTE').length;
    const confirmes = rendezVousList.filter(r => r.statut === 'CONFIRME').length;
    const termines = rendezVousList.filter(r => r.statut === 'TERMINE').length;
    return { total, enAttente, confirmes, termines };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement des rendez-vous...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <span className="error-icon"></span>
        <p>{error}</p>
        <button onClick={loadRendezVous} className="btn btn-primary">
          Reessayer
        </button>
      </div>
    );
  }

  return (
    <div className="rendezvous-list-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Gestion des Rendez-vous</h1>
          <p className="page-subtitle">Planifiez et gerez vos rendez-vous medicaux</p>
        </div>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => window.location.href='/rendezvous/nouveau'}
        >
          <span>+</span> Nouveau RDV
        </button>
      </div>

      <div className="quick-stats">
        <div className="quick-stat">
          <span className="quick-stat-icon"></span>
          <div>
            <p className="quick-stat-label">Total</p>
            <p className="quick-stat-value">{stats.total}</p>
          </div>
        </div>
        <div className="quick-stat warning">
          <span className="quick-stat-icon"></span>
          <div>
            <p className="quick-stat-label">En attente</p>
            <p className="quick-stat-value">{stats.enAttente}</p>
          </div>
        </div>
        <div className="quick-stat info">
          <span className="quick-stat-icon"></span>
          <div>
            <p className="quick-stat-label">Confirmes</p>
            <p className="quick-stat-value">{stats.confirmes}</p>
          </div>
        </div>
        <div className="quick-stat success">
          <span className="quick-stat-icon"></span>
          <div>
            <p className="quick-stat-label">Termines</p>
            <p className="quick-stat-value">{stats.termines}</p>
          </div>
        </div>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <span className="search-icon"></span>
          <input
            type="text"
            placeholder="Rechercher par ID rendez-vous ou patient..."
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
            Tous
            <span className="count">{rendezVousList.length}</span>
          </button>
          <button
            className={`filter-btn ${filter === 'EN_ATTENTE' ? 'active' : ''}`}
            onClick={() => setFilter('EN_ATTENTE')}
          >
            En attente
            <span className="count">{stats.enAttente}</span>
          </button>
          <button
            className={`filter-btn ${filter === 'CONFIRME' ? 'active' : ''}`}
            onClick={() => setFilter('CONFIRME')}
          >
            Confirmes
            <span className="count">{stats.confirmes}</span>
          </button>
          <button
            className={`filter-btn ${filter === 'TERMINE' ? 'active' : ''}`}
            onClick={() => setFilter('TERMINE')}
          >
            Termines
            <span className="count">{stats.termines}</span>
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Heure</th>
              <th>Patient</th>
              <th>Medecin</th>
              <th>Motif</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRendezVous.map(rdv => (
              <tr key={rdv.idRendezVous} className="table-row">
                <td className="font-bold">#{rdv.idRendezVous}</td>
                <td>{new Date(rdv.dateRdv).toLocaleDateString('fr-FR')}</td>
                <td>{rdv.heureRdv}</td>
                <td>ID: {rdv.patientId}</td>
                <td>ID: {rdv.medecinId}</td>
                <td>{rdv.motif}</td>
                <td>{getStatutBadge(rdv.statut)}</td>
                <td>
                  <div className="actions">
                    {rdv.statut === 'EN_ATTENTE' && (
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => handleUpdateStatut(rdv.idRendezVous, 'CONFIRME')}
                        title="Confirmer"
                      >

                      </button>
                    )}
                    {rdv.statut === 'CONFIRME' && (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleUpdateStatut(rdv.idRendezVous, 'TERMINE')}
                        title="Terminer"
                      >

                      </button>
                    )}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(rdv.idRendezVous)}
                      title="Supprimer"
                    >

                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredRendezVous.length === 0 && (
          <div className="no-data">
            <div className="no-data-icon"></div>
            <p>Aucun rendez-vous trouve</p>
            {searchTerm && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setSearchTerm('')}
              >
                Reinitialiser la recherche
              </button>
            )}
          </div>
        )}
      </div>

      {filteredRendezVous.length > 0 && (
        <div className="pagination-info">
          Affichage de {filteredRendezVous.length} sur {rendezVousList.length} rendez-vous
        </div>
      )}
    </div>
  );
};

export default RendezVousList;
