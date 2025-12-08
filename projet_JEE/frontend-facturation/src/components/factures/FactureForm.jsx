import React, { useState } from 'react';
import { factureService } from '../../services/factureService';
import { useNavigate } from 'react-router-dom';
import './FactureForm.css';

const FactureForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    montant: '',
    modePaiement: 'ESPECES',
    rendezVousId: '',
    patientId: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.montant || parseFloat(formData.montant) <= 0) {
      alert('Le montant doit être supérieur à 0');
      return;
    }
    
    if (!formData.patientId) {
      alert('L\'ID du patient est requis');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const dataToSend = {
        ...formData,
        montant: parseFloat(formData.montant),
        patientId: parseInt(formData.patientId),
        rendezVousId: formData.rendezVousId ? parseInt(formData.rendezVousId) : null
      };
      
      await factureService.creerFacture(dataToSend);
      alert('Facture créée avec succès!');
      navigate('/factures');
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur lors de la création de la facture');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="facture-form-container">
      <div className="form-header">
        <h2>📝 Nouvelle Facture</h2>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="facture-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="montant">Montant (DH) *</label>
            <input
              type="number"
              id="montant"
              name="montant"
              value={formData.montant}
              onChange={handleChange}
              required
              step="0.01"
              min="0"
              placeholder="0.00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="modePaiement">Mode de Paiement *</label>
            <select
              id="modePaiement"
              name="modePaiement"
              value={formData.modePaiement}
              onChange={handleChange}
              required
            >
              <option value="ESPECES">💵 Espèces</option>
              <option value="CARTE">💳 Carte bancaire</option>
              <option value="ASSURANCE">🏥 Assurance</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="patientId">ID Patient *</label>
            <input
              type="number"
              id="patientId"
              name="patientId"
              value={formData.patientId}
              onChange={handleChange}
              required
              placeholder="123"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rendezVousId">ID Rendez-vous</label>
            <input
              type="number"
              id="rendezVousId"
              name="rendezVousId"
              value={formData.rendezVousId}
              onChange={handleChange}
              placeholder="456 (optionnel)"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            placeholder="Notes supplémentaires..."
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? '⏳ Création...' : '✓ Créer Facture'}
          </button>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/factures')}
            disabled={loading}
          >
            ✕ Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default FactureForm;