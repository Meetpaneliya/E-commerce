import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CheckoutForm from '../components/checkout/CheckoutForm';
import OrderSummary from '../components/checkout/OrderSummary';

function Checkout() {
  const { cart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      // Redirect to login with return URL
      navigate('/login?redirect=checkout');
    }
  }, [currentUser, navigate]);

  if (cart.length === 0 || !currentUser) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-t-primary-500 border-gray-200 rounded-full animate-spin"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-8">
      <div className="container-custom">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout form */}
          <div className="lg:w-2/3">
            <CheckoutForm />
          </div>
          
          {/* Order summary */}
          <div className="lg:w-1/3">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;