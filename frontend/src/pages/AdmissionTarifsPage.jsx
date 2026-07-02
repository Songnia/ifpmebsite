import { useState, useEffect, useMemo } from 'react';
import { useConfig } from '@/context/ConfigContext';
import './AdmissionTarifsPage.css';

export default function AdmissionTarifsPage() {
    const { config } = useConfig();
    const formations = config.formations || [];

    const [activeLevel, setActiveLevel] = useState('Tous');
    const [activeDuration, setActiveDuration] = useState('Toutes');

    const levels = useMemo(() => {
        const unique = new Set(formations.map(f => f.level).filter(Boolean));
        return ['Tous', ...Array.from(unique)];
    }, [formations]);

    const durations = useMemo(() => {
        const unique = new Set(formations.map(f => f.duration).filter(Boolean));
        return ['Toutes', ...Array.from(unique)];
    }, [formations]);

    const filteredFormations = useMemo(() => {
        return formations.filter(f =>
            (activeLevel === 'Tous' || f.level === activeLevel) &&
            (activeDuration === 'Toutes' || f.duration === activeDuration)
        );
    }, [formations, activeLevel, activeDuration]);

    useEffect(() => {
        window.scrollTo(0, 0);

        const observer = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [formations]);

    return (
        <main>
            <section className="page-hero">
                <div className="container page-hero__content">
                    <h1>Admission<br /><span>&amp; Tarifs</span></h1>
                    <p>Conditions d&apos;accès, procédure d&apos;inscription et grille tarifaire de nos formations certifiantes.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {/*<div className="admission-grid">*/}

                        {/* Conditions d'admission */}
                        {/*<div className="admission-block reveal">
                            <h2 className="admission-block__title">Conditions d&apos;admission</h2>
                            <div className="divider-gold" style={{ margin: '1rem 0 1.5rem' }} />
                            <ul className="admission-list">
                                <li>🎓 Titulaire du BAC ou équivalent (selon la formation)</li>
                                <li>📋 Étude de dossier scolaire</li>
                                <li>📄 Fournir CV, lettre de motivation et pièces d'identité</li>
                                <li>📅 Date limite de dépôt : <strong>Se référer au calendrier académique</strong></li>
                            </ul>
                        </div>*/}

                        {/* Procédure */}
                        {/* <div className="admission-block reveal" style={{ transitionDelay: '0.1s' }}>
                            <h2 className="admission-block__title">Procédure d&apos;inscription</h2>
                            <div className="divider-gold" style={{ margin: '1rem 0 1.5rem' }} />
                            <ol className="admission-steps">
                                <li><span>1</span> Remplir le formulaire en ligne ou au campus</li>
                                <li><span>2</span> Dépôt du dossier complet</li>
                                <li><span>3</span> Entretien et/ou Test d'aptitude</li>
                                <li><span>4</span> Confirmation et paiement des frais</li>
                            </ol>
                        </div>*/}

                        {/* Informations de Test */}
                        {/*<div className="admission-block reveal" style={{ transitionDelay: '0.2s' }}>
                            <h2 className="admission-block__title">Tests d&apos;admission</h2>
                            <div className="divider-gold" style={{ margin: '1rem 0 1.5rem' }} />
                            <p style={{ color: 'var(--color-gray-dark)', marginBottom: '1rem', lineHeight: '1.6' }}>
                                L'admission est soumise à la réussite d'un test écrit et oral pour évaluer vos acquis.
                            </p>
                            <ul className="admission-list">
                                <li>📝 <strong>Écrit :</strong> Culture générale et logique</li>
                                <li>🗣️ <strong>Oral :</strong> Entretien de motivation</li>
                                <li>📅 <strong>Sessions :</strong> Tous les mois (voir Événements)</li>
                                <li>📍 <strong>Lieu :</strong> Campus IFPMEB</li>
                            </ul>
                        </div>*/}
                    {/*</div>*/}

                    {/* Tarifs Filters */}
                    {formations.length > 0 && (
                        <div className="formations-filters" style={{ marginBottom: '2rem' }}>
                            <div className="filter-group">
                                <label className="filter-group__label">Examen / Niveau</label>
                                <div className="filter-pills">
                                    {levels.map(l => (
                                        <button
                                            key={l}
                                            className={`filter-pill ${activeLevel === l ? 'filter-pill--active' : ''}`}
                                            onClick={() => setActiveLevel(l)}
                                        >
                                            {l}
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

                    {/* Tarifs Table */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h2 className="section-title" style={{ margin: 0 }}>Grille des tarifs</h2>
                        <span className="formations-count">{filteredFormations.length} résultat(s)</span>
                    </div>
                    <div className="divider-gold" style={{ marginBottom: '2rem' }} />
                    
                    {config.registrationFee && (
                        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-6 rounded-r-md">
                            <h3 className="font-bold text-orange-800 text-lg mb-1">Frais de dossier & d'inscription</h3>
                            <p className="text-orange-700">Des frais uniques de <strong>{config.registrationFee}</strong> sont exigés pour la validation de tout dossier d'inscription, quelle que soit la formation choisie.</p>
                        </div>
                    )}

                    <div className="tarifs-table-wrapper">
                        <table className="results-table tarifs-table">
                            <thead>
                                <tr>
                                    <th>Formation</th>
                                    <th>Niveau</th>
                                    <th>Durée</th>
                                    <th>Tarif</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredFormations.length > 0 ? (
                                    filteredFormations.map((t, i) => (
                                        <tr key={t.id || i} className={i % 2 === 0 ? 'results-table__row--even' : ''}>
                                            <td>
                                                <strong>{t.title}</strong>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--color-primary-orange)', marginTop: '4px', fontWeight: '600' }}>
                                                    Jour & Soir
                                                </div>
                                            </td>
                                            <td>{t.level}</td>
                                            <td>{t.duration}</td>
                                            <td className="tarifs-table__price">
                                                {t.price}
                                                {t.installments && t.installments.length > 0 && (
                                                    <div className="mt-2 text-xs text-left" style={{ color: 'var(--color-primary-blue)', fontWeight: 'normal' }}>
                                                        <strong className="block mb-1">Tranches :</strong>
                                                        <ul className="list-disc pl-4 space-y-0.5">
                                                            {t.installments.map((inst, idx) => (
                                                                <li key={idx}>
                                                                    <span className="font-semibold">{inst.name}</span> : {inst.amount}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-6">Aucune formation ne correspond à vos critères.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <p className="tarifs-note">Note : Les tarifs indiqués sont à la charge de l'étudiant à l'exception des parcours subventionnés ou en alternance. Contactez-nous pour les modalités de paiement échelonné.</p>
                </div>
            </section>
        </main>
    );
}
