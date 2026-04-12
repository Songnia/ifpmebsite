import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save, Check, RefreshCw } from 'lucide-react';
import { useConfig } from '@/context/ConfigContext';

interface SaveButtonProps {
    onSave: () => void;
    disabled?: boolean;
    forceDirty?: boolean;
    getLatestData?: () => any;
}

export function SaveButton({ onSave, disabled, forceDirty, getLatestData }: SaveButtonProps) {
    const { saveConfig, isDirty } = useConfig();
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const hasChanges = isDirty || forceDirty;

    const handleSave = async () => {
        onSave();
        setIsSaving(true);
        try {
            const latestData = getLatestData ? getLatestData() : undefined;
            await saveConfig(latestData);
        } finally {
            setIsSaving(false);
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2000);
        }
    };

    return (
        <Button
            variant="outline"
            onClick={handleSave}
            disabled={disabled || !hasChanges || isSaving || isSaved}
            className={`gap-2 transition-all ${isSaved ? 'text-green-600 border-green-200 bg-green-50 hover:bg-green-50 hover:text-green-600' : 'text-primary border-primary hover:bg-primary/5'}`}
        >
            {isSaving ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
            ) : isSaved ? (
                <Check className="w-4 h-4" />
            ) : (
                <Save className="w-4 h-4" />
            )}
            {isSaved ? 'Sauvegardé' : 'Sauvegarder'}
        </Button>
    );
}
