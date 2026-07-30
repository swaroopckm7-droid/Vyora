import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles, ChevronRight, Compass, ShieldCheck, Award, Crown, Zap, Star } from 'lucide-react';

export const Hero = ({ onShopNow, onExploreCollection }) => {
  const [currentBg, setCurrentBg] = useState(0);

  const heroBgs = [
    {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=2400&q=95",
      tagline: "VYORA LUXURY ATELIER • EST. 2026",
      headline: "EMPOWER YOUR ELEVATED PRESENCE",
      sub: "Unveiling bespoke Men's Luxury Shirts, 480GSM Heavyweight Hoodies, Supima Cotton Tees, and Tailored Track Pants. Engineered to command respect in every room."
    },
    {
      url: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=2400&q=95",
      tagline: "THE CROWN COLLECTION",
      headline: "THE ART OF UNCOMPROMISING ELEGANCE",
      sub: "Woven from rare Japanese selvage weave, Italian satin silks, and long-staple Supima cotton for unparalleled comfort and flawless drape."
    },
    {
      url: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=2400&q=95",
      tagline: "ROYAL FIT GUARANTEE",
      headline: "CRAFTED FOR DISTINCTION & DOMINANCE",
      sub: "Meticulously tailored for modern gentlemen who appreciate precision stitching, luxury textures, and effortless confidence."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroBgs.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const activeHero = heroBgs[currentBg];

  return (
    <section className="relative w-full h-[calc(100vh-70px)] min-h-[720px] max-h-[1000px] flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      
      {/* Background High-Fashion Men's Editorial Carousel */}
      {heroBgs.map((bg, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 z-0 transition-all duration-1000 ease-out ${
            currentBg === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          }`}
        >
          <img
            src={bg.url}
            alt="VyoraThreads Luxury Men's Fashion Editorial"
            className="w-full h-full object-cover object-center filter brightness-65 contrast-115"
          />
          {/* Radial Gradient & Gold Glow Lighting Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/65 to-black/40" />
          <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />
          
          {/* Floating Luxury Ambient Light Beams */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[#D4AF37]/20 rounded-full blur-[180px] pointer-events-none animate-pulse" />
          <div className="absolute -bottom-20 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
        </div>
      ))}

      {/* Decorative Gold Geometric Border Accents */}
      <div className="absolute top-6 left-6 z-10 hidden sm:block w-16 h-16 border-t-2 border-l-2 border-[#D4AF37]/50" />
      <div className="absolute top-6 right-6 z-10 hidden sm:block w-16 h-16 border-t-2 border-r-2 border-[#D4AF37]/50" />
      <div className="absolute bottom-6 left-6 z-10 hidden sm:block w-16 h-16 border-b-2 border-l-2 border-[#D4AF37]/50" />
      <div className="absolute bottom-6 right-6 z-10 hidden sm:block w-16 h-16 border-b-2 border-r-2 border-[#D4AF37]/50" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pt-8">
        
        {/* Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/70 backdrop-blur-md border border-[#D4AF37]/60 text-[#D4AF37] text-xs font-extrabold uppercase tracking-[0.35em] mb-6 shadow-gold-glow animate-fadeIn">
          <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{activeHero.tagline}</span>
        </div>

        {/* Main Headline (Playfair Display) */}
        <h1 className="font-cormorant font-bold text-4xl sm:text-7xl lg:text-8xl text-white tracking-wider leading-[1.05] mb-6 text-gold-gradient max-w-4xl transition-all duration-700 uppercase drop-shadow-2xl">
          {activeHero.headline}
        </h1>

        {/* Subtitle */}
        <p className="font-poppins text-gray-200 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-10 tracking-wide text-shadow">
          {activeHero.sub}
        </p>

        {/* Dual Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md mb-10">
          <button
            onClick={onShopNow}
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-[0.25em] rounded-full shadow-gold-glow hover:scale-105 transition-transform flex items-center justify-center gap-2.5 group"
          >
            <span>SHOP MEN'S COLLECTION</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreCollection}
            className="w-full sm:w-auto px-9 py-4 bg-black/60 backdrop-blur-md text-white font-bold text-xs uppercase tracking-[0.25em] rounded-full border border-white/25 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>EXPLORE ATELIER</span>
          </button>
        </div>

        {/* Floating Feature Badges */}
        <div className="hidden md:flex items-center justify-center gap-8 py-3 px-6 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-gray-300 mb-6">
          <div className="flex items-center gap-2 text-white">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span>100% Supima & Italian Fabrics</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <div className="flex items-center gap-2 text-white">
            <Zap className="w-4 h-4 text-[#D4AF37]" />
            <span>Express Dispatch</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <Star className="w-4 h-4 fill-current" />
            <span>4.9/5 Rating (5,000+ Men)</span>
          </div>
        </div>

        {/* Carousel Slide Indicators */}
        <div className="flex items-center gap-2.5">
          {heroBgs.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBg(idx)}
              className={`h-2 rounded-full transition-all duration-500 ${
                currentBg === idx ? 'w-10 bg-[#D4AF37] shadow-gold-glow' : 'w-2.5 bg-white/30 hover:bg-white/70'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* Floating Scroll Down Arrow */}
      <div 
        onClick={onShopNow}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer text-gray-400 hover:text-[#D4AF37] transition-colors"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.3em]">SCROLL DOWN</span>
        <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <ArrowDown className="w-3.5 h-3.5" />
        </div>
      </div>

    </section>
  );
};
