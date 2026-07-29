import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, Crown, Menu as MenuIcon, X } from 'lucide-react';
import { VyoraLogo } from './VyoraLogo';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const Navbar = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenAccount,
  onCategorySelect,
  onGenderSelect
}) => {
  const { totalItems = 0, setIsCartOpen } = useCart() || {};
  const { wishlistItems = [], setIsWishlistOpen } = useWishlist() || {};
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', tab: 'home' },
    { label: 'Men', tab: 'shop', gender: 'Men' },
    { label: 'Women', tab: 'shop', gender: 'Women' },
    { label: 'New Arrivals', tab: 'shop', category: 'Oversized Wear' },
    { label: 'Collections', tab: 'collections' },
    { label: 'Lookbook', tab: 'collections' },
    { label: 'About', tab: 'about' },
    { label: 'Contact', tab: 'contact' }
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-500 ${isScrolled ? 'glass-nav py-3' : 'bg-[#0D0D0D]/90 backdrop-blur-md py-4 border-b border-white/10'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left: Mobile Menu Toggle & Brand Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-300 hover:text-gold p-1"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>

            <button onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-left focus:outline-none">
              <VyoraLogo className="h-10 sm:h-12" />
            </button>
          </div>

          {/* Center Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveTab(link.tab);
                  if (link.gender && onGenderSelect) onGenderSelect(link.gender);
                  if (link.category && onCategorySelect) onCategorySelect(link.category);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-xs font-bold uppercase tracking-[0.2em] transition-all relative py-1 ${
                  activeTab === link.tab
                    ? 'text-[#D4AF37] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#D4AF37]'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons: Search, Wishlist, Cart, Profile */}
          <div className="flex items-center gap-4 sm:gap-6">
            
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-gray-300 hover:text-[#D4AF37] transition-colors rounded-full hover:bg-white/5"
              title="Search GARMENTS"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setIsWishlistOpen && setIsWishlistOpen(true)}
              className="p-2 text-gray-300 hover:text-[#D4AF37] transition-colors relative rounded-full hover:bg-white/5"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems && wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#D4AF37] text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-gold-glow">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen && setIsCartOpen(true)}
              className="p-2 text-gray-300 hover:text-[#D4AF37] transition-colors relative rounded-full hover:bg-white/5"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 bg-[#D4AF37] text-black text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-gold-glow">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Account Modal Launcher */}
            <div className="flex items-center pl-2 border-l border-white/10">
              <button
                onClick={onOpenAccount}
                className="flex items-center gap-1.5 bg-[#D4AF37]/10 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black font-bold text-xs px-3.5 py-1.5 rounded-full border border-[#D4AF37]/40 transition-all shadow-gold-glow uppercase tracking-wider"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Account</span>
              </button>
            </div>

            {/* Owner Portal Quick Link */}
            <button
              onClick={() => setActiveTab('owner-dashboard')}
              className="hidden xl:flex items-center gap-1.5 bg-white/5 hover:bg-[#D4AF37] hover:text-black text-gray-300 text-[10px] font-extrabold uppercase px-3 py-1.5 rounded-full border border-white/10 transition-colors"
              title="Store Owner Management Dashboard"
            >
              <Crown className="w-3 h-3 text-[#D4AF37]" />
              <span>Owner</span>
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass-panel border-t border-white/10 px-6 py-6 space-y-4 text-left animate-fadeIn">
          {navLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveTab(link.tab);
                if (link.gender && onGenderSelect) onGenderSelect(link.gender);
                if (link.category && onCategorySelect) onCategorySelect(link.category);
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left font-poppins font-bold text-sm text-gray-200 hover:text-[#D4AF37] uppercase tracking-widest py-2 border-b border-white/5"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setActiveTab('owner-dashboard');
              setIsMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] text-black font-extrabold text-xs py-3 rounded-xl uppercase tracking-wider mt-4"
          >
            <Crown className="w-4 h-4" />
            <span>Store Owner Portal</span>
          </button>
        </div>
      )}
    </header>
  );
};
