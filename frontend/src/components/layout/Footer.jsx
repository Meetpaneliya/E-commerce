import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and info */}
          <div>
            <Link to="/" className="text-2xl font-bold text-white mb-4 inline-block">
              FreshGrocer
            </Link>
            <p className="text-gray-300 mt-4 mb-6">
              Delivering fresh, quality groceries directly to your doorstep. Experience premium shopping from the comfort of your home.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=fruits" className="text-gray-300 hover:text-white transition-colors">
                  Fresh Produce
                </Link>
              </li>
              <li>
                <Link to="/products?category=dairy" className="text-gray-300 hover:text-white transition-colors">
                  Dairy & Eggs
                </Link>
              </li>
              <li>
                <Link to="/products?category=bakery" className="text-gray-300 hover:text-white transition-colors">
                  Bakery
                </Link>
              </li>
              <li>
                <Link to="/products?category=meat" className="text-gray-300 hover:text-white transition-colors">
                  Meat & Seafood
                </Link>
              </li>
            </ul>
          </div>

          {/* Account links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-300 hover:text-white transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-white transition-colors">
                  View Cart
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="text-gray-300 hover:text-white transition-colors">
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="shrink-0 mt-1 text-gray-300" />
                <span className="text-gray-300">
                  123 Fresh Street, Produce City, CA 98765
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="shrink-0 text-gray-300" />
                <span className="text-gray-300">(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="shrink-0 text-gray-300" />
                <span className="text-gray-300">hello@freshgrocer.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} FreshGrocer. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="#" className="text-gray-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white text-sm">
                Shipping Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;