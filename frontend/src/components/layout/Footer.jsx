import { Link } from 'react-router-dom';
import './Footer.css';
import { useConfig } from '../../context/ConfigContext';

const QUICK_LINKS = [
    { to: '/formations', label: 'Nos formations' },
    { to: '/resultats', label: 'Résultats' },
    { to: '/evenements', label: 'Événements' },
    { to: '/galerie', label: 'Galerie' },
    { to: '/admission', label: 'Admission & tarifs' },
    { to: '/apropos', label: 'À propos' },
    { to: '/inscription', label: 'Inscription' },
];

export default function Footer() {
    const { config } = useConfig();
    const year = new Date().getFullYear();

    const socials = config?.socials || {};

    return (
        <footer className="footer">
            <div className="container footer__inner">

                {/* Brand Column */}
                <div className="footer__col footer__col--brand">
                    <div className="footer__logo">
                        {config?.logo
                            ? <img src={config.logo} alt="Logo" className="footer__logo-img" style={{ height: 40 }} />
                            : <span className="footer__logo-icon">🎓</span>
                        }
                        <span className="footer__logo-text">{config?.siteName || 'IFPMEB'}</span>
                    </div>
                    <p className="footer__tagline">
                        {config?.tagline || 'Former les professionnels de demain au cœur de l\'Afrique.'}
                    </p>
                    <div className="footer__socials">
                        {socials.facebook && <a href={socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="footer__social-link">f</a>}
                        {socials.instagram && <a href={socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="footer__social-link">IG</a>}
                        {socials.linkedin && <a href={socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="footer__social-link">in</a>}
                        {socials.youtube && <a href={socials.youtube} target="_blank" rel="noreferrer" aria-label="YouTube" className="footer__social-link">▶</a>}
                        {/* Fallback placeholders if no socials configured */}
                        {!socials.facebook && !socials.instagram && !socials.linkedin && !socials.youtube && (
                            <>
                                <a href="#" aria-label="Facebook" className="footer__social-link">f</a>
                                <a href="#" aria-label="Instagram" className="footer__social-link">IG</a>
                                <a href="#" aria-label="LinkedIn" className="footer__social-link">in</a>
                            </>
                        )}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="footer__col">
                    <h4 className="footer__heading">Navigation</h4>
                    <ul className="footer__links">
                        {QUICK_LINKS.map(l => (
                            <li key={l.to}><Link to={l.to} className="footer__link">{l.label}</Link></li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="footer__col">
                    <h4 className="footer__heading">Contact</h4>
                    <ul className="footer__contact">
                        {config?.address && <li>📍 {config.address}{config.city ? `, ${config.city}` : ''}</li>}
                        {config?.phone && <li>📞 {config.phone}</li>}
                        {config?.email && <li>✉ {config.email}</li>}
                        {config?.whatsappNumber && <li>💬 WhatsApp : {config.whatsappNumber}</li>}
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="footer__col footer__col--newsletter">
                    <h4 className="footer__heading">Restez informé</h4>
                    <p className="footer__newsletter-text">Recevez les actualités et événements de l&apos;{config?.siteName || 'IFPMEB'}.</p>
                    <form className="footer__newsletter-form" onSubmit={e => e.preventDefault()}>
                        <input type="email" placeholder="Votre email" className="footer__newsletter-input" />
                        <button type="submit" className="btn btn-primary footer__newsletter-btn">→</button>
                    </form>
                </div>
            </div>

            <div className="footer__bottom">
                <div className="container">
                    <p>© {year} {config?.siteName || 'IFPMEB'} – Tous droits réservés. | <Link to="/mentions-legales">Mentions légales</Link></p>
                </div>
            </div>
        </footer>
    );
}


