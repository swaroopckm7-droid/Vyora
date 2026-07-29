import React from 'react';
import { Sparkles, ShieldCheck, Leaf, Globe } from 'lucide-react';

export const AboutSection = () => {
  return (
    <section className="py-20 bg-vyora-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Our Heritage & Vision</span>
            </div>
            <h1 className="font-poppins font-black text-4xl sm:text-5xl text-white tracking-tight leading-tight mb-6">
              Wear Your Confidence. <span className="gold-text-gradient">Redefine Everyday Luxury.</span>
            </h1>
            <p className="text-gray-300 text-base leading-relaxed mb-6">
              Founded in 2026, VyoraThreads was created to challenge the compromises of fast fashion. We believe garments should be an extension of your inner confidence — engineered with unyielding architectural lines, heavyweight organic textiles, and metallic gold accents.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Every piece in our collection undergoes rigorous prototyping across European ateliers and Japanese mills to guarantee zero shrinkage, maximum thermal comfort, and timeless silhouette longevity.
            </p>

            <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
              <div>
                <span className="font-poppins font-black text-3xl text-gold">480GSM</span>
                <p className="text-xs text-gray-400 font-medium uppercase mt-1">French Terry Standard</p>
              </div>
              <div>
                <span className="font-poppins font-black text-3xl text-gold">100%</span>
                <p className="text-xs text-gray-400 font-medium uppercase mt-1">Organic Supima Cotton</p>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-gold/30 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
              alt="VyoraThreads Design Studio Atelier"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-xs text-gray-300">
              <strong className="text-gold block text-sm">VyoraThreads Atelier</strong>
              Handcrafted precision & sustainable craftsmanship.
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-vyora-card border border-white/10 p-8 rounded-2xl text-left">
            <ShieldCheck className="w-10 h-10 text-gold mb-4" />
            <h3 className="font-poppins font-bold text-xl text-white mb-2">Architectural Cuts</h3>
            <p className="text-gray-400 text-sm">Boxy streetwear drops and tailored trench silhouettes constructed to drape flawlessly on every body type.</p>
          </div>

          <div className="bg-vyora-card border border-white/10 p-8 rounded-2xl text-left">
            <Leaf className="w-10 h-10 text-gold mb-4" />
            <h3 className="font-poppins font-bold text-xl text-white mb-2">Sustainable Circularity</h3>
            <p className="text-gray-400 text-sm">100% GOTS certified organic fibers, zero plastic packaging, and ethical workplace certifications.</p>
          </div>

          <div className="bg-vyora-card border border-white/10 p-8 rounded-2xl text-left">
            <Globe className="w-10 h-10 text-gold mb-4" />
            <h3 className="font-poppins font-bold text-xl text-white mb-2">Global Community</h3>
            <p className="text-gray-400 text-sm">Over 50,000 fashion enthusiasts across 40 countries wearing VyoraThreads with pride.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
