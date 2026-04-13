import { useState, useEffect } from 'react';
import './ScrollToTop.css';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Fonction pour observer le défilement
    useEffect(() => {
        const toggleVisibility = () => {
            // Afficher le bouton après 300px de défilement vers le bas
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    // Fonction de remontée "douce"
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
            onClick={scrollToTop}
            aria-label="Remonter en haut de la page"
            title="Remonter"
        >
            ↑
        </button>
    );
}
