import { useState } from 'react';
import { Save, Check, RefreshCw, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { SiteConfig } from '@/types/builder';

interface PublishStepProps {
  config: SiteConfig;
  onReset: () => void;
  onPrev: () => void;
}

export function PublishStep({ config, onReset, onPrev }: PublishStepProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveToDB = () => {
    setIsSaving(true);

    // Simulate API call to save to database
    setTimeout(() => {
      // Data is already in localStorage via context, so this simulates the backend sync
      console.log('Sending data to database:', config);
      setIsSaving(false);
      setIsSaved(true);

      setTimeout(() => setIsSaved(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full mb-4">
          <Database className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Prêt à publier !</h2>
        <p className="text-gray-600">Vos modifications seront envoyées directement dans la base de données et visibles sur le site public.</p>
      </div>

      {/* Récapitulatif */}
      <Card className="p-6">
        <h3 className="font-semibold mb-4">Récapitulatif des données</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{config.formations?.length || 0}</p>
            <p className="text-sm text-gray-600">Formations</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{config.events?.length || 0}</p>
            <p className="text-sm text-gray-600">Événements</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{config.gallery?.length || 0}</p>
            <p className="text-sm text-gray-600">Photos</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{config.testimonials?.length || 0}</p>
            <p className="text-sm text-gray-600">Témoignages</p>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <Button
          onClick={handleSaveToDB}
          disabled={isSaving || isSaved}
          className={`px-8 py-6 text-lg w-full sm:w-auto ${isSaved ? 'bg-green-500 hover:bg-green-600' : 'bg-primary hover:bg-primary/90'}`}
        >
          {isSaving ? (
            <span className="flex items-center gap-2">
              <RefreshCw className="w-5 h-5 animate-spin" />
              Enregistrement en cours...
            </span>
          ) : isSaved ? (
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              Publié avec succès !
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Save className="w-5 h-5" />
              Mettre en ligne
            </span>
          )}
        </Button>
      </div>

      <div className="mt-8 flex justify-between pt-6 border-t border-gray-100">
        <Button variant="outline" onClick={onPrev}>
          Retour aux Paramètres
        </Button>
        <Button variant="ghost" onClick={onReset} className="text-red-500 hover:text-red-600 hover:bg-red-50">
          <RefreshCw className="w-4 h-4 mr-2" />
          Réinitialiser tout
        </Button>
      </div>
    </div>
  );
}
