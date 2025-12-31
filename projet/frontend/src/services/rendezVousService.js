import api from './api';

export const rendezVousService = {
  creerRendezVous: (rendezVous) => api.post('/rendezvous', rendezVous),

  getAllRendezVous: () => api.get('/rendezvous'),

  getRendezVousById: (id) => api.get(`/rendezvous/${id}`),

  getRendezVousByPatient: (patientId) => api.get(`/rendezvous/patient/${patientId}`),

  getRendezVousByMedecin: (medecinId) => api.get(`/rendezvous/medecin/${medecinId}`),

  getRendezVousByStatut: (statut) => api.get(`/rendezvous/statut/${statut}`),

  getRendezVousByDate: (date) => api.get(`/rendezvous/date/${date}`),

  getRendezVousByPeriode: (debut, fin) =>
    api.get('/rendezvous/periode', { params: { debut, fin } }),

  getRendezVousByMedecinAndDate: (medecinId, date) =>
    api.get(`/rendezvous/medecin/${medecinId}/date/${date}`),

  updateRendezVous: (id, rendezVous) => api.put(`/rendezvous/${id}`, rendezVous),

  updateStatut: (id, statut) => api.patch(`/rendezvous/${id}/statut`, null, { params: { statut } }),

  deleteRendezVous: (id) => api.delete(`/rendezvous/${id}`),

  countByMedecinAndPeriode: (medecinId, debut, fin) =>
    api.get(`/rendezvous/medecin/${medecinId}/count`, { params: { debut, fin } }),
};
