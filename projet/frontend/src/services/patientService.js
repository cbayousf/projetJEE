import api from './api';

const patientService = {
    // Récupérer tous les patients
    getAllPatients: async () => {
        const response = await api.get('/patients');
        return response.data;
    },

    // Récupérer un patient par ID
    getPatientById: async (id) => {
        const response = await api.get(`/patients/${id}`);
        return response.data;
    },

    // Créer un nouveau patient
    createPatient: async (patientData) => {
        const response = await api.post('/patients', patientData);
        return response.data;
    },

    // Mettre à jour un patient
    updatePatient: async (id, patientData) => {
        const response = await api.put(`/patients/${id}`, patientData);
        return response.data;
    },

    // Supprimer un patient
    deletePatient: async (id) => {
        const response = await api.delete(`/patients/${id}`);
        return response.data;
    },

    // Rechercher des patients
    searchPatients: async (searchTerm) => {
        const response = await api.get('/patients/search', {
            params: { cin: searchTerm, nom: searchTerm }
        });
        return response.data;
    },

    // Obtenir les statistiques
    getPatientStats: async () => {
        const response = await api.get('/patients/stats');
        return response.data;
    },
};

export default patientService;