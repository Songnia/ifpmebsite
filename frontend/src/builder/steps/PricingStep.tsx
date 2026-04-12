import { useState, useEffect } from 'react';
import { Plus, X, Euro, Edit2, Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { SiteConfig, PricingPlan } from '@/types/builder';

interface PricingStepProps {
  config: SiteConfig;
  onAddPlan: (plan: Omit<PricingPlan, 'id'>) => void;
  onRemovePlan: (id: string) => void;
  onUpdatePlan: (id: string, updates: Partial<PricingPlan>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function PricingStep({ 
  config, 
  onAddPlan, 
  onRemovePlan, 
  onUpdatePlan,
  onNext, 
  onPrev 
}: PricingStepProps) {
  const [plans, setPlans] = useState(config.pricingPlans || []);

  // Sync with config props
  useEffect(() => {
    setPlans(config.pricingPlans || []);
  }, [config.pricingPlans]);
  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: '',
    price: '',
    description: '',
    features: [''],
    recommended: false
  });

  const handleAddPlan = () => {
    if (newPlan.name && newPlan.price) {
      const planData = {
        name: newPlan.name,
        price: newPlan.price,
        description: newPlan.description,
        features: newPlan.features.filter(f => f.trim() !== ''),
        recommended: newPlan.recommended
      };
      onAddPlan(planData);
      setPlans(prev => [...prev, { id: Date.now().toString(), ...planData }]);
      setNewPlan({ name: '', price: '', description: '', features: [''], recommended: false });
      setDialogOpen(false);
    }
  };

  const handleRemovePlan = (id: string) => {
    onRemovePlan(id);
    setPlans(prev => prev.filter(p => p.id !== id));
  };

  const handleUpdatePlan = (id: string, updates: Partial<PricingPlan>) => {
    onUpdatePlan(id, updates);
    setPlans(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const addFeature = () => {
    setNewPlan(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const updateFeature = (index: number, value: string) => {
    setNewPlan(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  const removeFeature = (index: number) => {
    setNewPlan(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Vos Tarifs</h2>
        <p className="text-gray-600">Définissez vos forfaits et prix</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Euro className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold">Forfaits ({plans.length})</h3>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600 text-black">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un forfait
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Nouveau forfait</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                {/* Nom */}
                <div className="space-y-2">
                  <Label htmlFor="planName">Nom du forfait *</Label>
                  <Input
                    id="planName"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: Forfait Premium"
                  />
                </div>

                {/* Prix */}
                <div className="space-y-2">
                  <Label htmlFor="planPrice">Prix *</Label>
                  <Input
                    id="planPrice"
                    value={newPlan.price}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="Ex: 300€"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="planDescription">Description courte</Label>
                  <Textarea
                    id="planDescription"
                    value={newPlan.description}
                    onChange={(e) => setNewPlan(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Décrivez ce forfait..."
                    rows={2}
                  />
                </div>

                {/* Recommandé */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Marquer comme recommandé</span>
                  </div>
                  <Switch 
                    checked={newPlan.recommended}
                    onCheckedChange={(checked) => setNewPlan(prev => ({ ...prev, recommended: checked }))}
                  />
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <Label>Inclus dans ce forfait</Label>
                  {newPlan.features.map((feature, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder={`Élément ${index + 1}`}
                      />
                      {newPlan.features.length > 1 && (
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => removeFeature(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" onClick={addFeature} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter un élément
                  </Button>
                </div>

                <Button 
                  onClick={handleAddPlan}
                  disabled={!newPlan.name || !newPlan.price}
                  className="w-full bg-green-500 hover:bg-green-600 text-black"
                >
                  Ajouter le forfait
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {plans.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
            <Euro className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">Aucun forfait défini</p>
            <p className="text-sm text-gray-400">Ajoutez vos tarifs pour les afficher sur votre site</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`p-5 relative ${plan.recommended ? 'ring-2 ring-green-400' : ''}`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-green-400 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      RECOMMANDÉ
                    </span>
                  </div>
                )}

                {editingPlan === plan.id ? (
                  <EditPlanForm 
                    plan={plan}
                    onSave={(updates) => {
                      handleUpdatePlan(plan.id, updates);
                      setEditingPlan(null);
                    }}
                    onCancel={() => setEditingPlan(null)}
                  />
                ) : (
                  <>
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-lg">{plan.name}</h4>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setEditingPlan(plan.id)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => handleRemovePlan(plan.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="mb-3">
                      <span className="text-3xl font-bold">{plan.price}</span>
                    </div>

                    {plan.description && (
                      <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                    )}

                    {plan.features.length > 0 && (
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {!plan.recommended && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full mt-4"
                        onClick={() => handleUpdatePlan(plan.id, { recommended: true })}
                      >
                        <Star className="w-3 h-3 mr-1" />
                        Marquer recommandé
                      </Button>
                    )}
                  </>
                )}
              </Card>
            ))}
          </div>
        )}
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Retour
        </Button>
        <Button 
          onClick={onNext}
          className="bg-green-500 hover:bg-green-600 text-black"
        >
          Continuer
        </Button>
      </div>
    </div>
  );
}

// Composant pour éditer un forfait
function EditPlanForm({ 
  plan, 
  onSave, 
  onCancel 
}: { 
  plan: { name: string; price: string; description: string; features: string[]; recommended?: boolean };
  onSave: (updates: typeof plan) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(plan);

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

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Nom</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
        />
      </div>
      <div className="space-y-2">
        <Label>Prix</Label>
        <Input
          value={formData.price}
          onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
        />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={2}
        />
      </div>
      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
        <span className="text-sm">Recommandé</span>
        <Switch 
          checked={formData.recommended}
          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, recommended: checked }))}
        />
      </div>
      <div className="space-y-2">
        <Label>Éléments inclus</Label>
        {formData.features.map((feature, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={feature}
              onChange={(e) => updateFeature(index, e.target.value)}
            />
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => removeFeature(index)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button variant="outline" onClick={addFeature} size="sm">
          <Plus className="w-3 h-3 mr-1" />
          Ajouter
        </Button>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => onSave(formData)} className="flex-1 bg-green-500 hover:bg-green-600 text-white">
          <Check className="w-4 h-4 mr-2" />
          Enregistrer
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </div>
  );
}
