import React from 'react';
import { FiEye, FiHeart } from 'react-icons/fi';
import './TrendingSidebar.css';

const TrendingSidebar = ({ trendingAnime, onAnimeClick }) => {
  return (
    <div className="trending-container">
      <h2 className="section-title">
        <span className="accent-sparkle">✦</span> Trending
      </h2>
      
      <div className="trending-list">
        {trendingAnime?.slice(0, 5).map((anime, index) => (
          <div 
            className="trending-item" 
            key={anime.mal_id}
            onClick={() => onAnimeClick(anime)}
          >
            <div className="trending-rank">
              {(index + 1).toString().padStart(2, '0')}
            </div>
            <div className="trending-img-wrapper">
              <img 
                src={anime.images?.webp?.image_url} 
                alt={anime.title} 
              />
            </div>
            <div className="trending-info">
              <h4 className="trending-title">{anime.title}</h4>
              <div className="trending-stats">
                <span><FiEye /> {anime.members?.toLocaleString() || '200k'}</span>
                <span><FiHeart /> {anime.favorites?.toLocaleString() || '100k'}</span>
              </div>
            </div>
          </div>
        ))}

        {!trendingAnime && [1,2,3,4,5].map(i => (
          <div key={i} className="trending-item-skeleton"></div>
        ))}
      </div>
    </div>
  );
};

export default TrendingSidebar;
