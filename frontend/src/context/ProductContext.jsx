import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { categories } from '../data/products';
import { useAuth } from './AuthContext'; 

const ProductContext = createContext(null);

export function useProducts() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 10000],
    search: ''
  });

  const { currentUser } = useAuth();

  // Fetch data on mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Apply filters whenever data or filters change
  useEffect(() => {
    if (allProducts.length > 0) {
      applyFilters();
    }
  }, [filters, allProducts]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/products`);
      setAllProducts(res.data);
      setFilteredProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setProductCategories(categories); // You can later replace with API
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
    }
  };

  const createProduct = async (formData) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/products`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      const newProduct = res.data;
      const updatedProducts = [...allProducts, newProduct];
      setAllProducts(updatedProducts);
      applyFilters(updatedProducts); // Apply filters after adding
      return true;
    } catch (err) {
      console.error('Create product error:', err);
      setError(err.response?.data?.message || 'Failed to create product');
      return false;
    }
  };

  const updateProduct = async (id, formData) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const token = currentUser?.token;

      await axios.put(`${import.meta.env.VITE_BASE_URL}/api/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      await fetchProducts(); // refresh product list
    } catch (err) {
      console.error('Error updating product:', err);
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const token = currentUser?.token;

      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Remove from allProducts state
      const updatedProducts = allProducts.filter((product) => product._id !== id);
      setAllProducts(updatedProducts);

      // Update filteredProducts to reflect the deleted product
      setFilteredProducts(updatedProducts);
      
      // Reapply filters to the updated list (if filters are active)
      applyFilters(updatedProducts);
      
    } catch (err) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product');
    }
  }

  const applyFilters = (customProducts = allProducts) => {
    let filtered = [...customProducts];

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    // Price filter
    filtered = filtered.filter(
      p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Search filter
    if (filters.search.trim() !== '') {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }

    setFilteredProducts(filtered);
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const getProductById = (id) => {
    return allProducts.find(product => product._id === id) || null;
  };

  const getFeaturedProducts = (limit = 4) => {
    return allProducts.filter(p => p.featured).slice(0, limit);
  };

  const getRelatedProducts = (categoryId, currentProductId, limit = 4) => {
    return allProducts
      .filter(p => p.category === categoryId && p.id !== currentProductId)
      .slice(0, limit);
  };

  const value = {
    products: filteredProducts,
    categories: productCategories,
    loading,
    error,
    filters,
    updateFilters,
    getProductById,
    getFeaturedProducts,
    getRelatedProducts,
    createProduct,
    updateProduct,
    deleteProduct
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}
