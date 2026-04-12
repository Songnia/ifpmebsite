import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MediaPlaceholder from '../components/ui/MediaPlaceholder';
import './CommentCaMarchePage.css';

const WORKFLOW_STEPS = [
    {
        id: 1,
        title: 'Orientation & Conseil',
        icon: '🧭',
        desc: 'Un conseiller d\'orientation vous accompagne pour choisir la formation la plus adaptée à votre profil et à vos ambitions.',
    },
    {
        id: 2,
        title: 'Inscription & Admission',
        icon: '📝',
        desc: 'Remplissez le formulaire en ligne, soumettez votre dossier et passez l\'entretien de motivation.',
    },
    {
        id: 3,
        title: 'Formation & Pratique',
        icon: '📚',
        desc: 'Suivez des cours théoriques et pratiques encadrés par des experts. Participez à nos ateliers et projets réels.',
    },
    {
        id: 4,
        title: 'Stage & Certification',
        icon: '🎓',
        desc: 'Validez vos compétences par un stage en entreprise et obtenez votre certification reconnue par l\'État.',
    },
    {
        id: 5,
        title: 'Accompagnement & Insertion',
        icon: '🚀',
        desc: 'Bénéficiez d\'un suivi personnalisé pour votre recherche d\'emploi, création de CV et préparation aux entretiens.',
    }
];

export default function CommentCaMarchePage() {
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
                    <h1>Comment<br /><span>ça marche ?</span></h1>
                    <p>Le parcours complet d&apos;un étudiant à l&apos;IFPMEB : de l&apos;orientation initiale à l&apos;insertion professionnelle réussie.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="workflow-intro text-center">
                        <h2 className="section-title">Votre parcours chez nous</h2>
                        <p className="section-subtitle">Une méthode éprouvée pour garantir votre réussite.</p>
                        <div className="divider-gold" style={{ margin: '0 auto 3rem' }} />
                    </div>

                    <div className="workflow-timeline">
                        {WORKFLOW_STEPS.map((step, index) => (
                            <div key={step.id} className="workflow-step reveal">
                                <div className="workflow-step__marker">
                                    <span className="workflow-step__number">{step.id}</span>
                                    {index !== WORKFLOW_STEPS.length - 1 && <div className="workflow-step__line" />}
                                </div>
                                <div className="workflow-step__content">
                                    <div className="workflow-step__icon">{step.icon}</div>
                                    <h3 className="workflow-step__title">{step.title}</h3>
                                    <p className="workflow-step__desc">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Technical Support/Assistance block */}
                    <div className="support-block reveal" style={{ marginTop: '4rem' }}>
                        <div className="support-block__content">
                            <h2>Support pédagogique et technique</h2>
                            <div className="divider-gold" style={{ margin: '1rem 0' }} />
                            <p>
                                Tout au long de votre parcours, une équipe dédiée est disponible pour vous accompagner :
                                difficultés d&apos;apprentissage, outils informatiques, ou démarches administratives.
                                Vous n&apos;êtes jamais seul(e) face aux défis.
                            </p>
                            <Link to="/contact" className="btn btn-outline" style={{ marginTop: '1rem' }}>Contacter le support</Link>
                        </div>
                        <div className="support-block__media">
                            <MediaPlaceholder
                                id="support-img"
                                type="image"
                                aspectRatio="4/3"
                                label="[PHOTO_SUPPORT_TECHNIQUE]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="section section--dark cta-section text-center">
                <div className="container">
                    <h2 className="section-title">Prêt à démarrer l&apos;aventure ?</h2>
                    <p className="section-subtitle" style={{ margin: '1rem auto 2rem', color: 'rgba(255,255,255,0.8)' }}>
                        Rejoignez-nous et construisez votre avenir.
                    </p>
                    <Link to="/inscription" className="btn btn-primary">S&apos;inscrire maintenant</Link>
                </div>
            </section>
        </main>
    );
}
