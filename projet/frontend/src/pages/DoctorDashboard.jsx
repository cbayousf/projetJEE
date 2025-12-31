import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    Chip,
    Avatar,
    Divider
} from '@mui/material';
import {
    People as PeopleIcon,
    CalendarToday as CalendarIcon,
    MedicalServices as MedicalIcon,
    ExitToApp as LogoutIcon,
    Schedule as ScheduleIcon
} from '@mui/icons-material';

const DoctorDashboard = ({ user, onLogout }) => {
    const [todayAppointments, setTodayAppointments] = useState([]);
    const [stats, setStats] = useState({
        todayAppointments: 0,
        totalPatients: 0,
        pendingConsultations: 0
    });

    useEffect(() => {
        // Mock data - replace with actual API calls
        setStats({
            todayAppointments: 4,
            totalPatients: 25,
            pendingConsultations: 2
        });

        setTodayAppointments([
            {
                id: 1,
                time: '09:00',
                patient: 'Ahmed El Amrani',
                type: 'Consultation',
                status: 'confirmed'
            },
            {
                id: 2,
                time: '10:30',
                patient: 'Samira Bennani',
                type: 'Suivi',
                status: 'confirmed'
            },
            {
                id: 3,
                time: '14:00',
                patient: 'Mohammed Khalil',
                type: 'Urgence',
                status: 'pending'
            },
            {
                id: 4,
                time: '16:30',
                patient: 'Amina Zahra',
                type: 'Consultation',
                status: 'confirmed'
            }
        ]);
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'success';
            case 'pending': return 'warning';
            case 'cancelled': return 'error';
            default: return 'default';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'confirmed': return 'Confirmé';
            case 'pending': return 'En attente';
            case 'cancelled': return 'Annulé';
            default: return status;
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Bonjour Dr. {user?.nom} {user?.prenom}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Tableau de bord Médecin
                    </Typography>
                </Box>
                <Button
                    variant="outlined"
                    startIcon={<LogoutIcon />}
                    onClick={onLogout}
                    sx={{ minWidth: 120 }}
                >
                    Déconnexion
                </Button>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} mb={4}>
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <CalendarIcon sx={{ fontSize: 40, color: '#1976d2', mb: 2 }} />
                            <Typography variant="h4" component="div" fontWeight="bold">
                                {stats.todayAppointments}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Rendez-vous aujourd'hui
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <PeopleIcon sx={{ fontSize: 40, color: '#2e7d32', mb: 2 }} />
                            <Typography variant="h4" component="div" fontWeight="bold">
                                {stats.totalPatients}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Patients suivis
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <MedicalIcon sx={{ fontSize: 40, color: '#ed6c02', mb: 2 }} />
                            <Typography variant="h4" component="div" fontWeight="bold">
                                {stats.pendingConsultations}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Consultations en attente
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Today's Appointments */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Rendez-vous d'aujourd'hui
                            </Typography>
                            <List>
                                {todayAppointments.map((appointment, index) => (
                                    <React.Fragment key={appointment.id}>
                                        <ListItem sx={{ py: 2 }}>
                                            <Avatar sx={{ mr: 2, bgcolor: '#1976d2' }}>
                                                <ScheduleIcon />
                                            </Avatar>
                                            <ListItemText
                                                primary={
                                                    <Box display="flex" alignItems="center" gap={2}>
                                                        <Typography variant="h6">
                                                            {appointment.time} - {appointment.patient}
                                                        </Typography>
                                                        <Chip
                                                            label={getStatusLabel(appointment.status)}
                                                            color={getStatusColor(appointment.status)}
                                                            size="small"
                                                        />
                                                    </Box>
                                                }
                                                secondary={appointment.type}
                                            />
                                            <Box>
                                                <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                                                    Détails
                                                </Button>
                                                <Button variant="contained" size="small">
                                                    Commencer
                                                </Button>
                                            </Box>
                                        </ListItem>
                                        {index < todayAppointments.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Actions rapides
                            </Typography>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Button variant="contained" fullWidth>
                                    Nouveau rendez-vous
                                </Button>
                                <Button variant="contained" fullWidth>
                                    Consulter dossiers
                                </Button>
                                <Button variant="contained" fullWidth>
                                    Prescrire ordonnance
                                </Button>
                                <Button variant="outlined" fullWidth>
                                    Voir statistiques
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Recent Activity */}
                    <Card sx={{ mt: 3 }}>
                        <CardContent>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Activité récente
                            </Typography>
                            <List dense>
                                <ListItem>
                                    <ListItemText
                                        primary="Consultation terminée"
                                        secondary="Ahmed El Amrani - 2h ago"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Ordonnance prescrite"
                                        secondary="Samira Bennani - 4h ago"
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Rendez-vous modifié"
                                        secondary="Mohammed Khalil - 6h ago"
                                    />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default DoctorDashboard;
