import React, { useState, useEffect } from 'react';
import specialiteService from '../services/specialiteService';
import SpecialiteForm from '../components/admin/SpecialiteForm';
import './CRUDPage.css';

const SpecialitesPage = () => {
  const [specialites, setSpecialites] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedSpecialite, setSelectedSpecialite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadSpecialites();
  }, []);

  const loadSpecialites = async () => {
    try {
      setLoading(true);
      const data = await specialiteService.getAll();
      setSpecialites(data);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors du chargement des spécialités');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedSpecialite(null);
    setShowForm(true);
  };

  const handleEdit = (specialite) => {
    setSelectedSpecialite(specialite);
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedSpecialite) {
        await specialiteService.update(selectedSpecialite.id, formData);
        alert('✅ Spécialité modifiée avec succès');
      } else {
        await specialiteService.create(formData);
        alert('✅ Spécialité créée avec succès');
      }
      setShowForm(false);
      loadSpecialites();
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors de l\'enregistrement');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('⚠️ Voulez-vous vraiment supprimer cette spécialité ?')) {
      try {
        await specialiteService.delete(id);
        alert('✅ Spécialité supprimée avec succès');
        loadSpecialites();
      } catch (error) {
        console.error('Erreur:', error);
        alert('❌ Erreur lors de la suppression');
      }
    }
  };

  const filteredSpecialites = specialites.filter(spec =>
    spec.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    spec.description?.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1>⚕️ Gestion des Spécialités</h1>
          <p className="page-subtitle">{specialites.length} spécialité(s) médicale(s)</p>
        </div>
        <button onClick={handleCreate} className="btn-add">
          <span className="btn-icon">➕</span>
          Nouvelle Spécialité
        </button>
      </div>

      <div className="page-toolbar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Rechercher une spécialité..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="toolbar-info">
          <span className="result-count">{filteredSpecialites.length} résultat(s)</span>
        </div>
      </div>

      <div className="cards-grid">
        {filteredSpecialites.length === 0 ? (
          <div className="empty-message" style={{gridColumn: '1 / -1'}}>
            {searchTerm ? 'Aucun résultat trouvé' : 'Aucune spécialité enregistrée'}
          </div>
        ) : (
          filteredSpecialites.map((specialite) => (
            <div key={specialite.id} className="info-card">
              <div className="card-icon-header">
                <div className="card-icon">⚕️</div>
                <h3 className="card-title">{specialite.nom}</h3>
              </div>
              
              <p className="card-description">
                {specialite.description || 'Aucune description'}
              </p>
              
              <div className="card-footer">
                <button
                  onClick={() => handleEdit(specialite)}
                  className="btn-card btn-edit-card"
                >
                  ✏️ Modifier
                </button>
                <button
                  onClick={() => handleDelete(specialite.id)}
                  className="btn-card btn-delete-card"
                >
                  🗑️ Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <SpecialiteForm
          specialite={selectedSpecialite}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default SpecialitesPage;