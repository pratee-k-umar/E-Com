import React from 'react';

const ReceiptModal = ({ receipt, onClose }) => {
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content receipt-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Order Confirmation</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="receipt-header">
            <div className="success-icon">✓</div>
            <h3>Thank you for your order!</h3>
            <p>Order ID: {receipt.id}</p>
            <p>Date: {formatDate(receipt.timestamp)}</p>
          </div>

          <div className="customer-info">
            <h4>Customer Information</h4>
            <p><strong>Name:</strong> {receipt.customerInfo.name}</p>
            <p><strong>Email:</strong> {receipt.customerInfo.email}</p>
            {receipt.customerInfo.phone && (
              <p><strong>Phone:</strong> {receipt.customerInfo.phone}</p>
            )}
            {receipt.customerInfo.address && (
              <p><strong>Address:</strong> {receipt.customerInfo.address}</p>
            )}
          </div>

          <div className="order-details">
            <h4>Order Details</h4>
            <div className="receipt-items">
              {receipt.items.map((item) => (
                <div key={item.productId} className="receipt-item">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">x{item.quantity}</span>
                  <span className="item-price">${item.price.toFixed(2)}</span>
                  <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="receipt-total">
              <strong>Total: ${receipt.total.toFixed(2)}</strong>
            </div>
          </div>

          <div className="receipt-footer">
            <p>A confirmation email will be sent to {receipt.customerInfo.email}</p>
            <p>Status: <span className="status-badge">{receipt.status}</span></p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="close-receipt-btn" onClick={onClose}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;