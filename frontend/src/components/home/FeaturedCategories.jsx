import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Apple, Milk, Croissant, Beef, Package, Coffee, Cookie, Snowflake 
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext'; // adjust path if needed

const iconMap = {
  'fruits': <Apple className="w-6 h-6" />,
  'dairy': <Milk className="w-6 h-6" />,
  'bakery': <Croissant className="w-6 h-6" />,
  'meat': <Beef className="w-6 h-6" />,
  'pantry': <Package className="w-6 h-6" />,
  'beverages': <Coffee className="w-6 h-6" />,
  'snacks': <Cookie className="w-6 h-6" />,
  'frozen': <Snowflake className="w-6 h-6" />
};

function FeaturedCategories() {
  const { categories } = useProducts();

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Shop by Category</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/products?category=${category.id}`} 
              className="group bg-gray-50 rounded-xl p-6 text-center transition-all hover:bg-primary-50 hover:shadow-md"
            >
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 group-hover:bg-primary-200 transition-colors">
                {iconMap[category.id] || <Package className="w-6 h-6" />}
              </div>
              <h3 className="font-medium text-gray-800 group-hover:text-primary-700">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedCategories;
