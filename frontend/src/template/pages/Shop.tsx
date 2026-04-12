import React from 'react';
import { Box, Container, Typography, Button, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/Shop/ProductCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useCart } from '../context/CartContext';

import s1 from '../assets/shop/1.png';
import s3 from '../assets/shop/3.png';
import s4 from '../assets/shop/4.png';
import s5 from '../assets/shop/5.png';
import s6 from '../assets/shop/6.png';
import s7 from '../assets/shop/7.png';
import s8 from '../assets/shop/8.png';

const Shop: React.FC = () => {
    const { t } = useTranslation();
    const { cartCount, openCart } = useCart();

    const categories = [
        { key: 'All', label: t('shop.categories.all') },
        { key: 'Prints', label: t('shop.categories.prints') },
        { key: 'Frames', label: t('shop.categories.frames') },
        { key: 'Goodies', label: t('shop.categories.goodies') },
        { key: 'Second-Hand', label: t('shop.categories.secondHand') },
    ];

    const mockProducts = [
        { id: 1, name: t('shop.products.printA4'), price: '5 000 Fcfa', purchaseType: 'whatsapp' as const, category: 'Prints', image: s1 },
        { id: 2, name: t('shop.products.frameBlack'), price: '15 000 Fcfa', purchaseType: 'whatsapp' as const, category: 'Frames', image: s3 },
        { id: 3, name: t('shop.products.filmRoll'), price: '8 000 Fcfa', purchaseType: 'chariow' as const, purchaseLink: 'https://chariow.com/product/film-roll', category: 'Goodies', image: s4 },
        { id: 4, name: t('shop.products.cameraLens'), price: '75 000 Fcfa', purchaseType: 'whatsapp' as const, category: 'Second-Hand', image: s5 },
        { id: 5, name: t('shop.products.lightingKit'), price: '150 000 Fcfa', purchaseType: 'chariow' as const, purchaseLink: 'https://chariow.com/product/lighting-kit', category: 'Goodies', image: s6 },
        { id: 6, name: t('shop.products.photoPaper'), price: '3 500 Fcfa', purchaseType: 'whatsapp' as const, category: 'Prints', image: s7 },
        { id: 7, name: t('shop.products.tripod'), price: '25 000 Fcfa', purchaseType: 'chariow' as const, purchaseLink: 'https://chariow.com/product/tripod', category: 'Goodies', image: s8 },
        { id: 8, name: t('shop.products.cleaningKit'), price: '5 000 Fcfa', purchaseType: 'whatsapp' as const, category: 'Goodies', image: s1 },
    ];

    const [selectedCategory, setSelectedCategory] = React.useState('All');

    const filteredProducts = selectedCategory === 'All'
        ? mockProducts
        : mockProducts.filter(product => product.category === selectedCategory);

    return (
        <Container
            maxWidth="lg"
            sx={{
                py: { xs: 3, md: 6 },
                px: { xs: 2, sm: 3, md: 4 }
            }}
        >
            <Box sx={{ mb: { xs: 3, md: 5 }, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                            mb: 1,
                            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' }
                        }}
                    >
                        {t('shop.title')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {t('shop.version')}
                    </Typography>
                </Box>
            </Box>

            {/* Filters */}
            <Box
                sx={{
                    display: 'flex',
                    gap: { xs: 1.5, sm: 2 },
                    mb: { xs: 3, md: 5 },
                    overflowX: 'auto',
                    pb: 1,
                    '&::-webkit-scrollbar': {
                        height: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        borderRadius: '3px',
                    },
                }}
            >
                {categories.map((cat) => (
                    <Chip
                        key={cat.key}
                        label={cat.label}
                        onClick={() => setSelectedCategory(cat.key)}
                        variant={selectedCategory === cat.key ? 'filled' : 'outlined'}
                        color={selectedCategory === cat.key ? 'primary' : 'default'}
                        sx={{
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            px: 1,
                            height: '40px',
                            fontSize: '0.9rem',
                            borderWidth: selectedCategory === cat.key ? 0 : 1,
                            '&:hover': {
                                backgroundColor: selectedCategory === cat.key ? 'primary.dark' : 'rgba(0,0,0,0.04)',
                            },
                        }}
                    />
                ))}
            </Box>

            {/* Product Grid using CSS Grid */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: 'repeat(2, 1fr)', // 2 columns on mobile
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                        lg: 'repeat(4, 1fr)',
                    },
                    gap: { xs: 2, sm: 3, md: 4 },
                    pb: { xs: 8, md: 4 },
                }}
            >
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </Box>

            {/* Checkout FAB */}
            <Box sx={{ position: 'fixed', bottom: { xs: 16, md: 32 }, right: { xs: 16, md: 32 }, zIndex: 1000 }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<ShoppingBagIcon />}
                    onClick={openCart}
                    sx={{
                        borderRadius: 3,
                        px: { xs: 2, md: 3 },
                        py: 2,
                        fontWeight: 'bold',
                        boxShadow: 4,
                        border: '2px solid',
                        borderColor: 'text.primary',
                        fontSize: { xs: '0.875rem', md: '1rem' },
                    }}
                >
                    {t('shop.checkout')} ({cartCount})
                </Button>
            </Box>
        </Container>
    );
};

export default Shop;
