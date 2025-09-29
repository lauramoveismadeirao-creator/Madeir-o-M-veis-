import { memo, useMemo, useCallback, useState, useEffect, useRef } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import woodTextureHQ from './assets/wood-texture-hq.jpg';
import { LinkData } from './types/LinkTypes';
import { appConfig, getSortedLinks } from './data/appConfig';
import { 
  getThemeColors, 
  getGridSpan, 
  getHeightClass, 
  getPositioning, 
  trackLinkClick,
  getAccessibilityProps 
} from './utils/linkHelpers';

// Intersection Observer Hook for scroll animations
const useScrollAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return { ref, isInView };
};

// GlareHover Component
type GlareHoverProps = {
  children: ReactNode;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  className?: string;
  style?: CSSProperties;
};

const GlareHover = memo(({
  children,
  glareColor = '#ffffff',
  glareOpacity = 0.3,
  glareAngle = -30,
  glareSize = 300,
  transitionDuration = 800,
  className = '',
  style
}: GlareHoverProps) => {
  const rgbaValue = useMemo(() => {
    const hex = glareColor.replace('#', '');
    if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
    }
    return glareColor;
  }, [glareColor, glareOpacity]);

  const vars = useMemo(() => ({
    '--gh-angle': `${glareAngle}deg`,
    '--gh-duration': `${transitionDuration}ms`,
    '--gh-size': `${glareSize}%`,
    '--gh-rgba': rgbaValue,
  }), [glareAngle, glareSize, transitionDuration, rgbaValue]);

  return (
    <div
      className={`glare-hover ${className}`.trim()}
      style={{ ...vars, ...style }}
    >
      {children}
    </div>
  );
});
GlareHover.displayName = 'GlareHover';

// Helper function to add special highlight effects to specific phrases
const getHighlightedTitleStyles = (title: string) => {
  const highlightedTitles = [
    "Catálogo Premium",
    "Faça seu Orçamento", 
    "Showroom Alexânia",
    "Showroom Outlet Premium Brasília"
  ];
  
  if (highlightedTitles.includes(title)) {
    return "title-highlight";
  }
  
  return "drop-shadow-sm";
};

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Get standardized links data with proper typing
  const links: LinkData[] = useMemo(() => getSortedLinks(), []);

  const handleHoverChange = useCallback((id: number | null) => {
    setHoveredCard(id);
  }, []);

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced parallax background with sophisticated earth tone palette */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(87, 83, 78, 0.15) 0%, rgba(120, 113, 108, 0.12) 25%, rgba(168, 162, 158, 0.08) 50%, rgba(214, 211, 209, 0.06) 75%, rgba(245, 245, 244, 0.04) 100%), url('${woodTextureHQ}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          y: backgroundY
        }}
      />
      {/* Premium warm overlay with sophisticated depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-50/8 via-warm-gray-50/6 to-neutral-100/4" />
      {/* Refined grain texture with enhanced subtlety */}
      <div className="absolute inset-0 opacity-[0.012] bg-gradient-to-br from-stone-800/25 via-transparent to-stone-700/15" />
      {/* Additional depth layer for premium feel */}
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-50/3 via-transparent to-stone-100/2" />
      {/* Main Container with Asymmetrical Layout */}
      <div className="relative z-10 min-h-screen">
        <HeaderSection isLoaded={isLoaded} />

        <AsymmetricalGrid
          links={links}
          isLoaded={isLoaded}
          hoveredCard={hoveredCard}
          onHoverChange={handleHoverChange}
        />

        <div className="px-6 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Scroll indicator */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 1 }}
            >
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-stone-400 text-center"
              >
                <p className="text-sm font-medium mb-2">Role para ver mais</p>
                <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <ModernFooter />
      </div>
    </div>
  );
}

// Header Component with sophisticated animations
const HeaderSection = memo(({ isLoaded }: { isLoaded: boolean }) => {
  const { ref, isInView } = useScrollAnimation();
  
  return (
    <motion.header 
      ref={ref}
      className="pt-20 pb-4 px-6 text-center"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -30 }}
      transition={{ duration: 1.4, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="max-w-lg mx-auto mb-8">
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.9 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
        >
          <motion.img
            src="/assets/generated-logo.png"
            alt="Logo Móveis Madeirão"
            className="block w-full max-w-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 10 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            draggable={false}
          />
        </motion.div>
      </div>
    </motion.header>
  );
});

// Asymmetrical Grid with enhanced animations
const AsymmetricalGrid = memo(({ 
  links, 
  isLoaded, 
  hoveredCard, 
  onHoverChange 
}: {
  links: LinkData[];
  isLoaded: boolean;
  hoveredCard: number | null;
  onHoverChange: (id: number | null) => void;
}) => {
  const cards = useMemo(() => links.map((link, index) => ({ link, index })), [links]);

  return (
    <main className="flex-1 px-6 pt-6 pb-16">
      <div className="max-w-6xl mx-auto">
        {/* Dynamic asymmetrical masonry-style grid with scroll behavior */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 auto-rows-max">
          {cards.map(({ link, index }) => {
            const { ref, isInView } = useScrollAnimation();
            
            // Get layout properties from utility functions
            const gridSpan = getGridSpan(index);
            const heightClass = getHeightClass(index);
            const positioning = getPositioning(index);
            
            return (
              <motion.div
                key={link.id}
                ref={ref}
                className={`${gridSpan} ${positioning}`}
                initial={{ opacity: 0, y: 80, scale: 0.85, rotateX: 15, rotateY: 5 }}
                animate={{ 
                  opacity: isInView ? 1 : 0, 
                  y: isInView ? 0 : 80,
                  scale: isInView ? 1 : 0.85,
                  rotateX: isInView ? 0 : 15,
                  rotateY: isInView ? 0 : 5
                }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.4 + (index * 0.15),
                  ease: [0.165, 0.84, 0.44, 1]
                }}
                whileHover={{ 
                  y: link.featured ? -18 : -14,
                  scale: link.featured ? 1.04 : 1.02,
                  rotateX: -3,
                  rotateY: 1,
                  transition: { 
                    type: "spring", 
                    stiffness: 350, 
                    damping: 20,
                    mass: 0.8
                  }
                }}
                onHoverStart={() => onHoverChange(link.id)}
                onHoverEnd={() => onHoverChange(null)}
              >
                <EnhancedLinkCard 
                  link={link} 
                  heightClass={heightClass}
                  hoveredCard={hoveredCard}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
});

// Enhanced Link Card Component
const EnhancedLinkCard = memo(({ 
  link, 
  heightClass, 
  hoveredCard 
}: {
  link: LinkData;
  heightClass: string;
  hoveredCard: number | null;
}) => {
  const themeColors = useMemo(() => getThemeColors(link), [link]);
  const accessibilityProps = useMemo(() => getAccessibilityProps(link), [link]);
  
  const handleClick = useCallback(() => {
    trackLinkClick(link);
  }, [link]);
  return (
    <GlareHover
      glareColor="#ffffff"
      glareOpacity={0.2}
      glareAngle={-45}
      glareSize={180}
      transitionDuration={700}
    >
      <a
        href={link.url}
        target={link.openInNewTab ? "_blank" : "_self"}
        rel={link.openInNewTab ? "noopener noreferrer" : undefined}
        className="block group w-full h-full"
        onClick={handleClick}
        {...accessibilityProps}
      >
        <div className={`
          ${heightClass}
          bg-gradient-to-br ${themeColors.gradient}
          backdrop-blur-xl
          rounded-[2rem]
          p-8
          shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08),0_8px_16px_-8px_rgba(0,0,0,0.06)]
          ${themeColors.border}
          hover:shadow-[0_40px_80px_-12px_rgba(0,0,0,0.12),0_12px_24px_-8px_rgba(0,0,0,0.08)]
          transition-all duration-800
          relative
          overflow-hidden
          flex flex-col justify-between
          card-frame-crafted
          ${link.featured ? `ring-1 ${themeColors.ring}` : ''}
        `}>
          {/* Background image for featured cards with enhanced sophistication */}
          {link.bgImage && (
            <>
              <div 
                className="absolute inset-0 opacity-8 group-hover:opacity-12 transition-all duration-900 scale-105 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${link.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'sepia(15%) saturate(80%) brightness(105%)'
                }}
              />
              {/* Additional texture overlay for premium feel */}
              <div className="absolute inset-0 bg-gradient-to-br from-stone-100/15 via-transparent to-stone-200/10 group-hover:from-stone-50/20 transition-all duration-700" />
            </>
          )}
          
          {/* Sophisticated overlay patterns */}
          <div className="absolute inset-0 opacity-[0.08]">
            <div className="absolute inset-0 bg-gradient-to-br from-stone-900/30 via-transparent to-stone-700/20" />
          </div>
          
          {/* Refined texture overlay */}
          <div className="absolute inset-0 opacity-[0.02] bg-gradient-to-br from-stone-900/20 via-transparent to-stone-700/10" />

          {/* Content with enhanced typography */}
          <div className="relative z-10 flex items-start justify-between h-full">
            <div className="flex-1 flex flex-col justify-between h-full gap-6">
              <div className="flex items-start gap-4" role="presentation">

                <div
                  className="flex-1 space-y-2"
                  style={{
                    color: "#ffffff"
                  }}>
                  <h3 className={`${link.featured ? 'text-2xl' : 'text-xl'} font-semibold text-white group-hover:text-white transition-all duration-500 tracking-tight leading-tight ${getHighlightedTitleStyles(link.title)}`}>
                    {link.title}
                  </h3>
                  {link.description && (
                    <p className="text-[0.95rem] leading-relaxed text-white/90">
                      {link.description}
                    </p>
                  )}
                  <div className="pt-2">
                    <div className="card-divider-lux" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced arrow with micro-animation */}
            <motion.div
              className="opacity-50 group-hover:opacity-100 transition-opacity duration-400 self-start pt-1"
              animate={{
                x: hoveredCard === link.id ? 6 : 0,
                scale: hoveredCard === link.id ? 1.1 : 1
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <svg 
                className="w-7 h-7 text-stone-700" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.div>
          </div>


        </div>
      </a>
    </GlareHover>
  );
}, (prev, next) => prev.link === next.link && prev.hoveredCard === next.hoveredCard && prev.heightClass === next.heightClass);
EnhancedLinkCard.displayName = 'EnhancedLinkCard';

// Modern Footer Component
const ModernFooter = memo(() => {
  const { ref, isInView } = useScrollAnimation();
  const footerInitial = useMemo(() => ({ opacity: 0, y: 30 }), []);
  const footerAnimate = useMemo(() => ({ opacity: 1, y: 0 }), []);
  const footerTransition = useMemo(() => ({ duration: 1.2, delay: 0.3 }), []);
  
  return (
    <motion.footer 
      ref={ref}
      className="py-16 px-6"
      initial={footerInitial}
      animate={isInView ? footerAnimate : footerInitial}
      transition={footerTransition}
    >
      <div className="max-w-lg mx-auto">
        <motion.div
          className="bg-gradient-to-br from-stone-800/90 to-stone-900/85 backdrop-blur-xl rounded-3xl p-8 border border-stone-700/40 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            transform: "scale(1.02)",
            borderRadius: "8px 8px 8px 8px"
          }}>
          {/* Subtle inner highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-3xl pointer-events-none" />
          
          <div className="space-y-6 relative z-10">
            <motion.div 
              className="flex items-center space-x-5"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <img 
                src="https://public.youware.com/image/d91a5dbd-1612-4acb-988b-423844c2be9a/efng021m0s.jpg" 
                alt="Localização" 
                className="w-8 h-8 filter drop-shadow-sm" 
              />
              <div>
                <p className="text-stone-200 font-semibold text-lg">Alexânia, Goiás</p>
                <p className="text-stone-400 text-sm font-medium">Showroom principal</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-5"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <img 
                src="https://public.youware.com/users-website-assets/prod/c8c16ff6-2b76-453c-8f57-11c4a292030a/afa1a94ba59d480192c35cddc0520702.png" 
                alt="Instagram" 
                className="w-8 h-8 filter drop-shadow-sm" 
              />
              <div>
                <p className="text-stone-300 font-semibold text-lg">@moveismadeirao</p>
                <p className="text-stone-400 text-sm font-medium">Siga no Instagram</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-5"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <img 
                src="https://public.youware.com/users-website-assets/prod/c8c16ff6-2b76-453c-8f57-11c4a292030a/af832391c2384691801a6575dab2e89a.png" 
                alt="WhatsApp" 
                className="w-8 h-8 filter drop-shadow-sm" 
              />
              <div>
                <p className="text-stone-300 font-semibold text-lg">(62) 99135-6000</p>
                <p className="text-stone-400 text-sm font-medium">WhatsApp e ligações</p>
              </div>
            </motion.div>

            <motion.div 
              className="pt-8 border-t border-stone-600/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <p className="text-stone-400 text-center leading-relaxed font-medium">Arte & Funcionalidade</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
      {/* Refined decorative elements */}
      <div className="flex justify-center space-x-4 mt-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 bg-stone-400/60 rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ 
              duration: 0.5, 
              delay: 1.5 + (i * 0.1),
              type: "spring",
              stiffness: 300
            }}
            whileHover={{ scale: 1.5, opacity: 1 }}
          />
        ))}
      </div>
    </motion.footer>
  );
});

ModernFooter.displayName = 'ModernFooter';

export default App;