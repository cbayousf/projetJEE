import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';
import './LoginFormPro.css';

const LoginForm = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({ login: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await authService.login(credentials);
      onLoginSuccess(user);
    } catch (err) {
      setError('Identifiants incorrects. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper-pro">
      {/* Overlay sombre sur l'image de fond */}
      <div className="login-overlay"></div>

      {/* Particules flottantes décoratives */}
      <div className="floating-elements">
        <div className="float-elem" style={{ top: '10%', left: '10%', animationDelay: '0s' }}>+</div>
        <div className="float-elem" style={{ top: '20%', right: '15%', animationDelay: '2s' }}>❤</div>
        <div className="float-elem" style={{ bottom: '15%', left: '20%', animationDelay: '4s' }}>✚</div>
        <div className="float-elem" style={{ bottom: '20%', right: '10%', animationDelay: '1s' }}>🏥</div>
      </div>

      <div className="login-container-pro">
        <div className="login-card-pro">
          {/* En-tête avec logo médical */}
          <div className="login-header-pro">
            <div className="logo-medical">
              <div className="logo-cross">
                <span className="cross-vertical"></span>
                <span className="cross-horizontal"></span>
              </div>
            </div>
            <h1>Cabinet Médical</h1>
            <p className="subtitle-pro">Système de Gestion Médicale</p>
            <div className="header-divider"></div>
          </div>

          {/* Formulaire de connexion */}
          <form onSubmit={handleSubmit} className="login-form-pro">
            <div className="form-group-pro">
              <label htmlFor="login">
                <span className="label-icon">👤</span>
                Identifiant
              </label>
              <input
                type="text"
                id="login"
                name="login"
                value={credentials.login}
                onChange={handleChange}
                required
                placeholder="Entrez votre login"
                className="input-pro"
                autoComplete="username"
              />
            </div>

            <div className="form-group-pro">
              <label htmlFor="password">
                <span className="label-icon">🔒</span>
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                placeholder="Entrez votre mot de passe"
                className="input-pro"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="error-message-pro">
                <span className="error-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Lien "Mot de passe oublié" avec React Router */}
            <div className="forgot-password-link">
              <Link to="/forgot-password" className="link-forgot">
                Mot de passe oublié ?
              </Link>
            </div>

            <button type="submit" className="btn-login-pro" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-pro"></span>
                  Connexion en cours...
                </>
              ) : (
                <>
                  <span>Se connecter</span>
                  <span className="arrow-icon">→</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="login-footer-pro">
            <p>© 2025 Cabinet Médical - Tous droits réservés</p>
            <div className="security-badge">
              <span className="lock-icon">🔐</span>
              <span>Connexion sécurisée</span>
            </div>
          </div>
        </div>

        {/* Informations supplémentaires */}
        <div className="info-cards">
          <div className="info-card">
            <span className="info-icon">🏥</span>
            <span>Gestion Complète</span>
          </div>
          <div className="info-card">
            <span className="info-icon">📊</span>
            <span>Suivi Patients</span>
          </div>
          <div className="info-card">
            <span className="info-icon">🔐</span>
            <span>Sécurisé & Confidentiel</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;