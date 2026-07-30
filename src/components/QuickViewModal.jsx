import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, Truck, ZoomIn, Wand2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const QuickViewModal = ({ product, onClose, onOpenVirtualTryOn }) => {
  if (!product) return null;

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0]?.name : 'Default');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  const images = product.images && product.images.length > 0 
    ? product.images 
    : [product.image || 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'];

  const productId = product._id || product.id;
  const isWishlisted = isInWishlist(productId);

  const currencySymbol = typeof product.price === 'number' && product.price > 300 ? '₹' : '$';

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      
      {/* Dark Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-[#141414] border border-[#D4AF37]/30 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl z-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-[#D4AF37] text-white hover:text-black flex items-center justify-center transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image Zoom & Gallery */}
          <div className="p-6 bg-[#0F0F0F] flex flex-col justify-between">
            
            {/* Main Active Image with Zoom */}
            <div 
              className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-zoom-in group bg-black"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <img
                src={images[activeImageIndex]}
                alt={product.name}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
              />

              {/* AI Virtual Try-On Badge Button on Product Image */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenVirtualTryOn && onOpenVirtualTryOn(product);
                }}
                className="absolute top-3 left-3 bg-[#D4AF37] hover:bg-amber-300 text-black font-extrabold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-gold-glow transition-transform hover:scale-105 uppercase tracking-wider"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>Try On Me (AI)</span>
              </button>

              <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-[#D4AF37] text-xs px-3 py-1.5 rounded-full flex items-center gap-1 font-semibold pointer-events-none">
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Hover to Zoom</span>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === index ? 'border-[#D4AF37] shadow-gold-glow' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Right Column: Details & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between text-left">
            
            <div>
              {/* Category Pill & Rating */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{product.rating}</span>
                  <span className="text-gray-400 text-xs">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Product Name */}
              <h2 className="font-poppins font-black text-2xl sm:text-3xl text-white mb-3 leading-snug">
                {product.name}
              </h2>

              {/* Price & Discount */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-poppins font-black text-2xl text-[#D4AF37]">
                  {currencySymbol}{product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-gray-400 line-through">
                    {currencySymbol}{product.originalPrice}
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-[#D4AF37]/40">
                    Save {product.discount}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Individual AI Virtual Try-On Banner */}
              <div className="mb-6 bg-[#1F1F1F] border border-[#D4AF37]/40 p-4 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center">
                    <Wand2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">See How You Look In This Dress</p>
                    <p className="text-gray-400 text-[11px]">Upload photo or snap live camera preview</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onOpenVirtualTryOn && onOpenVirtualTryOn(product);
                  }}
                  className="px-4 py-2 bg-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-gold-glow hover:scale-105 transition-transform"
                >
                  AI Try-On
                </button>
              </div>

              {/* Color Swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                    Color: <span className="text-[#D4AF37]">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedColor === c.name ? 'border-[#D4AF37] scale-110 shadow-gold-glow' : 'border-transparent opacity-80 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColor === c.name && (
                          <Check className={`w-4 h-4 ${c.hex === '#FFFFFF' || c.hex === '#F5F5F0' ? 'text-black' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                      Size: <span className="text-[#D4AF37]">{selectedSize}</span>
                    </label>
                    <span className="text-[11px] text-gray-400 underline cursor-pointer">Size Guide</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                          selectedSize === s
                            ? 'bg-[#D4AF37] text-black shadow-gold-glow border-[#D4AF37]'
                            : 'bg-[#1F1F1F] text-gray-300 border border-white/10 hover:border-[#D4AF37]/40'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* CTA Buttons */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] text-black font-extrabold text-sm py-3.5 rounded-full shadow-gold-glow hover:scale-[1.02] transition-transform uppercase tracking-wider"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart • {currencySymbol}{(product.price * quantity).toFixed(0)}</span>
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-full border transition-all ${
                  isWishlisted
                    ? 'bg-rose-600 border-rose-500 text-white'
                    : 'bg-[#1F1F1F] border-white/10 text-gray-300 hover:text-[#D4AF37] hover:border-[#D4AF37]'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
