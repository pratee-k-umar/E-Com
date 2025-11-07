import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutForm from '../components/CheckoutForm';

const CheckoutPage = ({ cart, onSuccess }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/cart');
  };

  const handleSuccess = (receiptData) => {
    onSuccess(receiptData);
    navigate('/');
  };

  // Redirect if cart is empty
  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="page-header">
          <h1>Checkout</h1>
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-link">Products</Link>
            <span className="breadcrumb-separator">›</span>
            <Link to="/cart" className="breadcrumb-link">Cart</Link>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">Checkout</span>
          </nav>
        </div>

        <div className="empty-checkout">
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart before proceeding to checkout.</p>
          <Link to="/" className="continue-shopping-btn">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="page-header">
        <h1>Checkout</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-link">Products</Link>
          <span className="breadcrumb-separator">›</span>
          <Link to="/cart" className="breadcrumb-link">Cart</Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">Checkout</span>
        </nav>
      </div>

      <CheckoutForm
        cart={cart}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default CheckoutPage;