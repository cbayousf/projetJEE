import api from './api';

const documentService = {
    uploadDocument: async (patientId, file, description, uploadePar) => {
        const formData = new FormData();
        formData.append('file', file);
        if (description) formData.append('description', description);
        if (uploadePar) formData.append('uploadePar', uploadePar);

        const response = await api.post(
            `/documents/patients/${patientId}/upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    },

    getDocumentsByPatient: async (patientId) => {
        const response = await api.get(`/documents/patients/${patientId}`);
        return response.data;
    },

    downloadDocument: async (documentId) => {
        const response = await api.get(`/documents/${documentId}/download`, {
            responseType: 'blob',
        });
        return response.data;
    },

    deleteDocument: async (documentId) => {
        const response = await api.delete(`/documents/${documentId}`);
        return response.data;
    },
};

export default documentService;