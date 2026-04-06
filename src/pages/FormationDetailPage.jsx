import { useParams, Link } from 'react-router-dom';
import MediaPlaceholder from '../components/ui/MediaPlaceholder';
import './FormationDetailPage.css';

export default function FormationDetailPage() {
    const { id } = useParams();

    // In a real app, you would fetch data for `id`. Here is placeholder data.
    const formation = {
        title: '[NOM DE LA FORMATION]',
        domain: '[DOMAINE]',
        duration: '12 mois',
        level: 'Bac +2/3',
        price: '300 000 FCFA',
        description: `Cette formation vous prépare aux métiers d'avenir en vous apportant les fondamentaux théoriques et une forte dimension pratique.
    Le programme est conçu avec les professionnels du secteur pour garantir une insertion rapide sur le marché du travail.`,
        objectives: [
            'Maîtriser les outils fondamentaux de la discipline.',
            'Savoir gérer un projet de bout en bout.',
            'Développer des compétences techniques et managériales.',
            'S\'intégrer efficacement dans une équipe professionnelle.'
        ],
        prerequisites: 'Avoir un niveau Bac ou équivalent (selon la filière).',
        career: 'Chef de projet, Analyste, Assistant spécialisé, etc.'
    };

    return (
        <main className="formation-detail">
            <section className="page-hero">
                <div className="container page-hero__content">
                    <div className="formation-detail__eyebrow">{formation.domain}</div>
                    <h1>{formation.title}</h1>
                    <p>Formation certifiante • {formation.duration} • {formation.level}</p>
                </div>
            </section>

            <section className="section">
                <div className="container formation-detail__layout">

                    {/* Main content */}
                    <div className="formation-detail__main">
                        <MediaPlaceholder
                            id={`cover-${id}`}
                            type="image"
                            aspectRatio="16/9"
                            label="[IMAGE_ILLUSTRATION_FORMATION]"
                        />

                        <div className="formation-detail__block">
                            <h2>Présentation de la formation</h2>
                            <div className="divider-gold" style={{ margin: '1rem 0 1.5rem' }} />
                            <p>{formation.description}</p>
                        </div>

                        <div className="formation-detail__block">
                            <h2>Objectifs pédagogiques</h2>
                            <div className="divider-gold" style={{ margin: '1rem 0 1.5rem' }} />
                            <ul className="formation-detail__list">
                                {formation.objectives.map((obj, i) => (
                                    <li key={i}>✅ {obj}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="formation-detail__block">
                            <h2>Débouchés professionnels</h2>
                            <div className="divider-gold" style={{ margin: '1rem 0 1.5rem' }} />
                            <p>{formation.career}</p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="formation-detail__sidebar">
                        <div className="formation-detail__card sticky-card">
                            <h3>En résumé</h3>
                            <ul className="formation-detail__summary">
                                <li><strong>Durée :</strong> {formation.duration}</li>
                                <li><strong>Niveau requis :</strong> {formation.level}</li>
                                <li><strong>Coût :</strong> <span className="text-gold">{formation.price}</span></li>
                                <li><strong>Pré-requis :</strong> {formation.prerequisites}</li>
                            </ul>

                            <div className="formation-detail__actions">
                                <Link to="/inscription" className="btn btn-primary w-full text-center">S&apos;inscrire à cette formation</Link>
                                <a href="#programme" className="btn btn-outline w-full text-center">Télécharger le programme (PDF)</a>
                            </div>
                        </div>
                    </aside>

                </div>
            </section>
        </main>
    );
}
