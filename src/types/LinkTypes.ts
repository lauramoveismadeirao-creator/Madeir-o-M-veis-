// Types and interfaces for the link card system

export type LinkCategory = 'catalog' | 'contact' | 'location' | 'social' | 'service';

export type ColorTheme = 
  | 'primary'    // Main brand colors
  | 'secondary'  // Supporting colors  
  | 'neutral'    // Neutral tones
  | 'warm'       // Warm earth tones
  | 'featured';  // Special highlight colors

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  instagram: string;
  email?: string;
  address: {
    main: string;
    secondary?: string;
  };
}

export interface LinkData {
  id: number;
  title: string;
  url: string;
  icon: string;
  description: string;
  
  // Visual styling
  colorTheme: ColorTheme;
  bgImage?: string;
  
  // Organization and behavior
  category: LinkCategory;
  priority: number; // 1-10, higher = more important
  featured?: boolean;
  isActive: boolean;
  
  // Optional metadata
  analytics?: {
    trackingId?: string;
    eventName?: string;
  };
  
  // Accessibility
  ariaLabel?: string;
  
  // Display options
  openInNewTab?: boolean;
}

export interface ThemeColors {
  [key in ColorTheme]: {
    gradient: string;
    hover: string;
    border: string;
    ring?: string;
  };
}

// Configuration interface for the app
export interface AppConfig {
  companyInfo: {
    name: string;
    tagline: string;
    logo: string;
  };
  contactInfo: ContactInfo;
  themeColors: ThemeColors;
  socialMedia: {
    instagram: string;
  };
}