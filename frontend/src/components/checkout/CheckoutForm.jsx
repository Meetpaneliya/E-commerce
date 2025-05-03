import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function CheckoutForm() {
  const { clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'credit',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zipCode'];
    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Payment validation
    if (formData.paymentMethod === 'credit') {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Use format MM/YY';
      }
      
      if (!formData.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'CVV must be 3 or 4 digits';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, you would process the payment here
      // For this demo, we'll just simulate a successful order
      setTimeout(() => {
        clearCart();
        navigate('/');
        alert('Thank you for your order! It has been placed successfully.');
      }, 1000);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`input-field ${errors.firstName ? 'border-error-500' : ''}`}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-error-500">{errors.firstName}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`input-field ${errors.lastName ? 'border-error-500' : ''}`}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-error-500">{errors.lastName}</p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-field ${errors.email ? 'border-error-500' : ''}`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-error-500">{errors.email}</p>
            )}
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`input-field ${errors.address ? 'border-error-500' : ''}`}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-error-500">{errors.address}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`input-field ${errors.city ? 'border-error-500' : ''}`}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-error-500">{errors.city}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`input-field ${errors.state ? 'border-error-500' : ''}`}
              />
              {errors.state && (
                <p className="mt-1 text-sm text-error-500">{errors.state}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className={`input-field ${errors.zipCode ? 'border-error-500' : ''}`}
              />
              {errors.zipCode && (
                <p className="mt-1 text-sm text-error-500">{errors.zipCode}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Information</h3>
        <div className="space-y-4">
          <div>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  id="credit"
                  name="paymentMethod"
                  type="radio"
                  value="credit"
                  checked={formData.paymentMethod === 'credit'}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <label htmlFor="credit" className="ml-3 block text-sm font-medium text-gray-700">
                  Credit Card
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="paypal"
                  name="paymentMethod"
                  type="radio"
                  value="paypal"
                  checked={formData.paymentMethod === 'paypal'}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                  PayPal
                </label>
              </div>
            </div>
          </div>
          
          {formData.paymentMethod === 'credit' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="XXXX XXXX XXXX XXXX"
                  className={`input-field ${errors.cardNumber ? 'border-error-500' : ''}`}
                />
                {errors.cardNumber && (
                  <p className="mt-1 text-sm text-error-500">{errors.cardNumber}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className={`input-field ${errors.expiryDate ? 'border-error-500' : ''}`}
                  />
                  {errors.expiryDate && (
                    <p className="mt-1 text-sm text-error-500">{errors.expiryDate}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="XXX"
                    className={`input-field ${errors.cvv ? 'border-error-500' : ''}`}
                  />
                  {errors.cvv && (
                    <p className="mt-1 text-sm text-error-500">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {formData.paymentMethod === 'paypal' && (
            <p className="text-sm text-gray-600">
              You will be redirected to PayPal to complete your purchase.
            </p>
          )}
        </div>
      </div>
      
      <div className="pt-4">
        <button
          type="submit"
          className="w-full py-3 btn-primary text-base font-medium"
        >
          Complete Order
        </button>
      </div>
    </form>
  );
}

export default CheckoutForm;