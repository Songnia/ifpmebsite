import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import MediaPlaceholder from '../components/ui/MediaPlaceholder';
import StatBlock from '../components/ui/StatBlock';
import TrainingCard from '../components/ui/TrainingCard';
import './HomePage.css';

const STATS = [
    { value: '[XX]%', label: 'Taux de réussite', icon: '🎓' },
    { value: '[XXX]+', label: 'Étudiants formés', icon: '👨‍🎓' },
    { value: '[XX]', label: 'Formations certifiantes', icon: '📋' },
    { value: "[XX] ans", label: "D'expérience", icon: '📅' },
];

const FEATURED_TRAININGS = [
    { id: 'formation-1', title: '[NOM_FORMATION_1]', description: '[Description de la formation 1 et ses objectifs pédagogiques]', duration: '[DURÉE]', level: '[NIVEAU]', domain: '[DOMAINE_1]', price: '[TARIF]' },
    { id: 'formation-2', title: '[NOM_FORMATION_2]', description: '[Description de la formation 2 et ses objectifs pédagogiques]', duration: '[DURÉE]', level: '[NIVEAU]', domain: '[DOMAINE_2]', price: '[TARIF]' },
    { id: 'formation-3', title: '[NOM_FORMATION_3]', description: '[Description de la formation 3 et ses objectifs pédagogiques]', duration: '[DURÉE]', level: '[NIVEAU]', domain: '[DOMAINE_3]', price: '[TARIF]' },
];

const UPCOMING_EVENTS = [
    { date: '[DATE_1]', title: '[NOM_ÉVÉNEMENT_1]', type: '[TYPE]' },
    { date: '[DATE_2]', title: '[NOM_ÉVÉNEMENT_2]', type: '[TYPE]' },
    { date: '[DATE_3]', title: '[NOM_ÉVÉNEMENT_3]', type: '[TYPE]' },
];

export default function HomePage() {
    // Scroll-reveal effect
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.12 }
        );
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <main>
            {/* ── EUROBANNER (Hero Section) ────────────────── */}
            <section className="hero" aria-label="Bannière principale">
                <div className="hero__media">
                    <MediaPlaceholder
                        id="hero-bg"
                        type="image"
                        aspectRatio="21/9"
                        label="[PHOTO_CAMPUS] – Photo du campus ou d'une salle de cours moderne et lumineuse (1920×810px)"
                    />
                </div>
                <div className="hero__overlay" />
                <div className="container hero__content fade-in-up">
                    <p className="hero__eyebrow">[SLOGAN_COURT] – Bienvenue à l&apos;IFPMEB</p>
                    <h1 className="hero__title">
                        Une formation d&apos;excellence
                        <br />
                        <span className="hero__title-gold">pour votre avenir professionnel</span>
                    </h1>
                    <p className="hero__subtitle">
                        [DESCRIPTION_ACCUEIL] – Découvrez nos programmes certifiants et donnez un élan décisif à votre carrière.
                    </p>
                    <div className="hero__actions">
                        <Link to="/formations" className="btn btn-primary">Découvrir nos formations</Link>
                        <Link to="/inscription" className="btn btn-outline-light">S&apos;inscrire maintenant</Link>
                    </div>
                </div>
            </section>

            {/* ── CHIFFRES CLÉS ────────────────────────────── */}
            <section className="section section--dark stats-section" aria-label="Chiffres clés">
                <div className="container">
                    <h2 className="section-title">Nos chiffres clés</h2>
                    <div className="divider-gold" />
                    <div className="stats-grid">
                        {STATS.map((s, i) => <StatBlock key={i} {...s} />)}
                    </div>
                </div>
            </section>

            {/* ── FORMATIONS PHARES ────────────────────────── */}
            <section className="section" aria-label="Formations phares">
                <div className="container">
                    <h2 className="section-title">Nos formations phares</h2>
                    <p className="section-subtitle">[TEXTE_INTRO_FORMATIONS] – Choisissez parmi nos programmes certifiants.</p>
                    <div className="divider-gold" />
                    <div className="training-grid">
                        {FEATURED_TRAININGS.map(t => <TrainingCard key={t.id} {...t} />)}
                    </div>
                    <div className="homepage__cta-center">
                        <Link to="/formations" className="btn btn-outline">Voir toutes nos formations →</Link>
                    </div>
                </div>
            </section>

            {/* ── RÉSULTATS AUX EXAMENS ────────────────────── */}
            <section className="section section--dark" aria-label="Résultats aux examens">
                <div className="container">
                    <h2 className="section-title">Palmarès de nos étudiants</h2>
                    <p className="section-subtitle" style={{ color: 'var(--color-cream)' }}>Fiers du succès de nos étudiants inscrits aux examens d'État ces dernières années.</p>
                    <div className="divider-gold" />

                    <ul className="events-preview">
                        {[
                            { year: "2025", type: "BTS Banque", title: "145 étudiants admis" },
                            { year: "2024", type: "Licence Gestion", title: "98 étudiants admis" },
                            { year: "2024", type: "BTS Finance", title: "120 étudiants admis" },
                            { year: "2023", type: "Master RH", title: "85 étudiants admis" }
                        ].map((stat, i) => (
                            <li key={i} className="event-item reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                                <span className="event-item__date">{stat.year}</span>
                                <span className="event-item__type">{stat.type}</span>
                                <span className="event-item__title">{stat.title}</span>
                                <Link to="/resultats" className="event-item__link">Voir en détail →</Link>
                            </li>
                        ))}
                    </ul>

                    <div className="homepage__cta-center" style={{ marginTop: 'var(--space-xl)' }}>
                        <Link to="/resultats" className="btn btn-outline-light">Voir tous les résultats par année →</Link>
                    </div>
                </div>
            </section>

            {/* ── ÉVÉNEMENTS À VENIR ───────────────────────── */}
            <section className="section section--gray" aria-label="Événements">
                <div className="container">
                    <h2 className="section-title">Prochains événements</h2>
                    <div className="divider-gold" />
                    <ul className="events-preview">
                        {UPCOMING_EVENTS.map((ev, i) => (
                            <li key={i} className="event-item reveal">
                                <span className="event-item__date">{ev.date}</span>
                                <span className="event-item__type">{ev.type}</span>
                                <span className="event-item__title">{ev.title}</span>
                                <Link to="/evenements" className="event-item__link">En savoir plus →</Link>
                            </li>
                        ))}
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
                    <p className="section-subtitle">[TEXTE_GALERIE] – La vie à l&apos;IFPMEB en images.</p>
                    <div className="divider-gold" />
                    <div className="gallery-preview">
                        {[1, 2, 3, 4].map(n => (
                            <MediaPlaceholder
                                key={n}
                                id={`gallery-preview-${n}`}
                                type="image"
                                aspectRatio="4/3"
                                label={`[PHOTO_GALERIE_${n}] – Campus/Étudiants/Événements`}
                                className="reveal"
                            />
                        ))}
                    </div>
                    <div className="homepage__cta-center" style={{ marginTop: 'var(--space-xl)' }}>
                        <Link to="/galerie" className="btn btn-outline">Voir toute la galerie</Link>
                    </div>
                </div>
            </section>

            {/* ── CTA INSCRIPTION ──────────────────────────── */}
            <section className="section section--dark cta-section" aria-label="Appel à l'inscription">
                <div className="container cta-section__inner">
                    <div>
                        <h2 className="section-title">[TITRE_CTA] – Prêt à rejoindre l&apos;IFPMEB ?</h2>
                        <p className="section-subtitle">[TEXTE_CTA] – Les inscriptions sont ouvertes. Rejoignez nos prochaines promotions.</p>
                    </div>
                    <div className="cta-section__actions">
                        <Link to="/inscription" className="btn btn-primary">S&apos;inscrire maintenant</Link>
                        <a
                            href="https://wa.me/[NUMERO_WHATSAPP]"
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-outline-light"
                        >
                            <span>💬</span> Contacter via WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            {/* ── FLOATING WHATSAPP BUTTON ─────────────────── */}
            <a
                href="https://wa.me/[NUMERO_WHATSAPP]"
                target="_blank"
                rel="noreferrer"
                className="whatsapp-fab"
                aria-label="Contacter via WhatsApp"
            >
                💬
            </a>
        </main>
    );
}
