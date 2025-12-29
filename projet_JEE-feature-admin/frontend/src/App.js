import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import ForgotPasswordPage from './pages/ForgotPasswordPage';  // ⭐ NOUVEAU
import ResetPasswordPage from './pages/ResetPasswordPage';    // ✅ Existant
import AdminDashboard from './pages/AdminDashboard';
import CabinetsPage from './pages/CabinetsPage';
import UsersPage from './pages/UsersPage';
import SpecialitesPage from './pages/SpecialitesPage';
import MedicamentsPage from './pages/MedicamentsPage';
import AdminNavbar from './components/admin/AdminNavbar';
import AdminSidebar from './components/admin/AdminSidebar';
import authService from './services/authService';
import './App.css';

// Composant pour protéger les routes
const PrivateRoute = ({ children }) => {
  return authService.isAuthenticated() ? children : <Navigate to="/login" />;
};

// Layout Admin avec Navbar + Sidebar
const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminNavbar />
      <div className="admin-content">
        <AdminSidebar />
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========== ROUTES PUBLIQUES ========== */}
        
        {/* Page de connexion */}
        <Route path="/login" element={<Login />} />
        
        {/* ⭐ NOUVEAU: Page "Mot de passe oublié" (demande) */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* ✅ Page de réinitialisation avec token (existante) */}
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* ========== ROUTES PROTÉGÉES ADMIN ========== */}
        
        {/* Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </PrivateRoute>
          }
        />

        {/* CRUD Cabinets */}
        <Route
          path="/admin/cabinets"
          element={
            <PrivateRoute>
              <AdminLayout>
                <CabinetsPage />
              </AdminLayout>
            </PrivateRoute>
          }
        />

        {/* CRUD Utilisateurs */}
        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <AdminLayout>
                <UsersPage />
              </AdminLayout>
            </PrivateRoute>
          }
        />

        {/* CRUD Spécialités */}
        <Route
          path="/admin/specialites"
          element={
            <PrivateRoute>
              <AdminLayout>
                <SpecialitesPage />
              </AdminLayout>
            </PrivateRoute>
          }
        />

        {/* CRUD Médicaments */}
        <Route
          path="/admin/medicaments"
          element={
            <PrivateRoute>
              <AdminLayout>
                <MedicamentsPage />
              </AdminLayout>
            </PrivateRoute>
          }
        />

        {/* ========== REDIRECTIONS ========== */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;