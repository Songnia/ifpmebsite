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
export default function TrainingCard({ id, title, description, duration, level, domain, price }) {
    return (
        <article className="training-card reveal">
            <div className="training-card__image">
                <MediaPlaceholder
                    id={`training-img-${id}`}
                    type="image"
                    aspectRatio="16/9"
                    label={`[Visuel formation – ${title || '[NOM_FORMATION]'}]`}
                />
                {domain && <span className="training-card__domain">{domain}</span>}
            </div>
            <div className="training-card__body">
                <h3 className="training-card__title">{title || '[Nom de la formation]'}</h3>
                <p className="training-card__desc">{description || '[Description courte de la formation et de ses objectifs principaux]'}</p>
                <div className="training-card__meta">
                    {duration && <span>⏱ {duration}</span>}
                    {level && <span>🎓 {level}</span>}
                    {price && <span className="training-card__price">{price}</span>}
                </div>
            </div>
            <div className="training-card__footer">
                <Link to={`/formations/${id}`} className="btn btn-outline">En savoir plus</Link>
                <Link to="/inscription" className="btn btn-primary">S&apos;inscrire</Link>
            </div>
        </article>
    );
}
