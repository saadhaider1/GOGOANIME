import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TrendingSidebar from './components/TrendingSidebar';
import AnimeRow from './components/AnimeRow';
import PromoBanner from './components/PromoBanner';
import LoadingScreen from './components/LoadingScreen';
import AuthModal from './components/AuthModal';
import { getTopAnime, getAiringAnime, searchAnime, getAnimeCharacters } from './api';
import { getUser, logout, getWatchlist, addToWatchlist, removeFromWatchlist } from './services/authService';
import './App.css';

function App() {
  const [view, setView] = useState('home'); // 'home', 'search', 'watchlist'
  const [searchQuery, setSearchQuery] = useState('');
  
  // Auth & UI States
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Data States
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [topAnime, setTopAnime] = useState(null);
  const [airingAnime, setAiringAnime] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [heroAnime, setHeroAnime] = useState(null);
  const [heroCharacters, setHeroCharacters] = useState(null);
  
  // Watchlist State (Load from LocalStorage)
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('anime_watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Init Data Fetch
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [top, airing] = await Promise.all([
          getTopAnime(),
          getAiringAnime()
        ]);
        setTopAnime(top);
        setAiringAnime(airing);
        
        if (top.length > 0) {
          setHeroAnime(top[0]);
          // Fetch characters for the hero anime
          const chars = await getAnimeCharacters(top[0].mal_id);
          setHeroCharacters(chars);
        }
      } catch (err) {
        console.error("Failed to fetch initial data");
      } finally {
        // Enforce a minimum 1 second delay to showcase the beautiful loading animation
        setTimeout(() => setIsInitialLoading(false), 1000);
      }
    };
    fetchHomeData();
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const resp = await getUser();
      setUser(resp.data);
      // If user exists, sync watchlist from backend
      const listResp = await getWatchlist();
      setWatchlist(listResp.data);
    } catch (err) {
      setUser(null);
    }
  };

  // Update localStorage when watchlist changes ONLY for guests
  useEffect(() => {
    if (!user) {
      localStorage.setItem('anime_watchlist', JSON.stringify(watchlist));
    }
  }, [watchlist, user]);

  // Handlers
  const handleLogout = async () => {
    await logout();
    setUser(null);
    setWatchlist([]);
    localStorage.removeItem('anime_watchlist');
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setView('search');
    setSearchResults(null); // set loading state
    const results = await searchAnime(query);
    setSearchResults(results);
  };

  const navigateTo = (newView) => {
    setView(newView);
    if(newView !== 'search') setSearchQuery('');
  };

  const handleAnimeClick = async (anime) => {
    setHeroAnime(anime);
    setHeroCharacters(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const chars = await getAnimeCharacters(anime.mal_id);
    setHeroCharacters(chars);
    setView('home');
  };

  const toggleWatchlist = async (anime) => {
    if (!user) {
      // Guest mode (LocalStorage)
      setWatchlist(prev => {
        const isSaved = prev.find(item => item.mal_id === anime.mal_id);
        if (isSaved) {
          return prev.filter(item => item.mal_id !== anime.mal_id);
        } else {
          return [...prev, anime];
        }
      });
      return;
    }

    // Backend mode
    try {
      const isSaved = watchlist.find(item => item.mal_id === anime.mal_id);
      if (isSaved) {
        await removeFromWatchlist(anime.mal_id);
        setWatchlist(prev => prev.filter(item => item.mal_id !== anime.mal_id));
      } else {
        await addToWatchlist(anime);
        setWatchlist(prev => [...prev, anime]);
      }
    } catch (err) {
      console.error("Failed to sync watchlist with backend");
    }
  };

  const isWatchlisted = (anime) => {
    if(!anime) return false;
    return watchlist.some(item => item.mal_id === anime.mal_id);
  };

  if (isInitialLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app-container">
      <Navbar 
        onSearch={handleSearch} 
        navigateTo={navigateTo} 
        currentView={view} 
        user={user}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />
      
      <main className="main-content">
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
          onAuthSuccess={checkAuthStatus} 
        />
        {view === 'home' && (
          <>
            <div className="home-layout">
              <div className="home-main">
                <HeroSection 
                  anime={heroAnime} 
                  onAddToWatchlist={toggleWatchlist}
                  isWatchlisted={isWatchlisted(heroAnime)}
                />
                
                {heroCharacters && heroCharacters.length > 0 && (
                  <AnimeRow 
                    title="Characters & Voice Actors" 
                    animeList={heroCharacters} 
                    isCharacters={true} 
                  />
                )}
              </div>
              
              <div className="home-sidebar">
                <TrendingSidebar 
                  trendingAnime={topAnime} 
                  onAnimeClick={handleAnimeClick} 
                />
              </div>
            </div>

            <PromoBanner />

            <AnimeRow 
              title="New Seasons Airing Now" 
              animeList={airingAnime} 
              onAnimeClick={handleAnimeClick} 
            />
            
            <AnimeRow 
              title="Top Rated All Time" 
              animeList={topAnime?.slice(5)} 
              onAnimeClick={handleAnimeClick} 
            />
          </>
        )}

        {view === 'search' && (
          <div className="search-view animate-fade-in">
            <h2 className="view-title">Search Results for "{searchQuery}"</h2>
            <div className="grid-list">
              {searchResults === null ? (
                // Loading Skeletons
                [1,2,3,4,5,6].map(i => <div key={i} className="anime-card-skeleton" style={{width: '100%'}}></div>)
              ) : searchResults.length === 0 ? (
                <p>No results found.</p>
              ) : (
                searchResults.map(anime => (
                  <div className="grid-item" key={anime.mal_id} onClick={() => handleAnimeClick(anime)}>
                    <img src={anime.images?.webp?.image_url} alt={anime.title} />
                    <h5>{anime.title}</h5>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {view === 'anime-list' && (
          <div className="anime-list-view animate-fade-in">
            <h2 className="view-title">Anime List (Popular)</h2>
            <div className="grid-list">
              {topAnime?.map(anime => (
                <div className="grid-item" key={anime.mal_id} onClick={() => handleAnimeClick(anime)}>
                  <img src={anime.images?.webp?.image_url} alt={anime.title} />
                  <h5>{anime.title}</h5>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'new-seasons' && (
          <div className="new-seasons-view animate-fade-in">
            <h2 className="view-title">New Seasons (Currently Airing)</h2>
            <div className="grid-list">
              {airingAnime?.map(anime => (
                <div className="grid-item" key={anime.mal_id} onClick={() => handleAnimeClick(anime)}>
                  <img src={anime.images?.webp?.image_url} alt={anime.title} />
                  <h5>{anime.title}</h5>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'watchlist' && (
          <div className="watchlist-view animate-fade-in">
            <h2 className="view-title">My Watchlist</h2>
            <div className="grid-list">
              {watchlist.length === 0 ? (
                <p>Your watchlist is empty. Go add some anime!</p>
              ) : (
                watchlist.map(anime => (
                  <div className="grid-item" key={anime.mal_id} onClick={() => handleAnimeClick(anime)}>
                    <img src={anime.images?.webp?.image_url} alt={anime.title} />
                    <h5>{anime.title}</h5>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
