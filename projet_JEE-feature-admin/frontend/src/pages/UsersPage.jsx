import React, { useState, useEffect } from 'react';
import userService from '../services/userService';
import cabinetService from '../services/cabinetService';
import specialiteService from '../services/specialiteService';
import UserForm from '../components/admin/UserForm';
import './CRUDPage.css';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [cabinets, setCabinets] = useState([]);
  const [specialites, setSpecialites] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  useEffect(() => {
    loadUsers();
    loadCabinets();
    loadSpecialites();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  const loadCabinets = async () => {
    try {
      const data = await cabinetService.getAll();
      setCabinets(data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const loadSpecialites = async () => {
    try {
      const data = await specialiteService.getAll();
      setSpecialites(data);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleCreate = () => {
    setSelectedUser(null);
    setShowForm(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedUser) {
        await userService.update(selectedUser.id, formData);
        alert('✅ Utilisateur modifié avec succès');
      } else {
        await userService.create(formData);
        alert('✅ Utilisateur créé avec succès');
      }
      setShowForm(false);
      loadUsers();
    } catch (error) {
      console.error('Erreur:', error);
      alert('❌ Erreur lors de l\'enregistrement');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('⚠️ Voulez-vous vraiment supprimer cet utilisateur ?')) {
      try {
        await userService.delete(id);
        alert('✅ Utilisateur supprimé avec succès');
        loadUsers();
      } catch (error) {
        console.error('Erreur:', error);
        alert('❌ Erreur lors de la suppression');
      }
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.login.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  const getRoleBadgeClass = (role) => {
    switch(role) {
      case 'MEDECIN': return 'role-medecin';
      case 'SECRETAIRE': return 'role-secretaire';
      case 'ADMINISTRATEUR': return 'role-admin';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="page-loading">
        <div className="loading-spinner"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div className="crud-page">
      <div className="page-header">
        <div>
          <h1>👥 Gestion des Utilisateurs</h1>
          <p className="page-subtitle">{users.length} utilisateur(s) enregistré(s)</p>
        </div>
        <button onClick={handleCreate} className="btn-add">
          <span className="btn-icon">➕</span>
          Nouvel Utilisateur
        </button>
      </div>

      <div className="page-toolbar">
        <div className="search-box search-box-large">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Rechercher par nom, prénom ou login..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <label>Rôle:</label>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="ALL">Tous</option>
            <option value="MEDECIN">👨‍⚕️ Médecins</option>
            <option value="SECRETAIRE">👩‍💼 Secrétaires</option>
            <option value="ADMINISTRATEUR">👔 Administrateurs</option>
          </select>
        </div>

        <div className="toolbar-info">
          <span className="result-count">{filteredUsers.length} résultat(s)</span>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom Complet</th>
              <th>Login</th>
              <th>Téléphone</th>
              <th>Rôle</th>
              <th>Cabinet</th>
              <th>Spécialité</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-message">
                  {searchTerm ? 'Aucun résultat trouvé' : 'Aucun utilisateur enregistré'}
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>#{user.id}</td>
                  <td className="text-bold">{user.prenom} {user.nom}</td>
                  <td>{user.login}</td>
                  <td>{user.numTel || '-'}</td>
                  <td>
                    <span className={`role-badge ${getRoleBadgeClass(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{user.cabinet?.nom || '-'}</td>
                  <td>
                    {user.specialite ? (
                      <span className="specialite-badge">⚕️ {user.specialite.nom}</span>
                    ) : '-'}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEdit(user)}
                        className="btn-icon btn-edit"
                        title="Modifier"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="btn-icon btn-delete"
                        title="Supprimer"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <UserForm
          user={selectedUser}
          cabinets={cabinets}
          specialites={specialites}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default UsersPage;