const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { validateCartItem, validateCartUpdate } = require('../middleware/validation');

// GET /api/cart - Get cart items and total
router.get('/', cartController.getCart);

// POST /api/cart - Add item to cart
router.post('/', validateCartItem, cartController.addToCart);

// DELETE /api/cart/:id - Remove item from cart
router.delete('/:id', cartController.removeFromCart);

// PUT /api/cart/:id - Update cart item quantity
router.put('/:id', validateCartUpdate, cartController.updateCartItem);

module.exports = router;