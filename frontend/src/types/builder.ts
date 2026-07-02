// Types pour le builder de site académique (IFPMEB)

export interface GalleryImage {
  id: string;
  url: string;
  category: string;
  label?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // ex: "Diplômé BTS 2023"
  content: string;
  rating: number;
}

export interface Formation {
  id: string;
  title: string;
  description: string;
  objectives: string;
  career_prospects: string;
  admission_requirements?: string; // Conditions d'admission / constitution des dossiers
  duration: string;
  level: string; // ex: "BAC+2"
  domain: string; // ex: "Banque & Finance"
  price: string;
  installments?: { name: string; amount: string }[];
  features: string[]; // ex: ["Stage inclus", "Certification"]
  image?: string;
}

export interface ExamResult {
  id: string;
  year: string;
  program: string;
  result_text: string;
}

export interface AcademicEvent {
  id: string;
  date: string;
  title: string;
  type: string; // ex: "JPO", "Concours"
  lieu: string;
  description: string;
  image?: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  icon: string;
}

export interface SiteConfig {
  // Informations générales
  siteName: string;
  tagline: string;
  description: string;
  logo?: string;
  whatsappNumber: string;
  registrationFee?: string;

  // Couleurs institutionnelles
  primaryColor: string; // Bleu IFPMEB
  secondaryColor: string; // Or/Jaune IFPMEB
  accentColor: string;
  backgroundColor: string;
  textColor: string;

  // Contact Admission
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;

  // À Propos
  aboutDescription?: string;
  history?: string;
  mission?: string;
  foundationYear?: string;
  aboutImage?: string;

  // Réseaux sociaux
  socials: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    linkedin?: string;
  };

  // Contenu dynamique
  hero: {
    title: string;
    subtitle: string;
    eyebrow: string;
    backgroundImage?: string;
  };

  stats: StatItem[];
  examResults: ExamResult[];
  formations: Formation[];
  events: AcademicEvent[];
  gallery: GalleryImage[];
  testimonials: Testimonial[];

  flashInfo?: {
    enabled: boolean;
    title: string;
    subtitle: string;
    buttonText: string;
    whatsappMessage?: string;
    backgroundImage?: string;
  };

  // Sections activées
  enabledSections: {
    hero: boolean;
    stats: boolean;
    formations: boolean;
    events: boolean;
    gallery: boolean;
    testimonials: boolean;
    contact: boolean;
  };
  total_visitors: number;
}

export interface BuilderStep {
  id: string;
  title: string;
  description: string;
  component: string;
}

export const defaultSiteConfig: SiteConfig = {
  siteName: "",
  tagline: "",
  description: "",
  whatsappNumber: "",
  registrationFee: "",

  primaryColor: "#1d3557",
  secondaryColor: "#ffb703",
  accentColor: "#457b9d",
  backgroundColor: "#ffffff",
  textColor: "#1d3557",

  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",

  socials: {
    instagram: "",
    facebook: "",
    twitter: "",
    youtube: "",
    linkedin: ""
  },

  hero: {
    eyebrow: "",
    title: "",
    subtitle: "",
    backgroundImage: ""
  },

  stats: [],
  examResults: [],
  formations: [],
  events: [],
  gallery: [],
  testimonials: [],

  enabledSections: {
    hero: true,
    stats: true,
    formations: true,
    events: true,
    gallery: true,
    testimonials: true,
    contact: true
  },
  total_visitors: 0
};

export const builderSteps: BuilderStep[] = [
  {
    id: "welcome",
    title: "Bienvenue",
    description: "Configuration de votre portail IFPMEB",
    component: "WelcomeStep"
  },
  {
    id: "info",
    title: "Infos Institut",
    description: "Nom, slogan et contact admission",
    component: "InfoStep"
  },
  {
    id: "branding",
    title: "Design & Couleurs",
    description: "Palette institutionnelle et polices",
    component: "BrandingStep"
  },
  {
    id: "hero",
    title: "Bannière Hero",
    description: "Message d'accueil et image de fond",
    component: "HeroStep"
  },
  {
    id: "stats",
    title: "Résultats et Chiffres Clés",
    description: "Mettez en avant vos réussites et palmarès",
    component: "StatsStep"
  },
  {
    id: "formations",
    title: "Nos Formations",
    description: "Gérez votre catalogue de programmes",
    component: "FormationsStep"
  },
  {
    id: "events",
    title: "Événements",
    description: "Calendrier académique et actualités",
    component: "EventsStep"
  },
  {
    id: "gallery",
    title: "Galerie",
    description: "Album photo de l'institut",
    component: "PortfolioStep"
  },
  {
    id: "testimonials",
    title: "Succès Étudiants",
    description: "Témoignages et parcours",
    component: "TestimonialsStep"
  },
  {
    id: "contact",
    title: "Contact & WhatsApp",
    description: "Coordonnées et liens sociaux",
    component: "ContactStep"
  },
  {
    id: "publish",
    title: "Publier",
    description: "Sauvegardez vos modifications",
    component: "PublishStep"
  }
];
