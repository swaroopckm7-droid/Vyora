import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const WishlistDrawer = () => {
  const { wishlistItems, isWishlistOpen, setIsWishlistOpen, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-vyora-card border-l border-gold/30 shadow-2xl flex flex-col justify-between text-left">
          
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
              <h2 className="font-poppins font-bold text-lg text-white">Your Wishlist ({wishlistItems.length})</h2>
            </div>
            <button onClick={() => setIsWishlistOpen(false)} className="text-gray-400 hover:text-white p-1">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistItems.length > 0 ? (
              wishlistItems.map((item) => (
                <div 
                  key={item._id || item.id}
                  className="flex gap-4 p-4 rounded-xl bg-charcoal/50 border border-white/5 items-center justify-between"
                >
                  <img
                    src={item.images ? item.images[0] : item.image}
                    alt={item.name}
                    className="w-16 h-20 object-cover rounded-lg shrink-0 border border-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-poppins font-bold text-sm text-white truncate">{item.name}</h4>
                    <p className="text-xs text-gold uppercase mt-0.5">{item.category}</p>
                    <p className="text-sm font-extrabold text-white mt-1">${item.price}</p>
                    
                    <button
                      onClick={() => {
                        addToCart(item);
                        toggleWishlist(item);
                      }}
                      className="mt-2 text-xs font-bold text-black bg-gold hover:bg-gold-hover px-3 py-1 rounded-full flex items-center gap-1 shadow-gold-glow"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                  </div>

                  <button
                    onClick={() => toggleWishlist(item)}
                    className="text-gray-500 hover:text-rose-400 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <Heart className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 text-sm font-medium">Your wishlist is currently empty.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
