import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useConfig } from '@/context/ConfigContext';
import MediaPlaceholder from '../components/ui/MediaPlaceholder';
import StatBlock from '../components/ui/StatBlock';
import TrainingCard from '../components/ui/TrainingCard';
import TestimonialCard from '../components/ui/TestimonialCard';
import './HomePage.css';

export default function HomePage() {
    const { config } = useConfig();
    const { hero, stats = [], formations = [], events = [], whatsappNumber } = config;

    // Scroll-reveal effect — re-run when dynamic data loads
    useEffect(() => {
        // Small delay to let React flush the new DOM nodes
        const timer = setTimeout(() => {
            const observer = new IntersectionObserver(
                entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
                { threshold: 0.12 }
            );
            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
            return () => observer.disconnect();
        }, 50);
        return () => clearTimeout(timer);
    }, [stats.length, formations.length, events.length, config.examResults?.length, config.testimonials?.length]);

    const featuredFormations = formations.slice(0, 3);
    const upcomingEvents = events.slice(0, 3);

    return (
        <main>
            {/* ── HERO SECTION ────────────────────────────── */}
            <section className="hero" aria-label="Bannière principale">
                <div className="hero__media">
                    {hero?.backgroundImage ? (
                        <img src={hero.backgroundImage} alt="Campus" className="w-full h-full object-cover" />
                    ) : (
                        <MediaPlaceholder
                            id="hero-bg"
                            type="image"
                            aspectRatio="21/9"
                            label="Photo du campus (1920×810px)"
                        />
                    )}
                </div>
                <div className="hero__overlay" />
                <div className="container hero__content fade-in-up">
                    <p className="hero__eyebrow">{hero?.eyebrow || 'Bienvenue à l\'IFPMEB'}</p>
                    <h1 className="hero__title">
                        {hero?.title ? (
                            <>
                                {hero.title.split(' ').slice(0, -4).join(' ')}
                                <br />
                                <span className="hero__title-gold">
                                    {hero.title.split(' ').slice(-4).join(' ')}
                                </span>
                            </>
                        ) : (
                            <>
                                Une formation d'excellence pour<br />
                                <span className="hero__title-gold">votre avenir professionnel</span>
                            </>
                        )}
                    </h1>

                    <p className="hero__subtitle">
                        {hero?.subtitle || 'Decouvrez nos programmes certifiants et donnez un élan décisif à votre carrière.'}
                    </p>
                    <div className="hero__actions">
                        <Link to="/formations" className="btn btn-primary">Découvrir nos formations</Link>
                        <Link to="/inscription" className="btn btn-outline-light">S&apos;inscrire maintenant</Link>
                    </div>
                </div>
            </section>

            {/* ── CHIFFRES CLÉS ────────────────────────────── */}
            {stats.length > 0 && (
                <section className="section section--dark stats-section" aria-label="Chiffres clés">
                    {/* Arc supérieur : hero (foncé) → stats (foncé) : arc blanc pour revenir proprement */}
                    <div className="container">
                        <h2 className="section-title">Nos chiffres clés</h2>
                        <div className="divider-gold" />
                        <div className="stats-grid">
                            {stats.map((s, i) => <StatBlock key={s.id || i} {...s} />)}
                        </div>
                    </div>
                    {/* Arc inférieur : stats (foncé) → formations (blanc) */}

                </section>
            )}


            {/* ── FORMATIONS PHARES ────────────────────────── */}
            <section className="section" aria-label="Formations phares">
                <div className="container">
                    <h2 className="section-title">Nos formations phares</h2>
                    <p className="section-subtitle">Choisissez parmi nos programmes certifiants les plus demandés.</p>
                    <div className="divider-gold" />
                    <div className="training-grid">
                        {featuredFormations.length > 0 ? (
                            featuredFormations.map(t => <TrainingCard key={t.id} {...t} />)
                        ) : (
                            <p className="text-center col-span-full py-10 opacity-50">Aucune formation disponible pour le moment.</p>
                        )}
                    </div>
                    <div className="homepage__cta-center">
                        <Link to="/formations" className="btn btn-outline">Voir toutes nos formations →</Link>
                    </div>
                </div>
            </section>

            {/* ── RÉSULTATS AUX EXAMENS ── */}
            <section className="section section--dark wave-section" aria-label="Résultats aux examens">
                {/* Arc supérieur : formations (blanc) → palmarès (foncé) */}
                <div className="wave-top wave-top--dark" aria-hidden="true">
                    <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
                        <path d="M0,0 C360,80 1080,80 1440,0 L1440,0 L0,0 Z" fill="var(--color-bg-white, #ffffff)" />
                    </svg>
                </div>
                <div className="container">
                    <h2 className="section-title">Palmarès de nos étudiants</h2>
                    <p className="section-subtitle" style={{ color: 'var(--color-cream)' }}>Fiers du succès de nos étudiants inscrits aux examens d'État.</p>
                    <div className="divider-gold" />

                    <ul className="events-preview">
                        {(config.examResults || []).map((res, i) => (
                            <li key={res.id || i} className="event-item reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                                <span className="event-item__date">{res.year}</span>
                                <span className="event-item__type">{res.program}</span>
                                <span className="event-item__title">{res.result_text}</span>
                                <Link to="/resultats" className="event-item__link">Voir en détail →</Link>
                            </li>
                        ))}
                    </ul>

                    <div className="homepage__cta-center" style={{ marginTop: 'var(--space-xl)' }}>
                        <Link to="/resultats" className="btn btn-outline-light">Voir tous les résultats par année →</Link>
                    </div>
                </div>
                {/* Arc inférieur : palmarès (foncé) → événements (gris) */}
                <div className="wave-bottom wave-bottom--gray" aria-hidden="true">
                    <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
                        <path d="M0,80 C360,0 1080,0 1440,80 L1440,80 L0,80 Z" fill="#F8F9FA" />
                    </svg>
                </div>
            </section>


            {/* ── ÉVÉNEMENTS À VENIR ───────────────────────── */}
            <section className="section section--gray" aria-label="Événements">
                <div className="container">
                    <h2 className="section-title">Prochains événements</h2>
                    <div className="divider-gold" />
                    <ul className="events-preview">
                        {upcomingEvents.length > 0 ? (
                            upcomingEvents.map((ev, i) => (
                                <li key={ev.id || i} className="event-item reveal">
                                    <span className="event-item__date">{ev.date}</span>
                                    <span className="event-item__type">{ev.type}</span>
                                    <span className="event-item__title">{ev.title}</span>
                                    <Link to="/evenements" className="event-item__link">En savoir plus →</Link>
                                </li>
                            ))
                        ) : (
                            <p className="text-center py-6 opacity-40">Aucun événement prévu pour le moment.</p>
                        )}
                    </ul>
                    <div className="homepage__cta-center" style={{ marginTop: 'var(--space-xl)' }}>
                        <Link to="/evenements" className="btn btn-outline">Voir tous les événements</Link>
                    </div>
                </div>
            </section>

            {/* ── GALERIE APERÇU ───────────────────────────── */}
            <section className="section" aria-label="Galerie">
                <div className="container">
                    <h2 className="section-title">Galerie</h2>
                    <p className="section-subtitle">Découvrez la vie à l'institut en images.</p>
                    <div className="divider-gold" />
                    <div className="gallery-preview">
                        {config.gallery?.length > 0 ? (
                            config.gallery.slice(0, 4).map((img, i) => (
                                <div key={img.id || i} className="reveal relative aspect-square rounded-lg overflow-hidden group">
                                    <img src={img.url} alt={img.category} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                                        <span className="text-white text-xs font-bold uppercase tracking-wider">{img.category}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            [1, 2, 3, 4].map(n => (
                                <MediaPlaceholder
                                    key={n}
                                    id={`gallery-preview-${n}`}
                                    type="image"
                                    aspectRatio="4/3"
                                    label={`Photo Campus ${n}`}
                                    className="reveal"
                                />
                            ))
                        )}
                    </div>
                    <div className="homepage__cta-center" style={{ marginTop: 'var(--space-xl)' }}>
                        <Link to="/galerie" className="btn btn-outline">Voir toute la galerie</Link>
                    </div>
                </div>
            </section>

            {/* ── TÉMOIGNAGES ──────────────────────────────── */}
            {config.testimonials?.length > 0 && (
                <section className="section section--gray wave-section" aria-label="Témoignages">
                    <div className="container">
                        <h2 className="section-title">Succès Étudiants</h2>
                        <p className="section-subtitle">Ce que nos étudiants et diplômés disent de leur expérience à l&apos;IFPMEB.</p>
                        <div className="divider-gold" />
                        <div className="testimonials-grid">
                            {config.testimonials.map((t, i) => (
                                <TestimonialCard key={t.id || i} {...t} />
                            ))}
                        </div>
                    </div>
                    {/* Arc inférieur : témoignages (gris) → CTA (foncé) */}
                    <div className="wave-bottom wave-bottom--dark" aria-hidden="true">
                        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
                            <path d="M0,80 C360,0 1080,0 1440,80 L1440,80 L0,80 Z" fill="var(--color-primary-blue)" />
                        </svg>
                    </div>
                </section>
            )}


            {/* ── CTA INSCRIPTION ──────────────────────────── */}
            <section className="section section--dark cta-section" aria-label="Appel à l'inscription">
                <div className="container cta-section__inner">
                    <div>
                        <h2 className="section-title">Prêt à rejoindre l&apos;IFPMEB ?</h2>
                        <p className="section-subtitle">Les inscriptions sont ouvertes pour l'année académique 2025-2026. Rejoignez l'excellence.</p>
                    </div>
                    <div className="cta-section__actions">
                        <Link to="/inscription" className="btn btn-primary">S&apos;inscrire maintenant</Link>
                        {whatsappNumber && (
                            <a
                                href={`https://wa.me/${whatsappNumber.replace(/\s/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-outline-light"
                            >
                                <span>💬</span> Contacter via WhatsApp
                            </a>
                        )}
                    </div>
                </div>
            </section>

            {/* ── FLOATING WHATSAPP BUTTON ─────────────────── */}
            {whatsappNumber && (
                <a
                    href={`https://wa.me/${whatsappNumber.replace(/\s/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="whatsapp-fab"
                    aria-label="Contacter via WhatsApp"
                >
                    💬
                </a>
            )}
        </main>
    );
}
