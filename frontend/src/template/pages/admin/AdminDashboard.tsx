import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Chip, Button, Fab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { galleryService } from '../../services/galleryService';
import type { Gallery } from '../../types/gallery';
import GalleryCard from '../../components/Delivery/GalleryCard';
import ShareDialog from '../../components/Delivery/ShareDialog';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [galleries, setGalleries] = useState<Gallery[]>([]);
    const [filter, setFilter] = useState<string>('All');
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const [shareUuid, setShareUuid] = useState('');

    useEffect(() => {
        loadGalleries();
    }, []);

    const loadGalleries = async () => {
        try {
            const allGalleries = await galleryService.getAllGalleries();
            setGalleries(allGalleries);
        } catch (error) {
            console.error("Failed to load galleries", error);
        }
    };

    const handleDelete = async (uuid: string) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette galerie ?')) {
            await galleryService.deleteGallery(uuid);
            loadGalleries();
        }
    };

    const handleView = (uuid: string) => {
        navigate(`/admin/gallery/${uuid}`);
    };

    const handleShare = (uuid: string) => {
        setShareUuid(uuid);
        setShareDialogOpen(true);
    };

    const filteredGalleries = filter === 'All'
        ? galleries
        : filter === 'With Selections'
            ? galleries.filter(g => g.images.some(img => img.isLiked))
            : galleries;

    const filters = ['All', 'With Selections'];

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Mes Livraisons
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Gérez vos galeries photo et suivez les sélections clients
                </Typography>
            </Box>

            {/* Filters & Actions */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {filters.map((f) => (
                        <Chip
                            key={f}
                            label={f}
                            onClick={() => setFilter(f)}
                            variant={filter === f ? 'filled' : 'outlined'}
                            color={filter === f ? 'primary' : 'default'}
                            sx={{
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                height: '40px',
                            }}
                        />
                    ))}
                </Box>

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/admin/new-delivery')}
                    sx={{
                        fontWeight: 'bold',
                        display: { xs: 'none', md: 'flex' }
                    }}
                >
                    Nouvelle Livraison
                </Button>
            </Box>

            {/* Gallery Grid */}
            {galleries.length === 0 ? (
                <Box
                    sx={{
                        textAlign: 'center',
                        py: 8,
                        border: '2px dashed',
                        borderColor: 'divider',
                        borderRadius: '4px',
                    }}
                >
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                        Aucune galerie pour le moment
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Cliquez sur le bouton "Nouvelle Livraison" pour créer votre première galerie
                    </Typography>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                        },
                        gap: { xs: 2, md: 4 },
                        pb: 10,
                    }}
                >
                    {filteredGalleries.map((gallery) => (
                        <GalleryCard
                            key={gallery.uuid}
                            gallery={gallery}
                            onView={handleView}
                            onDelete={handleDelete}
                            onShare={handleShare}
                        />
                    ))}
                </Box>
            )}

            <ShareDialog
                open={shareDialogOpen}
                onClose={() => setShareDialogOpen(false)}
                uuid={shareUuid}
            />

            {/* Mobile FAB - Bottom Left */}
            <Fab
                color="primary"
                aria-label="add"
                onClick={() => navigate('/admin/new-delivery')}
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    left: 32, // Bottom Left
                    display: { xs: 'flex', md: 'none' }
                }}
            >
                <AddIcon />
            </Fab>
        </Container>
    );
};

export default AdminDashboard;
