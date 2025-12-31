import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Grid,
    MenuItem,
    Box,
    Alert,
    FormControl,
    InputLabel,
    Select
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import patientService from '../../services/patientService';

const PatientForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState({
        cin: '',
        nom: '',
        prenom: '',
        dateNaissance: null,
        sexe: '',
        numTel: '',
        email: '',
        adresse: '',
        typeMutuelle: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (isEditing) {
            loadPatient();
        }
    }, [id, isEditing]);

    const loadPatient = async () => {
        try {
            setLoading(true);
            const patient = await patientService.getPatientById(id);
            setFormData({
                ...patient,
                dateNaissance: patient.dateNaissance ? new Date(patient.dateNaissance) : null
            });
        } catch (err) {
            setError('Erreur lors du chargement du patient');
            console.error('Error loading patient:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };



    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validation
        if (!formData.cin || !formData.nom || !formData.prenom || !formData.dateNaissance || !formData.sexe) {
            setError('Veuillez remplir tous les champs obligatoires');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const submitData = {
                ...formData,
                dateNaissance: formData.dateNaissance.toISOString().split('T')[0] // Format YYYY-MM-DD
            };

            if (isEditing) {
                await patientService.updatePatient(id, submitData);
            } else {
                await patientService.createPatient(submitData);
            }

            setSuccess(true);
            setTimeout(() => {
                navigate('/patients');
            }, 2000);

        } catch (err) {
            setError(isEditing ? 'Erreur lors de la modification' : 'Erreur lors de la création');
            console.error('Error saving patient:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditing) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography variant="h6">Chargement...</Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                {isEditing ? 'Modifier le Patient' : 'Nouveau Patient'}
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                    Patient {isEditing ? 'modifié' : 'créé'} avec succès !
                </Alert>
            )}

            <Card>
                <CardContent sx={{ p: 4 }}>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            {/* CIN */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="CIN"
                                    value={formData.cin}
                                    onChange={handleChange('cin')}
                                    required
                                    disabled={loading}
                                />
                            </Grid>

                            {/* Nom */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Nom"
                                    value={formData.nom}
                                    onChange={handleChange('nom')}
                                    required
                                    disabled={loading}
                                />
                            </Grid>

                            {/* Prénom */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Prénom"
                                    value={formData.prenom}
                                    onChange={handleChange('prenom')}
                                    required
                                    disabled={loading}
                                />
                            </Grid>

                            {/* Date de naissance */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Date de naissance (YYYY-MM-DD)"
                                    type="date"
                                    value={formData.dateNaissance ? formData.dateNaissance.toISOString().split('T')[0] : ''}
                                    onChange={(e) => setFormData({ ...formData, dateNaissance: new Date(e.target.value) })}
                                    required
                                    disabled={loading}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>

                            {/* Sexe */}
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth required disabled={loading}>
                                    <InputLabel>Sexe</InputLabel>
                                    <Select
                                        value={formData.sexe}
                                        onChange={handleChange('sexe')}
                                        label="Sexe"
                                    >
                                        <MenuItem value="M">Masculin</MenuItem>
                                        <MenuItem value="F">Féminin</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Téléphone */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Téléphone"
                                    value={formData.numTel}
                                    onChange={handleChange('numTel')}
                                    disabled={loading}
                                />
                            </Grid>

                            {/* Email */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange('email')}
                                    disabled={loading}
                                />
                            </Grid>

                            {/* Mutuelle */}
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth disabled={loading}>
                                    <InputLabel>Mutuelle</InputLabel>
                                    <Select
                                        value={formData.typeMutuelle}
                                        onChange={handleChange('typeMutuelle')}
                                        label="Mutuelle"
                                    >
                                        <MenuItem value="CNOPS">CNOPS</MenuItem>
                                        <MenuItem value="CNSS">CNSS</MenuItem>
                                        <MenuItem value="RAMED">RAMED</MenuItem>
                                        <MenuItem value="Privée">Privée</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Adresse */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Adresse"
                                    multiline
                                    rows={3}
                                    value={formData.adresse}
                                    onChange={handleChange('adresse')}
                                    disabled={loading}
                                />
                            </Grid>
                        </Grid>

                        {/* Actions */}
                        <Box display="flex" gap={2} mt={4}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={loading}
                            >
                                {loading ? 'Enregistrement...' : (isEditing ? 'Modifier' : 'Créer')}
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() => navigate('/patients')}
                                disabled={loading}
                            >
                                Annuler
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default PatientForm;
