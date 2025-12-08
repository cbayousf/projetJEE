import api from './api';

export const notificationService = {
  // CRUD Operations
  creerNotification: (notification) => api.post('/notifications', notification),
  
  getNotificationsByUtilisateur: (utilisateurId) => 
    api.get(`/notifications/utilisateur/${utilisateurId}`),
  
  getNotificationsNonLues: (utilisateurId) => 
    api.get(`/notifications/non-lues/${utilisateurId}`),
  
  countNotificationsNonLues: (utilisateurId) => 
    api.get(`/notifications/count-non-lues/${utilisateurId}`),
  
  marquerCommeLu: (id) => api.patch(`/notifications/${id}/marquer-lu`),
  
  marquerToutesCommeLues: (utilisateurId) => 
    api.patch(`/notifications/marquer-toutes-lues/${utilisateurId}`),
  
  deleteNotification: (id) => api.delete(`/notifications/${id}`),
  
  // Specific Operations
  creerRappelRdv: (utilisateurId, patientId, rendezVousId, dateRdv) =>
    api.post('/notifications/rappel-rdv', null, {
      params: { utilisateurId, patientId, rendezVousId, dateRdv }
    }),
  
  notifierPatientEnCours: (medecinId, patientId, nomPatient) =>
    api.post('/notifications/patient-en-cours', null, {
      params: { medecinId, patientId, nomPatient }
    }),
};