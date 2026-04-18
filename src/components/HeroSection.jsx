import React from 'react';
import { FiPlayCircle, FiHeart } from 'react-icons/fi';
import './HeroSection.css';

const HeroSection = ({ anime, onAddToWatchlist, isWatchlisted }) => {
  if (!anime) return <div className="hero-skeleton animate-fade-in"></div>;

  // Jikan sometimes has very long synopsis
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  };

  return (
    <div className="hero-container animate-fade-in">
      <div className="hero-bg">
        <img 
          src={anime.images?.webp?.large_image_url || anime.images?.jpg?.large_image_url} 
          alt={anime.title} 
        />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <div className="breadcrumb">Home | TV</div>
        <h1 className="hero-title">{anime.title}</h1>
        <div className="hero-meta">
          <span>{anime.episodes ? `EP ${anime.episodes}` : 'Ongoing'}</span>
          <span>•</span>
          <span>{anime.duration || '24m'}</span>
        </div>
        
        <div className="hero-tags">
          <span className="tag">SUB</span>
          <span className="tag">HD</span>
          <span className="tag">DUB</span>
          <span className="tag score">⭐ {anime.score}</span>
        </div>

        <p className="hero-desc">{truncate(anime.synopsis, 150)}</p>

        <div className="hero-actions">
          <button className="btn-primary">
            <FiPlayCircle className="btn-icon" /> Continue Watching
          </button>
          <button 
            className={`btn-secondary ${isWatchlisted ? 'active' : ''}`} 
            onClick={() => onAddToWatchlist(anime)}
          >
            <FiHeart className="btn-icon" /> {isWatchlisted ? 'Saved' : 'Add to List'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
