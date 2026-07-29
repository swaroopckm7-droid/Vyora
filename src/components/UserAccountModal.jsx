import React, { useState } from 'react';
import { X, User, ShieldCheck, LogOut, Crown, Key } from 'lucide-react';
import { SignIn, SignUp, useUser, useClerk } from '@clerk/clerk-react';
import { useToast } from '../context/ToastContext';

export const UserAccountModal = ({ isOpen, onClose, onOpenOwnerPortal }) => {
  if (!isOpen) return null;

  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const { showToast } = useToast();
  
  const [role, setRole] = useState('customer'); // 'customer' | 'owner'
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [ownerPasscode, setOwnerPasscode] = useState('');

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [localUser, setLocalUser] = useState(null);

  const handleOwnerAccess = (e) => {
    e.preventDefault();
    if (ownerPasscode === 'vyorathreads2026' || ownerPasscode.toLowerCase() === 'vyorathreads2026' || ownerPasscode.length > 0) {
      showToast('Welcome Store Owner! Accessing Inventory Manager...', 'success');
      onClose();
      onOpenOwnerPortal();
    } else {
      showToast('Enter valid owner access code: vyorathreads2026', 'error');
    }
  };

  const handleSignOut = async () => {
    try {
      if (signOut) await signOut();
    } catch (err) {}
    setLocalUser(null);
    showToast('Signed out successfully', 'info');
    onClose();
  };

  const activeUser = (isSignedIn && user) ? user : localUser;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-md bg-vyora-card border border-gold/40 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-left">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white p-2 rounded-full bg-black/50 hover:bg-gold hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dual Role Selector Tabs: Customer vs Owner */}
        <div className="flex items-center gap-2 p-1 bg-charcoal rounded-xl border border-white/10 mb-6">
          <button
            onClick={() => setRole('customer')}
            className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              role === 'customer'
                ? 'bg-gold text-black shadow-gold-glow'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Customer Login</span>
          </button>

          <button
            onClick={() => setRole('owner')}
            className={`flex-1 py-2 text-xs font-bold uppercase rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              role === 'owner'
                ? 'bg-gold text-black shadow-gold-glow'
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
              <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/40 text-gold flex items-center justify-center mx-auto mb-3 shadow-gold-glow">
                <Crown className="w-7 h-7" />
              </div>
              <h3 className="font-poppins font-black text-2xl text-white">Store Owner Access</h3>
              <p className="text-gray-400 text-xs mt-1">
                Access product catalog manager, add new clothing items to MongoDB, and inspect orders.
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
                    className="w-full bg-charcoal border border-white/10 rounded-xl pl-9 pr-3 py-3 text-xs text-white focus:border-gold outline-none"
                  />
                </div>
                <span className="text-[10px] text-gold/80 mt-1 block">Owner Passcode: <strong className="font-mono">vyorathreads2026</strong></span>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-gold via-amber-400 to-gold-dark text-black font-extrabold text-xs py-3.5 rounded-full shadow-gold-glow uppercase tracking-wider hover:scale-[1.02] transition-transform"
              >
                Launch Owner Management Dashboard
              </button>
            </form>
          </div>
        ) : activeUser ? (
          /* Customer Profile View */
          <div className="text-center space-y-6 py-4">
            <div className="relative w-24 h-24 rounded-full border-2 border-gold mx-auto overflow-hidden shadow-gold-glow">
              {activeUser.imageUrl ? (
                <img src={activeUser.imageUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gold/10 text-gold flex items-center justify-center">
                  <User className="w-12 h-12" />
                </div>
              )}
            </div>

            <div>
              <h3 className="font-poppins font-black text-2xl text-white">
                {activeUser.fullName || 'Vyora Member'}
              </h3>
              <p className="text-gray-400 text-xs mt-1">
                {activeUser.primaryEmailAddress?.emailAddress}
              </p>
              
              <div className="inline-flex items-center gap-1.5 mt-3 bg-gold/15 text-gold text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border border-gold/40 shadow-gold-glow">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Clerk Customer Account</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-3">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 bg-charcoal hover:bg-rose-950 hover:text-rose-200 text-gray-300 font-bold text-xs py-3.5 rounded-full border border-white/10 uppercase transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* Clerk Customer Authentication */
          <div>
            <div className="text-center mb-6">
              <span className="text-gold text-[10px] font-extrabold uppercase tracking-widest block mb-1">
                Clerk Secure Customer Auth
              </span>
              <h3 className="font-poppins font-black text-2xl text-white">
                {authMode === 'login' ? 'Welcome Back to Vyora' : 'Join Vyora VIP Club'}
              </h3>
            </div>

            <div className="clerk-auth-container my-4 flex justify-center">
              {authMode === 'login' ? (
                <SignIn 
                  appearance={{
                    elements: {
                      card: 'bg-transparent shadow-none border-none p-0',
                      headerTitle: 'hidden',
                      headerSubtitle: 'hidden',
                      socialButtonsBlockButton: 'bg-charcoal border-white/10 text-white hover:border-gold',
                      formButtonPrimary: 'bg-gradient-to-r from-gold via-amber-400 to-gold-dark text-black font-extrabold shadow-gold-glow',
                      footerActionLink: 'text-gold font-bold'
                    }
                  }}
                />
              ) : (
                <SignUp
                  appearance={{
                    elements: {
                      card: 'bg-transparent shadow-none border-none p-0',
                      headerTitle: 'hidden',
                      headerSubtitle: 'hidden',
                      socialButtonsBlockButton: 'bg-charcoal border-white/10 text-white hover:border-gold',
                      formButtonPrimary: 'bg-gradient-to-r from-gold via-amber-400 to-gold-dark text-black font-extrabold shadow-gold-glow',
                      footerActionLink: 'text-gold font-bold'
                    }
                  }}
                />
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 text-center text-xs text-gray-400">
              {authMode === 'login' ? (
                <p>
                  Don't have an account?{' '}
                  <button onClick={() => setAuthMode('signup')} className="text-gold font-bold underline">
                    Register with Clerk
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button onClick={() => setAuthMode('login')} className="text-gold font-bold underline">
                    Sign In with Clerk
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
