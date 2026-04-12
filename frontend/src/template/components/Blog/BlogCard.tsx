import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import ImageIcon from '@mui/icons-material/Image';
import { useTranslation } from 'react-i18next';

interface BlogArticle {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    category: string;
    image?: string;
}

const BlogCard: React.FC<{ article: BlogArticle }> = ({ article }) => {
    const { t } = useTranslation();

    const getCategoryLabel = (cat: string) => {
        switch (cat) {
            case 'News': return t('blog.categories.news');
            case 'Tutorials': return t('blog.categories.tutorials');
            case 'Promos': return t('blog.categories.promos');
            case 'Behind the Scenes': return t('blog.categories.behindTheScenes');
            default: return cat;
        }
    };

    return (
        <Paper
            elevation={0}
            sx={{
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': {
                    borderColor: 'text.primary',
                    transform: 'translateY(-4px)',
                    boxShadow: 2,
                },
            }}
        >
            {/* Image */}
            <Box
                sx={{
                    width: '100%',
                    height: 200,
                    backgroundColor: 'grey.100',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {article.image ? (
                    <img src={article.image} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <ImageIcon sx={{ fontSize: 48, color: 'text.secondary', opacity: 0.3 }} />
                )}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        backgroundColor: 'primary.main',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                    }}
                >
                    <Typography variant="caption" sx={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                        {getCategoryLabel(article.category)}
                    </Typography>
                </Box>
            </Box>

            {/* Content */}
            <Box sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, lineHeight: 1.3 }}>
                    {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {article.excerpt}
                </Typography>

                {/* Meta */}
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                            {article.date}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <PersonIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">
                            {article.author}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};

export default BlogCard;
