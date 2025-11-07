import React from 'react';

const ProductGrid = ({ products, onAddToCart, loading }) => {
  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (!products.length) {
    return <div className="no-products">No products available</div>;
  }

  return (
    <div className="product-grid-container">
      <h2>Our Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img 
                src={product.image} 
                alt={product.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x300?text=Product';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => onAddToCart(product.id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;