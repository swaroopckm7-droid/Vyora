import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = ({ onProceedToCheckout }) => {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, subtotal } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 150;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = freeShippingThreshold - subtotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark Overlay */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-vyora-card border-l border-gold/30 shadow-2xl flex flex-col justify-between text-left">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-gold" />
              <h2 className="font-poppins font-bold text-lg text-white">Your Shopping Bag</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-400 hover:text-white p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-charcoal px-6 py-3 border-b border-white/10 text-xs text-gray-300">
            {remainingForFreeShipping > 0 ? (
              <p>Add <strong className="text-gold">${remainingForFreeShipping.toFixed(2)}</strong> more for FREE express shipping!</p>
            ) : (
              <p className="text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> You've unlocked FREE Express Shipping!
              </p>
            )}
            <div className="w-full h-1.5 bg-black/50 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-gold to-amber-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div 
                  key={item.cartItemId}
                  className="flex gap-4 p-4 rounded-xl bg-charcoal/50 border border-white/5 items-center justify-between"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-20 object-cover rounded-lg shrink-0 border border-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-poppins font-bold text-sm text-white truncate">{item.name}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Size: <span className="text-gold font-semibold">{item.size}</span> | Color: <span className="text-gray-200">{item.color}</span>
                    </p>
                    <p className="text-sm font-extrabold text-gold mt-1">${item.price}</p>
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="w-6 h-6 rounded bg-black text-gray-300 hover:text-gold flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="w-6 h-6 rounded bg-black text-gray-300 hover:text-gold flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="text-gray-500 hover:text-rose-400 p-2"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-16">
                <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 text-sm font-medium">Your shopping bag is currently empty.</p>
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-vyora-black">
              <div className="flex justify-between items-center mb-2 text-sm text-gray-400">
                <span>Subtotal</span>
                <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-4 text-sm text-gray-400">
                <span>Estimated Shipping</span>
                <span className="text-gold font-bold">{remainingForFreeShipping <= 0 ? 'FREE' : '$15.00'}</span>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-white/10 mb-6 text-base font-black text-white">
                <span>Total</span>
                <span className="text-gold text-xl">${(subtotal + (remainingForFreeShipping <= 0 ? 0 : 15)).toFixed(2)}</span>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onProceedToCheckout();
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold via-amber-400 to-gold-dark text-black font-extrabold text-sm py-4 rounded-full shadow-gold-glow hover:scale-[1.02] transition-transform uppercase tracking-wider"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
