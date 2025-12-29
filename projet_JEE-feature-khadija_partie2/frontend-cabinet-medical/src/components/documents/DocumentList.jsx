import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Typography,
    CircularProgress,
    Alert,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import DocumentCard from './DocumentCard';
import DocumentUpload from './DocumentUpload';
import documentService from '../../services/documentService';
import { toast } from 'react-toastify';

const DocumentList = ({ patientId }) => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialog, setDeleteDialog] = useState({ open: false, document: null });

    useEffect(() => {
        loadDocuments();
    }, [patientId]);

    const loadDocuments = async () => {
        try {
            setLoading(true);
            const data = await documentService.getDocumentsByPatient(patientId);
            setDocuments(data);
        } catch (error) {
            toast.error('Erreur lors du chargement des documents');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (document) => {
        setDeleteDialog({ open: true, document });
    };

    const handleDeleteConfirm = async () => {
        try {
            await documentService.deleteDocument(deleteDialog.document.id);
            toast.success('✅ Document supprimé');
            setDeleteDialog({ open: false, document: null });
            loadDocuments();
        } catch (error) {
            toast.error('Erreur lors de la suppression');
            console.error(error);
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box>
            {/* Upload Section */}
            <Box sx={{ mb: 4 }}>
                <DocumentUpload patientId={patientId} onSuccess={loadDocuments} />
            </Box>

            {/* Documents List */}
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                📎 Documents ({documents.length})
            </Typography>

            {documents.length === 0 ? (
                <Alert severity="info" sx={{ borderRadius: 2 }}>
                    Aucun document uploadé pour ce patient
                </Alert>
            ) : (
                <Grid container spacing={3}>
                    {documents.map((doc) => (
                        <Grid item xs={12} sm={6} md={4} key={doc.id}>
                            <DocumentCard document={doc} onDelete={handleDeleteClick} />
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialog.open}
                onClose={() => setDeleteDialog({ open: false, document: null })}
                PaperProps={{ sx: { borderRadius: 3 } }}
            >
                <DialogTitle sx={{ color: '#EF5350', fontWeight: 600 }}>
                    ⚠️ Confirmer la Suppression
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Êtes-vous sûr de vouloir supprimer le document{' '}
                        <strong>{deleteDialog.document?.nomFichier}</strong> ?
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Cette action est irréversible.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button
                        onClick={() => setDeleteDialog({ open: false, document: null })}
                        variant="outlined"
                    >
                        Annuler
                    </Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        variant="contained"
                        color="error"
                    >
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default DocumentList;