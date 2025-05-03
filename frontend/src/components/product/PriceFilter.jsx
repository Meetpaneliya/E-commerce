import React, { useState, useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';

function PriceFilter() {
  const { filters, updateFilters } = useProducts();
  const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange);
  
  useEffect(() => {
    setLocalPriceRange(filters.priceRange);
  }, [filters.priceRange]);

  const handlePriceChange = (index, value) => {
    const newRange = [...localPriceRange];
    newRange[index] = Number(value);
    
    // Make sure min <= max
    if (index === 0 && newRange[0] > newRange[1]) {
      newRange[0] = newRange[1];
    } else if (index === 1 && newRange[1] < newRange[0]) {
      newRange[1] = newRange[0];
    }
    
    setLocalPriceRange(newRange);
  };

  const handleApplyFilter = () => {
    updateFilters({ priceRange: localPriceRange });
  };

  return (
    <div className="mb-6">
      <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <label htmlFor="min-price" className="block text-sm text-gray-600 mb-1">
              Min ($)
            </label>
            <input
              type="number"
              id="min-price"
              value={localPriceRange[0]}
              onChange={(e) => handlePriceChange(0, e.target.value)}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="max-price" className="block text-sm text-gray-600 mb-1">
              Max ($)
            </label>
            <input
              type="number"
              id="max-price"
              value={localPriceRange[1]}
              onChange={(e) => handlePriceChange(1, e.target.value)}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
        </div>
        <button
          onClick={handleApplyFilter}
          className="w-full bg-primary-500 text-white py-2 rounded-md hover:bg-primary-600 transition-colors"
        >
          Apply
        </button>
      </div>
    </div>
  );
}

export default PriceFilter;