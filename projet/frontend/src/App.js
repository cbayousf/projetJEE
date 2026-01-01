import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import SecretaryDashboard from './pages/SecretaryDashboard';
import Home from './pages/Home';
import Patients from './pages/Patients';
import PatientDetail from './pages/PatientDetail';
import Statistics from './pages/Statistics';

// Layout
import Layout from './components/doctor/layout/Layout';

import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#7C4DFF',
    },
    secondary: {
      main: '#E91E63',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger l'utilisateur depuis localStorage au démarrage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Protected Route component
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/dashboard" replace />;
    }

    return children;
  };

  // Dashboard redirect based on role
  const DashboardRedirect = () => {
    if (!user) return <Navigate to="/login" replace />;

    switch (user.role) {
      case 'ADMINISTRATEUR':
        return <Navigate to="/admin/dashboard" replace />;
      case 'MEDECIN':
        return <Navigate to="/doctor/home" replace />;
      case 'SECRETAIRE':
        return <Navigate to="/secretary/dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  };

  if (loading) {
    return <div>Loading application...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Welcome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />

            {/* Dashboard redirect */}
            <Route path="/dashboard" element={<DashboardRedirect />} />

            {/* Admin routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['ADMINISTRATEUR']}>
                  <AdminDashboard user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

            {/* Doctor routes - Wrapped in Layout */}
            <Route
              path="/doctor/*"
              element={
                <ProtectedRoute allowedRoles={['MEDECIN']}>
                  <Layout>
                    <Routes>
                      <Route path="home" element={<Home />} />
                      <Route path="patients" element={<Patients />} />
                      <Route path="patients/:id" element={<PatientDetail />} />
                      <Route path="statistics" element={<Statistics />} />
                      <Route path="dashboard" element={<Navigate to="/doctor/home" replace />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Secretary routes */}
            <Route
              path="/secretary/dashboard"
              element={
                <ProtectedRoute allowedRoles={['SECRETAIRE']}>
                  <SecretaryDashboard user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          {/* Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;