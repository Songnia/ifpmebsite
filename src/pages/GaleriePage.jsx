import { useState, useEffect } from 'react';
import MediaPlaceholder from '../components/ui/MediaPlaceholder';
import './GaleriePage.css';

const GALLERY_ITEMS = [
    { id: 'g1', type: 'image', label: '[PHOTO_CAMPUS] – Vue générale du campus IFPMEB', category: 'campus' },
    { id: 'g2', type: 'image', label: '[PHOTO_COURS] – Salle de cours et étudiants', category: 'cours' },
    { id: 'g3', type: 'video', label: '[VIDEO_REMISE] – Vidéo cérémonie de remise de diplômes', category: 'evenements' },
    { id: 'g4', type: 'image', label: '[PHOTO_ATELIER] – Atelier pratique en laboratoire', category: 'cours' },
    { id: 'g5', type: 'image', label: '[PHOTO_PORTES_OUVERTES] – Journée portes ouvertes', category: 'evenements' },
    { id: 'g6', type: 'image', label: '[PHOTO_ETUDIANTS] – Étudiants dans les espaces communs', category: 'campus' },
    { id: 'g7', type: 'video', label: '[VIDEO_PRESENTATION] – Présentation de l\'IFPMEB', category: 'campus' },
    { id: 'g8', type: 'image', label: '[PHOTO_DIPLOME] – Cérémonie de remise des diplômes', category: 'evenements' },
];

const CATEGORIES = ['Tous', 'campus', 'cours', 'evenements'];

export default function GaleriePage() {
    const [activeCategory, setActiveCategory] = useState('Tous');
    const filtered = activeCategory === 'Tous' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.category === activeCategory);

    useEffect(() => {
        window.scrollTo(0, 0);
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [filtered]); // Re-observe when items change due to filter

    return (
        <main>
            <section className="page-hero">
                <div className="container page-hero__content">
                    <h1>Notre<br /><span>Galerie</span></h1>
                    <p>[DESCRIPTION_GALERIE] – La vie étudiante et les moments forts de l&apos;IFPMEB en images et vidéos.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {/* Category Filter */}
                    <div className="galerie-filters">
                        {CATEGORIES.map(c => (
                            <button
                                key={c}
                                className={`filter-pill ${activeCategory === c ? 'filter-pill--active' : ''}`}
                                onClick={() => setActiveCategory(c)}
                            >
                                {c.charAt(0).toUpperCase() + c.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* Gallery Grid */}
                    <div className="galerie-grid">
                        {filtered.map(item => (
                            <div key={item.id} className="galerie-item reveal">
                                <MediaPlaceholder
                                    id={item.id}
                                    type={item.type}
                                    aspectRatio="4/3"
                                    label={item.label}
                                />
                                <div className="galerie-item__overlay">
                                    <span className="galerie-item__icon">{item.type === 'video' ? '▶' : '🔍'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
