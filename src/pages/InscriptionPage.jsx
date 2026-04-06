import { useState, useEffect } from 'react';
import MediaPlaceholder from '../components/ui/MediaPlaceholder';
import './InscriptionPage.css';

export default function InscriptionPage() {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate network request
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);
            e.target.reset();
            // Auto-hide success after 8 seconds
            setTimeout(() => setSuccess(false), 8000);
        }, 1500);
    };

    return (
        <main className="inscription-page">
            {/* ── HERO SPLIT SECTION ────────────────────── */}
            <section className="inscription-hero">
                <div className="inscription-hero__bg-split"></div>
                <div className="container inscription-hero__inner">
                    <div className="inscription-hero__content reveal">
                        <h1>Rejoignez <span>l&apos;Excellence</span></h1>
                        <p>[TEXTE_INTRO_INSCRIPTION] – Prêt à donner un nouvel élan à votre carrière ? Remplissez le formulaire ci-dessous.</p>
                    </div>
                </div>
            </section>

            {/* ── FORM & INFO ───────────────────────────── */}
            <section className="section inscription-main">
                <div className="container inscription-layout">

                    {/* Form */}
                    <div className="inscription-form-wrapper reveal" style={{ transitionDelay: '0.2s' }}>
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
                                        <label htmlFor="firstname">Prénom *</label>
                                        <input type="text" id="firstname" required placeholder="Ex: Jean" />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="lastname">Nom *</label>
                                        <input type="text" id="lastname" required placeholder="Ex: Dupont" />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="input-field">
                                        <label htmlFor="email">Email *</label>
                                        <input type="email" id="email" required placeholder="jean.dupont@email.com" />
                                    </div>
                                    <div className="input-field">
                                        <label htmlFor="phone">Téléphone *</label>
                                        <input type="tel" id="phone" required placeholder="+228 XX XX XX XX" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="formation">Formation souhaitée *</label>
                                    <select id="formation" required>
                                        <option value="">Sélectionnez une formation</option>
                                        <option value="f1">[NOM_FORMATION_1]</option>
                                        <option value="f2">[NOM_FORMATION_2]</option>
                                        <option value="f3">[NOM_FORMATION_3]</option>
                                        <option value="f4">[NOM_FORMATION_4]</option>
                                        <option value="other">Autre / Demande d'information</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="status">Votre statut actuel</label>
                                    <select id="status">
                                        <option value="">Sélectionnez un statut</option>
                                        <option value="student">Étudiant(e)</option>
                                        <option value="pro">Professionnel(le) en activité</option>
                                        <option value="seeking">En recherche d'emploi</option>
                                        <option value="other">Autre</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message / Questions (optionnel)</label>
                                    <textarea id="message" rows="4" placeholder="Précisez votre projet professionnel ou posez vos questions..."></textarea>
                                </div>

                                <p className="form-disclaimer">
                                    En soumettant ce formulaire, j'accepte que les informations saisies soient exploitées dans le cadre de ma demande d'inscription et de la relation commerciale qui peut en découler.
                                </p>

                                <button type="submit" className="btn btn-primary w-full" disabled={isSubmitting}>
                                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Info Panel */}
                    <aside className="inscription-info reveal" style={{ transitionDelay: '0.4s' }}>
                        <div className="info-block">
                            <h3>Admission</h3>
                            <p><a href="mailto:[EMAIL_ADMISSION]">[EMAIL_ADMISSION]</a></p>
                            <p><a href="tel:[TELEPHONE_ADMISSION]">[TELEPHONE_ADMISSION]</a></p>
                        </div>

                        <div className="info-block">
                            <h3>Adresse du Campus</h3>
                            <p>[ADRESSE_LIGNE_1]<br />[ADRESSE_LIGNE_2]<br />[VILLE, PAYS]</p>
                        </div>

                        <div className="info-block">
                            <h3>Horaires du secrétariat</h3>
                            <p>Lundi - Vendredi<br />[HORAIRES_MATIN] - [HORAIRES_APREM]</p>
                            <p>Samedi<br />[HORAIRES_SAMEDI]</p>
                        </div>

                        <div className="info-block info-block--accent">
                            <h3>Besoin d'aide ?</h3>
                            <p>Notre équipe est disponible sur WhatsApp pour répondre à vos questions en direct.</p>
                            <a href="https://wa.me/[NUMERO_WHATSAPP]" target="_blank" rel="noreferrer" className="btn btn-outline-light mt-sm">
                                <span>💬</span> WhatsApp
                            </a>
                        </div>
                    </aside>

                </div>
            </section>

        </main>
    );
}
