import { Box, Container as MuiContainer } from '@mui/material';
import { useSiteConfig } from '@/context/SiteConfigContext';
import promoteur1 from '../assets/promoteur/promoteur-1.png';

export default function About() {
    const { config } = useSiteConfig();

    // Early return if config is not loaded
    if (!config) return null;

    // Use fallback image if no promoter photo
    const promoterImage = config.promoterPhoto || promoteur1;
    const hasBiography = config.promoterBiography && config.promoterBiography.trim() !== '';
    const hasPhilosophy = config.promoterPhilosophy && config.promoterPhilosophy.trim() !== '';

    return (
        <Box sx={{ py: { xs: 8, md: 12 } }}>

            <MuiContainer maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 8, alignItems: 'center' }}>
                    {/* Image Column */}
                    <Box sx={{ flex: { xs: '1 1 auto', md: '0 0 40%' }, width: '100%', position: 'relative' }}>
                        {/* Decorative border */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: -20,
                                left: -20,
                                width: '100%',
                                height: '100%',
                                border: '2px solid',
                                borderColor: 'primary.main',
                                borderRadius: 2,
                                zIndex: 0,
                            }}
                        />

                        {/* Photo */}
                        <Box
                            sx={{
                                position: 'relative',
                                borderRadius: 2,
                                overflow: 'hidden',
                                zIndex: 1,
                                boxShadow: 3,
                                aspectRatio: '3/4',
                            }}
                        >
                            <img
                                src={promoterImage}
                                alt="Promoteur"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </Box>
                    </Box>

                    {/* Content Column */}
                    <Box sx={{ flex: 1 }}>
                        <Box
                            component="span"
                            sx={{
                                color: 'primary.main',
                                fontWeight: 'bold',
                                letterSpacing: 2,
                                textTransform: 'uppercase',
                                fontSize: '0.875rem',
                            }}
                        >
                            À PROPOS
                        </Box>
                        <Box component="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 'bold', mt: 1, mb: 4, color: 'text.primary' }}>
                            {config.siteName}
                        </Box>

                        {/* Biography Section */}
                        {hasBiography && (
                            <Box sx={{ mb: 4 }}>
                                <Box component="h3" sx={{ fontSize: '1.5rem', fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
                                    Biographie
                                </Box>
                                <Box>
                                    {config.promoterBiography.split('\n').map((paragraph: string, index: number) => (
                                        paragraph.trim() && (
                                            <Box
                                                key={index}
                                                component="p"
                                                sx={{ mb: 2, lineHeight: 1.8, color: 'text.secondary' }}
                                            >
                                                {paragraph}
                                            </Box>
                                        )
                                    ))}
                                </Box>
                            </Box>
                        )}

                        {/* Philosophy Section */}
                        {hasPhilosophy && (
                            <Box>
                                <Box component="h3" sx={{ fontSize: '1.5rem', fontWeight: 'bold', mb: 2, color: 'text.primary' }}>
                                    Ma Philosophie
                                </Box>
                                <Box>
                                    {config.promoterPhilosophy.split('\n').map((paragraph: string, index: number) => (
                                        paragraph.trim() && (
                                            <Box
                                                key={index}
                                                component="p"
                                                sx={{ mb: 2, lineHeight: 1.8, color: 'text.secondary' }}
                                            >
                                                {paragraph}
                                            </Box>
                                        )
                                    ))}
                                </Box>
                            </Box>
                        )}

                        {/* Fallback message if no content */}
                        {!hasBiography && !hasPhilosophy && (
                            <Box sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                                <p>Les informations du promoteur seront affichées ici une fois configurées dans le builder.</p>
                            </Box>
                        )}
                    </Box>
                </Box>
            </MuiContainer>
        </Box>
    );
}
