import { useState, useEffect, useMemo } from 'react';
import { useConfig } from '@/context/ConfigContext';
import TrainingCard from '../components/ui/TrainingCard';
import './FormationsPage.css';

export default function FormationsPage() {
    const { config } = useConfig();
    const formations = config.formations || [];

    const [activeDomain, setActiveDomain] = useState('Tous');
    const [activeDuration, setActiveDuration] = useState('Toutes');

    // Extract unique domains and durations from formations
    const domains = useMemo(() => {
        const unique = new Set(formations.map(f => f.domain).filter(Boolean));
        return ['Tous', ...Array.from(unique)];
    }, [formations]);

    const durations = useMemo(() => {
        const unique = new Set(formations.map(f => f.duration).filter(Boolean));
        return ['Toutes', ...Array.from(unique)];
    }, [formations]);

    const filtered = formations.filter(f =>
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
                    <h1>Nos <br /><span>Formations</span></h1>
                    <p>Découvrez l&apos;ensemble de nos programmes certifiants et qualifiants.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {/* Filters */}
                    {formations.length > 0 && (
                        <div className="formations-filters">
                            <div className="filter-group">
                                <label className="filter-group__label">Domaine</label>
                                <div className="filter-pills">
                                    {domains.map(d => (
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
                                    {durations.map(d => (
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
                    )}

                    {/* Results count */}
                    <p className="formations-count">{filtered.length} formation(s) trouvée(s)</p>

                    {/* Grid */}
                    {filtered.length ? (
                        <div className="training-grid">
                            {filtered.map(f => <TrainingCard key={f.id} {...f} />)}
                        </div>
                    ) : (
                        <div className="formations-empty">
                            <p>Aucune formation ne correspond à vos critères. Essayez d&apos;autres filtres ou revenez plus tard.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
