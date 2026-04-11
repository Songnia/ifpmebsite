import { Link } from 'react-router-dom';
import './Footer.css';

const QUICK_LINKS = [
    { to: '/formations', label: 'Nos formations' },
    { to: '/resultats', label: 'Résultats' },
    { to: '/evenements', label: 'Événements' },
    { to: '/galerie', label: 'Galerie' },
    { to: '/admission', label: 'Admission & tarifs' },
    { to: '/comment-ca-marche', label: 'Comment ça marche' },
    { to: '/apropos', label: 'À propos' },
    { to: '/inscription', label: 'Inscription' },
];

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="container footer__inner">

                {/* Brand Column */}
                <div className="footer__col footer__col--brand">
                    <div className="footer__logo">
                        <span className="footer__logo-icon">🎓</span>
                        <span className="footer__logo-text">IFPMEB</span>
                    </div>
                    <p className="footer__tagline">
                        [SLOGAN_ETABLISSEMENT] – Former les professionnels de demain au cœur de l&apos;Afrique.
                    </p>
                    <div className="footer__socials">
                        <a href="#" aria-label="Facebook" className="footer__social-link">f</a>
                        <a href="#" aria-label="Instagram" className="footer__social-link">IG</a>
                        <a href="#" aria-label="LinkedIn" className="footer__social-link">in</a>
                        <a href="#" aria-label="YouTube" className="footer__social-link">▶</a>
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
                        <li>📍 [ADRESSE_ETABLISSEMENT]</li>
                        <li>📞 [TELEPHONE_ETABLISSEMENT]</li>
                        <li>✉ [EMAIL_ETABLISSEMENT]</li>
                        <li>⏰ Lun – Ven : [HORAIRES]</li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="footer__col footer__col--newsletter">
                    <h4 className="footer__heading">Restez informé</h4>
                    <p className="footer__newsletter-text">[TEXTE_NEWSLETTER] Recevez les actualités et événements de l&apos;IFPMEB.</p>
                    <form className="footer__newsletter-form" onSubmit={e => e.preventDefault()}>
                        <input type="email" placeholder="Votre email" className="footer__newsletter-input" />
                        <button type="submit" className="btn btn-primary footer__newsletter-btn">→</button>
                    </form>
                </div>
            </div>

            <div className="footer__bottom">
                <div className="container">
                    <p>© {year} IFPMEB – Tous droits réservés. | <Link to="/mentions-legales">Mentions légales</Link></p>
                </div>
            </div>
        </footer>
    );
}
