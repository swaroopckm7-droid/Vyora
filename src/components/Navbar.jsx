import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, Sun, Moon, Menu, X, ChevronRight, Crown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useTheme } from '../context/ThemeContext';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/clerk-react';
import { VyoraLogo } from './VyoraLogo';

export const Navbar = ({ 
  activeTab, 
  setActiveTab, 
  onOpenSearch, 
  onOpenAccount, 
  onCategorySelect, 
  onGenderSelect 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen, subtotal } = useCart();
  const { totalWishlistItems, setIsWishlistOpen } = useWishlist();
  const { isDark, toggleTheme } = useTheme();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Shop', id: 'shop' },
    { name: 'New Arrivals', id: 'new-arrivals' },
    { name: 'Men', id: 'men' },
    { name: 'Women', id: 'women' },
    { name: 'Collections', id: 'collections' },
    { name: 'Owner Portal', id: 'owner-dashboard' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (linkId) => {
    setActiveTab(linkId);
    setMobileMenuOpen(false);
    if (linkId === 'men') {
      onGenderSelect('Men');
      setActiveTab('shop');
    } else if (linkId === 'women') {
      onGenderSelect('Women');
      setActiveTab('shop');
    } else if (linkId === 'new-arrivals') {
      setActiveTab('shop');
    }
  };

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-charcoal-dark via-gold/90 to-charcoal-dark text-black text-xs font-semibold py-2 px-4 text-center tracking-wider uppercase shadow-sm">
        <span>✨ Free Worldwide Express Shipping on Orders Over $150 | Use Code: <span className="font-extrabold underline">VYORA15</span> for 15% OFF ✨</span>
      </div>

      {/* Main Navigation Bar */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-vyora-black/90 dark:bg-vyora-black/90 border-b border-gold/20 backdrop-blur-md shadow-2xl py-3' 
            : 'bg-vyora-black/80 dark:bg-vyora-black/80 border-b border-white/10 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-gold transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Exact Vyora Logo Emblem */}
          <button 
            onClick={() => setActiveTab('home')}
            className="group focus:outline-none"
          >
            <VyoraLogo />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-xs font-semibold tracking-wider uppercase transition-all duration-200 relative py-1 flex items-center gap-1 ${
                  activeTab === link.id
                    ? 'text-gold font-extrabold'
                    : link.id === 'owner-dashboard'
                    ? 'text-amber-400 hover:text-gold'
                    : 'text-gray-300 hover:text-gold'
                }`}
              >
                {link.id === 'owner-dashboard' && <Crown className="w-3.5 h-3.5 text-gold" />}
                <span>{link.name}</span>
                {activeTab === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold to-gold-hover shadow-gold-glow rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Action Icons & Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Live Search Icon */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-gray-300 hover:text-gold transition-colors rounded-full hover:bg-white/5"
              title="Search products"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-300 hover:text-gold transition-colors rounded-full hover:bg-white/5"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>

            {/* User Account / Clerk User Button */}
            <div className="hidden sm:flex items-center">
              <SignedIn>
                <div className="p-1 rounded-full border border-gold/40 shadow-gold-glow">
                  <UserButton 
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8 rounded-full border border-gold"
                      }
                    }}
                  />
                </div>
              </SignedIn>

              <SignedOut>
                <button
                  onClick={onOpenAccount}
                  className="p-2 text-gray-300 hover:text-gold transition-colors rounded-full hover:bg-white/5"
                  title="Account & Owner Login"
                >
                  <User className="w-5 h-5" />
                </button>
              </SignedOut>
            </div>

            {/* Wishlist Button with Badge */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-gray-300 hover:text-gold transition-colors rounded-full hover:bg-white/5 relative"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {totalWishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-black font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-gold-glow">
                  {totalWishlistItems}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-gold via-amber-400 to-gold-dark hover:from-amber-400 hover:to-gold text-black font-bold px-3 sm:px-4 py-2 rounded-full transition-all duration-300 shadow-gold-glow hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs sm:text-sm">{totalItems}</span>
              {subtotal > 0 && (
                <span className="hidden md:inline text-xs font-extrabold border-l border-black/30 pl-2">
                  ${subtotal.toFixed(2)}
                </span>
              )}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-vyora-black border-r border-gold/20 h-full p-6 flex flex-col justify-between shadow-2xl z-10">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-gray-800">
                <VyoraLogo showTagline={false} />
                <button onClick={() => setMobileMenuOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`flex items-center justify-between text-left py-2 px-3 rounded-lg text-sm font-semibold tracking-wider uppercase transition-colors ${
                      activeTab === link.id
                        ? 'bg-gold/10 text-gold border-l-4 border-gold'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {link.id === 'owner-dashboard' && <Crown className="w-4 h-4 text-gold" />}
                      {link.name}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <button 
                onClick={() => { onOpenAccount(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 bg-charcoal border border-gold/30 text-white font-medium py-2.5 rounded-lg text-sm"
              >
                <User className="w-4 h-4 text-gold" />
                <span>Customer & Owner Login</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
