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
    <div className="products-page">
      <div className="page-header">
        <h1>Our Products</h1>
        <p>Discover our amazing collection of products</p>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError('')} className="close-error">×</button>
        </div>
      )}

      <ProductGrid
        products={products}
        onAddToCart={handleAddToCart}
        loading={loading}
      />
    </div>
  );
};

export default Home;