import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles, ChevronRight, Compass, ShieldCheck, Award } from 'lucide-react';

export const Hero = ({ onShopNow, onExploreCollection }) => {
  const [currentBg, setCurrentBg] = useState(0);

  const heroBgs = [
    {
      url: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=2000&q=90",
      tagline: "Men's Luxury Atelier",
      headline: "Crafted for Confidence & Power",
      sub: "Discover bespoke Men's shirts, Supima tees, heavy French terry hoodies, and luxury track pants."
    },
    {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=2000&q=90",
      tagline: "High-Fashion Minimalist",
      headline: "Luxury Woven Into Every Thread",
      sub: "Engineered from 480GSM organic cotton, Japanese selvage denim, and Italian satin craftsmanship."
    },
    {
      url: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=2000&q=90",
      tagline: "Streetwear Elegance",
      headline: "Redefining Contemporary Style",
      sub: "Modern silhouettes designed to make an indelible impression in any room."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroBgs.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeHero = heroBgs[currentBg];

  return (
    <section className="relative w-full h-[calc(100vh-70px)] min-h-[680px] max-h-[960px] flex items-center justify-center overflow-hidden bg-[#0D0D0D]">
      
      {/* Background High-Fashion Men's Editorial Carousel */}
      {heroBgs.map((bg, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            currentBg === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={bg.url}
            alt="VyoraThreads Men's Luxury Fashion Editorial"
            className="w-full h-full object-cover object-center filter brightness-75 contrast-110"
          />
          {/* Dark Vignette & Gold Glow Lighting Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-[#0D0D0D]/40" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#D4AF37]/15 rounded-full blur-[160px] pointer-events-none" />
        </div>
      ))}

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-[#D4AF37] text-xs font-extrabold uppercase tracking-[0.3em] mb-6 shadow-gold-glow animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{activeHero.tagline}</span>
        </div>

        {/* Main Headline (Playfair Display) */}
        <h1 className="font-playfair font-normal text-4xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-[1.1] mb-6 text-gold-gradient max-w-4xl transition-all duration-700">
          {activeHero.headline}
        </h1>

        {/* Subtitle */}
        <p className="font-inter text-gray-300 text-sm sm:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-10 tracking-wide">
          {activeHero.sub}
        </p>

        {/* Dual Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md mb-8">
          <button
            onClick={onShopNow}
            className="w-full sm:w-auto px-9 py-4 bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-[0.25em] rounded-full shadow-gold-glow hover:scale-105 transition-transform flex items-center justify-center gap-2 group"
          >
            <span>Shop Men's Collection</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreCollection}
            className="w-full sm:w-auto px-9 py-4 glass-panel text-white font-bold text-xs uppercase tracking-[0.25em] rounded-full border border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Atelier</span>
          </button>
        </div>

        {/* Background Indicators */}
        <div className="flex items-center gap-2">
          {heroBgs.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBg(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentBg === idx ? 'w-8 bg-[#D4AF37] shadow-gold-glow' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* Floating Scroll Indicator */}
      <div 
        onClick={onShopNow}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer text-gray-400 hover:text-[#D4AF37] transition-colors animate-float"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll Down</span>
        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center glass-panel">
          <ArrowDown className="w-4 h-4" />
        </div>
      </div>

    </section>
  );
};
