import React from 'react';
import { Box, ThemeProvider, CssBaseline, CircularProgress, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { SiteConfigProvider, useSiteConfig } from '@/context/SiteConfigContext';
import { CartProvider } from '@/template/context/CartContext';
import { createThemeFromConfig } from '@/template/theme/theme';
import i18nInstance from '@/template/i18n';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
    slug?: string; // Slug explicite (mode sous-domaine wildcard)
}

/**
 * Composant interne qui utilise le context de configuration
 */
const LayoutContent: React.FC = () => {
    const { config, loading, error } = useSiteConfig();

    // État de chargement
    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    gap: 2,
                    bgcolor: '#f8f8f5',
                }}
            >
                <CircularProgress size={60} sx={{ color: '#f2f20d' }} />
                <Typography variant="h6" color="text.secondary">
                    Chargement du site...
                </Typography>
            </Box>
        );
    }

    // État d'erreur
    if (error || !config) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    gap: 2,
                    textAlign: 'center',
                    px: 3,
                    bgcolor: '#f8f8f5',
                }}
            >
                <Typography variant="h3" sx={{ color: '#ef4444', fontWeight: 'bold' }}>
                    Oups !
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {error || "Ce site n'existe pas ou n'est pas encore publié."}
                </Typography>
            </Box>
        );
    }

    // Création du thème dynamique
    const dynamicTheme = createThemeFromConfig(config);

    return (
        <ThemeProvider theme={dynamicTheme}>
            <CssBaseline />
            <CartProvider>
                <Box
                    className="template-wrapper"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh',
                        width: '100%',
                        m: 0,
                        p: 0,
                        // Injection des CSS variables pour Tailwind/utilitaires
                        '--primary-color': config.primaryColor,
                        '--secondary-color': config.secondaryColor,
                        '--accent-color': config.accentColor,
                        '--background-color': config.backgroundColor,
                        '--text-color': config.textColor,
                    } as React.CSSProperties}
                >
                    <Navbar />
                    <Box component="main" sx={{ flexGrow: 1, width: '100%', m: 0, p: 0 }}>
                        <Outlet />
                    </Box>
                    <Footer />
                </Box>
            </CartProvider>
        </ThemeProvider>
    );
};

/**
 * Layout principal pour les sites publics
 * Wrapper avec SiteConfigProvider pour charger la config via API
 * 
 * - Mode route (/:slug) : le slug vient de useParams automatiquement
 * - Mode sous-domaine (slug.vanda-studio.org) : le slug est passé en prop
 */
const Layout: React.FC<LayoutProps> = ({ slug }) => {
    return (
        <I18nextProvider i18n={i18nInstance}>
            <SiteConfigProvider slug={slug}>
                <LayoutContent />
            </SiteConfigProvider>
        </I18nextProvider>
    );
};

export default Layout;
