import { GraduationCap, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StepIndicator } from './StepIndicator';
import { useConfig } from '@/context/ConfigContext';
import { builderSteps } from '@/types/builder';

interface BuilderLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  onStepChange: (step: number) => void;
  onNext: () => void;
  onPrev: () => void;
  embedded?: boolean;
}

export function BuilderLayout({
  children,
  currentStep,
  onStepChange,
  embedded = false
}: BuilderLayoutProps) {
  const { config } = useConfig();
  const currentStepData = builderSteps[currentStep];
  const progress = ((currentStep + 1) / builderSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg leading-tight">{config?.siteName || 'Mon Institut'} Portail</h1>
                <p className="text-xs text-gray-500">Gérez le design de votre institution</p>
              </div>
            </div>

            {/* Progress */}
            <div className="hidden md:flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Étape {currentStep + 1} sur {builderSteps.length}
              </span>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="border-t bg-gray-50/50">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <StepIndicator
              currentStep={currentStep}
              onStepClick={onStepChange}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        {/* Step Title */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">{currentStepData.title}</h2>
          <p className="text-gray-500">{currentStepData.description}</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      {!embedded && (
        <footer className="bg-white border-t py-4">
          <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
            {config?.siteName || 'Mon Institut'} – Portail de Gestion de l'Identité Visuelle
          </div>
        </footer>
      )}
    </div>
  );
}
