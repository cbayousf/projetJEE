import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/admin/LoginForm';

const Login = () => {
    const navigate = useNavigate();

    const handleLoginSuccess = (user) => {
        if (user.role === 'ADMINISTRATEUR' || user.role === 'ADMIN') {
            navigate('/admin/dashboard');
        } else if (user.role === 'MEDECIN') {
            navigate('/doctor/patients');
        } else if (user.role === 'SECRETAIRE') {
            navigate('/secretary/rendezvous');
        }
    };

    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
};

export default Login;
