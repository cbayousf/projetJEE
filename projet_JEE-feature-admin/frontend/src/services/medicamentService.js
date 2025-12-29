import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admin/medicaments';

const medicamentService = {
  // GET /api/admin/medicaments
  getAll: () =>
    axios.get(API_URL).then(res => res.data),

  // GET /api/admin/medicaments/search?q=xxx
  search: (query) =>
    axios.get(`${API_URL}/search`, {
      params: { q: query }
    }).then(res => res.data),

  // GET /api/admin/medicaments/{id}
  getById: (id) =>
    axios.get(`${API_URL}/${id}`).then(res => res.data),

  // POST /api/admin/medicaments
  create: (data) =>
    axios.post(API_URL, data).then(res => res.data),

  // PUT /api/admin/medicaments/{id}
  update: (id, data) =>
    axios.put(`${API_URL}/${id}`, data).then(res => res.data),

  // DELETE /api/admin/medicaments/{id}
  delete: (id) =>
    axios.delete(`${API_URL}/${id}`).then(res => res.data),
};

export default medicamentService;
