import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem('vyora_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    localStorage.setItem('vyora_wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = (product) => {
    const productId = product._id || product.id;
    const exists = wishlistItems.some(item => (item._id || item.id) === productId);

    if (exists) {
      setWishlistItems(prev => prev.filter(item => (item._id || item.id) !== productId));
      showToast(`Removed ${product.name} from Wishlist`, 'info');
    } else {
      setWishlistItems(prev => [...prev, product]);
      showToast(`Added ${product.name} to Wishlist`, 'success');
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => (item._id || item.id) === productId);
  };

  const totalWishlistItems = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        isWishlistOpen,
        setIsWishlistOpen,
        toggleWishlist,
        isInWishlist,
        totalWishlistItems
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
