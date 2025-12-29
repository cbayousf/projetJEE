import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/admin/LoginForm';

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (user) => {
    if (user.role === 'ADMINISTRATEUR') {
      navigate('/admin/dashboard');
    }
  };

  return <LoginForm onLoginSuccess={handleLoginSuccess} />;
};

export default Login;