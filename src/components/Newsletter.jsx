import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { subscribeNewsletter } from '../services/api';
import { useToast } from '../context/ToastContext';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setLoading(true);
    const res = await subscribeNewsletter(email);
    setLoading(false);

    if (res.success) {
      setSubscribed(true);
      showToast(res.message, 'success');
      setEmail('');
    } else {
      showToast(res.message || 'Subscription failed', 'error');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-vyora-black via-charcoal/50 to-vyora-black border-t border-gold/20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold mx-auto mb-6 shadow-gold-glow">
          <Mail className="w-8 h-8" />
        </div>

        <h2 className="font-poppins font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
          Join the VyoraThreads Community
        </h2>
        
        <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto mb-8">
          Subscribe for early access to limited drop capsules, VIP fashion previews, and an exclusive <strong className="text-gold">15% off voucher</strong> on your first order.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-3 bg-gold/10 border border-gold text-gold font-bold py-4 px-8 rounded-full shadow-gold-glow">
            <CheckCircle2 className="w-5 h-5" />
            <span>Thank you for subscribing! Your VIP code is VYORA15</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-vyora-card border border-white/20 focus:border-gold rounded-full px-6 py-4 text-sm text-white placeholder-gray-500 outline-none transition-colors"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-gold via-amber-400 to-gold-dark text-black font-extrabold text-sm px-8 py-4 rounded-full shadow-gold-glow hover:scale-105 transition-all flex items-center justify-center gap-2 uppercase tracking-wider disabled:opacity-50"
            >
              <span>{loading ? 'Subscribing...' : 'Subscribe'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

      </div>
    </section>
  );
};
