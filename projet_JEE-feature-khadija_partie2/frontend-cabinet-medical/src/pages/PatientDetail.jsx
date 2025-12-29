import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from '@mui/material';
import PatientDetails from '../components/patients/PatientDetails';
import PatientForm from '../components/patients/PatientForm';
import patientService from '../services/patientService';
import { toast } from 'react-toastify';

const PatientDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState(false);

    useEffect(() => {
        loadPatient();
    }, [id]);

    const loadPatient = async () => {
        try {
            setLoading(true);
            const data = await patientService.getPatientById(id);
            setPatient(data);
        } catch (error) {
            toast.error('Erreur lors du chargement du patient');
            navigate('/patients');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (patient) => {
        setEditOpen(true);
    };

    const handleDelete = () => {
        setDeleteDialog(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await patientService.deletePatient(id);
            toast.success('✅ Patient supprimé avec succès');
            navigate('/patients');
        } catch (error) {
            toast.error('Erreur lors de la suppression');
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (!patient) {
        return null;
    }

    return (
        <>
            <PatientDetails
                patient={patient}
                onBack={() => navigate('/patients')}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            <PatientForm
                open={editOpen}
                onClose={() => setEditOpen(false)}
                patient={patient}
                onSuccess={() => {
                    loadPatient();
                    setEditOpen(false);
                }}
            />

            <Dialog
                open={deleteDialog}
                onClose={() => setDeleteDialog(false)}
                PaperProps={{ sx: { borderRadius: 3 } }}
            >
                <DialogTitle sx={{ color: '#EF5350', fontWeight: 600 }}>
                    ⚠️ Confirmer la Suppression
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Êtes-vous sûr de vouloir supprimer le patient{' '}
                        <strong>{patient.prenom} {patient.nom}</strong> ?
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Cette action supprimera également le dossier médical et tous les documents associés.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setDeleteDialog(false)} variant="outlined">
                        Annuler
                    </Button>
                    <Button onClick={handleDeleteConfirm} variant="contained" color="error">
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PatientDetail;