Create a React boilerplate for a modern and elegant training center website called "IFPMEB". The
website should have a multi-page structure with the following navigation: Accueil, Nos formations, Résultats, Événements, Galerie, Admission & tarifs, À propos, and Inscription.

---
1. BOILERPLATE PROMPT (Structure & Components)

HERO SECTION STRUCTURE (Home Page - Eurobanner)
The hero section (Eurobanner) must follow this elegant and professional layout:
┌──────────────────────────────────────────────────────────────────────────────┐
│  NAVBAR                                                                      │
│  [Logo] [Nos formations] [Résultats] [Événements] [Galerie] [À propos] [CTA] │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│                                                                              │
│             ╔═══════════════════════════════════════════════╗                │
│             ║               [HEADLINE_MAIN]                 ║                │
│             ║      UNE FORMATION D'EXCELLENCE POUR          ║                │
│             ║             VOTRE AVENIR PRO                  ║                │
│             ╚═══════════════════════════════════════════════╝                │
│                                                                              │
│             [SUBTEXT] "Découvrez nos programmes certifiants                  │
│              et donnez un élan à votre carrière."                            │
│                                                                              │
│                    ┌──────────────────────────┐                              │
│                    │  [CTA_PRIMARY]           │                              │
│                    │  "Découvrir nos          │                              │
│                    │   formations"            │                              │
│                    └──────────────────────────┘                              │
│                                                                              │
│                                                                              │
│  [BACKGROUND_MEDIA] (Full-width Eurobanner image or video placeholder)        │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘

PLACEHOLDER COMPONENTS TO CREATE:
1. MediaPlaceholder - A reusable component for Eurobanners/Galleries:
   - `id` (string): unique identifier
   - `type` (string): "image" | "video"
   - `aspectRatio` (string): e.g., "16/9", "21/9"
   - `label` (string): description of the visual content
2. TrainingCard - For the list of formations:
   - `title`, `description`, `duration`, `level`
   - Includes an `ImagePlaceholder` for the course visual.
3. ResultFilter - For the Results page:
   - Dropdowns for [YEAR] and [EXAM_TYPE].
4. RegistrationForm - For the Inscription page:
   - Fields: Nom, Email, Téléphone, Formation choisie, Message.
   - Logic: Redirect to WhatsApp with a pre-filled message on submit.

PAGE STRUCTURE:
/src
  /components
    /ui
      MediaPlaceholder.jsx
      TrainingCard.jsx
      ResultFilter.jsx
      StatBlock.jsx (for Key Figures)
    /layout
      Navbar.jsx
      Footer.jsx
    /forms
      InscriptionForm.jsx
  /pages
    HomePage.jsx
    FormationsPage.jsx
    ResultatsPage.jsx
    EvenementsPage.jsx
    GaleriePage.jsx
    AdmissionTarifsPage.jsx
    AProposPage.jsx
    InscriptionPage.jsx
  /styles
    globals.css
    theme.css

ADDITIONAL SECTIONS (with placeholders):
1. Key Figures (Chiffres Clés) - A dynamic row of statistics (Success rate, Student count, etc.)
2. Featured Trainings - Grid of 3-4 top training cards.
3. Events Preview - List of upcoming dates/events.
4. Gallery Preview - Small grid of thumbnails with a lightbox effect placeholder.

STYLING REQUIREMENTS:
- Primary colors: Deep Academic Blue, Elegant Gold, and clean White.
- Professional typography (Serif for titles, Sans-serif for body).
- Responsive design for Mobile, Tablet, and Desktop.
- Smooth transitions and fast loading.

DO NOT:
- Include any actual images (use MediaPlaceholder).
- Add real content - use [BRACKET_PLACEHOLDERS] for all text.
- Use generic placeholders - ensure they follow the "IFPMEB" context.

---
2. ASSET GENERATION PROMPT

Prompt:
Based on the IFPMEB training center website boilerplate, generate ALL visual assets needed. The aesthetic should be ELEGANT, ACADEMIC, and MODERN (Sorbonne style).

ASSET GENERATION REQUIREMENTS:
A. LOGO & BRAND ASSETS
1. Primary Logo (logo-ifpmeb.svg)
   - Modern, authoritative logomark + "IFPMEB" wordmark.
   - Should work perfectly on both light (off-white) and dark (deep blue) backgrounds.
   - Style: Serious, academic, elegant. Use geometric precision balanced with classical proportions.
   - Color: Deep Academic Blue (#003366) and Elegant Gold (#C5A059).
   - Export: SVG format with optimized paths.
2. Logo Icon Only (logo-icon.svg)
   - The logomark/symbol without the "IFPMEB" text for use in secondary positions.
   - Should be recognizable even at very small sizes (e.g., as a bullet point or in the navbar).
3. Favicon (favicon.ico / favicon.svg)
   - Multi-resolution ico (16x16, 32x32) and a crisp SVG version.
   - Based on the simplified logo icon.

B. HERO & BACKGROUND ASSETS
3. Hero Banner Background (hero-bg.jpg)
   - Dimensions: 1920x1080px.
   - Content: High-quality photo of a modern campus, a bright classroom, or a student in a professional setting.
   - Style: Professional photography, bright and inspiring.
4. Statistics Icons (3-4 icons)
   - Success rate (graduation cap), Student count (users), Experience (calendar).

C. TRAINING ASSETS
5. Training Thumbnails (4 images)
   - Represetning different fields (e.g., Management, Tech, Health, Arts).
   - Style: Professional, realistic, cohesive.

D. GALLERY ASSETS
6. Gallery Items (6-8 images/video placeholders)
   - Campus life, graduation ceremony, workshops, student projects.

E. UI ICONS (SVG)
7. Navigation & Action Icons
   - Arrows, Menu, Search, WhatsApp icon for registration.

---
3. DESIGN PROMPT

Prompt:
Transform the IFPMEB website boilerplate into a fully designed, production-ready website. The design should be ELEGANT, RELIABLE, and ACADEMIC.

DESIGN DIRECTION:
Aesthetic Vision:
- Tone: Institutional, prestigious, but welcoming.
- Inspiration: Sorbonne Université, Harvard, or modern European academic portals.
- Key Elements: Clean lines, generous white space, high-quality professional imagery.

Color System:
:root {
  --color-primary-blue: #003366;
  --color-primary-gold: orange;
  --color-accent-gold-light: #E8D5B5;
  --color-bg-white: #FFFFFF;
  --color-bg-gray: #F8F9FA;
  --color-text-dark: #1A1A1A;
  --color-text-muted: #6C757D;
}

Typography:
- Title Font: "Playfair Display" or "Libre Baskerville" (Serif) - Represents tradition, authority, and academic prestige.
- Body Font: "Inter" or "Open Sans" (Sans-serif) - Represents modern clarity, accessibility, and professional efficiency.
- Accent Font: "Montserrat" (Sans-serif, Bold) - For buttons and navigation items.

/ Typography Scale (Fluid) /
--text-hero: clamp(3.5rem, 8vw, 6rem);
--text-h1: clamp(2.5rem, 5vw, 4rem);
--text-h2: clamp(2rem, 4vw, 3rem);
--text-h3: clamp(1.5rem, 3vw, 2rem);
--text-body: 1.125rem;
--text-small: 0.875rem;
--text-caption: 0.75rem;

PAGE DESIGNS:
PAGE 1: ACCUEIL (HOME)
- Eurobanner: Impactful image, overlay with Blue/Gold glassmorphism effect for the headline.
- Chiffres Clés: Large numbers in Gold, labels in Blue.
- Formations Phares: Cards with subtle shadows and Gold border on hover.
- WhatsApp CTA: Floating button or fixed block at the bottom with the WhatsApp logo.

PAGE 2: NOS FORMATIONS
- Interactive Filters: Sidebar or top bar to filter by Category and Duration.
- List: Clean grid of cards. Each card has a "En savoir plus" and "S'inscrire" button.

PAGE 3: RÉSULTATS
- Table view: Clear headers, zebra-striped rows for readability.
- PDF Export: A gold "Télécharger les résultats (PDF)" button.

PAGE 4: INSCRIPTION
- Form: Minimalist, centered, with clear validation states.
- Success State: Smooth transition to the WhatsApp redirection message.

ANIMATIONS:
- Subtle fade-in on scroll.
- Gentle hover lift for training cards.
- Smooth transitions between pages.

RESPONSIVE:
- Mobile-optimized navigation (Side drawer).
- Stacked layouts for cards and stats.

---
USAGE NOTES:
1. Run Section 1 → Establish the academic structure.
2. Run Section 2 → Generate the prestigious assets.
3. Run Section 3 → Apply the elegant design and professional content.