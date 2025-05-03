import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, currentUser, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check for redirect parameter
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') || '/';
  
  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate(redirectPath);
    }
  }, [currentUser, navigate, redirectPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = login(email, password);
      if (success) {
        navigate(redirectPath);
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-12">
      <div className="container-custom max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h1>
          
          {error && (
            <div className="bg-error-50 border border-error-500 text-error-500 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                Forgot Password?
              </a>
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 btn-primary"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-primary-600 hover:text-primary-700">
                Create one
              </Link>
            </p>
          </div>
        </div>
        
        {/* Demo credentials */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            For demo purposes, you can create any account 
            or use these credentials:
          </p>
          <p className="text-sm text-gray-700 mt-1">
            Email: <span className="font-medium">demo@example.com</span> | 
            Password: <span className="font-medium">password</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;