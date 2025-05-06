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
    console.log('Wishlist:', wishlist.products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user._id,
        products: [product._id],
      });
    } else {
      if (!wishlist.products.includes(product._id)) {
        wishlist.products.push(product._id);
      }
    }

    await wishlist.save();

    await wishlist.populate('products');

    res.status(200).json(wishlist.products);
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    // 1. Find wishlist by user
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    // 2. Remove product if exists
    const index = wishlist.products.findIndex(
      (p) => p.toString() === productId
    );

    if (index === -1) {
      return res.status(404).json({ message: 'Product not in wishlist' });
    }

    wishlist.products.splice(index, 1); // Remove the product
    await wishlist.save();

    // 3. Populate the updated wishlist
    await wishlist.populate('products');

    res.status(200).json(wishlist.products);
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
