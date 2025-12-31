import React from 'react';
import { Container, Typography, Paper, Grid, Card, CardContent } from '@mui/material';

const SecretaryDashboard = ({ user, onLogout }) => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom>
                Secretary Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                Welcome, {user?.nom} {user?.prenom}
            </Typography>

            <Grid container spacing={3}>
                {/* Quick Actions */}
                <Grid item xs={12} md={6} lg={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Patient Management
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Manage patient records and appointments
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Appointments
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Schedule and manage appointments
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Reports
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Generate and view reports
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SecretaryDashboard;
