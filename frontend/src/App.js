import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SchoolDirectory from './pages/SchoolDirectory';
import RegisterSchool from './pages/RegisterSchool';
import Footer from './components/Footer';
import About from './pages/About';
import NotFound from './pages/NotFound';

// Aptos Wallet Provider
import { AptosWalletProvider } from './services/AptosWalletProvider';

function App() {
  return (
    <AptosWalletProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/directory" element={<SchoolDirectory />} />
              <Route path="/register" element={<RegisterSchool />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AptosWalletProvider>
  );
}

export default App;
