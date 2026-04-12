import { useState, useRef } from 'react';
import { Upload, Image, X, Type, Sparkles, Zap, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import type { SiteConfig } from '@/types/builder';

interface HeroStepProps {
  config: SiteConfig;
  onUpdate: (updates: Partial<SiteConfig>) => void;
  onNext: () => void;
  onPrev: () => void;
}

import { SaveButton } from '@/builder/components/SaveButton';

export function HeroStep({ config, onUpdate, onNext, onPrev }: HeroStepProps) {
  const [hero, setHero] = useState(config.hero || {
    eyebrow: '',
    title: '',
    subtitle: '',
    backgroundImage: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const flashInfoFileInputRef = useRef<HTMLInputElement>(null);

  const handleHeroImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setHero(prev => ({ ...prev, backgroundImage: event.target!.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFlashInfoImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdate({
            flashInfo: {
              enabled: config.flashInfo?.enabled ?? false,
              title: config.flashInfo?.title || '',
              subtitle: config.flashInfo?.subtitle || '',
              buttonText: config.flashInfo?.buttonText || '',
              whatsappMessage: config.flashInfo?.whatsappMessage,
              backgroundImage: event.target!.result as string
            }
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onUpdate({ hero });
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Bannière d'Accueil</h2>
        <p className="text-gray-600">Le premier message que vos futurs étudiants verront</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {/* Eyebrow */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Surtitre (Eyebrow)
            </Label>
            <Input
              value={hero.eyebrow}
              onChange={(e) => setHero({ ...hero, eyebrow: e.target.value })}
              placeholder="Ex: INSCRIPTIONS OUVERTES 2025-2026"
            />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Type className="w-4 h-4 text-primary" />
              Titre principal
            </Label>
            <Input
              value={hero.title}
              onChange={(e) => setHero({ ...hero, title: e.target.value })}
              placeholder="Ex: Formez-vous aux métiers d'avenir"
            />
          </div>

          {/* Subtitle */}
          <div className="space-y-2">
            <Label>Sous-titre / Description</Label>
            <Textarea
              value={hero.subtitle}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              placeholder="Ex: Devenez un professionnel accompli grâce à nos programmes certifiants..."
              rows={3}
            />
          </div>

          {/* Background Image */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Image className="w-4 h-4 text-primary" />
              Photo de couverture (Campus / Étudiants)
            </Label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleHeroImageUpload}
              className="hidden"
            />

            <div className="flex items-start gap-4">
              <div className="flex-1">
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-dashed border-gray-300 h-24 flex flex-col items-center justify-center gap-2"
                >
                  <Upload className="w-6 h-6 text-gray-400" />
                  <span className="text-sm font-medium">Changer l'image de fond</span>
                </Button>
              </div>

              {hero.backgroundImage && (
                <div className="w-32 h-20 relative group border rounded-lg overflow-hidden">
                  <img
                    src={hero.backgroundImage}
                    alt="Hero Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setHero({ ...hero, backgroundImage: '' })}
                    className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Flash Info Academic */}
          <Card className="p-4 border-orange-200 bg-orange-50/20">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-orange-600" />
                  <h3 className="font-bold text-gray-900">Annonce Prioritaire (Flash Info)</h3>
                </div>
                <Switch
                  checked={config.flashInfo?.enabled ?? false}
                  onCheckedChange={(checked: boolean) => {
                    const currentInfo = config.flashInfo || { title: '', subtitle: '', buttonText: '' };
                    onUpdate({
                      flashInfo: { ...currentInfo, enabled: checked }
                    });
                  }}
                />
              </div>

              {config.flashInfo?.enabled && (
                <div className="space-y-4 pt-2 border-t border-orange-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Titre de l'alerte</Label>
                      <Input
                        value={config.flashInfo.title || ''}
                        onChange={(e) => onUpdate({
                          flashInfo: { ...config.flashInfo!, enabled: true, title: e.target.value }
                        })}
                        placeholder="Ex: Concours d'entrée"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Sous-titre</Label>
                      <Input
                        value={config.flashInfo.subtitle || ''}
                        onChange={(e) => onUpdate({
                          flashInfo: { ...config.flashInfo!, enabled: true, subtitle: e.target.value }
                        })}
                        placeholder="Ex: Date limite le 15 Octobre"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Lien / Action WhatsApp</Label>
                    <Input
                      value={config.flashInfo.buttonText || ''}
                      onChange={(e) => onUpdate({
                        flashInfo: { ...config.flashInfo!, enabled: true, buttonText: e.target.value }
                      })}
                      placeholder="Ex: Postuler maintenant"
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>Retour</Button>
        <div className="flex items-center justify-end gap-3">
          <SaveButton onSave={() => onUpdate({ hero })} getLatestData={() => ({ hero })} />
          <Button onClick={handleSubmit} className="bg-primary text-white">Continuer</Button>
        </div>
      </div>
    </div>
  );
}
