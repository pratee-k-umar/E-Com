const { CartItem } = require('../models');
const { v4: uuidv4 } = require('uuid');
const databaseService = require('../config/database');

class CartController {
  async getCart(req, res) {
    try {
      let cartItems;
      
      if (databaseService.isUsingMongoDB()) {
        cartItems = await CartItem.find();
      } else {
        cartItems = databaseService.getInMemoryCart();
      }
      
      const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      res.json({ items: cartItems, total: parseFloat(total.toFixed(2)) });
    } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).json({ error: 'Failed to fetch cart' });
    }
  }

  async addToCart(req, res) {
    try {
      const { productId, quantity = 1, name, price, image } = req.body;
      
      if (!productId || !name || !price) {
        return res.status(400).json({ error: 'Product ID, name, and price are required' });
      }
      
      if (databaseService.isUsingMongoDB()) {
        // Check if item already in cart
        let cartItem = await CartItem.findOne({ productId: productId.toString() });
        
        if (cartItem) {
          cartItem.quantity += quantity;
          await cartItem.save();
        } else {
          cartItem = new CartItem({
            productId: productId.toString(),
            name,
            price,
            quantity: quantity,
            image
          });
          await cartItem.save();
        }
        res.json(cartItem);
      } else {
        const cart = databaseService.getInMemoryCart();
        // Check if item already in cart
        let cartItem = cart.find(item => item.productId === productId.toString());
        
        if (cartItem) {
          cartItem.quantity += quantity;
        } else {
          cartItem = {
            id: uuidv4(),
            productId: productId.toString(),
            name,
            price,
            quantity: quantity,
            image
          };
          cart.push(cartItem);
        }
        res.json(cartItem);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ error: 'Failed to add item to cart' });
    }
  }

  async removeFromCart(req, res) {
    try {
      const { id } = req.params;
      
      if (databaseService.isUsingMongoDB()) {
        const result = await CartItem.findOneAndDelete({ productId: id });
        if (!result) {
          return res.status(404).json({ error: 'Cart item not found' });
        }
        res.json({ message: 'Item removed from cart' });
      } else {
        const cart = databaseService.getInMemoryCart();
        const itemIndex = cart.findIndex(item => item.productId === id);
        if (itemIndex === -1) {
          return res.status(404).json({ error: 'Cart item not found' });
        }
        cart.splice(itemIndex, 1);
        res.json({ message: 'Item removed from cart' });
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      res.status(500).json({ error: 'Failed to remove item from cart' });
    }
  }

  async updateCartItem(req, res) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      
      if (!quantity || quantity < 1) {
        return res.status(400).json({ error: 'Valid quantity is required' });
      }
      
      if (databaseService.isUsingMongoDB()) {
        const cartItem = await CartItem.findOneAndUpdate(
          { productId: id },
          { quantity },
          { new: true }
        );
        if (!cartItem) {
          return res.status(404).json({ error: 'Cart item not found' });
        }
        res.json(cartItem);
      } else {
        const cart = databaseService.getInMemoryCart();
        const cartItem = cart.find(item => item.productId === id);
        if (!cartItem) {
          return res.status(404).json({ error: 'Cart item not found' });
        }
        cartItem.quantity = quantity;
        res.json(cartItem);
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      res.status(500).json({ error: 'Failed to update cart item' });
    }
  }
}

module.exports = new CartController();