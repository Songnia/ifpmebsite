import React, { useState, useEffect } from 'react';
import { Box, Typography, Fab, Zoom, Tooltip } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useTranslation } from 'react-i18next';

const PromoBubble: React.FC = () => {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Hide on Hero section (threshold of 400px)
            if (window.scrollY > 400) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => {
        const element = document.getElementById('pricing-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Zoom in={visible}>
            <Box
                sx={{
                    position: 'fixed',
                    bottom: { xs: 80, md: 32 }, // Above the checkout button on mobile
                    left: { xs: 16, md: 32 },
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2
                }}
            >
                <Tooltip
                    title={t('home.promoBubble.tooltip')}
                    placement="right"
                    arrow
                    open={visible}
                >
                    <Fab
                        onClick={handleClick}
                        sx={{
                            width: { xs: 56, md: 72 },
                            height: { xs: 56, md: 72 },
                            backgroundColor: 'primary.main',
                            color: 'secondary.main',
                            boxShadow: (theme) => `0 4px 20px ${theme.palette.primary.transparent}`,
                            '&:hover': {
                                backgroundColor: 'primary.main',
                                transform: 'scale(1.1)',
                            },
                            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                        }}
                    >
                        <LocalOfferIcon sx={{ fontSize: { xs: 24, md: 32 } }} />
                    </Fab>
                </Tooltip>

                <Box
                    sx={{
                        backgroundColor: 'primary.main', // Yellow background
                        borderRadius: '20px 20px 20px 4px',
                        py: 1,
                        px: 2,
                        boxShadow: 3,
                        border: '1px solid',
                        borderColor: 'secondary.main',
                        maxWidth: 200,
                        display: { xs: 'none', md: 'block' },
                        animation: 'bounce 2s infinite'
                    }}
                >
                    <Typography variant="body2" fontWeight="bold" sx={{ color: 'secondary.main' }}>
                        {t('home.promoBubble.text')}
                    </Typography>
                    <style>
                        {`
                        @keyframes bounce {
                            0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
                            40% {transform: translateY(-10px);}
                            60% {transform: translateY(-5px);}
                        }
                        `}
                    </style>
                </Box>
            </Box>
        </Zoom>
    );
};

export default PromoBubble;
