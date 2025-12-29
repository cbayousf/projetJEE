import React, { useState, useEffect } from 'react';
import './FormModal.css';

const SpecialiteForm = ({ specialite, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nom: '',
    description: ''
  });

  useEffect(() => {
    if (specialite) {
      setFormData({
        nom: specialite.nom || '',
        description: specialite.description || ''
      });
    }
  }, [specialite]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{specialite ? '✏️ Modifier la Spécialité' : '➕ Nouvelle Spécialité'}</h2>
          <button className="btn-close" onClick={onCancel}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="nom">Nom de la Spécialité *</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              placeholder="Ex: Cardiologie, Ophtalmologie..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              placeholder="Description de la spécialité médicale..."
            />
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onCancel} className="btn-secondary">
              Annuler
            </button>
            <button type="submit" className="btn-primary">
              {specialite ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SpecialiteForm;