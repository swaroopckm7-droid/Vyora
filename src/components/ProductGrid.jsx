import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Eye, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductGrid = ({
  products = [],
  onQuickView,
  selectedCategory,
  setSelectedCategory,
  selectedGender,
  setSelectedGender
}) => {
  const [activeTab, setActiveTab] = useState("EDITOR'S CHOICE");
  const { addToCart } = useCart() || {};
  const { toggleWishlist, isInWishlist } = useWishlist() || {};

  const filterTabs = ["EDITOR'S CHOICE", "POPULAR", "RESTOCK ITEMS"];

  // Focused Men's Collection Categories
  const categories = [
    'All',
    'T-Shirts',
    'Shirts',
    'Hoodies',
    'Track Pants'
  ];

  const safeProducts = Array.isArray(products) ? products : [];

  const filteredProducts = safeProducts.filter((item) => {
    if (!item) return false;

    const matchesCategory =
      selectedCategory === 'All' ||
      (item.category && item.category.toLowerCase() === selectedCategory.toLowerCase());

    return matchesCategory;
  });

  return (
    <section id="shop-catalog" className="py-20 bg-[#0D0D0D] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] block mb-2">
            Exclusive Men's Collection
          </span>
          <h2 className="font-cormorant font-normal text-4xl sm:text-6xl text-white tracking-wider uppercase mb-6">
            FEATURED GARMENTS
          </h2>

          {/* Editor's Choice / Popular / Restock Items Tabs */}
          <div className="flex items-center justify-center gap-8 border-b border-white/10 pb-4 mb-8">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs sm:text-sm font-bold uppercase tracking-widest transition-all relative pb-2 ${
                  activeTab === tab
                    ? 'text-[#D4AF37] border-b-2 border-[#D4AF37] font-extrabold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 4 Men's Category Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                  selectedCategory === cat
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-gold-glow font-extrabold'
                    : 'bg-[#141414] text-gray-300 border-white/10 hover:border-[#D4AF37]/50'
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
              }}
              className="mt-4 px-6 py-2.5 bg-[#D4AF37] text-black font-bold text-xs rounded-full uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const productId = product._id || product.id;
              const isItemWishlisted = isInWishlist ? isInWishlist(productId) : false;

              const currencySymbol = typeof product.price === 'number' && product.price > 300 ? '₹' : '$';

              return (
                <div
                  key={productId}
                  className="group relative flex flex-col justify-between bg-[#141414] rounded-2xl p-4 border border-white/10 hover:border-[#D4AF37]/40 transition-all duration-300 shadow-lg text-left"
                >
                  {/* Image Container with Badges */}
                  <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden mb-4 bg-[#1E1E1E] cursor-pointer" onClick={() => onQuickView && onQuickView(product)}>
                    {product.discount > 0 && (
                      <span className="absolute top-3 left-3 z-10 bg-[#D4AF37] text-black text-[10px] font-extrabold uppercase px-2.5 py-1 rounded shadow-md tracking-wider">
                        {product.discount}% OFF
                      </span>
                    )}

                    <img
                      src={product.image || (product.images && product.images[0])}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Hover Quick Actions */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist && toggleWishlist(product);
                        }}
                        className={`w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#D4AF37] transition-colors ${
                          isItemWishlisted ? 'bg-[#D4AF37] text-black' : ''
                        }`}
                        title="Toggle Wishlist"
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickView && onQuickView(product);
                        }}
                        className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-[#D4AF37] transition-colors"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Garment Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold block mb-1">
                        MEN'S {product.category.toUpperCase()}
                      </span>

                      <h3 
                        onClick={() => onQuickView && onQuickView(product)}
                        className="font-poppins font-bold text-sm text-white line-clamp-1 mb-2 group-hover:text-[#D4AF37] transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>

                      {/* Color Swatch Dots */}
                      <div className="flex items-center gap-1.5 mb-3">
                        <span className="w-3.5 h-3.5 rounded-full bg-black border border-white/20" />
                        <span className="w-3.5 h-3.5 rounded-full bg-[#D4AF37] border border-white/20" />
                        <span className="w-3.5 h-3.5 rounded-full bg-slate-700 border border-white/20" />
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-[#D4AF37] font-extrabold text-lg">
                          {currencySymbol}{product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-gray-500 text-xs line-through">
                            {currencySymbol}{product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add to Basket Button */}
                    <button
                      onClick={() => addToCart && addToCart(product, 1)}
                      className="w-full py-2.5 border border-white/20 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black text-white text-xs font-bold uppercase tracking-wider transition-all rounded-lg flex items-center justify-center gap-2"
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
