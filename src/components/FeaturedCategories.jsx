import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const FeaturedCategories = ({ onSelectCategory }) => {
  const collections = [
    {
      id: 'shirts',
      title: 'Shirts',
      subtitle: 'Satin Oxford & Resort Linen',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      category: 'Shirts'
    },
    {
      id: 'tshirts',
      title: 'T-Shirts',
      subtitle: 'Supima Organic & Oversized Heavyweight',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      category: 'T-Shirts'
    },
    {
      id: 'hoodies',
      title: 'Hoodies',
      subtitle: '480GSM French Terry Monogram',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      category: 'Hoodies'
    },
    {
      id: 'trackpants',
      title: 'Track Pants',
      subtitle: 'Heavy Terry & Tech Joggers',
      image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80',
      category: 'Track Pants'
    }
  ];

  return (
    <section className="py-24 bg-[#0D0D0D] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] block mb-2">
            Men's Exclusive Collections
          </span>
          <h2 className="font-playfair font-normal text-3xl sm:text-5xl text-white tracking-wide uppercase">
            Curated Men's Atelier
          </h2>
        </div>

        {/* 4 Men's Category Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => (
            <div
              key={col.id}
              onClick={() => onSelectCategory(col.category)}
              className="group relative h-[480px] rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-500 shadow-2xl text-left"
            >
              {/* Background Image with Zoom Effect */}
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                loading="lazy"
              />

              {/* Gradient Dark Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:via-black/20 transition-colors" />

              {/* Card Footer Information */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between z-10">
                <div>
                  <span className="text-[#D4AF37] text-[10px] font-extrabold uppercase tracking-[0.25em] block mb-1">
                    {col.subtitle}
                  </span>
                  <h3 className="font-playfair font-normal text-2xl text-white group-hover:text-[#D4AF37] transition-colors">
                    {col.title}
                  </h3>
                </div>

                <div className="w-10 h-10 rounded-full glass-panel text-white group-hover:bg-[#D4AF37] group-hover:text-black flex items-center justify-center transition-all shrink-0">
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
