import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function Hero() {
  return (
    <section className="relative bg-primary-500 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/90 to-primary-600/70 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
          backgroundBlendMode: 'overlay'
        }}
      ></div>
      
      <div className="container-custom relative z-20">
        <div className="py-20 md:py-28 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Fresh Groceries Delivered to Your Door
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-lg">
            Shop premium quality groceries from the comfort of your home with fast delivery and exceptional service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/products" className="btn-accent px-8 py-3 rounded-lg text-base font-semibold">
              Shop Now
            </Link>
            <Link to="/signup" className="inline-flex items-center justify-center gap-2 text-white font-semibold hover:text-white/80 transition-colors">
              <span>Create an Account</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-10"></div>
    </section>
  );
}

export default Hero;