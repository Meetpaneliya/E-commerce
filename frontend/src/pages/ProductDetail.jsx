import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Heart, ShoppingCart, ChevronRight } from 'lucide-react';
import ProductGrid from '../components/product/ProductGrid';

function ProductDetail() {
  const { id } = useParams();
  const { getProductById, getRelatedProducts, loading } = useProducts();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  useEffect(() => {
    if (!loading) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
      
      if (foundProduct) {
        const related = getRelatedProducts(foundProduct.category, foundProduct.id);
        setRelatedProducts(related);
      }
    }
  }, [id, loading, getProductById, getRelatedProducts]);

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return (
      <div className="container-custom py-12">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 w-1/3 mb-4 rounded"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="md:w-1/2">
              <div className="h-8 bg-gray-200 w-3/4 mb-4 rounded"></div>
              <div className="h-6 bg-gray-200 w-1/4 mb-6 rounded"></div>
              <div className="h-4 bg-gray-200 mb-2 rounded"></div>
              <div className="h-4 bg-gray-200 mb-2 rounded"></div>
              <div className="h-4 bg-gray-200 mb-2 rounded"></div>
              <div className="h-4 bg-gray-200 mb-8 rounded"></div>
              <div className="h-12 bg-gray-200 w-1/2 mb-4 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products" className="btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="container-custom py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to="/" className="text-gray-500 hover:text-primary-600">Home</Link>
            </li>
            <li className="flex items-center">
              <ChevronRight size={16} className="text-gray-400" />
            </li>
            <li>
              <Link to="/products" className="text-gray-500 hover:text-primary-600">Products</Link>
            </li>
            <li className="flex items-center">
              <ChevronRight size={16} className="text-gray-400" />
            </li>
            <li>
              <Link 
                to={`/products?category=${product.category}`} 
                className="text-gray-500 hover:text-primary-600"
              >
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
            </li>
            <li className="flex items-center">
              <ChevronRight size={16} className="text-gray-400" />
            </li>
            <li className="text-gray-900 font-medium truncate">
              {product.name}
            </li>
          </ol>
        </nav>
        
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          {/* Product image */}
          <div className="md:w-1/2">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
          
          {/* Product details */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-semibold text-gray-900">${product.price.toFixed(2)}</span>
              <span className="text-gray-500">/ {product.unit}</span>
            </div>
            
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            {/* Nutrition info */}
            {product.nutrition && (
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-2">Nutrition Information</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(product.nutrition).map(([key, value]) => (
                    <div key={key} className="p-2 bg-gray-50 rounded">
                      <span className="text-xs text-gray-500 capitalize">{key}</span>
                      <p className="font-medium text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity selector */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Quantity</h3>
              <div className="flex items-center">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 border border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus size={18} />
                </button>
                <span className="flex items-center justify-center w-16 h-10 border-t border-b border-gray-300 text-center font-medium">
                  {quantity}
                </span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 border border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-50"
                >
                  <Plus size={18} />
                </button>
                
                <div className="ml-4 text-gray-500">
                  {product.stock > 10 
                    ? <span className="text-success-500">In Stock</span>
                    : product.stock > 0 
                      ? <span className="text-warning-500">Only {product.stock} left</span>
                      : <span className="text-error-500">Out of Stock</span>
                  }
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-grow btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={18} />
                <span>Add to Cart</span>
              </button>
              
              <button className="btn-secondary py-3 flex items-center justify-center gap-2 sm:w-auto">
                <Heart size={18} />
                <span className="sm:sr-only md:not-sr-only">Save</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <ProductGrid products={relatedProducts} loading={false} />
          </section>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;