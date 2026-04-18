import React from 'react';
import { FiPlay } from 'react-icons/fi';
import './AnimeRow.css';

const AnimeRow = ({ title, animeList, onAnimeClick, isCharacters = false }) => {
  return (
    <div className="anime-row-container">
      <h3 className="row-title">
        {title === 'Continue Watching' ? <span className="icon-history">↺</span> : null}
        {title}
      </h3>
      
      <div className="anime-row">
        {animeList ? (
          animeList.map((item, index) => (
            <div 
              className={`anime-card ${isCharacters ? 'character-card' : ''}`} 
              key={isCharacters ? item.character?.mal_id : item.mal_id}
              onClick={() => !isCharacters && onAnimeClick(item)}
            >
              <div className="img-container">
                <img 
                  src={isCharacters ? item.character?.images?.webp?.image_url : item.images?.webp?.image_url} 
                  alt={isCharacters ? item.character?.name : item.title} 
                />
                {!isCharacters && (
                  <div className="card-overlay">
                    <FiPlay className="play-icon" />
                  </div>
                )}
              </div>
              
              <div className="card-info">
                {isCharacters ? (
                  <>
                    <h5 className="char-name">{item.character?.name}</h5>
                    <p className="va-name">{item.voice_actors?.[0]?.person?.name}</p>
                  </>
                ) : (
                  <>
                    <div className="card-tags">
                      <span className="tag-small">SUB</span>
                      {item.episodes && <span className="tag-ep">EP {item.episodes}</span>}
                    </div>
                    <h5 className="card-title">{item.title}</h5>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          [1,2,3,4,5].map(i => (
             <div key={i} className="anime-card-skeleton"></div>
          ))
        )}
      </div>
    </div>
  );
};

export default AnimeRow;
