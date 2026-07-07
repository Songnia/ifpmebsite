/**
 * Convertit un fichier image en WebP et retourne un data URL base64.
 * Réduit significativement la taille des images pour un chargement plus rapide.
 *
 * @param file - Le fichier image à convertir
 * @param quality - Qualité WebP de 0 à 1 (défaut: 0.82 = bon équilibre qualité/poids)
 * @param maxWidth - Largeur maximale en pixels (défaut: 1920)
 * @param maxHeight - Hauteur maximale en pixels (défaut: 1080)
 * @returns Promise<string> - Le data URL base64 en format WebP
 */
export const convertToWebP = (
    file: File,
    quality: number = 0.82,
    maxWidth: number = 1920,
    maxHeight: number = 1080
): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                // Calcule les nouvelles dimensions en respectant le ratio
                let { width, height } = img;
                if (width > maxWidth || height > maxHeight) {
                    const ratio = Math.min(maxWidth / width, maxHeight / height);
                    width = Math.round(width * ratio);
                    height = Math.round(height * ratio);
                }

                // Dessine l'image sur un canvas et exporte en WebP
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Canvas context non disponible'));
                    return;
                }
                ctx.drawImage(img, 0, 0, width, height);

                // Si le navigateur ne supporte pas WebP, on retombe sur JPEG
                const webpData = canvas.toDataURL('image/webp', quality);
                const isWebPSupported = webpData.startsWith('data:image/webp');
                const finalData = isWebPSupported
                    ? webpData
                    : canvas.toDataURL('image/jpeg', quality);

                resolve(finalData);
            };
            img.onerror = () => reject(new Error('Impossible de charger l\'image'));
            img.src = event.target?.result as string;
        };

        reader.onerror = () => reject(new Error('Impossible de lire le fichier'));
        reader.readAsDataURL(file);
    });
};

/**
 * Version allégée pour les logos et icônes (dimensions plus petites)
 */
export const convertLogoToWebP = (file: File): Promise<string> =>
    convertToWebP(file, 0.9, 400, 400);

/**
 * Version pour les images de galerie (qualité optimisée pour le web)
 */
export const convertGalleryToWebP = (file: File): Promise<string> =>
    convertToWebP(file, 0.8, 1200, 900);
