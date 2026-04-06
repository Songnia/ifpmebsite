import { useState, useEffect } from 'react';
import TrainingCard from '../components/ui/TrainingCard';
import './FormationsPage.css';

const DOMAINS = ['Tous', '[DOMAINE_1]', '[DOMAINE_2]', '[DOMAINE_3]', '[DOMAINE_4]'];
const DURATIONS = ['Toutes', '[DURÉE_COURTE]', '[DURÉE_MOYENNE]', '[DURÉE_LONGUE]'];

const ALL_FORMATIONS = [
    { id: 'f1', title: '[NOM_FORMATION_1]', description: '[Description complète de la formation 1]', duration: '[DURÉE_1]', level: '[NIVEAU_1]', domain: '[DOMAINE_1]', price: '[TARIF_1]' },
    { id: 'f2', title: '[NOM_FORMATION_2]', description: '[Description complète de la formation 2]', duration: '[DURÉE_2]', level: '[NIVEAU_2]', domain: '[DOMAINE_1]', price: '[TARIF_2]' },
    { id: 'f3', title: '[NOM_FORMATION_3]', description: '[Description complète de la formation 3]', duration: '[DURÉE_1]', level: '[NIVEAU_2]', domain: '[DOMAINE_2]', price: '[TARIF_3]' },
    { id: 'f4', title: '[NOM_FORMATION_4]', description: '[Description complète de la formation 4]', duration: '[DURÉE_3]', level: '[NIVEAU_3]', domain: '[DOMAINE_3]', price: '[TARIF_4]' },
    { id: 'f5', title: '[NOM_FORMATION_5]', description: '[Description complète de la formation 5]', duration: '[DURÉE_2]', level: '[NIVEAU_1]', domain: '[DOMAINE_2]', price: '[TARIF_5]' },
    { id: 'f6', title: '[NOM_FORMATION_6]', description: '[Description complète de la formation 6]', duration: '[DURÉE_1]', level: '[NIVEAU_3]', domain: '[DOMAINE_4]', price: '[TARIF_6]' },
];

export default function FormationsPage() {
    const [activeDomain, setActiveDomain] = useState('Tous');
    const [activeDuration, setActiveDuration] = useState('Toutes');

    const filtered = ALL_FORMATIONS.filter(f =>
        (activeDomain === 'Tous' || f.domain === activeDomain) &&
        (activeDuration === 'Toutes' || f.duration === activeDuration)
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [filtered]);

    return (
        <main>
            <section className="page-hero">
                <div className="container page-hero__content">
                    <h1>[TITRE_PAGE_FORMATIONS]<br /><span>Nos Formations</span></h1>
                    <p>[DESCRIPTION_PAGE_FORMATIONS] – Découvrez l&apos;ensemble de nos programmes certifiants et qualifiants.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {/* Filters */}
                    <div className="formations-filters">
                        <div className="filter-group">
                            <label className="filter-group__label">Domaine</label>
                            <div className="filter-pills">
                                {DOMAINS.map(d => (
                                    <button
                                        key={d}
                                        className={`filter-pill ${activeDomain === d ? 'filter-pill--active' : ''}`}
                                        onClick={() => setActiveDomain(d)}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="filter-group">
                            <label className="filter-group__label">Durée</label>
                            <div className="filter-pills">
                                {DURATIONS.map(d => (
                                    <button
                                        key={d}
                                        className={`filter-pill ${activeDuration === d ? 'filter-pill--active' : ''}`}
                                        onClick={() => setActiveDuration(d)}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Results count */}
                    <p className="formations-count">{filtered.length} formation(s) trouvée(s)</p>

                    {/* Grid */}
                    {filtered.length ? (
                        <div className="training-grid">
                            {filtered.map(f => <TrainingCard key={f.id} {...f} />)}
                        </div>
                    ) : (
                        <div className="formations-empty">
                            <p>Aucune formation ne correspond à vos critères. Essayez d&apos;autres filtres.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
