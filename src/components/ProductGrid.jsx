import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, Grid, ArrowUpDown } from 'lucide-react';

export const ProductGrid = ({ 
  products, 
  onQuickView, 
  selectedCategory, 
  setSelectedCategory,
  selectedGender,
  setSelectedGender
}) => {
  const [selectedCollection, setSelectedCollection] = useState('All');
  const [sortOption, setSortOption] = useState('featured');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const categories = ['All', 'Hoodies', 'Oversized Wear', 'T-Shirts', 'Shirts', 'Jeans', 'Jackets', 'Accessories'];
  const genders = ['All', 'Men', 'Women', 'Unisex'];
  const collections = ['All', 'Streetwear', 'Casual Wear', 'Premium Essentials', 'Summer Collection', 'Winter Collection'];

  useEffect(() => {
    let list = [...products];

    if (selectedCategory && selectedCategory !== 'All') {
      list = list.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedGender && selectedGender !== 'All') {
      list = list.filter(p => p.gender.toLowerCase() === selectedGender.toLowerCase() || p.gender === 'Unisex');
    }

    if (selectedCollection && selectedCollection !== 'All') {
      list = list.filter(p => p.collectionType.toLowerCase() === selectedCollection.toLowerCase());
    }

    if (sortOption === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(list);
  }, [products, selectedCategory, selectedGender, selectedCollection, sortOption]);

  return (
    <section id="shop-catalog" className="py-16 bg-vyora-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="mb-8 border-b border-gold/20 pb-4 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-gold text-xs font-bold tracking-widest uppercase mb-1 block">
              Luxury Garments
            </span>
            <h2 className="font-poppins font-black text-3xl sm:text-4xl text-white">
              {selectedCategory === 'All' ? 'Complete Collection' : selectedCategory}
            </h2>
          </div>
          <span className="text-gray-400 text-sm mt-2 md:mt-0 font-medium">
            Showing <strong className="text-gold">{filteredProducts.length}</strong> items
          </span>
        </div>

        {/* Filters & Controls Bar */}
        <div className="bg-vyora-card border border-white/10 rounded-2xl p-4 mb-10 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Category Tabs Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-gold text-black shadow-gold-glow font-extrabold'
                    : 'bg-charcoal text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Secondary Controls (Gender, Collection, Sort) */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Gender Filter */}
            <select
              value={selectedGender}
              onChange={(e) => setSelectedGender(e.target.value)}
              className="bg-charcoal text-gray-200 text-xs font-semibold px-3 py-2 rounded-lg border border-white/10 focus:border-gold outline-none"
            >
              <option value="All">All Genders</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>

            {/* Collection Filter */}
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              className="bg-charcoal text-gray-200 text-xs font-semibold px-3 py-2 rounded-lg border border-white/10 focus:border-gold outline-none"
            >
              <option value="All">All Collections</option>
              <option value="Streetwear">Streetwear</option>
              <option value="Casual Wear">Casual Wear</option>
              <option value="Premium Essentials">Premium Essentials</option>
              <option value="Summer Collection">Summer Collection</option>
              <option value="Winter Collection">Winter Collection</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-charcoal text-gold text-xs font-bold px-3 py-2 rounded-lg border border-gold/40 focus:border-gold outline-none"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod._id || prod.id}
                product={prod}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-vyora-card rounded-2xl border border-white/10">
            <p className="text-gray-400 text-lg font-medium mb-4">No products found matching your current filter criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedGender('All');
                setSelectedCollection('All');
              }}
              className="bg-gold text-black font-extrabold text-xs px-6 py-3 rounded-full uppercase tracking-wider shadow-gold-glow hover:scale-105 transition-transform"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
