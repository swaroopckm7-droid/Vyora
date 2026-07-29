import React from 'react';
import { ArrowDown, Sparkles, ChevronRight, Compass } from 'lucide-react';

export const Hero = ({ onShopNow, onExploreCollection }) => {
  return (
    <section className="relative w-full h-[calc(100vh-70px)] min-h-[680px] max-h-[960px] flex items-center justify-center overflow-hidden bg-[#0D0D0D]">
      
      {/* Background Editorial High-Fashion Image / Video Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=90"
          alt="VyoraThreads High Fashion Editorial"
          className="w-full h-full object-cover object-center filter brightness-75 contrast-110 scale-105 transition-transform duration-1000"
        />
        {/* Dark Vignette & Champagne Gold Lighting Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/50 to-[#0D0D0D]/30" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-6 shadow-gold-glow animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Crafted for Confidence</span>
        </div>

        {/* Main Headline (Playfair Display) */}
        <h1 className="font-playfair font-normal text-4xl sm:text-7xl lg:text-8xl text-white tracking-tight leading-[1.1] mb-6 text-gold-gradient max-w-4xl">
          Luxury Woven Into Every Thread
        </h1>

        {/* Subtitle */}
        <p className="font-inter text-gray-300 text-sm sm:text-lg max-w-2xl mx-auto font-light leading-relaxed mb-10 tracking-wide">
          Discover timeless fashion crafted with premium materials, modern silhouettes, and effortless elegance.
        </p>

        {/* Dual Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md">
          <button
            onClick={onShopNow}
            className="w-full sm:w-auto px-9 py-4 bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-[0.25em] rounded-full shadow-gold-glow hover:scale-105 transition-transform flex items-center justify-center gap-2 group"
          >
            <span>Shop Now</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreCollection}
            className="w-full sm:w-auto px-9 py-4 glass-panel text-white font-bold text-xs uppercase tracking-[0.25em] rounded-full border border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Collection</span>
          </button>
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
