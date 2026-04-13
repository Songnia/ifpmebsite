import { useState, useEffect } from 'react';
import ResultFilter from '../components/ui/ResultFilter';
import { useConfig } from '../context/ConfigContext';
import './ResultatsPage.css';

// Infer an exam type category from the program string
function inferExamType(program = '') {
    const p = program.toLowerCase();
    if (p.includes('master') || p.includes('m2') || p.includes('mba')) return 'master';
    if (p.includes('licence') || p.includes('l3') || p.includes('bachelor')) return 'licence';
    return 'bts'; // default
}

export default function ResultatsPage() {
    const { config } = useConfig();
    const rawResults = (config.examResults || []).map((r, i) => ({
        id: r.id || String(i),
        year: r.year,
        examType: inferExamType(r.program),
        examName: r.program,
        result_text: r.result_text,
    }));

    const [filtered, setFiltered] = useState(rawResults);
    const [filterInfo, setFilterInfo] = useState({ year: 'Toutes les années', examType: 'Tous les examens' });

    // Re-sync filtered list when config changes
    useEffect(() => {
        setFiltered(rawResults);
    }, [config.examResults]);

    useEffect(() => {
        window.scrollTo(0, 0);

        const observer = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // Extract unique years and programs for dynamic filters
    const availableYears = [...new Set(rawResults.map(r => r.year))].sort((a, b) => b.localeCompare(a));
    const availablePrograms = [...new Set(rawResults.map(r => r.examName))].sort();

    const handleFilter = ({ year, program }) => {
        setFilterInfo({
            year: year || 'Toutes les années',
            program: program || 'Toutes les filières'
        });

        const results = rawResults.filter(item => {
            const matchYear = year ? item.year === year : true;
            const matchProgram = program ? item.examName === program : true;
            return matchYear && matchProgram;
        });

        setFiltered(results);
    };

    return (
        <main>
            <section className="page-hero">
                <div className="container page-hero__content">
                    <h1>Résultats<br /><span>des Examens</span></h1>
                    <p>Consultez les résultats officiels par session et par filière.</p>
                </div>
            </section>

            <section className="section bg-cream">
                <div className="container">

                    <div className="res-filter-wrapper reveal">
                        <ResultFilter 
                            onFilter={handleFilter} 
                            years={availableYears} 
                            programs={availablePrograms} 
                        />
                    </div>

                    <div className="res-dashboard">
                        <div className="res-header reveal">
                            <h2 className="res-header__title">
                                Résultats – <span className="text-orange">{filterInfo.program}</span> / <span className="text-blue">{filterInfo.year}</span>
                            </h2>
                            {filtered.length > 0 && (
                                <button className="btn btn-outline-blue btn-download" onClick={(e) => e.preventDefault()}>
                                    ⬇ Télécharger PDF
                                </button>
                            )}
                        </div>

                        {filtered.length > 0 ? (
                            <ul className="events-preview resultats-list">
                                {filtered.map((stat, i) => (
                                    <li key={stat.id} className="event-item reveal" style={{ transitionDelay: `${(i % 5) * 0.05}s` }}>
                                        <span className="event-item__date">{stat.year}</span>
                                        <span className="event-item__type">{stat.examName}</span>
                                        <span className="event-item__title">{stat.result_text}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="res-empty reveal">
                                <span className="res-empty__icon">📊</span>
                                {rawResults.length === 0 ? (
                                    <p>Aucun résultat enregistré. Ajoutez des données dans le panneau d&apos;administration.</p>
                                ) : (
                                    <>
                                        <p>Aucun résultat ne correspond à ces critères.</p>
                                        <button className="btn btn-primary mt-sm" onClick={() => handleFilter({ year: '', examType: '' })}>Réinitialiser les filtres</button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </section>
        </main>
    );
}



