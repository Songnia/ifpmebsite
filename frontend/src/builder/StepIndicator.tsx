import { Check } from 'lucide-react';
import { builderSteps } from '@/types/builder';

interface StepIndicatorProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex items-center min-w-max px-2">
        {builderSteps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <div key={step.id} className="flex items-center">
              {/* Step Button */}
              <button
                onClick={() => onStepClick?.(index)}
                disabled={isUpcoming}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg transition-all
                  ${isCurrent 
                    ? 'bg-green-500 text-black font-medium' 
                    : isCompleted 
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                  ${isCurrent 
                    ? 'bg-black text-green-500' 
                    : isCompleted 
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-500'
                  }
                `}>
                  {isCompleted ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="hidden sm:inline text-sm whitespace-nowrap">{step.title}</span>
              </button>

              {/* Connector */}
              {index < builderSteps.length - 1 && (
                <div className={`
                  w-4 h-0.5 mx-1
                  ${isCompleted ? 'bg-green-300' : 'bg-gray-200'}
                `} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
