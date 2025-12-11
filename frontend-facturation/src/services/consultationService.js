import api from './api';

export const consultationService = {
  creerConsultation: (consultation) => api.post('/consultations', consultation),

  getAllConsultations: () => api.get('/consultations'),

  getConsultationById: (id) => api.get(`/consultations/${id}`),

  getConsultationsByPatient: (patientId) => api.get(`/consultations/patient/${patientId}`),

  getConsultationsByMedecin: (medecinId) => api.get(`/consultations/medecin/${medecinId}`),

  getConsultationByRendezVous: (rendezVousId) => api.get(`/consultations/rendezvous/${rendezVousId}`),

  getConsultationsByPeriode: (debut, fin) =>
    api.get('/consultations/periode', { params: { debut, fin } }),

  updateConsultation: (id, consultation) => api.put(`/consultations/${id}`, consultation),

  deleteConsultation: (id) => api.delete(`/consultations/${id}`),

  countByMedecinAndPeriode: (medecinId, debut, fin) =>
    api.get(`/consultations/medecin/${medecinId}/count`, { params: { debut, fin } }),
};
