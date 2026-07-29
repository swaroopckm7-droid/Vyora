import React from 'react';
import { Gem, ShieldCheck, Globe, Lock, RefreshCw, Headphones } from 'lucide-react';

export const WhyChooseUs = () => {
  const pillars = [
    {
      icon: Gem,
      title: 'Premium Fabrics',
      description: 'Hand-selected 480GSM organic Supima cotton, Japanese selvage denim, and fine Italian wools.'
    },
    {
      icon: ShieldCheck,
      title: 'Ethical Manufacturing',
      description: 'Zero-compromise fair labor standards, eco-certified dyes, and sustainable atelier craftsmanship.'
    },
    {
      icon: Globe,
      title: 'Fast Worldwide Shipping',
      description: 'Express global door-to-door delivery with live tracking across 120+ countries.'
    },
    {
      icon: Lock,
      title: 'Secure Payments',
      description: 'Bank-grade 256-bit encrypted checkout supporting credit cards, Apple Pay, UPI, and crypto.'
    },
    {
      icon: RefreshCw,
      title: 'Easy Returns',
      description: 'Hassle-free 30-day return policy with instant store credit or full refund guarantees.'
    },
    {
      icon: Headphones,
      title: 'Exceptional Customer Support',
      description: 'Dedicated 24/7 VIP styling assistance and concierge support for all your wardrobe needs.'
    }
  ];

  return (
    <section className="py-24 bg-[#0D0D0D] border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] block mb-2">
            The Vyora Promise
          </span>
          <h2 className="font-playfair font-normal text-3xl sm:text-5xl text-white tracking-wide uppercase">
            Why Choose VyoraThreads
          </h2>
        </div>

        {/* 6 Glassmorphism Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-8 rounded-3xl hover:border-[#D4AF37]/60 transition-all duration-300 shadow-xl hover:shadow-gold-glow group text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-gold-subtle">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="font-poppins font-bold text-lg text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
