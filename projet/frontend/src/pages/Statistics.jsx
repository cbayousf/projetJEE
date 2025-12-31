import React from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';

const Statistics = () => {
    // Données de démonstration
    const monthlyData = [
        { mois: 'Jan', patients: 12 },
        { mois: 'Fév', patients: 15 },
        { mois: 'Mar', patients: 20 },
        { mois: 'Avr', patients: 18 },
        { mois: 'Mai', patients: 25 },
        { mois: 'Juin', patients: 22 },
    ];

    const sexeData = [
        { name: 'Hommes', value: 45 },
        { name: 'Femmes', value: 55 },
    ];

    const COLORS = ['#4FC3F7', '#F48FB1'];

    return (
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 4 }}>
                📊 Statistiques
            </Typography>

            <Grid container spacing={3}>
                {/* Graphique des nouveaux patients */}
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                            Nouveaux Patients par Mois
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="mois" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="patients" fill="#4FC3F7" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* Répartition par sexe */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 3, borderRadius: 3 }}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                            Répartition par Sexe
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={sexeData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) =>
                                        `${name} ${(percent * 100).toFixed(0)}%`
                                    }
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {sexeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Statistics;