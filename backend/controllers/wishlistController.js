import Wishlist from '../models/Wishlist.js';

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
    
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        products: [productId]
      });
    } else if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }
    
    res.json(wishlist.products);
  } catch (error) {
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