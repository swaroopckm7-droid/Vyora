import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Sparkles, SlidersHorizontal, Eye, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductGrid = ({
  products,
  onQuickView,
  selectedCategory,
  setSelectedCategory,
  selectedGender,
  setSelectedGender
}) => {
  const [activeTab, setActiveTab] = useState("EDITOR'S CHOICE");
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const filterTabs = ["EDITOR'S CHOICE", "POPULAR", "RESTOCK ITEMS"];

  const categories = [
    'All',
    'T-Shirts',
    'Hoodies',
    'Oversized Wear',
    'Shirts',
    'Jeans',
    'Jackets',
    'Accessories'
  ];

  // Filtering products
  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesGender =
      selectedGender === 'All' ||
      !item.gender ||
      item.gender.toLowerCase() === selectedGender.toLowerCase() ||
      item.gender === 'Unisex';

    return matchesCategory && matchesGender;
  });

  return (
    <section id="shop-catalog" className="py-20 bg-vyora-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-cormorant font-normal text-4xl sm:text-6xl text-white tracking-wider uppercase mb-6">
            FEATURED PRODUCTS
          </h2>

          {/* Editor's Choice / Popular / Restock Items Tabs */}
          <div className="flex items-center justify-center gap-8 border-b border-white/10 pb-4 mb-8">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs sm:text-sm font-bold uppercase tracking-widest transition-all relative pb-2 ${
                  activeTab === tab
                    ? 'text-gold border-b-2 border-gold font-extrabold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                  selectedCategory === cat
                    ? 'bg-gold text-black border-gold shadow-gold-glow'
                    : 'bg-charcoal text-gray-300 border-white/10 hover:border-gold/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <p className="text-lg font-poppins">No garments found in this category.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedGender('All');
              }}
              className="mt-4 px-6 py-2.5 bg-gold text-black font-bold text-xs rounded-full uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const badgeTag = product.category === 'Shirts' ? 'ONLINE EXCLUSIVE' : 
                               product.category === 'Hoodies' ? 'WASHABLE' : '100% UV BLOCKING';

              return (
                <div
                  key={product._id}
                  className="group relative flex flex-col justify-between bg-vyora-card rounded-2xl p-4 border border-white/10 hover:border-gold/40 transition-all duration-300 shadow-lg text-left"
                >
                  {/* Image Container with Badge */}
                  <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden mb-4 bg-charcoal">
                    <span className="absolute top-3 left-3 z-10 bg-white/90 text-black text-[10px] font-extrabold uppercase px-2.5 py-1 rounded shadow-sm tracking-wider">
                      {badgeTag}
                    </span>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Hover Quick Actions */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        onClick={() => addToWishlist(product)}
                        className={`w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gold transition-colors ${
                          isInWishlist(product._id) ? 'bg-gold text-black' : ''
                        }`}
                        title="Add to Wishlist"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>

                      <button
                        onClick={() => onQuickView(product)}
                        className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-gold transition-colors"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Garment Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-1">
                        {product.brand || 'VYORA'}
                      </span>

                      <h3 className="font-poppins font-bold text-sm text-white line-clamp-1 mb-2 group-hover:text-gold transition-colors">
                        {product.name}
                      </h3>

                      {/* Color Swatch Dots */}
                      <div className="flex items-center gap-1.5 mb-3">
                        <span className="w-3.5 h-3.5 rounded-full bg-amber-900 border border-white/20" />
                        <span className="w-3.5 h-3.5 rounded-full bg-charcoal border border-white/20" />
                        <span className="w-3.5 h-3.5 rounded-full bg-slate-700 border border-white/20" />
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-gold font-extrabold text-base">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-gray-500 text-xs line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add to Basket Button */}
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="w-full py-2.5 border border-white/20 group-hover:border-gold group-hover:bg-gold group-hover:text-black text-white text-xs font-bold uppercase tracking-wider transition-all rounded-lg flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>ADD TO BASKET</span>
                    </button>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
