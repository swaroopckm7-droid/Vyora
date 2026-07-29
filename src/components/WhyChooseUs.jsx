import React from 'react';
import { Award, Zap, Lock, RefreshCw, Leaf, Headphones } from 'lucide-react';

export const WhyChooseUs = () => {
  const features = [
    {
      icon: Award,
      title: "Premium Quality Fabric",
      desc: "Single-origin Supima organic cotton, 480GSM French terry, and Japanese selvage denim."
    },
    {
      icon: Zap,
      title: "Fast Global Shipping",
      desc: "Express priority air delivery with real-time tracking for every order."
    },
    {
      icon: Lock,
      title: "Secure Payments",
      desc: "256-bit encrypted checkout supporting Credit Cards, UPI, and Cash on Delivery."
    },
    {
      icon: RefreshCw,
      title: "Easy 30-Day Returns",
      desc: "No questions asked instant return pickup and exchange policy."
    },
    {
      icon: Leaf,
      title: "Sustainable Fashion",
      desc: "100% biodegradable packaging, non-toxic dyes, and ethically audited workshops."
    },
    {
      icon: Headphones,
      title: "24/7 VIP Concierge",
      desc: "Dedicated personal styling advice and round-the-clock customer support."
    }
  ];

  return (
    <section className="py-20 bg-vyora-black border-t border-white/5 relative overflow-hidden">
      {/* Background Gold Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-gold text-xs font-bold tracking-widest uppercase mb-2 block">
            The Vyora Standard
          </span>
          <h2 className="font-poppins font-black text-3xl sm:text-4xl text-white">
            Why Choose VyoraThreads
          </h2>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-vyora-card border border-white/10 hover:border-gold/50 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-gold-glow flex flex-col items-start group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gold/10 border border-gold/40 flex items-center justify-center text-gold mb-6 group-hover:bg-gold group-hover:text-black transition-all duration-300 shadow-gold-glow">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-poppins font-bold text-xl text-white group-hover:text-gold transition-colors mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
