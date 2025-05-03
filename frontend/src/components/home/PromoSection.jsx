import React from 'react';
import { Truck, Shield, Leaf, Clock } from 'lucide-react';

function PromoSection() {
  const features = [
    {
      id: 1,
      icon: <Truck className="w-6 h-6" />,
      title: 'Free Delivery',
      description: 'Free delivery on all orders over $50'
    },
    {
      id: 2,
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Payment',
      description: 'Multiple secure payment options'
    },
    {
      id: 3,
      icon: <Leaf className="w-6 h-6" />,
      title: 'Fresh & Organic',
      description: 'Locally sourced quality products'
    },
    {
      id: 4,
      icon: <Clock className="w-6 h-6" />,
      title: 'Quick Delivery',
      description: 'Same-day delivery available'
    }
  ];

  return (
    <section className="py-16 bg-primary-50">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(feature => (
            <div key={feature.id} className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="p-3 bg-primary-100 rounded-full text-primary-600">
                  {feature.icon}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PromoSection;