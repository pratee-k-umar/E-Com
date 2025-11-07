import React, { useState, useEffect } from 'react';
import { orderService } from '../services/api';

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchEmail, setSearchEmail] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  useEffect(() => {
    if (!searchEmail.trim()) {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order => 
        order.customerInfo.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
      setFilteredOrders(filtered);
    }
  }, [orders, searchEmail]);

  const fetchOrderHistory = async () => {
    try {
      const response = await orderService.getHistory();
      setOrders(response.data.orders);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ffa500',
      confirmed: '#2196f3',
      shipped: '#9c27b0',
      delivered: '#4caf50',
      cancelled: '#f44336'
    };
    return colors[status] || '#666';
  };

  if (loading) {
    return (
      <div className="order-history-page">
        <div className="loading">Loading order history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-history-page">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="order-history-page">
      <h1>Order History</h1>
      
      <div className="search-section">
        <input
          type="email"
          placeholder="Search by email address..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredOrders.length === 0 ? (
        <div className="no-orders">
          {searchEmail ? 'No orders found for this email address.' : 'No orders found.'}
        </div>
      ) : (
        <div className="orders-list">
          {filteredOrders.map(order => (
            <div key={order.orderId} className="order-card">
              <div className="order-header">
                <div className="order-id">
                  <strong>Order ID:</strong> {order.orderId}
                </div>
                <div 
                  className="order-status"
                  style={{ color: getStatusColor(order.status) }}
                >
                  {order.status.toUpperCase()}
                </div>
              </div>

              <div className="order-info">
                <div className="customer-info">
                  <h3>Customer Information</h3>
                  <p><strong>Name:</strong> {order.customerInfo.name}</p>
                  <p><strong>Email:</strong> {order.customerInfo.email}</p>
                  <p><strong>Phone:</strong> {order.customerInfo.phone}</p>
                  <p><strong>Address:</strong> {order.customerInfo.address}</p>
                </div>

                <div className="order-details">
                  <h3>Order Details</h3>
                  <p><strong>Order Date:</strong> {formatDate(order.orderDate)}</p>
                  <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
                  <p><strong>Items Count:</strong> {order.items.length}</p>
                </div>
              </div>

              <div className="order-items">
                <h3>Items Ordered</h3>
                <div className="items-list">
                  {order.items.map((item, index) => (
                    <div key={index} className="item">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.productName}
                          className="item-image"
                        />
                      )}
                      <div className="item-details">
                        <p className="item-name">{item.productName}</p>
                        <p className="item-price">${item.price.toFixed(2)} x {item.quantity}</p>
                        <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {order.shippingInfo && (
                <div className="shipping-info">
                  <h3>Shipping Information</h3>
                  {order.shippingInfo.trackingNumber && (
                    <p><strong>Tracking Number:</strong> {order.shippingInfo.trackingNumber}</p>
                  )}
                  {order.shippingInfo.carrier && (
                    <p><strong>Carrier:</strong> {order.shippingInfo.carrier}</p>
                  )}
                  {order.shippingInfo.estimatedDelivery && (
                    <p><strong>Estimated Delivery:</strong> {formatDate(order.shippingInfo.estimatedDelivery)}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .order-history-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .search-section {
          margin-bottom: 30px;
        }

        .search-input {
          width: 100%;
          max-width: 400px;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }

        .loading, .error, .no-orders {
          text-align: center;
          padding: 40px;
          font-size: 18px;
        }

        .error {
          color: #f44336;
        }

        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .order-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 25px;
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eee;
        }

        .order-id {
          font-size: 18px;
        }

        .order-status {
          font-weight: bold;
          font-size: 16px;
        }

        .order-info {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 25px;
        }

        .customer-info h3,
        .order-details h3,
        .order-items h3,
        .shipping-info h3 {
          color: #333;
          margin-bottom: 10px;
          font-size: 16px;
          border-bottom: 1px solid #eee;
          padding-bottom: 5px;
        }

        .customer-info p,
        .order-details p,
        .shipping-info p {
          margin: 5px 0;
          color: #666;
        }

        .items-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 10px;
          border: 1px solid #eee;
          border-radius: 4px;
          background-color: #f9f9f9;
        }

        .item-image {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 4px;
        }

        .item-details {
          flex: 1;
        }

        .item-name {
          font-weight: bold;
          margin-bottom: 5px;
          color: #333;
        }

        .item-price {
          color: #666;
          margin-bottom: 2px;
        }

        .item-total {
          color: #2196f3;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .order-info {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .order-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .item {
            flex-direction: column;
            align-items: flex-start;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}

export default OrderHistoryPage;