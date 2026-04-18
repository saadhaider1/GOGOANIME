import React, { useState } from 'react';
import { FiSearch, FiBell, FiHeart } from 'react-icons/fi';
import './Navbar.css';

const Navbar = ({ onSearch, navigateTo, currentView, user, onLoginClick, onLogout }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo" onClick={() => navigateTo('home')}>
          <span className="logo-text">GOGO<br/><span className="highlight">ANIME</span></span>
        </div>
        <form className="search-bar" onSubmit={handleSearch}>
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search Anime..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
      </div>
      
      <div className="navbar-links">
        <button className={`nav-link ${currentView === 'home' ? 'active' : ''}`} onClick={() => navigateTo('home')}>Home</button>
        <button className={`nav-link ${currentView === 'anime-list' ? 'active' : ''}`} onClick={() => navigateTo('anime-list')}>Anime List</button>
        <button className={`nav-link ${currentView === 'new-seasons' ? 'active' : ''}`} onClick={() => navigateTo('new-seasons')}>New Seasons</button>
        <button className={`nav-link ${currentView === 'watchlist' ? 'active' : ''}`} onClick={() => navigateTo('watchlist')}>
          <FiHeart style={{marginRight: '6px'}}/> Watchlist
        </button>
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <button className="logout-btn" onClick={onLogout}>Logout</button>
            </div>
            <div className="user-avatar">
              <img src={`https://ui-avatars.com/api/?name=${user.name}&background=ebb12b&color=fff`} alt={user.name} />
            </div>
          </>
        ) : (
          <button className="btn-login" onClick={onLoginClick}>Login / Sign Up</button>
        )}
        <FiBell className="nav-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
