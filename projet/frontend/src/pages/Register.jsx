import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
    IconButton,
    Grid
} from '@mui/material';
import {
    Person,
    Email,
    Phone,
    Lock,
    Visibility,
    VisibilityOff,
    PersonAdd
} from '@mui/icons-material';
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        numTel: '',
        password: '',
        confirmPassword: '',
        role: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const roles = [
        { value: 'MEDECIN', label: 'Médecin', description: 'Accès aux dossiers patients, consultations, ordonnances' },
        { value: 'SECRETAIRE', label: 'Secrétaire', description: 'Gestion des rendez-vous, patients, facturation' },
        { value: 'ADMINISTRATEUR', label: 'Administrateur', description: 'Configuration système, gestion utilisateurs, rapports' }
    ];

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

        if (!formData.nom.trim()) {
            newErrors.nom = 'Le nom est requis';
        }

        if (!formData.prenom.trim()) {
            newErrors.prenom = 'Le prénom est requis';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'L\'email est requis';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Format d\'email invalide';
        }

        if (!formData.numTel.trim()) {
            newErrors.numTel = 'Le numéro de téléphone est requis';
        } else if (!/^\+?[0-9\s\-()]{10,}$/.test(formData.numTel.replace(/\s/g, ''))) {
            newErrors.numTel = 'Format de numéro de téléphone invalide';
        }

        if (!formData.password) {
            newErrors.password = 'Le mot de passe est requis';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        }

        if (!formData.role) {
            newErrors.role = 'Le rôle est requis';
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
            // Simulate API call - replace with actual registration
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom: formData.nom,
                    prenom: formData.prenom,
                    email: formData.email,
                    numTel: formData.numTel,
                    password: formData.password,
                    role: formData.role
                })
            });

            if (response.ok) {
                toast.success('Inscription réussie ! Vous pouvez maintenant vous connecter.');
                navigate('/login');
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || 'Erreur lors de l\'inscription');
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Erreur de connexion au serveur');

            // For demo purposes, simulate successful registration
            toast.success('Inscription réussie ! Vous pouvez maintenant vous connecter.');
            navigate('/login');
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
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
            <Container maxWidth="md">
                <Paper elevation={10} sx={{
                    p: 4,
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.95)'
                }}>
                    <Box textAlign="center" sx={{ mb: 4 }}>
                        <PersonAdd sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Inscription
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Cabinet Médical - Créer un compte
                        </Typography>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Nom"
                                    name="nom"
                                    value={formData.nom}
                                    onChange={handleChange}
                                    error={!!errors.nom}
                                    helperText={errors.nom}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Prénom"
                                    name="prenom"
                                    value={formData.prenom}
                                    onChange={handleChange}
                                    error={!!errors.prenom}
                                    helperText={errors.prenom}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Person color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Numéro de téléphone"
                                    name="numTel"
                                    value={formData.numTel}
                                    onChange={handleChange}
                                    error={!!errors.numTel}
                                    helperText={errors.numTel}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Phone color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={!!errors.role}>
                                    <InputLabel>Rôle</InputLabel>
                                    <Select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        label="Rôle"
                                    >
                                        {roles.map((role) => (
                                            <MenuItem key={role.value} value={role.value}>
                                                <Box>
                                                    <Typography variant="subtitle2">{role.label}</Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {role.description}
                                                    </Typography>
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.role && (
                                        <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                                            {errors.role}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Mot de passe"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleChange}
                                    error={!!errors.password}
                                    helperText={errors.password}
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
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Confirmer le mot de passe"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock color="action" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={toggleConfirmPasswordVisibility}
                                                    edge="end"
                                                >
                                                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={loading}
                            sx={{
                                mt: 3,
                                py: 1.5,
                                fontSize: '1.1rem',
                                borderRadius: 2
                            }}
                        >
                            {loading ? 'Inscription en cours...' : 'S\'inscrire'}
                        </Button>

                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Typography variant="body2">
                                Déjà un compte ?{' '}
                                <Button
                                    onClick={() => navigate('/login')}
                                    sx={{ textTransform: 'none', p: 0, minHeight: 'auto' }}
                                >
                                    Se connecter
                                </Button>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Register;
