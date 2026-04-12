import { useEffect } from 'react';
import { useConfig } from '@/context/ConfigContext';
import './AdmissionTarifsPage.css';

export default function AdmissionTarifsPage() {
    const { config } = useConfig();
    const formations = config.formations || [];

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

                    {/* Tarifs Table */}
                    <h2 className="section-title" style={{ marginBottom: '1rem' }}>Grille des tarifs</h2>
                    <div className="divider-gold" />
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
                                {formations.length > 0 ? (
                                    formations.map((t, i) => (
                                        <tr key={t.id || i} className={i % 2 === 0 ? 'results-table__row--even' : ''}>
                                            <td><strong>{t.title}</strong></td>
                                            <td>{t.level}</td>
                                            <td>{t.duration}</td>
                                            <td className="tarifs-table__price">{t.price}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center py-6">Aucune formation enregistrée.</td>
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
