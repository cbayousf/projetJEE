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
    Avatar
} from '@mui/material';
import {
    People as PeopleIcon,
    MedicalServices as MedicalIcon,
    CalendarToday as CalendarIcon,
    AttachMoney as MoneyIcon,
    ExitToApp as LogoutIcon
} from '@mui/icons-material';

const AdminDashboard = ({ user, onLogout }) => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalPatients: 0,
        totalAppointments: 0,
        totalRevenue: 0
    });

    const [recentActivities, setRecentActivities] = useState([]);

    useEffect(() => {
        // Mock data - replace with actual API calls
        setStats({
            totalUsers: 6,
            totalPatients: 6,
            totalAppointments: 6,
            totalRevenue: 900
        });

        setRecentActivities([
            { id: 1, action: 'New user registered', time: '2 hours ago', type: 'user' },
            { id: 2, action: 'Appointment scheduled', time: '4 hours ago', type: 'appointment' },
            { id: 3, action: 'Payment received', time: '6 hours ago', type: 'payment' }
        ]);
    }, []);

    const statCards = [
        {
            title: 'Total Users',
            value: stats.totalUsers,
            icon: <PeopleIcon sx={{ fontSize: 40, color: '#1976d2' }} />,
            color: '#e3f2fd'
        },
        {
            title: 'Total Patients',
            value: stats.totalPatients,
            icon: <MedicalIcon sx={{ fontSize: 40, color: '#2e7d32' }} />,
            color: '#e8f5e8'
        },
        {
            title: 'Appointments Today',
            value: stats.totalAppointments,
            icon: <CalendarIcon sx={{ fontSize: 40, color: '#ed6c02' }} />,
            color: '#fff3e0'
        },
        {
            title: 'Monthly Revenue',
            value: `$${stats.totalRevenue}`,
            icon: <MoneyIcon sx={{ fontSize: 40, color: '#9c27b0' }} />,
            color: '#f3e5f5'
        }
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Box>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Welcome back, {user?.nom} {user?.prenom}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Administrator Dashboard
                    </Typography>
                </Box>
                <Button
                    variant="outlined"
                    startIcon={<LogoutIcon />}
                    onClick={onLogout}
                    sx={{ minWidth: 120 }}
                >
                    Logout
                </Button>
            </Box>

            {/* Stats Cards */}
            <Grid container spacing={3} mb={4}>
                {statCards.map((card, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card sx={{ backgroundColor: card.color }}>
                            <CardContent sx={{ textAlign: 'center', py: 3 }}>
                                <Box mb={2}>
                                    {card.icon}
                                </Box>
                                <Typography variant="h4" component="div" fontWeight="bold">
                                    {card.value}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {card.title}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Recent Activities */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Recent Activities
                            </Typography>
                            <List>
                                {recentActivities.map((activity) => (
                                    <ListItem key={activity.id} divider>
                                        <ListItemText
                                            primary={activity.action}
                                            secondary={activity.time}
                                        />
                                        <Chip
                                            label={activity.type}
                                            size="small"
                                            color={
                                                activity.type === 'user' ? 'primary' :
                                                    activity.type === 'appointment' ? 'warning' : 'success'
                                            }
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="h2" gutterBottom>
                                Quick Actions
                            </Typography>
                            <Box display="flex" flexDirection="column" gap={2}>
                                <Button variant="contained" fullWidth>
                                    Manage Users
                                </Button>
                                <Button variant="contained" fullWidth>
                                    View Reports
                                </Button>
                                <Button variant="contained" fullWidth>
                                    System Settings
                                </Button>
                                <Button variant="outlined" fullWidth>
                                    Export Data
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminDashboard;
