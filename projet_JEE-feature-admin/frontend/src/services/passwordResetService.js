// src/services/passwordResetService.js
import axios from '../utils/axiosConfig';

const passwordResetService = {
  /**
   * Étape 1: Demander la réinitialisation (envoie du login)
   */
  requestReset: async (login) => {
    try {
      const response = await axios.post('/auth/forgot-password', { login });
      
      // ✅ CORRECTION: Retourner la structure correcte avec message
      return { 
        success: true, 
        message: response.data.message || 'Demande envoyée avec succès',
        data: response.data 
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la demande'
      };
    }
  },

  /**
   * Étape 2: Valider le token
   */
  validateToken: async (token) => {
    try {
      const response = await axios.get('/auth/validate-reset-token', {
        params: { token }
      });
      return { 
        success: true, 
        message: response.data.message || 'Token valide',
        data: response.data 
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Token invalide'
      };
    }
  },

  /**
   * Étape 3: Réinitialiser le mot de passe avec le token
   */
  resetPassword: async (token, newPassword, confirmPassword) => {
    try {
      const response = await axios.post('/auth/reset-password', {
        token,
        newPassword,
        confirmPassword
      });
      return { 
        success: true, 
        message: response.data.message || 'Mot de passe réinitialisé',
        data: response.data 
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la réinitialisation'
      };
    }
  },
};

export default passwordResetService;