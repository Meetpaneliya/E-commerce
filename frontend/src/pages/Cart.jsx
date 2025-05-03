import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

function Cart() {
  const { cart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-white py-12">
        <div className="container-custom text-center">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-gray-100 p-6 rounded-full mb-6">
              <ShoppingBag size={48} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
            <Link 
              to="/products" 
              className="btn-primary flex items-center gap-2 px-6 py-3"
            >
              <span>Start Shopping</span>
              <ArrowLeft size={18} className="transform rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-8">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-sm text-gray-600 hover:text-error-500"
          >
            Clear Cart
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart items */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            
            <div className="mt-8">
              <Link
                to="/products"
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
              >
                <ArrowLeft size={18} />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
          
          {/* Cart summary */}
          <div className="lg:w-96">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;