import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(item._id, newQuantity);
    }
  };

  const itemTotal = (item.price * item.quantity).toFixed(2);

  return (
    <div className="flex flex-col sm:flex-row py-6 border-b border-gray-200 last:border-b-0">
      <div className="flex-shrink-0 w-full sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0">
        <Link to={`/products/${item._id}`}>
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover"
          />
        </Link>
      </div>

      <div className="sm:ml-6 flex-1 flex flex-col sm:flex-row sm:justify-between">
        <div className="flex-1">
          <Link to={`/products/${item._id}`}>
            <h3 className="text-base font-medium text-gray-900 hover:text-primary-600">
              {item.name}
            </h3>
          </Link>
          <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)} / {item.unit}</p>
        </div>

        <div className="mt-4 sm:mt-0 flex items-center">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              type="button"
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="p-2 text-gray-600 hover:text-primary-600"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            
            <span className="px-3 font-medium text-gray-900">
              {item.quantity}
            </span>
            
            <button
              type="button"
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="p-2 text-gray-600 hover:text-primary-600"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="ml-6 mr-4 text-right">
            <p className="text-base font-medium text-gray-900">${itemTotal}</p>
          </div>

          <button
            type="button"
            onClick={() => removeFromCart(item._id)}
            className="text-gray-400 hover:text-error-500 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;