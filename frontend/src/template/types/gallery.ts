export interface GalleryImage {
    id: string;
    filename: string;
    url: string;
    isLiked: boolean;
}

export interface Gallery {
    uuid: string;
    title: string;
    description: string;
    createdAt: string;
    images: GalleryImage[];
    zipFileUrl: string;
    zipFileSize: string;
    pin?: string;
}

export interface CreateGalleryData {
    title: string;
    description: string;
    images: Omit<GalleryImage, 'isLiked'>[]; // Keep for compatibility or remove if unused
    files?: File[]; // Actual image files
    zipFileUrl: string;
    zipFileSize: string;
    zipFileBlob?: File; // Actual zip file
    pin?: string;
}
