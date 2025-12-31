import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Button,
    Box,
    Grid,
    Card,
    CardContent,
    Chip
} from '@mui/material';
import {
    LocalHospital,
    People,
    Assessment,
    CalendarToday,
    PersonAdd,
    Login
} from '@mui/icons-material';

const Welcome = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <People sx={{ fontSize: 40, color: 'primary.main' }} />,
            title: 'Gestion des Patients',
            description: 'Suivi complet des dossiers médicaux et informations personnelles'
        },
        {
            icon: <CalendarToday sx={{ fontSize: 40, color: 'primary.main' }} />,
            title: 'Rendez-vous',
            description: 'Planification et gestion des consultations médicales'
        },
        {
            icon: <Assessment sx={{ fontSize: 40, color: 'primary.main' }} />,
            title: 'Statistiques',
            description: 'Rapports et analyses pour une meilleure prise de décision'
        },
        {
            icon: <LocalHospital sx={{ fontSize: 40, color: 'primary.main' }} />,
            title: 'Documents Médicaux',
            description: 'Archivage sécurisé des ordonnances et documents'
        }
    ];

    const roles = [
        {
            title: 'Médecin',
            description: 'Accès aux dossiers patients, consultations, ordonnances',
            color: 'success'
        },
        {
            title: 'Secrétaire',
            description: 'Gestion des rendez-vous, patients, facturation',
            color: 'info'
        },
        {
            title: 'Administrateur',
            description: 'Configuration système, gestion utilisateurs, rapports',
            color: 'warning'
        }
    ];

    return (
        <Box sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            py: 4
        }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box textAlign="center" sx={{ mb: 6 }}>
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            mb: 2,
                            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                        }}
                    >
                        🏥 Cabinet Médical
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            color: 'white',
                            mb: 4,
                            opacity: 0.9
                        }}
                    >
                        Système de Gestion Intégré pour Cabinets Médicaux
                    </Typography>

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 4 }}>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<PersonAdd />}
                            onClick={() => navigate('/register')}
                            sx={{
                                bgcolor: 'white',
                                color: 'primary.main',
                                '&:hover': {
                                    bgcolor: 'grey.100'
                                },
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem'
                            }}
                        >
                            S'inscrire
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            startIcon={<Login />}
                            onClick={() => navigate('/login')}
                            sx={{
                                borderColor: 'white',
                                color: 'white',
                                '&:hover': {
                                    borderColor: 'grey.300',
                                    bgcolor: 'rgba(255,255,255,0.1)'
                                },
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem'
                            }}
                        >
                            Se connecter
                        </Button>
                    </Box>
                </Box>

                {/* Features Section */}
                <Typography
                    variant="h4"
                    align="center"
                    sx={{ color: 'white', mb: 4, fontWeight: 'bold' }}
                >
                    Fonctionnalités Principales
                </Typography>
                <Grid container spacing={3} sx={{ mb: 6 }}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card sx={{
                                height: '100%',
                                bgcolor: 'rgba(255,255,255,0.95)',
                                '&:hover': { transform: 'translateY(-5px)', transition: '0.3s' }
                            }}>
                                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                                    <Box sx={{ mb: 2 }}>
                                        {feature.icon}
                                    </Box>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Roles Section */}
                <Typography
                    variant="h4"
                    align="center"
                    sx={{ color: 'white', mb: 4, fontWeight: 'bold' }}
                >
                    Rôles Disponibles
                </Typography>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {roles.map((role, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Paper sx={{
                                p: 3,
                                textAlign: 'center',
                                bgcolor: 'rgba(255,255,255,0.95)',
                                height: '100%'
                            }}>
                                <Chip
                                    label={role.title}
                                    color={role.color}
                                    sx={{ mb: 2, fontSize: '1rem', py: 1, px: 2 }}
                                />
                                <Typography variant="body1" color="text.secondary">
                                    {role.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>

                {/* Footer */}
                <Box textAlign="center" sx={{ mt: 6 }}>
                    <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
                        © 2024 Cabinet Médical - Système de Gestion Intégré
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Welcome;
