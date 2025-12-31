import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    InputAdornment,
    IconButton
} from '@mui/material';
import {
    Email,
    Lock,
    Visibility,
    VisibilityOff,
    Login as LoginIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const LoginForm = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'L\'email est requis';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Format d\'email invalide';
        }

        if (!formData.password) {
            newErrors.password = 'Le mot de passe est requis';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Simulate API call - replace with actual authentication
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            if (response.ok) {
                const userData = await response.json();

                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('token', userData.token);

                toast.success(`Bienvenue ${userData.prenom} ${userData.nom} !`);

                // Navigate based on role
                if (onLoginSuccess) {
                    onLoginSuccess(userData);
                } else {
                    // Default navigation based on role
                    switch (userData.role) {
                        case 'ADMINISTRATEUR':
                        case 'ADMIN':
                            navigate('/admin/dashboard');
                            break;
                        case 'MEDECIN':
                            navigate('/doctor/patients');
                            break;
                        case 'SECRETAIRE':
                            navigate('/secretary/rendezvous');
                            break;
                        default:
                            navigate('/home');
                    }
                }
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Email ou mot de passe incorrect');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Erreur de connexion au serveur');

            // For demo purposes, simulate login with different roles
            if (formData.email === 'admin@cabinet.com' && formData.password === 'admin123') {
                const mockUser = {
                    id: 1,
                    nom: 'Admin',
                    prenom: 'System',
                    email: formData.email,
                    role: 'ADMINISTRATEUR',
                    token: 'mock-token-admin'
                };
                localStorage.setItem('user', JSON.stringify(mockUser));
                localStorage.setItem('token', mockUser.token);
                toast.success('Connexion réussie (mode démo)');
                navigate('/admin/dashboard');
            } else if (formData.email === 'medecin@cabinet.com' && formData.password === 'medecin123') {
                const mockUser = {
                    id: 2,
                    nom: 'Martin',
                    prenom: 'Dr. Jean',
                    email: formData.email,
                    role: 'MEDECIN',
                    token: 'mock-token-medecin'
                };
                localStorage.setItem('user', JSON.stringify(mockUser));
                localStorage.setItem('token', mockUser.token);
                toast.success('Connexion réussie (mode démo)');
                navigate('/doctor/patients');
            } else if (formData.email === 'secretaire@cabinet.com' && formData.password === 'secretaire123') {
                const mockUser = {
                    id: 3,
                    nom: 'Dubois',
                    prenom: 'Marie',
                    email: formData.email,
                    role: 'SECRETAIRE',
                    token: 'mock-token-secretaire'
                };
                localStorage.setItem('user', JSON.stringify(mockUser));
                localStorage.setItem('token', mockUser.token);
                toast.success('Connexion réussie (mode démo)');
                navigate('/secretary/rendezvous');
            } else {
                toast.error('Email ou mot de passe incorrect');
            }
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 4
        }}>
            <Container maxWidth="sm">
                <Paper elevation={10} sx={{
                    p: 4,
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.95)'
                }}>
                    <Box textAlign="center" sx={{ mb: 4 }}>
                        <LoginIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Connexion
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Cabinet Médical - Système de Gestion
                        </Typography>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            sx={{ mb: 2 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            fullWidth
                            label="Mot de passe"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                            sx={{ mb: 3 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={togglePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{
                                py: 1.5,
                                fontSize: '1.1rem',
                                borderRadius: 2,
                                mb: 2
                            }}
                        >
                            {loading ? 'Connexion en cours...' : 'Se connecter'}
                        </Button>

                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <Typography variant="body2">
                                Pas encore de compte ?{' '}
                                <Button
                                    onClick={() => navigate('/register')}
                                    sx={{ textTransform: 'none', p: 0, minHeight: 'auto' }}
                                >
                                    S'inscrire
                                </Button>
                            </Typography>
                        </Box>

                        {/* Demo credentials */}
                        <Alert severity="info" sx={{ mt: 3 }}>
                            <Typography variant="subtitle2" gutterBottom>
                                Comptes de démonstration :
                            </Typography>
                            <Typography variant="caption" display="block">
                                • Admin: admin@cabinet.com / admin123
                            </Typography>
                            <Typography variant="caption" display="block">
                                • Médecin: medecin@cabinet.com / medecin123
                            </Typography>
                            <Typography variant="caption" display="block">
                                • Secrétaire: secretaire@cabinet.com / secretaire123
                            </Typography>
                        </Alert>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default LoginForm;
