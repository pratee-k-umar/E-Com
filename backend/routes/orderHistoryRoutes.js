const express = require('express');
const router = express.Router();
const orderHistoryController = require('../controllers/orderHistoryController');

// POST /api/orders - Create a new order
router.post('/', orderHistoryController.createOrder);

// GET /api/orders - Get order history (optionally filtered by email)
router.get('/', orderHistoryController.getOrderHistory);

// GET /api/orders/stats - Get order statistics
router.get('/stats', orderHistoryController.getOrderStats);

// GET /api/orders/:orderId - Get specific order by ID
router.get('/:orderId', orderHistoryController.getOrderById);

// PUT /api/orders/:orderId/status - Update order status
router.put('/:orderId/status', orderHistoryController.updateOrderStatus);

module.exports = router;