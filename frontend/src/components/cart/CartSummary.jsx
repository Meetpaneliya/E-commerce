import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ArrowRight } from 'lucide-react';

function CartSummary() {
  const { cart, getTotalPrice } = useCart();
  const navigate = useNavigate();
  
  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.07; // Assuming 7% tax
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
      <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-base text-gray-600">
          <p>Subtotal ({cart.length} items)</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        
        <div className="flex justify-between text-base text-gray-600">
          <p>Shipping</p>
          <p>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</p>
        </div>
        
        <div className="flex justify-between text-base text-gray-600">
          <p>Tax</p>
          <p>${tax.toFixed(2)}</p>
        </div>
        
        <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-medium text-gray-900">
          <p>Total</p>
          <p>${total.toFixed(2)}</p>
        </div>
      </div>
      
      <button
        onClick={handleCheckout}
        disabled={cart.length === 0}
        className="w-full flex items-center justify-center btn-primary py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>Proceed to Checkout</span>
        <ArrowRight size={18} className="ml-2" />
      </button>
      
      {shipping > 0 && (
        <p className="mt-4 text-sm text-gray-500 text-center">
          Add ${(50 - subtotal).toFixed(2)} more to qualify for free shipping
        </p>
      )}
    </div>
  );
}

export default CartSummary;