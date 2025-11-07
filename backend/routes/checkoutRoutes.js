const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const { validateCheckout } = require('../middleware/validation');

// POST /api/checkout - Process checkout
router.post('/', validateCheckout, checkoutController.processCheckout);

module.exports = router;