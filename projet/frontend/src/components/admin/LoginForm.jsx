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
    IconButton,
    CircularProgress
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
        console.log('🔐 Tentative de connexion avec:', formData.email);

        try {
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

            console.log('📡 Réponse du serveur:', response.status);

            if (response.ok) {
                const userData = await response.json();
                console.log('✅ Données utilisateur reçues:', userData);

                toast.success(`Bienvenue ${userData.prenom} ${userData.nom} !`);

                if (onLoginSuccess) {
                    onLoginSuccess(userData);
                }
            } else {
                const errorData = await response.json().catch(() => ({ message: 'Erreur de connexion' }));
                console.error('❌ Erreur:', errorData);
                toast.error(errorData.message || 'Email ou mot de passe incorrect');
            }
        } catch (error) {
            console.error('❌ Erreur de connexion:', error);
            toast.error('Impossible de se connecter au serveur. Vérifiez que le backend est démarré.');
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
                            disabled={loading}
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
                            disabled={loading}
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
                                            disabled={loading}
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
                            {loading ? (
                                <>
                                    <CircularProgress size={24} sx={{ mr: 1, color: 'white' }} />
                                    Connexion en cours...
                                </>
                            ) : (
                                'Se connecter'
                            )}
                        </Button>

                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <Typography variant="body2">
                                Pas encore de compte ?{' '}
                                <Button
                                    onClick={() => navigate('/register')}
                                    disabled={loading}
                                    sx={{ textTransform: 'none', p: 0, minHeight: 'auto' }}
                                >
                                    S'inscrire
                                </Button>
                            </Typography>
                        </Box>

                        <Alert severity="info" sx={{ mt: 3 }}>
                            <Typography variant="subtitle2" gutterBottom>
                                🔑 Comptes de test disponibles :
                            </Typography>
                            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                <strong>Admin:</strong> admin@cabinet.com / password123
                            </Typography>
                            <Typography variant="caption" display="block">
                                <strong>Médecin:</strong> medecin1@cabinet.com / password123
                            </Typography>
                            <Typography variant="caption" display="block">
                                <strong>Secrétaire:</strong> secretaire@cabinet.com / password123
                            </Typography>
                        </Alert>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default LoginForm;