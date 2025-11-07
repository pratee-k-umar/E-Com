const CartItem = require('./CartItem');
const OrderHistory = require('./OrderHistory');
const databaseService = require('../config/database');

// Set models in database service
databaseService.setModels({
  OrderHistory
});

module.exports = {
  CartItem,
  OrderHistory
};