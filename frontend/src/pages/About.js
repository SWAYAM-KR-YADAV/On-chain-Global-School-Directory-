import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-header">
        <h1>About the Global School Directory</h1>
        <p>Bringing transparency and decentralization to education information</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            The Global School Directory is an innovative platform that leverages blockchain technology 
            to create a transparent, immutable, and globally accessible registry of educational institutions.
            Our mission is to provide a decentralized solution for verifying and accessing school information
            worldwide, eliminating issues with centralized databases and giving control back to the schools themselves.
          </p>
        </section>

        <section className="about-section">
          <h2>Why Blockchain?</h2>
          <p>
            By utilizing the Aptos blockchain, we ensure that all school information is:
          </p>
          <ul>
            <li><strong>Transparent:</strong> All data is publicly viewable and verifiable</li>
            <li><strong>Immutable:</strong> Once registered, information cannot be tampered with</li>
            <li><strong>Decentralized:</strong> No single authority controls the data</li>
            <li><strong>Secure:</strong> Cryptographic security ensures data integrity</li>
            <li><strong>Global:</strong> Accessible from anywhere in the world</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>How It Works</h2>
          <p>
            Schools can register on our platform using an Aptos-compatible wallet like Petra.
            Once registered, their information is stored on the blockchain and becomes part of
            the global directory. Users can search and view school information without needing a wallet.
          </p>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Connect Wallet</h4>
                <p>Schools connect their Aptos wallet to authenticate</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Register School</h4>
                <p>Enter school information and submit to the blockchain</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Verification</h4>
                <p>Information is permanently added to the blockchain</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Global Access</h4>
                <p>School information becomes globally discoverable</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Technology Stack</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <h4>Blockchain</h4>
              <p>Aptos Blockchain</p>
            </div>
            <div className="tech-item">
              <h4>Smart Contract</h4>
              <p>Move Language</p>
            </div>
            <div className="tech-item">
              <h4>Frontend</h4>
              <p>React.js</p>
            </div>
            <div className="tech-item">
              <h4>Wallet Integration</h4>
              <p>Petra Wallet</p>
            </div>
          </div>
        </section>

        <section className="about-section contact-section">
          <h2>Contact Us</h2>
          <p>
            Have questions or suggestions? We'd love to hear from you!
          </p>
          <div className="contact-info">
            <p><strong>Email:</strong> <a href="mailto:info@globalschooldirectory.org">info@globalschooldirectory.org</a></p>
            <p><strong>Twitter:</strong> <a href="https://twitter.com/globalschooldir" target="_blank" rel="noopener noreferrer">@globalschooldir</a></p>
            <p><strong>GitHub:</strong> <a href="https://github.com/globalschooldirectory" target="_blank" rel="noopener noreferrer">github.com/globalschooldirectory</a></p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About; 