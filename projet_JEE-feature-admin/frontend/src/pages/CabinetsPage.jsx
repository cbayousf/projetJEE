import React, { useState, useEffect } from 'react';
import cabinetService from '../services/cabinetService';
import specialiteService from '../services/specialiteService';
import CabinetForm from '../components/admin/CabinetForm';
import './CRUDPage.css';

const CabinetsPage = () => {
  const [cabinets, setCabinets] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCabinet, setSelectedCabinet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadCabinets();
    loadSpecialites();
  }, []);

  const loadCabinets = async () => {
    try {
      setLoading(true);
      const data = await cabinetService.getAll();
      setCabinets(data);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors du chargement des cabinets');
    } finally {
      setLoading(false);
    }
  };

  const loadSpecialites = async () => {
    try {
      const data = await specialiteService.getAll();
      setSpecialites(data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleCreate = () => {
    setSelectedCabinet(null);
    setShowForm(true);
  };

  const handleEdit = (cabinet) => {
    setSelectedCabinet(cabinet);
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedCabinet) {
        await cabinetService.update(selectedCabinet.id, formData);
        alert('✅ Cabinet modifié avec succès');
      } else {
        await cabinetService.create(formData);
        alert('✅ Cabinet créé avec succès');
      }
      setShowForm(false);
      loadCabinets();
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors de l\'enregistrement');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('⚠️ Voulez-vous vraiment supprimer ce cabinet ?')) {
      try {
        await cabinetService.delete(id);
        alert('✅ Cabinet supprimé avec succès');
        loadCabinets();
      } catch (error) {
        console.error('Erreur:', error);
        alert('❌ Erreur lors de la suppression');
      }
    }
  };

  const handleToggleStatus = async (cabinet) => {
    try {
      if (cabinet.serviceActif) {
        await cabinetService.desactiver(cabinet.id);
        alert('✅ Cabinet désactivé');
      } else {
        await cabinetService.activer(cabinet.id);
        alert('✅ Cabinet activé');
      }
      loadCabinets();
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors du changement de statut');
    }
  };

  const filteredCabinets = cabinets.filter(cabinet =>
    cabinet.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cabinet.adresse?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loading-spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="crud-page">
      <div className="page-header">
        <div>
          <h1>🏢 Gestion des Cabinets</h1>
          <p className="page-subtitle">{cabinets.length} cabinet(s) enregistré(s)</p>
        </div>
        <button onClick={handleCreate} className="btn-add">
          <span className="btn-icon">➕</span>
          Nouveau Cabinet
        </button>
      </div>

      <div className="page-toolbar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Rechercher un cabinet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="toolbar-stats">
          <span className="stat-badge success">
            {cabinets.filter(c => c.serviceActif).length} actifs
          </span>
          <span className="stat-badge danger">
            {cabinets.filter(c => !c.serviceActif).length} inactifs
          </span>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Logo</th>
              <th>Nom</th>
              <th>Adresse</th>
              <th>Téléphone</th>
              <th>Spécialité</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCabinets.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-message">
                  {searchTerm ? 'Aucun résultat trouvé' : 'Aucun cabinet enregistré'}
                </td>
              </tr>
            ) : (
              filteredCabinets.map((cabinet) => (
                <tr key={cabinet.id}>
                  <td>#{cabinet.id}</td>
                  <td>
                    {cabinet.logo ? (
                      <img src={cabinet.logo} alt="Logo" className="table-logo" />
                    ) : (
                      <div className="logo-placeholder">🏢</div>
                    )}
                  </td>
                  <td className="text-bold">{cabinet.nom}</td>
                  <td>{cabinet.adresse || '-'}</td>
                  <td>{cabinet.tel || '-'}</td>
                  <td>
                    {cabinet.specialite ? (
                      <span className="specialite-badge">
                        ⚕️ {cabinet.specialite.nom}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>
                    <span className={`status-badge ${cabinet.serviceActif ? 'active' : 'inactive'}`}>
                      {cabinet.serviceActif ? '✅ Actif' : '🔴 Inactif'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEdit(cabinet)}
                        className="btn-icon btn-edit"
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleToggleStatus(cabinet)}
                        className="btn-icon btn-toggle"
                        title={cabinet.serviceActif ? 'Désactiver' : 'Activer'}
                      >
                        {cabinet.serviceActif ? '🔴' : '🟢'}
                      </button>
                      <button
                        onClick={() => handleDelete(cabinet.id)}
                        className="btn-icon btn-delete"
                        title="Supprimer"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <CabinetForm
          cabinet={selectedCabinet}
          specialites={specialites}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default CabinetsPage;