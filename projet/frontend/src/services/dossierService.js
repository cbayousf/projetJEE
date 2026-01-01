import api from './api';

const dossierService = {
    getDossierByPatientId: async (patientId) => {
        const response = await api.get(`/dossiers/patient/${patientId}`);
        return response.data.length > 0 ? response.data[0] : null;
    },

    createDossier: async (patientId) => {
        const response = await api.post('/dossiers', { patientId });
        return response.data;
    },

    updateDossier: async (patientId, dossierData) => {
        // Trouver d'abord le dossier
        const dossiers = await api.get(`/dossiers/patient/${patientId}`);
        if (dossiers.data.length === 0) {
            throw new Error('Dossier non trouvé');
        }
        
        const dossierId = dossiers.data[0].id;
        const response = await api.put(`/dossiers/${dossierId}`, {
            ...dossierData,
            patientId
        });
        return response.data;
    },

    getHistorique: async (patientId) => {
        const response = await api.get(`/consultations/patient/${patientId}`);
        return response.data;
    },
};

export default dossierService;