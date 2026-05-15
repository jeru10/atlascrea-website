export const services = [
  {
    id: "branding",
    icon: "palette",
    title: "Branding & Identité",
    desc: "Création de logos, chartes graphiques complètes, guides de marque, et identités visuelles qui racontent votre histoire et captivent votre audience.",
    longDesc: "Nous créons des identités de marque mémorables qui communiquent vos valeurs et vous différencient de la concurrence. De la conception du logo à la charte graphique complète, chaque élément est pensé pour renforcer votre image de marque et créer une connexion émotionnelle avec votre audience.",
    items: ["Logo & Marque", "Charte Graphique", "Guide de Marque", "Brand Strategy"]
  },
  {
    id: "web",
    icon: "globe",
    title: "Création de Sites Web",
    desc: "Sites vitrines, e-commerce, landing pages sur WordPress, Webflow ou sur mesure. Design responsive et optimisé conversion.",
    longDesc: " Nous concevons des sites web professionnels qui allient design moderne et performance technique. Chaque site est optimisé pour le SEO, responsive sur tous les appareils, et conçu pour convertir vos visiteurs en clients. Technologies : WordPress, Astro, React, Next.js.",
    items: ["Sites Vitrines", "E-commerce", "Landing Pages", "WordPress"]
  },
  {
    id: "social",
    icon: "share2",
    title: "Social Media & Contenu",
    desc: "Stratégie réseaux sociaux, création de contenu visuel, community management et calendrier éditorial.",
    longDesc: " Nous développons une stratégie social media complète pour renforcer votre présence en ligne et engager votre communauté. De la création de contenu visuel au community management, nous gérons votre présence sur tous les réseaux sociaux pertinents pour votre activité.",
    items: ["Stratégie Social", "Création Contenu", "Community Mgmt", "Calendrier"]
  },
  {
    id: "print",
    icon: "printer",
    title: "Print & Supports Physiques",
    desc: "Flyers, brochures, cartes de visite, roll-ups, kakemonos et tous supports print pour votre communication offline.",
    longDesc: "Nos supports print allient créativité et qualité d'impression pour une communication offline percutante. De la carte de visite au roll-up grand format, chaque document est conçu pour refléter l'excellence de votre marque et marquer les esprits.",
    items: ["Flyers & Brochures", "Cartes de Visite", "Roll-ups", "Kakemonos"]
  },
  {
    id: "seo",
    icon: "search",
    title: "SEO & Référencement",
    desc: "Optimisation SEO on-page et off-page, audit technique, stratégie de mots-clés pour le marché marocain.",
    longDesc: "Notre approche SEO combine optimisation technique, contenu de qualité et stratégie de netlinking pour propulser votre site en tête des résultats de recherche. Spécialisés dans le marché marocain, nous vous aidons à atteindre vos clients locaux et nationaux.",
    items: ["Audit SEO", "Optimisation On-page", "Stratégie Mots-clés", "Netlinking"]
  },
  {
    id: "ads",
    icon: "megaphone",
    title: "Publicité Digitale",
    desc: "Campagnes Google Ads, Meta Ads (Facebook/Instagram), LinkedIn Ads. Optimisation ROI et tracking.",
    longDesc: "Nous concevons et gérons des campagnes publicitaires performantes sur les principales plateformes digitales. De la stratégie d'enchères à la création de visuels publicitaires, chaque campagne est optimisée pour maximiser votre retour sur investissement.",
    items: ["Google Ads", "Meta Ads", "LinkedIn Ads", "Tracking ROI"]
  }
];

export const statsData = [
  { value: 50, suffix: "+", label: "Projets livrés", icon: "briefcase" },
  { value: 100, suffix: "%", label: "Satisfaction client", icon: "smile" },
  { value: 1, suffix: "", label: "Interlocuteur unique", icon: "users" },
  { value: 48, suffix: "★", label: "Avis clients", icon: "star", prefix: "4." }
];

export const testimonials = [
  {
    name: "Omar Benali",
    role: "CEO, Munich Recruitment",
    text: "Un accompagnement sur-mesure et une écoute attentive. Notre site web est magnifique et notre branding reflète enfin notre identité. Merci à toute l'équipe !",
    rating: 5,
    avatar: "OB"
  },
  {
    name: "Salma Idrissi",
    role: "Fondatrice, Abdol Luxury Tour",
    text: "ATLAS CREA a transformé notre présence digitale. Leur approche 360° nous a permis d'avoir une communication cohérente sur tous les canaux. Résultats au-delà de nos attentes !",
    rating: 5,
    avatar: "SI"
  },
  {
    name: "Karim Tazi",
    role: "Directeur, Potentiel Consulting",
    text: "Professionnalisme et créativité au rendez-vous. Le site web est rapide, moderne et génère des leads qualifiés chaque semaine. Je recommande vivement !",
    rating: 5,
    avatar: "KT"
  }
];

export const certifications = [
  { name: "Google Partner", desc: "Certifié Google Ads", color: "#4285F4" },
  { name: "Elementor Expert", desc: "Développement WordPress", color: "#92003B" },
  { name: "Meta Certified", desc: "Publicité Meta", color: "#1877F2" }
];

export const skillsData = [
  { label: "Développement Web", value: 95 },
  { label: "Branding & Design", value: 92 },
  { label: "SEO & Référencement", value: 88 },
  { label: "Social Media", value: 85 }
];

export const portfolioWebsites = [
  { name: "Munich Recruitment", url: "https://www.munichrecruitment.com", desc: "Agence de recrutement", category: "Web", image: "images/portfolio/munich-recruitment.jpg" },
  { name: "Abdol Luxury Tour", url: "https://abdoluxurytour.com", desc: "Tourisme de luxe", category: "Web", image: "images/portfolio/abdoluxurytour.jpg" },
  { name: "Mondrap", url: "https://mondrap.com", desc: "Mode & Vêtements", category: "Web", image: "images/portfolio/mondrap.jpg" },
  { name: "Potentiel Consulting", url: "https://www.potentielconsulting.ma", desc: "Conseil & Consulting", category: "Web", image: "images/portfolio/potentiel-consulting.jpg" },
  { name: "Atlas Epic Trek", url: "https://atlasepictrek.com", desc: "Trekking & Aventure", category: "Web", image: "images/portfolio/atlasepictrek.jpg" },
  { name: "Charpente Maroc", url: "https://charpente-maroc.com", desc: "Construction Bois", category: "Web", image: "images/portfolio/charpente-maroc.jpg" }
];

export const pricingPlans = [
  {
    name: "Basic",
    price: "5 000",
    desc: "Idéal pour les TPE et startups",
    features: ["Site vitrine 5 pages", "Design responsive", "Formulaire de contact", "SEO de base", "Hébergement 1 an", "Support email"],
    featured: false
  },
  {
    name: "Pro",
    price: "12 000",
    desc: "Pour les PME ambitieuses",
    features: ["Site complet 10 pages", "Design 3D moderne", "Blog intégré", "SEO avancé", "Intégration réseaux sociaux", "Support prioritaire"],
    featured: true
  },
  {
    name: "Enterprise",
    price: "25 000",
    desc: "Solutions sur-mesure",
    features: ["Site personnalisé illimité", "E-commerce intégré", "Applications web", "SEO Premium", "Formation équipe", "Assistance 24/7"],
    featured: false
  }
];
