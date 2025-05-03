import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const WishlistContext = createContext(null);

export function useWishlist() {
  return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      // Load wishlist from localStorage for the current user
      const savedWishlist = localStorage.getItem(`wishlist_${currentUser.id}`);
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } else {
      setWishlist([]);
    }
    setLoading(false);
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && !loading) {
      // Save wishlist to localStorage whenever it changes
      localStorage.setItem(`wishlist_${currentUser.id}`, JSON.stringify(wishlist));
    }
  }, [wishlist, currentUser, loading]);

  const addToWishlist = (product) => {
    if (!currentUser) return false;
    
    setWishlist(prevWishlist => {
      if (!prevWishlist.some(item => item.id === product.id)) {
        return [...prevWishlist, product];
      }
      return prevWishlist;
    });
    return true;
  };

  const removeFromWishlist = (productId) => {
    if (!currentUser) return false;
    
    setWishlist(prevWishlist => 
      prevWishlist.filter(item => item.id !== productId)
    );
    return true;
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {!loading && children}
    </WishlistContext.Provider>
  );
}