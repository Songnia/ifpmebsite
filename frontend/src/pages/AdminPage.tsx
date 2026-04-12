import React, { useState, useEffect } from 'react';
import { useConfig } from '@/context/ConfigContext';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Components
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

// Builder Steps
import { BuilderLayout } from '@/builder/BuilderLayout';
import { WelcomeStep } from '@/builder/steps/WelcomeStep';
import { InfoStep } from '@/builder/steps/InfoStep';
import { BrandingStep } from '@/builder/steps/BrandingStep';
import { HeroStep } from '@/builder/steps/HeroStep';
import { StatsStep } from '@/builder/steps/StatsStep';
import { FormationsStep } from '@/builder/steps/FormationsStep';
import { EventsStep } from '@/builder/steps/EventsStep';
import { PortfolioStep } from '@/builder/steps/PortfolioStep';
import { TestimonialsStep } from '@/builder/steps/TestimonialsStep';
import { ContactStep } from '@/builder/steps/ContactStep';
import { PublishStep } from '@/builder/steps/PreviewStep';

type AdminView = 'dashboard' | 'builder';

export default function AdminPage() {
    // Navigation State
    const [activeView, setActiveView] = useState<AdminView>('builder');
    const [hasRedirected, setHasRedirected] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile toggle
    
    // Builder State
    const [currentStep, setCurrentStep] = useState(0);
    
    // Contexts & Hooks
    const { config, updateConfig, resetConfig } = useConfig();
    const { logout } = useAuth();
    const navigate = useNavigate();

    // Redirection logique : Dashboard si site déjà publié
    useEffect(() => {
        if (!hasRedirected && config.siteName) {
            setActiveView('dashboard');
            setHasRedirected(true);
        }
    }, [config.siteName, hasRedirected]);

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const handleNext = () => setCurrentStep(prev => prev + 1);
    const handlePrev = () => setCurrentStep(prev => prev - 1);
    const handleStepChange = (step: number) => setCurrentStep(step);
    
    const handleViewChange = (view: AdminView) => {
        setActiveView(view);
        setIsSidebarOpen(false); // Close sidebar on mobile after selection
    };


    const renderBuilderStep = () => {
        switch (currentStep) {
            case 0: return <WelcomeStep onNext={handleNext} />;
            case 1: return <InfoStep config={config} onUpdate={updateConfig} onNext={handleNext} onPrev={handlePrev} />;
            case 2: return <BrandingStep config={config} onUpdate={updateConfig} onNext={handleNext} onPrev={handlePrev} />;
            case 3: return <HeroStep config={config} onUpdate={updateConfig} onNext={handleNext} onPrev={handlePrev} />;
            case 4: return (
                <StatsStep
                    config={config}
                    onAddStat={(stat) => updateConfig({ stats: [...(config.stats || []), { ...stat, id: Date.now().toString() }] })}
                    onRemoveStat={(id) => updateConfig({ stats: config.stats?.filter(s => s.id !== id) })}
                    onUpdateStat={(id, updates) => updateConfig({ stats: config.stats?.map(s => s.id === id ? { ...s, ...updates } : s) })}
                    onAddResult={(res) => updateConfig({ examResults: [...(config.examResults || []), { ...res, id: Date.now().toString() }] })}
                    onRemoveResult={(id) => updateConfig({ examResults: config.examResults?.filter(r => r.id !== id) })}
                    onUpdateResult={(id, updates) => updateConfig({ examResults: config.examResults?.map(r => r.id === id ? { ...r, ...updates } : r) })}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            );
            case 5: return (
                <FormationsStep
                    config={config}
                    onAddFormation={(f) => updateConfig({ formations: [...(config.formations || []), { ...f, id: Date.now().toString() }] })}
                    onRemoveFormation={(id) => updateConfig({ formations: config.formations?.filter(f => f.id !== id) })}
                    onUpdateFormation={(id, updates) => updateConfig({ formations: config.formations?.map(f => f.id === id ? { ...f, ...updates } : f) })}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            );
            case 6: return (
                <EventsStep
                    config={config}
                    onAddEvent={(e) => updateConfig({ events: [...(config.events || []), { ...e, id: Date.now().toString() }] })}
                    onRemoveEvent={(id) => updateConfig({ events: config.events?.filter(e => e.id !== id) })}
                    onUpdateEvent={(id, updates) => updateConfig({ events: config.events?.map(e => e.id === id ? { ...e, ...updates } : e) })}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            );
            case 7: return (
                <PortfolioStep
                    config={config}
                    onAddPhoto={(photo) => updateConfig({ gallery: [...(config.gallery || []), { ...photo, id: Date.now().toString() }] })}
                    onAddPhotos={(photos) => updateConfig({ gallery: [...(config.gallery || []), ...photos.map(p => ({ ...p, id: Math.random().toString(36).substr(2, 9) }))] })}
                    onRemovePhoto={(id) => updateConfig({ gallery: config.gallery?.filter(p => p.id !== id) })}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            );
            case 8: return (
                <TestimonialsStep
                    config={config}
                    onAddTestimonial={(t) => updateConfig({ testimonials: [...(config.testimonials || []), { ...t, id: Date.now().toString() }] })}
                    onRemoveTestimonial={(id) => updateConfig({ testimonials: config.testimonials?.filter(t => t.id !== id) })}
                    onUpdateTestimonial={(id, updates) => updateConfig({ testimonials: config.testimonials?.map(t => t.id === id ? { ...t, ...updates } : t) })}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            );
            case 9: return <ContactStep config={config} onUpdate={updateConfig} onNext={handleNext} onPrev={handlePrev} />;
            case 10: return <PublishStep config={config} onReset={resetConfig} onPrev={handlePrev} />;
            default: return <WelcomeStep onNext={handleNext} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex overflow-x-hidden">
            {/* Sidebar avec gestion du tiroir mobile */}
            <AdminSidebar 
                activeView={activeView} 
                onViewChange={handleViewChange} 
                onLogout={handleLogout}
                siteName={config.siteName}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Overlay pour mobile - ferme le menu au clic à l'extérieur */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Zone de Contenu */}
            <main className="flex-1 flex flex-col min-w-0">
                <AdminHeader 
                    title={activeView === 'dashboard' ? 'Tableau de bord' : 'Site Builder'} 
                    siteUrl={window.location.origin} 
                    onMenuClick={() => setIsSidebarOpen(true)}
                    onLogout={handleLogout}
                />
                
                <div className="flex-1 overflow-y-auto">
                    {activeView === 'dashboard' ? (
                        <AdminDashboard />
                    ) : (
                        <BuilderLayout
                            currentStep={currentStep}
                            onStepChange={handleStepChange}
                            onNext={handleNext}
                            onPrev={handlePrev}
                            embedded={true} // Cache le footer du layout builder dans l'admin
                        >
                            {renderBuilderStep()}
                        </BuilderLayout>
                    )}
                </div>
            </main>
        </div>
    );
}

