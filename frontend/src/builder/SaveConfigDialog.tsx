import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save, CreditCard, ArrowRight, Check, ExternalLink, Smartphone } from 'lucide-react';
import { siteConfigService } from '@/services/siteConfigService';
import type { SiteConfig } from '@/types/builder';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface SaveConfigDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    config: SiteConfig;
    onSaved?: () => void;
}

export function SaveConfigDialog({ open, onOpenChange, config, onSaved }: SaveConfigDialogProps) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [existingId, setExistingId] = useState<number | null>(null);
    const [siteName, setSiteName] = useState(config.siteName);
    const [slug, setSlug] = useState('');
    const [isPublished, setIsPublished] = useState(false);
    const { toast } = useToast();

    // Payment Step State
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedPlan, setSelectedPlan] = useState('starter');

    // Check for existing configuration when dialog opens
    useEffect(() => {
        if (open) {
            checkExistingConfig();
            // Retrieve selected plan from localStorage
            const storedPlan = localStorage.getItem('selectedPlan');
            if (storedPlan) {
                setSelectedPlan(storedPlan);
            }
            // Reset step
            setStep(1);
        }
    }, [open]);

    const checkExistingConfig = async () => {
        try {
            const configs = await siteConfigService.getMyConfigs();
            if (configs && configs.length > 0) {
                const existing = configs[0];
                setExistingId(existing.id);
                // Populate fields with existing data
                setSiteName(existing.site_name);
                setSlug(existing.slug);
                setIsPublished(existing.is_published);
            }
        } catch (error) {
            console.error("Failed to check existing config", error);
        }
    };

    const handleNext = () => {
        if (!siteName) {
            toast({
                title: "Nom du site requis",
                description: "Veuillez entrer un nom pour votre site.",
                variant: "destructive"
            });
            return;
        }
        setStep(2);
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            if (existingId) {
                // UPDATE existing site
                await siteConfigService.update(existingId, config);

                toast({
                    title: "Site mis à jour !",
                    description: "Vos modifications ont été enregistrées avec succès.",
                });
            } else {
                // CREATE new site
                const finalSlug = slug || siteName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

                await siteConfigService.create(config, siteName, finalSlug);

                toast({
                    title: "Site créé !",
                    description: "Votre site a été enregistré avec succès.",
                });
            }

            if (onSaved) onSaved();

            // Instead of closing immediately, move to step 3 if it's a new site
            if (!existingId) {
                setLoading(false); // Stop loading
                setStep(3); // Go to confirmation step
                return; // Don't close dialog yet
            }

            onOpenChange(false);

            // Redirect to Delivery Platform (Admin Dashboard)
            navigate('/admin/dashboard');
        } catch (error: any) {
            console.error('Save error:', error);
            toast({
                title: "Erreur lors de la sauvegarde",
                description: error.response?.data?.message || "Une erreur est survenue.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    // Helper to get Plan Info
    const getPlanInfo = () => {
        switch (selectedPlan) {
            case 'pro':
                return { name: 'PRO', price: '15 000 FCFA', link: 'https://avkshop.mychariow.shop/vanda-pro/checkout' };
            case 'studio':
                return { name: 'STUDIO', price: '45 000 FCFA', link: 'https://avkshop.mychariow.shop/vanda-studio/checkout' };
            default:
                return { name: 'STARTER', price: '5 000 FCFA', link: 'https://avkshop.mychariow.shop/vanda-starter/checkout' };
        }
    };

    const planInfo = getPlanInfo();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>
                        {existingId
                            ? "Mettre à jour le site"
                            : step === 1 ? "Configurer votre site"
                                : step === 2 ? "Finaliser votre commande"
                                    : "Activation en cours"}
                    </DialogTitle>
                    <DialogDescription>
                        {existingId
                            ? "Vos modifications seront appliquées à votre site existant."
                            : step === 1 ? "Entrez les informations de base pour votre site."
                                : step === 2 ? "Procédez au paiement pour activer votre site."
                                    : "Merci pour votre confiance. Votre site est presque prêt."}
                    </DialogDescription>
                </DialogHeader>

                {!existingId && step === 2 ? (
                    // STEP 2: PAYMENT
                    <div className="py-4 space-y-6">
                        {/* Order Summary */}
                        <div className="bg-muted/50 p-4 rounded-lg flex justify-between items-center border border-border">
                            <div>
                                <p className="text-sm text-muted-foreground">Plan sélectionné</p>
                                <p className="font-bold text-lg text-primary">{planInfo.name}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-muted-foreground">Total à payer</p>
                                <p className="font-bold text-lg">{planInfo.price}</p>
                            </div>
                        </div>

                        {/* Option 1: Online Payment */}
                        <div className="space-y-3">
                            <Label className="text-base font-semibold flex items-center gap-2">
                                <CreditCard className="w-4 h-4" /> Paiement en ligne sécurisé
                            </Label>
                            <Button
                                variant="outline"
                                className="w-full justify-between h-auto py-4 border-primary/20 hover:bg-primary/5 hover:border-primary/50 group"
                                onClick={() => window.open(planInfo.link, '_blank')}
                            >
                                <div className="text-left">
                                    <span className="font-semibold block">Payer via Chariow</span>
                                    <span className="text-xs text-muted-foreground">Carte bancaire, Mobile Money</span>
                                </div>
                                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                            </Button>
                        </div>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">Ou hors ligne</span>
                            </div>
                        </div>

                        {/* Option 2: Manual Mobile Money */}
                        <div className="space-y-3">
                            <Label className="text-base font-semibold flex items-center gap-2">
                                <Smartphone className="w-4 h-4" /> Transfert Direct
                            </Label>
                            <Alert>
                                <AlertTitle className="mb-2">Envoyez {planInfo.price} aux numéros suivants :</AlertTitle>
                                <AlertDescription className="space-y-1">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-orange-500">Orange Money</span>
                                        <code className="bg-muted px-2 py-1 rounded">686 265 447</code>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-green-500">MTN Mobile Money</span>
                                        <code className="bg-muted px-2 py-1 rounded">654 725 521</code>
                                    </div>
                                </AlertDescription>
                            </Alert>
                        </div>
                    </div>
                ) : step === 3 ? (
                    // STEP 3: PENDING ACTIVATION
                    <div className="py-8 text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Paiement enregistré !</h3>
                        <p className="text-gray-500 max-w-sm mx-auto">
                            Votre site sera accessible dans quelques minutes. Nous vérifions actuellement votre transaction avant l'activation finale.
                        </p>
                        <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm mt-4">
                            Un méssage de confirmation vous sera envoyé dès que votre site sera en ligne.
                        </div>
                    </div>
                ) : (
                    // STEP 1: CONFIG (Existing or New Step 1)
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="site-name">Nom du site</Label>
                            <Input
                                id="site-name"
                                value={siteName}
                                onChange={(e) => setSiteName(e.target.value)}
                                placeholder="Mon Super Studio"
                                disabled={!!existingId}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="slug">URL personnalisée (optionnel)</Label>
                            <div className="flex items-center">
                                <span className="text-sm text-gray-500 mr-1">/sites/</span>
                                <Input
                                    id="slug"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    placeholder="mon-studio"
                                    disabled={!!existingId}
                                />
                            </div>
                            <p className="text-xs text-gray-500">Laissez vide pour générer automatiquement.</p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="publish-mode"
                                checked={isPublished}
                                onCheckedChange={setIsPublished}
                                disabled={!!existingId}
                            />
                            <Label htmlFor="publish-mode">Publier immédiatement</Label>
                        </div>
                    </div>
                )}

                <DialogFooter>
                    {step === 3 ? (
                        <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => {
                            onOpenChange(false);
                            navigate('/admin/dashboard');
                        }}>
                            Compris, aller au tableau de bord
                        </Button>
                    ) : (
                        <>
                            {step === 2 && !existingId ? (
                                <Button variant="ghost" onClick={() => setStep(1)} disabled={loading} className="mr-auto">
                                    Retour
                                </Button>
                            ) : (
                                <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                                    Annuler
                                </Button>
                            )}

                            {!existingId && step === 1 ? (
                                <Button onClick={handleNext} className="bg-primary">
                                    Suivant <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            ) : (
                                <Button onClick={handleSave} disabled={loading} className="bg-primary hover:bg-primary/90">
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            {existingId ? "Mettre à jour" : "Validation en cours..."}
                                        </>
                                    ) : (
                                        <>
                                            {existingId ? <Save className="mr-2 h-4 w-4" /> : <Check className="mr-2 h-4 w-4" />}
                                            {existingId ? "Mettre à jour" : "J'ai effectué le paiement"}
                                        </>
                                    )}
                                </Button>
                            )}
                        </>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
