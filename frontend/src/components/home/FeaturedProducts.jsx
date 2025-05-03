import React from 'react';
import { useProducts } from '../../context/ProductContext';
import ProductCard from '../product/ProductCard';

function FeaturedProducts() {
  const { getFeaturedProducts, loading } = useProducts();
  const featuredProducts = getFeaturedProducts(4);

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Products</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;