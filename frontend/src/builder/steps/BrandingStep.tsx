import { useState } from 'react';
import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import type { SiteConfig } from '@/types/builder';

interface BrandingStepProps {
  config: SiteConfig;
  onUpdate: (updates: Partial<SiteConfig>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const colorPresets = [
  {
    name: "IFPMEB",
    primary: "#003366",
    secondary: "#f8f9fa",
    accent: "#FDB913",
    background: "#ffffff",
    text: "#1a1a1a"
  },
  {
    name: "Classique",
    primary: "#1a1a1a",
    secondary: "#f5f5f5",
    accent: "#4caf50",
    background: "#ffffff",
    text: "#1a1a1a"
  },
  {
    name: "Élégant",
    primary: "#2c1810",
    secondary: "#faf7f5",
    accent: "#4caf50",
    background: "#ffffff",
    text: "#2c1810"
  },
  {
    name: "Moderne",
    primary: "#0f172a",
    secondary: "#f8fafc",
    accent: "#3b82f6",
    background: "#ffffff",
    text: "#0f172a"
  },
  {
    name: "Nature",
    primary: "#1a2f1a",
    secondary: "#f5f7f5",
    accent: "#4a7c59",
    background: "#ffffff",
    text: "#1a2f1a"
  },
  {
    name: "Artistic",
    primary: "#1a1a2e",
    secondary: "#f5f5f7",
    accent: "#e94560",
    background: "#ffffff",
    text: "#1a1a2e"
  },
  {
    name: "Minimal",
    primary: "#000000",
    secondary: "#ffffff",
    accent: "#666666",
    background: "#ffffff",
    text: "#000000"
  }
];

import { SaveButton } from '@/builder/components/SaveButton';

export function BrandingStep({ config, onUpdate, onNext, onPrev }: BrandingStepProps) {
  const [colors, setColors] = useState({
    primaryColor: config.primaryColor,
    secondaryColor: config.secondaryColor,
    accentColor: config.accentColor,
    backgroundColor: config.backgroundColor,
    textColor: config.textColor
  });

  const handleColorChange = (field: string, value: string) => {
    setColors(prev => ({ ...prev, [field]: value }));
  };

  const applyPreset = (preset: typeof colorPresets[0]) => {
    setColors({
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
      backgroundColor: preset.background,
      textColor: preset.text
    });
  };

  const handleSubmit = () => {
    onUpdate(colors);
    onNext();
  };

  const localIsDirty = JSON.stringify(colors) !== JSON.stringify({
    primaryColor: config.primaryColor,
    secondaryColor: config.secondaryColor,
    accentColor: config.accentColor,
    backgroundColor: config.backgroundColor,
    textColor: config.textColor
  });

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Identité visuelle</h2>
        <p className="text-gray-600">Personnalisez les couleurs de votre site</p>
      </div>

      {/* Préréglages */}
      <div className="space-y-3">
        <Label>Thèmes prédéfinis</Label>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset)}
              className="flex flex-col items-center gap-2 p-3 rounded-lg border hover:border-green-500 transition-colors"
            >
              <div className="flex gap-1">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: preset.primary }}
                />
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: preset.accent }}
                />
              </div>
              <span className="text-xs">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold">Couleurs personnalisées</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Couleur principale */}
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Couleur principale</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  id="primaryColor"
                  value={colors.primaryColor}
                  onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                  className="w-12 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={colors.primaryColor}
                  onChange={(e) => handleColorChange('primaryColor', e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md text-sm"
                />
              </div>
              <p className="text-xs text-gray-500">Titres, navigation, footer</p>
            </div>

            {/* Couleur d'accent */}
            <div className="space-y-2">
              <Label htmlFor="accentColor">Couleur d'accent</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  id="accentColor"
                  value={colors.accentColor}
                  onChange={(e) => handleColorChange('accentColor', e.target.value)}
                  className="w-12 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={colors.accentColor}
                  onChange={(e) => handleColorChange('accentColor', e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md text-sm"
                />
              </div>
              <p className="text-xs text-gray-500">Boutons, badges, éléments mis en avant</p>
            </div>

            {/* Couleur secondaire */}
            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Couleur secondaire</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  id="secondaryColor"
                  value={colors.secondaryColor}
                  onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                  className="w-12 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={colors.secondaryColor}
                  onChange={(e) => handleColorChange('secondaryColor', e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md text-sm"
                />
              </div>
              <p className="text-xs text-gray-500">Arrière-plans alternatifs</p>
            </div>

            {/* Couleur de fond */}
            <div className="space-y-2">
              <Label htmlFor="backgroundColor">Couleur de fond</Label>
              <div className="flex gap-2">
                <input
                  type="color"
                  id="backgroundColor"
                  value={colors.backgroundColor}
                  onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                  className="w-12 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={colors.backgroundColor}
                  onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md text-sm"
                />
              </div>
              <p className="text-xs text-gray-500">Fond principal du site</p>
            </div>
          </div>

          {/* Aperçu */}
          <div className="mt-6 p-4 rounded-lg border">
            <Label className="mb-3 block">Aperçu</Label>
            <div
              className="p-6 rounded-lg"
              style={{ backgroundColor: colors.backgroundColor }}
            >
              <h4
                className="text-xl font-bold mb-2"
                style={{ color: colors.primaryColor }}
              >
                Titre exemple
              </h4>
              <p
                className="mb-4"
                style={{ color: colors.textColor }}
              >
                Voici un exemple de texte sur votre site.
              </p>
              <button
                className="px-4 py-2 rounded-lg font-medium"
                style={{
                  backgroundColor: colors.accentColor,
                  color: colors.primaryColor
                }}
              >
                Bouton d'action
              </button>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Retour
        </Button>
        <div className="flex items-center justify-end gap-3">
          <SaveButton onSave={() => onUpdate(colors)} forceDirty={localIsDirty} getLatestData={() => colors} />
          <Button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-black"
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>
  );
}
