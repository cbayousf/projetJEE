import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    CircularProgress,
} from '@mui/material';
import {
    People as PeopleIcon,
    TrendingUp as TrendingUpIcon,
    Description as DescriptionIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import patientService from '../services/patientService';
import { toast } from 'react-toastify';

const Home = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalPatients: 0,
        nouveauxPatientsMois: 0,
    });
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [statsData, patientsData] = await Promise.all([
                patientService.getPatientStats(),
                patientService.getAllPatients(),
            ]);
            setStats(statsData);
            setPatients(patientsData);
        } catch (error) {
            toast.error('Erreur lors du chargement des données');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Calculer la répartition par sexe
    const getSexeData = () => {
        const masculin = patients.filter((p) => p.sexe === 'M').length;
        const feminin = patients.filter((p) => p.sexe === 'F').length;
        return [
            { name: 'Masculin', value: masculin },
            { name: 'Féminin', value: feminin },
        ];
    };

    // Calculer les patients par mois (6 derniers mois)
    const getMonthlyData = () => {
        const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
        const currentMonth = new Date().getMonth();
        const monthCounts = Array(6).fill(0);

        patients.forEach((patient) => {
            if (patient.dateCreation) {
                const patientDate = new Date(patient.dateCreation);
                const patientMonth = patientDate.getMonth();
                const monthDiff = currentMonth - patientMonth;

                if (monthDiff >= 0 && monthDiff < 6) {
                    monthCounts[5 - monthDiff]++;
                }
            }
        });

        return Array(6).fill(0).map((_, index) => {
            const monthIndex = (currentMonth - 5 + index + 12) % 12;
            return {
                mois: months[monthIndex],
                patients: monthCounts[index],
            };
        });
    };

    const COLORS = ['#7C4DFF', '#E91E63']; // Violet et Rose

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress size={60} sx={{ color: '#7C4DFF' }} />
            </Box>
        );
    }

    const statsData = [
        {
            title: 'Total Patients',
            value: stats.totalPatients,
            icon: <PeopleIcon sx={{ fontSize: 48 }} />,
            gradient: 'linear-gradient(135deg, #7C4DFF 0%, #6A1B9A 100%)',
        },
        {
            title: 'Nouveaux ce mois',
            value: stats.nouveauxPatientsMois,
            icon: <TrendingUpIcon sx={{ fontSize: 48 }} />,
            gradient: 'linear-gradient(135deg, #AB47BC 0%, #8E24AA 100%)',
        },
        {
            title: 'Documents',
            value: '0',
            icon: <DescriptionIcon sx={{ fontSize: 48 }} />,
            gradient: 'linear-gradient(135deg, #CE93D8 0%, #BA68C8 100%)',
        },
    ];

    return (
        <Box>
            {/* Hero Section */}
            <Paper
                sx={{
                    p: 4,
                    mb: 4,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #7C4DFF 0%, #6A1B9A 100%)',
                    color: 'white',
                }}
            >
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                    🏥 Bienvenue sur le Module Patient
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    Gérez vos patients, dossiers médicaux et documents en toute simplicité
                </Typography>
            </Paper>

            {/* Statistics Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {statsData.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                height: '100%',
                                background: stat.gradient,
                                color: 'white',
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'translateY(-8px)',
                                },
                            }}
                        >
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    {stat.icon}
                                </Box>
                                <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                                    {stat.value}
                                </Typography>
                                <Typography variant="body1">{stat.title}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Graphiques */}
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                📊 Statistiques Réelles
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {/* Graphique Répartition par Sexe */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#7C4DFF' }}>
                            Répartition par Sexe
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={getSexeData()}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) =>
                                        `${name} ${(percent * 100).toFixed(0)}%`
                                    }
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {getSexeData().map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Graphique Patients par Mois */}
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: '#7C4DFF' }}>
                            Nouveaux Patients par Mois
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={getMonthlyData()}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="mois" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="patients" fill="#7C4DFF" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>

            {/* Quick Action - Un seul bouton */}
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                ⚡ Action Rapide
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            p: 4,
                            borderRadius: 3,
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            background: 'linear-gradient(135deg, #E1BEE7 0%, #FFFFFF 100%)',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: '0 12px 24px rgba(124, 77, 255, 0.3)',
                            },
                        }}
                        onClick={() => navigate('/patients')}
                    >
                        <PeopleIcon sx={{ fontSize: 48, color: '#7C4DFF', mb: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, color: '#6A1B9A' }}>
                            Gérer les Patients
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Accédez à la liste complète des patients, ajoutez-en de nouveaux et gérez leurs dossiers médicaux
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Home;