import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAptosWallet } from '../services/AptosWalletProvider';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { connected, walletAddress, connect, disconnect } = useAptosWallet();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleConnectWallet = async () => {
    if (connected) {
      await disconnect();
    } else {
      await connect();
    }
  };

  // Format wallet address for display
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">🏫</span>
          <span className="logo-text">Global School Directory</span>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'} />
          <span className={menuOpen ? 'hidden' : ''}>☰</span>
          <span className={menuOpen ? '' : 'hidden'}>✕</span>
        </div>

        <ul className={menuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/directory" 
              className={`nav-link ${location.pathname === '/directory' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Directory
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/register" 
              className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              Register School
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/about" 
              className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
              onClick={closeMenu}
            >
              About
            </Link>
          </li>
          <li className="nav-item wallet-button-container">
            <button 
              className={`wallet-button ${connected ? 'connected' : ''}`}
              onClick={handleConnectWallet}
            >
              {connected ? (
                <>
                  <span className="wallet-indicator"></span>
                  {formatAddress(walletAddress)}
                </>
              ) : 'Connect Wallet'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 