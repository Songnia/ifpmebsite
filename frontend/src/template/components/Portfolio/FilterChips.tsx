import React from 'react';
import { Box, Chip, styled } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useTranslation } from 'react-i18next';

const FilterChips: React.FC<FilterChipsProps> = ({ selectedCategory, onSelectCategory }) => {
    const { t } = useTranslation();

    const categories = [
        { key: 'All Work', label: t('portfolio.categories.all') },
        { key: 'Mariages', label: t('portfolio.categories.weddings') },
        { key: 'Grossesse', label: t('portfolio.categories.maternity') },
        { key: 'Bébés & Enfants', label: t('portfolio.categories.babies') },
        { key: 'Corporate', label: t('portfolio.categories.corporate') },
        { key: 'Events', label: t('portfolio.categories.events') },
        { key: 'Studio', label: t('portfolio.categories.studio') },
    ];

    return (
        <Box
            sx={{
                overflowX: 'auto',
                pb: 2,
                display: 'flex',
                gap: { xs: 1, sm: 1.5 },
                px: 0,
                '&::-webkit-scrollbar': {
                    height: '6px',
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    borderRadius: '3px',
                },
            }}
        >
            {categories.map((cat) => (
                <StyledChip
                    key={cat.key}
                    label={cat.label}
                    variant={selectedCategory === cat.key ? 'filled' : 'outlined'}
                    icon={selectedCategory === cat.key ? <CheckIcon style={{ color: 'white' }} /> : undefined}
                    onClick={() => onSelectCategory(cat.key)}
                    clickable
                    sx={{ minWidth: 'fit-content' }}
                />
            ))}
        </Box>
    );
};

interface FilterChipsProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const StyledChip = styled(Chip)(({ theme }) => ({
    borderRadius: '8px',
    height: '36px',
    fontWeight: 500,
    '&.MuiChip-filled': {
        backgroundColor: theme.palette.text.primary,
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.text.primary,
        },
    },
    '&.MuiChip-outlined': {
        borderColor: theme.palette.divider,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
            borderColor: theme.palette.text.primary,
        },
    },
}));

export default FilterChips;
