import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const Hero = ({ onShopNow, onExploreCollection }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-vyora-black">
      {/* Background Fashion Imagery with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
          alt="VyoraThreads High Fashion Model"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-10000 ease-out"
        />
        {/* Luxury Vignette & Radial Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-vyora-black via-vyora-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-vyora-black via-transparent to-vyora-black/50" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-3xl">
          
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/40 text-gold text-xs sm:text-sm font-semibold tracking-widest uppercase mb-6 shadow-gold-glow backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-gold animate-pulse" />
            <span>New Autumn / Winter 2026 Edition</span>
          </div>

          {/* Large Main Headline */}
          <h1 className="font-poppins font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] mb-6">
            Redefine Your Style with <span className="gold-text-gradient underline decoration-gold/30">VyoraThreads</span>
          </h1>

          {/* Subheading */}
          <p className="text-gray-300 text-lg sm:text-xl font-normal leading-relaxed mb-10 max-w-2xl">
            Premium clothing designed for confidence, comfort, and everyday elegance. Elevate your wardrobe with minimalist luxury silhouettes.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-16">
            <button
              onClick={onShopNow}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-gold via-amber-400 to-gold-dark text-black font-extrabold text-base px-8 py-4 rounded-full shadow-gold-glow hover:shadow-gold-glow-lg transition-all duration-300 hover:scale-105 cursor-pointer uppercase tracking-wider"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onExploreCollection}
              className="flex items-center justify-center gap-2 bg-charcoal/80 hover:bg-charcoal text-white font-semibold text-base px-8 py-4 rounded-full border border-gold/40 hover:border-gold transition-all duration-300 backdrop-blur-md cursor-pointer uppercase tracking-wider"
            >
              <span>Explore Collection</span>
            </button>
          </div>

          {/* Trust Badges Bar */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 max-w-xl">
            <div className="flex items-center gap-3 text-gray-300">
              <ShieldCheck className="w-6 h-6 text-gold shrink-0" />
              <div>
                <p className="text-xs font-bold text-white uppercase">100% Organic</p>
                <p className="text-[11px] text-gray-400">Luxury Fabrics</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Truck className="w-6 h-6 text-gold shrink-0" />
              <div>
                <p className="text-xs font-bold text-white uppercase">Express Delivery</p>
                <p className="text-[11px] text-gray-400">Global Shipping</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <RefreshCw className="w-6 h-6 text-gold shrink-0" />
              <div>
                <p className="text-xs font-bold text-white uppercase">30-Day Returns</p>
                <p className="text-[11px] text-gray-400">Hassle-Free</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
