import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const ordonnanceService = {
    getAll: (params) => axios.get(`${API_BASE}/ordonnances`, { params }), // params: page, size, patientId, consultationId...
    getById: (id) => axios.get(`${API_BASE}/ordonnances/${id}`),
    creerOrdonnance: (data) => axios.post(`${API_BASE}/ordonnances`, data),
    updateOrdonnance: (id, data) => axios.put(`${API_BASE}/ordonnances/${id}`, data),
    deleteOrdonnance: (id) => axios.delete(`${API_BASE}/ordonnances/${id}`),
    getPdf: (id) => axios.get(`${API_BASE}/ordonnances/${id}/pdf`, { responseType: 'blob' })
};

// import api from './api';
//
// export const ordonnanceService = {
//   creerOrdonnance: (ordonnance) => api.post('/ordonnances', ordonnance),
//
//   getAllOrdonnances: () => api.get('/ordonnances'),
//
//   getOrdonnanceById: (id) => api.get(`/ordonnances/${id}`),
//
//   getOrdonnancesByPatient: (patientId) => api.get(`/ordonnances/patient/${patientId}`),
//
//   getOrdonnancesByMedecin: (medecinId) => api.get(`/ordonnances/medecin/${medecinId}`),
//
//   getOrdonnanceByConsultation: (consultationId) => api.get(`/ordonnances/consultation/${consultationId}`),
//
//   getOrdonnancesByType: (type) => api.get(`/ordonnances/type/${type}`),
//
//   getOrdonnancesByPeriode: (debut, fin) =>
//     api.get('/ordonnances/periode', { params: { debut, fin } }),
//
//   updateOrdonnance: (id, ordonnance) => api.put(`/ordonnances/${id}`, ordonnance),
//
//   deleteOrdonnance: (id) => api.delete(`/ordonnances/${id}`),
// };
