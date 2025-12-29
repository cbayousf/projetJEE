import React, { useState, useEffect } from 'react';
import './FormModal.css';

const CabinetForm = ({ cabinet, specialites, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nom: '',
    adresse: '',
    tel: '',
    logo: '',
    specialiteId: '',
  });

  useEffect(() => {
    if (cabinet) {
      setFormData({
        nom: cabinet.nom || '',
        adresse: cabinet.adresse || '',
        tel: cabinet.tel || '',
        logo: cabinet.logo || '',
        specialiteId: cabinet.specialite?.id || '',
      });
    }
  }, [cabinet]);

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
          <h2>{cabinet ? '✏️ Modifier le Cabinet' : '➕ Nouveau Cabinet'}</h2>
          <button className="btn-close" onClick={onCancel}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="nom">Nom du Cabinet *</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              placeholder="Ex: Cabinet Médical Paris"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="adresse">Adresse</label>
              <input
                type="text"
                id="adresse"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                placeholder="123 rue de la Santé, Paris"
              />
            </div>

            <div className="form-group">
              <label htmlFor="tel">Téléphone</label>
              <input
                type="tel"
                id="tel"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                placeholder="0145678901"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="logo">Logo (URL)</label>
            <input
              type="url"
              id="logo"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              placeholder="https://example.com/logo.png"
            />
            {formData.logo && (
              <div className="logo-preview">
                <img src={formData.logo} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="specialiteId">Spécialité</label>
            <select
              id="specialiteId"
              name="specialiteId"
              value={formData.specialiteId}
              onChange={handleChange}
            >
              <option value="">-- Sélectionner une spécialité --</option>
              {specialites.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {spec.nom}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onCancel} className="btn-secondary">
              Annuler
            </button>
            <button type="submit" className="btn-primary">
              {cabinet ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CabinetForm;