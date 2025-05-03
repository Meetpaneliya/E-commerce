import React from 'react';
import { useProducts } from '../../context/ProductContext';

function CategoryFilter() {
  const { categories, filters, updateFilters } = useProducts();

  const handleCategoryChange = (categoryId) => {
    updateFilters({ category: categoryId });
  };

  return (
    <div className="mb-6">
      <h3 className="font-medium text-gray-900 mb-3">Categories</h3>
      <div className="space-y-2">
        <div className="flex items-center">
          <input
            id="category-all"
            name="category"
            type="radio"
            checked={filters.category === 'all'}
            onChange={() => handleCategoryChange('all')}
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
          <label htmlFor="category-all" className="ml-3 text-gray-700">
            All Categories
          </label>
        </div>

        {categories.map(category => (
          <div key={category.id} className="flex items-center">
            <input
              id={`category-${category.id}`}
              name="category"
              type="radio"
              checked={filters.category === category.id}
              onChange={() => handleCategoryChange(category.id)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor={`category-${category.id}`} className="ml-3 text-gray-700">
              {category.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;