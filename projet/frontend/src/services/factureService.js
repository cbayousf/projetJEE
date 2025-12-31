import api from './api';

export const factureService = {
  // CRUD Operations
  creerFacture: (facture) => api.post('/factures', facture),
  
  getAllFactures: () => api.get('/factures'),
  
  getFactureById: (id) => api.get(`/factures/${id}`),
  
  updateFacture: (id, facture) => api.put(`/factures/${id}`, facture),
  
  deleteFacture: (id) => api.delete(`/factures/${id}`),
  
  // Specific Operations
  getFacturesEnAttente: () => api.get('/factures/en-attente'),
  
  getFacturesByPatient: (patientId) => api.get(`/factures/patient/${patientId}`),
  
  validerPaiement: (id) => api.patch(`/factures/${id}/valider`),
  
  // Statistics
  getStatistiques: () => api.get('/factures/statistiques'),
  
  calculerRevenus: (debut, fin) => 
    api.get('/factures/revenus', { params: { debut, fin } }),
};