import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductGrid from '../components/product/ProductGrid';
import CategoryFilter from '../components/product/CategoryFilter';
import PriceFilter from '../components/product/PriceFilter';
import { Search, SlidersHorizontal, X } from 'lucide-react';

function ProductListing() {
  const location = useLocation();
  const { products, loading, filters, updateFilters } = useProducts();
  const [showFilters, setShowFilters] = React.useState(false);
  
  // Parse query params on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const searchParam = params.get('search');
  
    if (categoryParam && categoryParam !== filters.category) {
      updateFilters({ category: categoryParam });
    }
  
    if (searchParam && searchParam !== filters.search) {
      updateFilters({ search: searchParam });
    }
  }, [location.search]);
  

  const handleSearchChange = (e) => {
    updateFilters({ search: e.target.value });
  };

  const handleClearSearch = () => {
    updateFilters({ search: '' });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="bg-white py-8">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-gray-600">Browse our selection of fresh groceries</p>
        </div>
        
        {/* Search and filter bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={handleSearchChange}
              className="pl-10 w-full input-field"
            />
            {filters.search && (
              <button
                onClick={handleClearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            )}
          </div>
          
          <button
            onClick={toggleFilters}
            className="md:hidden flex items-center justify-center gap-2 btn-secondary"
          >
            <SlidersHorizontal size={18} />
            <span>Filters</span>
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters sidebar - desktop */}
          <div className="hidden md:block md:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Filters</h2>
              <CategoryFilter />
              <PriceFilter />
            </div>
          </div>
          
          {/* Filters sidebar - mobile */}
          {showFilters && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 md:hidden">
              <div className="absolute inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl p-6 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    onClick={toggleFilters}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="flex-grow overflow-y-auto">
                  <CategoryFilter />
                  <PriceFilter />
                </div>
                
                <button
                  onClick={toggleFilters}
                  className="mt-6 w-full btn-primary"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
          
          {/* Products grid */}
          <div className="flex-grow">
            <ProductGrid products={products} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListing;