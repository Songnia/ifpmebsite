import { useState, useEffect } from 'react';
import { Plus, X, Edit2, Check, TrendingUp, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import type { SiteConfig, StatItem, ExamResult } from '@/types/builder';
import { SaveButton } from '@/builder/components/SaveButton';

interface StatsStepProps {
    config: SiteConfig;
    onAddStat: (stat: Omit<StatItem, 'id'>) => void;
    onRemoveStat: (id: string) => void;
    onUpdateStat: (id: string, updates: Partial<StatItem>) => void;
    onAddResult: (res: Omit<ExamResult, 'id'>) => void;
    onRemoveResult: (id: string) => void;
    onUpdateResult: (id: string, updates: Partial<ExamResult>) => void;
    onNext: () => void;
    onPrev: () => void;
}

export function StatsStep({
    config,
    onAddStat,
    onRemoveStat,
    onUpdateStat,
    onAddResult,
    onRemoveResult,
    onUpdateResult,
    onNext,
    onPrev
}: StatsStepProps) {
    const [stats, setStats] = useState(config.stats || []);
    const [results, setResults] = useState(config.examResults || []);

    // Sync local state when config prop changes (e.g. after a save or step change)
    useEffect(() => {
        setStats(config.stats || []);
        setResults(config.examResults || []);
    }, [config.stats, config.examResults]);

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState<any>({});

    const [newStat, setNewStat] = useState<Omit<StatItem, 'id'>>({
        value: '',
        label: '',
        icon: '📊'
    });

    const [newResult, setNewResult] = useState<Omit<ExamResult, 'id'>>({
        year: '2025',
        program: '',
        result_text: ''
    });

    // --- Handling Key Stats ---
    const handleAddStat = () => {
        if (newStat.value && newStat.label) {
            onAddStat(newStat);
            setStats(prev => [...prev, { id: Date.now().toString(), ...newStat }]);
            setNewStat({ value: '', label: '', icon: '📊' });
        }
    };

    const handleRemoveStat = (id: string) => {
        onRemoveStat(id);
        setStats(prev => prev.filter(s => s.id !== id));
    };

    const saveEditStat = (id: string) => {
        onUpdateStat(id, editData);
        setStats(prev => prev.map(s => s.id === id ? { ...s, ...editData } : s));
        setEditingId(null);
        setEditData({});
    };

    // --- Handling Exam Results ---
    const handleAddResult = () => {
        if (newResult.program && newResult.result_text) {
            onAddResult(newResult);
            setResults(prev => [...prev, { id: Date.now().toString(), ...newResult }]);
            setNewResult({ year: '2025', program: '', result_text: '' });
        }
    };

    const handleRemoveResult = (id: string) => {
        onRemoveResult(id);
        setResults(prev => prev.filter(r => r.id !== id));
    };

    const saveEditResult = (id: string) => {
        onUpdateResult(id, editData);
        setResults(prev => prev.map(r => r.id === id ? { ...r, ...editData } : r));
        setEditingId(null);
        setEditData({});
    };

    return (
        <div className="space-y-12">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">Résultats et Chiffres Clés</h2>
                <p className="text-gray-600">Gérez l'impact institutionnel et le palmarès de réussite de vos étudiants</p>
            </div>

            {/* ── SECTION 1: CHIFFRES CLÉS ────────────────────────── */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4 border-b pb-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">1. Statistiques Globales</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-1">
                        <Label className="text-xs">Valeur (ex: 95%)</Label>
                        <Input value={newStat.value} onChange={e => setNewStat({ ...newStat, value: e.target.value })} placeholder="95%" />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Libellé (ex: Taux de réussite)</Label>
                        <Input value={newStat.label} onChange={e => setNewStat({ ...newStat, label: e.target.value })} placeholder="Taux de réussite" />
                    </div>
                    <div className="flex items-end">
                        <Button onClick={handleAddStat} className="w-full bg-primary text-white" disabled={!newStat.value || !newStat.label}>
                            <Plus className="w-4 h-4 mr-2" /> Ajouter Stat
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {stats.map((s) => (
                        <Card key={s.id} className="p-4 relative group">
                            {editingId === s.id ? (
                                <div className="space-y-3">
                                    <Input value={editData.value} onChange={e => setEditData({ ...editData, value: e.target.value })} />
                                    <Input value={editData.label} onChange={e => setEditData({ ...editData, label: e.target.value })} />
                                    <div className="flex gap-2">
                                        <Button size="sm" onClick={() => saveEditStat(s.id)} className="bg-green-600 text-white">Confirmer</Button>
                                        <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Annuler</Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center text-sm">
                                    <div>
                                        <span className="font-bold text-primary mr-2 text-base">{s.value}</span>
                                        <span className="text-gray-600">{s.label}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="icon" onClick={() => { setEditingId(s.id); setEditData(s); }}><Edit2 className="w-3 h-3" /></Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveStat(s.id)}><X className="w-3 h-3 text-red-500" /></Button>
                                    </div>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            </div>

            {/* ── SECTION 2: RÉSULTATS EXAMENS (PALMARÈS) ────────────────────────── */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4 border-b pb-2">
                    <Trophy className="w-5 h-5 text-secondaryColor" />
                    <h3 className="text-lg font-semibold">2. Palmarès Étudiants</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-1">
                        <Label className="text-xs">Année</Label>
                        <Input value={newResult.year} onChange={e => setNewResult({ ...newResult, year: e.target.value })} placeholder="2025" />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Filière</Label>
                        <Input value={newResult.program} onChange={e => setNewResult({ ...newResult, program: e.target.value })} placeholder="BTS Banque" />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Score / Résultat</Label>
                        <Input value={newResult.result_text} onChange={e => setNewResult({ ...newResult, result_text: e.target.value })} placeholder="145 admis" />
                    </div>
                    <div className="flex items-end">
                        <Button onClick={handleAddResult} className="w-full bg-primary text-white" disabled={!newResult.program || !newResult.result_text}>
                            <Plus className="w-4 h-4 mr-2" /> Ajouter Résultat
                        </Button>
                    </div>
                </div>

                <div className="space-y-3">
                    {results.map((r) => (
                        <Card key={r.id} className="p-4 relative group hover:shadow-md transition-shadow">
                            {editingId === r.id ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                    <Input value={editData.year} onChange={e => setEditData({ ...editData, year: e.target.value })} />
                                    <Input value={editData.program} onChange={e => setEditData({ ...editData, program: e.target.value })} />
                                    <Input value={editData.result_text} onChange={e => setEditData({ ...editData, result_text: e.target.value })} />
                                    <div className="flex gap-2">
                                        <Button size="sm" onClick={() => saveEditResult(r.id)} className="bg-green-600 text-white">Enregistrer</Button>
                                        <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Annuler</Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                                        <span className="font-bold text-gray-900 min-w-[60px]">{r.year}</span>
                                        <span className="font-medium text-primary">{r.program}</span>
                                        <span className="text-gray-600 italic">{r.result_text}</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="icon" onClick={() => { setEditingId(r.id); setEditData(r); }}><Edit2 className="w-4 h-4" /></Button>
                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveResult(r.id)}><X className="w-4 h-4 text-red-500" /></Button>
                                    </div>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            </div>

            <div className="flex justify-between mt-8 pt-8 border-t">
                <Button variant="outline" onClick={onPrev}>Retour</Button>
                <div className="flex items-center justify-end gap-3">
                    <SaveButton onSave={() => { }} />
                    <Button onClick={onNext} className="bg-primary hover:bg-primary/90 text-white">Continuer</Button>
                </div>
            </div>
        </div>
    );
}
