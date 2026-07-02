import { Link } from 'react-router-dom';
import MediaPlaceholder from './MediaPlaceholder';
import './TrainingCard.css';

/**
 * TrainingCard – Displays a training program card.
 * @param {string} id
 * @param {string} title
 * @param {string} description
 * @param {string} duration
 * @param {string} level
 * @param {string} domain
 * @param {string} price
 */
export default function TrainingCard({ id, title, description, duration, level, domain, price, image }) {
    const hasImage = !!image;

    return (
        <article className="training-card reveal">
            {hasImage && (
                <div className="training-card__image">
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                    {domain && <span className="training-card__domain">{domain}</span>}
                </div>
            )}

            <div className="training-card__body">
                {!hasImage && domain && (
                    <div className="mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                            {domain}
                        </span>
                    </div>
                )}
                <h3 className="training-card__title">{title || '[Nom de la formation]'}</h3>
                <p className="training-card__desc">{description || '[Description courte de la formation et de ses objectifs principaux]'}</p>
                <div className="training-card__meta">
                    {duration && <span>⏱ {duration}</span>}
                    {level && <span>🎓 {level}</span>}
                    {price && <span className="training-card__price">{price}</span>}
                </div>
                <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-primary-orange)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span style={{ background: 'rgba(0, 51, 102, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'var(--color-primary-blue)' }}>Cours du jour / soir</span>
                </div>
            </div>
            <div className="training-card__footer">
                <Link to={`/formations/${id}`} className="btn btn-outline">En savoir plus</Link>
                <Link to="/inscription" className="btn btn-primary">S&apos;inscrire</Link>
            </div>
        </article>
    );
}
