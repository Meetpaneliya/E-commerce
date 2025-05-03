import React from 'react';
import { useCart } from '../../context/CartContext';

function OrderSummary() {
  const { cart, getTotalPrice } = useCart();
  
  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.07; // Assuming 7% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      
      <div className="divide-y divide-gray-200">
        {cart.map(item => (
          <div key={item.id} className="py-3 flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">{item.name}</p>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <p>Subtotal</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <p>Shipping</p>
          <p>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</p>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <p>Tax</p>
          <p>${tax.toFixed(2)}</p>
        </div>
        
        <div className="border-t border-gray-200 pt-2 flex justify-between text-base font-medium text-gray-900">
          <p>Total</p>
          <p>${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;