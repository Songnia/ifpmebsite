import { useEffect } from 'react';
import MediaPlaceholder from '../components/ui/MediaPlaceholder';
import './EvenementsPage.css';

const EVENTS = [
    { id: 'e1', date: '[DATE_EVT_1]', type: '[TYPE_1]', title: '[NOM_ÉVÉNEMENT_1]', lieu: '[LIEU_1]', description: '[Description courte de l\'événement 1 et ses objectifs]' },
    { id: 'e2', date: '[DATE_EVT_2]', type: '[TYPE_2]', title: '[NOM_ÉVÉNEMENT_2]', lieu: '[LIEU_2]', description: '[Description courte de l\'événement 2 et ses objectifs]' },
    { id: 'e3', date: '[DATE_EVT_3]', type: '[TYPE_3]', title: '[NOM_ÉVÉNEMENT_3]', lieu: '[LIEU_3]', description: '[Description courte de l\'événement 3 et ses objectifs]' },
];

export default function EvenementsPage() {
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
                    <h1>Nos<br /><span>Événements</span></h1>
                    <p>[DESCRIPTION_EVENEMENTS] – Retrouvez toutes les dates importantes : portes ouvertes, webinaires, remises de diplômes et plus.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="events-list">
                        {EVENTS.map(ev => (
                            <article key={ev.id} className="event-card reveal">
                                <div className="event-card__media">
                                    <MediaPlaceholder
                                        id={`event-img-${ev.id}`}
                                        type="image"
                                        aspectRatio="16/9"
                                        label={`[PHOTO_ÉVÉNEMENT – ${ev.title}]`}
                                    />
                                    <span className="event-card__type">{ev.type}</span>
                                </div>
                                <div className="event-card__body">
                                    <p className="event-card__date">📅 {ev.date}</p>
                                    <h2 className="event-card__title">{ev.title}</h2>
                                    <p className="event-card__lieu">📍 {ev.lieu}</p>
                                    <p className="event-card__desc">{ev.description}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
