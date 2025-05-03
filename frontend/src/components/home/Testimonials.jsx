import React from 'react';
import { Star } from 'lucide-react';

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Emily Johnson',
      role: 'Regular Customer',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      content: 'FreshGrocer has transformed how I shop for food. The produce is always fresh, delivery is prompt, and their customer service is exceptional!',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Weekly Shopper',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      content: 'I love the quality and convenience. Being able to get farm-fresh produce delivered to my door has saved me so much time every week.',
      rating: 5
    },
    {
      id: 3,
      name: 'Sarah Williams',
      role: 'Busy Parent',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      content: 'As a busy mom of three, FreshGrocer has been a lifesaver. The website is easy to use, and I can count on getting quality groceries every time.',
      rating: 4
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">What Our Customers Say</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-center">
          Don't just take our word for it. Here's what customers have to say about their experience shopping with FreshGrocer.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={`${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;