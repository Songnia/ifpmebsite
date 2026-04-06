import { useEffect } from 'react';
import MediaPlaceholder from '../components/ui/MediaPlaceholder';
import './AProposPage.css';

const TEAM = [
    { id: 't1', name: '[NOM_MEMBRE_1]', role: '[POSTE_1]' },
    { id: 't2', name: '[NOM_MEMBRE_2]', role: '[POSTE_2]' },
    { id: 't3', name: '[NOM_MEMBRE_3]', role: '[POSTE_3]' },
    { id: 't4', name: '[NOM_MEMBRE_4]', role: '[POSTE_4]' },
];

const VALEURS = [
    { icon: '🏛', titre: '[VALEUR_1]', texte: '[Description de la valeur 1 de l\'établissement]' },
    { icon: '🎯', titre: '[VALEUR_2]', texte: '[Description de la valeur 2 de l\'établissement]' },
    { icon: '🤝', titre: '[VALEUR_3]', texte: '[Description de la valeur 3 de l\'établissement]' },
];

export default function AProposPage() {
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
                    <h1>À propos<br /><span>de l&apos;IFPMEB</span></h1>
                    <p>[DESCRIPTION_APROPOS] – Notre établissement, notre mission et notre équipe.</p>
                </div>
            </section>

            {/* Histoire & Mission */}
            <section className="section">
                <div className="container apropos-intro">
                    <div className="apropos-intro__text reveal">
                        <h2>Notre histoire</h2>
                        <div className="divider-gold" style={{ margin: '1rem 0 1.5rem' }} />
                        <p>[HISTOIRE_ETABLISSEMENT] – Fondé en [ANNÉE_FONDATION], l&apos;IFPMEB s&apos;est imposé comme un acteur majeur de la formation professionnelle dans la région.</p>
                        <br />
                        <h3>Notre mission</h3>
                        <p>[MISSION_ETABLISSEMENT] – Nous nous engageons à former des professionnels compétents et polyvalents, capables de répondre aux exigences du marché du travail actuel.</p>
                        <br />
                        <a href="/inscription" className="btn btn-primary">Rejoindre l&apos;IFPMEB</a>
                    </div>
                    <div className="apropos-intro__media reveal">
                        <MediaPlaceholder
                            id="apropos-campus"
                            type="image"
                            aspectRatio="4/3"
                            label="[PHOTO_APROPOS] – Photo du directeur ou vue du campus principal"
                        />
                    </div>
                </div>
            </section>

            {/* Valeurs */}
            <section className="section section--gray">
                <div className="container">
                    <h2 className="section-title">Nos valeurs</h2>
                    <div className="divider-gold" />
                    <div className="valeurs-grid">
                        {VALEURS.map((v, i) => (
                            <div key={i} className="valeur-card reveal">
                                <span className="valeur-card__icon">{v.icon}</span>
                                <h3 className="valeur-card__titre">{v.titre}</h3>
                                <p className="valeur-card__texte">{v.texte}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Équipe */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">Notre équipe</h2>
                    <p className="section-subtitle">[INTRO_EQUIPE] – Des professionnels expérimentés à votre service.</p>
                    <div className="divider-gold" />
                    <div className="team-grid">
                        {TEAM.map(member => (
                            <div key={member.id} className="team-card reveal">
                                <MediaPlaceholder
                                    id={`team-${member.id}`}
                                    type="image"
                                    aspectRatio="1/1"
                                    label={`[PHOTO_TEAM – ${member.name}]`}
                                    className="team-card__photo"
                                />
                                <div className="team-card__info">
                                    <h3 className="team-card__name">{member.name}</h3>
                                    <p className="team-card__role">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
