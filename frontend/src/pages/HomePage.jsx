import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useConfig } from '@/context/ConfigContext';
import MediaPlaceholder from '../components/ui/MediaPlaceholder';
import StatBlock from '../components/ui/StatBlock';
import TrainingCard from '../components/ui/TrainingCard';
import TestimonialCard from '../components/ui/TestimonialCard';
import './HomePage.css';

const TypewriterTitle = ({ part1, part2 }) => {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [isTyping1, setIsTyping1] = useState(true);

    useEffect(() => {
        if (text1.length < part1.length) {
            const timeout = setTimeout(() => {
                setText1(part1.slice(0, text1.length + 1));
            }, 40);
            return () => clearTimeout(timeout);
        } else {
            setIsTyping1(false);
        }
    }, [text1, part1]);

    useEffect(() => {
        if (!isTyping1 && text2.length < part2.length) {
            const timeout = setTimeout(() => {
                setText2(part2.slice(0, text2.length + 1));
            }, 40);
            return () => clearTimeout(timeout);
        }
    }, [text2, part2, isTyping1]);

    return (
        <>
            {text1}
            {isTyping1 && <span className="typewriter-cursor">|</span>}
            <br />
            <span className="hero__title-gold">
                {text2}
                {!isTyping1 && <span className="typewriter-cursor">|</span>}
            </span>
        </>
    );
};

const HeroSlider = ({ titlePart1, titlePart2, hero }) => {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlide(current => (current === 0 ? 1 : 0));
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="hero-slider-container">
            <div className={`hero-slide ${activeSlide === 0 ? 'active' : ''}`}>
                <p className="hero__eyebrow">{hero?.eyebrow || 'Bienvenue à l\'IFPMEB'}</p>
                <h1 className="hero__title">
                    {activeSlide === 0 ? <TypewriterTitle part1={titlePart1} part2={titlePart2} /> : null}
                </h1>
                <p className="hero__subtitle">
                    {hero?.subtitle || 'Decouvrez nos programmes certifiants et donnez un élan décisif à votre carrière.'}
                </p>
            </div>

            <div className={`hero-slide ${activeSlide === 1 ? 'active' : ''}`}>
                <div className="hero__video-wrapper">
                    {hero?.videoUrl ? (
                        <iframe
                            src={hero.videoUrl}
                            title="Présentation IFPMEB"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                        ></iframe>
                    ) : (
                        <div className="hero__video-placeholder">
                            <span className="play-icon">▶</span>
                            <p>Vidéo de présentation du projet</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="hero-slider-controls">
                <button
                    className={`hero-slider-dot ${activeSlide === 0 ? 'active' : ''}`}
                    onClick={() => setActiveSlide(0)}
                    aria-label="Voir le texte d'introduction"
                ></button>
                <button
                    className={`hero-slider-dot ${activeSlide === 1 ? 'active' : ''}`}
                    onClick={() => setActiveSlide(1)}
                    aria-label="Voir la vidéo de présentation"
                ></button>
            </div>
        </div>
    );
};

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

    const titlePart1 = hero?.title ? hero.title.split(' ').slice(0, -4).join(' ') : "Une formation d'excellence pour";
    const titlePart2 = hero?.title ? hero.title.split(' ').slice(-4).join(' ') : "votre avenir professionnel";

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
                    <HeroSlider titlePart1={titlePart1} titlePart2={titlePart2} hero={hero} />

                    <div className="hero__actions">
                        <Link to="/formations" className="btn btn-primary">Découvrir nos formations</Link>
                        <Link to="/inscription" className="btn btn-outline-light">S&apos;inscrire maintenant</Link>
                    </div>
                </div>
            </section>

            {/* ── PRÉSENTATION VIDÉO ────────────────────────────── */}
            <section className="section section--dark presentation-section" aria-label="Vidéo de présentation">
                <div className="container presentation__container">
                    <div className="presentation__header fade-in-up">
                        <h2 className="section-title">Découvrez l&apos;IFPMEB</h2>
                        <p className="section-subtitle" style={{ color: 'var(--color-cream)' }}>Une pédagogie innovante tournée vers l&apos;excellence, l&apos;employabilité et l&apos;entrepreneuriat.</p>
                        <div className="divider-gold" />
                    </div>

                    <div className="presentation__video-wrapper reveal">
                        {/* Carte vidéo principale (fond sombre/glassmorphism) */}
                        <div className="presentation__video-card">
                            <div className="presentation__glow"></div>
                            <div className="presentation__video-placeholder">
                                <button className="play-button" aria-label="Lancer la vidéo">
                                    ▶
                                </button>
                                <p>Vidéo de présentation IFPMEB</p>
                            </div>
                        </div>

                        {/* Éléments flottants inspirés de l'image */}
                        <div className="floating-card floating-card--left">
                            <span className="floating-card__value">95%</span>
                            <span className="floating-card__label">Taux d&apos;insertion</span>
                            <div className="floating-card__progress">
                                <div className="floating-card__progress-bar" style={{ width: '95%' }}></div>
                            </div>
                        </div>

                        <div className="floating-card floating-card--right">
                            <span className="floating-card__icon">🎓</span>
                            <div>
                                <span className="floating-card__title">Excellence</span>
                                <span className="floating-card__desc">Reconnu par l&apos;État</span>
                            </div>
                        </div>

                        <div className="floating-card floating-card--top">
                            <span className="pulse-indicator"></span>
                            <span>Inscriptions Ouvertes</span>
                        </div>
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
