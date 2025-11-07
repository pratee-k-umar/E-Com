import React from "react";

const Cart = ({
  cart,
  onRemoveItem,
  onUpdateQuantity,
  onContinueShopping,
  onCheckout,
}) => {
  if (!cart.items.length) {
    return (
      <div className="cart-container">
        <h2>Your Cart</h2>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button
            className="continue-shopping-btn"
            onClick={onContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.items.map((item) => (
          <div key={item.productId} className="cart-item">
            <div className="cart-item-image">
              <img
                src={item.image}
                alt={item.name}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/100x100?text=Product";
                }}
              />
            </div>
            <div className="cart-item-info">
              <h4>{item.name}</h4>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>
            <div className="cart-item-controls">
              <div className="quantity-controls">
                {item.quantity === 1 ? (
                  <button
                    className="remove-btn"
                    onClick={() => onRemoveItem(item.productId)}
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    className="quantity-btn"
                    onClick={() =>
                      onUpdateQuantity(item.productId, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                )}
                <span className="quantity">{item.quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() =>
                    onUpdateQuantity(item.productId, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>
            </div>
            <div className="cart-item-total">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <strong>Total: ${cart.total.toFixed(2)}</strong>
        </div>
        <div className="cart-actions">
          <button
            className="continue-shopping-btn"
            onClick={onContinueShopping}
          >
            Continue Shopping
          </button>
          <button className="checkout-btn" onClick={onCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
