import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    LinearProgress,
    Alert,
    IconButton,
} from '@mui/material';
import {
    CloudUpload as CloudUploadIcon,
    Close as CloseIcon,
    InsertDriveFile as FileIcon,
} from '@mui/icons-material';
import documentService from '../../services/documentService';
import { toast } from 'react-toastify';

const DocumentUpload = ({ patientId, onSuccess }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Vérifier la taille (10 MB max)
            if (file.size > 10 * 1024 * 1024) {
                toast.error('Le fichier est trop volumineux (max 10MB)');
                return;
            }
            setSelectedFile(file);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setDescription('');
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error('Veuillez sélectionner un fichier');
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        try {
            // Simuler la progression
            const progressInterval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 200);

            const uploadePar = 'Dr. Bennani'; // À remplacer par l'utilisateur connecté
            await documentService.uploadDocument(patientId, selectedFile, description, uploadePar);

            clearInterval(progressInterval);
            setUploadProgress(100);

            toast.success('✅ Document uploadé avec succès');
            handleRemoveFile();
            onSuccess();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Erreur lors de l\'upload');
            console.error('Erreur upload:', error);
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
                border: '2px dashed #4FC3F7',
                bgcolor: '#F0F9FF',
            }}
        >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#263238' }}>
                📤 Uploader un Document
            </Typography>

            {!selectedFile ? (
                <Box
                    sx={{
                        textAlign: 'center',
                        py: 4,
                        cursor: 'pointer',
                        '&:hover': {
                            bgcolor: 'rgba(79, 195, 247, 0.05)',
                        },
                    }}
                    onClick={() => document.getElementById('file-input').click()}
                >
                    <input
                        id="file-input"
                        type="file"
                        hidden
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={handleFileSelect}
                    />
                    <CloudUploadIcon sx={{ fontSize: 64, color: '#4FC3F7', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                        Cliquez pour sélectionner un fichier
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        PDF, Images, Word (Max 10MB)
                    </Typography>
                </Box>
            ) : (
                <Box>
                    <Paper
                        sx={{
                            p: 2,
                            mb: 2,
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: 'white',
                            borderRadius: 2,
                        }}
                    >
                        <FileIcon sx={{ fontSize: 40, color: '#4FC3F7', mr: 2 }} />
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {selectedFile.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {formatFileSize(selectedFile.size)}
                            </Typography>
                        </Box>
                        <IconButton onClick={handleRemoveFile} disabled={uploading}>
                            <CloseIcon />
                        </IconButton>
                    </Paper>

                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Description (optionnelle)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={uploading}
                        sx={{ mb: 2 }}
                    />

                    {uploading && (
                        <Box sx={{ mb: 2 }}>
                            <LinearProgress
                                variant="determinate"
                                value={uploadProgress}
                                sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    bgcolor: '#E1F5FE',
                                    '& .MuiLinearProgress-bar': {
                                        bgcolor: '#4FC3F7',
                                    },
                                }}
                            />
                            <Typography variant="body2" sx={{ mt: 1, textAlign: 'center' }}>
                                Upload en cours... {uploadProgress}%
                            </Typography>
                        </Box>
                    )}

                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        onClick={handleUpload}
                        disabled={uploading}
                        sx={{
                            background: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)',
                            py: 1.5,
                        }}
                    >
                        {uploading ? 'Upload en cours...' : 'Uploader le Document'}
                    </Button>
                </Box>
            )}
        </Paper>
    );
};

export default DocumentUpload;