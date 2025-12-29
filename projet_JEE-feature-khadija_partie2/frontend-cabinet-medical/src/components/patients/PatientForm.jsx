import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid,
    MenuItem,
    Box,
    IconButton,
    Typography,
    Divider,
} from '@mui/material';
import { Close as CloseIcon, Save as SaveIcon } from '@mui/icons-material';
import patientService from '../../services/patientService';
import { toast } from 'react-toastify';

const PatientForm = ({ open, onClose, patient, onSuccess }) => {
    const [formData, setFormData] = useState({
        cin: '',
        nom: '',
        prenom: '',
        dateNaissance: '',
        sexe: '',
        numTel: '',
        typeMutuelle: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (patient) {
            setFormData({
                cin: patient.cin || '',
                nom: patient.nom || '',
                prenom: patient.prenom || '',
                dateNaissance: patient.dateNaissance || '',
                sexe: patient.sexe || '',
                numTel: patient.numTel || '',
                typeMutuelle: patient.typeMutuelle || '',
            });
        } else {
            resetForm();
        }
    }, [patient, open]);

    const resetForm = () => {
        setFormData({
            cin: '',
            nom: '',
            prenom: '',
            dateNaissance: '',
            sexe: '',
            numTel: '',
            typeMutuelle: '',
        });
        setErrors({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Effacer l'erreur du champ modifié
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.cin.trim()) {
            newErrors.cin = 'Le CIN est obligatoire';
        }
        if (!formData.nom.trim()) {
            newErrors.nom = 'Le nom est obligatoire';
        }
        if (!formData.prenom.trim()) {
            newErrors.prenom = 'Le prénom est obligatoire';
        }
        if (!formData.dateNaissance) {
            newErrors.dateNaissance = 'La date de naissance est obligatoire';
        }
        if (!formData.sexe) {
            newErrors.sexe = 'Le sexe est obligatoire';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            toast.error('Veuillez remplir tous les champs obligatoires');
            return;
        }

        setLoading(true);
        try {
            if (patient) {
                await patientService.updatePatient(patient.id, formData);
                toast.success('✅ Patient modifié avec succès');
            } else {
                await patientService.createPatient(formData);
                toast.success('✅ Patient créé avec succès');
            }
            onSuccess();
            onClose();
            resetForm();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erreur lors de l\'enregistrement');
            console.error('Erreur:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                },
            }}
        >
            <DialogTitle
                sx={{
                    background: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {patient ? '✏️ Modifier le Patient' : '➕ Nouveau Patient'}
                </Typography>
                <IconButton onClick={onClose} sx={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <form onSubmit={handleSubmit}>
                <DialogContent sx={{ pt: 3 }}>
                    <Grid container spacing={3}>
                        {/* CIN */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                required
                                label="CIN"
                                name="cin"
                                value={formData.cin}
                                onChange={handleChange}
                                error={!!errors.cin}
                                helperText={errors.cin}
                                disabled={!!patient}
                            />
                        </Grid>

                        {/* Nom */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                required
                                label="Nom"
                                name="nom"
                                value={formData.nom}
                                onChange={handleChange}
                                error={!!errors.nom}
                                helperText={errors.nom}
                            />
                        </Grid>

                        {/* Prénom */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                required
                                label="Prénom"
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleChange}
                                error={!!errors.prenom}
                                helperText={errors.prenom}
                            />
                        </Grid>

                        {/* Date de naissance */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                required
                                type="date"
                                label="Date de Naissance"
                                name="dateNaissance"
                                value={formData.dateNaissance}
                                onChange={handleChange}
                                error={!!errors.dateNaissance}
                                helperText={errors.dateNaissance}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        {/* Sexe */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                required
                                select
                                label="Sexe"
                                name="sexe"
                                value={formData.sexe}
                                onChange={handleChange}
                                error={!!errors.sexe}
                                helperText={errors.sexe}
                            >
                                <MenuItem value="M">Masculin</MenuItem>
                                <MenuItem value="F">Féminin</MenuItem>
                            </TextField>
                        </Grid>

                        {/* Téléphone */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Numéro de Téléphone"
                                name="numTel"
                                value={formData.numTel}
                                onChange={handleChange}
                                placeholder="0612345678"
                            />
                        </Grid>

                        {/* Type de mutuelle */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                select
                                label="Type de Mutuelle"
                                name="typeMutuelle"
                                value={formData.typeMutuelle}
                                onChange={handleChange}
                            >
                                <MenuItem value="">Aucune</MenuItem>
                                <MenuItem value="CNSS">CNSS</MenuItem>
                                <MenuItem value="CNOPS">CNOPS</MenuItem>
                                <MenuItem value="FAR">FAR</MenuItem>
                                <MenuItem value="Privée">Mutuelle Privée</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </DialogContent>

                <Divider />

                <DialogActions sx={{ p: 2.5 }}>
                    <Button
                        onClick={onClose}
                        variant="outlined"
                        sx={{
                            borderColor: '#B0BEC5',
                            color: '#546E7A',
                        }}
                    >
                        Annuler
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        startIcon={<SaveIcon />}
                        sx={{
                            background: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #29B6F6 0%, #039BE5 100%)',
                            },
                        }}
                    >
                        {loading ? 'Enregistrement...' : 'Enregistrer'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default PatientForm;