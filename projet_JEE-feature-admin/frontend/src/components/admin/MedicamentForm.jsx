import React, { useState, useEffect } from 'react';
import './FormModal.css';

const MedicamentForm = ({ medicament, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    nom: '',
    dosage: '',
    forme: 'COMPRIME',
    indication: ''
  });

  useEffect(() => {
    if (medicament) {
      setFormData({
        nom: medicament.nom || '',
        dosage: medicament.dosage || '',
        forme: medicament.forme || 'COMPRIME',
        indication: medicament.indication || ''
      });
    }
  }, [medicament]);

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
          <h2>{medicament ? '✏️ Modifier le Médicament' : '💊 Nouveau Médicament'}</h2>
          <button className="btn-close" onClick={onCancel}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="nom">Nom du Médicament *</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              required
              placeholder="Ex: Paracétamol, Amoxicilline..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dosage">Dosage</label>
              <input
                type="text"
                id="dosage"
                name="dosage"
                value={formData.dosage}
                onChange={handleChange}
                placeholder="Ex: 500mg, 1g..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="forme">Forme *</label>
              <select
                id="forme"
                name="forme"
                value={formData.forme}
                onChange={handleChange}
                required
              >
                <option value="COMPRIME">💊 Comprimé</option>
                <option value="GELULE">⚪ Gélule</option>
                <option value="SIROP">🧴 Sirop</option>
                <option value="INJECTABLE">💉 Injectable</option>
                <option value="POMMADE">🧴 Pommade</option>
                <option value="SUPPOSITOIRE">⚫ Suppositoire</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="indication">Indication</label>
            <textarea
              id="indication"
              name="indication"
              value={formData.indication}
              onChange={handleChange}
              rows="4"
              placeholder="Indications thérapeutiques: douleur, fièvre, inflammation..."
            />
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onCancel} className="btn-secondary">
              Annuler
            </button>
            <button type="submit" className="btn-primary">
              {medicament ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicamentForm;