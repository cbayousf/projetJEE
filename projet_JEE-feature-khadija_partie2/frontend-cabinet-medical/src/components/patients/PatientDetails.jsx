import React, { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Typography,
    Grid,
    Avatar,
    Chip,
    Divider,
    Button,
    Tab,
    Tabs,
    IconButton,
    Card,
    CardContent,
} from '@mui/material';
import {
    ArrowBack as ArrowBackIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    Cake as CakeIcon,
    LocationOn as LocationIcon,
    Description as DescriptionIcon,
    CloudUpload as CloudUploadIcon,
} from '@mui/icons-material';
import DossierMedical from '../dossiers/DossierMedical';
import DocumentList from '../documents/DocumentList';

const PatientDetails = ({ patient, onBack, onEdit, onDelete }) => {
    const [tabValue, setTabValue] = useState(0);

    const calculateAge = (dateNaissance) => {
        if (!dateNaissance) return '-';
        const today = new Date();
        const birthDate = new Date(dateNaissance);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const formatDate = (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    const getInitials = () => {
        return `${patient.prenom?.charAt(0) || ''}${patient.nom?.charAt(0) || ''}`.toUpperCase();
    };

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton
                    onClick={onBack}
                    sx={{
                        bgcolor: 'white',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        '&:hover': { bgcolor: '#F5F5F5' },
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" sx={{ fontWeight: 600, flex: 1 }}>
                    Détails du Patient
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(patient)}
                    sx={{
                        borderColor: '#4FC3F7',
                        color: '#4FC3F7',
                    }}
                >
                    Modifier
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => onDelete(patient)}
                >
                    Supprimer
                </Button>
            </Box>

            {/* Informations principales */}
            <Paper
                sx={{
                    p: 4,
                    mb: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #E1F5FE 0%, #FFFFFF 100%)',
                }}
            >
                <Grid container spacing={4} alignItems="center">
                    <Grid item>
                        <Avatar
                            sx={{
                                width: 120,
                                height: 120,
                                bgcolor: 'primary.main',
                                fontSize: '3rem',
                                fontWeight: 700,
                                boxShadow: '0 8px 16px rgba(79, 195, 247, 0.3)',
                            }}
                        >
                            {getInitials()}
                        </Avatar>
                    </Grid>

                    <Grid item xs>
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                            {patient.prenom} {patient.nom}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <Chip
                                label={patient.sexe === 'M' ? 'Masculin' : 'Féminin'}
                                sx={{
                                    bgcolor: patient.sexe === 'M' ? '#E3F2FD' : '#FCE4EC',
                                    color: patient.sexe === 'M' ? '#1976D2' : '#C2185B',
                                    fontWeight: 600,
                                }}
                            />
                            <Chip
                                label={`${calculateAge(patient.dateNaissance)} ans`}
                                color="primary"
                                variant="outlined"
                            />
                            {patient.typeMutuelle && (
                                <Chip
                                    label={patient.typeMutuelle}
                                    color="success"
                                    variant="outlined"
                                />
                            )}
                        </Box>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <DescriptionIcon sx={{ color: 'text.secondary' }} />
                                    <Typography variant="body1">
                                        <strong>CIN:</strong> {patient.cin}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CakeIcon sx={{ color: 'text.secondary' }} />
                                    <Typography variant="body1">
                                        <strong>Né(e) le:</strong> {formatDate(patient.dateNaissance)}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PhoneIcon sx={{ color: 'text.secondary' }} />
                                    <Typography variant="body1">
                                        <strong>Tél:</strong> {patient.numTel || 'Non renseigné'}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>

            {/* Tabs */}
            <Paper sx={{ borderRadius: 3 }}>
                <Tabs
                    value={tabValue}
                    onChange={(e, newValue) => setTabValue(newValue)}
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        px: 2,
                        '& .MuiTab-root': {
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '1rem',
                        },
                        '& .Mui-selected': {
                            color: '#4FC3F7',
                        },
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#4FC3F7',
                            height: 3,
                        },
                    }}
                >
                    <Tab label="📋 Dossier Médical" />
                    <Tab label="📎 Documents" />
                    <Tab label="📅 Historique" />
                </Tabs>

                <Box sx={{ p: 3 }}>
                    {tabValue === 0 && <DossierMedical patientId={patient.id} />}
                    {tabValue === 1 && <DocumentList patientId={patient.id} />}
                    {tabValue === 2 && (
                        <Typography color="text.secondary">
                            Historique des consultations à venir...
                        </Typography>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default PatientDetails;