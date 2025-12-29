import api from './api';

const dossierService = {
    // Récupérer le dossier médical d'un patient
    getDossierByPatientId: async (patientId) => {
        const response = await api.get(`/patients/${patientId}/dossier`);
        return response.data;
    },

    // Créer un dossier médical
    createDossier: async (patientId) => {
        const response = await api.post(`/patients/${patientId}/dossier`);
        return response.data;
    },

    // Mettre à jour le dossier médical
    updateDossier: async (patientId, dossierData) => {
        const response = await api.put(`/patients/${patientId}/dossier`, dossierData);
        return response.data;
    },

    // Récupérer l'historique des consultations
    getHistorique: async (patientId) => {
        const response = await api.get(`/patients/${patientId}/dossier/historique`);
        return response.data;
    },
};

export default dossierService;