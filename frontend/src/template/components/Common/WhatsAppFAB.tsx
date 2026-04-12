import React from 'react';
import { Fab, Zoom, Box, Typography } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsAppFAB: React.FC = () => {
    const handleClick = () => {
        const message = "Hello, I am interested in the 1000f promo";
        const url = `https://wa.me/237698399985?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <Zoom in={true}>
            <Box
                role="presentation"
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    zIndex: 1000,
                }}
            >
                <Fab
                    variant="extended"
                    color="primary"
                    aria-label="reserve"
                    onClick={handleClick}
                    sx={{
                        fontWeight: 'bold',
                        backgroundColor: 'primary.main',
                        color:'secondary.main',
                        px: 3,
                        '&:hover': {
                            filter: 'brightness(0.95)',
                            backgroundColor:'secondary.main',
                            color:'primary.main'
                        },
                    }}
                >
                    <WhatsAppIcon sx={{ mr: 1 }} />
                    <Typography variant="button" sx={{ fontWeight: 'bold' }}>
                        Réserver
                    </Typography>
                </Fab>
            </Box>
        </Zoom>
    );
};

export default WhatsAppFAB;
