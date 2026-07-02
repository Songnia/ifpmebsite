import { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Link2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import type { SiteConfig } from '@/types/builder';
import { SaveButton } from '@/builder/components/SaveButton';

interface ContactStepProps {
  config: SiteConfig;
  onUpdate: (updates: Partial<SiteConfig>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function ContactStep({ config, onUpdate, onNext, onPrev }: ContactStepProps) {
  const [formData, setFormData] = useState({
    email: config.email,
    phone: config.phone,
    whatsappNumber: config.whatsappNumber || '',
    address: config.address,
    city: config.city,
    country: config.country,
    socials: config.socials || {
      instagram: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      website: '',
      twitter: ''
    }
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSocialChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socials: {
        ...prev.socials,
        [platform]: value
      }
    }));
  };

  const handleSubmit = () => {
    onUpdate(formData);
    onNext();
  };

  const localIsDirty = JSON.stringify(formData) !== JSON.stringify({
    email: config.email,
    phone: config.phone,
    whatsappNumber: config.whatsappNumber || '',
    address: config.address,
    city: config.city,
    country: config.country,
    socials: config.socials || {
      instagram: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      website: '',
      twitter: ''
    }
  });

  const socialInputs = [
    { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'company/ifpmeb' },
    { key: 'facebook', label: 'Facebook', icon: Link2, placeholder: 'ifpmeb.togo' },
    { key: 'instagram', label: 'Instagram', icon: Link2, placeholder: '@ifpmeb' },
    { key: 'twitter', label: 'Twitter/X', icon: Link2, placeholder: '@ifpmeb' },
    { key: 'youtube', label: 'YouTube', icon: Link2, placeholder: '@ifpmeb_channel' },
    { key: 'website', label: 'Lien Site Web', icon: Globe, placeholder: 'www.ifpmeb.tg' }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Points de Contact</h2>
        <p className="text-gray-600">Gérez les canaux de communication officiels de l'institut</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coordonnées */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Coordonnées Officielles</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Email Principal *</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="contact@ifpmeb.tg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Téléphone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+228 22 00 00 00"
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  WhatsApp
                </Label>
                <Input
                  value={formData.whatsappNumber}
                  onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                  placeholder="+228 90 00 00 00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Adresse du Campus</Label>
              <Input
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Quartier Administratif"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ville</Label>
                <Input
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  placeholder="Lomé"
                />
              </div>
              <div className="space-y-2">
                <Label>Pays</Label>
                <Input
                  value={formData.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                  placeholder="Togo"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Réseaux sociaux */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Link2 className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Présence Digitale</h3>
          </div>

          <div className="space-y-4">
            {socialInputs.map(({ key, label, icon: Icon, placeholder }) => (
              <div key={key} className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-primary" />
                  {label}
                </Label>
                <Input
                  value={formData.socials[key as keyof typeof formData.socials] || ''}
                  onChange={(e) => handleSocialChange(key, e.target.value)}
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onPrev}>Retour</Button>
        <div className="flex items-center justify-end gap-3">
          <SaveButton onSave={() => onUpdate(formData)} disabled={!formData.email} forceDirty={localIsDirty} getLatestData={() => formData} />
          <Button onClick={handleSubmit} disabled={!formData.email} className="bg-primary text-white">Continuer</Button>
        </div>
      </div>
    </div>
  );
}
