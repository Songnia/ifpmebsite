Transform the IFPMEB website boilerplate into a fully designed, production-ready website. The
institution is called "IFPMEB" (Institut de Formation Professionnelle aux Métiers de l'Entreprise et de la Banque) and the design should be PROFESSIONAL, INSPIRING, and ACADEMIC yet MODERN.

DESIGN DIRECTION:

Aesthetic Vision
●​ Tone: Professional, academic, trustworthy, and focused on excellence.
●​ Mood: Inspiring and structured - an institute that empowers students to build their future.
●​ Differentiation: Clean integration of Orange and Blue, structured and readable layouts, with dynamic elements that highlight success and growth.

Color System
:root {
/* Primary */
--color-blue: #003366; /* Deep Trust Blue */
--color-blue-light: #00509E;

/* Secondary */
--color-orange: #F39C12; /* Energetic Orange */
--color-orange-light: #F5B041;

/* Accent */
--color-gold: #D4AF37; /* Academic Excellence */
--color-coral: #E74C3C;

/* Neutrals */
--color-black: #0A0A0A;
--color-dark: #1A1A1A;
--color-gray-dark: #2D2D2D;
--color-gray: #6B6B6B;
--color-gray-light: #E5E5E5;
--color-cream: #F8F9FA;
--color-white: #FFFFFF;
}

Typography
●​ Display Font: "Montserrat" or "Inter" - Bold, geometric, highly legible
●​ Body Font: "Open Sans" or "Roboto" - Clean, readable, contemporary
●​ Accent Font: "Merriweather" - For elegant academic highlights (optional)

/* Typography Scale */
--text-hero: clamp(3.5rem, 8vw, 6rem);
--text-h1: clamp(2.5rem, 5vw, 4rem);
--text-h2: clamp(2rem, 4vw, 3rem);
--text-h3: clamp(1.5rem, 3vw, 2rem);
--text-body: 1.125rem;
--text-small: 0.875rem;

PAGE DESIGNS

PAGE 1: HOME PAGE (ACCUEIL)
Hero Section Design:
●​ Background: Deep Blue (#003366) with subtle geometric overlay or campus background image
●​ Floating student/campus image: Positioned right, with soft shadow and rounded corners
●​ Information badges: "98% Taux de réussite", "Diplômes reconnus" floating around the hero image
●​ Typography: 
  ○ Main headline in White, mix of weights
  ○ Accent words in Orange
●​ CTA Buttons: Primary (Orange), Secondary (Outline White)

Content for Hero:
Headline: "Une formation d'excellence pour votre avenir professionnel"
Description: "Rejoignez l'IFPMEB. Nous formons les leaders de demain dans les métiers de la banque, de l'entreprise et des nouvelles technologies."
CTAs: "Découvrir nos formations", "S'inscrire"

Expertise/Formations Section Design:
●​ Background: White or light cream (#F8F9FA)
●​ Layout: Grid of 3-4 cards representing main study poles.
●​ Cards: Clean borders, subtle shadow drop on hover, icons in Orange.
●​ Section title in Blue, description text in gray.

Formations Cards Content:
Card 1 - Banque & Finance
"Maîtrisez les rouages de la finance moderne et de la gestion bancaire."
Card 2 - Gestion des Entreprises
"Développez des compétences managériales et stratégiques pour diriger."
Card 3 - Ressources Humaines
"Placez l'humain au centre de la performance de l'entreprise."
Card 4 - Marketing & Digital
"Devenez un expert de la communication et des stratégies digitales."

Partenaires / Alumni Section (Clients/Résultats):
●​ Background: White
●​ Logo display: Horizontal scroll or grid of partner companies and hiring institutions.
●​ Logos in grayscale, color on hover.

CTA Section Design:
●​ Background: Deep Blue
●​ Large typography: "PRÊT À BOOSTER VOTRE CARRIÈRE ?"
●​ Button: "Déposez votre candidature" (Orange)


PAGE 2: FORMATIONS PAGE
Hero Section:
●​ Large headline: "Nos Formations"
●​ Subheadline: "Des programmes conçus pour répondre aux exigences du marché du travail."
●​ Background: Gradient from white to light gray.

Formations Grid:
●​ Large feature cards for each FORMATION
●​ Each card includes:
  ○ Icon/illustration
  ○ Program name
  ○ Detailed description
  ○ "Compétences visées" (Target skills)
  ○ "Découvrir le programme" CTA

Formation Details Content:
FORMATION 1: Licence Banque & Finance
"Une formation complète pour accéder aux postes clés des institutions financières. De l'analyse de risque à la gestion de portefeuille."
Compétences visées:
• Analyse financière
• Gestion des risques
• Conformité bancaire
• Économie monétaire

FORMATION 2: Master Management et Stratégie
"Pour les futurs leaders. Apprenez à concevoir, mettre en œuvre et piloter la stratégie globale d'une entreprise."
Compétences visées:
• Stratégie d'entreprise
• Management d'équipe
• Gestion de projet
• Contrôle de gestion

Processus d'Admission Section (Process):
●​ Horizontal timeline/steps
●​ 4 steps: Dépôt de candidature → Entretien → Admission → Inscription
●​ Each step has an icon and brief description.


PAGE 3: ACTUALITÉS & ÉVÉNEMENTS (EVENEMENTS PAGE)
Hero:
●​ Featured/latest news highlighted large
●​ Headline: "Actualités & Événements"
●​ Subheadline: "La vie du campus, nos conférences et les dernières news de l'industrie."

Grid:
●​ Card-based layout
●​ 3 columns on desktop, responsive
●​ Each card: Featured image, category tag (ex: Conférence, Campus, Webinaire), title, excerpt, date.

Sidebar/Filter:
●​ Category filter (Campus, Entreprises, Alumnis)
●​ Search functionality
●​ Newsletter signup CTA


PAGE 4: INSCRIPTION / CONTACT PAGE
Hero:
●​ Headline: "Rejoignez-nous"
●​ Subheadline: "Posez vos questions ou entamez votre processus d'inscription."
●​ Background: Split design (white + blue)

Contact Form / Inscription Form:
Fields:
- Nom & Prénom (required)
- Email (required)
- Téléphone (required)
- Niveau d'études actuel (dropdown: Bac, Bac+2, Bac+3, Professionnel)
- Formation souhaitée (dropdown: Banque, Management, RH, Digital)
- Message / Lettre de motivation (textarea)
CTA Button: "Envoyer ma candidature / demande" (Orange)

Contact Information Panel:
Email: admission@ifpmeb.com
Téléphone: +228 XX XX XX XX
Adresse du Campus:
[Adresse IFPMEB]
Lomé, Togo
Horaires:
Lundi - Vendredi: 8h00 - 17h00

GLOBAL COMPONENTS
Navbar:
●​ Logo left
●​ Nav items center: À propos, Nos Formations, Résultats/Alumni, Événements, Contact
●​ CTA right: "S'inscrire" button (Orange with white text)
●​ Sticky on scroll with backdrop blur

Footer:
●​ Dark Blue background
●​ 4 columns: Logo/tagline, Liens Rapides, Formations, Contact
●​ Social icons (LinkedIn, Facebook, Instagram)
●​ Newsletter signup
●​ Copyright line

ANIMATIONS & INTERACTIONS
1. Page Load: Staggered fade-in of elements
2. Scroll Reveals: Elements animate in as they enter viewport
3. Hover Effects:
   ○ Buttons: Scale + shadow
   ○ Cards: Lift + subtle border highlight (Orange)
4. Transitions: Smooth page transitions

RESPONSIVE BREAKPOINTS
/* Mobile First */
--bp-sm: 640px; /* Large phones */
--bp-md: 768px; /* Tablets */
--bp-lg: 1024px; /* Small laptops */
--bp-xl: 1280px; /* Desktops */
--bp-2xl: 1536px; /* Large screens */