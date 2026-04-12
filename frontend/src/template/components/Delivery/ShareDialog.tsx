import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Typography,
    Box,
    IconButton,
    Snackbar,
    Alert,
} from '@mui/material';
import { ContentCopy as CopyIcon, WhatsApp as WhatsAppIcon, Close as CloseIcon } from '@mui/icons-material';

interface ShareDialogProps {
    open: boolean;
    onClose: () => void;
    uuid: string;
}

const ShareDialog: React.FC<ShareDialogProps> = ({ open, onClose, uuid }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const galleryUrl = `${window.location.origin}/g/${uuid}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(galleryUrl);
        setSnackbarOpen(true);
    };

    const handleWhatsApp = () => {
        const message = `Découvrez votre galerie photo : ${galleryUrl}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Partager la galerie
                    </Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Copiez ce lien et partagez-le avec vos clients
                    </Typography>

                    <TextField
                        fullWidth
                        value={galleryUrl}
                        variant="outlined"
                        InputProps={{
                            readOnly: true,
                            endAdornment: (
                                <IconButton onClick={handleCopy} edge="end">
                                    <CopyIcon />
                                </IconButton>
                            ),
                        }}
                        sx={{ mb: 2 }}
                    />

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<WhatsAppIcon />}
                            onClick={handleWhatsApp}
                            fullWidth
                            sx={{ fontWeight: 'bold' }}
                        >
                            Partager via WhatsApp
                        </Button>
                    </Box>
                </DialogContent>

                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={onClose} color="inherit">
                        Fermer
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" variant="filled">
                    Lien copié dans le presse-papier
                </Alert>
            </Snackbar>
        </>
    );
};

export default ShareDialog;
