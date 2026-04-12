import React, { useState } from 'react';
import { Box, Typography, Paper, IconButton, Dialog, DialogContent, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';

interface PortfolioItem {
    id: number | string;
    category: string;
    image?: string;
    aspectRatio?: string; // e.g., '4/5', '1/1'
}

const PortfolioCard: React.FC<{ item: PortfolioItem }> = ({ item }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen(false);
    };

    const handleDownload = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!item.image) return;

        const link = document.createElement('a');
        link.href = item.image;
        link.download = `${item.category.replace(/\s+/g, '_')}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleShare = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Functionality disabled as per user request
    };

    return (
        <>
            <Paper
                elevation={0}
                onClick={handleOpen}
                sx={{
                    p: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                        '& .overlay-actions': {
                            opacity: 1,
                        },
                    },
                    breakInside: 'avoid',
                    mb: 3,
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        aspectRatio: item.aspectRatio || '1/1',
                        backgroundColor: 'grey.100',
                        borderRadius: 0.5,
                        mb: 1.5,
                        position: 'relative',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {item.image ? (
                        <img src={item.image} alt={item.category} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <ImageIcon
                            className="placeholder-icon"
                            sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.2, transition: 'opacity 0.2s' }}
                        />
                    )}

                    {/* Overlay Actions */}
                    <Box
                        className="overlay-actions"
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            p: 1,
                            background: 'linear-gradient(transparent, rgba(0,0,0,0.5))',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 0.5,
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                        }}
                    >
                        <Tooltip title="Download">
                            <IconButton
                                size="small"
                                onClick={handleDownload}
                                sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}
                            >
                                <DownloadIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Share">
                            <IconButton
                                size="small"
                                onClick={handleShare}
                                sx={{ color: 'white', '&:hover': { color: 'primary.main' } }}
                            >
                                <ShareIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <Box sx={{ px: 0.5, pb: 0.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', lineHeight: 1.2, textTransform: 'uppercase' }}>
                        {item.category}
                    </Typography>
                </Box>
            </Paper>

            {/* Lightbox */}
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    sx: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                        overflow: 'hidden',
                        m: 0,
                        maxHeight: '95vh',
                    }
                }}
            >
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'fixed',
                        right: 20,
                        top: 20,
                        color: 'white',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        '&:hover': { backgroundColor: 'rgba(0,0,0,0.8)' },
                        zIndex: 10,
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent
                    sx={{
                        p: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.9)',
                        height: '100%',
                    }}
                >
                    {item.image && (
                        <img
                            src={item.image}
                            alt={item.category}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '95vh',
                                objectFit: 'contain',
                            }}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PortfolioCard;
