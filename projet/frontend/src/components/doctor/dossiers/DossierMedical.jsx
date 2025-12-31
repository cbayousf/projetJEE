import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Paper,
    Typography,
    CircularProgress,
    Alert,
    Button,
    Divider,
    Chip,
} from '@mui/material';
import { Edit as EditIcon, LocalHospital as HospitalIcon } from '@mui/icons-material';
import dossierService from '../../services/dossierService';
import DossierForm from './DossierForm';
import { toast } from 'react-toastify';

const DossierMedical = ({ patientId }) => {
    const [dossier, setDossier] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        loadDossier();
    }, [patientId]);

    const loadDossier = async () => {
        try {
            setLoading(true);
            const data = await dossierService.getDossierByPatientId(patientId);
            setDossier(data);
        } catch (error) {
            if (error.response?.status === 404) {
                // Pas de dossier, on peut en créer un
                setDossier(null);
            } else {
                toast.error('Erreur lors du chargement du dossier médical');
                console.error('Erreur:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCreateDossier = async () => {
        try {
            await dossierService.createDossier(patientId);
            toast.success('✅ Dossier médical créé avec succès');
            loadDossier();
        } catch (error) {
            toast.error('Erreur lors de la création du dossier');
            console.error('Erreur:', error);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 6 }}>
                <CircularProgress size={60} sx={{ color: '#4FC3F7' }} />
            </Box>
        );
    }

    if (!dossier) {
        return (
            <Box sx={{ textAlign: 'center', py: 8 }}>
                <HospitalIcon sx={{ fontSize: 80, color: '#B0BEC5', mb: 3 }} />
                <Typography variant="h5" color="text.secondary" gutterBottom sx={{ fontWeight: 600 }}>
                    Aucun dossier médical
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Ce patient n'a pas encore de dossier médical
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleCreateDossier}
                    sx={{
                        background: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)',
                        px: 4,
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 600,
                        '&:hover': {
                            background: 'linear-gradient(135deg, #29B6F6 0%, #039BE5 100%)',
                        },
                    }}
                >
                    📋 Créer le Dossier Médical
                </Button>
            </Box>
        );
    }

    if (editMode) {
        return (
            <DossierForm
                dossier={dossier}
                patientId={patientId}
                onCancel={() => setEditMode(false)}
                onSuccess={() => {
                    setEditMode(false);
                    loadDossier();
                }}
            />
        );
    }

    const InfoCard = ({ title, content, icon, color, bgcolor }) => (
        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
                height: '100%',
                bgcolor: bgcolor || 'white',
                border: `2px solid ${color}20`,
                transition: 'all 0.3s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 24px ${color}30`,
                },
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ mr: 2, fontSize: '2rem' }}>{icon}</Box>
                <Typography variant="h6" sx={{ color, fontWeight: 600 }}>
                    {title}
                </Typography>
            </Box>
            <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                    whiteSpace: 'pre-wrap',
                    minHeight: '60px',
                }}
            >
                {content || `Aucune information sur ${title.toLowerCase()}`}
            </Typography>
        </Paper>
    );

    return (
        <Box>
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                        📋 Dossier Médical
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Patient: <strong>{dossier.patientPrenom} {dossier.patientNom}</strong>
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    onClick={() => setEditMode(true)}
                    sx={{
                        background: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #29B6F6 0%, #039BE5 100%)',
                        },
                    }}
                >
                    Modifier
                </Button>
            </Box>

            {/* Informations Médicales */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {/* Antécédents Médicaux */}
                <Grid item xs={12} md={6}>
                    <InfoCard
                        title="Antécédents Médicaux"
                        content={dossier.antMedicaux}
                        icon="🩺"
                        color="#4FC3F7"
                        bgcolor="#E1F5FE"
                    />
                </Grid>

                {/* Antécédents Chirurgicaux */}
                <Grid item xs={12} md={6}>
                    <InfoCard
                        title="Antécédents Chirurgicaux"
                        content={dossier.antChirug}
                        icon="🏥"
                        color="#42A5F5"
                        bgcolor="#E3F2FD"
                    />
                </Grid>

                {/* Allergies */}
                <Grid item xs={12} md={6}>
                    <InfoCard
                        title="Allergies"
                        content={dossier.allergies}
                        icon="⚠️"
                        color="#FF9800"
                        bgcolor="#FFF3E0"
                    />
                </Grid>

                {/* Traitement en cours */}
                <Grid item xs={12} md={6}>
                    <InfoCard
                        title="Traitement en Cours"
                        content={dossier.traitement}
                        icon="💊"
                        color="#66BB6A"
                        bgcolor="#E8F5E9"
                    />
                </Grid>

                {/* Habitudes */}
                <Grid item xs={12}>
                    <InfoCard
                        title="Habitudes de Vie"
                        content={dossier.habitudes}
                        icon="🚭"
                        color="#9C27B0"
                        bgcolor="#F3E5F5"
                    />
                </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Statistiques & Dates */}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        sx={{
                            p: 3,
                            bgcolor: '#E1F5FE',
                            borderRadius: 3,
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h3" sx={{ fontWeight: 700, color: '#01579B', mb: 1 }}>
                            {dossier.nombreDocuments || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            📎 Documents
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        sx={{
                            p: 3,
                            bgcolor: '#F3E5F5',
                            borderRadius: 3,
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h3" sx={{ fontWeight: 700, color: '#6A1B9A', mb: 1 }}>
                            {dossier.nombreConsultations || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            🩺 Consultations
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        sx={{
                            p: 3,
                            bgcolor: '#E8F5E9',
                            borderRadius: 3,
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            📅 Créé le
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {dossier.dateCreation ? new Date(dossier.dateCreation).toLocaleDateString('fr-FR') : '-'}
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={3}>
                    <Paper
                        sx={{
                            p: 3,
                            bgcolor: '#FFF3E0',
                            borderRadius: 3,
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            🔄 Modifié le
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {dossier.dateModification ? new Date(dossier.dateModification).toLocaleDateString('fr-FR') : '-'}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            {/* Alertes importantes */}
            {dossier.allergies && (
                <Alert
                    severity="warning"
                    sx={{
                        mt: 3,
                        borderRadius: 2,
                        fontSize: '1rem',
                        fontWeight: 600,
                    }}
                >
                    ⚠️ ATTENTION : Ce patient a des allergies déclarées
                </Alert>
            )}
        </Box>
    );
};

export default DossierMedical;