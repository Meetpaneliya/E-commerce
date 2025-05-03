// Mock product data for the grocery e-commerce store

export const categories = [
  { id: 'fruits', name: 'Fruits & Vegetables', icon: 'apple' },
  { id: 'dairy', name: 'Dairy & Eggs', icon: 'milk' },
  { id: 'bakery', name: 'Bakery', icon: 'croissant' },
  { id: 'meat', name: 'Meat & Seafood', icon: 'beef' },
  { id: 'pantry', name: 'Pantry & Staples', icon: 'package' },
  { id: 'beverages', name: 'Beverages', icon: 'coffee' },
  { id: 'snacks', name: 'Snacks & Sweets', icon: 'cookie' },
  { id: 'frozen', name: 'Frozen Foods', icon: 'snowflake' }
];

export const products = [
  {
    id: '1',
    name: 'Organic Bananas',
    description: 'Sweet and nutritious organic bananas, perfect for snacking or smoothies. Packed with potassium and other essential nutrients.',
    price: 1.99,
    unit: 'bunch',
    image: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'fruits',
    stock: 50,
    rating: 4.5,
    featured: true,
    nutrition: {
      calories: 105,
      protein: '1.3g',
      carbs: '27g',
      fat: '0.4g',
      fiber: '3.1g'
    }
  },
  {
    id: '2',
    name: 'Fresh Avocados',
    description: 'Creamy and delicious avocados. Rich in healthy fats and perfect for guacamole, salads, or toast toppings.',
    price: 2.49,
    unit: 'each',
    image: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'fruits',
    stock: 30,
    rating: 4.8,
    featured: true,
    nutrition: {
      calories: 240,
      protein: '3g',
      carbs: '12g',
      fat: '22g',
      fiber: '10g'
    }
  },
  {
    id: '3',
    name: 'Whole Milk',
    description: 'Fresh whole milk from grass-fed cows. Rich, creamy, and full of calcium and essential nutrients.',
    price: 3.99,
    unit: 'gallon',
    image: 'https://images.pexels.com/photos/725998/pexels-photo-725998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'dairy',
    stock: 20,
    rating: 4.3,
    featured: false,
    nutrition: {
      calories: 150,
      protein: '8g',
      carbs: '12g',
      fat: '8g',
      calcium: '30% DV'
    }
  },
  {
    id: '4',
    name: 'Large Brown Eggs',
    description: 'Farm-fresh large brown eggs from free-range chickens. Perfect for breakfast or baking.',
    price: 4.49,
    unit: 'dozen',
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'dairy',
    stock: 40,
    rating: 4.7,
    featured: true,
    nutrition: {
      calories: 70,
      protein: '6g',
      carbs: '0g',
      fat: '5g',
      vitamins: 'A, D, E, B12'
    }
  },
  {
    id: '5',
    name: 'Sourdough Bread',
    description: 'Artisanal sourdough bread made with natural fermentation. Crusty exterior with a soft, tangy interior.',
    price: 5.99,
    unit: 'loaf',
    image: 'https://images.pexels.com/photos/1756061/pexels-photo-1756061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'bakery',
    stock: 15,
    rating: 4.6,
    featured: true,
    nutrition: {
      calories: 80,
      protein: '3g',
      carbs: '15g',
      fat: '0.5g',
      fiber: '1g'
    }
  },
  {
    id: '6',
    name: 'Ground Beef 85/15',
    description: 'Premium ground beef with 85% lean meat and 15% fat. Perfect for burgers, meatballs, or any ground beef recipe.',
    price: 7.99,
    unit: 'lb',
    image: 'https://images.pexels.com/photos/618775/pexels-photo-618775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'meat',
    stock: 25,
    rating: 4.4,
    featured: false,
    nutrition: {
      calories: 240,
      protein: '21g',
      carbs: '0g',
      fat: '17g',
      iron: '15% DV'
    }
  },
  {
    id: '7',
    name: 'Atlantic Salmon Fillet',
    description: 'Fresh Atlantic salmon fillet, rich in omega-3 fatty acids. Perfect for grilling, baking, or pan-searing.',
    price: 12.99,
    unit: 'lb',
    image: 'https://images.pexels.com/photos/3296392/pexels-photo-3296392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'meat',
    stock: 18,
    rating: 4.9,
    featured: true,
    nutrition: {
      calories: 180,
      protein: '22g',
      carbs: '0g',
      fat: '10g',
      omega3: 'High'
    }
  },
  {
    id: '8',
    name: 'Extra Virgin Olive Oil',
    description: 'Cold-pressed extra virgin olive oil from Mediterranean olives. Perfect for dressings, cooking, and dipping.',
    price: 14.99,
    unit: 'bottle',
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'pantry',
    stock: 35,
    rating: 4.7,
    featured: false,
    nutrition: {
      calories: 120,
      protein: '0g',
      carbs: '0g',
      fat: '14g',
      vitaminE: '10% DV'
    }
  },
  {
    id: '9',
    name: 'Organic Quinoa',
    description: 'Organic white quinoa, a complete protein grain. Perfect for salads, bowls, or as a side dish.',
    price: 6.99,
    unit: 'lb',
    image: 'https://images.pexels.com/photos/7511806/pexels-photo-7511806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'pantry',
    stock: 28,
    rating: 4.5,
    featured: false,
    nutrition: {
      calories: 120,
      protein: '4g',
      carbs: '21g',
      fat: '2g',
      fiber: '3g'
    }
  },
  {
    id: '10',
    name: 'Organic Strawberries',
    description: 'Sweet and juicy organic strawberries. Perfect for snacking, smoothies, or desserts.',
    price: 4.99,
    unit: 'pint',
    image: 'https://images.pexels.com/photos/70746/strawberries-red-fruit-royalty-free-70746.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'fruits',
    stock: 22,
    rating: 4.6,
    featured: true,
    nutrition: {
      calories: 50,
      protein: '1g',
      carbs: '11g',
      fat: '0g',
      fiber: '3g'
    }
  },
  {
    id: '11',
    name: 'Red Bell Peppers',
    description: 'Crisp and sweet red bell peppers. Perfect for salads, stir-fries, or roasting.',
    price: 1.79,
    unit: 'each',
    image: 'https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'fruits',
    stock: 45,
    rating: 4.3,
    featured: false,
    nutrition: {
      calories: 30,
      protein: '1g',
      carbs: '7g',
      fat: '0g',
      vitaminC: '150% DV'
    }
  },
  {
    id: '12',
    name: 'Greek Yogurt',
    description: 'Creamy plain Greek yogurt. High in protein and perfect for breakfast, snacks, or cooking.',
    price: 5.49,
    unit: 'container',
    image: 'https://images.pexels.com/photos/4397920/pexels-photo-4397920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'dairy',
    stock: 30,
    rating: 4.8,
    featured: false,
    nutrition: {
      calories: 120,
      protein: '22g',
      carbs: '8g',
      fat: '0g',
      calcium: '20% DV'
    }
  },
  {
    id: '13',
    name: 'Craft Beer Selection',
    description: 'Selection of premium craft beers from local breweries. Various styles and flavors.',
    price: 14.99,
    unit: '6-pack',
    image: 'https://images.pexels.com/photos/1089930/pexels-photo-1089930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'beverages',
    stock: 24,
    rating: 4.7,
    featured: true,
    nutrition: {
      calories: 150,
      alcohol: '5-7%',
      carbs: '12g',
      fat: '0g'
    }
  },
  {
    id: '14',
    name: 'Dark Chocolate Bar',
    description: '72% cocoa dark chocolate. Rich, slightly bitter, and perfect for snacking or baking.',
    price: 3.99,
    unit: 'bar',
    image: 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'snacks',
    stock: 50,
    rating: 4.9,
    featured: false,
    nutrition: {
      calories: 210,
      protein: '2g',
      carbs: '15g',
      fat: '15g',
      antioxidants: 'High'
    }
  },
  {
    id: '15',
    name: 'Frozen Mixed Berries',
    description: 'Mix of frozen strawberries, blueberries, and raspberries. Perfect for smoothies and desserts.',
    price: 5.99,
    unit: 'bag',
    image: 'https://images.pexels.com/photos/3645504/pexels-photo-3645504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'frozen',
    stock: 30,
    rating: 4.5,
    featured: false,
    nutrition: {
      calories: 70,
      protein: '1g',
      carbs: '17g',
      fat: '0g',
      fiber: '5g'
    }
  },
  {
    id: '16',
    name: 'Organic Spinach',
    description: 'Fresh organic spinach leaves. Packed with iron and perfect for salads, smoothies, or cooking.',
    price: 3.49,
    unit: 'bunch',
    image: 'https://images.pexels.com/photos/2255925/pexels-photo-2255925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'fruits',
    stock: 25,
    rating: 4.4,
    featured: false,
    nutrition: {
      calories: 20,
      protein: '2g',
      carbs: '3g',
      fat: '0g',
      iron: '15% DV'
    }
  }
];