import { LinkData } from '../types/LinkTypes';
import { appConfig } from '../data/appConfig';

// Utility functions for link handling and theming

/**
 * Get theme colors for a specific link
 */
export const getThemeColors = (link: LinkData) => {
  const theme = appConfig.themeColors[link.colorTheme];
  return {
    gradient: theme.gradient,
    hover: theme.hover,
    border: theme.border,
    ring: theme.ring || ''
  };
};

/**
 * Generate grid span classes for responsive asymmetrical layout
 */
export const getGridSpan = (index: number): string => {
  const spans = [
    "md:col-span-8", // Hero featured card - maximum impact
    "md:col-span-4", // Compact vertical card
    "md:col-span-5", // Medium emphasis
    "md:col-span-7", // Wide secondary feature
  ];
  return spans[index] || "md:col-span-6";
};

/**
 * Generate height classes for different card priorities
 */
export const getHeightClass = (index: number): string => {
  const heights = [
    "min-h-[220px]", // Hero card - commanding presence
    "min-h-[200px]", // Tall vertical accent
    "min-h-[180px]", // Balanced medium
    "min-h-[160px]"  // Elegant compact
  ];
  return heights[index] || "min-h-[160px]";
};

/**
 * Simplified positioning for better compatibility
 */
export const getPositioning = (index: number): string => {
  if (index === 1) return "md:row-start-1";
  return "";
};

/**
 * Track analytics events when links are clicked
 */
export const trackLinkClick = (link: LinkData) => {
  if (link.analytics && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', link.analytics.eventName || 'link_click', {
      'custom_parameter': link.analytics.trackingId || link.id.toString(),
      'link_title': link.title,
      'link_category': link.category
    });
  }
  
  // Console log for development
  console.log(`Link clicked: ${link.title} (${link.category})`);
};

/**
 * Validate link data structure
 */
export const validateLinkData = (link: LinkData): boolean => {
  const requiredFields = ['id', 'title', 'url', 'icon', 'description', 'colorTheme', 'category', 'priority', 'isActive'];
  
  for (const field of requiredFields) {
    if (!(field in link) || link[field as keyof LinkData] === undefined) {
      console.warn(`Missing required field '${field}' in link:`, link);
      return false;
    }
  }
  
  return true;
};

/**
 * Format WhatsApp URL with proper encoding
 */
export const formatWhatsAppUrl = (phone: string, message: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
};

/**
 * Format phone URL for tel: links
 */
export const formatPhoneUrl = (phone: string): string => {
  return `tel:${phone}`;
};

/**
 * Generate accessibility attributes for links
 */
export const getAccessibilityProps = (link: LinkData) => {
  return {
    'aria-label': link.ariaLabel || `${link.title}: ${link.description}`,
    'role': 'button',
    'tabIndex': 0
  };
};