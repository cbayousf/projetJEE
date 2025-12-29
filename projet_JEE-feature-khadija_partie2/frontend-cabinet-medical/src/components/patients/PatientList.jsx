import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    TextField,
    InputAdornment,
    Button,
    Typography,
    CircularProgress,
    Alert,
    Fab,
    Paper,
    Chip,
} from '@mui/material';
import {
    Search as SearchIcon,
    Add as AddIcon,
    FilterList as FilterIcon,
} from '@mui/icons-material';
import PatientCard from './PatientCard';
import patientService from '../../services/patientService';
import { toast } from 'react-toastify';

const PatientList = ({ onView, onEdit, onAdd }) => {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [stats, setStats] = useState({ total: 0, nouveaux: 0 });

    useEffect(() => {
        loadPatients();
        loadStats();
    }, []);

    const loadPatients = async () => {
        try {
            setLoading(true);
            const data = await patientService.getAllPatients();
            setPatients(data);
            setFilteredPatients(data);
        } catch (error) {
            toast.error('Erreur lors du chargement des patients');
            console.error('Erreur:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadStats = async () => {
        try {
            const statsData = await patientService.getPatientStats();
            setStats(statsData);
        } catch (error) {
            console.error('Erreur stats:', error);
        }
    };

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = patients.filter(
            (patient) =>
                patient.nom.toLowerCase().includes(value) ||
                patient.prenom.toLowerCase().includes(value) ||
                patient.cin.toLowerCase().includes(value)
        );
        setFilteredPatients(filtered);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress size={60} sx={{ color: '#4FC3F7' }} />
            </Box>
        );
    }

    return (
        <Box>
            {/* En-tête avec statistiques */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 3, color: '#263238' }}>
                    📋 Gestion des Patients
                </Typography>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper
                            sx={{
                                p: 3,
                                background: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)',
                                color: 'white',
                                borderRadius: 3,
                            }}
                        >
                            <Typography variant="h3" sx={{ fontWeight: 700 }}>
                                {stats.totalPatients}
                            </Typography>
                            <Typography variant="body1">Total Patients</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper
                            sx={{
                                p: 3,
                                background: 'linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%)',
                                color: 'white',
                                borderRadius: 3,
                            }}
                        >
                            <Typography variant="h3" sx={{ fontWeight: 700 }}>
                                {stats.nouveauxPatientsMois}
                            </Typography>
                            <Typography variant="body1">Nouveaux ce mois</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            {/* Barre de recherche */}
            <Paper sx={{ p: 2, mb: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(79, 195, 247, 0.15)' }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={8}>
                        <TextField
                            fullWidth
                            placeholder="Rechercher par nom, prénom ou CIN..."
                            value={searchTerm}
                            onChange={handleSearch}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#4FC3F7' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&:hover fieldset': {
                                        borderColor: '#4FC3F7',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#29B6F6',
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<FilterIcon />}
                            sx={{
                                borderColor: '#4FC3F7',
                                color: '#4FC3F7',
                                '&:hover': {
                                    borderColor: '#29B6F6',
                                    bgcolor: 'rgba(79, 195, 247, 0.1)',
                                },
                            }}
                        >
                            Filtres
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            {/* Liste des patients */}
            {filteredPatients.length === 0 ? (
                <Alert
                    severity="info"
                    sx={{
                        borderRadius: 3,
                        bgcolor: '#E1F5FE',
                        color: '#01579B',
                    }}
                >
                    {searchTerm ? 'Aucun patient trouvé pour cette recherche' : 'Aucun patient enregistré'}
                </Alert>
            ) : (
                <>
                    <Box sx={{ mb: 2 }}>
                        <Chip
                            label={`${filteredPatients.length} patient(s) trouvé(s)`}
                            sx={{ bgcolor: '#E1F5FE', color: '#01579B', fontWeight: 600 }}
                        />
                    </Box>
                    <Grid container spacing={3}>
                        {filteredPatients.map((patient) => (
                            <Grid item xs={12} sm={6} md={4} key={patient.id}>
                                <PatientCard
                                    patient={patient}
                                    onView={onView}
                                    onEdit={onEdit}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </>
            )}

            {/* Bouton flottant pour ajouter */}
            <Fab
                color="primary"
                aria-label="add"
                onClick={onAdd}
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    background: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #29B6F6 0%, #039BE5 100%)',
                    },
                }}
            >
                <AddIcon />
            </Fab>
        </Box>
    );
};

export default PatientList;