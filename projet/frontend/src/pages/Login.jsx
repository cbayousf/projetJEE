import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/admin/LoginForm';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();

    const handleLoginSuccess = (user) => {
        console.log('✅ Login réussi:', user);
        
        // Mettre à jour l'état dans App.js
        if (onLogin) {
            onLogin(user);
        }

        // Sauvegarder dans localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', user.token);

        // Navigation basée sur le rôle
        console.log('🔄 Navigation vers le dashboard pour le rôle:', user.role);
        
        if (user.role === 'ADMINISTRATEUR' || user.role === 'ADMIN') {
            navigate('/admin/dashboard');
        } else if (user.role === 'MEDECIN') {
            navigate('/doctor/home');
        } else if (user.role === 'SECRETAIRE') {
            navigate('/secretary/dashboard');
        } else {
            console.error('❌ Rôle inconnu:', user.role);
            navigate('/');
        }
    };

    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
};

export default Login;