import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/admin/LoginForm';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();

    const handleLoginSuccess = (user) => {
        // Update the user state in App.js
        if (onLogin) {
            onLogin(user);
        }

        // Navigate based on role
        if (user.role === 'ADMINISTRATEUR' || user.role === 'ADMIN') {
            navigate('/admin/dashboard');
        } else if (user.role === 'MEDECIN') {
            navigate('/doctor/patients');
        } else if (user.role === 'SECRETAIRE') {
            navigate('/secretary/dashboard');
        }
    };

    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
};

export default Login;
