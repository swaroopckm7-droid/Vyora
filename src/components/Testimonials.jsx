import React from 'react';
import { Quote, Sparkles, ShieldCheck, Instagram, Award } from 'lucide-react';

export const Testimonials = () => {
  const leaders = [
    {
      role: "Founder & CEO",
      name: "Founder",
      tagline: "Founder & Chief Executive Officer",
      avatar: "/founder.jpg",
      quote: "VyoraThreads was founded in Anna Nagar, Chennai with a commitment to engineering luxury streetwear that embodies confidence, comfort, and everyday elegance. Every 480GSM terry weave, bespoke cut, and metallic gold emblem is crafted to empower your personal story.",
      instagram: "https://www.instagram.com/vyorathreads2026/"
    },
    {
      role: "Co-Founder & CCO",
      name: "Co-Founder",
      tagline: "Co-Founder & Chief Creative Officer",
      avatar: "/co-founder.jpg",
      quote: "Fashion is more than clothing—it is an architectural expression of identity. From our Japanese selvage raw denim to organic Supima oversized cuts, we design minimalist capsule collections built for timeless durability and modern luxury.",
      instagram: "https://www.instagram.com/vyorathreads2026/"
    }
  ];

  return (
    <section className="py-20 bg-vyora-black border-t border-white/5 relative overflow-hidden">
      {/* Background Gold Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest mb-3 shadow-gold-glow">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Leadership & Vision</span>
          </div>
          <h2 className="font-poppins font-black text-3xl sm:text-5xl text-white tracking-tight mb-3">
            Meet Our Founders
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            The visionary minds behind VyoraThreads' luxury fashion house in Anna Nagar, Chennai.
          </p>
        </div>

        {/* Founders Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {leaders.map((leader, idx) => (
            <div
              key={idx}
              className="bg-vyora-card border border-gold/30 hover:border-gold/60 rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative group transition-all duration-300 shadow-2xl hover:shadow-gold-glow text-left"
            >
              <Quote className="w-12 h-12 text-gold/20 absolute top-6 right-6 pointer-events-none" />

              <div>
                {/* Role Pill */}
                <div className="inline-flex items-center gap-1.5 text-gold font-bold text-xs uppercase tracking-widest mb-4 bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold" />
                  <span>{leader.role}</span>
                </div>

                {/* Quote */}
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed italic mb-8 relative z-10 font-normal">
                  "{leader.quote}"
                </p>
              </div>

              {/* Founder Avatar & Title */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-2">
                <div className="flex items-center gap-4">
                  <img
                    src={leader.avatar}
                    alt={leader.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gold shadow-gold-glow group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h4 className="font-poppins font-black text-lg text-white group-hover:text-gold transition-colors">
                      {leader.name}
                    </h4>
                    <span className="text-xs text-gold/80 font-medium block">{leader.tagline}</span>
                  </div>
                </div>

                <a
                  href={leader.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-charcoal hover:bg-gold hover:text-black text-gray-300 flex items-center justify-center transition-colors shadow-md shrink-0"
                  title="Follow @vyorathreads2026 on Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
