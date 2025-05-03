import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // make sure this path is correct

const ProductContext = createContext(null);

export function useProducts() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 100],
    search: ''
  });
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

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
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/categories`);
      setProductCategories(res.data);
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
      setAllProducts(prev => [...prev, res.data]);
      applyFilters(); // Re-apply filters after product creation
      return true;
    } catch (err) {
      console.error('Create product error:', err);
      setError(err.response?.data?.message || 'Failed to create product');
      return false;
    }
  };

  const applyFilters = () => {
    let filtered = [...allProducts];

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    // Price filter
    filtered = filtered.filter(
      p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Search filter
    if (filters.search) {
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
    return allProducts.find(product => product.id === id) || null;
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
    createProduct
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}
