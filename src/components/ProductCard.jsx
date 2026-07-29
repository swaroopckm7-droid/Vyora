import React from 'react';
import { Star, Eye, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const productId = product._id || product.id;
  const isWishlisted = isInWishlist(productId);

  return (
    <div className="group relative bg-vyora-card rounded-2xl overflow-hidden border border-white/10 hover:border-gold/50 transition-all duration-300 shadow-xl flex flex-col justify-between hover:shadow-gold-glow">
      
      {/* Image & Quick Badges Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-charcoal-dark cursor-pointer" onClick={() => onQuickView(product)}>
        
        {/* Product Image */}
        <img
          src={product.images ? product.images[0] : product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-gold text-black font-extrabold text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
            -{product.discount}% OFF
          </div>
        )}

        {/* Collection / Gender Pill */}
        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-gray-200 text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/10">
          {product.gender || 'Unisex'}
        </div>

        {/* Quick Action Floating Buttons (Appear on Hover) */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
          
          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-10 h-10 rounded-full bg-black/80 hover:bg-gold text-white hover:text-black flex items-center justify-center transition-all duration-200 shadow-lg transform translate-y-4 group-hover:translate-y-0"
            title="Quick View"
          >
            <Eye className="w-5 h-5" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-delay-75 ${
              isWishlisted
                ? 'bg-rose-600 text-white'
                : 'bg-black/80 hover:bg-gold text-white hover:text-black'
            }`}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
            <span className="text-gold font-medium uppercase tracking-wider">{product.category}</span>
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-gray-500">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-poppins font-bold text-base text-white group-hover:text-gold transition-colors line-clamp-1 cursor-pointer mb-2"
          >
            {product.name}
          </h3>

          {/* Color Swatch Dots */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mb-3">
              {product.colors.map((col, idx) => (
                <span
                  key={idx}
                  className="w-3 h-3 rounded-full border border-white/20 inline-block shadow-sm"
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
            </div>
          )}
        </div>

        {/* Price & Add to Bag CTA */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between mt-2">
          <div className="flex items-baseline gap-2">
            <span className="font-poppins font-black text-lg text-white">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 bg-gold/10 hover:bg-gold text-gold hover:text-black border border-gold/40 font-bold text-xs px-3.5 py-2 rounded-full transition-all duration-300 shadow-gold-glow"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

      </div>

    </div>
  );
};
