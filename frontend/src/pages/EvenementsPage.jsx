import { useEffect } from 'react';
import { useConfig } from '@/context/ConfigContext';
import MediaPlaceholder from '../components/ui/MediaPlaceholder';
import './EvenementsPage.css';

export default function EvenementsPage() {
    const { config } = useConfig();
    const events = config.events || [];

    useEffect(() => {
        window.scrollTo(0, 0);
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [events]);

    return (
        <main>
            <section className="page-hero">
                <div className="container page-hero__content">
                    <h1>Nos<br /><span>Événements</span></h1>
                    <p>Retrouvez toutes les dates importantes : portes ouvertes, concours, remises de diplômes et actualités de l'institut.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="events-list">
                        {events.length > 0 ? (
                            events.map((ev, i) => (
                                <article key={ev.id || i} className={`event-card reveal ${!ev.image ? 'event-card--no-image' : ''}`}>
                                    {ev.image && (
                                        <div className="event-card__media">
                                            <img src={ev.image} alt={ev.title} className="event-card__image" />
                                            <span className="event-card__type">{ev.type}</span>
                                        </div>
                                    )}
                                    <div className="event-card__body">
                                        {!ev.image && <span className="event-card__type-inline">{ev.type}</span>}
                                        <p className="event-card__date">📅 {ev.date}</p>
                                        <h2 className="event-card__title">{ev.title}</h2>
                                        <p className="event-card__lieu">📍 {ev.lieu}</p>
                                        <p className="event-card__desc">{ev.description}</p>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <p className="text-center w-full py-10 opacity-50">Aucun événement n'est programmé pour le moment. Revenez bientôt !</p>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
