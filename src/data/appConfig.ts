import { AppConfig, LinkData } from '../types/LinkTypes';

// Centralized configuration for the application
export const appConfig: AppConfig = {
  companyInfo: {
    name: "Móveis Madeirão",
    tagline: "Madeira de Demolição                Tricô Náutico -                           Arte & Funcionalidade",
    logo: "/assets/placa-logo.png"
  },
  
  contactInfo: {
    phone: "+5562999887755",
    whatsapp: "5562999887755",
    instagram: "@moveismadeirao",
    address: {
      main: "Alexânia, Goiás",
      secondary: "Outlet Premium Brasília"
    }
  },
  
  themeColors: {
    primary: {
      gradient: "from-amber-50/95 to-amber-100/90",
      hover: "from-amber-100/95 to-amber-200/90",
      border: "border-amber-200/40 hover:border-amber-300/60",
      ring: "ring-amber-200/30 hover:ring-amber-300/40"
    },
    secondary: {
      gradient: "from-stone-50/95 to-warm-gray-100/90",
      hover: "from-stone-100/95 to-warm-gray-200/90",
      border: "border-stone-200/40 hover:border-stone-300/60"
    },
    neutral: {
      gradient: "from-neutral-50/95 to-stone-100/90",
      hover: "from-neutral-100/95 to-stone-200/90",
      border: "border-neutral-200/40 hover:border-neutral-300/60"
    },
    warm: {
      gradient: "from-warm-gray-50/95 to-stone-100/90",
      hover: "from-warm-gray-100/95 to-stone-200/90",
      border: "border-warm-gray-200/40 hover:border-warm-gray-300/60"
    },
    featured: {
      gradient: "from-stone-50/95 to-warm-gray-100/90",
      hover: "from-stone-100/95 to-warm-gray-200/90",
      border: "border-stone-200/30 hover:border-stone-300/50",
      ring: "ring-amber-200/30 hover:ring-amber-300/40"
    }
  },
  
  socialMedia: {
    instagram: "@moveismadeirao"
  }
};

// Standardized link data with proper typing and organization
export const linksData: LinkData[] = [
  {
    id: 1,
    title: "Catálogo Premium",
    url: `https://wa.me/${appConfig.contactInfo.whatsapp}?text=Olá! Gostaria de ver o catálogo premium de móveis`,
    icon: "🛒",
    description: "Explore nossa coleção exclusiva de móveis artesanais",
    colorTheme: "featured",
    bgImage: "/assets/catalog-premium.png",
    category: "catalog",
    priority: 10,
    featured: true,
    isActive: true,
    ariaLabel: "Acessar catálogo premium de móveis",
    analytics: {
      eventName: "catalog_click",
      trackingId: "catalog_premium"
    },
    openInNewTab: false
  },
  {
    id: 2,
    title: "Faça seu Orçamento",
    url: "https://w.app/ujagqa",
    icon: "📞",
    description: "Atendimento personalizado para seu projeto dos sonhos",
    colorTheme: "secondary",
    bgImage: "/assets/budget-request.png",
    category: "contact",
    priority: 9,
    isActive: true,
    ariaLabel: "Ligar para fazer orçamento",
    analytics: {
      eventName: "phone_call",
      trackingId: "budget_request"
    },
    openInNewTab: false
  },
  {
    id: 3,
    title: "Showroom Alexânia",
    url: "https://maps.app.goo.gl/CKESFBW3PiQim7ot7?g_st=ipc",
    icon: "🏪",
    description: "",
    colorTheme: "warm",
    bgImage: "/assets/showroom-alexania.jpg",
    category: "location",
    priority: 8,
    isActive: true,
    ariaLabel: "Informações sobre showroom em Alexânia",
    analytics: {
      eventName: "showroom_interest",
      trackingId: "alexania_location"
    },
    openInNewTab: false
  },
  {
    id: 4,
    title: "Showroom Outlet Premium Brasília",
    url: "https://maps.app.goo.gl/KuFJWFTcMzgbChTX9?g_st=ipc",
    icon: "📍",
    description: "",
    colorTheme: "neutral",
    bgImage: "/assets/outlet-brasilia.png",
    category: "location",
    priority: 7,
    isActive: true,
    ariaLabel: "Informações sobre outlet em Brasília",
    analytics: {
      eventName: "outlet_interest",
      trackingId: "brasilia_location"
    },
    openInNewTab: false
  }
];

// Helper functions for data manipulation
export const getActiveLinks = () => linksData.filter(link => link.isActive);

export const getLinksByCategory = (category: LinkData['category']) => 
  linksData.filter(link => link.category === category && link.isActive);

export const getFeaturedLinks = () => 
  linksData.filter(link => link.featured && link.isActive);

export const getSortedLinks = () => 
  [...linksData].sort((a, b) => b.priority - a.priority).filter(link => link.isActive);