import React from 'react';

const PromoBanner = () => {
  return (
    <div style={{
      backgroundColor: 'var(--accent-gold)',
      borderRadius: 'var(--radius-xl)',
      padding: '2.5rem 3rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: '#121212',
      margin: '3rem 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          Explore Manga Library
        </h2>
        <p style={{ fontWeight: 600, fontSize: '1rem' }}>Highest Quality | No signups | No Ads</p>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1.5rem' }}>
          <button style={{
            backgroundColor: '#121212',
            color: '#fff',
            padding: '0.8rem 1.8rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Read Now
          </button>
          <a href="#" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Go to website</a>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        right: '-5%',
        top: '-50%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)',
        borderRadius: '50%',
        zIndex: 1
      }}></div>
    </div>
  );
};

export default PromoBanner;
