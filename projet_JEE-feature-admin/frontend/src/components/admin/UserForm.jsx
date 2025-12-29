import React, { useState, useEffect } from 'react';
import './FormModal.css';

const UserForm = ({ user, specialites, cabinets, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    login: '',
    pwd: '',
    nom: '',
    prenom: '',
    numTel: '',
    role: 'MEDECIN',
    signature: '',
    cabinetId: '',
    specialiteId: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        login: user.login || '',
        pwd: '',
        nom: user.nom || '',
        prenom: user.prenom || '',
        numTel: user.numTel || '',
        role: user.role || 'MEDECIN',
        signature: user.signature || '',
        cabinetId: user.cabinet?.id || '',
        specialiteId: user.specialite?.id || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-container modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{user ? '✏️ Modifier l\'Utilisateur' : '➕ Nouvel Utilisateur'}</h2>
          <button className="btn-close" onClick={onCancel}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nom">Nom *</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                placeholder="Dupont"
              />
            </div>

            <div className="form-group">
              <label htmlFor="prenom">Prénom *</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
                placeholder="Jean"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="login">Login *</label>
              <input
                type="text"
                id="login"
                name="login"
                value={formData.login}
                onChange={handleChange}
                required
                placeholder="jdupont"
              />
            </div>

            <div className="form-group">
              <label htmlFor="pwd">
                Mot de passe {!user && '*'}
                {user && <span className="hint"> (laisser vide pour ne pas changer)</span>}
              </label>
              <input
                type="password"
                id="pwd"
                name="pwd"
                value={formData.pwd}
                onChange={handleChange}
                required={!user}
                placeholder="********"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="numTel">Téléphone</label>
              <input
                type="tel"
                id="numTel"
                name="numTel"
                value={formData.numTel}
                onChange={handleChange}
                placeholder="0612345678"
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Rôle *</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="MEDECIN">👨‍⚕️ Médecin</option>
                <option value="SECRETAIRE">👩‍💼 Secrétaire</option>
                <option value="ADMINISTRATEUR">👔 Administrateur</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="cabinetId">Cabinet</label>
            <select
              id="cabinetId"
              name="cabinetId"
              value={formData.cabinetId}
              onChange={handleChange}
            >
              <option value="">-- Sélectionner un cabinet --</option>
              {cabinets.map((cab) => (
                <option key={cab.id} value={cab.id}>
                  {cab.nom}
                </option>
              ))}
            </select>
          </div>

          {formData.role === 'MEDECIN' && (
            <>
              <div className="form-group">
                <label htmlFor="specialiteId">Spécialité</label>
                <select
                  id="specialiteId"
                  name="specialiteId"
                  value={formData.specialiteId}
                  onChange={handleChange}
                >
                  <option value="">-- Sélectionner une spécialité --</option>
                  {specialites.map((spec) => (
                    <option key={spec.id} value={spec.id}>
                      {spec.nom}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="signature">Signature (URL)</label>
                <input
                  type="url"
                  id="signature"
                  name="signature"
                  value={formData.signature}
                  onChange={handleChange}
                  placeholder="https://example.com/signature.png"
                />
                {formData.signature && (
                  <div className="logo-preview">
                    <img src={formData.signature} alt="Signature" />
                  </div>
                )}
              </div>
            </>
          )}

          <div className="modal-footer">
            <button type="button" onClick={onCancel} className="btn-secondary">
              Annuler
            </button>
            <button type="submit" className="btn-primary">
              {user ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;