import React, { useState } from 'react';
import { consultationService } from '../../services/consultationService';
import { ordonnanceService } from '../../services/ordonnanceService';
import { useNavigate } from 'react-router-dom';
import './ConsultationForm.css';

const ConsultationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: '',
    examenClinique: '',
    examenSupplementaire: '',
    diagnostic: '',
    traitement: '',
    observations: '',
    rendezVousId: '',
    patientId: '',
    medecinId: ''
  });

  const [ordonnanceData, setOrdonnanceData] = useState({
    type: 'MEDICAMENTS',
    medicaments: [''],
    examens: [''],
    nomMedecin: '',
    specialiteMedecin: ''
  });

  const [createOrdonnance, setCreateOrdonnance] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOrdonnanceChange = (e) => {
    const { name, value } = e.target;
    setOrdonnanceData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddMedicament = () => {
    setOrdonnanceData(prev => ({
      ...prev,
      medicaments: [...prev.medicaments, '']
    }));
  };

  const handleMedicamentChange = (index, value) => {
    const newMedicaments = [...ordonnanceData.medicaments];
    newMedicaments[index] = value;
    setOrdonnanceData(prev => ({ ...prev, medicaments: newMedicaments }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.patientId || !formData.medecinId) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const consultationToSend = {
        ...formData,
        patientId: parseInt(formData.patientId),
        medecinId: parseInt(formData.medecinId),
        rendezVousId: formData.rendezVousId ? parseInt(formData.rendezVousId) : null
      };

      const consultationResponse = await consultationService.creerConsultation(consultationToSend);

      if (createOrdonnance && consultationResponse.data) {
        const ordonnanceToSend = {
          ...ordonnanceData,
          consultationId: consultationResponse.data.idConsultation,
          patientId: parseInt(formData.patientId),
          medecinId: parseInt(formData.medecinId),
          medicaments: ordonnanceData.type === 'MEDICAMENTS'
            ? ordonnanceData.medicaments.filter(m => m.trim() !== '')
            : [],
          examens: ordonnanceData.type === 'EXAMENS_SUPPLEMENTAIRES'
            ? ordonnanceData.examens.filter(e => e.trim() !== '')
            : []
        };

        await ordonnanceService.creerOrdonnance(ordonnanceToSend);
      }

      alert('Consultation creee avec succes!');
      navigate('/consultations');
    } catch (error) {
      console.error('Erreur:', error);
      setError('Erreur lors de la creation de la consultation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="consultation-form-container">
      <div className="form-header">
        <h2>Nouvelle Consultation</h2>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="consultation-form">
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
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="type">Type de consultation</label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Consultation generale"
            />
          </div>

          <div className="form-group">
            <label htmlFor="rendezVousId">ID Rendez-vous (optionnel)</label>
            <input
              type="number"
              id="rendezVousId"
              name="rendezVousId"
              value={formData.rendezVousId}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="examenClinique">Examen Clinique</label>
          <textarea
            id="examenClinique"
            name="examenClinique"
            value={formData.examenClinique}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="examenSupplementaire">Examen Supplementaire</label>
          <textarea
            id="examenSupplementaire"
            name="examenSupplementaire"
            value={formData.examenSupplementaire}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="diagnostic">Diagnostic</label>
          <textarea
            id="diagnostic"
            name="diagnostic"
            value={formData.diagnostic}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="traitement">Traitement</label>
          <textarea
            id="traitement"
            name="traitement"
            value={formData.traitement}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="observations">Observations</label>
          <textarea
            id="observations"
            name="observations"
            value={formData.observations}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="ordonnance-section">
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="createOrdonnance"
              checked={createOrdonnance}
              onChange={(e) => setCreateOrdonnance(e.target.checked)}
            />
            <label htmlFor="createOrdonnance">Creer une ordonnance</label>
          </div>

          {createOrdonnance && (
            <div className="ordonnance-form">
              <div className="form-group">
                <label htmlFor="ordonnanceType">Type d'ordonnance</label>
                <select
                  id="ordonnanceType"
                  name="type"
                  value={ordonnanceData.type}
                  onChange={handleOrdonnanceChange}
                >
                  <option value="MEDICAMENTS">Medicaments</option>
                  <option value="EXAMENS_SUPPLEMENTAIRES">Examens supplementaires</option>
                </select>
              </div>

              {ordonnanceData.type === 'MEDICAMENTS' && (
                <div className="form-group">
                  <label>Medicaments</label>
                  {ordonnanceData.medicaments.map((med, index) => (
                    <input
                      key={index}
                      type="text"
                      value={med}
                      onChange={(e) => handleMedicamentChange(index, e.target.value)}
                      placeholder="Nom du medicament et posologie"
                    />
                  ))}
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    onClick={handleAddMedicament}
                  >
                    + Ajouter un medicament
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creation...' : 'Creer Consultation'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/consultations')}
            disabled={loading}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConsultationForm;
