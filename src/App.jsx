import React, { useState, useEffect, Component } from 'react';
import { ClerkProvider } from '@clerk/clerk-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedCategories } from './components/FeaturedCategories';
import { ProductGrid } from './components/ProductGrid';
import { QuickViewModal } from './components/QuickViewModal';
import { TrendingCollections } from './components/TrendingCollections';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { InstagramGallery } from './components/InstagramGallery';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { UserAccountModal } from './components/UserAccountModal';
import { OwnerDashboard } from './components/OwnerDashboard';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { ScrollToTop } from './components/ScrollToTop';

import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';

import { fetchProducts } from './services/api';

const CLERK_PUBLISHABLE_KEY = 
  (import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '').trim() || 
  (import.meta.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '').trim() || 
  'pk_test_ZGVjZW50LWNyYWItMTQuY2xlcmsuYWNjb3VudHMuZGV2JA';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("VyoraApp Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col items-center justify-center p-6 text-center">
          <h1 className="font-playfair text-4xl text-[#D4AF37] mb-4">VyoraThreads Luxury Platform</h1>
          <p className="text-gray-300 max-w-md mb-6 text-sm">
            The application encountered a minor runtime glitch. Please refresh to reload the luxury atelier experience.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-widest rounded-full shadow-gold-glow"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function MainApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals & Drawers state
  const [selectedProductForQuickView, setSelectedProductForQuickView] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');

  const reloadCatalog = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts();
      setProducts(data || []);
    } catch (e) {
      console.error('Fetch products error:', e);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadCatalog();
  }, []);

  const handleSelectCategory = (catName) => {
    setSelectedCategory(catName);
    setActiveTab('shop');
    const catalogEl = document.getElementById('shop-catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCollection = (collectionName) => {
    setSelectedCategory('All');
    setActiveTab('shop');
    const catalogEl = document.getElementById('shop-catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setSelectedCategory('All');
    setActiveTab('shop');
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-gray-100 flex flex-col justify-between">
      
      {/* Sticky Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onCategorySelect={handleSelectCategory}
        onGenderSelect={handleGenderSelect}
      />

      {/* Main Content Router View */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero
              onShopNow={() => {
                setActiveTab('shop');
                window.scrollTo({ top: 500, behavior: 'smooth' });
              }}
              onExploreCollection={() => {
                setActiveTab('collections');
              }}
            />

            <FeaturedCategories onSelectCategory={handleSelectCategory} />

            <ProductGrid
              products={products}
              onQuickView={setSelectedProductForQuickView}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedGender={selectedGender}
              setSelectedGender={setSelectedGender}
            />

            <TrendingCollections onSelectCollection={handleSelectCollection} />

            <WhyChooseUs />

            <Testimonials />

            <InstagramGallery />

            <Newsletter />
          </>
        )}

        {activeTab === 'shop' && (
          <div className="pt-8">
            <ProductGrid
              products={products}
              onQuickView={setSelectedProductForQuickView}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedGender={selectedGender}
              setSelectedGender={setSelectedGender}
            />
            <Newsletter />
          </div>
        )}

        {activeTab === 'collections' && (
          <div className="pt-8">
            <TrendingCollections onSelectCollection={handleSelectCollection} />
            <FeaturedCategories onSelectCategory={handleSelectCategory} />
            <Newsletter />
          </div>
        )}

        {activeTab === 'owner-dashboard' && (
          <OwnerDashboard onProductAdded={reloadCatalog} />
        )}

        {activeTab === 'about' && (
          <div>
            <AboutSection />
            <WhyChooseUs />
            <Newsletter />
          </div>
        )}

        {activeTab === 'contact' && (
          <div>
            <ContactSection />
            <Newsletter />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={(tab) => {
        if (['home', 'shop', 'about', 'contact', 'collections', 'owner-dashboard'].includes(tab)) {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }} />

      {/* Modals & Drawers */}
      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />
      
      <WishlistDrawer />

      <QuickViewModal
        product={selectedProductForQuickView}
        onClose={() => setSelectedProductForQuickView(null)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onQuickView={setSelectedProductForQuickView}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <UserAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onOpenOwnerPortal={() => setActiveTab('owner-dashboard')}
      />

      {/* Scroll To Top Button */}
      <ScrollToTop />

    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
        <ThemeProvider>
          <ToastProvider>
            <CartProvider>
              <WishlistProvider>
                <MainApp />
              </WishlistProvider>
            </CartProvider>
          </ToastProvider>
        </ThemeProvider>
      </ClerkProvider>
    </ErrorBoundary>
  );
}
