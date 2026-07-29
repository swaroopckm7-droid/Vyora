import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const FeaturedCategories = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'Hoodies',
      name: 'Hoodies',
      tagline: 'Heavyweight Luxury Comfort',
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      span: 'col-span-1 md:col-span-2 lg:col-span-2'
    },
    {
      id: 'Oversized Wear',
      name: 'Oversized Wear',
      tagline: 'Modern Boxy Silhouettes',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80',
      span: 'col-span-1 md:col-span-1 lg:col-span-1'
    },
    {
      id: 'T-Shirts',
      name: 'T-Shirts',
      tagline: 'Supima Organic Essentials',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      span: 'col-span-1 md:col-span-1 lg:col-span-1'
    },
    {
      id: 'Jackets',
      name: 'Jackets',
      tagline: 'Structured Trench & Bombers',
      image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80',
      span: 'col-span-1 md:col-span-2 lg:col-span-2'
    },
    {
      id: 'Shirts',
      name: 'Shirts',
      tagline: 'Silk-Touch Oxford & Linen',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      span: 'col-span-1'
    },
    {
      id: 'Jeans',
      name: 'Jeans',
      tagline: 'Japanese Selvage Denim',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      span: 'col-span-1'
    },
    {
      id: 'Accessories',
      name: 'Accessories',
      tagline: 'Italian Leather & Hardware',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      span: 'col-span-1 md:col-span-1'
    }
  ];

  return (
    <section className="py-20 bg-vyora-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gold/20 pb-6">
          <div>
            <span className="text-gold text-xs font-bold tracking-widest uppercase mb-2 block">
              Curated Wardrobe
            </span>
            <h2 className="font-poppins font-black text-3xl sm:text-4xl text-white tracking-tight">
              Featured Categories
            </h2>
          </div>
          <p className="text-gray-400 text-sm max-w-md mt-2 md:mt-0">
            Explore our signature garment cuts, crafted with sustainable organic fibers and tailored for everyday luxury.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group relative h-80 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-gold/60 transition-all duration-500 shadow-xl ${cat.span}`}
            >
              {/* Background Image with Zoom Effect */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:via-black/60 transition-colors duration-300" />

              {/* Category Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div>
                  <span className="text-gold text-xs font-semibold uppercase tracking-wider block mb-1">
                    {cat.tagline}
                  </span>
                  <h3 className="font-poppins font-bold text-2xl text-white group-hover:text-gold transition-colors">
                    {cat.name}
                  </h3>
                </div>

                <div className="w-10 h-10 rounded-full bg-vyora-black/80 border border-gold/40 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all duration-300 shadow-gold-glow">
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
