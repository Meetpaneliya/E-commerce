import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

function NotFound() {
  return (
    <div className="bg-white py-16">
      <div className="container-custom text-center">
        <h1 className="text-9xl font-bold text-primary-500 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 btn-primary px-6 py-3"
        >
          <Home size={18} />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;