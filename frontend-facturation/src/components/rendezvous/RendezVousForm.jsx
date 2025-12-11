import React, { useState } from 'react';
import { rendezVousService } from '../../services/rendezVousService';
import { useNavigate } from 'react-router-dom';
import './RendezVousForm.css';

const RendezVousForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dateRdv: '',
    heureRdv: '',
    motif: '',
    notes: '',
    patientId: '',
    medecinId: '',
    cabinetId: ''
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

    if (!formData.dateRdv || !formData.heureRdv || !formData.motif || !formData.patientId || !formData.medecinId) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const dataToSend = {
        ...formData,
        patientId: parseInt(formData.patientId),
        medecinId: parseInt(formData.medecinId),
        cabinetId: formData.cabinetId ? parseInt(formData.cabinetId) : null
      };

      await rendezVousService.creerRendezVous(dataToSend);
      alert('Rendez-vous cree avec succes!');
      navigate('/rendezvous');
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur lors de la creation du rendez-vous');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rdv-form-container">
      <div className="form-header">
        <h2>Nouveau Rendez-vous</h2>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="rdv-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dateRdv">Date *</label>
            <input
              type="date"
              id="dateRdv"
              name="dateRdv"
              value={formData.dateRdv}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="heureRdv">Heure *</label>
            <input
              type="time"
              id="heureRdv"
              name="heureRdv"
              value={formData.heureRdv}
              onChange={handleChange}
              required
            />
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
            <label htmlFor="medecinId">ID Medecin *</label>
            <input
              type="number"
              id="medecinId"
              name="medecinId"
              value={formData.medecinId}
              onChange={handleChange}
              required
              placeholder="456"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="motif">Motif *</label>
          <textarea
            id="motif"
            name="motif"
            value={formData.motif}
            onChange={handleChange}
            rows="3"
            required
            placeholder="Motif de la consultation..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            placeholder="Notes supplementaires..."
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Creation...' : 'Creer Rendez-vous'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/rendezvous')}
            disabled={loading}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default RendezVousForm;
