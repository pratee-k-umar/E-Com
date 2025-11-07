const mongoose = require('mongoose');

// Import models - these will be available after models are loaded
let OrderHistory;

class DatabaseService {
  constructor() {
    this.usingMongoDB = false;
    this.inMemoryCart = [];
    this.inMemoryOrderHistory = [];
  }

  // Method to set models after they are loaded
  setModels(models) {
    OrderHistory = models.OrderHistory;
  }

  async connect() {
    const MONGODB_URI = process.env.MONGODB_URI;
    
    try {
      await mongoose.connect(MONGODB_URI, {
        dbName: 'e-com',
      });
      console.log('Connected to MongoDB');
      this.usingMongoDB = true;
    } catch (error) {
      console.log('MongoDB connection failed, using in-memory storage:', error.message);
      this.usingMongoDB = false;
    }
  }

  isUsingMongoDB() {
    return this.usingMongoDB;
  }

  getInMemoryCart() {
    return this.inMemoryCart;
  }

  setInMemoryCart(cart) {
    this.inMemoryCart = cart;
  }

  // Order History Methods
  async saveOrderHistory(orderData) {
    if (this.usingMongoDB) {
      const order = new OrderHistory(orderData);
      return await order.save();
    } else {
      this.inMemoryOrderHistory.push(orderData);
      return orderData;
    }
  }

  async getOrderHistory(email = null) {
    if (this.usingMongoDB) {
      const query = email ? { 'customerInfo.email': email } : {};
      return await OrderHistory.find(query).sort({ orderDate: -1 });
    } else {
      let orders = this.inMemoryOrderHistory;
      if (email) {
        orders = orders.filter(order => order.customerInfo.email === email);
      }
      return orders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    }
  }

  async getOrderById(orderId) {
    if (this.usingMongoDB) {
      return await OrderHistory.findOne({ orderId });
    } else {
      return this.inMemoryOrderHistory.find(order => order.orderId === orderId);
    }
  }

  async updateOrderStatus(orderId, status, shippingInfo = null) {
    if (this.usingMongoDB) {
      const updateData = { status };
      if (shippingInfo) {
        updateData.shippingInfo = shippingInfo;
      }
      return await OrderHistory.findOneAndUpdate(
        { orderId },
        updateData,
        { new: true }
      );
    } else {
      const orderIndex = this.inMemoryOrderHistory.findIndex(order => order.orderId === orderId);
      if (orderIndex !== -1) {
        this.inMemoryOrderHistory[orderIndex].status = status;
        if (shippingInfo) {
          this.inMemoryOrderHistory[orderIndex].shippingInfo = shippingInfo;
        }
        return this.inMemoryOrderHistory[orderIndex];
      }
      return null;
    }
  }

  getInMemoryOrderHistory() {
    return this.inMemoryOrderHistory;
  }
}

module.exports = new DatabaseService();