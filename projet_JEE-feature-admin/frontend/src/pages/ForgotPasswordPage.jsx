// src/pages/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import passwordResetService from '../services/passwordResetService';
import './ResetPasswordPage.css';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [tokenGenerated, setTokenGenerated] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    setTokenGenerated('');

    const result = await passwordResetService.requestReset(login);

    if (result.success) {
      // ✅ Afficher le message de succès
      setMessage(result.message);
      
      // ✅ Extraire le token du message (pour le développement)
      let extractedToken = null;
      
      if (result.message && typeof result.message === 'string' && result.message.includes('Token:')) {
        const parts = result.message.split('Token:');
        if (parts.length > 1) {
          extractedToken = parts[1].trim();
        }
      }
      
      // ✅ Si un token a été extrait, le sauvegarder
      if (extractedToken) {
        setTokenGenerated(extractedToken);
      }
    } else {
      // ✅ Afficher le message d'erreur
      setError(result.message);
    }

    setLoading(false);
  };

  const goToResetWithToken = () => {
    if (tokenGenerated) {
      navigate(`/reset-password?token=${tokenGenerated}`);
    }
  };

  return (
    <div className="reset-page">
      <div className="reset-card">
        <div className="reset-header">
          <div className="key-icon">🔐</div>
          <h2>Mot de passe oublié ?</h2>
          <p>Entrez votre login pour recevoir un lien de réinitialisation</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login">Login *</label>
            <input
              type="text"
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
              placeholder="Votre login"
              disabled={loading}
            />
            <small className="form-hint">
              ℹ️ Utilisez le même login que pour vous connecter
            </small>
          </div>

          {error && (
            <div className="error-message">
              <span>⚠️</span> {error}
            </div>
          )}

          {message && (
            <div className="success-message">
              <span>✅</span> {message}
            </div>
          )}

          {/* Affichage du token pour le développement */}
          {tokenGenerated && (
            <div className="token-box">
              <p className="token-label">🔑 Token généré (développement):</p>
              <div className="token-value">{tokenGenerated}</div>
              <button 
                type="button"
                onClick={goToResetWithToken}
                className="btn-use-token"
              >
                Utiliser ce token →
              </button>
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'Envoi en cours...' : '📧 Envoyer le lien'}
          </button>
        </form>

        <button 
          type="button"
          onClick={() => navigate('/login')} 
          className="btn-link"
        >
          ← Retour à la connexion
        </button>

        
      </div>
    </div>
  );
};

export default ForgotPasswordPage;