import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <div className="not-found-header">
          <div className="error-code">404</div>
          <h1>Page Not Found</h1>
        </div>
        
        <p>The page you are looking for doesn't exist or has been moved.</p>
        
        <div className="not-found-actions">
          <Link to="/" className="back-home-btn">Back to Home</Link>
          <Link to="/directory" className="view-directory-btn">View School Directory</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound; 