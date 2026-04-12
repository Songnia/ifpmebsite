import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ImageIcon from '@mui/icons-material/Image';
import { useTranslation } from 'react-i18next';
import { useCart } from '@/template/context/CartContext';

interface Product {
    id: number;
    name: string;
    price: string;
    image?: string;
    purchaseType?: 'whatsapp' | 'chariow';
    purchaseLink?: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const { t } = useTranslation();
    const { addToCart } = useCart();

    return (
        <Paper
            elevation={0}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                overflow: 'hidden',
                transition: 'border-color 0.2s',
                '&:hover': {
                    borderColor: 'text.primary',
                },
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    aspectRatio: '1/1',
                    backgroundColor: 'grey.50',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
                {product.image ? (
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <ImageIcon sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.2 }} />
                )}
            </Box>
            <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                        {product.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary', mt: 0.5 }}>
                        {product.price}
                    </Typography>
                </Box>
                <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px dashed', borderColor: 'divider' }}>
                    {product.purchaseType === 'chariow' ? (
                        <Button
                            variant="contained"
                            fullWidth
                            href={product.purchaseLink || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            color="primary"
                            sx={{
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                fontSize: { xs: '0.7rem', sm: '0.875rem' },
                                boxShadow: 'none',
                                '&:hover': {
                                    boxShadow: 'none',
                                },
                            }}
                        >
                            {t('shop.buttons.buyOnChariow')}
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<AddShoppingCartIcon />}
                            onClick={() => addToCart(product)}
                            sx={{
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                color: 'text.primary',
                                borderColor: 'text.primary',
                                fontSize: { xs: '0.7rem', sm: '0.875rem' },
                                '&:hover': {
                                    backgroundColor: 'primary.main',
                                    borderColor: 'text.primary',
                                },
                            }}
                        >
                            {t('shop.buttons.addToCart')}
                        </Button>
                    )}
                </Box>
            </Box>
        </Paper>
    );
};

export default ProductCard;
