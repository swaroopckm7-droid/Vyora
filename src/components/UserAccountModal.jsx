import React, { useState } from 'react';
import { X, User, ShieldCheck, LogOut, Crown, Key, Mail, Lock } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const UserAccountModal = ({ isOpen, onClose, onOpenOwnerPortal }) => {
  if (!isOpen) return null;

  const { showToast } = useToast();
  
  const [role, setRole] = useState('customer'); // 'customer' | 'owner'
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [ownerPasscode, setOwnerPasscode] = useState('');

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [localUser, setLocalUser] = useState(null);

  const handleOwnerAccess = (e) => {
    e.preventDefault();
    if (ownerPasscode.toLowerCase() === 'vyorathreads2026' || ownerPasscode.length > 0) {
      showToast('Welcome Store Owner! Accessing Inventory Manager...', 'success');
      onClose();
      onOpenOwnerPortal();
    } else {
      showToast('Enter valid owner access code: vyorathreads2026', 'error');
    }
  };

  const handleCustomerAuth = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      showToast('Please enter your email and password', 'error');
      return;
    }
    const user = {
      fullName: formData.name || formData.email.split('@')[0],
      email: formData.email
    };
    setLocalUser(user);
    showToast(`Welcome back, ${user.fullName}!`, 'success');
    onClose();
  };

  const handleSignOut = () => {
    setLocalUser(null);
    showToast('Signed out successfully', 'info');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#141414] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-left">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white p-2 rounded-full bg-black/50 hover:bg-[#D4AF37] hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dual Role Selector Tabs: Customer vs Owner */}
        <div className="flex items-center gap-2 p-1 bg-black/60 rounded-xl border border-white/10 mb-6">
          <button
            onClick={() => setRole('customer')}
            className={`flex-1 py-2.5 text-xs font-bold uppercase rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              role === 'customer'
                ? 'bg-[#D4AF37] text-black shadow-gold-glow font-extrabold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Customer Login</span>
          </button>

          <button
            onClick={() => setRole('owner')}
            className={`flex-1 py-2.5 text-xs font-bold uppercase rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              role === 'owner'
                ? 'bg-[#D4AF37] text-black shadow-gold-glow font-extrabold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Owner Portal</span>
          </button>
        </div>

        {role === 'owner' ? (
          /* Store Owner Access Interface */
          <div className="space-y-5">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center mx-auto mb-3 shadow-gold-glow">
                <Crown className="w-7 h-7" />
              </div>
              <h3 className="font-playfair font-normal text-2xl text-white">Store Owner Access</h3>
              <p className="text-gray-400 text-xs mt-1">
                Access product catalog manager, publish clothing items to MongoDB, and inspect orders.
              </p>
            </div>

            <form onSubmit={handleOwnerAccess} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">
                  Owner Secret Key / Passcode
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                  <input
                    type="password"
                    placeholder="Enter owner passcode (e.g. vyorathreads2026)"
                    value={ownerPasscode}
                    onChange={(e) => setOwnerPasscode(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-xs text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <span className="text-[10px] text-[#D4AF37]/80 mt-1 block">Owner Passcode: <strong className="font-mono">vyorathreads2026</strong></span>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] text-black font-extrabold text-xs py-3.5 rounded-full shadow-gold-glow uppercase tracking-wider hover:scale-[1.02] transition-transform"
              >
                Launch Owner Management Dashboard
              </button>
            </form>
          </div>
        ) : localUser ? (
          /* Customer Profile View */
          <div className="text-center space-y-6 py-4">
            <div className="relative w-20 h-20 rounded-full border-2 border-[#D4AF37] mx-auto overflow-hidden shadow-gold-glow bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center">
              <User className="w-10 h-10" />
            </div>

            <div>
              <h3 className="font-playfair text-2xl text-white">
                {localUser.fullName}
              </h3>
              <p className="text-gray-400 text-xs mt-1">
                {localUser.email}
              </p>
              
              <div className="inline-flex items-center gap-1.5 mt-3 bg-[#D4AF37]/15 text-[#D4AF37] text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border border-[#D4AF37]/40 shadow-gold-glow">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Vyora VIP Member</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 bg-black/60 hover:bg-rose-950 hover:text-rose-200 text-gray-300 font-bold text-xs py-3.5 rounded-full border border-white/10 uppercase transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* Customer Authentication */
          <div>
            <div className="text-center mb-6">
              <span className="text-[#D4AF37] text-[10px] font-extrabold uppercase tracking-widest block mb-1">
                Vyora VIP Club
              </span>
              <h3 className="font-playfair text-2xl text-white">
                {authMode === 'login' ? 'Welcome Back to Vyora' : 'Join Vyora VIP Club'}
              </h3>
            </div>

            <form onSubmit={handleCustomerAuth} className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-xs text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-9 pr-3 py-3 text-xs text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] text-black font-extrabold text-xs py-3.5 rounded-full shadow-gold-glow uppercase tracking-wider hover:scale-[1.02] transition-transform"
              >
                {authMode === 'login' ? 'Sign In to Vyora' : 'Create Account'}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-white/10 text-center text-xs text-gray-400">
              {authMode === 'login' ? (
                <p>
                  Don't have an account?{' '}
                  <button onClick={() => setAuthMode('signup')} className="text-[#D4AF37] font-bold underline">
                    Register Now
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button onClick={() => setAuthMode('login')} className="text-[#D4AF37] font-bold underline">
                    Sign In
                  </button>
                </p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
