const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');

// Import route modules
const cartRoutes = require('./cartRoutes');
const checkoutRoutes = require('./checkoutRoutes');
const orderHistoryRoutes = require('./orderHistoryRoutes');

// Use route modules
router.use('/cart', cartRoutes);
router.use('/checkout', checkoutRoutes);
router.use('/orders', orderHistoryRoutes);

// Health check endpoint
router.get('/health', checkoutController.getHealthCheck);

module.exports = router;