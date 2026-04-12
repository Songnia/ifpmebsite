import { useState, useEffect } from 'react';
import { useConfig } from '@/context/ConfigContext';
import MediaPlaceholder from '../components/ui/MediaPlaceholder';
import './GaleriePage.css';

export default function GaleriePage() {
    const { config } = useConfig();
    const [activeCategory, setActiveCategory] = useState('Tous');

    // Extract real gallery items
    const galleryItems = config.gallery || [];

    // Extract unique categories from dynamic gallery
    const dynamicCategories = ['Tous', ...new Set(galleryItems.map(item => item.category).filter(Boolean))];

    const filtered = activeCategory === 'Tous'
        ? galleryItems
        : galleryItems.filter(g => g.category === activeCategory);

    useEffect(() => {
        window.scrollTo(0, 0);
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [filtered.length]); // Re-observe when items change

    return (
        <main>
            <section className="page-hero">
                <div className="container page-hero__content">
                    <h1>Notre<br /><span>Galerie</span></h1>
                    <p>La vie étudiante et les moments forts de l&apos;IFPMEB en images et vidéos.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {/* Category Filter */}
                    <div className="galerie-filters">
                        {dynamicCategories.length > 1 ? (
                            dynamicCategories.map(c => (
                                <button
                                    key={c}
                                    className={`filter-pill ${activeCategory === c ? 'filter-pill--active' : ''}`}
                                    onClick={() => setActiveCategory(c)}
                                >
                                    {c.charAt(0).toUpperCase() + c.slice(1)}
                                </button>
                            ))
                        ) : (
                            <div className="text-center py-4 opacity-50">
                                Aucun filtre disponible (ajoutez des images avec différentes catégories)
                            </div>
                        )}
                    </div>

                    {/* Gallery Grid */}
                    <div className="galerie-grid">
                        {galleryItems.length > 0 ? (
                            filtered.map((item, index) => (
                                <div key={item.id || index} className="galerie-item reveal">
                                    <div className="galerie-item__wrapper relative aspect-[4/3] rounded-lg overflow-hidden group">
                                        <img
                                            src={item.url}
                                            alt={item.category}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="galerie-item__overlay absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                                            <div className="text-center">
                                                <span className="text-white text-xs font-bold uppercase tracking-wider block mb-1">
                                                    {item.category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            // Fallback mock items if gallery is empty
                            [1, 2, 3, 4, 5, 6].map(n => (
                                <div key={n} className="galerie-item reveal">
                                    <MediaPlaceholder
                                        id={`fallback-${n}`}
                                        type="image"
                                        aspectRatio="4/3"
                                        label={`Photo Campus ${n}`}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
