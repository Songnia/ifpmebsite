import { useEffect } from 'react';
import MediaPlaceholder from '../components/ui/MediaPlaceholder';
import { useConfig } from '@/context/ConfigContext';
import './AProposPage.css';

export default function AProposPage() {
    const { config } = useConfig();

    const siteName = config?.siteName || 'IFPMEB';
    const aboutDescription = config?.aboutDescription || 'Notre établissement, notre mission et notre équipe.';
    const history = config?.history || '';
    const mission = config?.mission || '';
    const foundationYear = config?.foundationYear || '';
    const aboutImage = config?.aboutImage || null;

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
                    <h1>À propos<br /><span>de l&apos;{siteName}</span></h1>
                    <p>{aboutDescription}</p>
                </div>
            </section>

            {/* Histoire & Mission */}
            <section className="section">
                <div className="container apropos-intro">
                    <div className="apropos-intro__text reveal">
                        <h2>Notre histoire</h2>
                        <div className="divider-gold" style={{ margin: '1rem 0 1.5rem' }} />
                        {history ? (
                            <p>{history}</p>
                        ) : (
                            <p>
                                {foundationYear ? `Fondé en ${foundationYear}, ` : ''}
                                l&apos;{siteName} s&apos;est imposé comme un acteur majeur de la formation professionnelle dans la région.
                            </p>
                        )}
                        <br />
                        <h3>Notre mission</h3>
                        <p>{mission || 'Nous nous engageons à former des professionnels compétents et polyvalents, capables de répondre aux exigences du marché du travail actuel.'}</p>
                        <br />
                        <a href="/inscription" className="btn btn-primary">Rejoindre l&apos;{siteName}</a>
                    </div>
                    <div className="apropos-intro__media reveal">
                        {aboutImage ? (
                            <img src={aboutImage} alt={`Campus ${siteName}`} className="about-image" />
                        ) : (
                            <MediaPlaceholder
                                id="apropos-campus"
                                type="image"
                                aspectRatio="4/3"
                                label="Photo du directeur ou vue du campus principal"
                            />
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
