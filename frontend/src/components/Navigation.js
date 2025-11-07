import { Link, useLocation } from 'react-router-dom';

const Navigation = ({ cartItemCount }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="logo">
          <h1>E-Commerce</h1>
        </Link>
        
        <nav className="nav-menu">
          <Link
            to="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            <span className="nav-text">Products</span>
          </Link>
          
          <Link
            to="/cart"
            className={`nav-link cart-link ${isActive('/cart') ? 'active' : ''}`}
          >
            <span className="nav-text">Cart</span>
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </Link>

          <Link
            to="/orders"
            className={`nav-link ${isActive('/orders') ? 'active' : ''}`}
          >
            <span className="nav-text">Orders</span>
          </Link>
          
          {cartItemCount > 0 && (
            <Link
              to="/checkout"
              className={`nav-link checkout-link ${isActive('/checkout') ? 'active' : ''}`}
            >
              <span className="nav-text">Checkout</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;