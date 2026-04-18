import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="logo-container">
        <h1 className="glitch" data-top="GOGO" data-bottom="ANIME">
          <span className="gogo">GOGO</span>
          <br />
          <span className="anime">ANIME</span>
        </h1>
      </div>

      <div className="loader-container">
        <svg viewBox="0 0 100 100" className="loading-svg">
          <rect 
            x="25" y="50" 
            width="20" height="20" 
            fill="none" 
            stroke="#444" 
            strokeWidth="5" 
            rx="2"
          />
          <path 
            className="green-path"
            d="M 55,25 L 25,25 L 25,45 Q 55,45 55,75 L 85,75 L 85,45" 
            fill="none" 
            stroke="#6bc537" 
            strokeWidth="5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
        <p className="loading-text">Loading</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
