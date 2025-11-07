import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cart from '../components/Cart';

const CartPage = ({ cart, onRemoveItem, onUpdateQuantity }) => {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-page">
      <div className="page-header">
        <h1>Your Shopping Cart</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Products</Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">Cart</span>
        </nav>
      </div>

      <Cart
        cart={cart}
        onRemoveItem={onRemoveItem}
        onUpdateQuantity={onUpdateQuantity}
        onContinueShopping={handleContinueShopping}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default CartPage;