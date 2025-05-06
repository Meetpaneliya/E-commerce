import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const WishlistContext = createContext(null);

export function useWishlist() {
  return useContext(WishlistContext);
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useAuth();
  const token = currentUser?.token; // Get token from currentUser
 
  
  // Fetch wishlist on login
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!token || !currentUser) {
        setLoading(false);
        return; // Don't fetch if no token
      }

      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/wishlist`, {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,  // Send token in headers
          },
        });
        console.log('Fetched wishlist:', res.data); // Log the fetched wishlist
        setWishlist(res.data); // Expected to be an array of products or productIds
      } catch (err) {
        console.error('Failed to load wishlist:', err);
        setWishlist([]);
      }
      setLoading(false);
    };

    fetchWishlist();
  }, [token]);  // Re-run when token changes

  // Add product to wishlist
  const addToWishlist = async (productId) => {
    if (!token || !currentUser) return false; // Ensure token is available

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/wishlist`,
        { productId }, // Send productId
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Send token in headers
          },
        }
      );
      setWishlist(res.data); // Assuming backend sends updated wishlist array
      return true;
    } catch (err) {
      console.error('Add to wishlist failed:', err);
      return false;
    }
  };

  // Remove product from wishlist
  const removeFromWishlist = async (productId) => {
    console.log('Removing from wishlist:', productId);
    if (!token || !currentUser) return false; // Ensure token is available
    console.log("mamla done he..",productId)

    try {
      const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/wishlist/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Send token in headers
        },
      });
      setWishlist(res.data); // Updated wishlist
      return true;
    } catch (err) {
      console.error('Remove from wishlist failed:', err);
      return false;
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
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
