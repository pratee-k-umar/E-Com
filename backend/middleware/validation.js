const validateCartItem = (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  if (quantity !== undefined) {
    if (typeof quantity !== 'number' || quantity < 1 || !Number.isInteger(quantity)) {
      return res.status(400).json({ error: 'Quantity must be a positive integer' });
    }
  }

  next();
};

const validateCartUpdate = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity === undefined) {
    return res.status(400).json({ error: 'Quantity is required' });
  }

  if (typeof quantity !== 'number' || quantity < 1 || !Number.isInteger(quantity)) {
    return res.status(400).json({ error: 'Quantity must be a positive integer' });
  }

  next();
};

const validateCheckout = (req, res, next) => {
  const { cartItems, customerInfo } = req.body;

  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ error: 'Cart items are required' });
  }

  if (!customerInfo) {
    return res.status(400).json({ error: 'Customer information is required' });
  }

  const { name, email } = customerInfo;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Customer name is required' });
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email address is required' });
  }

  next();
};

module.exports = {
  validateCartItem,
  validateCartUpdate,
  validateCheckout
};