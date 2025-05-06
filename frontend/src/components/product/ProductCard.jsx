import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { currentUser } = useAuth();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Wishlist button clicked!');
    
    if (!currentUser) {
      navigate('/login'); 
      return;
    }

    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product._id);
    }
  };

  if (!product) return null;

  return (
    <div className="product-card overflow-hidden group relative">
      {/* Make the main content clickable using Link */}
      <Link to={`/products/${product._id}`}>
        <div className="h-48 w-full overflow-hidden">
          <img 
            src={product.image || 'https://via.placeholder.com/150'} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-500">{product.unit}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</span>
          </div>
        </div>
      </Link>
  
      {/* Quick action buttons (outside the Link to avoid accidental navigation on button click) */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={handleWishlistClick}
          className={`bg-white p-2 rounded-full shadow-md transition-colors ${
            isInWishlist(product._id) 
              ? 'text-red-500 hover:text-red-600' 
              : 'text-gray-700 hover:text-primary-500'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart size={18} className={isInWishlist(product._id) ? 'fill-current' : ''} />
        </button>
      </div>
  
      <div className="absolute bottom-16 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={handleAddToCart}
          className="bg-primary-500 p-2 rounded-full shadow-md text-white hover:bg-primary-600 transition-colors"
          aria-label="Add to cart"
        >
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;