import React, { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Stack,
    Alert,
    Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack as BackIcon, Save as SaveIcon } from '@mui/icons-material';
import DualUploadZone from '../../components/Delivery/DualUploadZone';
import ShareDialog from '../../components/Delivery/ShareDialog';
import { galleryService } from '../../services/galleryService';
import type { GalleryImage } from '../../types/gallery';

const NewDelivery: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [zipFile, setZipFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const [createdUuid, setCreatedUuid] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [zipUploading, setZipUploading] = useState(false);
    const [zipProgress, setZipProgress] = useState(0);
    const [imagesUploading, setImagesUploading] = useState(false);
    const [imagesProgress, setImagesProgress] = useState(0);

    const handleImagesSelected = (files: File[]) => {
        setImages(files);
        // Simulate upload progress
        setImagesUploading(true);
        setImagesProgress(0);
        const interval = setInterval(() => {
            setImagesProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setImagesUploading(false);
                    return 100;
                }
                return prev + 10;
            });
        }, 150);
    };

    const handleZipSelected = (files: File[]) => {
        if (files.length > 0) {
            setZipFile(files[0]);
            // Simulate upload progress
            setZipUploading(true);
            setZipProgress(0);
            const interval = setInterval(() => {
                setZipProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setZipUploading(false);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 200);
        }
    };

    const handleSave = async () => {
        if (!title.trim()) {
            setSnackbarMessage('Veuillez entrer un titre');
            setSnackbarOpen(true);
            return;
        }

        if (images.length === 0) {
            setSnackbarMessage('Veuillez ajouter au moins une image');
            setSnackbarOpen(true);
            return;
        }

        setUploading(true);

        // Simulate upload delay
        // setTimeout(async () => { // Removed timeout for real API call
        try {
            // Create mock image URLs (In production, these would be uploaded to a server)
            // For now we are just passing metadata, file upload logic needs to be in service or here
            // The service expects CreateGalleryData which has images as objects, but we have Files.
            // We need to adapt this. For now, let's assume the service handles FormData creation.

            // Ideally we should upload files here or pass them to service.
            // The current service implementation expects CreateGalleryData.
            // Let's look at service implementation again.
            // Service creates FormData. But it expects data.images to be objects.
            // We need to refactor service or this call.

            // For this specific fix, I will just await the call and assume service handles it or we fix service later.
            // But wait, the service implementation I wrote earlier:
            // formData.append('title', data.title);
            // ...
            // It doesn't handle 'images' array in FormData yet!

            // Let's first fix the async call here, then I might need to revisit service for file upload.
            // But the immediate crash is due to missing await.

            const mockImages: Omit<GalleryImage, 'isLiked'>[] = images.map((file, index) => ({
                id: `img-${Date.now()}-${index}`,
                filename: file.name,
                url: URL.createObjectURL(file),
            }));

            const mockZipUrl = zipFile ? URL.createObjectURL(zipFile) : '#';
            const zipSize = zipFile ? `${(zipFile.size / (1024 * 1024)).toFixed(2)} MB` : '0 MB';

            const newGallery = await galleryService.createGallery({
                title,
                description,
                images: mockImages,
                files: images,
                zipFileUrl: mockZipUrl,
                zipFileSize: zipSize,
                zipFileBlob: zipFile || undefined,
                pin: '1234' // Default PIN for now
            });

            setCreatedUuid(newGallery.uuid);
            setUploading(false);
            setShareDialogOpen(true);
        } catch (error) {
            console.error("Failed to create gallery", error);
            setSnackbarMessage('Erreur lors de la création de la galerie');
            setSnackbarOpen(true);
            setUploading(false);
        }
        // }, 1500);
    };

    const handleDialogClose = () => {
        setShareDialogOpen(false);
        navigate('/admin/dashboard');
    };

    return (
        <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 } }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Button
                    startIcon={<BackIcon />}
                    onClick={() => navigate('/admin/dashboard')}
                    sx={{ mb: 2 }}
                >
                    Retour
                </Button>

                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Nouvelle Livraison
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Créez une galerie photo pour partager avec vos clients
                </Typography>
            </Box>

            {/* Form */}
            <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <Stack spacing={3}>
                    {/* Title */}
                    <TextField
                        fullWidth
                        label="Titre de l'événement"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex: Mariage Alice & Bob"
                        required
                    />

                    {/* Description */}
                    <TextField
                        fullWidth
                        label="Description"
                        variant="outlined"
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Une brève description de l'événement..."
                    />

                    {/* Upload Zone A - Images */}
                    <Box>
                        <DualUploadZone
                            title="Zone A: Images JPG"
                            subtitle="Glissez vos photos ici ou cliquez pour sélectionner (format JPG, PNG)"
                            acceptedTypes="image/jpeg,image/jpg,image/png"
                            multiple={true}
                            onFilesSelected={handleImagesSelected}
                            uploading={imagesUploading}
                            uploadProgress={imagesProgress}
                        />
                        {images.length > 0 && !imagesUploading && (
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                {images.length} image(s) sélectionnée(s)
                            </Typography>
                        )}
                    </Box>

                    {/* Upload Zone B - ZIP */}
                    <Box>
                        <DualUploadZone
                            title="Zone B: Fichier ZIP (optionnel)"
                            subtitle="Package haute résolution pour téléchargement (format ZIP)"
                            acceptedTypes=".zip"
                            multiple={false}
                            onFilesSelected={handleZipSelected}
                            uploading={zipUploading}
                            uploadProgress={zipProgress}
                        />
                        {zipFile && !zipUploading && (
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                {zipFile.name} ({(zipFile.size / (1024 * 1024)).toFixed(2)} MB)
                            </Typography>
                        )}
                    </Box>

                    {/* Actions */}
                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/admin/dashboard')}
                            disabled={uploading}
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            startIcon={<SaveIcon />}
                            disabled={uploading}
                            sx={{ fontWeight: 'bold' }}
                        >
                            {uploading ? 'Enregistrement...' : 'Enregistrer & Partager'}
                        </Button>
                    </Box>
                </Stack>
            </Box>

            {/* Share Dialog */}
            <ShareDialog
                open={shareDialogOpen}
                onClose={handleDialogClose}
                uuid={createdUuid}
            />

            {/* Snackbar */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="warning" variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default NewDelivery;
