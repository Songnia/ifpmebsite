import { GraduationCap, Palette, Globe, Sparkles, BookOpen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  const features = [
    {
      icon: BookOpen,
      title: "Catalogue de Formations",
      description: "Gérez vos programmes d'études, conditions d'admission et débouchés professionnels."
    },
    {
      icon: Palette,
      title: "Identité Visuelle",
      description: "Adaptez les couleurs institutionnelles et le logo à l'image de votre établissement."
    },
    {
      icon: Users,
      title: "Succès Étudiants",
      description: "Mettez en avant les témoignages et les résultats aux examens nationaux."
    },
    {
      icon: Sparkles,
      title: "Interface Intuitive",
      description: "Mettez à jour le contenu de votre portail en quelques clics, sans code."
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 mb-4">
          <GraduationCap className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900"> 
          Configurez votre portail <span className="text-green-500">en 2 minutes</span>
        </h1>
        {/*<p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Un outil simple et puissant pour créer un site web professionnel 
          qui mettra en valeur votre travail et attirera de nouveaux clients.
        </p>*/}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <feature.icon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button 
          size="lg" 
          onClick={onNext}
          className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8"
        >
          Commencer la création
        </Button>
        <p className="text-sm text-gray-500 mt-3">
          VANDA BUILDER
        </p>
      </div>
    </div>
  );
}
