import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const consultationService = {
    getAll: () => axios.get(`${API_BASE}/consultations`),
    getById: (id) => axios.get(`${API_BASE}/consultations/${id}`),
    creerConsultation: (data) => axios.post(`${API_BASE}/consultations`, data),
    updateConsultation: (id, data) => axios.put(`${API_BASE}/consultations/${id}`, data),
    deleteConsultation: (id) => axios.delete(`${API_BASE}/consultations/${id}`)
};

// import axios from 'axios';
//
// const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
//
// export const consultationService = {
//     getAll: () => axios.get(`${API_BASE}/consultations`),
//     getById: (id) => axios.get(`${API_BASE}/consultations/${id}`),
//     creerConsultation: (data) => axios.post(`${API_BASE}/consultations`, data),
// };


// import api from './api';
//
// export const consultationService = {
//   creerConsultation: (consultation) => api.post('/consultations', consultation),
//
//   getAllConsultations: () => api.get('/consultations'),
//
//   getConsultationById: (id) => api.get(`/consultations/${id}`),
//
//   getConsultationsByPatient: (patientId) => api.get(`/consultations/patient/${patientId}`),
//
//   getConsultationsByMedecin: (medecinId) => api.get(`/consultations/medecin/${medecinId}`),
//
//   getConsultationByRendezVous: (rendezVousId) => api.get(`/consultations/rendezvous/${rendezVousId}`),
//
//   getConsultationsByPeriode: (debut, fin) =>
//     api.get('/consultations/periode', { params: { debut, fin } }),
//
//   updateConsultation: (id, consultation) => api.put(`/consultations/${id}`, consultation),
//
//   deleteConsultation: (id) => api.delete(`/consultations/${id}`),
//
//   countByMedecinAndPeriode: (medecinId, debut, fin) =>
//     api.get(`/consultations/medecin/${medecinId}/count`, { params: { debut, fin } }),
// };
