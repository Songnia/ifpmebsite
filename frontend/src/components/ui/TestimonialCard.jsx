import './TestimonialCard.css';

/**
 * TestimonialCard – Displays a student testimonial.
 * @param {string} name
 * @param {string} role
 * @param {string} content
 * @param {number} rating
 */
export default function TestimonialCard({ name, role, content, rating = 5 }) {
    const initials = name
        ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : '?';

    return (
        <article className="testimonial-card reveal">
            <div className="testimonial-card__stars">
                {[...Array(5)].map((_, i) => (
                    <span
                        key={i}
                        className={`star ${i < rating ? 'star--filled' : ''}`}
                    >
                        ★
                    </span>
                ))}
            </div>

            <blockquote className="testimonial-card__quote">
                <span className="quote-icon">“</span>
                {content || "Pas de contenu fourni pour ce témoignage."}
            </blockquote>

            <div className="testimonial-card__footer">
                <div className="testimonial-card__avatar">
                    {initials}
                </div>
                <div className="testimonial-card__info">
                    <h4 className="testimonial-card__name">{name || "Anonyme"}</h4>
                    <p className="testimonial-card__role">{role || "Étudiant"}</p>
                </div>
            </div>
        </article>
    );
}
