import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-description">
          Sorry, the page you are looking for doesn't exist.
        </p>
        <Link to="/" className="home-link">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;