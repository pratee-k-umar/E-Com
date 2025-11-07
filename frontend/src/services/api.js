import axios from 'axios';

// Backend API for cart, checkout, orders
const backendAPI = axios.create({
  baseURL: process.env.BACKEND_APP_API_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fake Store API for products
const fakeStoreAPI = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Transform Fake Store API product to our format
const transformProduct = (fakeStoreProduct) => ({
  id: fakeStoreProduct.id.toString(),
  name: fakeStoreProduct.title,
  price: fakeStoreProduct.price,
  image: fakeStoreProduct.image,
  description: fakeStoreProduct.description,
  category: fakeStoreProduct.category,
  rating: fakeStoreProduct.rating
});

// Product API calls (direct to Fake Store API)
export const productService = {
  getAll: async () => {
    try {
      const response = await fakeStoreAPI.get('/products');
      return response.data.map(transformProduct);
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await fakeStoreAPI.get(`/products/${id}`);
      return transformProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },
  
  getCategories: async () => {
    try {
      const response = await fakeStoreAPI.get('/products/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
  
  getByCategory: async (category) => {
    try {
      const response = await fakeStoreAPI.get(`/products/category/${category}`);
      return response.data.map(transformProduct);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }
};

// Backend API calls (for cart, checkout, orders)
export const cartService = {
  get: () => backendAPI.get('/cart'),
  add: (productId, quantity = 1, productData) => {
    return backendAPI.post('/cart', {
      productId, 
      quantity,
      name: productData.name,
      price: productData.price,
      image: productData.image
    });
  },
  remove: (productId) => backendAPI.delete(`/cart/${productId}`),
  update: (productId, quantity) => backendAPI.put(`/cart/${productId}`, { quantity }),
};

export const checkoutService = {
  process: (cartItems, customerInfo) => backendAPI.post('/checkout', { cartItems, customerInfo }),
};

export const orderService = {
  getHistory: () => backendAPI.get('/orders'),
  getById: (orderId) => backendAPI.get(`/orders/${orderId}`),
  updateStatus: (orderId, status, shippingInfo) => 
    backendAPI.put(`/orders/${orderId}/status`, { status, shippingInfo }),
};