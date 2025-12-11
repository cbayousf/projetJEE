import api from './api';

export const ordonnanceService = {
  creerOrdonnance: (ordonnance) => api.post('/ordonnances', ordonnance),

  getAllOrdonnances: () => api.get('/ordonnances'),

  getOrdonnanceById: (id) => api.get(`/ordonnances/${id}`),

  getOrdonnancesByPatient: (patientId) => api.get(`/ordonnances/patient/${patientId}`),

  getOrdonnancesByMedecin: (medecinId) => api.get(`/ordonnances/medecin/${medecinId}`),

  getOrdonnanceByConsultation: (consultationId) => api.get(`/ordonnances/consultation/${consultationId}`),

  getOrdonnancesByType: (type) => api.get(`/ordonnances/type/${type}`),

  getOrdonnancesByPeriode: (debut, fin) =>
    api.get('/ordonnances/periode', { params: { debut, fin } }),

  updateOrdonnance: (id, ordonnance) => api.put(`/ordonnances/${id}`, ordonnance),

  deleteOrdonnance: (id) => api.delete(`/ordonnances/${id}`),
};
