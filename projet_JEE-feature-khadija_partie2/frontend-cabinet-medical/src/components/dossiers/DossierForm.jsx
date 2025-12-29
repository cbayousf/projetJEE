import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Grid,
} from '@mui/material';
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import dossierService from '../../services/dossierService';
import { toast } from 'react-toastify';

const DossierForm = ({ dossier, patientId, onCancel, onSuccess }) => {
    const [formData, setFormData] = useState({
        antMedicaux: dossier?.antMedicaux || '',
        antChirug: dossier?.antChirug || '',
        allergies: dossier?.allergies || '',
        traitement: dossier?.traitement || '',
        habitudes: dossier?.habitudes || '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await dossierService.updateDossier(patientId, formData);
            toast.success('✅ Dossier médical mis à jour');
            onSuccess();
        } catch (error) {
            toast.error('Erreur lors de la mise à jour');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Antécédents Médicaux"
                        name="antMedicaux"
                        value={formData.antMedicaux}
                        onChange={handleChange}
                        placeholder="Diabète, hypertension, asthme..."
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Antécédents Chirurgicaux"
                        name="antChirug"
                        value={formData.antChirug}
                        onChange={handleChange}
                        placeholder="Appendicectomie, césarienne..."
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Allergies"
                        name="allergies"
                        value={formData.allergies}
                        onChange={handleChange}
                        placeholder="Pénicilline, arachides..."
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Traitement en Cours"
                        name="traitement"
                        value={formData.traitement}
                        onChange={handleChange}
                        placeholder="Metformine 500mg, Doliprane..."
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Habitudes de Vie"
                        name="habitudes"
                        value={formData.habitudes}
                        onChange={handleChange}
                        placeholder="Tabac, alcool, sport, alimentation..."
                    />
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                        <Button
                            variant="outlined"
                            startIcon={<CancelIcon />}
                            onClick={onCancel}
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<SaveIcon />}
                            disabled={loading}
                            sx={{
                                background: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)',
                            }}
                        >
                            {loading ? 'Enregistrement...' : 'Enregistrer'}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DossierForm;
