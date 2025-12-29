import React from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Chip,
    Box,
    Avatar,
} from '@mui/material';
import {
    Person as PersonIcon,
    Phone as PhoneIcon,
    CalendarToday as CalendarIcon,
    Visibility as VisibilityIcon,
    Edit as EditIcon,
} from '@mui/icons-material';

const PatientCard = ({ patient, onView, onEdit }) => {
    const getInitials = (nom, prenom) => {
        return `${prenom?.charAt(0) || ''}${nom?.charAt(0) || ''}`.toUpperCase();
    };

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

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(79, 195, 247, 0.3)',
                },
                borderRadius: 3,
                border: '1px solid rgba(79, 195, 247, 0.1)',
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                        sx={{
                            width: 56,
                            height: 56,
                            bgcolor: 'primary.main',
                            mr: 2,
                            fontSize: '1.5rem',
                            fontWeight: 600,
                        }}
                    >
                        {getInitials(patient.nom, patient.prenom)}
                    </Avatar>
                    <Box>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                            {patient.prenom} {patient.nom}
                        </Typography>
                        <Chip
                            label={patient.sexe === 'M' ? 'Masculin' : 'Féminin'}
                            size="small"
                            sx={{
                                bgcolor: patient.sexe === 'M' ? '#E3F2FD' : '#FCE4EC',
                                color: patient.sexe === 'M' ? '#1976D2' : '#C2185B',
                                fontWeight: 500,
                            }}
                        />
                    </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PersonIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                            CIN: <strong>{patient.cin}</strong>
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                            Âge: <strong>{calculateAge(patient.dateNaissance)} ans</strong>
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PhoneIcon sx={{ fontSize: 18, color: 'text.secondary', mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                            {patient.numTel || 'Non renseigné'}
                        </Typography>
                    </Box>

                    {patient.typeMutuelle && (
                        <Chip
                            label={`Mutuelle: ${patient.typeMutuelle}`}
                            size="small"
                            color="info"
                            variant="outlined"
                            sx={{ mt: 1, alignSelf: 'flex-start' }}
                        />
                    )}
                </Box>
            </CardContent>

            <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
                <Button
                    size="small"
                    variant="contained"
                    startIcon={<VisibilityIcon />}
                    onClick={() => onView(patient)}
                    sx={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #29B6F6 0%, #039BE5 100%)',
                        },
                    }}
                >
                    Voir
                </Button>
                <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={() => onEdit(patient)}
                    sx={{
                        flex: 1,
                        borderColor: '#4FC3F7',
                        color: '#4FC3F7',
                        '&:hover': {
                            borderColor: '#29B6F6',
                            bgcolor: 'rgba(79, 195, 247, 0.1)',
                        },
                    }}
                >
                    Modifier
                </Button>
            </CardActions>
        </Card>
    );
};

export default PatientCard;