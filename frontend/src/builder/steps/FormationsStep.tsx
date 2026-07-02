import { useState, useRef, useEffect } from 'react';
import { Plus, X, GraduationCap, Edit2, Check, Upload, Image as ImageIcon, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { SiteConfig, Formation } from '@/types/builder';
import { SaveButton } from '@/builder/components/SaveButton';

interface FormationsStepProps {
    config: SiteConfig;
    onAddFormation: (formation: Omit<Formation, 'id'>) => void;
    onRemoveFormation: (id: string) => void;
    onUpdateFormation: (id: string, updates: Partial<Formation>) => void;
    onNext: () => void;
    onPrev: () => void;
}

export function FormationsStep({
    config,
    onAddFormation,
    onRemoveFormation,
    onUpdateFormation,
    onNext,
    onPrev
}: FormationsStepProps) {
    const [formations, setFormations] = useState(config.formations || []);

    // Sync local state when config prop changes
    useEffect(() => {
        setFormations(config.formations || []);
    }, [config.formations]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleAdd = (data: Omit<Formation, 'id'>) => {
        onAddFormation(data);
        setFormations(prev => [...prev, { id: Date.now().toString(), ...data }]);
        setDialogOpen(false);
    };

    const handleRemove = (id: string) => {
        onRemoveFormation(id);
        setFormations(prev => prev.filter(f => f.id !== id));
    };

    const handleDuplicate = (formation: Formation) => {
        const { id, ...dataToDuplicate } = formation;
        const newFormation = {
            ...dataToDuplicate,
            title: `${dataToDuplicate.title} (Copie)`,
        };
        handleAdd(newFormation);
    };

    const handleUpdate = (id: string, updates: Partial<Formation>) => {
        onUpdateFormation(id, updates);
        setFormations(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
        setEditingId(null);
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Catalogue des Formations</h2>
                <p className="text-gray-600">Gérez les programmes et filières proposés par l'institut</p>
            </div>

            <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">Formations ({formations.length})</h3>
                    </div>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-primary hover:bg-primary/90 text-white">
                                <Plus className="w-4 h-4 mr-2" />
                                Ajouter une formation
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Nouvelle formation</DialogTitle>
                            </DialogHeader>
                            <FormationForm
                                onSave={handleAdd}
                                onCancel={() => setDialogOpen(false)}
                            />
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="space-y-4">
                    {formations.map((formation) => (
                        <Card key={formation.id} className="p-4 border-l-4 border-l-primary">
                            {editingId === formation.id ? (
                                <FormationForm
                                    initialData={formation}
                                    onSave={(updates) => handleUpdate(formation.id, updates)}
                                    onCancel={() => setEditingId(null)}
                                />
                            ) : (
                                <div className="flex items-start gap-4">
                                    {formation.image && (
                                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border">
                                            <img src={formation.image} alt={formation.title} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                                                {formation.level || 'Formation'}
                                            </span>
                                            <span className="text-xs text-gray-500">• {formation.domain}</span>
                                        </div>
                                        <h4 className="font-semibold text-lg">{formation.title}</h4>
                                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{formation.description}</p>
                                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-gray-500">
                                            <span>⏱ {formation.duration}</span>
                                            <span>💰 {formation.price}</span>
                                            <span className="text-primary italic">{formation.objectives ? '✓ Objectifs saisis' : '✗ Pas d\'objectifs'}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="icon" onClick={() => handleDuplicate(formation)} title="Dupliquer">
                                            <Copy className="w-4 h-4 text-blue-500" />
                                        </Button>
                                        <Button variant="outline" size="icon" onClick={() => setEditingId(formation.id)} title="Modifier">
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" onClick={() => handleRemove(formation.id)} title="Supprimer">
                                            <X className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            </Card>

            <div className="flex justify-between mt-8">
                <Button variant="outline" onClick={onPrev}>Retour</Button>
                <div className="flex items-center justify-end gap-3">
                    <SaveButton onSave={() => { }} />
                    <Button onClick={onNext} className="bg-primary text-white">Continuer</Button>
                </div>
            </div>
        </div>
    );
}

function FormationForm({
    initialData,
    onSave,
    onCancel
}: {
    initialData?: Formation;
    onSave: (data: any) => void;
    onCancel: () => void;
}) {
    const [formData, setFormData] = useState<Omit<Formation, 'id'>>(initialData || {
        title: '',
        description: '',
        objectives: '',
        career_prospects: '',
        admission_requirements: '',
        duration: '',
        level: '',
        domain: '',
        price: '',
        installments: [],
        features: [''],
        image: ''
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setFormData(prev => ({ ...prev, image: event.target!.result as string }));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const addFeature = () => {
        setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
    };

    const updateFeature = (index: number, value: string) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.map((f, i) => i === index ? value : f)
        }));
    };

    const removeFeature = (index: number) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const addInstallment = () => {
        setFormData(prev => ({ ...prev, installments: [...(prev.installments || []), { name: '', amount: '' }] }));
    };

    const updateInstallment = (index: number, field: 'name' | 'amount', value: string) => {
        setFormData(prev => {
            const newInst = [...(prev.installments || [])];
            newInst[index] = { ...newInst[index], [field]: value };
            return { ...prev, installments: newInst };
        });
    };

    const removeInstallment = (index: number) => {
        setFormData(prev => ({
            ...prev,
            installments: (prev.installments || []).filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="space-y-6 pt-4">
            <div className="grid grid-cols-2 gap-4">
                {/* Image Upload */}
                <div className="col-span-2 space-y-2">
                    <Label className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-primary" />
                        Image de la formation
                    </Label>
                    <div className="flex items-center gap-4">
                        <div className="flex-1">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full border-dashed border-gray-300 h-20 flex flex-col items-center justify-center gap-1"
                            >
                                <Upload className="w-5 h-5 text-gray-400" />
                                <span className="text-xs font-medium text-gray-500">Uploader une photo</span>
                            </Button>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>
                        {formData.image && (
                            <div className="w-20 h-20 relative group border rounded-lg overflow-hidden">
                                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, image: '' })}
                                    className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <div className="col-span-2 space-y-2">
                    <Label>Nom de la formation *</Label>
                    <Input
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Ex: BTS Banque"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Niveau</Label>
                    <Input
                        value={formData.level}
                        onChange={e => setFormData({ ...formData, level: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Durée</Label>
                    <Input
                        value={formData.duration}
                        onChange={e => setFormData({ ...formData, duration: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Domaine</Label>
                    <Input
                        value={formData.domain}
                        onChange={e => setFormData({ ...formData, domain: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Tarif (Prix)</Label>
                    <Input
                        value={formData.price}
                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                        placeholder="Ex: 450 000 FCFA"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Présentation de la formation *</Label>
                <Textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    placeholder="Une introduction concise de la filière..."
                />
            </div>

            <div className="space-y-2">
                <Label>Objectifs pédagogiques</Label>
                <Textarea
                    value={formData.objectives}
                    onChange={e => setFormData({ ...formData, objectives: e.target.value })}
                    rows={3}
                    placeholder="Qu'est-ce que l'étudiant va apprendre ?"
                />
            </div>

            <div className="space-y-2">
                <Label>Débouchés professionnels</Label>
                <Textarea
                    value={formData.career_prospects}
                    onChange={e => setFormData({ ...formData, career_prospects: e.target.value })}
                    rows={3}
                    placeholder="Quels métiers pourra-t-il exercer ?"
                />
            </div>

            <div className="space-y-2">
                <Label>Conditions d'admission (Constitution des dossiers)</Label>
                <Textarea
                    value={formData.admission_requirements || ''}
                    onChange={e => setFormData({ ...formData, admission_requirements: e.target.value })}
                    rows={4}
                    placeholder="Ex: Être titulaire du BAC ou équivalent. Fournir : Copie du diplôme, extrait de naissance, 2 photos d'identité, relevé de notes..."
                />
            </div>

            <div className="space-y-2">
                <Label>Points forts (caractéristiques clés)</Label>
                {formData.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                        <Input
                            value={feature}
                            onChange={(e) => updateFeature(index, e.target.value)}
                            placeholder={`Ex: Stage en entreprise`}
                        />
                        {formData.features.length > 1 && (
                            <Button variant="outline" size="icon" type="button" onClick={() => removeFeature(index)}>
                                <X className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                ))}
                <Button variant="outline" type="button" onClick={addFeature} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un point fort
                </Button>
            </div>

            <div className="space-y-2 border-t pt-4">
                <Label>Tranches de paiement (Optionnel)</Label>
                <p className="text-xs text-gray-500 mb-2">Définissez les différentes échéances si la formation est payable en tranches.</p>
                {(formData.installments || []).map((inst, index) => (
                    <div key={index} className="flex gap-2">
                        <Input
                            value={inst.name}
                            onChange={(e) => updateInstallment(index, 'name', e.target.value)}
                            placeholder="Ex: 1ère tranche"
                            className="flex-1"
                        />
                        <Input
                            value={inst.amount}
                            onChange={(e) => updateInstallment(index, 'amount', e.target.value)}
                            placeholder="Ex: 150 000 FCFA"
                            className="flex-1"
                        />
                        <Button variant="outline" size="icon" type="button" onClick={() => removeInstallment(index)}>
                            <X className="w-4 h-4 text-red-500" />
                        </Button>
                    </div>
                ))}
                <Button variant="outline" type="button" onClick={addInstallment} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter une tranche de paiement
                </Button>
            </div>

            <div className="flex gap-3 pt-4 border-t">
                <Button
                    onClick={() => onSave(formData)}
                    disabled={!formData.title || !formData.description}
                    className="flex-1 bg-primary text-white"
                >
                    {initialData ? 'Mettre à jour la formation' : 'Ajouter au catalogue'}
                </Button>
                <Button variant="outline" type="button" onClick={onCancel}>Annuler</Button>
            </div>
        </div>
    );
}
