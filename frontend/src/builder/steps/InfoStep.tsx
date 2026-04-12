import { useState } from 'react';
import { Building2, Mail, Phone, MapPin, Image as ImageIcon, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import type { SiteConfig } from '@/types/builder';

interface InfoStepProps {
  config: SiteConfig;
  onUpdate: (updates: Partial<SiteConfig>) => void;
  onNext: () => void;
  onPrev: () => void;
}

import { SaveButton } from '@/builder/components/SaveButton';

export function InfoStep({ config, onUpdate, onNext, onPrev }: InfoStepProps) {
  const [formData, setFormData] = useState({
    siteName: config.siteName,
    tagline: config.tagline,
    description: config.description,
    logo: config.logo || '',
    whatsappNumber: config.whatsappNumber,
    email: config.email,
    phone: config.phone,
    address: config.address,
    city: config.city,
    country: config.country,
    // À Propos
    aboutDescription: config.aboutDescription || '',
    history: config.history || '',
    mission: config.mission || '',
    foundationYear: config.foundationYear || '',
    aboutImage: config.aboutImage || '',
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAboutImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, aboutImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onUpdate(formData);
    onNext();
  };

  const localIsDirty = JSON.stringify(formData) !== JSON.stringify({
    siteName: config.siteName,
    tagline: config.tagline,
    description: config.description,
    logo: config.logo || '',
    whatsappNumber: config.whatsappNumber,
    email: config.email,
    phone: config.phone,
    address: config.address,
    city: config.city,
    country: config.country,
    aboutDescription: config.aboutDescription || '',
    history: config.history || '',
    mission: config.mission || '',
    foundationYear: config.foundationYear || '',
    aboutImage: config.aboutImage || '',
  });

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Informations de l'Institut</h2>
        <p className="text-gray-600">Ces informations apparaîtront sur tout le portail</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          {/* Nom de l'institut */}
          <div className="space-y-2">
            <Label htmlFor="siteName" className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              Nom de l'institut *
            </Label>
            <Input
              id="siteName"
              value={formData.siteName}
              onChange={(e) => handleChange('siteName', e.target.value)}
              placeholder="Ex: IFPMEB Togo"
            />
          </div>

          {/* Logo */}
          <div className="space-y-4">
            <Label htmlFor="logo" className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-primary" />
              Logo Officiel
            </Label>

            <div className="flex items-start gap-4">
              <div className="flex-1">
                <Input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Formats acceptés : PNG avec fond transparent recommandé.
                </p>
              </div>

              {formData.logo && (
                <div className="w-16 h-16 border rounded overflow-hidden bg-gray-50 flex items-center justify-center relative group">
                  <img
                    src={formData.logo}
                    alt="Logo Preview"
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={() => handleChange('logo', '')}
                    className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs transition-opacity"
                  >
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </Card>

      {/* === À Propos === */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">📖 Contenu de la page "À propos"</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="aboutDescription">Accroche / sous-titre de la page</Label>
            <Input
              id="aboutDescription"
              value={formData.aboutDescription}
              onChange={(e) => handleChange('aboutDescription', e.target.value)}
              placeholder="Notre établissement, notre mission et notre équipe."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="foundationYear">Année de fondation</Label>
              <Input
                id="foundationYear"
                value={formData.foundationYear}
                onChange={(e) => handleChange('foundationYear', e.target.value)}
                placeholder="Ex: 2005"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="history">Notre histoire</Label>
            <Textarea
              id="history"
              value={formData.history}
              onChange={(e) => handleChange('history', e.target.value)}
              placeholder="Fondé en [ANNÉE_FONDATION], l'IFPMEB s'est imposé comme..."
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mission">Notre mission</Label>
            <Textarea
              id="mission"
              value={formData.mission}
              onChange={(e) => handleChange('mission', e.target.value)}
              placeholder="Nous nous engageons à former des professionnels compétents..."
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-primary" />
              Photo campus / directeur
            </Label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleAboutImageUpload}
                  className="cursor-pointer"
                />
              </div>
              {formData.aboutImage && (
                <div className="w-24 h-16 border rounded overflow-hidden relative group">
                  <img src={formData.aboutImage} alt="About Preview" className="w-full h-full object-cover" />
                  <button
                    onClick={() => handleChange('aboutImage', '')}
                    className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs transition-opacity"
                  >
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Retour
        </Button>
        <div className="flex items-center justify-end gap-3">
          <SaveButton onSave={() => onUpdate(formData)} disabled={!formData.siteName || !formData.email} forceDirty={localIsDirty} getLatestData={() => formData} />
          <Button
            onClick={handleSubmit}
            disabled={!formData.siteName || !formData.email}
            className="bg-primary text-white"
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
}
