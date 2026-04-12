import './MediaPlaceholder.css';

/**
 * MediaPlaceholder – Shows a styled dashed placeholder for images/videos.
 * @param {string} id - Unique identifier
 * @param {'image'|'video'} type - Media type
 * @param {string} aspectRatio - e.g. "16/9", "21/9", "1/1"
 * @param {string} label - Description of content
 * @param {string} [className] - Additional CSS classes
 */
export default function MediaPlaceholder({ id, type = 'image', aspectRatio = '16/9', label, className = '' }) {
    return (
        <div
            id={id}
            className={`media-placeholder media-placeholder--${type} ${className}`}
            style={{ aspectRatio }}
            aria-label={label}
            role="img"
        >
            <div className="media-placeholder__inner">
                <span className="media-placeholder__icon">
                    {type === 'video' ? '▶' : '🖼'}
                </span>
                <span className="media-placeholder__label">{label || `[${id}]`}</span>
                <span className="media-placeholder__type">{type.toUpperCase()}</span>
            </div>
        </div>
    );
}
