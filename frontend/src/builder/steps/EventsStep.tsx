import { useState, useRef, useEffect } from 'react';
import { Plus, X, Calendar, MapPin, Edit2, Check, Upload, Image as ImageIcon, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { SiteConfig, AcademicEvent } from '@/types/builder';
import { SaveButton } from '@/builder/components/SaveButton';

interface EventsStepProps {
    config: SiteConfig;
    onAddEvent: (event: Omit<AcademicEvent, 'id'>) => void;
    onRemoveEvent: (id: string) => void;
    onUpdateEvent: (id: string, updates: Partial<AcademicEvent>) => void;
    onNext: () => void;
    onPrev: () => void;
}

export function EventsStep({
    config,
    onAddEvent,
    onRemoveEvent,
    onUpdateEvent,
    onNext,
    onPrev
}: EventsStepProps) {
    const [events, setEvents] = useState(config.events || []);

    // Sync local state when config prop changes
    useEffect(() => {
        setEvents(config.events || []);
    }, [config.events]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleAdd = (data: Omit<AcademicEvent, 'id'>) => {
        onAddEvent(data);
        setEvents(prev => [...prev, { id: Date.now().toString(), ...data }]);
        setDialogOpen(false);
    };

    const handleRemove = (id: string) => {
        onRemoveEvent(id);
        setEvents(prev => prev.filter(e => e.id !== id));
    };

    const handleDuplicate = (ev: AcademicEvent) => {
        const { id, ...dataToCopy } = ev;
        const duplicatedData = { ...dataToCopy, title: `${dataToCopy.title} (Copie)` };
        handleAdd(duplicatedData);
    };

    const handleUpdate = (id: string, updates: Partial<AcademicEvent>) => {
        onUpdateEvent(id, updates);
        setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
        setEditingId(null);
    };

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Calendrier Académique</h2>
                <p className="text-gray-600">Gérez les événements, examens et journées portes ouvertes</p>
            </div>

            <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">Événements ({events.length})</h3>
                    </div>
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-primary text-white">
                                <Plus className="w-4 h-4 mr-2" />
                                Ajouter un événement
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>Nouvel événement</DialogTitle>
                            </DialogHeader>
                            <EventForm
                                onSave={handleAdd}
                                onCancel={() => setDialogOpen(false)}
                            />
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="space-y-4">
                    {events.map((ev) => (
                        <Card key={ev.id} className="p-4 bg-gray-50/50">
                            {editingId === ev.id ? (
                                <EventForm
                                    initialData={ev}
                                    onSave={(updates) => handleUpdate(ev.id, updates)}
                                    onCancel={() => setEditingId(null)}
                                />
                            ) : (
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-4">
                                        {ev.image && (
                                            <div className="w-16 h-16 rounded-lg overflow-hidden border flex-shrink-0">
                                                <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <div>
                                            <h4 className="font-semibold">{ev.title}</h4>
                                            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {ev.date}</span>
                                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {ev.lieu}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="icon" onClick={() => handleDuplicate(ev)} title="Dupliquer">
                                            <Copy className="w-4 h-4 text-blue-500" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => setEditingId(ev.id)} title="Modifier">
                                            <Edit2 className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleRemove(ev.id)} title="Supprimer">
                                            <X className="w-4 h-4 text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Card>
                    ))}
                    {events.length === 0 && (
                        <div className="text-center py-8 text-gray-400 border-2 border-dashed rounded-xl">
                            Aucun événement programmé
                        </div>
                    )}
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

function EventForm({
    initialData,
    onSave,
    onCancel
}: {
    initialData?: AcademicEvent;
    onSave: (data: any) => void;
    onCancel: () => void;
}) {
    const [formData, setFormData] = useState<Omit<AcademicEvent, 'id'>>(initialData || {
        date: '',
        title: '',
        type: 'Événement',
        lieu: '',
        description: '',
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

    return (
        <div className="space-y-4 pt-4">
            {/* Image Preview & Upload */}
            <div className="space-y-2">
                <Label className="flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-primary" />
                    Image de l'événement
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
                            <span className="text-xs font-medium text-gray-500">Uploader une illustration</span>
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

            <div className="space-y-2">
                <Label>Titre de l'événement *</Label>
                <Input
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ex: Concours d'Entrée 2026"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Date</Label>
                    <Input
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        placeholder="15 Octobre 2026"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Type</Label>
                    <Input
                        value={formData.type}
                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                        placeholder="Ex: Concours, JPO"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Lieu</Label>
                <Input
                    value={formData.lieu}
                    onChange={e => setFormData({ ...formData, lieu: e.target.value })}
                    placeholder="Ex: Campus Lomé"
                />
            </div>

            <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Détails de l'événement..."
                    rows={3}
                />
            </div>

            <div className="flex gap-3 pt-4 border-t">
                <Button
                    onClick={() => onSave(formData)}
                    disabled={!formData.title || !formData.date}
                    className="flex-1 bg-primary text-white"
                >
                    {initialData ? 'Mettre à jour l\'événement' : 'Ajouter au calendrier'}
                </Button>
                <Button variant="outline" type="button" onClick={onCancel}>Annuler</Button>
            </div>
        </div>
    );
}
