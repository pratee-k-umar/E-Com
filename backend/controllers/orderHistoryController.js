const databaseService = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class OrderHistoryController {
  async createOrder(req, res) {
    try {
      const { customerInfo, items, totalAmount } = req.body;

      // Validate required fields
      if (!customerInfo || !items || !totalAmount) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      if (!customerInfo.name || !customerInfo.email || !customerInfo.address || !customerInfo.phone) {
        return res.status(400).json({ error: 'Missing customer information' });
      }

      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Items must be a non-empty array' });
      }

      // Create order data
      const orderData = {
        orderId: uuidv4(),
        customerInfo,
        items,
        totalAmount,
        status: 'pending',
        orderDate: new Date()
      };

      const savedOrder = await databaseService.saveOrderHistory(orderData);
      
      res.status(201).json({
        message: 'Order created successfully',
        order: savedOrder
      });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  }

  async getOrderHistory(req, res) {
    try {
      const { email } = req.query;
      const orders = await databaseService.getOrderHistory(email);
      
      res.json({
        orders,
        count: orders.length
      });
    } catch (error) {
      console.error('Error fetching order history:', error);
      res.status(500).json({ error: 'Failed to fetch order history' });
    }
  }

  async getOrderById(req, res) {
    try {
      const { orderId } = req.params;
      const order = await databaseService.getOrderById(orderId);
      
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.json(order);
    } catch (error) {
      console.error('Error fetching order:', error);
      res.status(500).json({ error: 'Failed to fetch order' });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const { orderId } = req.params;
      const { status, shippingInfo } = req.body;

      if (!status) {
        return res.status(400).json({ error: 'Status is required' });
      }

      const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }

      const updatedOrder = await databaseService.updateOrderStatus(orderId, status, shippingInfo);
      
      if (!updatedOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.json({
        message: 'Order status updated successfully',
        order: updatedOrder
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ error: 'Failed to update order status' });
    }
  }

  async getOrderStats(req, res) {
    try {
      const { email } = req.query;
      const orders = await databaseService.getOrderHistory(email);
      
      const stats = {
        totalOrders: orders.length,
        totalAmount: orders.reduce((sum, order) => sum + order.totalAmount, 0),
        statusBreakdown: {},
        recentOrders: orders.slice(0, 5)
      };

      // Calculate status breakdown
      orders.forEach(order => {
        stats.statusBreakdown[order.status] = (stats.statusBreakdown[order.status] || 0) + 1;
      });

      res.json(stats);
    } catch (error) {
      console.error('Error fetching order stats:', error);
      res.status(500).json({ error: 'Failed to fetch order statistics' });
    }
  }
}

module.exports = new OrderHistoryController();