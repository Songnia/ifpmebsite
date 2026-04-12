import React, { useCallback } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { CloudUpload as UploadIcon } from '@mui/icons-material';

interface DualUploadZoneProps {
    title: string;
    subtitle: string;
    acceptedTypes: string;
    multiple?: boolean;
    onFilesSelected: (files: File[]) => void;
    uploading?: boolean;
    uploadProgress?: number;
}

const DualUploadZone: React.FC<DualUploadZoneProps> = ({
    title,
    subtitle,
    acceptedTypes,
    multiple = false,
    onFilesSelected,
    uploading = false,
    uploadProgress = 0,
}) => {
    const [isDragging, setIsDragging] = React.useState(false);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault();
            setIsDragging(false);

            const files = Array.from(e.dataTransfer.files);
            if (files.length > 0) {
                onFilesSelected(files);
            }
        },
        [onFilesSelected]
    );

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            onFilesSelected(files);
        }
    };

    return (
        <Box>
            <input
                type="file"
                id={`upload-${title.replace(/\s/g, '-')}`}
                accept={acceptedTypes}
                multiple={multiple}
                style={{ display: 'none' }}
                onChange={handleFileInput}
            />

            <label htmlFor={`upload-${title.replace(/\s/g, '-')}`}>
                <Box
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    sx={{
                        border: '2px dashed',
                        borderColor: isDragging ? 'primary.main' : 'divider',
                        borderRadius: '4px',
                        p: 4,
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        backgroundColor: isDragging ? 'action.hover' : 'transparent',
                        '&:hover': {
                            borderColor: 'primary.main',
                            backgroundColor: 'action.hover',
                        },
                    }}
                >
                    <UploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />

                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        {subtitle}
                    </Typography>

                    {uploading && (
                        <Box sx={{ mt: 2 }}>
                            <LinearProgress variant="determinate" value={uploadProgress} />
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                                Upload en cours... {uploadProgress}%
                            </Typography>
                        </Box>
                    )}
                </Box>
            </label>
        </Box>
    );
};

export default DualUploadZone;
