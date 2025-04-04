import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Onchain Global School Directory</h1>
          <p>A decentralized platform for registering and discovering schools worldwide on the Aptos blockchain.</p>
          <div className="hero-buttons">
            <Link to="/directory" className="btn btn-primary">Browse Schools</Link>
            <Link to="/register" className="btn btn-secondary">Register School</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-container">
          <div className="feature">
            <div className="feature-icon">🔍</div>
            <h3>Transparent Directory</h3>
            <p>All school data is stored on the Aptos blockchain, ensuring transparency and accessibility.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Reliable</h3>
            <p>Blockchain technology ensures that school data is tamper-proof and always available.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🌐</div>
            <h3>Global Access</h3>
            <p>Access school information from anywhere in the world with internet connectivity.</p>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="about-content">
          <h2>About the Project</h2>
          <p>
            The Onchain Global School Directory is a decentralized application (dApp) 
            built on the Aptos blockchain. It allows users to register schools on-chain 
            and retrieve their details, ensuring transparency and accessibility in 
            school data management.
          </p>
          <p>
            Our vision is to create a globally accessible, decentralized, and tamper-proof 
            school directory that ensures accurate and verifiable school data. This will 
            help in improving trust and efficiency in the education sector.
          </p>
          <h3>Future Plans</h3>
          <ul>
            <li>Adding more metadata for schools such as address, accreditation, and contact details.</li>
            <li>Implementing a verification system for school authenticity.</li>
            <li>Enabling search and filtering features for easier access to school data.</li>
            <li>Integrating with educational institutions and government bodies for official recognition.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Home; 