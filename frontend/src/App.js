import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navigation from './components/Navigation';
import ReceiptModal from './components/ReceiptModal';

// Pages
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import NotFoundPage from './pages/NotFoundPage';

// Services
import { cartService } from './services/api';

function App() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await cartService.get();
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId, quantity = 1, productData) => {
    try {
      await cartService.add(productId, quantity, productData);
      await fetchCart();
      setError('');
    } catch (error) {
      setError('Failed to add item to cart');
      console.error('Error adding to cart:', error);
      throw error;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await cartService.remove(productId);
      await fetchCart();
    } catch (error) {
      setError('Failed to remove item from cart');
      console.error('Error removing from cart:', error);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      await cartService.update(productId, quantity);
      await fetchCart();
    } catch (error) {
      setError('Failed to update cart item');
      console.error('Error updating cart item:', error);
    }
  };

  const handleCheckoutSuccess = (receiptData) => {
    setReceipt(receiptData);
    setCart({ items: [], total: 0 });
  };

  const closeReceipt = () => {
    setReceipt(null);
  };

  const cartItemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="App">
        <Navigation cartItemCount={cartItemCount} />

        <main className="main-content">
          {error && (
            <div className="error-message">
              {error}
              <button onClick={() => setError('')} className="close-error">×</button>
            </div>
          )}

          <Routes>
            <Route 
              path="/" 
              element={
                <ProductsPage
                  onAddToCart={addToCart}
                />
              } 
            />
            <Route 
              path="/cart" 
              element={
                <CartPage 
                  cart={cart}
                  onRemoveItem={removeFromCart}
                  onUpdateQuantity={updateCartItem}
                />
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <CheckoutPage 
                  cart={cart}
                  onSuccess={handleCheckoutSuccess}
                />
              } 
            />
            <Route 
              path="/orders" 
              element={<OrderHistoryPage />} 
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {receipt && (
          <ReceiptModal
            receipt={receipt}
            onClose={closeReceipt}
          />
        )}
      </div>
    </Router>
  );
}

export default App;