import React, { useState, useEffect } from 'react';
import medicamentService from '../services/medicamentService';
import MedicamentForm from '../components/admin/MedicamentForm';
import './CRUDPage.css';

const MedicamentsPage = () => {
  const [medicaments, setMedicaments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedMedicament, setSelectedMedicament] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [formeFilter, setFormeFilter] = useState('ALL');

  useEffect(() => {
    loadMedicaments();
  }, []);

  const loadMedicaments = async () => {
    try {
      setLoading(true);
      const data = await medicamentService.getAll();
      setMedicaments(data);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors du chargement des médicaments');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedMedicament(null);
    setShowForm(true);
  };

  const handleEdit = (medicament) => {
    setSelectedMedicament(medicament);
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedMedicament) {
        await medicamentService.update(selectedMedicament.id, formData);
        alert('✅ Médicament modifié avec succès');
      } else {
        await medicamentService.create(formData);
        alert('✅ Médicament créé avec succès');
      }
      setShowForm(false);
      loadMedicaments();
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors de l\'enregistrement');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('⚠️ Voulez-vous vraiment supprimer ce médicament ?')) {
      try {
        await medicamentService.delete(id);
        alert('✅ Médicament supprimé avec succès');
        loadMedicaments();
      } catch (error) {
        console.error('Erreur:', error);
        alert('❌ Erreur lors de la suppression');
      }
    }
  };

  const filteredMedicaments = medicaments.filter(med => {
    const matchesSearch = 
      med.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.indication?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesForme = formeFilter === 'ALL' || med.forme === formeFilter;
    
    return matchesSearch && matchesForme;
  });

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
          <h1>💊 Gestion des Médicaments</h1>
          <p className="page-subtitle">{medicaments.length} médicament(s) dans la base</p>
        </div>
        <button onClick={handleCreate} className="btn-add">
          <span className="btn-icon">➕</span>
          Nouveau Médicament
        </button>
      </div>

      <div className="page-toolbar">
        <div className="search-box search-box-large">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Rechercher un médicament..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <label>Forme:</label>
          <select value={formeFilter} onChange={(e) => setFormeFilter(e.target.value)}>
            <option value="ALL">Toutes</option>
            <option value="COMPRIME">💊 Comprimé</option>
            <option value="GELULE">⚪ Gélule</option>
            <option value="SIROP">🧴 Sirop</option>
            <option value="INJECTABLE">💉 Injectable</option>
            <option value="POMMADE">🧴 Pommade</option>
            <option value="SUPPOSITOIRE">⚫ Suppositoire</option>
          </select>
        </div>

        <div className="toolbar-info">
          <span className="result-count">{filteredMedicaments.length} résultat(s)</span>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Dosage</th>
              <th>Forme</th>
              <th>Indication</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMedicaments.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-message">
                  {searchTerm ? 'Aucun résultat trouvé' : 'Aucun médicament enregistré'}
                </td>
              </tr>
            ) : (
              filteredMedicaments.map((medicament) => (
                <tr key={medicament.id}>
                  <td>#{medicament.id}</td>
                  <td className="text-bold">{medicament.nom}</td>
                  <td>{medicament.dosage || '-'}</td>
                  <td>
                    <span className="forme-badge">
                      {medicament.forme}
                    </span>
                  </td>
                  <td className="text-truncate">{medicament.indication || '-'}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEdit(medicament)}
                        className="btn-icon btn-edit"
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(medicament.id)}
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
        <MedicamentForm
          medicament={selectedMedicament}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default MedicamentsPage;