import React from 'react';

function About() {
  return (
    <div className="bg-white py-12">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About FreshGrocer</h1>
          
          <div className="prose prose-lg">
            <p className="text-gray-600 mb-6">
              FreshGrocer is your premier destination for fresh, high-quality groceries delivered right to your doorstep. 
              Founded with a passion for making healthy food accessible to everyone, we've grown from a small local 
              operation to serving thousands of satisfied customers.
            </p>
            
            <div className="mb-12">
              <img
                src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg"
                alt="Fresh produce selection"
                className="w-full rounded-lg shadow-md mb-4"
              />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              We believe everyone deserves access to fresh, nutritious food. Our mission is to make grocery 
              shopping convenient, enjoyable, and sustainable while supporting local farmers and producers.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6">
              <li>Quality: We source only the finest products</li>
              <li>Sustainability: Eco-friendly packaging and practices</li>
              <li>Community: Supporting local farmers and producers</li>
              <li>Service: Exceptional customer experience</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-gray-600 mb-6">
              Our dedicated team of food enthusiasts, logistics experts, and customer service professionals 
              work tirelessly to ensure you receive the best possible service and products.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;