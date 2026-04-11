import { useState, useEffect } from 'react';
import ResultFilter from '../components/ui/ResultFilter';
import './ResultatsPage.css';

// Aggregated results structure: Année, Examen, Nombre d'admis
const AGGREGATE_RESULTS = [
    { id: 1, year: '2025', examType: 'bts', examName: 'BTS Banque', admis: 145 },
    { id: 2, year: '2025', examType: 'licence', examName: 'Licence Gestion', admis: 98 },
    { id: 3, year: '2025', examType: 'master', examName: 'Master RH', admis: 45 },
    { id: 4, year: '2024', examType: 'bts', examName: 'BTS Finance', admis: 120 },
    { id: 5, year: '2024', examType: 'licence', examName: 'Licence Marketing', admis: 82 },
    { id: 6, year: '2024', examType: 'master', examName: 'Master Management', admis: 55 },
    { id: 7, year: '2023', examType: 'bts', examName: 'BTS Assurance', admis: 105 },
    { id: 8, year: '2023', examType: 'licence', examName: 'Licence Comptabilité', admis: 75 },
];

export default function ResultatsPage() {
    const [filtered, setFiltered] = useState(AGGREGATE_RESULTS);
    const [filterInfo, setFilterInfo] = useState({ year: 'Toutes les années', examType: 'Tous les examens' });

    useEffect(() => {
        window.scrollTo(0, 0);

        const observer = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleFilter = ({ year, examType }) => {
        const typeMap = { 'bts': 'BTS', 'licence': 'Licence', 'master': 'Master' };

        setFilterInfo({
            year: year || 'Toutes les années',
            examType: examType ? typeMap[examType] : 'Tous les examens'
        });

        const results = AGGREGATE_RESULTS.filter(item => {
            const matchYear = year ? item.year === year : true;
            const matchType = examType ? item.examType === examType : true;
            return matchYear && matchType;
        });

        setFiltered(results);
    };

    return (
        <main>
            <section className="page-hero">
                <div className="container page-hero__content">
                    <h1>Résultats<br /><span>des Examens</span></h1>
                    <p>[DESCRIPTION_RESULTATS] – Consultez les résultats officiels par session et par examen.</p>
                </div>
            </section>

            <section className="section bg-cream">
                <div className="container">

                    <div className="res-filter-wrapper reveal">
                        <ResultFilter onFilter={handleFilter} />
                    </div>

                    <div className="res-dashboard">
                        <div className="res-header reveal">
                            <h2 className="res-header__title">
                                Résultats – <span className="text-orange">{filterInfo.examType}</span> / <span className="text-blue">{filterInfo.year}</span>
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
                                        <span className="event-item__title">{stat.admis} étudiants admis</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="res-empty reveal">
                                <span className="res-empty__icon">📊</span>
                                <p>Aucun résultat ne correspond à ces critères.</p>
                                <button className="btn btn-primary mt-sm" onClick={() => handleFilter({ year: '', examType: '' })}>Réinitialiser les filtres</button>
                            </div>
                        )}
                    </div>

                </div>
            </section>
        </main>
    );
}
