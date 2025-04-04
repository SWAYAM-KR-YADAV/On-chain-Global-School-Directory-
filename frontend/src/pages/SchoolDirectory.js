import React, { useState, useEffect } from 'react';
import { getAllSchools } from '../services/api';
import { useAptosWallet } from '../services/AptosWalletProvider';
import { Link } from 'react-router-dom';
import './SchoolDirectory.css';

const SchoolDirectory = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [lastRefresh, setLastRefresh] = useState(null);
  const { connected, walletAddress } = useAptosWallet();

  const fetchSchools = async () => {
    try {
      setLoading(true);
      setError(null);
      const schoolsData = await getAllSchools();
      console.log("Schools data received:", schoolsData);
      setSchools(schoolsData);
      setLastRefresh(new Date().toLocaleTimeString());
      setLoading(false);
    } catch (err) {
      console.error('Error fetching schools:', err);
      setError('Failed to load schools. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
    
    // Refresh schools list every 15 seconds
    const interval = setInterval(() => {
      fetchSchools();
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleRefresh = () => {
    fetchSchools();
  };

  // Force reload the entire page (useful for troubleshooting)
  const handleForceReload = () => {
    localStorage.removeItem('schoolAccounts'); // Clear the stored accounts
    window.location.reload();
  };

  const handleEditRedirect = (schoolOwner) => {
    if (connected && walletAddress === schoolOwner) {
      return '/register'; // Navigate to the registration page which will load for editing
    }
    return null;
  };

  // Filter schools based on search term and country filter
  const filteredSchools = schools.filter(school => {
    const nameMatch = school.name.toLowerCase().includes(searchTerm.toLowerCase());
    const countryMatch = school.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = nameMatch || countryMatch;
    
    if (filter === 'all') {
      return matchesSearch;
    }
    
    return matchesSearch && school.country.toLowerCase() === filter.toLowerCase();
  });

  // Get unique countries for filter dropdown
  const uniqueCountries = [...new Set(schools.map(school => school.country))];

  return (
    <div className="school-directory">
      <div className="directory-header">
        <h1>Global School Directory</h1>
        <p>Discover schools from around the world registered on the Aptos blockchain</p>
        {lastRefresh && <small>Last refreshed: {lastRefresh}</small>}
      </div>

      <div className="search-filter-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by school name or country..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        
        <div className="filter-container">
          <label htmlFor="country-filter">Filter by Country: </label>
          <select
            id="country-filter"
            value={filter}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="all">All Countries</option>
            {uniqueCountries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
        </div>
        
        <button onClick={handleRefresh} className="refresh-button">
          Refresh Schools
        </button>

        <button onClick={handleForceReload} className="reload-button">
          Hard Refresh
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading schools...</p>
        </div>
      ) : schools.length === 0 ? (
        <div className="no-results">
          <h3>No schools found in the directory</h3>
          <p>This could be because:</p>
          <ul>
            <li>No schools have been registered yet</li>
            <li>The application cannot connect to the blockchain</li>
            <li>Your registered school is on a different network (check if Petra wallet is on Devnet)</li>
          </ul>
          <p>Try checking your browser console (F12) for more information</p>
        </div>
      ) : filteredSchools.length > 0 ? (
        <div className="schools-grid">
          {filteredSchools.map((school, index) => {
            const isOwner = connected && walletAddress === school.owner;
            const editUrl = handleEditRedirect(school.owner);
            
            return (
              <div key={index} className={`school-card ${isOwner ? 'school-name-editable' : ''}`}>
                <div className="school-header">
                  <div className="school-header-top">
                    <h2 className={isOwner ? 'editable-content' : ''}>{school.name}</h2>
                    {isOwner && (
                      <Link to="/register" className="edit-button" title="Edit your school">
                        <span className="edit-icon"></span>
                      </Link>
                    )}
                  </div>
                  <div className="school-country">{school.country}</div>
                </div>
                
                <div className="school-details">
                  {school.address && (
                    <div className="school-detail">
                      <span className="detail-label">Address:</span>
                      <span className={`detail-value ${isOwner ? 'editable-content' : ''}`}>{school.address}</span>
                    </div>
                  )}
                  
                  {school.accreditation && (
                    <div className="school-detail">
                      <span className="detail-label">Accreditation:</span>
                      <span className={`detail-value ${isOwner ? 'editable-content' : ''}`}>{school.accreditation}</span>
                    </div>
                  )}
                  
                  {school.contact && (
                    <div className="school-detail">
                      <span className="detail-label">Contact:</span>
                      <span className={`detail-value ${isOwner ? 'editable-content' : ''}`}>{school.contact}</span>
                    </div>
                  )}
                  
                  {isOwner && !school.address && !school.accreditation && !school.contact && (
                    <div className="add-details-prompt">
                      <Link to="/register" className="add-details-link">
                        <span className="edit-icon"></span> Add more details to your school
                      </Link>
                    </div>
                  )}
                </div>
                
                <div className="school-footer">
                  <div className="blockchain-info">
                    <span>Registered by: </span>
                    <a 
                      href={`https://explorer.aptoslabs.com/account/${school.owner}?network=devnet`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="address-link"
                    >
                      {`${school.owner.slice(0, 6)}...${school.owner.slice(-4)}`}
                      {isOwner && <span className="owner-badge"> (You)</span>}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-results">
          <h3>No schools found</h3>
          <p>Try adjusting your search or filter criteria, or register a new school!</p>
        </div>
      )}

      <div className="directory-info">
        <h3>About the School Directory</h3>
        <p>
          This directory showcases schools that have been registered on the Aptos blockchain.
          Each school's information is stored permanently and securely, providing a transparent
          and decentralized global education registry.
        </p>
        
        <h3>Features</h3>
        <ul>
          <li>Tamper-proof school records on the blockchain</li>
          <li>Global accessibility to education institution information</li>
          <li>Transparent ownership and registration information</li>
          <li>Search and filter capabilities for easy discovery</li>
        </ul>
      </div>
    </div>
  );
};

export default SchoolDirectory; 
