import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteConfig, defaultSiteConfig } from '@/types/builder';

interface ConfigContextType {
    config: SiteConfig;
    isDirty: boolean;
    updateConfig: (newConfig: Partial<SiteConfig>) => void;
    saveConfig: (overrides?: Partial<SiteConfig>) => Promise<void>;
    resetConfig: () => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
};

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [config, setConfig] = useState<SiteConfig>(defaultSiteConfig);
    const [isDirty, setIsDirty] = useState(false);
    const [hasFetchError, setHasFetchError] = useState(false);

    useEffect(() => {
        const loadConfig = async () => {
            let loadedFromServer = false;
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL?.replace(/\/api\/v1\/?$/, '') || ''}/api/v1/config/');
                if (res.ok) {
                    const data = await res.json();

                    // Server data is the source of truth — spread defaults first, then override server values
                    const merged: SiteConfig = {
                        ...defaultSiteConfig,
                        ...data,
                        // Nested objects: merge to avoid partial overwrite
                        socials: { ...defaultSiteConfig.socials, ...(data.socials || {}) },
                        hero: { ...defaultSiteConfig.hero, ...(data.hero || {}) },
                        enabledSections: { ...defaultSiteConfig.enabledSections, ...(data.enabledSections || {}) },
                        // Arrays: respect server value even if empty (empty = not configured yet)
                        stats: Array.isArray(data.stats) ? data.stats : [],
                        formations: Array.isArray(data.formations) ? data.formations : [],
                        events: Array.isArray(data.events) ? data.events : [],
                        gallery: Array.isArray(data.gallery) ? data.gallery : [],
                        testimonials: Array.isArray(data.testimonials) ? data.testimonials : [],
                        examResults: Array.isArray(data.examResults) ? data.examResults : [],
                        flashInfo: data.flashInfo ?? undefined,
                    };

                    setConfig(merged);
                    applyColors(merged);
                    loadedFromServer = true;
                }
            } catch (err) {
                console.error("Erreur serveur API, chargement depuis le cache local", err);
                setHasFetchError(true);
            }

            if (!loadedFromServer) {
                const saved = localStorage.getItem('ifpmeb_site_config');
                if (saved) {
                    try {
                        const parsed = JSON.parse(saved);
                        setConfig({ ...defaultSiteConfig, ...parsed });
                        applyColors({ ...defaultSiteConfig, ...parsed });
                    } catch (e) {
                        console.error('Failed to parse saved config', e);
                    }
                } else {
                    applyColors(defaultSiteConfig);
                }
            }
        };
        loadConfig();
    }, []);

    const applyColors = (updated: Partial<SiteConfig>) => {
        if (updated.primaryColor) document.documentElement.style.setProperty('--color-primary-blue', updated.primaryColor);
        if (updated.secondaryColor) {
            document.documentElement.style.setProperty('--color-gold', updated.secondaryColor);
            document.documentElement.style.setProperty('--color-primary-orange', updated.secondaryColor);
        }
        if (updated.accentColor) {
            // accentColor = couleur d'accent (doré) → met à jour TOUTES les variables dorées du site
            document.documentElement.style.setProperty('--color-accent', updated.accentColor);
            document.documentElement.style.setProperty('--color-primary-gold', updated.accentColor);
            document.documentElement.style.setProperty('--color-gold', updated.accentColor);
        }
        if (updated.backgroundColor) document.documentElement.style.setProperty('--color-cream', updated.backgroundColor);
        if (updated.textColor) document.documentElement.style.setProperty('--color-blue-dark', updated.textColor);
    };


    const updateConfig = (newConfig: Partial<SiteConfig>) => {
        setConfig(prev => {
            // Compare chaque champ : si aucun n'a changé, on ne marque pas dirty
            const hasRealChange = Object.keys(newConfig).some(key => {
                const k = key as keyof SiteConfig;
                return JSON.stringify(prev[k]) !== JSON.stringify(newConfig[k]);
            });

            const updated = { ...prev, ...newConfig };
            applyColors(updated);

            if (hasRealChange) {
                setIsDirty(true);
            }

            return updated;
        });
    };

    const buildSavePayload = (data: SiteConfig) => {
        // Helper to convert frontend image values to backend expected values
        const cleanImage = (val: string | undefined) => {
            if (!val) return null; // Convert empty string to null for deletion
            if (val.startsWith('http')) return undefined; // Remove existing absolute URLs to avoid 400 errors
            return val; // Keep Base64 data for new uploads
        };

        // 'cleaned' est un payload API (pas un SiteConfig) — null est valide pour supprimer des images
        const cleaned: Record<string, any> = { ...data };

        // Top level images
        cleaned.logo = cleanImage(data.logo);
        cleaned.aboutImage = cleanImage(data.aboutImage);

        // Nested in objects
        if (data.hero) {
            cleaned.hero = {
                ...data.hero,
                backgroundImage: cleanImage(data.hero.backgroundImage)
            };
        }

        if (data.flashInfo) {
            cleaned.flashInfo = {
                ...data.flashInfo,
                backgroundImage: cleanImage(data.flashInfo.backgroundImage)
            };
        }

        // Nested in arrays
        if (Array.isArray(data.formations)) {
            cleaned.formations = data.formations.map(f => ({
                ...f,
                image: cleanImage(f.image)
            }));
        }

        if (Array.isArray(data.events)) {
            cleaned.events = data.events.map(e => ({
                ...e,
                image: cleanImage(e.image)
            }));
        }

        if (Array.isArray(data.gallery)) {
            cleaned.gallery = data.gallery.map(g => ({
                ...g,
                url: cleanImage(g.url)
            }));
        }

        if (Array.isArray(data.testimonials)) {
            cleaned.testimonials = data.testimonials.map(t => ({
                ...t,
                avatar: (t as any).avatar ? cleanImage((t as any).avatar) : undefined
            }));
        }

        // Deeply remove all undefined keys so JSON.stringify omits them
        return JSON.parse(JSON.stringify(cleaned));
    };

    const saveConfig = async (overrides?: Partial<SiteConfig>): Promise<void> => {
        if (hasFetchError) {
            alert("🛑 PROTECTION SÉCURITÉ : La sauvegarde est bloquée car les données actuelles n'ont pas pu être chargées depuis le serveur. Sauvegarder maintenant risquerait d'écraser et de supprimer vos données. Veuillez recharger la page.");
            throw new Error("Sauvegarde bloquée pour prévenir la perte de données.");
        }

        try {
            const token = localStorage.getItem('ifpmeb_admin_token');
            const dataToSave = overrides ? { ...config, ...overrides } : config;
            const payload = buildSavePayload(dataToSave);

            const res = await fetch(`${import.meta.env.VITE_API_URL?.replace(/\/api\/v1\/?$/, '') || ''}/api/v1/config/', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const data = await res.json();
                const merged: SiteConfig = {
                    ...defaultSiteConfig,
                    ...data,
                    socials: { ...defaultSiteConfig.socials, ...(data.socials || {}) },
                    hero: { ...defaultSiteConfig.hero, ...(data.hero || {}) },
                    enabledSections: { ...defaultSiteConfig.enabledSections, ...(data.enabledSections || {}) },
                    stats: Array.isArray(data.stats) ? data.stats : [],
                    formations: Array.isArray(data.formations) ? data.formations : [],
                    events: Array.isArray(data.events) ? data.events : [],
                    gallery: Array.isArray(data.gallery) ? data.gallery : [],
                    testimonials: Array.isArray(data.testimonials) ? data.testimonials : [],
                    examResults: Array.isArray(data.examResults) ? data.examResults : [],
                    flashInfo: data.flashInfo ?? undefined,
                };

                setConfig(merged);
                localStorage.setItem('ifpmeb_site_config', JSON.stringify(merged));
            } else {
                console.error("Failed to save to server", await res.text());
                localStorage.setItem('ifpmeb_site_config', JSON.stringify(config));
            }
        } catch (e) {
            console.error("Network error while saving", e);
            localStorage.setItem('ifpmeb_site_config', JSON.stringify(config));
        }
        setIsDirty(false);
    };

    const resetConfig = () => {
        setConfig(defaultSiteConfig);
        localStorage.removeItem('ifpmeb_site_config');
        setIsDirty(false);
    };

    // Tracking des visites (Option A)
    useEffect(() => {
        const incrementVisitors = async () => {
            // Ne compte qu'une fois par session navigateur
            const hasRegisteredVisit = sessionStorage.getItem('ifpmeb_visit_tracked');
            
            if (!hasRegisteredVisit) {
                try {
                    const res = await fetch(`${import.meta.env.VITE_API_URL?.replace(/\/api\/v1\/?$/, '') || ''}/api/v1/track-visit/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' }
                    });
                    if (res.ok) {
                        const data = await res.json();
                        // Mettre à jour localement le compteur pour éviter de re-fetcher toute la config
                        setConfig(prev => ({ ...prev, total_visitors: data.total_visitors }));
                        sessionStorage.setItem('ifpmeb_visit_tracked', 'true');
                    }
                } catch (e) {
                    console.error("Erreur de tracking visite:", e);
                }
            }
        };

        // On ne tracke que sur le site public (pas quand on est dans le builder avec un token)
        const isAdmin = !!localStorage.getItem('ifpmeb_admin_token');
        if (!isAdmin) {
            incrementVisitors();
        }
    }, []);

    return (
        <ConfigContext.Provider value={{ config, isDirty, updateConfig, saveConfig, resetConfig }}>
            {children}
        </ConfigContext.Provider>
    );
};
