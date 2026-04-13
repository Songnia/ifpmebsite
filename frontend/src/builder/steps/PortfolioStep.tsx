import { useState, useRef, useEffect } from 'react';
import { Upload, Image, X, Plus, Folder, Grid3X3, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { SiteConfig, GalleryImage } from '@/types/builder';
import { usePlanLimits } from '@/hooks/usePlanLimits';
import { UpgradeDialog } from '@/components/common/UpgradeDialog';
import { SaveButton } from '@/builder/components/SaveButton';

interface PortfolioStepProps {
  config: SiteConfig;
  onAddPhoto: (photo: { url: string; category: string }) => void;
  onAddPhotos: (photos: { url: string; category: string }[]) => void;
  onRemovePhoto: (id: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const defaultCategories = [
  "Campus",
  "Étudiants",
  "Remise de diplômes",
  "Événements sportifs",
  "Laboratoires",
  "Bibliothèque",
  "Vie Associative"
];

export function PortfolioStep({ config, onAddPhoto, onAddPhotos, onRemovePhoto, onNext, onPrev }: PortfolioStepProps) {
  const [photos, setPhotos] = useState<GalleryImage[]>(config.gallery || []);

  // Sync with config props
  useEffect(() => {
    setPhotos(config.gallery || []);
  }, [config.gallery]);

  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([...defaultCategories]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ url: '', category: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Plan limits
  const { checkLimit, currentPlan } = usePlanLimits();
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // La catégorie doit être sélectionnée au préalable
    if (!newPhoto.category) {
      alert("Veuillez d'abord sélectionner une catégorie.");
      return;
    }

    // Si on a un seul fichier, on garde le comportement actuel (pré-remplissage du formulaire)
    if (files.length === 1) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewPhoto(prev => ({
            ...prev,
            url: event.target!.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
      return;
    }

    // Si on a plusieurs fichiers, on les ajoute directement
    const batchCategory = newPhoto.category;

    const uploadPromises = Array.from(files).map(file => {
      return new Promise<{ url: string; category: string }>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve({
            url: event.target?.result as string,
            category: batchCategory
          });
        };
        reader.readAsDataURL(file);
      });
    });

    const results = await Promise.all(uploadPromises);

    // Ajouter au parent sans IDs (le parent les générera)
    onAddPhotos(results);

    // Ajouter à l'état local avec des IDs temporaires pour l'affichage immédiat
    setPhotos(prev => [
      ...prev,
      ...results.map(r => ({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...r
      }))
    ]);

    // Réinitialiser le formulaire
    setNewPhoto({ url: '', category: '' });
    setUploadDialogOpen(false);
  };

  const handleAddPhoto = () => {
    const category = newPhoto.category;

    if (newPhoto.url && category) {
      onAddPhoto({
        url: newPhoto.url,
        category: category
      });
      setPhotos(prev => [...prev, {
        id: Date.now().toString(),
        url: newPhoto.url,
        category: category
      }]);
      setNewPhoto({ url: '', category: '' });
      setUploadDialogOpen(false);
    }
  };

  const handleRemovePhoto = (id: string) => {
    onRemovePhoto(id);
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories(prev => [...prev, newCategory]);
      setNewCategory('');
    }
  };

  const filteredPhotos = selectedCategory
    ? photos.filter(p => p.category === selectedCategory)
    : photos;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Votre Portfolio</h2>
        <p className="text-gray-600">Ajoutez vos photos et organisez-les par catégories</p>
      </div>

      {/* Catégories */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Folder className="w-4 h-4 text-green-500" />
          <Label>Catégories</Label>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedCategory === ''
              ? 'bg-green-500 text-black'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Toutes ({photos.length})
          </button>
          {categories.map(cat => {
            const count = photos.filter(p => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === selectedCategory ? '' : cat)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedCategory === cat
                  ? 'bg-green-500 text-black'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {cat} {count > 0 && `(${count})`}
              </button>
            );
          })}
        </div>
        <div className="flex gap-2">
          <Input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Nouvelle catégorie..."
            className="flex-1"
          />
          <Button variant="outline" onClick={handleAddCategory} disabled={!newCategory}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Photos */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold">Photos ({filteredPhotos.length})</h3>
          </div>
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-green-500 hover:bg-green-600 text-black"
                onClick={(e) => {
                  // Check photo limit before opening dialog
                  if (checkLimit('photos', photos.length)) {
                    e.preventDefault();
                    setUpgradeDialogOpen(true);
                  }
                }}
              >
                <Upload className="w-4 h-4 mr-2" />
                Ajouter une photo
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Ajouter une photo</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">

                {/* Catégorie */}
                <div className="space-y-2">
                  <Label htmlFor="photoCategory">Catégorie *</Label>
                  <select
                    id="photoCategory"
                    value={newPhoto.category}
                    onChange={(e) => setNewPhoto(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                {/* Upload */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {!newPhoto.url ? (
                  <div
                    onClick={() => {
                      if (!newPhoto.category) {
                        alert("Veuillez d'abord sélectionner une catégorie.");
                      } else {
                        fileInputRef.current?.click();
                      }
                    }}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${newPhoto.category
                      ? 'border-gray-300 hover:border-green-500'
                      : 'border-red-200 bg-red-50/10 grayscale cursor-not-allowed'
                      }`}
                  >
                    <Image className={`w-12 h-12 mx-auto mb-3 ${newPhoto.category ? 'text-gray-400' : 'text-red-300'}`} />
                    <p className={`${newPhoto.category ? 'text-gray-600' : 'text-red-400'} font-medium`}>
                      {newPhoto.category ? 'Cliquez pour sélectionner des images' : 'Sélectionnez une catégorie d\'abord'}
                    </p>
                    {newPhoto.category && <p className="text-xs text-gray-400 mt-2">Vous pouvez en sélectionner plusieurs</p>}
                  </div>
                ) : (
                  <div className="relative aspect-video">
                    <img
                      src={newPhoto.url}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setNewPhoto(prev => ({ ...prev, url: '' }))}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}

                

                <Button
                  onClick={handleAddPhoto}
                  disabled={!newPhoto.url || !newPhoto.category}
                  className="w-full bg-green-500 hover:bg-green-600 text-black"
                >
                  Ajouter au portfolio
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {filteredPhotos.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
            <Grid3X3 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">Aucune photo dans cette catégorie</p>
            <p className="text-sm text-gray-400">Ajoutez vos premières photos pour les voir ici</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="group relative aspect-square">
                <img
                  src={photo.url}
                  alt={photo.category}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white font-medium text-sm truncate">{photo.category}</p>
                  </div>
                  <button
                    onClick={() => handleRemovePhoto(photo.id)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Retour
        </Button>
        <div className="flex items-center justify-end gap-3">
          <SaveButton onSave={() => { }} />
          <Button
            onClick={onNext}
            className="bg-green-500 hover:bg-green-600 text-black"
          >
            Continuer
          </Button>
        </div>
      </div>

      {/* Upgrade Dialog */}
      <UpgradeDialog
        open={upgradeDialogOpen}
        onClose={() => setUpgradeDialogOpen(false)}
        feature="photos"
        currentPlan={currentPlan}
      />
    </div>
  );
}
