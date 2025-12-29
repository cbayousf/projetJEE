import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admin/cabinets';

const cabinetService = {
  getAll: () => axios.get(API_URL).then(res => res.data),
  
  getById: (id) => axios.get(`${API_URL}/${id}`).then(res => res.data),
  
  create: (cabinetData) => axios.post(API_URL, cabinetData).then(res => res.data),
  
  update: (id, cabinetData) => axios.put(`${API_URL}/${id}`, cabinetData).then(res => res.data),
  
  delete: (id) => axios.delete(`${API_URL}/${id}`).then(res => res.data),
  
  activer: (id) => axios.patch(`${API_URL}/${id}/activer`).then(res => res.data),
  
  desactiver: (id) => axios.patch(`${API_URL}/${id}/desactiver`).then(res => res.data),
};

export default cabinetService;