import React from 'react';
import { Box, Container, Typography, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import BlogCard from '../components/Blog/BlogCard';

const Blog: React.FC = () => {
    const { t } = useTranslation();

    const categories = [
        { key: 'All', label: t('blog.categories.all') },
        { key: 'News', label: t('blog.categories.news') },
        { key: 'Tutorials', label: t('blog.categories.tutorials') },
        { key: 'Promos', label: t('blog.categories.promos') },
        { key: 'Behind the Scenes', label: t('blog.categories.behindTheScenes') },
    ];

    const mockArticles = [
        {
            id: 1,
            title: t('blog.articles.1.title'),
            excerpt: t('blog.articles.1.excerpt'),
            date: 'Jan 15, 2026',
            author: 'Ultimata Studios',
            category: 'Promos',
        },
        {
            id: 2,
            title: t('blog.articles.2.title'),
            excerpt: t('blog.articles.2.excerpt'),
            date: 'Jan 10, 2026',
            author: 'John Doe',
            category: 'Behind the Scenes',
        },
        {
            id: 3,
            title: t('blog.articles.3.title'),
            excerpt: t('blog.articles.3.excerpt'),
            date: 'Jan 5, 2026',
            author: 'Jane Smith',
            category: 'Tutorials',
        },
        {
            id: 4,
            title: t('blog.articles.4.title'),
            excerpt: t('blog.articles.4.excerpt'),
            date: 'Dec 28, 2025',
            author: 'Tech Team',
            category: 'News',
        },
        {
            id: 5,
            title: t('blog.articles.5.title'),
            excerpt: t('blog.articles.5.excerpt'),
            date: 'Dec 20, 2025',
            author: 'Ultimata Studios',
            category: 'Behind the Scenes',
        },
        {
            id: 6,
            title: t('blog.articles.6.title'),
            excerpt: t('blog.articles.6.excerpt'),
            date: 'Dec 15, 2025',
            author: 'Ultimata Studios',
            category: 'Promos',
        },
    ];

    const [selectedCategory, setSelectedCategory] = React.useState('All');

    const filteredArticles = selectedCategory === 'All'
        ? mockArticles
        : mockArticles.filter(article => article.category === selectedCategory);

    return (
        <Box sx={{ py: { xs: 3, md: 6 } }}>
            <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
                {/* Header */}
                <Box sx={{ mb: { xs: 4, md: 6 }, textAlign: 'center' }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 'bold',
                            mb: 2,
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                        }}
                    >
                        {t('blog.title')}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 'md', mx: 'auto' }}>
                        {t('blog.subtitle')}
                    </Typography>
                </Box>

                {/* Category Filters */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: { xs: 1.5, sm: 2 },
                        mb: { xs: 4, md: 6 },
                        overflowX: 'auto',
                        pb: 1,
                        justifyContent: { xs: 'flex-start', md: 'center' },
                        '&::-webkit-scrollbar': {
                            height: '6px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            borderRadius: '3px',
                        },
                    }}
                >
                    {categories.map((cat) => (
                        <Chip
                            key={cat.key}
                            label={cat.label}
                            onClick={() => setSelectedCategory(cat.key)}
                            variant={selectedCategory === cat.key ? 'filled' : 'outlined'}
                            color={selectedCategory === cat.key ? 'primary' : 'default'}
                            sx={{
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                px: 1,
                                height: '40px',
                                fontSize: '0.9rem',
                                borderWidth: selectedCategory === cat.key ? 0 : 1,
                                '&:hover': {
                                    backgroundColor: selectedCategory === cat.key ? 'primary.dark' : 'rgba(0,0,0,0.04)',
                                },
                            }}
                        />
                    ))}
                </Box>

                {/* Blog Grid */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                        },
                        gap: { xs: 3, md: 4 },
                        pb: { xs: 4, md: 8 },
                    }}
                >
                    {filteredArticles.map((article) => (
                        <BlogCard key={article.id} article={article} />
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default Blog;
