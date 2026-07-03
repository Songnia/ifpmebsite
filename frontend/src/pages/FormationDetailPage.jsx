import { useParams, Link, Navigate } from 'react-router-dom';
import { useConfig } from '../context/ConfigContext';
import './FormationDetailPage.css';

export default function FormationDetailPage() {
    const { id } = useParams();
    const { config } = useConfig();

    const formation = config.formations?.find(f => f.id === id);

    if (!formation) {
        return <Navigate to="/formations" replace />;
    }

    return (
        <main className="formation-detail">
            <section className="page-hero">
                <div className="container page-hero__content">
                    <div className="formation-detail__eyebrow">{formation.domain}</div>
                    <h1>{formation.title}</h1>
                    <p>Formation certifiante • {formation.duration} • {formation.level} • Jour et Soir</p>
                </div>
            </section>

            <section className="section">
                <div className="container formation-detail__layout">

                    {/* Main content */}
                    <div className="formation-detail__main">
                        {formation.image && (
                            <div className="formation-detail__image rounded-xl overflow-hidden mb-8 border">
                                <img src={formation.image} alt={formation.title} className="w-full aspect-video object-cover" />
                            </div>
                        )}

                        <div className="formation-detail__block">
                            <h2>Présentation de la formation</h2>
                            <div className="divider-gold" style={{ margin: '1rem 0 1.5rem' }} />
                            <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{formation.description}</p>
                        </div>

                        {formation.objectives && (
                            <div className="formation-detail__block">
                                <h2>Objectifs pédagogiques</h2>
                                <div className="divider-gold" style={{ margin: '1rem 0 1.5rem' }} />
                                <div className="whitespace-pre-wrap text-gray-700 leading-relaxed italic">
                                    {formation.objectives}
                                </div>
                            </div>
                        )}

                        {formation.career_prospects && (
                            <div className="formation-detail__block">
                                <h2>{"Débouchés professionnels"}</h2>
                                <div className="divider-gold" style={{ margin: '1rem 0 1.5rem' }} />
                                <div className="career-prospects">
                                    {formation.career_prospects.split('\n').map((line, i) => {
                                        const trimmed = line.trim();
                                        if (!trimmed) return null;
                                        const isNumbered = /^\d+\./.test(trimmed);
                                        const isArrow = /^[→]|^->/.test(trimmed);
                                        if (isNumbered) {
                                            return (
                                                <div key={i} className="career-item career-item--numbered">
                                                    <span className="career-item__num">{trimmed.match(/^\d+/)[0]}</span>
                                                    <span className="career-item__text">{trimmed.replace(/^\d+\.?\s*/, '')}</span>
                                                </div>
                                            );
                                        }
                                        if (isArrow) {
                                            return (
                                                <div key={i} className="career-item career-item--arrow">
                                                    <span className="career-item__arrow">{"→"}</span>
                                                    <span className="career-item__text">{trimmed.replace(/^[→]|^->/, '').trim()}</span>
                                                </div>
                                            );
                                        }
                                        return <p key={i} className="career-intro">{trimmed}</p>;
                                    })}
                                </div>
                            </div>
                        )}

                        {formation.admission_requirements && (
                            <div className="formation-detail__block">
                                <h2>Conditions d&apos;admission</h2>
                                <div className="divider-gold" style={{ margin: '1rem 0 1.5rem' }} />
                                <div className="formation-detail__admission">
                                    <div className="admission-icon">📋</div>
                                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                        {formation.admission_requirements}
                                    </div>
                                </div>
                            </div>
                        )}

                        {formation.features && formation.features.length > 0 && (
                            <div className="formation-detail__block">
                                <h2>Les + de la formation</h2>
                                <div className="divider-gold" style={{ margin: '1rem 0 1.5rem' }} />
                                <ul className="formation-detail__list">
                                    {formation.features.map((feat, i) => (
                                        <li key={i}> {feat}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="formation-detail__sidebar">
                        <div className="formation-detail__card sticky-card">
                            <h3>En résumé</h3>
                            <ul className="formation-detail__summary">
                                <li><strong>Format :</strong> ☀️ Jour et 🌙 Soir</li>
                                <li><strong>Durée :</strong> {formation.duration}</li>
                                <li><strong>Niveau :</strong> {formation.level}</li>
                                <li><strong>Filière :</strong> {formation.domain}</li>
                                <li><strong>Scolarité :</strong> <span className="text-bold" style={{ color: 'var(--color-primary-blue)' }}>{formation.price}</span></li>
                                {formation.installments && formation.installments.length > 0 && (
                                    <li className="mt-4 border-t pt-4">
                                        <strong>Tranches de paiement :</strong>
                                        <ul className="mt-2 space-y-2 text-sm">
                                            {formation.installments.map((inst, idx) => (
                                                <li key={idx} className="flex justify-between border-b pb-1 last:border-0">
                                                    <span className="text-gray-600">{inst.name}</span>
                                                    <span className="font-semibold">{inst.amount}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                )}
                            </ul>

                            <div className="formation-detail__actions">
                                <Link to="/inscription" className="btn btn-primary w-full text-center">S&apos;inscrire à cette formation</Link>
                                <a href="https://wa.me/+22800000000" target="_blank" rel="noreferrer" className="btn btn-outline w-full text-center">ECRIRE NOUS SUR WHATSAPP</a>
                            </div>
                        </div>
                    </aside>

                </div>
            </section>
        </main>
    );
}
