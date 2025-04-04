import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section logo-section">
          <Link to="/" className="footer-logo">
            <span className="logo-icon">🏫</span>
            <span className="logo-text">Global School Directory</span>
          </Link>
          <p className="footer-description">
            A blockchain-based directory of educational institutions around the world.
          </p>
        </div>

        <div className="footer-section links-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/directory">Directory</Link></li>
            <li><Link to="/register">Register School</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        <div className="footer-section resources-section">
          <h3>Resources</h3>
          <ul className="footer-links">
            <li><a href="https://aptos.dev" target="_blank" rel="noopener noreferrer">Aptos Documentation</a></li>
            <li><a href="https://petra.app" target="_blank" rel="noopener noreferrer">Petra Wallet</a></li>
            <li><a href="https://explorer.aptoslabs.com" target="_blank" rel="noopener noreferrer">Aptos Explorer</a></li>
            <li><a href="https://github.com/globalschooldirectory" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </div>

        <div className="footer-section contact-section">
          <h3>Contact Us</h3>
          <p><a href="mailto:info@globalschooldirectory.org">info@globalschooldirectory.org</a></p>
          <div className="social-links">
            <a href="https://twitter.com/globalschooldir" target="_blank" rel="noopener noreferrer" className="social-link">Twitter</a>
            <a href="https://discord.gg/globalschooldir" target="_blank" rel="noopener noreferrer" className="social-link">Discord</a>
            <a href="https://linkedin.com/company/globalschooldirectory" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Global School Directory. All rights reserved.</p>
        <p>Built on <a href="https://aptoslabs.com" target="_blank" rel="noopener noreferrer">Aptos Blockchain</a></p>
      </div>
    </footer>
  );
};

export default Footer; 