import { useState, useEffect } from 'react';
import { useConfig } from '@/context/ConfigContext';
import './InscriptionPage.css';

const EPI_ITEMS = [
    { emoji: '🪖', name: 'Casque de sécurité', color: '#f59e0b' },
    { emoji: '🧤', name: 'Gants de protection', color: '#3b82f6' },
    { emoji: '🥽', name: 'Lunettes de protection', color: '#10b981' },
    { emoji: '👟', name: 'Chaussures de sécurité', color: '#8b5cf6' },
];

function EPISlider() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % EPI_ITEMS.length);
        }, 2800);
        return () => clearInterval(interval);
    }, []);

    const item = EPI_ITEMS[current];

    return (
        <div className="epi-card">
            <div className="epi-card__left">
                <span className="epi-card__eyebrow">Avantage exclusif</span>
                <h2 className="epi-card__title">À L'INSCRIPTION</h2>
                <p className="epi-card__subtitle">
                    vous recevrez vos équipements de protection individuelle (EPI) :
                </p>
                <div className="epi-card__dots">
                    {EPI_ITEMS.map((_, i) => (
                        <button
                            key={i}
                            className={`epi-dot ${i === current ? 'active' : ''}`}
                            onClick={() => setCurrent(i)}
                            aria-label={`Voir ${EPI_ITEMS[i].name}`}
                        />
                    ))}
                </div>
            </div>
            <div className="epi-card__right">
                {EPI_ITEMS.map((epi, i) => (
                    <div
                        key={i}
                        className={`epi-slide ${i === current ? 'active' : ''}`}
                        style={{ '--epi-color': epi.color }}
                    >
                        <div className="epi-slide__icon-wrapper">
                            <span className="epi-slide__icon">{epi.emoji}</span>
                        </div>
                        <p className="epi-slide__name">{epi.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function InscriptionPage() {
    const { config } = useConfig();
    const formations = config.formations || [];

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const formData = new FormData(e.target);
        const data = {
            first_name: formData.get('firstname'),
            last_name: formData.get('lastname'),
            email: formData.get('email') || '',
            phone: formData.get('phone'),
            formation: formData.get('formation'),
            status_type: formData.get('status'),
            message: formData.get('message') || ''
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/inscriptions/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setSuccess(true);
                e.target.reset();
                setTimeout(() => setSuccess(false), 8000);
            } else {
                const errorData = await response.json();
                console.error('Erreur inscription:', errorData);
                alert("Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
            }
        } catch (error) {
            console.error('Network error:', error);
            alert("Erreur de connexion au serveur.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="inscription-page">
            {/* ── HERO SPLIT SECTION ────────────────────── */}
            <section className="inscription-hero">
                <div className="inscription-hero__bg-split"></div>
                <div className="container inscription-hero__inner">
                    <div className="inscription-hero__content reveal">
                        <h1>Rejoignez <span>l&apos;Excellence</span></h1>
                        <p>Prêt à donner un nouvel élan à votre carrière ? Remplissez le formulaire de pré-inscription ci-dessous.</p>
                    </div>
                </div>
            </section>

            {/* ── FORM & INFO ───────────────────────────── */}
            <section className="section inscription-main">
                {/* ── EPI CARD ── */}
                <div className="container" style={{ marginBottom: 'var(--space-2xl)' }}>
                    <EPISlider />
                </div>

                <div className="container inscription-layout">

                    {/* Form */}
                    <div className="inscription-form-wrapper">
                        {success ? (
                            <div className="inscription-success">
                                <div className="inscription-success__icon">✓</div>
                                <h3>Demande envoyée !</h3>
                                <p>Merci de votre intérêt. Notre équipe de scolarité vous recontactera sous 48 heures ouvrées.</p>
                            </div>
                        ) : (
                            <form className="inscription-form" onSubmit={handleSubmit}>
                                <div className="form-group row">
                                    <div className="input-field">
                                        <label htmlFor="lastname">Nom *</label>
                                        <input type="text" id="lastname" name="lastname" required placeholder="Ex: Koudou" />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="firstname">Prénom *</label>
                                        <input type="text" id="firstname" name="firstname" required placeholder="Ex: Tresor" />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="input-field">
                                        <label htmlFor="email">Email <span style={{ fontWeight: 400, opacity: 0.65, fontSize: '0.85em' }}>(optionnel)</span></label>
                                        <input type="email" id="email" name="email" placeholder="koudoutresor@gmail.com" />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="phone">Téléphone *</label>
                                        <input type="tel" id="phone" name="phone" required placeholder="+237 699 99 99 99" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="formation">Formation souhaitée *</label>
                                    <select id="formation" name="formation" required>
                                        <option value="">Sélectionnez une formation</option>
                                        {formations.map(f => (
                                            <option key={f.id} value={f.id}>{f.title} ({f.level})</option>
                                        ))}
                                        <option value="other">Autre / Demande d'information</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="status">Votre statut actuel</label>
                                    <select id="status" name="status">
                                        <option value="">Sélectionnez un statut</option>
                                        <option value="student">Sans diplôme</option>
                                        <option value="baccalaureat">En recherche de Formation</option>
                                        <option value="student">Étudiant(e)</option>
                                        <option value="pro">Professionnel(le) en activité</option>
                                        <option value="seeking">En recherche d'emploi</option>
                                        <option value="other">Autre</option>
                                    </select>
                                </div>

                                {/*<div className="form-group">
                                    <label htmlFor="message">Message / Questions (optionnel)</label>
                                    <textarea id="message" name="message" rows="4" placeholder="Précisez votre projet professionnel ou posez vos questions..."></textarea>
                                </div> */}

                                <p className="form-disclaimer">
                                    En soumettant ce formulaire, j'accepte que les informations saisies soient exploitées dans le cadre de ma demande d'inscription et de la relation commerciale qui peut en découler.
                                </p>

                                {/*config.registrationFee && (
                                    <div className="form-fee-notice">
                                        <span className="form-fee-notice__icon">💳</span>
                                        <span>Frais d'inscription : <strong>{config.registrationFee}</strong></span>
                                    </div>
                                )*/}

                                <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
                                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Info Panel */}
                    <aside className="inscription-info">
                        <div className="info-block">
                            <h3>Admission</h3>
                            <p><a href={`mailto:${config.email || 'admission@ifpmeb.tg'}`}>{config.email || 'admission@ifpmeb.tg'}</a></p>
                            <p><a href={`tel:${(config.phone || '+228 22 21 00 00').replace(/\s/g, '')}`}>{config.phone || '+228 22 21 00 00'}</a></p>
                        </div>

                        <div className="info-block">
                            <h3>Adresse du Campus</h3>
                            <p>{config.siteName || 'IFPMEB'}<br />{config.address || 'Quartier Administratif'}<br />{config.city || 'Lomé'}, {config.country || 'Togo'}</p>
                        </div>

                        <div className="info-block">
                            <h3>Horaires du secrétariat</h3>
                            <p>Lundi - Vendredi<br />08:00 - 17:30</p>
                            <p>Samedi<br />08:00 - 12:30</p>
                        </div>

                        {config.registrationFee && (
                            <div className="info-block" style={{ backgroundColor: 'rgba(255, 183, 3, 0.1)', borderLeft: '4px solid var(--color-primary-orange)' }}>
                                {/*<h3 style={{ color: 'var(--color-primary-orange)' }}>Frais de dossier</h3> */}
                                <p>Finaliser son inscription: <strong>{config.registrationFee}</strong> devront être réglés.</p>
                            </div>
                        )}

                        {config.whatsappNumber && (
                            <div className="info-block info-block--accent">
                                <h3>Besoin d'aide ?</h3>
                                <p>Notre équipe est disponible sur WhatsApp pour répondre à vos questions en direct.</p>
                                <a href={`https://wa.me/${config.whatsappNumber.replace(/\s/g, '')}`} target="_blank" rel="noreferrer" className="btn btn-outline-light mt-sm">
                                    <span>💬</span> WhatsApp
                                </a>
                            </div>
                        )}
                    </aside>

                </div>
            </section>

        </main>
    );
}
