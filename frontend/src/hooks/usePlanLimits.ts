import { useState, useEffect } from 'react';

export type PlanType = 'starter' | 'pro' | 'studio';

interface PlanLimits {
    maxPhotos: number;
    maxGalleries: number;
    maxPages: number;
    canCustomDomain: boolean;
    canRemoveBranding: boolean;
    storageGB: number;
}

const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
    starter: {
        maxPhotos: Infinity,
        maxGalleries: Infinity,
        maxPages: Infinity,
        canCustomDomain: true,
        canRemoveBranding: true,
        storageGB: 500, // 50Go
    },
    pro: {
        maxPhotos: Infinity,
        maxGalleries: Infinity,
        maxPages: Infinity,
        canCustomDomain: true,
        canRemoveBranding: true,
        storageGB: 50,
    },
    studio: {
        maxPhotos: Infinity,
        maxGalleries: Infinity,
        maxPages: Infinity,
        canCustomDomain: true,
        canRemoveBranding: true,
        storageGB: 500,
    },
};

export function usePlanLimits() {
    const [currentPlan, setCurrentPlan] = useState<PlanType>('starter');

    useEffect(() => {
        // Retrieve plan from localStorage (set during payment/registration)
        const storedPlan = localStorage.getItem('selectedPlan') as PlanType;
        if (storedPlan && ['starter', 'pro', 'studio'].includes(storedPlan)) {
            setCurrentPlan(storedPlan);
        }
    }, []);

    const limits = PLAN_LIMITS[currentPlan];

    /**
     * Check if a feature is allowed based on current usage
     * @param feature - The feature to check
     * @param currentValue - Current usage count
     * @returns true if the limit is reached, false otherwise
     */
    const checkLimit = (
        feature: 'photos' | 'galleries' | 'pages',
        currentValue: number
    ): boolean => {
        switch (feature) {
            case 'photos':
                return currentValue >= limits.maxPhotos;
            case 'galleries':
                return currentValue >= limits.maxGalleries;
            case 'pages':
                return currentValue >= limits.maxPages;
            default:
                return false;
        }
    };

    return {
        currentPlan,
        limits,
        checkLimit,
    };
}
