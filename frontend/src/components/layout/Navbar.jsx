import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import { useConfig } from '../../context/ConfigContext';

const NAV_LINKS = [
    { to: '/formations', label: 'Nos formations' },
    { to: '/resultats', label: 'Résultats' },
    { to: '/evenements', label: 'Événements' },
    { to: '/galerie', label: 'Galerie' },
    { to: '/admission', label: 'Admission & tarifs' },
    { to: '/apropos', label: 'À propos' },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { config } = useConfig();

    return (
        <>
            <header className="navbar">
                <div className="container navbar__inner">
                    {/* Logo */}
                    <Link to="/" className="navbar__logo" aria-label={`${config?.siteName || 'IFPMEB'} – Accueil`}>
                        <div className="navbar__logo-mark">
                            {config?.logo ? (
                                <img src={config.logo} alt="Logo" className="w-8 h-8 object-contain" style={{ height: '32px' }} />
                            ) : (
                                <span className="navbar__logo-icon">🎓</span>
                            )}
                        </div>
                        <span className="navbar__logo-text">{config?.siteName || 'IFPMEB'}</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="navbar__nav" aria-label="Navigation principale">
                        <ul className="navbar__links">
                            {NAV_LINKS.map(link => (
                                <li key={link.to}>
                                    <NavLink
                                        to={link.to}
                                        className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* CTA */}
                    <Link to="/inscription" className="btn btn-primary navbar__cta">
                        S&apos;inscrire
                    </Link>

                    {/* Hamburger */}
                    <button
                        className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Ouvrir le menu"
                        aria-expanded={menuOpen}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </header>

            {/* Mobile Drawer */}
            <div className={`navbar__drawer ${menuOpen ? 'navbar__drawer--open' : ''}`} role="dialog" aria-label="Menu mobile">
                <nav>
                    <ul className="navbar__drawer-links">
                        {NAV_LINKS.map(link => (
                            <li key={link.to}>
                                <NavLink
                                    to={link.to}
                                    className="navbar__drawer-link"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.label}
                                </NavLink>
                            </li>
                        ))}
                        <li>
                            <Link to="/inscription" className="btn btn-primary" onClick={() => setMenuOpen(false)}>
                                S&apos;inscrire
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
            {menuOpen && <div className="navbar__overlay" onClick={() => setMenuOpen(false)} />}
        </>
    );
}
