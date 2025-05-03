import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedCategories from '../components/home/FeaturedCategories';

import PromoSection from '../components/home/PromoSection';
import Testimonials from '../components/home/Testimonials';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <Hero />
      
      <FeaturedCategories />
      
      {/* Special offer section */}
      <section className="py-16 bg-accent-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src="https://images.pexels.com/photos/1200655/pexels-photo-1200655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Fresh organic fruits and vegetables" 
                className="rounded-lg shadow-md"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Fresh & Organic</h2>
              <p className="text-gray-600 mb-6">
                We believe in bringing you the freshest, highest-quality produce directly from local farms to your table. 
                Our fruits and vegetables are handpicked at peak ripeness to ensure maximum flavor and nutritional value.
              </p>
              <Link to="/products?category=fruits" className="btn-accent inline-block">
                Shop Produce
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <PromoSection />
      
      <Testimonials />
      
      {/* Newsletter section */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Stay Updated</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for weekly updates, exclusive offers, and seasonal recipes.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow input-field rounded-r-none focus:z-10" 
              />
              <button 
                type="button" 
                className="btn-primary rounded-l-none"
              >
                Subscribe
              </button>
            </div>
          </div>
          
          <p className="mt-4 text-xs text-gray-500">
            By subscribing, you agree to receive marketing emails from FreshGrocer. 
            You can unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;