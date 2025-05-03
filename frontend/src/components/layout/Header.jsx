import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, ChevronDown, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { useWishlist } from '../../context/WishlistContext';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { getItemCount } = useCart();
  const { currentUser, logout } = useAuth();
  const { categories } = useProducts();
  const { wishlist } = useWishlist();
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
    setIsCategoryOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  const renderProfileDropdown = () => {
    if (!currentUser) return null;

    const isAdmin = currentUser.role === 'admin';

    return (
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
        <div className="px-4 py-2 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
          <p className="text-xs text-gray-500">{currentUser.email}</p>
          {isAdmin && (
            <span className="text-xs font-medium text-primary-600">Admin Account</span>
          )}
        </div>
        
        <Link
          to="/user-dashboard"
          className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
        >
          My Profile
        </Link>
        
        {isAdmin ? (
          <Link
            to="/admin-dashboard"
            className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
          >
            Admin Dashboard
          </Link>
        ) : (
          <Link
            to="/wishlist"
            className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
          >
            My Wishlist
          </Link>
        )}
        
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
        >
          Sign Out
        </button>
      </div>
    );
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'}`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-primary-600 text-2xl font-bold">FreshGrocer</span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">
              Home
            </Link>
            
            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-1 text-gray-700 hover:text-primary-600 font-medium"
              >
                Categories
                <ChevronDown size={16} />
              </button>
              
              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  {categories.map(category => (
                    <Link
                      key={category.id}
                      to={`/products?category=${category.id}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium">
              Contact
            </Link>
          </nav>

          {/* Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/products" className="text-gray-600 hover:text-primary-600">
              <Search size={20} />
            </Link>
            
            {currentUser && !currentUser.role === 'admin' && (
              <Link to="/wishlist" className="text-gray-600 hover:text-primary-600 relative">
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            )}
            
            <div className="relative">
              <Link to="/cart" className="text-gray-600 hover:text-primary-600">
                <ShoppingCart size={20} />
                {getItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getItemCount()}
                  </span>
                )}
              </Link>
            </div>
            
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2"
                >
                  <img
                    src={currentUser.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=10B981&color=fff`}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </button>
                
                {isProfileOpen && renderProfileDropdown()}
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-1 text-gray-700 hover:text-primary-600">
                <User size={20} />
                <span className="font-medium">Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-4">
            {currentUser && currentUser.role !== 'admin' && (
              <Link to="/wishlist" className="text-gray-600 relative">
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            )}
            <div className="relative">
              <Link to="/cart" className="text-gray-600">
                <ShoppingCart size={20} />
                {getItemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getItemCount()}
                  </span>
                )}
              </Link>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white p-4 animate-slide-down">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium py-2">
              Home
            </Link>
            
            {/* Mobile Categories */}
            <div className="space-y-2">
              <p className="font-medium text-gray-900">Categories</p>
              {categories.map(category => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.id}`}
                  className="block pl-4 py-1 text-gray-700 hover:text-primary-600"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            
            <Link to="/about" className="text-gray-700 hover:text-primary-600 font-medium py-2">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium py-2">
              Contact
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary-600 font-medium py-2 flex items-center gap-2">
              <Search size={18} />
              <span>Search</span>
            </Link>
            
            {currentUser ? (
              <>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={currentUser.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&background=10B981&color=fff`}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{currentUser.name}</p>
                      <p className="text-sm text-gray-500">{currentUser.email}</p>
                      {currentUser.role === 'admin' && (
                        <span className="text-xs font-medium text-primary-600">Admin Account</span>
                      )}
                    </div>
                  </div>
                  <Link
                    to="/user-dashboard"
                    className="block py-2 text-gray-700 hover:text-primary-600"
                  >
                    My Profile
                  </Link>
                  {currentUser.role === 'admin' ? (
                    <Link
                      to="/admin-dashboard"
                      className="block py-2 text-gray-700 hover:text-primary-600"
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/wishlist"
                      className="block py-2 text-gray-700 hover:text-primary-600"
                    >
                      My Wishlist
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-gray-700 hover:text-primary-600 font-medium py-2"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium py-2 flex items-center gap-2">
                <User size={18} />
                <span>Sign In</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;