import { useEffect } from 'react';
import './AdmissionTarifsPage.css';

const TARIFS = [
    { formation: '[NOM_FORMATION_1]', duree: '[DURÉE_1]', tarif: '[TARIF_1]', modalites: '[MODALITÉ_PAIEMENT_1]' },
    { formation: '[NOM_FORMATION_2]', duree: '[DURÉE_2]', tarif: '[TARIF_2]', modalites: '[MODALITÉ_PAIEMENT_2]' },
    { formation: '[NOM_FORMATION_3]', duree: '[DURÉE_3]', tarif: '[TARIF_3]', modalites: '[MODALITÉ_PAIEMENT_3]' },
    { formation: '[NOM_FORMATION_4]', duree: '[DURÉE_4]', tarif: '[TARIF_4]', modalites: '[MODALITÉ_PAIEMENT_4]' },
];

export default function AdmissionTarifsPage() {
    useEffect(() => {
        window.scrollTo(0, 0);

        const observer = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <main>
            <section className="page-hero">
                <div className="container page-hero__content">
                    <h1>Admission<br /><span>&amp; Tarifs</span></h1>
                    <p>[DESCRIPTION_ADMISSION] – Conditions d&apos;accès, procédure d&apos;inscription et grille tarifaire de nos formations.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="admission-grid">

                        {/* Conditions d'admission */}
                        <div className="admission-block reveal">
                            <h2 className="admission-block__title">Conditions d&apos;admission</h2>
                            <div className="divider-gold" style={{ margin: '1rem 0 1.5rem' }} />
                            <ul className="admission-list">
                                <li>🎓 [DIPLOME_REQUIS_1]</li>
                                <li>📋 [CONDITION_1]</li>
                                <li>📄 [DOCUMENTS_REQUIS]</li>
                                <li>📅 Date limite de dépôt : <strong>[DATE_LIMITE]</strong></li>
                            </ul>
                        </div>

                        {/* Procédure */}
                        <div className="admission-block reveal" style={{ transitionDelay: '0.1s' }}>
                            <h2 className="admission-block__title">Procédure d&apos;inscription</h2>
                            <div className="divider-gold" style={{ margin: '1rem 0 1.5rem' }} />
                            <ol className="admission-steps">
                                <li><span>1</span> [ÉTAPE_1] – Retrait du dossier</li>
                                <li><span>2</span> [ÉTAPE_2] – Dépôt du dossier</li>
                                <li><span>3</span> [ÉTAPE_3] – Entretien / Test</li>
                                <li><span>4</span> [ÉTAPE_4] – Confirmation paiement</li>
                            </ol>
                        </div>

                        {/* Informations de Test */}
                        <div className="admission-block reveal" style={{ transitionDelay: '0.2s' }}>
                            <h2 className="admission-block__title">Tests d&apos;admission</h2>
                            <div className="divider-gold" style={{ margin: '1rem 0 1.5rem' }} />
                            <p style={{ color: 'var(--color-gray-dark)', marginBottom: '1rem', lineHeight: '1.6' }}>
                                L'admission est soumise à la réussite d'un test écrit et oral pour évaluer vos acquis.
                            </p>
                            <ul className="admission-list">
                                <li>📝 <strong>Écrit :</strong> Culture générale et logique</li>
                                <li>🗣️ <strong>Oral :</strong> Entretien de motivation</li>
                                <li>📅 <strong>Prochaine session :</strong> [DATE_TEST]</li>
                                <li>📍 <strong>Lieu :</strong> Campus IFPMEB</li>
                            </ul>
                        </div>
                    </div>

                    {/* Tarifs Table */}
                    <h2 className="section-title" style={{ marginBottom: '1rem' }}>Grille des tarifs</h2>
                    <div className="divider-gold" />
                    <div className="tarifs-table-wrapper">
                        <table className="results-table tarifs-table">
                            <thead>
                                <tr>
                                    <th>Formation</th>
                                    <th>Durée</th>
                                    <th>Tarif</th>
                                    <th>Modalités de paiement</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TARIFS.map((t, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'results-table__row--even' : ''}>
                                        <td><strong>{t.formation}</strong></td>
                                        <td>{t.duree}</td>
                                        <td className="tarifs-table__price">{t.tarif}</td>
                                        <td>{t.modalites}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="tarifs-note">[NOTE_TARIFS] – Les tarifs sont susceptibles d&apos;évoluer. Contactez-nous pour plus d&apos;informations.</p>
                </div>
            </section>
        </main>
    );
}
