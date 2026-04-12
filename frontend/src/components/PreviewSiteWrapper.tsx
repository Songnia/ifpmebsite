import { Box, Container } from '@mui/material';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { SiteConfigProvider } from '@/context/SiteConfigContext';
import { DynamicMUITheme } from '@/components/DynamicMUITheme';
import type { SiteConfig } from '@/types/builder';
import { CartProvider } from '@/template/context/CartContext';

// Import real translations from the template
import frTranslations from '@/template/i18n/locales/fr.json';
import enTranslations from '@/template/i18n/locales/en.json';

// Initialize i18n for preview with complete translations
const i18nInstance = i18n.createInstance();
i18nInstance.use(initReactI18next).init({
    lng: 'fr',
    resources: {
        fr: {
            translation: frTranslations
        },
        en: {
            translation: enTranslations
        }
    },
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
});

// Import the real template components
import Hero from '@/template/components/Home/Hero';
import FlashInfo from '@/template/components/Home/FlashInfo';
import ServicesSection from '@/template/components/Home/ServicesSection';
import PricingSection from '@/template/components/Home/PricingSection';

interface PreviewSiteWrapperProps {
    config: SiteConfig;
}

export function PreviewSiteWrapper({ config }: PreviewSiteWrapperProps) {
    return (
        <I18nextProvider i18n={i18nInstance}>
            <CartProvider>
                <SiteConfigProvider initialConfig={config}>
                    <DynamicMUITheme config={config}>
                        <Box sx={{ width: '100%', overflowX: 'hidden' }}>
                            {/* Hero Section */}
                            {config.enabledSections.hero && <Hero />}

                            <Container maxWidth="lg" sx={{ py: 4 }}>
                                {/* Flash Info Section */}
                                {config.flashInfo.enabled && <FlashInfo />}
                            </Container>

                            {/* Services Section */}
                            {config.enabledSections.services && <ServicesSection />}

                            {/* Pricing Section */}
                            {config.enabledSections.pricing && <PricingSection />}

                            {/* More sections can be added here */}
                        </Box>
                    </DynamicMUITheme>
                </SiteConfigProvider>
            </CartProvider>
        </I18nextProvider>
    );
}
