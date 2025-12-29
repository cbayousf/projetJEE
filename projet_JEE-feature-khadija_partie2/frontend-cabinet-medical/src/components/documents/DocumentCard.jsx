import React from 'react';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    IconButton,
    Chip,
    Box,
    Tooltip,
} from '@mui/material';
import {
    PictureAsPdf as PdfIcon,
    Image as ImageIcon,
    Description as DocIcon,
    Download as DownloadIcon,
    Delete as DeleteIcon,
    Visibility as VisibilityIcon,
} from '@mui/icons-material';
import documentService from '../../services/documentService';
import { toast } from 'react-toastify';

const DocumentCard = ({ document, onDelete }) => {
    const getIcon = () => {
        if (document.typeFichier?.includes('pdf')) {
            return <PdfIcon sx={{ fontSize: 48, color: '#EF5350' }} />;
        } else if (document.typeFichier?.includes('image')) {
            return <ImageIcon sx={{ fontSize: 48, color: '#66BB6A' }} />;
        }
        return <DocIcon sx={{ fontSize: 48, color: '#42A5F5' }} />;
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatSize = (bytes) => {
        if (!bytes) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const handleDownload = async () => {
        try {
            const blob = await documentService.downloadDocument(document.id);
            const url = window.URL.createObjectURL(blob);
            const link = window.document.createElement('a');
            link.href = url;
            link.download = document.nomFichier;
            link.click();
            window.URL.revokeObjectURL(url);
            toast.success('✅ Document téléchargé');
        } catch (error) {
            toast.error('Erreur lors du téléchargement');
            console.error(error);
        }
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
                    boxShadow: '0 8px 24px rgba(79, 195, 247, 0.2)',
                },
                borderRadius: 3,
            }}
        >
            <CardContent sx={{ flex: 1, textAlign: 'center' }}>
                <Box sx={{ mb: 2 }}>
                    {getIcon()}
                </Box>

                <Tooltip title={document.nomFichier}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            mb: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {document.nomFichier}
                    </Typography>
                </Tooltip>

                <Chip
                    label={formatSize(document.tailleFichier)}
                    size="small"
                    sx={{ mb: 1, bgcolor: '#E1F5FE', color: '#01579B' }}
                />

                {document.description && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            mt: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {document.description}
                    </Typography>
                )}

                <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                    Uploadé le {formatDate(document.dateUpload)}
                </Typography>

                {document.uploadePar && (
                    <Typography variant="caption" color="text.secondary">
                        Par {document.uploadePar}
                    </Typography>
                )}
            </CardContent>

            <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                <Tooltip title="Télécharger">
                    <IconButton
                        onClick={handleDownload}
                        sx={{
                            color: '#4FC3F7',
                            '&:hover': { bgcolor: 'rgba(79, 195, 247, 0.1)' },
                        }}
                    >
                        <DownloadIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Supprimer">
                    <IconButton
                        onClick={() => onDelete(document)}
                        sx={{
                            color: '#EF5350',
                            '&:hover': { bgcolor: 'rgba(239, 83, 80, 0.1)' },
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
};

export default DocumentCard;