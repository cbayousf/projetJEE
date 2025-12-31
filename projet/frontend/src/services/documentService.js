import api from './api';

const documentService = {
    // Upload un document
    uploadDocument: async (patientId, file, description, uploadePar) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('description', description);
        formData.append('uploadePar', uploadePar);

        const response = await api.post(
            `/patients/${patientId}/dossier/documents`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    },

    // Récupérer les documents d'un patient
    getDocumentsByPatient: async (patientId) => {
        const response = await api.get(`/patients/${patientId}/dossier/documents`);
        return response.data;
    },

    // Télécharger un document
    downloadDocument: async (documentId) => {
        const response = await api.get(`/documents/${documentId}/download`, {
            responseType: 'blob',
        });
        return response.data;
    },

    // Supprimer un document
    deleteDocument: async (documentId) => {
        const response = await api.delete(`/documents/${documentId}`);
        return response.data;
    },
};

export default documentService;