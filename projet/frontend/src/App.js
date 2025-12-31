import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import LoginForm from './components/admin/LoginForm';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import SecretaryDashboard from './pages/SecretaryDashboard';
import PatientList from './components/patients/PatientList';
import PatientForm from './components/patients/PatientForm';
import PatientDetails from './components/patients/PatientDetails';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    // Store user in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Protected Route component
  const ProtectedRoute = ({ children, allowedRoles }) => {
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
        return <Navigate to="/doctor/dashboard" replace />;
      case 'SECRETAIRE':
        return <Navigate to="/secretary/dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Welcome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />

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

            {/* Doctor routes */}
            <Route
              path="/doctor/dashboard"
              element={
                <ProtectedRoute allowedRoles={['MEDECIN']}>
                  <DoctorDashboard user={user} onLogout={handleLogout} />
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

            {/* Patient management routes (accessible by all authenticated users) */}
            <Route
              path="/patients"
              element={
                <ProtectedRoute>
                  <PatientList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patients/new"
              element={
                <ProtectedRoute>
                  <PatientForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patients/:id"
              element={
                <ProtectedRoute>
                  <PatientDetails />
                </ProtectedRoute>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
