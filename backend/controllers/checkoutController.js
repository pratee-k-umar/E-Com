const { CartItem } = require('../models');
const { v4: uuidv4 } = require('uuid');
const databaseService = require('../config/database');

class CheckoutController {
  async processCheckout(req, res) {
    try {
      const { cartItems, customerInfo } = req.body;
      
      if (!cartItems || cartItems.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
      }
      
      if (!customerInfo || !customerInfo.name || !customerInfo.email) {
        return res.status(400).json({ error: 'Customer name and email are required' });
      }
      
      const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const orderId = uuidv4();
      
      // Create order data for history
      const orderData = {
        orderId,
        customerInfo,
        items: cartItems.map(item => ({
          productId: item.productId,
          productName: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount: parseFloat(total.toFixed(2)),
        status: 'confirmed',
        orderDate: new Date()
      };

      // Save to order history
      await databaseService.saveOrderHistory(orderData);
      
      const receipt = {
        id: orderId,
        items: cartItems,
        total: parseFloat(total.toFixed(2)),
        customerInfo,
        timestamp: new Date().toISOString(),
        status: 'completed'
      };
      
      // Clear cart after successful checkout
      if (databaseService.isUsingMongoDB()) {
        await CartItem.deleteMany({});
      } else {
        databaseService.setInMemoryCart([]);
      }
      
      res.json(receipt);
    } catch (error) {
      console.error('Checkout error:', error);
      console.error('Error stack:', error.stack);
      console.error('Error message:', error.message);
      res.status(500).json({ error: 'Checkout failed', details: error.message });
    }
  }

  async getHealthCheck(req, res) {
    res.json({ 
      status: 'OK', 
      timestamp: new Date().toISOString(),
      database: databaseService.isUsingMongoDB() ? 'MongoDB' : 'In-Memory'
    });
  }
}

module.exports = new CheckoutController();

module.exports = new CheckoutController();