import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export const TrendingCollections = ({ onSelectCollection }) => {
  const collections = [
    {
      id: 'Streetwear',
      title: 'Streetwear Culture',
      subtitle: 'Boxy cuts, heavy graphics & drop-shoulder hoodies',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      badge: 'Popular',
      gridSpan: 'md:col-span-2 lg:col-span-2'
    },
    {
      id: 'Premium Essentials',
      title: 'Premium Essentials',
      subtitle: '480GSM organic terry & silk-touch oxfords',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
      badge: 'Bestseller',
      gridSpan: 'md:col-span-1 lg:col-span-1'
    },
    {
      id: 'Casual Wear',
      title: 'Casual Elegance',
      subtitle: 'Effortless everyday fits & Japanese selvage denim',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      badge: 'Classic',
      gridSpan: 'md:col-span-1 lg:col-span-1'
    },
    {
      id: 'Summer Collection',
      title: 'Summer Resort 2026',
      subtitle: 'European organic linen camp shirts & breathable wear',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80',
      badge: 'New',
      gridSpan: 'md:col-span-1 lg:col-span-1'
    },
    {
      id: 'Winter Collection',
      title: 'Winter Tailored Trench',
      subtitle: 'Structured wool trenches & matte utility bombers',
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      badge: 'Limited',
      gridSpan: 'md:col-span-1 lg:col-span-1'
    }
  ];

  return (
    <section className="py-20 bg-vyora-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/10 border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lookbook 2026</span>
          </div>
          <h2 className="font-poppins font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Trending Collections
          </h2>
          <p className="text-gray-400 text-base">
            Discover curated capsule wardrobes engineered with unyielding craftsmanship and timeless minimalist aesthetics.
          </p>
        </div>

        {/* Collections Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col) => (
            <div
              key={col.id}
              onClick={() => onSelectCollection(col.id)}
              className={`group relative h-96 rounded-3xl overflow-hidden cursor-pointer border border-white/10 hover:border-gold/60 transition-all duration-500 shadow-2xl ${col.gridSpan}`}
            >
              {/* Image */}
              <img
                src={col.image}
                alt={col.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent group-hover:via-black/55 transition-colors" />

              {/* Badge Pill */}
              <div className="absolute top-5 left-5 bg-gold text-black font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                {col.badge}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between">
                <div>
                  <h3 className="font-poppins font-bold text-2xl sm:text-3xl text-white group-hover:text-gold transition-colors mb-2">
                    {col.title}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm max-w-md line-clamp-2">
                    {col.subtitle}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-black transition-all duration-300 shadow-gold-glow shrink-0">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
