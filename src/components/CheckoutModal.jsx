import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Lock, CreditCard, Smartphone, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { submitOrder } from '../services/api';
import { useToast } from '../context/ToastContext';
import { useUser } from '@clerk/clerk-react';

export const CheckoutModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { cartItems, subtotal, clearCart } = useCart();
  const { showToast } = useToast();
  const { user, isSignedIn } = useUser();

  const [step, setStep] = useState('form');
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [orderResult, setOrderResult] = useState(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '+1 555-019-2834',
    address: '742 Fashion Boulevard, Suite 4B',
    city: 'New York',
    postalCode: '10001',
    country: 'United States'
  });

  useEffect(() => {
    if (isSignedIn && user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Alex Vance',
        email: user.primaryEmailAddress?.emailAddress || 'alex.vance@example.com'
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || 'Alex Vance',
        email: prev.email || 'alex.vance@example.com'
      }));
    }
  }, [isSignedIn, user]);

  const shippingFee = subtotal >= 150 ? 0 : 15;
  const totalAmount = Math.max(0, subtotal + shippingFee - appliedDiscount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'VYORA15') {
      const discount = subtotal * 0.15;
      setAppliedDiscount(discount);
      showToast('15% Promo Discount Applied!', 'success');
    } else {
      showToast('Invalid promo code. Use code: VYORA15', 'error');
    }
  };

  const handleCompleteOrder = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.address) {
      showToast('Please fill out all required shipping fields', 'error');
      return;
    }

    setLoading(true);
    const orderPayload = {
      customer: formData,
      items: cartItems,
      subtotal,
      shippingFee,
      discountAmount: appliedDiscount,
      totalAmount,
      paymentMethod
    };

    const res = await submitOrder(orderPayload);
    setLoading(false);

    if (res.success) {
      setOrderResult(res.order);
      setStep('success');
      clearCart();
      showToast('Order placed successfully!', 'success');
    } else {
      showToast(res.message || 'Order checkout failed', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-vyora-card border border-gold/40 rounded-3xl overflow-hidden shadow-2xl z-10 text-left my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-charcoal-dark">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-gold" />
            <h2 className="font-poppins font-bold text-xl text-white">
              {step === 'form' ? 'Express Checkout' : 'Order Receipt'}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {step === 'form' ? (
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Shipping Form & Payment Selection */}
            <form onSubmit={handleCompleteOrder} className="p-6 sm:p-8 space-y-6">
              
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-poppins font-bold text-sm text-gold uppercase tracking-wider">
                    1. Shipping Information
                  </h3>
                  {isSignedIn && (
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
                      Auto-filled by Clerk
                    </span>
                  )}
                </div>
                
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded-xl p-3 text-sm text-white focus:border-gold outline-none"
                    required
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-charcoal border border-white/10 rounded-xl p-3 text-sm text-white focus:border-gold outline-none"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-charcoal border border-white/10 rounded-xl p-3 text-sm text-white focus:border-gold outline-none"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Street Address *"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-charcoal border border-white/10 rounded-xl p-3 text-sm text-white focus:border-gold outline-none"
                    required
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="City *"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-charcoal border border-white/10 rounded-xl p-3 text-sm text-white focus:border-gold outline-none"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Postal Code *"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full bg-charcoal border border-white/10 rounded-xl p-3 text-sm text-white focus:border-gold outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <h3 className="font-poppins font-bold text-sm text-gold uppercase tracking-wider mb-3">
                  2. Payment Method
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'Card', label: 'Credit Card', icon: CreditCard },
                    { id: 'UPI', label: 'UPI / Net', icon: Smartphone },
                    { id: 'COD', label: 'Cash / Delivery', icon: Truck }
                  ].map((pm) => {
                    const Icon = pm.icon;
                    return (
                      <button
                        type="button"
                        key={pm.id}
                        onClick={() => setPaymentMethod(pm.id)}
                        className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                          paymentMethod === pm.id
                            ? 'bg-gold/15 border-gold text-gold shadow-gold-glow'
                            : 'bg-charcoal border-white/10 text-gray-400 hover:text-white'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{pm.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gold via-amber-400 to-gold-dark text-black font-extrabold text-sm py-4 rounded-full shadow-gold-glow hover:scale-[1.02] transition-transform uppercase tracking-wider disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                <span>{loading ? 'Processing Order...' : `Pay $${totalAmount.toFixed(2)} Securely`}</span>
              </button>

            </form>

            {/* Order Summary Column */}
            <div className="p-6 sm:p-8 bg-charcoal-dark border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-between">
              
              <div>
                <h3 className="font-poppins font-bold text-sm text-white uppercase tracking-wider mb-4">
                  Order Summary ({cartItems.length} items)
                </h3>

                {/* Items preview list */}
                <div className="max-h-56 overflow-y-auto space-y-3 mb-6 pr-2">
                  {cartItems.map((item) => (
                    <div key={item.cartItemId} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt="" className="w-10 h-12 object-cover rounded border border-white/10" />
                        <div>
                          <p className="font-bold text-white line-clamp-1">{item.name}</p>
                          <p className="text-gray-400">Qty: {item.quantity} | Size: {item.size}</p>
                        </div>
                      </div>
                      <span className="font-bold text-gold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div className="mb-6 pt-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. VYORA15)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-charcoal border border-white/10 rounded-xl px-3 py-2 text-xs text-white uppercase outline-none focus:border-gold"
                    />
                    <button
                      onClick={handleApplyPromo}
                      type="button"
                      className="bg-gold text-black font-bold text-xs px-4 py-2 rounded-xl uppercase shadow-gold-glow"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {/* Calculation breakdown */}
                <div className="space-y-2 text-xs text-gray-400 border-t border-white/10 pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Express Shipping</span>
                    <span className="text-gold font-bold">{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>Promo Discount (15%)</span>
                      <span>-${appliedDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-black text-white pt-3 border-t border-white/10">
                    <span>Total Amount</span>
                    <span className="text-gold text-xl">${totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* Step 2: Order Confirmation Receipt */
          <div className="p-10 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold text-gold flex items-center justify-center mx-auto shadow-gold-glow">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-1">
                Payment Confirmed
              </span>
              <h2 className="font-poppins font-black text-3xl text-white mb-2">
                Thank You For Your Order!
              </h2>
              <p className="text-gray-300 text-sm max-w-md mx-auto">
                We have received your order <strong className="text-gold">#{orderResult?.orderNumber}</strong>. A confirmation email has been sent to <span className="text-white">{formData.email}</span>.
              </p>
            </div>

            <div className="bg-charcoal border border-white/10 rounded-2xl p-6 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Order Number:</span>
                <span className="font-bold text-gold">{orderResult?.orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Paid:</span>
                <span className="font-bold text-white">${orderResult?.totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment Status:</span>
                <span className="font-bold text-emerald-400">{orderResult?.paymentStatus || 'Paid'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Estimated Delivery:</span>
                <span className="font-bold text-white">3-5 Business Days</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="bg-gold text-black font-extrabold text-sm px-8 py-3.5 rounded-full uppercase tracking-wider shadow-gold-glow hover:scale-105 transition-transform"
            >
              Continue Shopping
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
