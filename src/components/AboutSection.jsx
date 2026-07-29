import React from 'react';
import { Sparkles, ShieldCheck, Award, Heart } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section className="py-24 bg-[#0D0D0D] border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Screen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: High-Fashion Lifestyle Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"
                alt="VyoraThreads Brand Story Lifestyle Editorial"
                className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8 glass-panel p-6 rounded-2xl border border-white/10 text-left">
                <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-1">
                  <Award className="w-4 h-4" />
                  <span>Flagship Atelier — Anna Nagar, Chennai</span>
                </div>
                <p className="text-white font-playfair text-lg">
                  "Where minimalist architecture meets unyielding luxury fashion."
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Brand Story Content */}
          <div className="lg:col-span-6 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold uppercase tracking-widest shadow-gold-glow">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Featured Brand Story</span>
            </div>

            <h2 className="font-playfair font-normal text-4xl sm:text-6xl text-white tracking-tight leading-tight">
              Crafted for Confidence & Timeless Elegance
            </h2>

            <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
              Founded with a passion to redefine contemporary fashion, VyoraThreads stands at the intersection of haute couture minimalism and everyday functional comfort. Every garment is engineered from hand-selected 480GSM organic Supima cotton, Japanese selvage denim, and bespoke Italian trims.
            </p>

            <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">
              We believe confidence is woven, not worn. Our Anna Nagar flagship design lab crafts limited-edition capsule collections that empower individuals across the globe to wear their unique story.
            </p>

            {/* Atelier Key Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <span className="font-playfair font-bold text-3xl sm:text-4xl text-[#D4AF37] block">
                  480GSM
                </span>
                <span className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  Heavy Terry Weave
                </span>
              </div>

              <div>
                <span className="font-playfair font-bold text-3xl sm:text-4xl text-[#D4AF37] block">
                  100%
                </span>
                <span className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  Ethical Organic
                </span>
              </div>

              <div>
                <span className="font-playfair font-bold text-3xl sm:text-4xl text-[#D4AF37] block">
                  50k+
                </span>
                <span className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                  Global Members
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
