import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';


export const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id })
      .populate('products');
    
    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: []
      });
    }
    
    res.json(wishlist.products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    // 1. Find the product from DB
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // 2. Find or create wishlist
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: [product._id], // Save the actual product reference
      });
    } else if (!wishlist.products.includes(product._id)) {
      wishlist.products.push(product._id);
      await wishlist.save();
    }

    // 3. Populate the wishlist with full product details
    await wishlist.populate('products');

    res.json(wishlist.products); // Send back full product data
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: error.message });
  }
};


export const removeFromWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(
        product => product.toString() !== req.params.productId
      );
      await wishlist.save();
      res.json(wishlist.products);
    } else {
      res.status(404).json({ message: 'Wishlist not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};