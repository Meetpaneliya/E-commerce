import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="bg-white py-12">
        <div className="container-custom text-center">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-gray-100 p-6 rounded-full mb-6">
              <Heart size={48} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Sign In</h2>
            <p className="text-gray-600 mb-8">Sign in to view and manage your wishlist</p>
            <Link 
              to="/login" 
              className="btn-primary flex items-center gap-2 px-6 py-3"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="bg-white py-12">
        <div className="container-custom text-center">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-gray-100 p-6 rounded-full mb-6">
              <Heart size={48} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h2>
            <p className="text-gray-600 mb-8">Start saving your favorite items!</p>
            <Link 
              to="/products" 
              className="btn-primary flex items-center gap-2 px-6 py-3"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-8">
      <div className="container-custom">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">My Wishlist</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <Link to={`/products/${product.id}`} className="block relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </Link>
              
              <div className="p-4">
                <Link to={`/products/${product.id}`}>
                  <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                </Link>
                <p className="text-gray-500 text-sm mb-2">{product.unit}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="flex-1 btn-primary py-2 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    <span>Add to Cart</span>
                  </button>
                  
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="btn-secondary p-2"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;