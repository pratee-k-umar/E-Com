import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/ProductGrid';
import { productService } from '../services/api';

const Home = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
      setError('');
    } catch (error) {
      setError('Failed to load products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId, quantity = 1) => {
    try {
      // Find the product data to pass to the cart
      const product = products.find(p => p.id.toString() === productId.toString());
      if (product) {
        await onAddToCart(productId, quantity, product);
        setError('');
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      setError('Failed to add item to cart');
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="home">
      <h1>Products</h1>
      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">Loading products...</div>
      ) : (
        <ProductGrid products={products} onAddToCart={handleAddToCart} />
      )}
    </div>
  );
};

export default Home;