import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admin/users';

const userService = {
  getAll: () => axios.get(API_URL).then(res => res.data),
  
  getById: (id) => axios.get(`${API_URL}/${id}`).then(res => res.data),
  
  getMedecins: () => axios.get(`${API_URL}/medecins`).then(res => res.data),
  
  getSecretaires: () => axios.get(`${API_URL}/secretaires`).then(res => res.data),
  
  create: (userData) => axios.post(API_URL, userData).then(res => res.data),
  
  update: (id, userData) => axios.put(`${API_URL}/${id}`, userData).then(res => res.data),
  
  delete: (id) => axios.delete(`${API_URL}/${id}`).then(res => res.data),
};

export default userService;