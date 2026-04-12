import React from 'react';
import { Card, CardContent, CardActions, Typography, Box, IconButton, Chip } from '@mui/material';
import { Delete as DeleteIcon, Visibility as VisibilityIcon, Favorite as FavoriteIcon, Share as ShareIcon } from '@mui/icons-material';
import type { Gallery } from '../../types/gallery';

interface GalleryCardProps {
    gallery: Gallery;
    onView: (uuid: string) => void;
    onDelete: (uuid: string) => void;
    onShare: (uuid: string) => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ gallery, onView, onDelete, onShare }) => {
    const likedCount = gallery.images.filter(img => img.isLiked).length;

    return (
        <Card sx={{ borderRadius: '4px', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {gallery.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {gallery.description}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                    <Chip
                        label={`${gallery.images.length} photos`}
                        size="small"
                        sx={{ borderRadius: '8px' }}
                    />
                    {likedCount > 0 && (
                        <Chip
                            icon={<FavoriteIcon sx={{ fontSize: '16px' }} />}
                            label={`${likedCount} sélectionnées`}
                            size="small"
                            color="primary"
                            sx={{ borderRadius: '8px' }}
                        />
                    )}
                </Box>

                <Typography variant="caption" color="text.secondary">
                    Créé le {new Date(gallery.createdAt).toLocaleDateString('fr-FR')}
                </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2 }}>
                <IconButton onClick={() => onShare(gallery.uuid)} size="small" color="primary">
                    <ShareIcon />
                </IconButton>
                <IconButton onClick={() => onView(gallery.uuid)} size="small" color="primary">
                    <VisibilityIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(gallery.uuid)} size="small" color="error">
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default GalleryCard;
