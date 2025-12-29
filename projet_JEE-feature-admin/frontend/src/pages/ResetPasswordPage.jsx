import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import passwordResetService from '../services/passwordResetService';
import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Valider le token au chargement
  useEffect(() => {
    if (!token) {
      setError('Token manquant');
      setValidating(false);
      return;
    }

    validateToken();
  }, [token]);

  const validateToken = async () => {
    try {
      const response = await passwordResetService.validateToken(token);
      if (response.success) {
        setTokenValid(true);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Token invalide ou expiré');
    } finally {
      setValidating(false);
    }
  };

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await passwordResetService.resetPassword(
        token,
        passwords.newPassword,
        passwords.confirmPassword
      );

      if (response.success) {
        setMessage(response.message);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError('Erreur lors de la réinitialisation');
    } finally {
      setLoading(false);
    }
  };

  if (validating) {
    return (
      <div className="reset-page">
        <div className="reset-card">
          <div className="loading-spinner"></div>
          <p>Validation du token...</p>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="reset-page">
        <div className="reset-card">
          <div className="error-icon">❌</div>
          <h2>Token Invalide</h2>
          <p>{error || 'Le lien de réinitialisation est invalide ou a expiré.'}</p>
          <button onClick={() => navigate('/login')} className="btn-back">
            Retour à la connexion
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-page">
      <div className="reset-card">
        <div className="reset-header">
          <div className="key-icon">🔑</div>
          <h2>Nouveau Mot de Passe</h2>
          <p>Choisissez un nouveau mot de passe sécurisé</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="newPassword">Nouveau mot de passe</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              required
              minLength="6"
              placeholder="Minimum 6 caractères"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
              placeholder="Retapez votre mot de passe"
            />
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

          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
          </button>
        </form>

        <button onClick={() => navigate('/login')} className="btn-link">
          ← Retour à la connexion
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordPage;