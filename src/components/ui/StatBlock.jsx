import './StatBlock.css';

/**
 * StatBlock – Displays a single key figure (e.g., 95%, 2000+ étudiants)
 */
export default function StatBlock({ value, label, icon }) {
    return (
        <div className="stat-block reveal">
            {icon && <span className="stat-block__icon">{icon}</span>}
            <p className="stat-block__value">{value || '[VALEUR]'}</p>
            <p className="stat-block__label">{label || '[Libellé statistique]'}</p>
        </div>
    );
}
